// 유기동물 입양 공고 일일 동기화 (국가동물보호정보시스템 API)
// 공고중(notice) + 보호중(protect)을 모두 수집한다 — 공고가 끝나도 보호소에서
// 입양을 기다리는 아이들이 훨씬 많다.
import { writeFileSync, mkdirSync } from 'fs';
import { Agent, setGlobalDispatcher } from 'undici';

// ★2026-08-13 — 재시도를 8회(3분 24초)까지 늘렸는데도 #34 가 전부 같은 곳에서 죽었다.
//   ConnectTimeoutError (apis.data.go.kr:443, timeout: 10000ms) × 8
//   기다림이 모자란 게 아니다. 매번 '연결' 단계에서 10초에 잘린다.
//
//   그 10초는 undici 의 connect 타임아웃 기본값이고, fetch 의 signal 로는 못 바꾼다.
//   그래서 dispatcher 를 직접 만들어 60초로 준다.
//
//   ★이건 실험이기도 하다. 두 가지를 가른다.
//     60초로 늘려서 되면 → 그냥 연결이 느렸던 것이다.
//     60초에도 안 되면  → 러너 IP 에서 아예 막히는 것이다(공공데이터포털 해외 IP 제한).
//                        그때는 코드로 풀 문제가 아니라 실행 위치를 옮겨야 한다.
setGlobalDispatcher(new Agent({ connect: { timeout: 60000 }, headersTimeout: 60000, bodyTimeout: 60000 }));

const KEY = process.env.ANIMAL_API_KEY;
const BASE = 'https://apis.data.go.kr/1543061/abandonmentPublicService_v2';

// 공공데이터포털 서버가 종종 응답을 안 한다.
//
// [2026-08-12] 재시도를 넣고 AbortSignal.timeout(30000) 으로 타임아웃을 늘렸다.
// [2026-08-13] ★그런데 또 실패했다. 로그를 보니 절반만 들었던 것이다.
//   재시도 1/4 ~ 4/4 전부 실패, 매번 같은 메시지:
//     ConnectTimeoutError (apis.data.go.kr:443, timeout: 10000ms)
//   ★AbortSignal.timeout 은 '요청 전체' 시계이고, TCP 연결 단계는 undici 의
//     connectTimeout(기본 10초)이 따로 잰다. 그래서 30초를 줘도 10초에 끊긴다.
//     연결 자체가 안 되는 상황에선 내 설정이 닿지도 않는다.
//
//   그래서 이렇게 고쳤다.
//    · 타임아웃을 늘리는 대신 **더 오래, 더 여러 번** 기다린다 (8회, 간격 상한 30초)
//      총 대기 약 2분 20초. 서버가 잠깐 죽은 것이면 이 사이에 돌아온다.
//      ★이게 실제 대책이다.
//    · 실행 시각도 낮으로 옮겼다(adopt.yml). 다만 시간대가 원인이라는 근거는 없다 —
//      새벽 6시대에 나흘 연속(8/8~8/11) 성공했고 8/7 실패는 오전 9:56 이었다.
//      옮긴 이유는 실패했을 때 사람이 깨어 있는 시간이라 손쓸 수 있어서다.
//    · 그래도 안 되면 그때 던진다 — 조용히 빈 데이터를 쓰지 않는다.
//      실패하면 커밋을 안 하므로 앱은 전날 데이터를 그대로 보여준다.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(url, tries = 8) {
  let last;
  for (let i = 1; i <= tries; i++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(30000) });
      const t = await r.text();
      try {
        return JSON.parse(t);
      } catch (e) {
        // 키 오류·점검 안내는 HTML/XML 로 온다. 이건 다시 불러도 같으니 바로 던진다.
        throw new Error('API 응답 오류: ' + t.slice(0, 200));
      }
    } catch (e) {
      last = e;
      const netErr = /fetch failed|timeout|ETIMEDOUT|ECONNRESET|socket|abort/i.test(String(e));
      if (!netErr || i === tries) throw e;
      const wait = Math.min(2000 * 2 ** (i - 1), 30000);
      console.log(`  재시도 ${i}/${tries - 1} — ${Math.round(wait / 1000)}초 뒤 (${String(e).slice(0, 80)})`);
      await sleep(wait);
    }
  }
  throw last;
}

async function fetchState(code, state, maxPages) {
  let items = [], page = 1;
  while (page <= maxPages) {
    const d = await getJson(`${BASE}/abandonmentPublic_v2?serviceKey=${KEY}&upr_cd=${code}&state=${state}&numOfRows=500&pageNo=${page}&_type=json`);
    const arr = d.response?.body?.items?.item || [];
    items = items.concat(Array.isArray(arr) ? arr : [arr]);
    if (items.length >= (d.response?.body?.totalCount || 0)) break;
    page++;
  }
  return items;
}

const sidoRes = await getJson(`${BASE}/sido_v2?serviceKey=${KEY}&numOfRows=30&_type=json`);
const sidos = sidoRes.response.body.items.item;
mkdirSync('adopt', { recursive: true });

const index = [];
for (const s of sidos) {
  const code = s.orgCd, name = s.orgdownNm;
  const notice = await fetchState(code, 'notice', 5);
  const protect = await fetchState(code, 'protect', 10);
  const seen = new Set();
  const compact = [];
  for (const [state, list] of [['n', notice], ['p', protect]]) {
    for (const a of list) {
      const id = a.desertionNo || (a.popfile1 || a.popfile || '') + (a.noticeNo || '');
      if (seen.has(id)) continue;
      seen.add(id);
      compact.push([
        a.popfile1 || a.popfile || '', a.kindNm || a.kindCd || '', a.sexCd || 'Q',
        a.age || '', a.weight || '', a.noticeEdt || '', a.careNm || '',
        a.careTel || '', a.careAddr || '', a.specialMark || '', a.happenPlace || '',
        a.neuterYn || 'U', String(a.upKindCd || ''), state
      ]);
    }
  }
  writeFileSync(`adopt/${code}.json`, JSON.stringify(compact));
  index.push({ code, name, n: compact.length });
  console.log(name, compact.length);
}
writeFileSync('adopt/index.json', JSON.stringify(index));
console.log('done:', index.reduce((a, b) => a + b.n, 0), 'animals');

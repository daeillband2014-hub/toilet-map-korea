// 유기동물 입양 공고 일일 동기화 (국가동물보호정보시스템 API)
// 공고중(notice) + 보호중(protect)을 모두 수집한다 — 공고가 끝나도 보호소에서
// 입양을 기다리는 아이들이 훨씬 많다.
import { writeFileSync, mkdirSync } from 'fs';

const KEY = process.env.ANIMAL_API_KEY;
const BASE = 'https://apis.data.go.kr/1543061/abandonmentPublicService_v2';

// 공공데이터포털 서버가 종종 응답을 안 한다.
// 2026-08-12 실패 로그: ConnectTimeoutError (apis.data.go.kr:443, timeout 10000ms).
// 8/7 에도 같은 24초 실패가 있었다 — 30회 중 2회, 7% 다.
// 한 번 끊겼다고 그날 데이터를 통째로 버리지 않도록 다시 시도한다.
//  · 기본 타임아웃 10초는 짧다 → 30초로 늘린다
//  · 5번까지 다시 부르고 간격을 늘린다(2s, 4s, 8s, 16s)
//  · 그래도 안 되면 그때 던진다 — 조용히 빈 데이터를 쓰지 않는다
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(url, tries = 5) {
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
      const wait = 2000 * 2 ** (i - 1);
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

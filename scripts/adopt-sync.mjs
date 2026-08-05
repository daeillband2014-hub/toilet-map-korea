// 유기동물 입양 공고 일일 동기화 (국가동물보호정보시스템 API)
// 공고중(notice) + 보호중(protect)을 모두 수집한다 — 공고가 끝나도 보호소에서
// 입양을 기다리는 아이들이 훨씬 많다.
import { writeFileSync, mkdirSync } from 'fs';

const KEY = process.env.ANIMAL_API_KEY;
const BASE = 'https://apis.data.go.kr/1543061/abandonmentPublicService_v2';

async function getJson(url) {
  const r = await fetch(url);
  const t = await r.text();
  try { return JSON.parse(t); } catch (e) { throw new Error('API 응답 오류: ' + t.slice(0, 200)); }
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

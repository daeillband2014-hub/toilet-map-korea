(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){var t=function(){return Promise.reject(Error(e+`: web`))};return t.isSupported=function(){return!1},t}var t=e(`loadFullScreenAd`),n=e(`showFullScreenAd`);e(`getTossShareLink`),e(`share`);var r={initialize:e(`TossAds.initialize`),attachBanner:e(`TossAds.attachBanner`)};e(`Notification.requestAgreement`),e(`Promotion.grantReward`),e(`Promotion.openContactsInvite`);var i=document.getElementById(`app`),a=document.getElementById(`toast`),o=`ait.v2.live.23e6232fe5c94da7`,s={};function c(e,r){if(s[e])return s[e];var i=!1,a=!1,o=0,c=!1;function l(){try{return t.isSupported&&t.isSupported()}catch{return!1}}function u(){if(!(!l()||a||i)){a=!0;try{t({options:{adGroupId:e},onEvent:function(e){e.type===`loaded`&&(i=!0,a=!1,o=0)},onError:function(){a=!1,i=!1,o<8&&(o++,setTimeout(u,Math.min(1e3*o,5e3)))}})}catch{a=!1}}}function d(t){var a=!1,o=null;c=!0;function s(){a||(a=!0,c=!1,i=!1,o&&clearTimeout(o),u(),t())}try{o=setTimeout(s,r),n({options:{adGroupId:e},onEvent:function(e){clearTimeout(o),o=setTimeout(s,6e4),(e.type===`failedToShow`||e.type===`dismissed`)&&s()},onError:function(){s()}})}catch{s()}}function f(e){if(!l()||c){e();return}if(!i){u(),e();return}d(e)}return u(),s[e]={show:f},s[e]}var l=c(o,8e3),u=`ait.v2.live.3cbcbe6fbb16422c`,d=null,f=!1,p=!1,m=`init`;function h(){if(!f){f=!0;try{if(!r||!r.initialize||r.initialize.isSupported&&!r.initialize.isSupported())return;m=`wait`,r.initialize({callbacks:{onInitialized:function(){m=`ready`,p&&(p=!1,g())},onInitializationFailed:function(){m=`fail`}}})}catch{}}}function g(){try{if(!r.attachBanner||r.attachBanner.isSupported&&!r.attachBanner.isSupported())return;var e=document.getElementById(`bannerBox`);if(!e)return;d=r.attachBanner(u,e,{theme:`auto`,variant:`card`})}catch{}}function _(){try{d&&d.destroy&&d.destroy()}catch{}if(d=null,!f){p=!0,h();return}if(m===`wait`){p=!0;return}g()}var v={y:2026,m:9,d:25,label:`2026년 9월 25일 금요일`};function y(){var e=new Date,t=new Date(e.getFullYear(),e.getMonth(),e.getDate()),n=new Date(v.y,v.m-1,v.d);return{diff:Math.round((n-t)/864e5),label:v.label}}var b=[{key:`parent`,ic:`🏡`,name:`부모님·어른`,hint:`부모님, 시부모님, 친척 어른`,list:[{len:`짧게`,t:`아버지 어머니, 풍성한 한가위 보내세요.
올해도 건강하신 모습 뵈니 그것이 가장 큰 복입니다.`},{len:`짧게`,t:`한가위 보름달처럼 두 분 마음도 환하고 넉넉하시길 바랍니다.
늘 감사드립니다.`},{len:`보통`,t:`아버지 어머니, 벌써 한 해의 한가위입니다.
자주 찾아뵙지 못해 늘 죄송한 마음뿐인데,
두 분 건강하신 것만으로도 저희에게는 큰 힘이 됩니다.
이번 명절 편안하고 따뜻하게 보내세요.`},{len:`보통`,t:`올 한 해도 저희 걱정만 하시느라 애쓰셨습니다.
이번 추석에는 두 분이 푹 쉬시면 좋겠습니다.
맛있는 것 많이 드시고, 건강하세요.
곧 찾아뵙겠습니다.`},{len:`정중하게`,t:`어느새 결실의 계절, 한가위가 돌아왔습니다.
한 해 동안 베풀어 주신 사랑과 보살핌에 깊이 감사드립니다.
둥근 보름달처럼 늘 넉넉하고 평안하시기를 바라며,
무엇보다 두 분의 건강을 빕니다.
풍성하고 행복한 한가위 되세요.`},{len:`멀리 있을 때`,t:`이번 추석에는 사정이 있어 함께하지 못해 마음이 무겁습니다.
멀리서나마 두 분의 건강과 평안을 빕니다.
다음에 찾아뵐 때까지 아무쪼록 몸조심하세요.
사랑합니다.`}]},{key:`boss`,ic:`💼`,name:`직장 상사·동료`,hint:`상사, 선배, 같은 팀`,list:[{len:`짧게`,t:`팀장님, 풍성한 한가위 보내세요.
연휴 동안 푹 쉬시고 편안한 명절 되시길 바랍니다.`},{len:`짧게`,t:`가족과 함께 따뜻하고 넉넉한 한가위 보내세요.
늘 챙겨주셔서 감사합니다.`},{len:`보통`,t:`한가위를 맞아 인사드립니다.
늘 세심하게 챙겨 주시고 이끌어 주셔서 감사합니다.
연휴 동안 편히 쉬시고, 가족과 좋은 시간 보내세요.
연휴 마치고 뵙겠습니다.`},{len:`보통`,t:`올 한 해도 함께 고생 많으셨습니다.
이번 연휴에는 일 생각 접어두시고 푹 쉬셨으면 좋겠습니다.
풍성한 한가위 보내세요.`},{len:`정중하게`,t:`결실의 계절, 한가위를 맞이하여 인사드립니다.
바쁜 가운데에도 늘 아낌없는 가르침과 배려를 베풀어 주셔서 진심으로 감사드립니다.
이번 명절에는 가족과 함께 넉넉하고 평안한 시간 보내시기를 바랍니다.
댁내 두루 평안하시길 기원합니다.`}]},{key:`client`,ic:`🤝`,name:`거래처·고객`,hint:`사장님, 단골, 업무 상대`,list:[{len:`짧게`,t:`풍성한 한가위 보내시길 바랍니다.
늘 변함없는 성원에 감사드립니다.`},{len:`보통`,t:`한가위를 맞아 감사 인사 드립니다.
보내주신 신뢰 덕분에 올 한 해도 잘 지나왔습니다.
가정에 건강과 행복이 가득한 명절 되시길 바랍니다.`},{len:`보통`,t:`넉넉한 한가위 되시길 바랍니다.
앞으로도 변함없는 마음으로 정성껏 하겠습니다.
연휴 동안 편안한 시간 보내세요.`},{len:`정중하게`,t:`민족의 큰 명절 한가위를 맞이하여 인사 올립니다.
한 해 동안 보내주신 관심과 성원에 깊이 감사드립니다.
둥근 보름달처럼 하시는 일마다 원만하게 이루어지시고,
댁내 두루 건강과 평안이 함께하시기를 기원합니다.
풍성한 한가위 보내십시오.`},{len:`가게·매장용`,t:`고객님, 풍성한 한가위 보내세요.
한 해 동안 찾아주셔서 진심으로 감사드립니다.
연휴 동안 잠시 쉬어가며, 명절 이후 더 좋은 모습으로 뵙겠습니다.`}]},{key:`friend`,ic:`😊`,name:`친구·지인`,hint:`친구, 동창, 편한 사이`,list:[{len:`짧게`,t:`풍성한 한가위 보내라!
연휴에 잘 먹고 푹 쉬어.`},{len:`짧게`,t:`한가위 보름달 보면서 네 생각 났다.
올 추석도 넉넉하고 편안하게 보내길.`},{len:`보통`,t:`벌써 추석이네.
올 한 해도 각자 자리에서 애쓰느라 고생 많았다.
이번 연휴엔 아무 생각 말고 푹 쉬어.
조만간 얼굴 한번 보자.`},{len:`보통`,t:`풍성한 한가위 보내라.
기름 냄새 실컷 맡고, 잔소리는 한 귀로 흘리고,
무엇보다 잘 자고 잘 쉬는 연휴이길.`},{len:`오랜만일 때`,t:`오랜만이다. 잘 지내지?
추석이라 문득 생각나서 연락해 봤어.
풍성하고 편안한 명절 보내고, 연휴 지나고 시간 되면 얼굴 한번 보자.`}]},{key:`group`,ic:`💬`,name:`단톡방·여러 명`,hint:`가족방, 동호회, 단체 발송`,list:[{len:`짧게`,t:`모두 풍성한 한가위 보내세요! 🌕
건강하고 넉넉한 연휴 되시길 바랍니다.`},{len:`보통`,t:`한가위 인사 드립니다.
올 한 해도 함께해 주셔서 고맙습니다.
가족과 따뜻한 시간 보내시고, 넉넉한 명절 되세요.`},{len:`보통`,t:`보름달처럼 환하고 넉넉한 한가위 되세요.
오가는 길 안전하게 다녀오시고,
연휴 동안 푹 쉬시길 바랍니다.`},{len:`정중하게`,t:`풍요로운 결실의 계절, 한가위를 맞이하여 인사드립니다.
한 해 동안 베풀어 주신 관심과 정에 깊이 감사드립니다.
가정에 건강과 웃음이 가득한 명절 되시기를 바랍니다.
모두 평안한 한가위 보내십시오.`}]},{key:`info`,ic:`🌾`,name:`추석에 자주 묻는 것`,hint:`차례·성묘·인사 예절`,isInfo:!0,list:[{len:`차례상`,t:`지역과 집안마다 다르지만 흔히 쓰는 기준은 이렇습니다.

· 신위(지방)를 놓은 쪽이 북쪽입니다. 상 차림의 방향은 여기를 기준으로 말합니다.
· 첫째 줄에 밥과 국, 둘째 줄에 고기·생선 같은 적, 셋째 줄에 탕, 넷째 줄에 나물과 포, 다섯째 줄에 과일과 과자를 놓습니다.
· 어동육서 — 생선은 동쪽, 고기는 서쪽에 둡니다.
· 홍동백서 — 붉은 과일은 동쪽, 흰 과일은 서쪽에 둡니다.
· 조율이시 — 왼쪽부터 대추, 밤, 배, 감 순으로 놓습니다.

★집안마다 물려온 방식이 우선입니다. 어른께 여쭤 그대로 따르는 것이 가장 좋습니다.`},{len:`성묘`,t:`· 성묘는 보통 추석 전에 미리 다녀오거나, 추석 당일 차례를 지낸 뒤에 갑니다.
· 벌초는 대개 추석 2~3주 전에 합니다. 너무 일찍 하면 명절 전에 다시 자랍니다.
· 산소에 도착하면 먼저 주변을 정리한 뒤 절을 올립니다.
· 뱀과 벌집을 조심하세요. 긴팔·긴바지에 목이 긴 신발이 안전합니다.
· 예초기를 쓸 때는 보안경을 꼭 착용합니다.`},{len:`인사 예절`,t:`· 웃어른께는 "즐거운 명절 되세요"보다 "건강하세요", "평안하세요"가 더 정중하게 들립니다.
· 상을 당한 지 얼마 되지 않은 분께는 축하 느낌의 인사를 피하고, "평안하시길 바랍니다" 정도로 짧게 전합니다.
· 거래처에는 연휴 시작 2~3일 전에 보내는 것이 무난합니다. 당일 아침에는 메시지가 몰려 묻힙니다.
· 단체 발송이라도 받는 분 이름을 앞에 넣으면 인상이 크게 달라집니다.`},{len:`연휴 일정`,t:`2026년 추석은 9월 25일 금요일입니다.

· 9월 24일 목요일 — 추석 전날
· 9월 25일 금요일 — 추석 당일
· 9월 26일 토요일 — 추석 다음날

토요일이 겹쳐 대체공휴일 적용 여부는 정부 발표를 확인하세요.
귀성길 기차표 예매는 보통 연휴 한 달 전쯤 시작합니다.`}]}];function x(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function S(e){a.textContent=e,a.classList.add(`on`),clearTimeout(S._t),S._t=setTimeout(function(){a.classList.remove(`on`)},1500)}function C(e,t){function n(){t.textContent=`복사했어요`,t.classList.add(`done`),S(`복사했어요. 붙여넣기 하세요`),setTimeout(function(){t.textContent=`복사하기`,t.classList.remove(`done`)},2e3)}try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(e).then(n,function(){r()});return}}catch{}r();function r(){try{var t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.left=`-9999px`,document.body.appendChild(t),t.select(),t.setSelectionRange(0,e.length),document.execCommand(`copy`),document.body.removeChild(t),n()}catch{S(`길게 눌러 복사해 주세요`)}}}function w(){var e=y(),t,n;e.diff>0?(t=`D-`+e.diff,n=e.label):e.diff===0?(t=`오늘`,n=`한가위입니다. 풍성한 하루 되세요`):(t=`한가위가 지났어요`,n=`내년 추석은 2027년 9월 15일입니다`);var r=``;r+=`<div class="dday"><div class="moon"></div>`,r+=`<div class="lbl">2026 추석까지</div>`,r+=`<div class="num">`+x(t)+`</div>`,r+=`<div class="sub">`+x(n)+`</div></div>`,r+=`<div class="desc">보낼 상대를 고르면 그대로 복사해<br>카톡·문자로 보낼 수 있는 인사말이 나와요.</div>`,r+=`<div class="grid">`;for(var a=0;a<b.length;a++){var o=b[a];r+=`<button class="pick" data-i="`+a+`">`,r+=`<span class="ic">`+o.ic+`</span>`+x(o.name),r+=`<span class="hint">`+x(o.hint)+`</span></button>`}r+=`</div>`,r+=`<div class="adnote">버튼을 누르면 광고가 한 번 표시된 뒤 인사말이 나와요.</div>`,r+=`<div class="bannerbox" id="bannerBox"></div>`,r+=`<div class="foot">인사말은 자유롭게 고쳐 쓰셔도 됩니다.<br>로그인이나 개인정보 입력 없이 바로 쓸 수 있어요.</div>`,i.innerHTML=r,window.scrollTo(0,0),_();for(var s=i.querySelectorAll(`button.pick`),c=0;c<s.length;c++)s[c].addEventListener(`click`,function(){var e=parseInt(this.getAttribute(`data-i`),10);l.show(function(){T(e)})})}function T(e){var t=b[e],n=``;if(n+=`<div class="emoji">`+t.ic+`</div>`,n+=`<div class="who">`+x(t.name)+`</div>`,t.isInfo)for(var r=0;r<t.list.length;r++)n+=`<div class="sect"><b>`+x(t.list[r].len)+`</b>`+x(t.list[r].t).replace(/\n/g,`<br>`)+`</div>`;else{n+=`<div class="desc" style="margin-bottom:13px">복사하기를 누르면 그대로 붙여넣어 보낼 수 있어요.</div>`;for(var a=0;a<t.list.length;a++)n+=`<div class="msg"><div class="len">`+x(t.list[a].len)+`</div>`,n+=`<div class="txt">`+x(t.list[a].t)+`</div>`,n+=`<button class="cp" data-k="`+a+`">복사하기</button></div>`}n+=`<div class="bannerbox" id="bannerBox"></div>`,n+=`<button class="ghost" id="back">다른 상대 고르기</button>`,n+=`<div class="foot">문구는 상황에 맞게 고쳐 쓰셔도 됩니다.</div>`,i.innerHTML=n,window.scrollTo(0,0),_();for(var o=i.querySelectorAll(`button.cp`),s=0;s<o.length;s++)o[s].addEventListener(`click`,function(){var e=parseInt(this.getAttribute(`data-k`),10);C(t.list[e].t,this)});document.getElementById(`back`).addEventListener(`click`,w)}w();
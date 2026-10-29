(()=>{
 const phone=matchMedia('(max-width:760px)');
 const shapes={
 car:'<path d="m4 10 2-5h12l2 5M3 10h18v8H3zM6 18v2m12-2v2M6 14h2m8 0h2"/>',
 walk:'<circle cx="13" cy="4" r="2"/><path d="m10 21 2-7-3-4 3-3 3 5 4 1M4 14l4-3m3-3-3 7-3 6m8-7 4 7"/>',
 plane:'<path d="m22 3-7 18-3-8-9-3 19-7ZM12 13l5-5"/>',
 food:'<path d="M5 3v7m3-7v7m-6-7v5a3 3 0 0 0 6 0M5 11v10M18 3c-3 3-3 7 0 9h2V3Zm2 9v9"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 yoga:'<circle cx="12" cy="4" r="2"/><path d="m8 9 4-2 4 2m-4-2v8m-8 5 5-5 3 2 3-2 5 5H4ZM8 9l-3 4H2m14-4 3 4h3"/>',
 dolphin:'<path d="M3 15c5-9 11-10 17-6-4 0-7 2-8 5l4 1-5 2-3-1-4 4 1-6-2 1Zm8-7 2-4 2 3M2 22c3-3 5 1 8-1s5 1 8-1"/>',
 boat:'<path d="M4 15h16l-3 5H7l-3-5Zm8-12v12M11 4 5 12h6m3-7 5 7h-5M2 22c3-3 5 1 8-1s5 1 8-1 3 1 4 0"/>',
 elephant:'<path d="M3 18V9c0-5 10-6 13-3l4 2v9c0 4-5 4-5 0v-4m-9 5v3m7-3v3M3 10l-2 3"/><path d="M13 7c-6-2-7 8-1 8l3-2V9Z"/><circle cx="18" cy="10" r=".5"/>',
 mountain:'<path d="m2 20 7-13 4 7 3-5 6 11H2Zm4-7 3 2 3-2"/><circle cx="18" cy="4" r="2"/>',
 gem:'<path d="M3 8 7 3h10l4 5-9 13L3 8Zm0 0h18M7 3l5 18 5-18M7 3l5 5 5-5"/>',
 safari:'<circle cx="12" cy="13" r="8"/><circle cx="6" cy="5" r="3"/><circle cx="18" cy="5" r="3"/><path d="M8 12h.01M16 12h.01m-6 4 2 2 2-2M12 18v2"/>',
 bed:'<path d="M3 20V7m18 13V7M3 17h18M3 12h18v5M6 8h5v4H6zm7 0h5v4h-5z"/>',
 pool:'<path d="M5 16V4h4m4 12V4h4M5 8h8M5 12h8M2 19c3-3 5 1 8-1s5 1 8-1 3 1 4 0M2 23c3-3 5 1 8-1s5 1 8-1 3 1 4 0"/>',
 map:'<path d="m3 5 6-3 6 3 6-3v17l-6 3-6-3-6 3V5Zm6-3v17m6-14v17"/>',
 doc:'<path d="M14 2H5v20h14V7l-5-5Zm0 0v5h5M8 12h8m-8 4h8"/>',
 qr:'<path d="M3 3h6v6H3zm12 0h6v6h-6zM3 15h6v6H3zm12-1h3v4h3m-9-6h3m-3 5v4h4m5-9v2m-3 7h3"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>',
 moon:'<path d="M21 14A9 9 0 0 1 10 3 9 9 0 1 0 21 14Z"/>',
 activity:'<path d="m12 3 2.8 5.7L21 10l-4.5 4.4 1 6.3L12 18l-5.5 2.7 1-6.3L3 10l6.2-1.3L12 3Z"/>',
 bag:'<rect x="5" y="6" width="14" height="15" rx="2"/><path d="M9 6V3h6v3M9 10v7m6-7v7M8 21v1m8-1v1"/>'
 };
 function kind(text){if(/별도 일정 없음/.test(text))return 'moon';if(/체크아웃.*투어|남부.*투어/.test(text))return 'car';if(/QR|큐알/.test(text))return 'qr';if(/식사|음식|조식|점심|저녁|쿠킹|요리|메뉴/.test(text)&&!/저녁.*산책/.test(text))return 'food';if(/요가/.test(text))return 'yoga';if(/돌고래/.test(text))return 'dolphin';if(/코끼리|Jumbo|메이슨/.test(text))return 'elephant';if(/스노클|마린|만타|항구|보트/.test(text))return 'boat';if(/은공방|은공예|Jewelry/.test(text))return 'gem';if(/바투르|바투루|지프|일몰/.test(text))return 'mountain';if(/사파리/.test(text))return 'safari';if(/비자|항공권 원본|확정서|서류|예약|다운로드|납부|작성 방법/.test(text))return 'doc';if(/수영|시설/.test(text))return 'pool';if(/숙소|객실|스위트|안다즈|코마네카|체크아웃/.test(text)&&!/이동|도착|픽업/.test(text))return 'bed';if(/도보|산책|걸어/.test(text))return 'walk';if(/항공|비행|대한항공|출국|귀국|발리 도착/.test(text))return 'plane';if(/이동|픽업|드랍|차량|Grab|로비|공항/.test(text))return 'car';if(/지도|길찾기/.test(text))return 'map';if(/짐싸기/.test(text))return 'bag';return 'activity';}
 function icon(node,name,style=''){if(!node||node.dataset.mobileIcon)return;node.dataset.mobileIcon=name;const label=document.createElement('span');label.className='icon-label';while(node.firstChild)label.append(node.firstChild);const image=document.createElement('span');image.className='ui-icon '+style;image.setAttribute('aria-hidden','true');image.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" focusable="false">'+(shapes[name]||shapes.activity)+'</svg>';node.append(image,label);node.classList.add('icon-row');}
 function icons(){
  document.querySelectorAll('main h3,.mobile-fold>summary,.stay-activities h4,.meal-menu b').forEach(n=>icon(n,kind(n.textContent),n.matches('#day .period>h3')?'activity-image':''));
  document.querySelectorAll('#day .period>.time').forEach(n=>{if(/^(오전|오후|야간)$/.test(n.textContent.trim()))n.classList.add('general-time');else icon(n,'clock');});
  document.querySelectorAll('#day .details.key-movement,.meal-movement').forEach(n=>icon(n,kind(n.textContent)));
  document.querySelectorAll('.schedule-meal-inclusion,.meal-slot').forEach(n=>icon(n,'food'));
  document.querySelectorAll('#day .period>.label').forEach((n,i)=>icon(n,i===2?'moon':'sun'));
  document.querySelectorAll('[data-tab]').forEach(n=>icon(n,['activity','map','bed','doc','qr'][Number(n.dataset.tab)]));
  document.querySelectorAll('[data-mobile-tab]').forEach(n=>icon(n,n.dataset.mobileTarget?'qr':n.dataset.mobileTab==='2'?'bed':'doc'));
 }

 function fold(nodes,label,kind=''){const list=Array.from(nodes).filter(Boolean);if(!list.length)return;const box=document.createElement('details');box.className='mobile-fold '+kind;box.open=!phone.matches;const summary=document.createElement('summary');summary.textContent=label;const body=document.createElement('div');body.className='mobile-fold-body';list[0].before(box);box.append(summary,body);list.forEach(node=>body.append(node));return box;}
 function one(node,label){if(node&&!node.parentElement.classList.contains('mobile-fold-body'))return fold([node],label);}
 function schedule(){
  document.querySelectorAll('#day .period').forEach(period=>{if(period.querySelector(':scope > .mobile-fold'))return;let visible=0;const extra=[];for(const node of Array.from(period.children)){if(node.matches('.label,h3,.time,.schedule-meal-inclusion,.recommend-badge,.stay-tag'))continue;if(node.matches('.details')&&node.classList.contains('key-movement')&&node.textContent.length<210&&visible<2){visible++;continue;}extra.push(node);}const more=fold(extra,'일정 상세 · 지도 · 영상');if(more)period.append(more);});
  document.querySelectorAll('#day > .box').forEach(node=>one(node,node.classList.contains('airport-pickup')?'공항 픽업 · 기사 만나는 방법':node.querySelector('h3')?.textContent||'예약 자료'));
  one(document.querySelector('#day > .meal-section'),'오늘의 식사 추천');
  const header=document.querySelector('#day .dayhead');if(header&&!document.querySelector('#day > .mobile-quick')){const quick=document.createElement('div');quick.className='mobile-quick';quick.innerHTML='<button type="button" data-mobile-tab="4" data-mobile-target=".arrival-qr-card">입국 QR</button><button type="button" data-mobile-tab="4">여행서류</button><button type="button" data-mobile-tab="2">숙소 정보</button>';header.after(quick);}
  const current=document.querySelector('.date.active'),dates=document.getElementById('dates');if(current&&dates&&phone.matches)dates.scrollLeft=Math.max(0,current.offsetLeft-dates.offsetLeft-dates.clientWidth/2+current.offsetWidth/2);
 }
 function staticViews(){
  document.querySelectorAll('#view-2 .stay').forEach(stay=>{one(stay.querySelector(':scope > .room-card'),'객실 정보 · 객실 사진');one(stay.querySelector(':scope > .stay-gallery'),'수영장 · 시설 사진');one(stay.querySelector(':scope > .stay-activities'),'숙소에서 할 수 있는 체험');stay.querySelectorAll(':scope > .andaz-confirmation,:scope > .komaneka-confirmation').forEach(n=>one(n,'숙소 예약 확정서 · 다운로드'));});
  document.querySelectorAll('#view-3 > .box').forEach(n=>one(n,n.querySelector('h3')?.textContent||'예약 상세 안내'));
  document.querySelectorAll('#view-4 > .box').forEach(n=>one(n,n.querySelector('h3')?.textContent||'여행 서류'));
  document.querySelectorAll('#view-4 .doc-guides > .doc-guide').forEach(n=>one(n,(n.querySelector('h3')?.textContent||'신청')+' · 작성 방법'));
  document.querySelectorAll('#view-1 .map[open]').forEach(n=>{if(phone.matches)n.open=false;});
 }
 function reveal(node){if(!node)return;let p=node.parentElement;while(p){if(p.tagName==='DETAILS')p.open=true;p=p.parentElement;}if(node.tagName==='DETAILS')node.open=true;node.scrollIntoView({block:'start',behavior:'instant'});}
 document.addEventListener('click',event=>{const quick=event.target.closest('[data-mobile-tab]');if(quick){document.querySelector('[data-tab="'+quick.dataset.mobileTab+'"]').click();requestAnimationFrame(()=>{if(quick.dataset.mobileTarget)reveal(document.querySelector('#view-'+quick.dataset.mobileTab+' '+quick.dataset.mobileTarget));else window.scrollTo({top:0,behavior:'instant'});});return;}const anchor=event.target.closest('a[href^="#"]');if(anchor){const id=anchor.getAttribute('href').slice(1);if(id){const node=document.getElementById(id);if(node)reveal(node);}}if(event.target.closest('.tabs .tab')&&phone.matches)requestAnimationFrame(()=>window.scrollTo({top:0,behavior:'instant'}));});
 const previous=render;render=function(){previous();schedule();icons();};staticViews();schedule();icons();
 phone.addEventListener('change',()=>document.querySelectorAll('.mobile-fold').forEach(n=>n.open=!phone.matches));
 let printState=[];addEventListener('beforeprint',()=>{printState=Array.from(document.querySelectorAll('.mobile-fold')).map(n=>[n,n.open]);printState.forEach(([n])=>n.open=true);});addEventListener('afterprint',()=>printState.forEach(([n,open])=>n.open=open));
})();

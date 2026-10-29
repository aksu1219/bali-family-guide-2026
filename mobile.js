(()=>{
 const phone=matchMedia('(max-width:760px)');
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
 const previous=render;render=function(){previous();schedule();};staticViews();schedule();
 phone.addEventListener('change',()=>document.querySelectorAll('.mobile-fold').forEach(n=>n.open=!phone.matches));
 let printState=[];addEventListener('beforeprint',()=>{printState=Array.from(document.querySelectorAll('.mobile-fold')).map(n=>[n,n.open]);printState.forEach(([n])=>n.open=true);});addEventListener('afterprint',()=>printState.forEach(([n,open])=>n.open=open));
})();

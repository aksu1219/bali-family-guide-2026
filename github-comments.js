(()=>{
 const initialUrl=new URL(location.href);
 const initialDay=initialUrl.searchParams.get('day');
 if(initialDay!==null&&/^[0-8]$/.test(initialDay))selected=+initialDay;
 let config=null,slot=/^[0-3]$/.test(initialUrl.searchParams.get('slot')||'')?initialUrl.searchParams.get('slot'):'0';
 const labels=['오전일정','오후일정','야간일정','기타'];
 function attach(){
  if(!config)return;
  const day=document.getElementById('day'),header=day.querySelector('.dayhead');
  const selector=document.createElement('section');selector.className='github-comment-selector';
  selector.innerHTML='<h3>코멘트 작성</h3><div class="github-login-guide"><p><b>코멘트를 작성하려면 GitHub 로그인이 필요합니다.</b></p><a class="github-login-button" href="https://giscus.app/api/oauth/authorize">GitHub 로그인하고 코멘트 작성</a><p class="github-login-help">처음 연결할 때 Giscus 권한을 승인하면 이 페이지로 돌아옵니다.</p></div><label>코멘트를 남길 일정<select aria-label="코멘트를 남길 일정">'+labels.map((label,i)=>'<option value="'+i+'">'+label+'</option>').join('')+'</select></label><button class="github-comment-jump" type="button">선택한 일정의 댓글창으로 이동 ↓</button><p>댓글은 가족의 모든 기기에 함께 표시됩니다.</p>';
  header.after(selector);selector.querySelector('select').value=slot;
  selector.querySelector('select').onchange=e=>{slot=e.target.value;showThread();};
  selector.querySelector('.github-comment-jump').onclick=()=>{document.querySelector('.github-comments-panel').scrollIntoView({behavior:'smooth',block:'start'});};
  showThread();
 }
 function showThread(){
  document.querySelectorAll('.github-comments-panel').forEach(n=>n.remove());
  const thread=config.threads[selected+'-'+slot];if(!thread)return;
  const url=new URL(location.href);url.searchParams.set('day',String(selected));url.searchParams.set('slot',slot);history.replaceState(null,'',url);
  const redirect=new URL(url);redirect.searchParams.delete('giscus');redirect.hash='';
  document.querySelector('.github-login-button').href='https://giscus.app/api/oauth/authorize?redirect_uri='+encodeURIComponent(redirect.href);
  const section=document.createElement('section');section.className='github-comments-panel';
  section.innerHTML='<h4>'+esc(labels[+slot])+' 코멘트</h4><p class="github-comments-note">댓글 작성 시 GitHub 계정명이 표시됩니다.</p><a class="action primary" href="'+esc(thread.url)+'#discussion-comment-form" target="_blank" rel="noopener noreferrer">GitHub에서 로그인·코멘트 작성 ↗</a><p class="github-comments-note">게시한 댓글은 이 일정에 연결된 GitHub 토론에 저장됩니다.</p>';
  const anchor=+slot===3?document.querySelector('.github-comment-selector'):document.querySelectorAll('#day .period')[+slot];anchor.append(section);
  if(!config.appReady){const note=document.createElement('p');note.className='github-comments-note';note.textContent='위 버튼으로 바로 작성할 수 있습니다. 페이지 안 댓글창은 Giscus 연결 후 표시됩니다.';section.append(note);return;}
  const container=document.createElement('div');container.className='giscus';section.append(container);
  const script=document.createElement('script');script.src='https://giscus.app/client.js';script.crossOrigin='anonymous';script.async=true;
  Object.assign(script.dataset,{repo:config.repo,repoId:config.repoId,category:config.category,categoryId:config.categoryId,mapping:'number',term:String(thread.number),strict:'0',reactionsEnabled:'0',emitMetadata:'0',inputPosition:'top',theme:'light',lang:'ko'});
  script.onload=()=>{const frame=document.querySelector('.giscus-frame');if(!frame)return;const apply=()=>{const current=config.threads[selected+'-'+slot],frameUrl=new URL(frame.src);if(frameUrl.searchParams.get('number')!==String(current.number)){frameUrl.searchParams.set('number',String(current.number));const backlink=new URL(location.href);backlink.searchParams.delete('giscus');frameUrl.searchParams.set('origin',backlink.href);frameUrl.searchParams.set('backLink',backlink.href);frame.src=frameUrl.href;return;}frame.contentWindow.postMessage({giscus:{setConfig:{number:current.number}}},'https://giscus.app');};frame.addEventListener('load',apply);apply();};section.append(script);
 }
 const previous=render;render=function(){previous();attach();};
 fetch('./github-comments-config.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Comment configuration unavailable');return r.json();}).then(data=>{config=data;render();}).catch(()=>{const note=document.createElement('p');note.className='github-comments-note';note.textContent='댓글 연결을 불러오지 못했습니다. 페이지를 새로고침해 주세요.';document.querySelector('#day .dayhead').after(note);});
})();

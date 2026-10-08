// Apply the requested generic examples to previously saved lists as well.
if(!data.genericExamplesApplied){
 const replacements=new Map([['\uC5F0\uAE30 \uD559\uC6D0','학원'],['\uB300\uBCF8','교재'],['\uCE90\uB9AD\uD130 \uBD84\uC11D \uB178\uD2B8','필기 노트']]);
 for(const p of data.places){p.name=replacements.get(p.name)||p.name;for(const item of p.items)item.name=replacements.get(item.name)||item.name;}
 for(const item of data.common)item.name=replacements.get(item.name)||item.name;
 data.genericExamplesApplied=true;save();
}
addPlace.insertAdjacentHTML('afterend','<button id="locationMenu">📍 중요한 물건 놓는 장소</button>');
$('listTitle').parentElement.insertAdjacentHTML('afterend','<button id="mainAddLocation" class="primary" hidden>＋ 물건과 위치 추가</button>');
const navigationRender=render;
render=function(){navigationRender();const home=mode==='home';categoryActions.hidden=home;$('locationMenu').classList.toggle('selected',home);$('locationMenu').setAttribute('aria-pressed',home);$('mainAddLocation').hidden=!home;if(home){$('title').textContent='중요한 물건 놓는 장소';$('viewHint').textContent='자주 쓰는 물건의 자리를 추가하거나 수정하세요.';$('listTitle').textContent='물건과 고정 위치';}};
$('locationMenu').onclick=()=>{mode='home';render()};
$('mainAddLocation').onclick=()=>openEditor('location');
render();

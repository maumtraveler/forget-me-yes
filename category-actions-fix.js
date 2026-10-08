// Category management stays available even in the one-level layout.
if(!$('addParentCategory')){$('items').insertAdjacentHTML('beforebegin','<div id="categoryActions" class="category-actions"><button id="addParentCategory">＋ 준비물 카테고리 추가</button></div>');$('addParentCategory').onclick=()=>showCategoryDialog();}
if(!$('categoryCreator')){document.querySelector('.list-head').insertAdjacentHTML('afterend','<button id="categoryCreator" class="category-create-button">＋ 준비물 카테고리 추가</button>');$('categoryCreator').onclick=()=>showCategoryDialog();}
const categoryActionFixRender=render;
render=function(){categoryActionFixRender();if(mode==='home')return;const all=document.querySelectorAll('#categoryActions');all.forEach((x,i)=>{if(i>0)x.remove()});const actions=$('categoryActions');if(actions)actions.hidden=false;const add=$('addParentCategory');if(add){add.style.display='inline-flex';add.textContent='＋ 준비물 카테고리 추가';add.setAttribute('aria-label','준비물 카테고리 추가');add.onclick=()=>showCategoryDialog();}};
render();

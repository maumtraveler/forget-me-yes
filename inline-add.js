function inlineAdd(parent,sub,section){
  section.querySelector('.inline-category-form')?.remove();
  const form=document.createElement('form');form.className='inline-category-form';
  form.innerHTML=`<div class="inline-form-title"><strong>${esc(parent)}</strong>${sub?` <span>› ${esc(sub)}</span>`:''}</div><div class="inline-form-row"><input required maxlength="100" placeholder="이 카테고리에 넣을 준비물" aria-label="${esc(parent)} 준비물 이름"><input maxlength="50" placeholder="하위 카테고리 (선택)" value="${esc(sub||'')}" aria-label="하위 카테고리"><button class="primary">＋ 추가</button><button type="button" class="cancel-inline">취소</button></div>`;
  section.append(form);form.querySelector('input').focus();
  form.onsubmit=e=>{e.preventDefault();const inputs=form.querySelectorAll('input'),name=inputs[0].value.trim(),child=inputs[1].value.trim();if(!name)return;const common=view==='common';rememberCategory(parent,child);const item={...make([name],common?'공통 필수품':parent)[0],category:parent,subcategory:child};(common?data.common:place().items).push(item);save();render();};
  form.querySelector('.cancel-inline').onclick=()=>form.remove();
}
const oldHierarchyItemsClick=$('items').onclick;
$('items').onclick=e=>{const add=e.target.closest('[data-new-item]'),nested=e.target.closest('[data-sub-item]');if(add){inlineAdd(displayedGroups[Number(add.dataset.newItem)].name,'',e.target.closest('.category-group'));return}if(nested){const g=displayedGroups[Number(nested.dataset.subItem)],sub=[...g.children.keys()][Number(nested.dataset.subIndex)];inlineAdd(g.name,sub,e.target.closest('.category-group'));return}oldHierarchyItemsClick(e)};

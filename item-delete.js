const itemDeleteBaseRender=render;
render=function(){itemDeleteBaseRender();if(mode==='home')return;document.querySelectorAll('.item').forEach(row=>{const edit=row.querySelector('[data-edit]');if(edit&&!row.querySelector('[data-delete-item]'))edit.insertAdjacentHTML('beforebegin','<button data-delete-item="'+edit.dataset.edit+'" class="item-delete">삭제</button>');});};
const itemDeleteBaseClick=$('items').onclick;
$('items').onclick=e=>{const b=e.target.closest('[data-delete-item]');if(!b)return itemDeleteBaseClick(e);const id=b.dataset.deleteItem,items=[...data.common,...place().items],item=items.find(x=>x.id===id);if(!item)return;if(!confirm(`‘${item.name}’만 삭제할까? 카테고리는 그대로 남아.`))return;data.common=data.common.filter(x=>x.id!==id);place().items=place().items.filter(x=>x.id!==id);Object.keys(data.checks).filter(k=>k.endsWith(id)).forEach(k=>delete data.checks[k]);save();render();};
render();

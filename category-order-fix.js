data.categoryOrder=data.categoryOrder||{};
const categoryOrderBaseRender=render;
render=function(){categoryOrderBaseRender();if(mode==='home')return;const key=treeKey(),groups=[...document.querySelectorAll('.category-group')],stored=data.categoryOrder[key]||[],names=groups.map(g=>g.querySelector('h3')?.textContent||'');const order=[...stored,...names.filter(n=>!stored.includes(n))];data.categoryOrder[key]=order;const byName=new Map(groups.map(g=>[g.querySelector('h3')?.textContent,g]));const items=$('items');order.forEach(n=>{const g=byName.get(n);if(g)items.append(g)});save();};
const originalCategorySubmit=$('categoryForm').onsubmit;
$('categoryForm').onsubmit=e=>{const name=$('categoryName').value.trim();const parent=$('categoryParent').value;if(name&&!parent){const key=treeKey();data.categoryOrder[key]=[...(data.categoryOrder[key]||[]).filter(x=>x!==name),name]}originalCategorySubmit(e)};
render();

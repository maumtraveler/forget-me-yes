// Keep one simple level: category -> items. Existing subcategories are flattened.
for(const p of data.places){for(const item of p.items)item.subcategory='';}
for(const item of data.common)item.subcategory='';
document.body.insertAdjacentHTML('beforeend','<style>.sub-heading,.empty-sub,[data-new-sub],#newSubcategory,#editSubcategory,#editSubcategoryLabel,.category-field label[for="newSubcategory"],.category-actions #addParentCategory{display:none!important}.inline-form-row input:nth-child(2){display:none!important}</style>');
const flatRender=render;
render=function(){flatRender();if(mode==='home')return;document.querySelectorAll('.category-group').forEach(section=>{section.querySelectorAll('.subgroup').forEach(sub=>{const head=sub.querySelector('.sub-heading');if(head)head.remove();});section.querySelectorAll('.group-tools').forEach(tools=>{tools.querySelectorAll('[data-new-sub]').forEach(x=>x.remove());});});};
const flatItemClick=$('items').onclick;
$('items').onclick=e=>{if(e.target.closest('[data-new-sub]')||e.target.closest('[data-sub-item]'))return;flatItemClick(e)};
const flatAdd=$('addForm').onsubmit;
$('addForm').onsubmit=e=>{const sub=$('newSubcategory');if(sub)sub.value='';flatAdd(e)};
render();

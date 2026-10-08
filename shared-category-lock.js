const sharedCategoryName='모든 외출 기본템';
// Adding from the shared category always writes to the common list.
const sharedInlineAdd=inlineAdd;
inlineAdd=function(parent,sub,section){if(parent===sharedCategoryName) view='common';sharedInlineAdd(parent,'',section)};
const sharedCategoryRender=render;
render=function(){sharedCategoryRender();document.querySelectorAll('.category-group').forEach(section=>{const h=section.querySelector('.category-heading h3');if(h&&h.textContent===sharedCategoryName){const edit=section.querySelector('.category-rename');if(edit)edit.remove();}});};
render();

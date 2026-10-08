const copyCategoryBaseRender=render;
render=function(){copyCategoryBaseRender();if(mode==='home')return;document.querySelectorAll('.category-group').forEach((section,i)=>{const head=section.querySelector('.category-heading');if(!head||head.querySelector('[data-copy-category]'))return;head.insertAdjacentHTML('beforeend',`<button class="category-copy" data-copy-category="${i}">↗ 다른 장소에 복사</button>`)});};
render();

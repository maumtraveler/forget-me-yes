const menuCleanupRender=render;
render=function(){menuCleanupRender();const label=document.querySelector('.menu-section>.eyebrow');if(label)label.textContent='필수 준비물 관리';const essential=$('essentialMenu'),common=$('commonMenu');if(essential){essential.textContent='✓ 모든 외출 기본템';essential.setAttribute('aria-label','모든 외출 기본템');}if(common)common.style.display='none';};
if($('essentialMenu'))$('essentialMenu').onclick=()=>{mode='out';view='common';render();essentialMenu.classList.add('selected');};
render();

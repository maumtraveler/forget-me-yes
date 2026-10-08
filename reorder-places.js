const reorderPlacesRender=render;
function drawPlaceOrder(){
 const nav=$('places');nav.innerHTML=data.places.map((x,i)=>`<div class="place-row"><button data-place="${x.id}" class="place-select ${place().id===x.id&&view!=='common'?'active':''}"><span aria-hidden="true">${themeFor(x).icon}</span>${esc(x.name)}<span class="place-count">${x.items.length+data.common.length}</span></button><span class="place-arrows"><button data-up-place="${x.id}" ${i===0?'disabled':''} aria-label="${esc(x.name)} 위로">↑</button><button data-down-place="${x.id}" ${i===data.places.length-1?'disabled':''} aria-label="${esc(x.name)} 아래로">↓</button></span></div>`).join('');
}
render=function(){reorderPlacesRender();drawPlaceOrder();};
$('places').onclick=e=>{const up=e.target.closest('[data-up-place]'),down=e.target.closest('[data-down-place]');if(up||down){const id=(up||down).dataset[up?'upPlace':'downPlace'],i=data.places.findIndex(x=>x.id===id),j=up?i-1:i+1;if(j<0||j>=data.places.length)return;[data.places[i],data.places[j]]=[data.places[j],data.places[i]];save();render();return}const select=e.target.closest('[data-place]');if(select){data.selected=select.dataset.place;view='all';mode='out';save();render()}};
render();

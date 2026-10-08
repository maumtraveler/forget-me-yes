// Common basics use one fixed category everywhere.
const sharedBasics='모든 외출 기본템';
data.common.forEach(item=>{item.category=sharedBasics;item.subcategory='';item.group='공통 필수품'});
if(data.categoryTrees){for(const key of Object.keys(data.categoryTrees)){const entries=data.categoryTrees[key]||[];const old=entries.filter(c=>c.name==='기본템'||c.name==='공통 준비물');old.forEach(c=>c.children=[]);if(!entries.some(c=>c.name===sharedBasics))entries.unshift({name:sharedBasics,children:[]});data.categoryTrees[key]=entries.filter((c,i,a)=>a.findIndex(x=>x.name===c.name)===i)}}
save();
const sharedRender=render;
render=function(){sharedRender();if(mode==='home')return;document.querySelectorAll('.category-group').forEach(section=>{const heading=section.querySelector('h3');if(heading&&['기본템','공통 준비물'].includes(heading.textContent))heading.textContent=sharedBasics;});};
render();

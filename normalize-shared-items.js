const fixedCommonNames=new Set(['핸드폰','카드','안경']);
const commonByName=new Map(data.common.map(x=>[x.name,x]));
for(const p of data.places){
 const keep=[];
 for(const item of p.items){
  if(item.category==='모든 외출 기본템'||fixedCommonNames.has(item.name)){
   if(!commonByName.has(item.name)){item.category='모든 외출 기본템';item.group='공통 필수품';item.subcategory='';commonByName.set(item.name,item);data.common.push(item)}
  }else keep.push(item)
 }
 p.items=keep;
}
data.common.forEach(x=>{x.category='모든 외출 기본템';x.group='공통 필수품';x.subcategory=''});
data.common=[...new Map(data.common.map(x=>[x.name,x])).values()];save();render();

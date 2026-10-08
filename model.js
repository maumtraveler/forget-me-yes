(function(root){
 const uid=()=>globalThis.crypto.randomUUID();
 const names=s=>s.split(/\s*(?:,|，|、|\n|이랑|랑|하고|그리고)\s*|\s+/).map(x=>x.trim()).filter(Boolean);
 function parseCommand(raw,places,current){
  let text=raw.trim().replace(/[.!?。]+$/,'');
  const editAction=/(?:수정|변경)\s*(?:해\s*(?:줘|주세요)|해|하기)?$|바꿔\s*(?:줘|주세요)?$/;
  const categoryRename=text.match(/^(.+?)\s*카테고리(?:의)?\s*(?:이름(?:을|를)?\s*)?(?:를|을)?\s*(.+?)(?:으로|로)\s*(?:(?:수정|변경)\s*해\s*(?:줘|주세요)|바꿔\s*(?:줘|주세요))$/);
  if(categoryRename&&!/카테고리\s*에/.test(text)){const oldName=categoryRename[1].trim(),newName=categoryRename[2].trim();const p=places.find(p=>p.name===oldName);return {type:'rename-category',place:p?p.id:null,oldName,newName};}
  let target=null,explicit=false;
  // Consume a known destination before interpreting the action or item names.
  for(const p of [...places].sort((a,b)=>b.name.length-a.name.length)){
   if(!text.startsWith(p.name))continue;
   const tail=text.slice(p.name.length);
   const bareCategory=/(?:삭제|지워|빼)/.test(text)?tail.match(/^\s*카테고리\s+/):null;
   const prefix=bareCategory||tail.match(/^\s*(?:카테고리\s*)?(?:에서|에다가|에는|에)\s*/);
   if(prefix){target=p.id;explicit=true;text=tail.slice(prefix[0].length);break;}
  }
  if(!explicit){
   const create=text.match(/^(.+?)\s*(?:카테고리|준비물)\s*(?:를\s*)?(?:만들어\s*줘|만들어\s*주세요|생성해\s*줘|추가해\s*줘|만들기)$/);
   if(create)return {type:'category',name:create[1].trim()};
   const bareUnknown=/(?:삭제|지워|빼)/.test(text)?text.match(/^.+?카테고리\s+/):null;
   const unknown=bareUnknown||text.match(/^.+?(?:\s*카테고리\s*)?(?:에서|에다가|에는|에)\s+/);
   if(unknown){explicit=true;text=text.slice(unknown[0].length);}
  }
  if(editAction.test(text)){
   const body=text.replace(editAction,'').trim().replace(/^(?:있는|등록된)\s+/, '');
   const match=body.match(/^(.+?)(?:을|를)\s+(.+?)(?:으로|로)$/)||body.match(/^(.+?)\s+(.+?)(?:으로|로)$/);
   if(!match)return {type:'invalid-edit'};
   return {type:'edit',place:target||(explicit?null:current),oldName:match[1].trim(),newName:match[2].trim()};
  }
  const deletion=text.match(/\s*(?:삭제\s*(?:시켜\s*(?:줘|주세요)|해\s*(?:줘|주세요)|해|하기)?|지워\s*(?:줘|주세요)?|빼\s*(?:줘|주세요)?)$/);
  if(deletion){const query=text.slice(0,deletion.index).trim().replace(/^(?:있는|등록된|등록(?:되어|돼)\s*있는|저장(?:되어|돼)\s*있는|들어\s*있는)\s+/, '').replace(/(?:을|를)$/,'').trim();return {type:'delete',place:target||(explicit?null:current),query};}
  if(/삭제|지워|빼줘|수정|변경|바꿔/.test(text))return {type:'invalid-edit'};
  text=text.replace(/\s*(?:(?:추가|등록)\s*(?:시켜\s*(?:줘|주세요)|해\s*(?:줘|주세요)|해|하기)?|넣어\s*(?:줘|주세요))$/,'').trim();
  const clean=s=>s.trim().replace(/(?:준비물(?:을|를)?|을|를)$/,'').trim();
  // Separators preserve multiword names; protect common compound names in space-separated lists.
  const compounds=['휴대폰 충전기','핸드폰 충전기','노트북 충전기','보조 배터리','등산 스틱','등산 장갑','목욕 타월','마른 수건','여벌 옷','차 키','집 카드키'];
  let parts;
  if(/,|，|、|\n|이랑|랑|하고|그리고/.test(text))parts=text.split(/\s*(?:,|，|、|\n|이랑|랑|하고|그리고)\s*/);
  else {text=clean(text);for(const phrase of compounds)text=text.split(phrase).join(phrase.replace(/ /g,'\u00a0'));parts=text.split(/ +/).map(s=>s.replace(/\u00a0/g,' '));}
  return {type:'items',place:target||(explicit?null:current),names:[...new Set(parts.map(clean).filter(Boolean))]};
 }
 function isDeleteAll(query){
  const q=query.trim().replace(/^(?:있는|등록된|등록(?:되어|돼)\s*있는|저장(?:되어|돼)\s*있는|들어\s*있는)\s+/, '').replace(/(?:을|를)$/,'').replace(/\s+/g,'');
  const noun='(?:(?:준비물|항목)(?:리스트|목록)?|리스트|목록)';
  return new RegExp('^(?:(?:모든|전체|전부|모두)'+noun+'|'+noun+'(?:을|를)?(?:모두|전부|전체|다)?|전체|전부|모두|다)$').test(q);
 }
 function matchDeletion(query,items){
  const normalized=s=>s.trim().replace(/\s+/g,' ');
  const candidates=[...new Set(items.map(i=>normalized(i.name)))].sort((a,b)=>b.length-a.length);
  let rest=normalized(query),found=[],missing=[];
  while(rest){
   const name=candidates.find(n=>rest.startsWith(n)&&(!rest.slice(n.length)||/^(?:\s|,|，|、|이랑|랑|하고|그리고|을|를|와|과)/.test(rest.slice(n.length))));
   if(name){found.push(name);rest=rest.slice(name.length).replace(/^(?:을|를)?(?:\s*(?:,|，|、|이랑|랑|하고|그리고|와|과)\s*|\s+)?/,'').trim();}
   else {const m=rest.match(/^.*?(?=,|，|、|이랑|랑|하고|그리고|$)/);const piece=m&&m[0]?m[0]:rest;missing.push(piece);rest=rest.slice(piece.length).replace(/^(?:,|，|、|이랑|랑|하고|그리고)\s*/,'').trim();}
  }
  return {ids:items.filter(i=>found.includes(normalized(i.name))).map(i=>i.id),missing};
 }
 function parseLocation(raw){
  const original=raw.trim().replace(/[.!?。]+$/,'');
  const commandless=original.replace(/\s*(?:추가해\s*(?:줘|주세요)|추가해|등록해\s*(?:줘|주세요)|등록해|넣어\s*(?:줘|주세요)|넣어)\s*$/,'').trim();
  const marked=commandless.match(/^(.+?)\s+(.+?)(?:으로|로|에)$/);
  if(marked)return {name:marked[1].trim(),location:marked[2].trim()};
  const s=commandless.replace(/(?:으로|로)$/,'').trim();
  const marker=s.match(/^(.+?)\s+위치는\s+(.+)$/);
  if(marker)return {name:marker[1].trim(),location:marker[2].trim()};
  const compound=['휴대폰 충전기','핸드폰 충전기','노트북 충전기','안경 케이스','집 카드키','차 키','자동차 키','카드 지갑'];
  const n=compound.find(n=>s.startsWith(n+' '))||s.split(/\s+/)[0]||'';
  return {name:n,location:s.slice(n.length).trim()};
 }
 function migrate(old,C){
  const data=JSON.parse(JSON.stringify(old));
  data.places=data.places||[];
  if(!data.finalDefaults){
   const bon=data.places.find(p=>p.name==='본원');if(bon)bon.name=C.defaults.places[0];
   C.defaults.places.forEach(name=>{if(!data.places.some(p=>p.name===name))data.places.push({id:uid(),name,items:[]});});
   data.finalDefaults=true;
  }
  data.common=data.common||[];data.locations=data.locations||[];data.checks=data.checks||{};
  data.places.forEach(p=>{p.hiddenCommon=Array.isArray(p.hiddenCommon)?p.hiddenCommon:[];});
  const iconFor=n=>/등산/.test(n)?'mountain':/여행/.test(n)?'plane':/출장/.test(n)?'case':/캠핑/.test(n)?'tent':/수영|운동/.test(n)?'water':/외출/.test(n)?'shopping':'bag';
  data.places.forEach(p=>{
   p.icon=p.icon||iconFor(p.name);p.items=p.items||[];
   const tree=(data.categoryTrees||{})[p.id]||[];
   const from=tree.map(t=>t.name).concat(p.items.map(x=>x.category||x.group||C.defaults.base));
   const order=(data.categoryOrder||{})[p.id]||[];
   p.groups=p.groups||[...new Set([...order,...from])].filter(n=>n!==C.packing.shared&&n!=='공통 필수품');
   p.items.forEach(i=>{i.category=i.category||i.group||C.defaults.base;});
  });
  data.locationCategories=data.locationCategories||C.defaults.locationCategories.map(name=>({id:uid(),name}));
  if(!data.locationCategoryCleanup){
   const legacy=data.locationCategories.find(c=>c.name==='필수 물건 관리');
   const other=data.locationCategories.find(c=>c.name==='기타')||data.locationCategories[0];
   if(legacy){data.locations.forEach(i=>{if(i.locationCategory===legacy.id)i.locationCategory=other.id;});data.locationCategories=data.locationCategories.filter(c=>c!==legacy);}
   data.locationCategoryCleanup=true;
  }
  const frequent=data.locationCategories.find(c=>c.name==='자주 쓰는 것');
  if(frequent)frequent.name='자주 쓰는 필수품';
  // 이전 버전에서 자동으로 만들어진 빈 '여행 필수' 메뉴는 기본 메뉴에서 제거한다.
  // 해당 메뉴에 사용자가 저장한 물건이 있으면 기록을 보존하기 위해 남겨 둔다.
  const travel=data.locationCategories.find(c=>c.name==='여행 필수');
  if(travel&&!data.locations.some(i=>i.locationCategory===travel.id))data.locationCategories=data.locationCategories.filter(c=>c!==travel);
  if(!data.finalLocationDefaults){C.defaults.locationCategories.forEach(name=>{if(!data.locationCategories.some(c=>c.name===name))data.locationCategories.push({id:uid(),name});});data.finalLocationDefaults=true;}
  if(!data.locationCategories.length&&data.locations.length)data.locationCategories.push({id:uid(),name:C.defaults.locationCategories[0]});
  data.locations.forEach(i=>{if(!data.locationCategories.some(c=>c.id===i.locationCategory))i.locationCategory=data.locationCategories[0].id;i.memo=i.memo||'';});
  data.recent=data.recent||[];data.schema=2;return data;
 }
 root.ChecklistModel={uid,parseCommand,isDeleteAll,matchDeletion,parseLocation,migrate};
})(typeof window==='undefined'?globalThis:window);


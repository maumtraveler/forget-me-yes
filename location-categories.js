(() => {
  const defaultId = 'essential-objects';
  if (!Array.isArray(data.locationCategories)) data.locationCategories = [{id:defaultId,name:'필수 물건 관리'}];
  for (const item of data.locations) {
    if (!data.locationCategories.some(c => c.id === item.locationCategory)) item.locationCategory = data.locationCategories[0].id;
  }
  save();
  const categoryButton = document.createElement('button');
  categoryButton.id = 'addLocationCategory';
  categoryButton.textContent = '＋ 물건 카테고리 추가';
  categoryButton.className = 'location-category-add';
  $('mainAddLocation').after(categoryButton);
  $('editLocation').insertAdjacentHTML('afterend','<label id="objectCategoryLabel" for="objectCategorySelect">물건 카테고리</label><select id="objectCategorySelect"></select>');
  document.body.insertAdjacentHTML('beforeend', '<dialog id="objectCategoryDialog"><form id="objectCategoryForm"><h2 id="objectCategoryTitle">물건 카테고리 추가</h2><label for="objectCategoryName">카테고리 이름</label><input id="objectCategoryName" required maxlength="50" placeholder="예: 여행용 물건, 전자기기"><div class="dialog-actions"><button type="button" id="objectCategoryDelete" class="danger" hidden>카테고리 삭제</button><button type="button" id="objectCategoryCancel">취소</button><button class="primary">저장</button></div></form></dialog>');
  let selectedCategory = null;
  let pendingDelete = null;
  document.body.insertAdjacentHTML('beforeend', '<dialog id="objectDeleteDialog"><h2>삭제 확인</h2><p id="objectDeleteMessage"></p><div class="dialog-actions"><button type="button" id="objectDeleteCancel">취소</button><button type="button" id="objectDeleteConfirm" class="danger">삭제하기</button></div></dialog>');
  $('objectDeleteCancel').onclick = () => { pendingDelete = null; $('objectDeleteDialog').close(); };
  $('objectDeleteConfirm').onclick = () => {
    if (!pendingDelete) return;
    const {type,id} = pendingDelete;
    if (type === 'category') {
      data.locations = data.locations.filter(x => x.locationCategory !== id);
      data.locationCategories = data.locationCategories.filter(c => c.id !== id);
    } else data.locations = data.locations.filter(x => x.id !== id);
    pendingDelete = null; save(); render(); $('objectDeleteDialog').close();
  };
  const oldOpen = openEditor;
  openEditor = function(type,item) {
    if (type === 'location' && !data.locationCategories.length) { editCategory(null); return; }
    oldOpen(type,item);
    const location = type === 'location';
    $('objectCategoryLabel').hidden = $('objectCategorySelect').hidden = !location;
    if (location) {
      $('objectCategorySelect').innerHTML = data.locationCategories.map(c => `<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('');
      $('objectCategorySelect').value = item?.locationCategory || data.locationCategories[0].id;
    }
  };
  const oldSubmit = $('editForm').onsubmit;
  $('editForm').onsubmit = function(e) {
    if (editing.type !== 'location') return oldSubmit.call(this,e);
    e.preventDefault();
    const name = $('editName').value.trim();
    if (!name) return;
    const values = {name,location:$('editLocation').value.trim(),locationCategory:$('objectCategorySelect').value};
    if (editing.item) Object.assign(editing.item,values);
    else data.locations.push({id:uid(),checked:false,...values});
    save();render();$('editor').close();
  };
  function editCategory(id) {
    selectedCategory = id;
    objectCategoryDelete.hidden = !id;
    $('objectCategoryTitle').textContent = id ? '물건 카테고리 수정' : '물건 카테고리 추가';
    $('objectCategoryName').value = data.locationCategories.find(c=>c.id===id)?.name || '';
    $('objectCategoryName').setCustomValidity('');
    $('objectCategoryDialog').showModal();$('objectCategoryName').focus();
  }
  categoryButton.onclick = () => editCategory(null);
  $('objectCategoryDelete').onclick = () => {
    const category = data.locationCategories.find(c => c.id === selectedCategory);
    if (!category) return;
    pendingDelete = {type:'category',id:category.id};
    $('objectDeleteMessage').textContent = `‘${category.name}’ 카테고리를 삭제할까? 안의 물건과 위치 기록까지 모두 삭제돼.`;
    $('objectCategoryDialog').close();
    $('objectDeleteDialog').showModal();
  };
  $('objectCategoryCancel').onclick = () => $('objectCategoryDialog').close();
  $('objectCategoryName').oninput = () => $('objectCategoryName').setCustomValidity('');
  $('objectCategoryForm').onsubmit = e => {
    e.preventDefault();const name=$('objectCategoryName').value.trim();if(!name)return;
    if(data.locationCategories.some(c=>c.name===name&&c.id!==selectedCategory)) {
      $('objectCategoryName').setCustomValidity('이미 있는 카테고리 이름이야.');$('objectCategoryName').reportValidity();return;
    }
    if(selectedCategory)data.locationCategories.find(c=>c.id===selectedCategory).name=name;
    else data.locationCategories.push({id:uid(),name});
    save();render();$('objectCategoryDialog').close();
  };
  const oldRender = render;
  render = function() {
    oldRender();categoryButton.hidden = mode !== 'home';
    if(mode !== 'home')return;
    $('items').innerHTML=data.locationCategories.map(c=>{
      const items=data.locations.filter(x=>x.locationCategory===c.id);
      return `<section class="object-category"><div class="category-heading"><h3>${esc(c.name)}</h3><button data-object-category-edit="${esc(c.id)}" class="text-btn">수정</button></div><button class="text-btn" data-object-add="${esc(c.id)}">＋ 물건과 위치 추가</button>${items.map(x=>`<div class="item ${x.checked?'done':''}"><label><input type="checkbox" data-check="${esc(x.id)}" ${x.checked?'checked':''}><span><span class="name">${esc(x.name)}</span><small>${esc(x.location||'위치를 입력해 줘')}</small></span></label><button data-edit="${esc(x.id)}" aria-label="${esc(x.name)} 수정">수정</button></div>`).join('') || '<p class="empty-sub">이 카테고리에 보관할 물건과 위치를 추가해 줘.</p>'}</section>`;
    }).join('');
  };
  $('items').addEventListener('click',e=>{
    const categoryDelete = e.target.closest('[data-object-category-delete]');
    const itemDelete = e.target.closest('[data-object-delete]');
    if (categoryDelete || itemDelete) {
      const type = categoryDelete ? 'category' : 'item';
      const id = categoryDelete ? categoryDelete.dataset.objectCategoryDelete : itemDelete.dataset.objectDelete;
      const record = (type === 'category' ? data.locationCategories : data.locations).find(x=>x.id===id);
      if (!record) return;
      pendingDelete = {type,id};
      $('objectDeleteMessage').textContent = type === 'category' ? `‘${record.name}’ 카테고리를 삭제할까? 안의 물건과 위치 기록까지 모두 삭제돼.` : `‘${record.name}’ 물건과 위치 기록을 삭제할까?`;
      $('objectDeleteDialog').showModal();return;
    }
    const add=e.target.closest('[data-object-add]'),edit=e.target.closest('[data-object-category-edit]');
    if(add){openEditor('location');$('objectCategorySelect').value=add.dataset.objectAdd;}
    if(edit)editCategory(edit.dataset.objectCategoryEdit);
  });
  render();
})();

(function () {
  const previousRender = render;
  function syncMenuSelection() {
    const common = mode === 'out' && view === 'common';
    const home = mode === 'home';
    for (const [id, active] of [['essentialMenu', common], ['locationMenu', home]]) {
      const button = document.getElementById(id);
      if (!button) continue;
      button.classList.toggle('selected', active);
      button.setAttribute('aria-pressed', String(active));
      for (const property of ['background', 'color', 'border-color']) button.style.removeProperty(property);
    }
    document.querySelectorAll('#places [data-place]').forEach(button => {
      const active = !common && !home && button.dataset.place === place().id;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }
  render = function () { previousRender(); syncMenuSelection(); };
  document.getElementById('essentialMenu').onclick = () => { mode = 'out'; view = 'common'; render(); };
  syncMenuSelection();
})();

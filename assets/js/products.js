'use strict';
(() => {
  const buttons = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    let visible = 0;
    cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; if (!card.hidden) visible++; });
    document.getElementById('filter-status').textContent = `${visible} ${visible === 1 ? 'product' : 'products'} shown for ${button.textContent}.`;
  }));
})();

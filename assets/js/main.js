'use strict';
(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const backdrop = document.querySelector('.menu-backdrop');
  const topButton = document.querySelector('.back-to-top');
  const desktop = matchMedia('(min-width: 1200px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  function closeMenu(restoreFocus = false) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    backdrop.hidden = true;
    document.body.classList.remove('menu-open');
    if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => {
    if (nav.classList.contains('open')) return closeMenu(true);
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation');
    backdrop.hidden = false;
    document.body.classList.add('menu-open');
    nav.querySelector('a').focus();
  });
  nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  backdrop.addEventListener('click', () => closeMenu(true));
  document.addEventListener('keydown', e => {
    if (!nav.classList.contains('open')) return;
    if (e.key === 'Escape') closeMenu(true);
    if (e.key === 'Tab') {
      const items = [toggle, ...nav.querySelectorAll('a')];
      if (e.shiftKey && document.activeElement === items[0]) { e.preventDefault(); items.at(-1).focus(); }
      else if (!e.shiftKey && document.activeElement === items.at(-1)) { e.preventDefault(); toggle.focus(); }
    }
  });
  desktop.addEventListener('change', () => closeMenu());
  let scheduled = false;
  function updateScroll() {
    const position = window.scrollY;
    header.classList.toggle('scrolled', position > 10);
    topButton.hidden = position < 500;
    scheduled = false;
  }
  addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }, { passive: true });
  requestAnimationFrame(updateScroll);
  topButton.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: reduced.matches ? 'instant' : 'smooth' }); document.querySelector('.brand').focus({ preventScroll: true }); });
  document.querySelectorAll('.faq-toggle').forEach(button => button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    document.getElementById(button.getAttribute('aria-controls')).hidden = expanded;
  }));
  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.documentElement.classList.add('js-reveal');
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
  }
  const dialog = document.getElementById('policy-dialog');
  const policyCopy = {
    privacy: ['Privacy Policy', 'This is a sample privacy notice. Replace it with the company’s approved policy before collecting personal information.', 'Enquiry forms request contact details and business requirements so the company can respond. When connected, submissions are sent to the configured form provider. This site does not include analytics, advertising trackers, or a database.', 'The final policy should identify the business and form provider, explain retention and access, and provide a verified privacy contact.'],
    terms: ['Terms & Conditions', 'This is a sample terms notice. Replace it with the company’s approved terms before launch.', 'Product images, company figures, service descriptions, certifications, and delivery regions are illustrative. Prices, availability, packaging, timelines, and partnership terms require written company confirmation.', 'An enquiry or distributor registration does not place an order, establish a contract, or guarantee a territory.']
  };
  document.querySelectorAll('[data-policy]').forEach(link => link.addEventListener('click', e => {
    e.preventDefault();
    const [title, ...paragraphs] = policyCopy[link.dataset.policy];
    document.getElementById('policy-title').textContent = title;
    const content = document.getElementById('policy-content');
    content.replaceChildren(...paragraphs.map(text => { const p = document.createElement('p'); p.textContent = text; return p; }));
    dialog.showModal();
  }));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) { const rect = dialog.getBoundingClientRect(); if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) dialog.close(); } });
  document.querySelectorAll('[data-placeholder-link]').forEach(link => link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('.placeholder-status').textContent = 'This social link will be available when the company adds its verified profile.';
  }));
})();

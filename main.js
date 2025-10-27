/* Dock + Search + Modal */
window.DOCK_CONFIG = window.DOCK_CONFIG || {
  rotatingPlaceholders: [
    'Search',
  ],
  modalHTML: `
  <div class="info-popup">
    <h2 class="info-title" id="dock-modal-title">Contact H-38</h2>
    <div class="contact-grid contact-three">
      <article class="contact-card plain">
        <h4 class="contact-title">Call</h4>
        <p class="contact-link">+971 528 915 205<br/>+91 8000 235 253</p>
      </article>
      <article class="contact-card plain">
        <h4 class="contact-title">Email</h4>
        <p class="contact-link"><a href="mailto:connect@h-38.com" target="_blank" rel="noopener">connect@h-38.com</a></p>
      </article>
      <article class="contact-card plain">
        <h4 class="contact-title">Social</h4>
        <p class="contact-link"><a href="https://www.instagram.com/h.hyphen.38/" target="_blank" rel="noopener">Instagram</a><br/><a href="https://www.linkedin.com/company/h-38" target="_blank" rel="noopener">LinkedIn</a></p>
      </article>
    </div>
  </div>
  `,
};

(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const byId = (id) => document.getElementById(id);

  const heroOverlay = byId('hero-overlay');
  const heroEnter = byId('hero-enter');
  const siteMain = byId('site-main');
  const dock = document.querySelector('.site-dock');
  const input = byId('dock-search');
  const msg = byId('dock-msg');
  const callBtn = byId('top-call');
  const filterToggle = byId('filter-toggle');
  const filterMenu = byId('filter-menu');
  const filterWrapper = document.querySelector('.filter-wrapper');
  const filterOptions = $$('.filter-option');
  let activeTag = 'all';
  const backdrop = byId('dock-backdrop');
  // Popups
  const popupInfo = byId('popup-info');
  const popupInfoContent = byId('popup-info-content');
  const popupInfoClose = byId('popup-info-close');
  let searchQuery = '';

  function showHero() {
    if (heroOverlay) heroOverlay.classList.remove('is-hidden');
    if (siteMain) siteMain.classList.add('is-hidden');
    if (dock) dock.classList.add('is-hidden');
    document.body.classList.add('hero-active');
  }

  function hideHero() {
    if (heroOverlay) heroOverlay.classList.add('is-hidden');
    if (siteMain) siteMain.classList.remove('is-hidden');
    if (dock) dock.classList.remove('is-hidden');
    document.body.classList.remove('hero-active');
  }

  const heroSeen = sessionStorage.getItem('heroSeen') === '1';
  if (heroOverlay && siteMain && dock) {
    if (heroSeen) {
      hideHero();
    } else {
      showHero();
    }
  }

  if (heroEnter) {
    heroEnter.addEventListener('click', () => {
      sessionStorage.setItem('heroSeen', '1');
      hideHero();
    });
  }

  // Rotate placeholders
  let phIndex = 0;
  let phTimer = null;
  function setPH() {
    input.setAttribute('placeholder', DOCK_CONFIG.rotatingPlaceholders[phIndex % DOCK_CONFIG.rotatingPlaceholders.length]);
    phIndex++;
  }
  function startPH() {
    if (phTimer) return;
    setPH();
    phTimer = setInterval(setPH, 2400);
  }
  function stopPH() { clearInterval(phTimer); phTimer = null; }
  if (input) {
    startPH();
    input.addEventListener('focus', stopPH);
    input.addEventListener('blur', startPH);
    input.addEventListener('input', (e) => updateSearch(e.target.value));
  }

  // Popup helpers
  let lastFocus = null;
  let justOpened = false;
  function showPopup(el) {
    lastFocus = document.activeElement;

    backdrop.style.display = 'block';
    el.style.display = 'block';
    el.classList.remove('hide');
    el.classList.add('show');
    trapFocus(el);
    const first = el.querySelector('button, [href], input, [tabindex]:not([tabindex="-1"])');
    if (first) first.focus();
    // Prevent immediate outside-click close from the same event frame
    justOpened = true;
    requestAnimationFrame(() => { justOpened = false; });
  }
  function hidePopup(el) {
    el.classList.remove('show');
    el.classList.add('hide');
    const done = () => {
      el.style.display = 'none';
      backdrop.style.display = 'none';
      releaseFocus();
      if (lastFocus) lastFocus.focus();
      el.removeEventListener('animationend', done);
    };
    el.addEventListener('animationend', done);
    // Fallback when reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) done();
  }
  function outsideClick(e) {
    if (justOpened) return;
    if (e.target === backdrop) {
      if (popupInfo.style.display === 'block') hidePopup(popupInfo);
    }
  }
  if (backdrop) backdrop.addEventListener('click', outsideClick);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (popupInfo.style.display === 'block') hidePopup(popupInfo);
    }
  });
  if (callBtn) {
    callBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      const isOpen = popupInfo.style.display === 'block';
      if (isOpen) {
        hidePopup(popupInfo);
        return;
      }
      popupInfoContent.innerHTML = DOCK_CONFIG.modalHTML || '';
      showPopup(popupInfo);
    });
  }
  if (popupInfoClose) popupInfoClose.addEventListener('click', () => hidePopup(popupInfo));

  function applyCardFilters() {
    const cards = $$('.card');
    const tokens = searchQuery ? searchQuery.split(' ').filter(Boolean) : [];
    let visibleCount = 0;
    cards.forEach((card) => {
      const tag = (card.dataset.tag || '').toLowerCase();
      const matchesFilter = activeTag === 'all' || tag === activeTag;
      const haystack = norm([
        tag,
        $('.card-title', card)?.textContent,
        $('.card-brief', card)?.textContent,
      ].filter(Boolean).join(' '));
      const matchesText = !tokens.length || tokens.every((token) => haystack.includes(token));
      const show = matchesFilter && matchesText;
      card.classList.toggle('is-filter-hidden', !show);
      if (show) visibleCount += 1;
    });
    if (msg) msg.textContent = visibleCount ? '' : 'No matching articles.';
  }

  if (filterToggle && filterMenu) {
    const setMenuState = (open) => {
      filterMenu.hidden = !open;
      filterToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    filterToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      setMenuState(filterMenu.hidden);
    });
    document.addEventListener('click', (e) => {
      if (!filterMenu.hidden && filterWrapper && !filterWrapper.contains(e.target)) {
        setMenuState(false);
      }
    });
  }

  if (filterOptions.length) {
    const setActive = (value) => {
      activeTag = value;
      filterOptions.forEach((btn) => {
        btn.classList.toggle('is-selected', (btn.dataset.filter || 'all') === value);
      });
      applyCardFilters();
      if (filterToggle && filterMenu) {
        filterMenu.hidden = true;
        filterToggle.setAttribute('aria-expanded', 'false');
      }
    };
    filterOptions.forEach((btn) => {
      btn.addEventListener('click', () => {
        const value = (btn.dataset.filter || 'all').toLowerCase();
        setActive(value);
      });
    });
    setActive(activeTag);
  }

  let focusHandler = null;
  function trapFocus(container) {
    const focusables = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const get = () => $$(focusables, container).filter(el => !el.hasAttribute('disabled'));
    focusHandler = (e) => {
      if (!container.contains(document.activeElement)) {
        const els = get();
        if (els.length) els[0].focus();
      }
      if (e.key === 'Tab') {
        const els = get();
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', focusHandler);
  }
  function releaseFocus() { if (focusHandler) { document.removeEventListener('keydown', focusHandler); focusHandler = null; } }

  function norm(s) { return (s || '').toLowerCase().replace(/\s+/g, ' ').trim(); }

  function updateSearch(value) {
    searchQuery = norm(value || '');
    applyCardFilters();
  }

  applyCardFilters();
})();

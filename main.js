/* Dock + Search + Modal */
window.DOCK_CONFIG = window.DOCK_CONFIG || {
  rotatingPlaceholders: [
    'PROJECT',
    'Regression',
    'impact of AI and concept design',
  ],
  modalHTML: `
  <div class="info-popup">
    <h2 class="info-title" id="dock-modal-title">H-38</h2>
    <h3 class="info-subtitle">Build Better</h3>
    <p class="info-lede">H-38 shapes the built environment across every scale—from furniture and interiors to architecture, manufacturing, and cities. We integrate design, technology, and systems thinking to help creative and technical teams work with greater intelligence and efficiency.</p>
    <h3 class="info-section">Philosophy</h3>
    <div class="info-philosophy">
      <p>Optimization drives progress.</p>
      <p>Innovation follows. Technology enables.</p>
    </div>
    <h3 class="info-section">Core Pillars</h3>
    <div class="pillars-grid">
      <article class="pillar-card">
        <h4 class="pillar-title">Project Intelligence</h4>
        <ul class="pillar-list">
          <li>Define what to build.</li>
          <li>Develop briefs, feasibility studies, and data-driven evaluations.</li>
          <li>Assess spatial, regulatory, and economic viability.</li>
          <li>Position each project strategically before design begins.</li>
        </ul>
      </article>
      <article class="pillar-card">
        <h4 class="pillar-title">Design Intelligence</h4>
        <ul class="pillar-list">
          <li>Support conceptual and schematic design through computation.</li>
          <li>Automate spatial, environmental, and performance analyses.</li>
          <li>Integrate AI and BIM for informed, data-based decision-making.</li>
          <li>Use generative systems to optimize form and function.</li>
        </ul>
      </article>
      <article class="pillar-card">
        <h4 class="pillar-title">Performance Intelligence</h4>
        <ul class="pillar-list">
          <li>Measure how built environments perform.</li>
          <li>Analyze energy use, comfort, and occupancy behavior.</li>
          <li>Translate data into insight through digital dashboards.</li>
        </ul>
      </article>
      <article class="pillar-card">
        <h4 class="pillar-title">Manufacturing Intelligence</h4>
        <ul class="pillar-list">
          <li>Connect design to production and finance.</li>
          <li>Automate BOMs, quotations, and purchase orders through Zoho and Rhino systems.</li>
          <li>Create digital twins linking geometry, cost, and fabrication data.</li>
          <li>Deliver seamless transitions from design intent to physical output.</li>
        </ul>
      </article>
    </div>
    <h3 class="info-section">Contact</h3>
    <div class="contact-grid contact-three">
      <article class="contact-card plain">
        <h4 class="contact-title">Email</h4>
        <p class="contact-link"><a href="mailto:connect@h-38.com" target="_blank" rel="noopener">connect@h-38.com</a></p>
      </article>
      <article class="contact-card plain">
        <h4 class="contact-title">Call</h4>
        <p class="contact-link">+971 528915205<br/>+91 8000235253</p>
      </article>
      <article class="contact-card plain">
        <h4 class="contact-title">Social</h4>
        <p class="contact-link"><a href="https://www.instagram.com/h.hyphen.38/" target="_blank" rel="noopener">Instagram</a><br/>
        <a href="https://www.linkedin.com/company/h-38" target="_blank" rel="noopener">LinkedIn</a></p>
      </article>
    </div>
  </div>
  `,
};

(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const byId = (id) => document.getElementById(id);

  const input = byId('dock-search');
  const goBtn = byId('dock-go');
  const msg = byId('dock-msg');
  const topBtn = byId('dock-top');
  const backdrop = byId('dock-backdrop');
  // Popups
  const popupInfo = byId('popup-info');
  const popupInfoContent = byId('popup-info-content');
  const popupInfoClose = byId('popup-info-close');
  const popupSearch = byId('popup-search');
  const popupSearchBody = byId('popup-search-body');
  const popupSearchClose = byId('popup-search-close');

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
  }

  // Popup helpers
  let lastFocus = null;
  let justOpened = false;
  function showPopup(el) {
    lastFocus = document.activeElement;
    // Close the other popup if open
    if (el === popupInfo && popupSearch.style.display === 'block') hidePopup(popupSearch);
    if (el === popupSearch && popupInfo.style.display === 'block') hidePopup(popupInfo);

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
      if (popupSearch.style.display === 'block') hidePopup(popupSearch);
    }
  }
  if (backdrop) backdrop.addEventListener('click', outsideClick);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (popupInfo.style.display === 'block') hidePopup(popupInfo);
      if (popupSearch.style.display === 'block') hidePopup(popupSearch);
    }
  });
  if (topBtn) topBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    popupInfoContent.innerHTML = DOCK_CONFIG.modalHTML || '';
    showPopup(popupInfo);
  });
  if (popupInfoClose) popupInfoClose.addEventListener('click', () => hidePopup(popupInfo));

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

  // Smart AI Search with Supabase
  const SUPABASE_URL = 'https://wyspqiqswthahknqohxb.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5c3BxaXFzd3RoYWhrbnFvaHhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5OTQwNDYsImV4cCI6MjA3NjU3MDA0Nn0.jIYSXU4r2Bt-1Waz0Ni3G5nFFZu4fcVJLxsvrfUTkq8';

  function norm(s) { return (s || '').toLowerCase().replace(/\s+/g, ' ').trim(); }

  function domCards() {
    return $$('.card').map((card) => {
      const link = $('.card-link', card);
      return {
        url: link ? link.getAttribute('href') : '#',
        title: $('.card-title', card)?.textContent || '',
        tag: (card.getAttribute('data-tag') || '').toLowerCase(),
        brief: $('.card-brief', card)?.textContent || '',
        image: $('.card-img', card)?.getAttribute('src') || '',
        content: $('.card-img', card)?.getAttribute('alt') || '',
      };
    });
  }

  async function smartSearch(query) {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/smart_search_articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          search_query: query,
          result_limit: 10
        })
      });

      if (!response.ok) {
        console.error('Search failed:', await response.text());
        return [];
      }

      const results = await response.json();
      return results || [];
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }

  function renderResultsPopup(results, query) {
    popupSearchBody.innerHTML = '';
    const count = results.length;
    if (count === 0) {
      popupSearchBody.innerHTML = '<p>No results. Try another term.</p>';
    } else {
      const list = document.createElement('div');
      list.className = 'search-list';
      results.forEach((r) => {
        const a = document.createElement('a');
        a.className = 'search-row';
        a.href = r.url;
        a.innerHTML = `<img class="search-thumb" src="${r.image || ''}" alt=""/><div><div class="chip small">${r.tag || ''}</div><h4 class="search-title">${r.title}</h4><p class="search-brief">${r.brief || ''}</p></div>`;
        list.appendChild(a);
      });
      popupSearchBody.appendChild(list);
    }
    showPopup(popupSearch);
  }

  async function runSearch(q) {
    const query = norm(q);
    if (!query) return;

    // Use smart search from database
    const results = await smartSearch(query);

    if (results.length === 0) {
      if (msg) msg.textContent = 'No results found';
      renderResultsPopup([], query);
      return;
    }

    if (msg) msg.textContent = '';
    renderResultsPopup(results, query);
  }

  if (popupSearchClose) popupSearchClose.addEventListener('click', () => hidePopup(popupSearch));

  function handleSubmit(e) { if (e) e.preventDefault(); if (msg) msg.textContent = ''; runSearch(input.value); }
  if (goBtn) goBtn.addEventListener('click', handleSubmit);
  if (input) {
    // Prevent default submit and stop propagation so popup doesn't instantly close
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); handleSubmit(); }
    });
    // Wrap in a form guard if ever inside a form
    const form = input.closest('form');
    if (form) form.addEventListener('submit', (e) => { e.preventDefault(); handleSubmit(); });
  }
})();

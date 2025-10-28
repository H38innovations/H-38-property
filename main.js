/* Dock + Search + Modal */
const DOCK_DEFAULT_PLACEHOLDERS = ['Search'];
const DOCK_DEFAULT_FILTERS = [
  { value: 'all', label: 'All', selected: true },
  { value: 'research', label: 'Research' },
  { value: 'news', label: 'News' },
  { value: 'project', label: 'Project' },
  { value: 'conversation', label: 'Conversation' },
  { value: 'foresight', label: 'Foresight' },
];
const DOCK_DEFAULT_MODAL = `
  <div class="pages-preview loading">
    <p>Loading studio overview…</p>
  </div>
`;
const OVERLAY_TEMPLATE_URL = 'overlay-content.html';
const OVERLAY_FALLBACK_HTML = `
<div class="pages-preview">
  <h2 class="pages-intro" id="pages-overlay-title">We’re a problem-solving studio for the built world, at the hyphen of design, making, and operations. From the UAE, we help teams worldwide build better places for people and planet.</h2>
  <div class="pages-sections">
    <section class="overlay-section">
      <span class="overlay-section-index">01 — Strategy &amp; Technology</span>
      <div class="overlay-section-copy">
        <h3 class="overlay-section-title">We align decision-making with systems.</h3>
        <p class="overlay-section-body">Start with how the organisation works today, define where it needs to go, and implement the tools and workflows to get there efficiently.</p>
        <div class="overlay-service-table" role="table" aria-label="Strategy &amp; Technology services">
          <div class="overlay-service-row" role="row">
            <span class="overlay-service-name" role="cell">Digital Transformation Strategy</span>
            <span class="overlay-service-desc" role="cell">Map current workflows, define future-state processes, set roadmap for tools and standards.</span>
          </div>
          <div class="overlay-service-row" role="row">
            <span class="overlay-service-name" role="cell">BIM &amp; Information Standards</span>
            <span class="overlay-service-desc" role="cell">Establish models, naming, data structure, drawing standards, coordination workflows.</span>
          </div>
          <div class="overlay-service-row" role="row">
            <span class="overlay-service-name" role="cell">Parametric &amp; Generative Design Frameworks</span>
            <span class="overlay-service-desc" role="cell">Create rule-based design systems to improve speed, repeatability, and performance.</span>
          </div>
          <div class="overlay-service-row" role="row">
            <span class="overlay-service-name" role="cell">Cost–Performance Modeling</span>
            <span class="overlay-service-desc" role="cell">Link material choices, structural options, and systems to cost and operational outcomes.</span>
          </div>
          <div class="overlay-service-row" role="row">
            <span class="overlay-service-name" role="cell">Sustainability &amp; Carbon Strategy</span>
            <span class="overlay-service-desc" role="cell">Set measurable performance targets, track embodied and operational carbon, evaluate alternatives.</span>
          </div>
        </div>
      </div>
    </section>
    <figure class="overlay-section-image">
      <img src="assets/H-38 Branding.png" alt="Workflow collaboration across the built environment" loading="lazy">
    </figure>
    <section class="overlay-section">
      <span class="overlay-section-index">02 — Automation &amp; Operations</span>
      <div class="overlay-section-copy">
        <h3 class="overlay-section-title">We make work faster and repeatable.</h3>
        <p class="overlay-section-body">Focus is on eliminating manual steps, errors, and repetitive coordination.</p>
        <div class="overlay-service-table" role="table" aria-label="Automation &amp; Operations services">
          <div class="overlay-service-row" role="row">
            <span class="overlay-service-name" role="cell">Workflow Automation</span>
            <span class="overlay-service-desc" role="cell">Integrate Notion/Airtable with n8n to automate intake, routing, approvals, notifications.</span>
          </div>
          <div class="overlay-service-row" role="row">
            <span class="overlay-service-name" role="cell">ERP + Manufacturing Integration</span>
            <span class="overlay-service-desc" role="cell">Sync design information with procurement, fabrication, inventory, and installation.</span>
          </div>
          <div class="overlay-service-row" role="row">
            <span class="overlay-service-name" role="cell">3D Scanning → BIM/Model Pipelines</span>
            <span class="overlay-service-desc" role="cell">Capture reality, clean point clouds, generate working models, link to design and FM systems.</span>
          </div>
          <div class="overlay-service-row" role="row">
            <span class="overlay-service-name" role="cell">Field Reporting &amp; QA Systems</span>
            <span class="overlay-service-desc" role="cell">Mobile checklists, site logs, snagging workflows, handover documentation automation.</span>
          </div>
          <div class="overlay-service-row" role="row">
            <span class="overlay-service-name" role="cell">Digital Twins for Operations</span>
            <span class="overlay-service-desc" role="cell">Live data + model linked dashboards for maintenance, planning, and energy use tracking.</span>
          </div>
        </div>
      </div>
    </section>
    <figure class="overlay-section-image">
      <img src="assets/H-38 Branding.png" alt="Team coordination across digital and physical environments" loading="lazy">
    </figure>
    <section class="overlay-section">
      <span class="overlay-section-index">03 — Design Intelligence &amp; Tooling</span>
      <div class="overlay-section-copy">
        <h3 class="overlay-section-title">We build tools that extend your design capabilities.</h3>
        <p class="overlay-section-body">These tools help teams evaluate options, make decisions, and communicate more clearly.</p>
        <div class="overlay-service-table" role="table" aria-label="Design Intelligence &amp; Tooling services">
          <div class="overlay-service-row" role="row">
            <span class="overlay-service-name" role="cell">Performance Scoring Models</span>
            <span class="overlay-service-desc" role="cell">Evaluate ventilation, daylight, adjacency, comfort, and urban context in measurable terms.</span>
          </div>
          <div class="overlay-service-row" role="row">
            <span class="overlay-service-name" role="cell">Computational Design Tooling</span>
            <span class="overlay-service-desc" role="cell">Custom Grasshopper scripts, plugins, Python tooling for internal workflows.</span>
          </div>
          <div class="overlay-service-row" role="row">
            <span class="overlay-service-name" role="cell">VR/AR Walkthrough Systems</span>
            <span class="overlay-service-desc" role="cell">Interactive review environments for client decisions and on-site understanding.</span>
          </div>
          <div class="overlay-service-row" role="row">
            <span class="overlay-service-name" role="cell">Layout &amp; Space Optimization Engines</span>
            <span class="overlay-service-desc" role="cell">Algorithmic planning for schools, hospitals, offices, housing, retail.</span>
          </div>
          <div class="overlay-service-row" role="row">
            <span class="overlay-service-name" role="cell">Design &amp; Specification Libraries</span>
            <span class="overlay-service-desc" role="cell">Standardised components, assemblies, materials, and detailing knowledge bases.</span>
          </div>
        </div>
      </div>
    </section>
    <section class="overlay-contact">
      <div class="overlay-contact-copy">
        <h3 class="overlay-contact-title">Drop us a line</h3>
        <p class="overlay-contact-lede">We’d love to hear from you. If you’re navigating complex delivery challenges or building better places, reach out and we’ll find the right way to work together.</p>
      </div>
      <div class="overlay-contact-grid">
        <article class="overlay-contact-card">
          <img src="assets/icons/contact.svg" alt="" aria-hidden="true" class="overlay-contact-icon">
          <div class="overlay-contact-body">
            <h4 class="overlay-contact-name">Adnan Raza</h4>
            <p class="overlay-contact-role">Director, Strategy &amp; Technology</p>
            <p class="overlay-contact-phone">+971 50 123 4567</p>
            <a href="mailto:adnan@h-38.com" class="overlay-contact-link">adnan@h-38.com</a>
          </div>
        </article>
        <article class="overlay-contact-card">
          <img src="assets/icons/contact.svg" alt="" aria-hidden="true" class="overlay-contact-icon">
          <div class="overlay-contact-body">
            <h4 class="overlay-contact-name">Iman Al Qasimi</h4>
            <p class="overlay-contact-role">Head of Automation &amp; Operations</p>
            <p class="overlay-contact-phone">+971 50 765 4321</p>
            <a href="mailto:iman@h-38.com" class="overlay-contact-link">iman@h-38.com</a>
          </div>
        </article>
        <article class="overlay-contact-card">
          <img src="assets/icons/contact.svg" alt="" aria-hidden="true" class="overlay-contact-icon">
          <div class="overlay-contact-body">
            <h4 class="overlay-contact-name">Leo Martinez</h4>
            <p class="overlay-contact-role">Principal, Design Intelligence</p>
            <p class="overlay-contact-phone">+971 52 246 8100</p>
            <a href="mailto:leo@h-38.com" class="overlay-contact-link">leo@h-38.com</a>
          </div>
        </article>
      </div>
    </section>
  </div>
</div>
`;

window.DOCK_CONFIG = window.DOCK_CONFIG || {};
if (!Array.isArray(window.DOCK_CONFIG.rotatingPlaceholders) || !window.DOCK_CONFIG.rotatingPlaceholders.length) {
  window.DOCK_CONFIG.rotatingPlaceholders = [...DOCK_DEFAULT_PLACEHOLDERS];
}
if (!Array.isArray(window.DOCK_CONFIG.tagFilters) || !window.DOCK_CONFIG.tagFilters.length) {
  window.DOCK_CONFIG.tagFilters = DOCK_DEFAULT_FILTERS.map((filter) => ({ ...filter }));
}
if (typeof window.DOCK_CONFIG.modalHTML !== 'string') {
  window.DOCK_CONFIG.modalHTML = DOCK_DEFAULT_MODAL;
}

(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const byId = (id) => document.getElementById(id);

  const siteMain = byId('site-main');
  const dock = document.querySelector('.site-dock');
  const dockInner = dock ? dock.querySelector('.dock-inner') : null;

  buildDock(dockInner);

  const input = byId('dock-search');
  const msg = byId('dock-msg');
  const pagesBtn = byId('dock-pages');
  const filterToggle = byId('filter-toggle');
  const filterMenu = byId('filter-menu');
  const filterWrapper = document.querySelector('.filter-wrapper');
  const filterOptions = $$('.filter-option');
  const sectionAnchors = $$('.dock-link[data-section-target]');
  let activeTag = 'all';
  if (filterOptions.length) {
    const defaultFilter = filterOptions.find((btn) => btn.classList.contains('is-selected'));
    if (defaultFilter) {
      activeTag = (defaultFilter.dataset.filter || 'all').toLowerCase();
    }
  }
const pagesOverlay = byId('pages-overlay');
const pagesOverlayContent = byId('pages-overlay-content');
const pagesClose = byId('pages-close');
let overlayLoaded = false;
let overlayLoadRequested = false;
loadOverlayTemplate();

function loadOverlayTemplate(force = false) {
  if (overlayLoaded) return;
  if (overlayLoadRequested && !force) return;
  overlayLoadRequested = true;
  fetch(new URL(OVERLAY_TEMPLATE_URL, document.baseURI), { cache: 'no-store', credentials: 'same-origin' })
    .then((res) => {
      if (!res.ok) throw new Error(`Template load failed: ${res.status}`);
      return res.text();
    })
    .then((html) => {
      const markup = (typeof html === 'string' ? html.trim() : '');
      if (markup) {
        applyOverlayMarkup(markup);
      } else {
        applyOverlayMarkup(OVERLAY_FALLBACK_HTML.trim());
      }
    })
    .catch(() => {
      applyOverlayMarkup(OVERLAY_FALLBACK_HTML.trim());
    });
}

function applyOverlayMarkup(html) {
  window.DOCK_CONFIG.modalHTML = html;
  overlayLoaded = true;
  overlayLoadRequested = false;
  if (pagesOverlayContent && pagesOverlay && !pagesOverlay.classList.contains('is-hidden')) {
    pagesOverlayContent.innerHTML = html;
  }
}

function buildDock(inner) {
    if (!inner) return;
    const sections = getSectionItems();
    let mode = document.body.dataset.dockMode || 'sections';
    if (mode === 'sections' && !sections.length) {
      mode = 'lab';
    }
    document.body.dataset.dockMode = mode;
    inner.innerHTML = '';
    if (mode === 'lab') {
      inner.appendChild(createLabDock());
    } else {
      inner.appendChild(createSectionDock(sections));
    }
  }

  function createLabDock() {
    const container = document.createElement('div');
    container.className = 'dock-search';

    const filterWrapperEl = document.createElement('div');
    filterWrapperEl.className = 'filter-wrapper';

    const filterButton = document.createElement('button');
    filterButton.className = 'filter-button';
    filterButton.id = 'filter-toggle';
    filterButton.type = 'button';
    filterButton.setAttribute('aria-expanded', 'false');
    filterButton.setAttribute('aria-controls', 'filter-menu');

    const filterIcon = document.createElement('img');
    filterIcon.src = 'assets/icons/filter.svg';
    filterIcon.alt = 'Open filters';
    filterButton.appendChild(filterIcon);

    const filterMenuEl = document.createElement('div');
    filterMenuEl.className = 'filter-menu';
    filterMenuEl.id = 'filter-menu';
    filterMenuEl.hidden = true;

    const filterList = document.createElement('ul');
    filterList.className = 'filter-options';

    (window.DOCK_CONFIG.tagFilters || []).forEach((filter) => {
      if (!filter || !filter.value || !filter.label) return;
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-option';
      if (filter.selected) btn.classList.add('is-selected');
      btn.dataset.filter = filter.value;
      btn.textContent = filter.label;
      li.appendChild(btn);
      filterList.appendChild(li);
    });

    if (!filterList.children.length) {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-option is-selected';
      btn.dataset.filter = 'all';
      btn.textContent = 'All';
      li.appendChild(btn);
      filterList.appendChild(li);
    }

    filterMenuEl.appendChild(filterList);
    filterWrapperEl.append(filterButton, filterMenuEl);
    container.appendChild(filterWrapperEl);

    const inputWrap = document.createElement('div');
    inputWrap.className = 'dock-input-wrap';

    const icon = document.createElement('img');
    icon.className = 'icon icon-left';
    icon.src = 'assets/icons/search.svg';
    icon.alt = '';
    icon.setAttribute('aria-hidden', 'true');

    const inputEl = document.createElement('input');
    inputEl.id = 'dock-search';
    inputEl.className = 'dock-input has-icons';
    inputEl.type = 'search';
    inputEl.placeholder = (window.DOCK_CONFIG.rotatingPlaceholders || DOCK_DEFAULT_PLACEHOLDERS)[0] || 'Search';
    inputEl.setAttribute('aria-label', 'Search articles');

    inputWrap.append(icon, inputEl);
    container.appendChild(inputWrap);

    const msg = document.createElement('span');
    msg.className = 'dock-msg';
    msg.id = 'dock-msg';
    msg.setAttribute('aria-live', 'polite');
    container.appendChild(msg);

    container.appendChild(createLogoButton());

    return container;
  }

  function createSectionDock(sections) {
    const container = document.createElement('div');
    container.className = 'dock-simple';

    const linksWrap = document.createElement('div');
    linksWrap.className = 'dock-links';

    if (!sections.length) {
      const placeholder = document.createElement('span');
      placeholder.className = 'dock-link';
      placeholder.textContent = 'Sections coming soon';
      placeholder.setAttribute('aria-disabled', 'true');
      linksWrap.appendChild(placeholder);
    } else {
      sections.forEach((section) => {
        const anchor = document.createElement('a');
        anchor.className = 'dock-link';
        anchor.href = `#${section.id}`;
        anchor.textContent = section.label;
        anchor.dataset.sectionTarget = section.id;
        linksWrap.appendChild(anchor);
      });
    }

    container.appendChild(linksWrap);
    container.appendChild(createLogoButton());
    return container;
  }

  function createLogoButton() {
    const btn = document.createElement('button');
    btn.className = 'dock-pages';
    btn.id = 'dock-pages';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Open H-38 pages view');
    btn.setAttribute('aria-controls', 'pages-overlay');
    btn.setAttribute('aria-expanded', 'false');

    const img = document.createElement('img');
    img.src = 'assets/H-38 Logo.png';
    img.alt = 'H-38 logo';
    btn.appendChild(img);
    return btn;
  }

  function getSectionItems() {
    const nodes = Array.from(document.querySelectorAll('[data-dock-label]'));
    return nodes.map((node, index) => {
      const label = (node.dataset.dockLabel || '').trim();
      if (!label) return null;
      let id = node.id;
      if (!id) {
        id = `section-${index + 1}`;
        node.id = id;
      }
      return { id, label };
    }).filter(Boolean);
  }

  let searchQuery = '';
  const EDGE_PADDING = 16;

  function alignFilterMenu() {
    if (!filterMenu || filterMenu.hidden || !filterWrapper || !dock) return;
    const wrapperRect = filterWrapper.getBoundingClientRect();
    const dockRect = dock.getBoundingClientRect();
    let leftOffset = dockRect.left - wrapperRect.left;
    const minViewport = EDGE_PADDING - wrapperRect.left;
    leftOffset = Math.max(leftOffset, minViewport);
    filterMenu.style.left = `${leftOffset}px`;
  }

  window.addEventListener('resize', alignFilterMenu, { passive: true });
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

  // Pages overlay
  let lastFocus = null;
  let siteMainWasHidden = false;
  let dockWasHidden = false;

  function openPagesOverlay(trigger = null) {
    if (!pagesOverlay || !pagesOverlayContent) return;
    if (!overlayLoaded) loadOverlayTemplate();
    lastFocus = document.activeElement;
    pagesOverlayContent.innerHTML = DOCK_CONFIG.modalHTML || '';
    pagesOverlay.classList.remove('is-hidden');
    pagesOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('pages-overlay-active');
    siteMainWasHidden = siteMain ? siteMain.classList.contains('is-hidden') : false;
    dockWasHidden = dock ? dock.classList.contains('is-hidden') : false;
    if (siteMain && !siteMainWasHidden) siteMain.classList.add('is-hidden');
    if (dock && !dockWasHidden) dock.classList.add('is-hidden');
    trapFocus(pagesOverlay);
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    if (pagesBtn) pagesBtn.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => {
      const focusTarget = pagesOverlay.querySelector('[data-focus-first], .pages-close, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusTarget && typeof focusTarget.focus === 'function') {
        focusTarget.focus({ preventScroll: true });
      } else if (pagesOverlayContent && typeof pagesOverlayContent.focus === 'function') {
        pagesOverlayContent.focus({ preventScroll: true });
      }
    });
  }

  function closePagesOverlay() {
    if (!pagesOverlay) return;
    pagesOverlay.classList.add('is-hidden');
    pagesOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('pages-overlay-active');
    if (siteMain && !siteMainWasHidden) siteMain.classList.remove('is-hidden');
    if (dock && !dockWasHidden) dock.classList.remove('is-hidden');
    releaseFocus();
    if (pagesBtn) pagesBtn.setAttribute('aria-expanded', 'false');
    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus({ preventScroll: true });
    }
    lastFocus = null;
    siteMainWasHidden = false;
    dockWasHidden = false;
  }

  if (pagesBtn && pagesOverlay) {
    pagesBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      const hidden = pagesOverlay.classList.contains('is-hidden');
      if (hidden) {
        openPagesOverlay(pagesBtn);
      } else {
        closePagesOverlay();
      }
    });
  }

  if (pagesClose) {
    pagesClose.addEventListener('click', (ev) => {
      ev.preventDefault();
      closePagesOverlay();
    });
  }

  if (pagesOverlay) {
    pagesOverlay.addEventListener('click', (ev) => {
      if (ev.target === pagesOverlay) {
        closePagesOverlay();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pagesOverlay && !pagesOverlay.classList.contains('is-hidden')) {
      closePagesOverlay();
    }
  });

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
      if (open) {
        requestAnimationFrame(alignFilterMenu);
      } else {
        filterMenu.style.left = '';
      }
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

  function initSectionNav(anchors) {
    if (!anchors || !anchors.length) return;
    const pairs = anchors.map((anchor) => {
      const targetId = anchor.dataset.sectionTarget;
      if (!targetId) return null;
      const target = document.getElementById(targetId);
      if (!target) return null;
      return { anchor, target };
    }).filter(Boolean);

    if (!pairs.length) return;

    const setActiveSection = (id) => {
      pairs.forEach(({ anchor }) => {
        const isActive = anchor.dataset.sectionTarget === id;
        anchor.classList.toggle('is-active', isActive);
        if (isActive) {
          anchor.setAttribute('aria-current', 'true');
        } else {
          anchor.removeAttribute('aria-current');
        }
      });
    };

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length) {
        setActiveSection(visible[0].target.id);
      }
    }, { rootMargin: '-45% 0px -45% 0px', threshold: [0.1, 0.3, 0.6] });

    pairs.forEach(({ target }) => observer.observe(target));
    setActiveSection(pairs[0].target.id);

    anchors.forEach((anchor) => {
      anchor.addEventListener('click', () => {
        setActiveSection(anchor.dataset.sectionTarget);
      });
    });
  }

  initSectionNav(sectionAnchors);
  applyCardFilters();
})();

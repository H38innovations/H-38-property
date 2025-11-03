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
  <h2 class="pages-intro" id="pages-overlay-title">H-38 is a design and strategy practice for the built environment.</h2>
  <p class="pages-intro-body">We operate at the hyphen of design, making, and operations.</p>
  <div class="pages-sections">

    <figure class="overlay-section-image">
      <img src="assets/H-38 Branding.png" alt="Workflow collaboration across the built environment" loading="lazy">
    </figure>

<section class="overlay-section">
  <span class="overlay-section-index">01 — Design &amp; Strategy</span>

  <div class="overlay-section-copy">
    <h3 class="overlay-section-title">We align design decisions with systems.</h3>
    <p class="overlay-section-body">Assess today, define target state, and implement tools, standards, and workflows to reach it efficiently.</p>

    <div class="overlay-service-table" role="table" aria-label="Design &amp; Strategy services">

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">Technology Integration (Architecture &amp; Design)</span>
        <span class="overlay-service-desc" role="cell">
          Connect the AEC toolchain for live, reliable flow from concept to documentation.
          <span class="overlay-service-tags">
            <span class="tag">Rhino/Grasshopper ⇄ Revit/BIM</span>
            <span class="tag">Design automations &amp; scripts</span>
            <span class="tag">Digital twins &amp; data pipelines</span>
            <span class="tag">Interoperability &amp; QA</span>
          </span>
        </span>
      </div>

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">Feasibility Studies</span>
        <span class="overlay-service-desc" role="cell">
          Rapid tests of what can be built and why it makes sense.
          <span class="overlay-service-tags">
            <span class="tag">Site &amp; massing options</span>
            <span class="tag">Planning &amp; code checks</span>
            <span class="tag">Program fit &amp; adjacencies</span>
            <span class="tag">Order-of-magnitude scope</span>
          </span>
        </span>
      </div>

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">Design Analysis — Climate &amp; Human</span>
        <span class="overlay-service-desc" role="cell">
          Quantify comfort and performance to guide form and systems.
          <span class="overlay-service-tags">
            <span class="tag">Daylight &amp; radiation</span>
            <span class="tag">Thermal comfort &amp; airflow</span>
            <span class="tag">Acoustics &amp; glare</span>
            <span class="tag">Accessibility, wayfinding, crowd flow</span>
          </span>
        </span>
      </div>

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">Sustainability &amp; Carbon Strategy</span>
        <span class="overlay-service-desc" role="cell">
          Set targets and choose low-impact paths.
          <span class="overlay-service-tags">
            <span class="tag">Embodied &amp; operational carbon</span>
            <span class="tag">Circular design &amp; materials</span>
            <span class="tag">Performance KPIs &amp; tracking</span>
          </span>
        </span>
      </div>

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">BIM &amp; Information Standards</span>
        <span class="overlay-service-desc" role="cell">
          Define models, naming, data schemas, drawings, and coordination workflows for reliable delivery.
        </span>
      </div>

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">Parametric &amp; Generative Design</span>
        <span class="overlay-service-desc" role="cell">
          Build rule-based toolkits to speed iteration and raise quality under constraints.
        </span>
      </div>

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">Advanced Research &amp; Innovation</span>
        <span class="overlay-service-desc" role="cell">
          Apply frontier methods to complex briefs.
          <span class="overlay-service-tags">
            <span class="tag">XR for design review</span>
            <span class="tag">Computational geometry</span>
            <span class="tag">Building physics</span>
            <span class="tag">Prototype labs &amp; pilots</span>
          </span>
        </span>
      </div>

    </div>
  </div>
</section>

<section class="overlay-section">
  <span class="overlay-section-index">02 — Making &amp; Manufacturing</span>

  <div class="overlay-section-copy">
    <h3 class="overlay-section-title">We bridge design and production.</h3>
    <p class="overlay-section-body">
      Turn digital models into real products through connected systems, clear workflows, and optimized factory operations.
    </p>

    <div class="overlay-service-table" role="table" aria-label="Making &amp; Manufacturing services">

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">Design-to-Factory Integration</span>
        <span class="overlay-service-desc" role="cell">
          Connect design software directly to fabrication tools for a smooth transition from idea to product.
          <span class="overlay-service-tags">
            <span class="tag">Rhino/Grasshopper ⇄ Revit ⇄ CAM</span>
            <span class="tag">Part libraries &amp; design templates</span>
            <span class="tag">Automatic Bill of Materials</span>
          </span>
        </span>
      </div>

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">PRP/ERP Pipeline &amp; Workflow Setup</span>
        <span class="overlay-service-desc" role="cell">
          Build a central workflow to manage planning, production, and delivery with clear approvals and data flow.
          <span class="overlay-service-tags">
            <span class="tag">Routing &amp; task automation</span>
            <span class="tag">Change management</span>
            <span class="tag">System integrations</span>
          </span>
        </span>
      </div>

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">Production Dashboards</span>
        <span class="overlay-service-desc" role="cell">
          Real-time visibility across manufacturing—from material flow to output and quality.
          <span class="overlay-service-tags">
            <span class="tag">Live production data</span>
            <span class="tag">Order tracking</span>
            <span class="tag">Performance indicators</span>
          </span>
        </span>
      </div>

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">Process Optimisation</span>
        <span class="overlay-service-desc" role="cell">
          Identify inefficiencies and improve speed, cost, and accuracy in manufacturing.
          <span class="overlay-service-tags">
            <span class="tag">Workflow analysis</span>
            <span class="tag">Lean manufacturing methods</span>
            <span class="tag">Time and motion studies</span>
          </span>
        </span>
      </div>

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">Inventory &amp; Material Management</span>
        <span class="overlay-service-desc" role="cell">
          Keep accurate records of materials, tools, and components for smooth production.
          <span class="overlay-service-tags">
            <span class="tag">Real-time stock tracking</span>
            <span class="tag">Reorder alerts</span>
            <span class="tag">Batch and lot control</span>
          </span>
        </span>
      </div>

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">Work Order &amp; Scheduling Systems</span>
        <span class="overlay-service-desc" role="cell">
          Automate task assignments and manage job progress across teams and machines.
          <span class="overlay-service-tags">
            <span class="tag">Digital work orders</span>
            <span class="tag">Job tracking</span>
            <span class="tag">Resource scheduling</span>
          </span>
        </span>
      </div>

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">Procurement &amp; Vendor Management</span>
        <span class="overlay-service-desc" role="cell">
          Streamline supplier communication, cost control, and delivery timelines.
          <span class="overlay-service-tags">
            <span class="tag">Purchase requests &amp; POs</span>
            <span class="tag">Supplier performance</span>
            <span class="tag">Delivery tracking</span>
          </span>
        </span>
      </div>

    </div>
  </div>
</section>

<section class="overlay-section">
  <span class="overlay-section-index">03 — Optimisation &amp; Automation</span>

  <div class="overlay-section-copy">
    <h3 class="overlay-section-title">We turn data into better decisions.</h3>
    <p class="overlay-section-body">
      Optimise design and operations with automation, dashboards, and clear feedback loops across carbon, cost, and waste.
    </p>

    <div class="overlay-service-table" role="table" aria-label="Optimisation &amp; Automation services">

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">Design Process Optimisation</span>
        <span class="overlay-service-desc" role="cell">
          Remove bottlenecks and shorten cycles from brief to issue.
          <span class="overlay-service-tags">
            <span class="tag">Workflow mapping</span>
            <span class="tag">Design sprints</span>
            <span class="tag">Review cadence</span>
          </span>
        </span>
      </div>

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">Automation &amp; Dashboards</span>
        <span class="overlay-service-desc" role="cell">
          Build live dashboards and event-driven automations for routine tasks.
          <span class="overlay-service-tags">
            <span class="tag">n8n/Make pipelines</span>
            <span class="tag">Role-based views</span>
            <span class="tag">Notifications &amp; tasks</span>
          </span>
        </span>
      </div>

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">Carbon &amp; Energy Tracking</span>
        <span class="overlay-service-desc" role="cell">
          Measure embodied and operational carbon with scenario comparisons.
          <span class="overlay-service-tags">
            <span class="tag">Embodied carbon (A1–A5)</span>
            <span class="tag">Operational energy</span>
            <span class="tag">Target vs actual</span>
          </span>
        </span>
      </div>

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">Waste &amp; Material Reports</span>
        <span class="overlay-service-desc" role="cell">
          Track material use, offcuts, and diversion rates with clear KPIs.
          <span class="overlay-service-tags">
            <span class="tag">BOM-to-waste links</span>
            <span class="tag">Recycling &amp; reuse</span>
            <span class="tag">Monthly report packs</span>
          </span>
        </span>
      </div>

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">Data Workflows &amp; Governance</span>
        <span class="overlay-service-desc" role="cell">
          Define single source of truth, schemas, and audits across tools.
          <span class="overlay-service-tags">
            <span class="tag">Data model &amp; IDs</span>
            <span class="tag">APIs &amp; sync rules</span>
            <span class="tag">Quality checks</span>
          </span>
        </span>
      </div>

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">Performance Simulation Loop</span>
        <span class="overlay-service-desc" role="cell">
          Close the loop between analysis and design choices with rapid feedback.
          <span class="overlay-service-tags">
            <span class="tag">Climate &amp; comfort</span>
            <span class="tag">Daylight &amp; glare</span>
            <span class="tag">Iterative scenarios</span>
          </span>
        </span>
      </div>

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">KPI Frameworks &amp; Alerts</span>
        <span class="overlay-service-desc" role="cell">
          Define metrics that matter and trigger actions when thresholds are crossed.
          <span class="overlay-service-tags">
            <span class="tag">OKRs ↔ design KPIs</span>
            <span class="tag">Anomaly flags</span>
            <span class="tag">Escalation paths</span>
          </span>
        </span>
      </div>

      <div class="overlay-service-row" role="row">
        <span class="overlay-service-name" role="cell">Cost &amp; Scenario Modelling</span>
        <span class="overlay-service-desc" role="cell">
          Compare options by capex/opex, time, and impact to select the best trade-offs.
          <span class="overlay-service-tags">
            <span class="tag">Sensitivity analysis</span>
            <span class="tag">Lifecycle costs</span>
            <span class="tag">Playbooks &amp; presets</span>
          </span>
        </span>
      </div>

    </div>
  </div>
</section>


    <figure class="overlay-section-image">
      <img src="assets/H-38 Branding.png" alt="Team coordination across digital and physical environments" loading="lazy">
    </figure>

    
    <section class="overlay-contact">
      <div class="overlay-contact-copy">
        <h3 class="overlay-contact-title">Drop us a line</h3>
        <p class="overlay-contact-lede">We’d love to hear from you. If you’re navigating complex delivery challenges or building better places, reach out and we’ll find the right way to work together.</p>
      </div>
      <div class="overlay-contact-grid">
        <article class="overlay-contact-card">
          <div class="overlay-contact-body">
            <h4 class="overlay-contact-name">Mail</h4>
            <a href="mailto:adnan@h-38.com" class="overlay-contact-link">adnan@h-38.com</a>
          </div>
        </article>
        <article class="overlay-contact-card">
          <div class="overlay-contact-body">
            <h4 class="overlay-contact-name">Phone number</h4>
            <p class="overlay-contact-phone">+971 52 891 5205</p>
          </div>
        </article>
        <article class="overlay-contact-card">
          <div class="overlay-contact-body">
            <h4 class="overlay-contact-name">Address</h4>
            <p class="overlay-contact-role">55 St</p>
            <p class="overlay-contact-phone">Al Quoz - Al Quoz Industrial Area 3</p>
            <p class="overlay-contact-phone">Dubai</p>
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
    img.src = 'assets/H-38 animated logo.gif';
    img.alt = 'H-38 animated logo';
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

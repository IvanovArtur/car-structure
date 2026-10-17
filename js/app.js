/* Car page logic: language switching, scroll progress, part details panel,
   engine/motor cycle controls, power-flow and parts catalogue.
   The car comes from <body data-car="…"> and window.CARS (js/cars/*.js). */
(function () {
  'use strict';

  const { I18N, LANGS } = window;
  const car = window.CARS[document.body.dataset.car];
  const PARTS = car.parts;
  const FLOW = car.flow;
  const CATEGORIES = ['body', 'engine', 'drivetrain', 'chassis'];
  const STORAGE_KEY = 'under-the-hood-lang';
  const byId = Object.fromEntries(PARTS.map(p => [p.id, p]));

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const isMobile = () => window.matchMedia('(max-width: 760px)').matches;

  const ICONS = {
    fuel: '<path d="M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h14M7 8h6M15 10h2a2 2 0 0 1 2 2v4a1.5 1.5 0 0 0 3 0V8l-3-3"/>',
    engine: '<path d="M4 10h2V8h3V6h6v2h2l2 2h1v6h-1l-2 2H9l-3-3H4z"/><path d="M9 6V4h6v2"/>',
    transmission: '<circle cx="9" cy="9" r="3"/><path d="M9 3v2M9 13v2M3 9h2M13 9h2"/><circle cx="16.5" cy="16.5" r="2.5"/><path d="M16.5 12v1.5M16.5 19.5V21M12 16.5h1.5M19.5 16.5H21"/>',
    driveshaft: '<path d="M6 12h12"/><rect x="2" y="9" width="4" height="6" rx="1"/><rect x="18" y="9" width="4" height="6" rx="1"/><path d="M10 10v4M14 10v4"/>',
    differential: '<circle cx="12" cy="12" r="4"/><path d="M2 12h6M16 12h6M12 2v6M12 16v6"/>',
    wheels: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/>',
    transferCase: '<rect x="8" y="8" width="8" height="8" rx="2"/><path d="M2 12h6M16 12h3M19 12l-2-4M19 12l-2 4M19 8h3M19 16h3"/>',
    charging: '<path d="M8 3v5M16 3v5M5 8h14v3a7 7 0 0 1-14 0zM12 18v3"/>',
    hvBattery: '<rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 10v4M11 9l-2 3h4l-2 3"/>',
    inverter: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M6 15h3M6 12h3M13 12c1-3 2-3 3 0s2 3 3 0"/>',
    motor: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1"/>',
    reduction: '<circle cx="9" cy="10" r="5"/><circle cx="17" cy="16" r="3"/><path d="M9 10h.01M17 16h.01"/>'
  };
  const ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const STROKE_COLORS = car.cycle === 'electric' ? ['#7be07f', '#4cc3ff', '#ffb020', '#ff7a2f'] : ['#4cc3ff', '#8f9bff', '#ff8a3d', '#a0a8b8'];

  /* ------------------------------------------------------------ i18n */

  let lang = 'en';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(stored)) lang = stored;
  } catch (e) { /* storage unavailable */ }
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (LANGS.includes(fromUrl)) lang = fromUrl;

  const lookup = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
  const carText = l => (car.i18n && car.i18n[l]) || {};
  // Car-specific texts win over the shared ones; English fills any gaps.
  const SERVICE = window.SERVICE || {};
  const serviceUi = l => (SERVICE[l] ? { service: SERVICE[l].ui } : {});
  const t = path => {
    for (const source of [carText(lang).ui, I18N[lang].ui, serviceUi(lang), carText('en').ui, I18N.en.ui, serviceUi('en')]) {
      const v = lookup(source, path);
      if (v != null) return v;
    }
    return '';
  };
  const partText = id => Object.assign({},
    I18N.en.parts[id], (carText('en').parts || {})[id],
    I18N[lang].parts[id], (carText(lang).parts || {})[id]);
  // Service tips for a part: car-specific ones replace the generic ones.
  const serviceFor = id => {
    for (const l of [lang, 'en']) {
      const src = SERVICE[l];
      if (!src) continue;
      const tips = (src.byCar && src.byCar[car.id] && src.byCar[car.id][id]) || (src.parts && src.parts[id]);
      if (tips) return tips;
    }
    return null;
  };
  const escape = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function setLang(next) {
    if (!LANGS.includes(next)) return;
    lang = next;
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* ignore */ }
    applyLang();
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.title = t('meta.title');
    const desc = $('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.description'));
    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    // Touchscreens have no mouse to "click" with.
    if (window.matchMedia('(hover: none)').matches) $('#hint').textContent = t('ui.hintTouch');
    $$('[data-i18n-label]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nLabel)));
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    // Carry the language over to the other pages (file:// pages may not share storage).
    $$('[data-keep-lang]').forEach(a => {
      const [base, hash] = a.getAttribute('href').split('#');
      a.href = base.split('?')[0] + '?lang=' + lang + (hash ? '#' + hash : '');
    });
    $('#panelClose').setAttribute('aria-label', t('panel.close'));

    renderStrokes();
    renderFlow();
    renderFilters();
    renderCards();
    renderService();
    if (cycle) cycle.setLabels(t('cycle.labels'));
    updatePlayButton();
    if (currentId) renderPanel(currentId);
    if (hoverId) $('#tooltipName').textContent = partText(hoverId).name;
  }

  $$('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

  /* ------------------------------------------------------------ 3D scene */

  const canvas = $('#scene');
  const tooltip = $('#tooltip');
  let hoverId = null;
  let scene = null;

  try {
    scene = window.CarScene ? window.CarScene.create(canvas, car, {
      onHover(id, x, y) {
        hoverId = id;
        if (!id) {
          tooltip.classList.remove('visible');
          return;
        }
        $('#tooltipName').textContent = partText(id).name;
        const w = tooltip.offsetWidth, h = tooltip.offsetHeight;
        const left = x + 18 + w > window.innerWidth ? x - w - 18 : x + 18;
        const top = clamp(y + 18, 8, window.innerHeight - h - 8);
        tooltip.style.transform = `translate(${left}px, ${top}px)`;
        tooltip.classList.add('visible');
      },
      onPick(id) {
        tooltip.classList.remove('visible');
        if (id) openPart(id);
        else closePanel();
      }
    }) : null;
  } catch (err) {
    console.error(err);
    scene = null;
  }

  // Small 3D view of the selected part inside the details panel.
  let preview = null;
  try {
    preview = scene ? scene.createPreview($('#previewCanvas')) : null;
  } catch (err) {
    console.error(err);
  }
  if (!preview) $('#panelVisual').hidden = true;

  if (scene) {
    requestAnimationFrame(() => requestAnimationFrame(() => $('#loader').classList.add('done')));
  } else {
    $('#loader').classList.add('done');
    $('#fallback').hidden = false;
  }

  function updateLayout() {
    if (!scene) return;
    const open = $('#panel').classList.contains('open');
    // On phones the title sits on top and chapter cards at the bottom, so move the car around them.
    if (isMobile()) scene.setLayout(0, open ? 0.24 : progress < 0.045 ? -0.17 : 0.04);
    else scene.setLayout(open ? -0.17 : 0.13, 0);
  }

  if (scene && 'IntersectionObserver' in window) {
    new IntersectionObserver(entries => scene.setActive(entries[0].isIntersecting)).observe($('#explore'));
  }

  /* ------------------------------------------------------------ scroll */

  const explore = $('#explore');
  const hero = $('#hero');
  const cue = $('#scrollCue');
  const hint = $('#hint');
  const chapters = $$('.chapter');
  const nav = $('#nav');
  let ticking = false;
  let progress = 0;

  function onScroll() {
    ticking = false;
    const rect = explore.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const p = clamp(-rect.top / total, 0, 1);
    if (scene) scene.setProgress(p);
    progress = p;
    updateLayout();

    hero.classList.toggle('hidden', p > 0.045);
    cue.classList.toggle('hidden', p > 0.02);
    hint.classList.toggle('visible', p > 0.03 && rect.bottom > window.innerHeight * 0.6 && !$('#panel').classList.contains('open'));
    nav.classList.toggle('scrolled', window.scrollY > 20);

    chapters.forEach(ch => {
      const from = parseFloat(ch.dataset.from);
      const to = parseFloat(ch.dataset.to);
      ch.classList.toggle('active', p >= from && p < to);
      ch.classList.toggle('past', p >= to);
    });

    const pct = Math.round(p * 100);
    $('#meterValue').textContent = pct + '%';
    $('#meterFill').style.height = pct + '%';
    $('#navProgress').style.width = pct + '%';
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  window.addEventListener('resize', () => {
    onScroll();
    updateLayout();
  });

  /* ------------------------------------------------------------ panel */

  const panel = $('#panel');
  const scrim = $('#scrim');
  let currentId = null;

  function renderPanel(id) {
    const meta = byId[id];
    const text = partText(id);
    const index = PARTS.indexOf(meta);
    panel.dataset.cat = meta.cat;
    $('#panelTag').textContent = t('cats.' + meta.cat);
    $('#panelCount').textContent = `${String(index + 1).padStart(2, '0')} / ${PARTS.length}`;
    $('#panelTitle').textContent = text.name;
    $('#panelShort').textContent = text.short;
    $('#panelWhat').textContent = text.what;
    $('#panelHow').textContent = text.how;
    $('#panelTip').textContent = text.tip;
    renderPanelService(id);
    $('#panelRelated').innerHTML = meta.related
      .map(r => `<button type="button" class="chip" data-cat="${byId[r].cat}" data-open="${r}"><i></i>${escape(partText(r).name)}</button>`)
      .join('');
  }

  function openPart(id) {
    if (!byId[id]) return;
    currentId = id;
    renderPanel(id);
    panel.classList.add('open');
    document.body.classList.add('panel-open');
    panel.setAttribute('aria-hidden', 'false');
    scrim.classList.add('visible');
    $('.panel-scroll', panel).scrollTop = 0;
    if (scene) scene.select(id);
    if (preview) preview.show(id);
    hint.classList.remove('visible');
    updateLayout();
  }

  function closePanel() {
    if (!currentId) return;
    currentId = null;
    panel.classList.remove('open');
    document.body.classList.remove('panel-open');
    panel.setAttribute('aria-hidden', 'true');
    scrim.classList.remove('visible');
    if (scene) scene.select(null);
    if (preview) preview.hide();
    updateLayout();
    onScroll();
  }

  function step(dir) {
    if (!currentId) return;
    const i = PARTS.findIndex(p => p.id === currentId);
    openPart(PARTS[(i + dir + PARTS.length) % PARTS.length].id);
  }

  $('#panelClose').addEventListener('click', closePanel);
  $('#panelPrev').addEventListener('click', () => step(-1));
  $('#panelNext').addEventListener('click', () => step(1));
  scrim.addEventListener('click', closePanel);
  document.addEventListener('keydown', e => {
    if (!currentId) return;
    if (e.key === 'Escape') closePanel();
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });

  // Any element with data-open="<partId>" opens that part.
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-open]');
    if (trigger) openPart(trigger.dataset.open);
  });

  /* ------------------------------------------------------------ engine cycle */

  let cycle = null;
  let activeStroke = 0;

  function renderStrokes() {
    $('#strokes').innerHTML = t('cycle.strokes')
      .map((s, i) => `
        <li class="stroke${i === activeStroke ? ' active' : ''}" data-stroke="${i}" style="--stroke-color:${STROKE_COLORS[i]}" tabindex="0">
          <span class="stroke-num">${i + 1}</span>
          <span class="stroke-name">${escape(s.name)}</span>
          <span class="stroke-text">${escape(s.text)}</span>
        </li>`)
      .join('');
    $('#cycleCaption').textContent = t('cycle.strokes')[activeStroke].name;
  }

  function setActiveStroke(i) {
    activeStroke = i;
    $$('.stroke').forEach((el, j) => el.classList.toggle('active', j === i));
    $('#cycleCaption').textContent = `${i + 1} / 4 · ${t('cycle.strokes')[i].name}`;
  }

  function updatePlayButton() {
    const playing = cycle ? cycle.isPlaying() : true;
    $('#cyclePlay').classList.toggle('paused', !playing);
    $('#cyclePlayLabel').textContent = playing ? t('cycle.pause') : t('cycle.play');
  }

  $('#strokes').addEventListener('click', e => {
    const li = e.target.closest('[data-stroke]');
    if (li && cycle) cycle.goToStroke(Number(li.dataset.stroke));
  });
  $('#strokes').addEventListener('keydown', e => {
    const li = e.target.closest('[data-stroke]');
    if (li && cycle && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      cycle.goToStroke(Number(li.dataset.stroke));
    }
  });
  $('#cyclePlay').addEventListener('click', () => {
    if (!cycle) return;
    cycle.setPlaying(!cycle.isPlaying());
    updatePlayButton();
  });
  $('#cycleSpeed').addEventListener('input', e => {
    const v = Number(e.target.value);
    $('#cycleSpeedOut').textContent = v + '×';
    if (cycle) cycle.setSpeed(v);
  });

  /* ------------------------------------------------------------ power flow */

  function renderFlow() {
    $('#flowTrack').style.setProperty('--steps', FLOW.length);
    $('#flowTrack').innerHTML = FLOW.map((id, i) => {
      const meta = byId[id];
      const text = partText(id);
      return `
        <li class="flow-step" data-cat="${meta.cat}" style="animation-delay:${i * 60}ms">
          <button type="button" data-open="${id}">
            <span class="flow-icon"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[id]}</svg></span>
            <span class="flow-text">
              <span class="flow-num">${String(i + 1).padStart(2, '0')}</span>
              <strong>${escape(text.name)}</strong>
              <span class="flow-desc">${escape(text.short)}</span>
            </span>
          </button>
        </li>`;
    }).join('');
  }

  // A pulse that travels along the power path.
  let flowStep = 0;
  setInterval(() => {
    const steps = $$('.flow-step');
    steps.forEach((s, i) => s.classList.toggle('pulse', i === flowStep));
    flowStep = (flowStep + 1) % (steps.length + 2);
  }, 650);

  /* ------------------------------------------------------------ catalogue */

  let filter = 'all';

  function renderFilters() {
    const items = ['all', ...CATEGORIES];
    $('#filters').innerHTML = items
      .map(c => `<button type="button" class="filter" data-filter="${c}" ${c === 'all' ? '' : `data-cat="${c}"`} aria-pressed="${c === filter}">${c === 'all' ? '' : '<i></i>'}${escape(c === 'all' ? t('parts.all') : t('cats.' + c))}</button>`)
      .join('');
  }

  function renderCards() {
    $('#cards').innerHTML = PARTS
      .map((p, i) => ({ p, i }))
      .filter(({ p }) => filter === 'all' || p.cat === filter)
      .map(({ p, i }, k) => {
        const text = partText(p.id);
        return `
          <li class="card" data-cat="${p.cat}" style="animation-delay:${k * 35}ms">
            <button type="button" data-open="${p.id}">
              <span class="card-top">
                <span>${String(i + 1).padStart(2, '0')}</span>
                <span class="card-cat"><i></i>${escape(t('cats.' + p.cat))}</span>
              </span>
              <h3>${escape(text.name)}</h3>
              <p>${escape(text.short)}</p>
              <span class="arrow">${ARROW}</span>
            </button>
          </li>`;
      })
      .join('');
  }

  $('#filters').addEventListener('click', e => {
    const b = e.target.closest('[data-filter]');
    if (!b) return;
    filter = b.dataset.filter;
    renderFilters();
    renderCards();
  });

  /* ------------------------------------------------------------ at the car service */

  function renderPanelService(id) {
    const tips = serviceFor(id);
    $('#panelService').hidden = !tips;
    if (!tips) return;
    const list = (items, cls) => `<ul class="${cls}">${items.map(x => `<li>${escape(x)}</li>`).join('')}</ul>`;
    $('#panelServiceBody').innerHTML = `
      <h5>${escape(t('service.signs'))}</h5>
      ${list(tips.signs, 'svc-signs')}
      ${tips.watch.map(w => `
        <div class="svc-myth">
          <span class="svc-label svc-they">${escape(t('service.they'))}</span>
          <p class="svc-claim">${escape(w.claim)}</p>
          <span class="svc-label svc-truth">${escape(t('service.truth'))}</span>
          <p>${escape(w.truth)}</p>
        </div>`).join('')}
      <h5>${escape(t('service.ask'))}</h5>
      ${list(tips.ask, 'svc-ask')}`;
  }

  function renderService() {
    $('#mythsTitle').textContent = t('service.myths.' + car.id);
    $('#myths').innerHTML = (car.service || [])
      .filter(id => byId[id] && serviceFor(id))
      .map(id => {
        const w = serviceFor(id).watch[0];
        return `
          <li class="myth" data-cat="${byId[id].cat}">
            <button type="button" data-open="${id}">
              <span class="myth-part"><i></i>${escape(partText(id).name)}</span>
              <span class="svc-label svc-they">${escape(t('service.they'))}</span>
              <span class="myth-claim">${escape(w.claim)}</span>
              <span class="svc-label svc-truth">${escape(t('service.truth'))}</span>
              <span class="myth-truth">${escape(w.truth)}</span>
              <span class="myth-more">${escape(t('service.more'))}${ARROW}</span>
            </button>
          </li>`;
      }).join('');
    const rules = (SERVICE[lang] || SERVICE.en || {}).rules || [];
    $('#rules').innerHTML = rules.map((r, i) => `
      <li class="rule">
        <span class="rule-num">${String(i + 1).padStart(2, '0')}</span>
        <strong>${escape(r.title)}</strong>
        <p>${escape(r.text)}</p>
      </li>`).join('');
  }

  /* ------------------------------------------------------------ init */

  const Cycle = car.cycle === 'electric' ? window.MotorCycle : window.EngineCycle;
  if (Cycle) cycle = Cycle.create($('#cycleSvg'), { onStroke: setActiveStroke, mode: car.cycle });
  applyLang();
  updateLayout();
  onScroll();
})();

/* Start page: language, the three car cards with 3D turntables, and the comparison table. */
(function () {
  'use strict';

  const { I18N, LANGS, CARS } = window;
  const SERVICE = window.SERVICE || {};
  const STORAGE_KEY = 'under-the-hood-lang';
  const TYPES = ['gas', 'diesel', 'electric'];
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const escape = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  let lang = 'en';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(stored)) lang = stored;
  } catch (e) { /* storage unavailable */ }
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (LANGS.includes(fromUrl)) lang = fromUrl;

  const lookup = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
  const serviceUi = l => (SERVICE[l] ? { service: SERVICE[l].ui } : {});
  const t = path => {
    for (const source of [I18N[lang].ui, serviceUi(lang), I18N.en.ui, serviceUi('en')]) {
      const v = lookup(source, path);
      if (v != null) return v;
    }
    return '';
  };

  function renderCompare() {
    const rows = t('home.compare.rows');
    $('#compareTable').innerHTML = `
      <thead><tr><th></th>${TYPES.map(c => `<th data-car="${c}">${escape(t('cars.' + c))}</th>`).join('')}</tr></thead>
      <tbody>${rows.map(r => `<tr><th scope="row">${escape(r.label)}</th>${TYPES.map(c => `<td data-car="${c}" data-label="${escape(t('cars.' + c))}">${escape(r[c])}</td>`).join('')}</tr>`).join('')}</tbody>`;
  }

  function renderRules() {
    const rules = (SERVICE[lang] || SERVICE.en || {}).rules || [];
    $('#rules').innerHTML = rules.map((r, i) => `
      <li class="rule">
        <span class="rule-num">${String(i + 1).padStart(2, '0')}</span>
        <strong>${escape(r.title)}</strong>
        <p>${escape(r.text)}</p>
      </li>`).join('');
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.title = t('home.meta');
    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-label]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nLabel)));
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $$('[data-keep-lang]').forEach(a => {
      const [base, hash] = a.getAttribute('href').split('#');
      a.href = base.split('?')[0] + '?lang=' + lang + (hash ? '#' + hash : '');
    });
    renderCompare();
    renderRules();
  }

  $$('.lang button').forEach(b => b.addEventListener('click', () => {
    lang = b.dataset.lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    applyLang();
  }));

  // Turntables: a drag spins the car instead of opening the page.
  $$('.car-card').forEach(card => {
    const canvas = $('canvas', card);
    let show = null;
    try {
      show = window.CarScene && CARS[card.dataset.car] ? window.CarScene.showcase(canvas, CARS[card.dataset.car]) : null;
    } catch (err) {
      console.error(err);
    }
    if (!show) {
      card.classList.add('no-3d');
      return;
    }
    let start = null, dragged = false;
    canvas.addEventListener('pointerdown', e => {
      start = e.clientX;
      dragged = false;
    });
    window.addEventListener('pointermove', e => {
      if (start !== null && Math.abs(e.clientX - start) > 6) dragged = true;
    });
    window.addEventListener('pointerup', () => { start = null; });
    card.addEventListener('click', e => {
      if (dragged) {
        e.preventDefault();
        dragged = false;
      }
    });
    card.addEventListener('pointerenter', () => show.setHover(true));
    card.addEventListener('pointerleave', () => show.setHover(false));
  });

  applyLang();
})();

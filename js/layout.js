/* Markup shared by the car pages (gas.html, diesel.html, electric.html).
   Each page is just <body data-car="…"> plus scripts; this fills in the body
   before the rest of the scripts run. Texts are filled in later by app.js. */
(function () {
  'use strict';
  const car = document.body.dataset.car;
  document.body.insertAdjacentHTML('afterbegin', `
    <header class="nav" id="nav">
      <a class="brand" href="index.html" data-keep-lang aria-label="Under the Hood">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M3 15l2.2-4.6A2 2 0 0 1 7 9.3h10a2 2 0 0 1 1.8 1.1L21 15v3H3z"/><circle cx="7.5" cy="18" r="2"/><circle cx="16.5" cy="18" r="2"/></svg>
        </span>
        <span class="brand-name" data-i18n="brand"></span>
      </a>
      <nav class="nav-links" aria-label="Sections">
        <a href="#top" data-i18n="nav.explore"></a>
        <a href="#cycle" data-i18n="nav.cycle"></a>
        <a href="#flow" data-i18n="nav.flow"></a>
        <a href="#parts" data-i18n="nav.parts"></a>
        <a href="#service" data-i18n="service.nav"></a>
      </nav>
      <div class="car-switch" role="group" data-i18n-label="cars.label">
        <a href="gas.html" data-car-link="gas" data-keep-lang><span data-i18n="cars.gas"></span></a>
        <a href="diesel.html" data-car-link="diesel" data-keep-lang><span data-i18n="cars.diesel"></span></a>
        <a href="electric.html" data-car-link="electric" data-keep-lang><span data-i18n="cars.electric"></span></a>
      </div>
      <div class="lang" role="group" data-i18n-label="lang">
        <button type="button" data-lang="en">EN</button>
        <button type="button" data-lang="uk">UA</button>
        <button type="button" data-lang="ru">RU</button>
      </div>
      <div class="nav-progress" aria-hidden="true"><span id="navProgress"></span></div>
    </header>

    <main id="top">
      <!-- Scroll-driven 3D explorer -->
      <section class="explore" id="explore">
        <div class="stage" id="stage">
          <div class="stage-bg" aria-hidden="true"></div>
          <canvas id="scene" aria-label="3D model of a car"></canvas>

          <div class="loader" id="loader">
            <span class="spinner" aria-hidden="true"></span>
            <span data-i18n="ui.loading"></span>
          </div>
          <p class="fallback" id="fallback" hidden data-i18n="ui.error"></p>

          <div class="hero" id="hero">
            <p class="eyebrow" data-i18n="hero.eyebrow"></p>
            <h1 data-i18n="hero.title"></h1>
            <p class="lead" data-i18n="hero.sub"></p>
          </div>

          <div class="chapters">
            <article class="chapter" data-from="0.06" data-to="0.3" data-cat="body">
              <p class="kicker" data-i18n="ch1.kicker"></p>
              <h2 data-i18n="ch1.title"></h2>
              <p data-i18n="ch1.text"></p>
            </article>
            <article class="chapter" data-from="0.3" data-to="0.54" data-cat="engine">
              <p class="kicker" data-i18n="ch2.kicker"></p>
              <h2 data-i18n="ch2.title"></h2>
              <p data-i18n="ch2.text"></p>
            </article>
            <article class="chapter" data-from="0.54" data-to="0.76" data-cat="drivetrain">
              <p class="kicker" data-i18n="ch3.kicker"></p>
              <h2 data-i18n="ch3.title"></h2>
              <p data-i18n="ch3.text"></p>
            </article>
            <article class="chapter" data-from="0.76" data-to="1.01" data-cat="chassis">
              <p class="kicker" data-i18n="ch4.kicker"></p>
              <h2 data-i18n="ch4.title"></h2>
              <p data-i18n="ch4.text"></p>
            </article>
          </div>

          <div class="scroll-cue" id="scrollCue" aria-hidden="true">
            <span class="mouse"><i></i></span>
            <span data-i18n="hero.scroll"></span>
          </div>

          <div class="meter" id="meter" aria-hidden="true">
            <span class="meter-value" id="meterValue">0%</span>
            <span class="meter-track"><span class="meter-fill" id="meterFill"></span></span>
            <span class="meter-label" data-i18n="ui.progress"></span>
          </div>

          <p class="hint" id="hint" data-i18n="ui.hint"></p>
        </div>
      </section>

      <!-- Four-stroke cycle -->
      <section class="section cycle" id="cycle">
        <div class="container cycle-grid">
          <div class="cycle-copy">
            <p class="eyebrow" data-i18n="cycle.eyebrow"></p>
            <h2 class="section-title" data-i18n="cycle.title"></h2>
            <p class="section-text" data-i18n="cycle.text"></p>
            <ol class="strokes" id="strokes"></ol>
            <button type="button" class="link-btn" data-open="engine">
              <span data-i18n="cycle.open"></span>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </div>
          <div class="cycle-visual">
            <svg id="cycleSvg" role="img" aria-labelledby="cycleCaption"></svg>
            <div class="cycle-controls">
              <button type="button" class="play-btn" id="cyclePlay">
                <svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>
                <svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5l12 7-12 7z"/></svg>
                <span id="cyclePlayLabel"></span>
              </button>
              <label class="speed">
                <span data-i18n="cycle.speed"></span>
                <input type="range" id="cycleSpeed" min="0.25" max="3" step="0.25" value="1">
                <output id="cycleSpeedOut">1×</output>
              </label>
            </div>
            <p class="cycle-caption" id="cycleCaption"></p>
          </div>
        </div>
      </section>

      <!-- Power flow -->
      <section class="section flow" id="flow">
        <div class="container">
          <p class="eyebrow" data-i18n="flow.eyebrow"></p>
          <h2 class="section-title" data-i18n="flow.title"></h2>
          <p class="section-text" data-i18n="flow.text"></p>
          <ol class="flow-track" id="flowTrack"></ol>
        </div>
      </section>

      <!-- Parts catalogue -->
      <section class="section parts" id="parts">
        <div class="container">
          <p class="eyebrow" data-i18n="parts.eyebrow"></p>
          <h2 class="section-title" data-i18n="parts.title"></h2>
          <p class="section-text" data-i18n="parts.text"></p>
          <div class="filters" id="filters" role="group"></div>
          <ul class="cards" id="cards"></ul>
        </div>
      </section>

      <!-- At the car service -->
      <section class="section service" id="service">
        <div class="container">
          <p class="eyebrow" data-i18n="service.eyebrow"></p>
          <h2 class="section-title" data-i18n="service.title"></h2>
          <p class="section-text" data-i18n="service.text"></p>

          <h3 class="service-sub" id="mythsTitle"></h3>
          <p class="service-sub-text" data-i18n="service.mythsText"></p>
          <ul class="myths" id="myths"></ul>

          <h3 class="service-sub" data-i18n="service.rulesTitle"></h3>
          <ol class="rules" id="rules"></ol>

          <p class="service-caution" data-i18n="service.caution"></p>
          <p class="service-note" data-i18n="service.note"></p>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container footer-inner">
        <p data-i18n="footer.note"></p>
        <p class="footer-muted" data-i18n="footer.built"></p>
        <a href="#top" class="link-btn" data-i18n="footer.top"></a>
      </div>
    </footer>

    <!-- Part details -->
    <div class="scrim" id="scrim"></div>
    <aside class="panel" id="panel" role="dialog" aria-modal="false" aria-labelledby="panelTitle" aria-hidden="true">
      <div class="panel-head">
        <span class="tag" id="panelTag"></span>
        <span class="panel-count" id="panelCount"></span>
        <button type="button" class="icon-btn" id="panelClose">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>
      <div class="panel-scroll">
        <h3 class="panel-title" id="panelTitle"></h3>
        <p class="panel-short" id="panelShort"></p>
        <div class="panel-visual" id="panelVisual">
          <canvas id="previewCanvas" aria-hidden="true"></canvas>
          <span class="panel-visual-hint" data-i18n="panel.drag"></span>
        </div>
        <section class="panel-block">
          <h4 data-i18n="panel.what"></h4>
          <p id="panelWhat"></p>
        </section>
        <section class="panel-block">
          <h4 data-i18n="panel.how"></h4>
          <p id="panelHow"></p>
        </section>
        <section class="panel-block panel-tip">
          <h4 data-i18n="panel.tip"></h4>
          <p id="panelTip"></p>
        </section>
        <section class="panel-block panel-service" id="panelService" hidden>
          <h4 class="panel-service-title">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/></svg>
            <span data-i18n="service.panel"></span>
          </h4>
          <div id="panelServiceBody"></div>
        </section>
        <section class="panel-block">
          <h4 data-i18n="panel.related"></h4>
          <div class="chips" id="panelRelated"></div>
        </section>
      </div>
      <div class="panel-foot">
        <button type="button" class="ghost-btn" id="panelPrev">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
          <span data-i18n="panel.prev"></span>
        </button>
        <button type="button" class="ghost-btn" id="panelNext">
          <span data-i18n="panel.next"></span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>
      </div>
    </aside>

    <div class="tooltip" id="tooltip" aria-hidden="true">
      <strong id="tooltipName"></strong>
      <span data-i18n="ui.tooltip"></span>
    </div>
  `);
  document.querySelectorAll('[data-car-link]').forEach(a => {
    if (a.dataset.carLink === car) a.setAttribute('aria-current', 'page');
  });
})();

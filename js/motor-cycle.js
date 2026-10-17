/* Animated diagram of an electric motor: battery → inverter → three-phase
   currents → stator coils → rotating magnetic field → rotor.
   window.MotorCycle.create(svgElement, { onStroke }) has the same interface as
   EngineCycle; the four "strokes" highlight battery, inverter, stator and rotor. */
(function () {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';
  const MX = 160, MY = 300; // motor centre
  const R_STATOR = 116, R_COIL = 90, R_ROTOR = 50;
  const PHASES = ['#ff7a2f', '#4cc3ff', '#7be07f']; // A, B, C
  const STEP_SECONDS = 3.2;

  function el(name, attrs, parent) {
    const node = document.createElementNS(NS, name);
    for (const k in attrs) node.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(node);
    return node;
  }
  const clampDt = dt => Math.min(0.05, Math.max(0, dt));

  function create(svg, options = {}) {
    const onStroke = options.onStroke || (() => {});
    svg.setAttribute('viewBox', '0 0 320 440');
    svg.innerHTML = '';

    const defs = el('defs', {}, svg);
    const glow = el('radialGradient', { id: 'mcGlow' }, defs);
    el('stop', { offset: '0', 'stop-color': 'rgba(255,255,255,0.9)' }, glow);
    el('stop', { offset: '1', 'stop-color': 'rgba(255,255,255,0)' }, glow);

    /* ---- battery */
    const battery = el('g', {}, svg);
    el('rect', { x: 14, y: 30, width: 78, height: 54, rx: 8, fill: '#16202c', stroke: '#2f3d50', 'stroke-width': 2 }, battery);
    el('rect', { x: 92, y: 48, width: 6, height: 18, rx: 2, fill: '#2f3d50' }, battery);
    const cells = [];
    for (let i = 0; i < 4; i++) cells.push(el('rect', { x: 22 + i * 17, y: 38, width: 12, height: 38, rx: 3, fill: '#7be07f', opacity: 0.35 }, battery));

    /* ---- inverter */
    const inverter = el('g', {}, svg);
    el('rect', { x: 120, y: 30, width: 80, height: 54, rx: 8, fill: '#16202c', stroke: '#2f3d50', 'stroke-width': 2 }, inverter);
    for (let i = 0; i < 6; i++) el('rect', { x: 130 + (i % 3) * 22, y: 40 + Math.floor(i / 3) * 20, width: 16, height: 12, rx: 2, fill: '#2a3647' }, inverter);
    const switches = Array.from(inverter.querySelectorAll('rect')).slice(1);
    const dcLine = el('path', { d: 'M98 57 H120', stroke: '#7be07f', 'stroke-width': 3, 'stroke-dasharray': '4 6', fill: 'none' }, svg);

    /* ---- three-phase current chart */
    const chart = el('g', {}, svg);
    el('rect', { x: 214, y: 26, width: 94, height: 62, rx: 8, fill: '#111824', stroke: '#2f3d50', 'stroke-width': 1.5 }, chart);
    el('line', { x1: 220, y1: 57, x2: 302, y2: 57, stroke: '#2f3d50', 'stroke-width': 1 }, chart);
    const waves = PHASES.map(c => el('path', { fill: 'none', stroke: c, 'stroke-width': 2 }, chart));

    /* ---- phase lines from the inverter down to the motor */
    const phaseLines = PHASES.map((c, i) => el('path', {
      d: `M${145 + i * 15} 84 V${MY - R_STATOR - 24 + i * 6} H${MX - 30 + i * 30} V${MY - R_STATOR}`,
      stroke: c, 'stroke-width': 2.5, 'stroke-dasharray': '5 6', fill: 'none', opacity: 0.4
    }, svg));

    /* ---- motor: stator ring with six coils, rotor with two magnet poles */
    const stator = el('g', {}, svg);
    el('circle', { cx: MX, cy: MY, r: R_STATOR, fill: '#141b26', stroke: '#2f3d50', 'stroke-width': 3 }, stator);
    el('circle', { cx: MX, cy: MY, r: R_COIL - 22, fill: '#0b0f16' }, stator);
    const coils = [];
    for (let k = 0; k < 6; k++) {
      const ang = (k * 60 - 90) * (Math.PI / 180);
      const g = el('g', { transform: `rotate(${k * 60} ${MX} ${MY})` }, stator);
      el('rect', { x: MX - 14, y: MY - R_STATOR + 6, width: 28, height: 34, rx: 4, fill: '#253041' }, g);
      const coil = el('rect', { x: MX - 18, y: MY - R_STATOR + 12, width: 36, height: 20, rx: 5, fill: PHASES[k % 3], opacity: 0.2 }, g);
      const halo = el('circle', { cx: MX + Math.cos(ang) * R_COIL, cy: MY + Math.sin(ang) * R_COIL, r: 26, fill: 'url(#mcGlow)', opacity: 0 }, stator);
      coils.push({ coil, halo, angle: k * 60, phase: k % 3, sign: k < 3 ? 1 : -1 });
    }
    // Field direction indicator.
    const field = el('g', {}, svg);
    el('path', { d: `M${MX} ${MY - R_COIL + 30} l-8 12 h16 z`, fill: '#ffffff', opacity: 0.85 }, field);
    el('circle', { cx: MX, cy: MY, r: R_COIL - 30, fill: 'none', stroke: 'rgba(255,255,255,0.18)', 'stroke-width': 1.5, 'stroke-dasharray': '3 6' }, svg);

    const rotor = el('g', {}, svg);
    el('path', { d: `M${MX - R_ROTOR} ${MY} A${R_ROTOR} ${R_ROTOR} 0 0 1 ${MX + R_ROTOR} ${MY} Z`, fill: '#e2483d' }, rotor);
    el('path', { d: `M${MX - R_ROTOR} ${MY} A${R_ROTOR} ${R_ROTOR} 0 0 0 ${MX + R_ROTOR} ${MY} Z`, fill: '#3a86ff' }, rotor);
    el('text', { x: MX, y: MY - 20, 'text-anchor': 'middle', fill: '#fff', 'font-size': 16, 'font-weight': 800 }, rotor).textContent = 'N';
    el('text', { x: MX, y: MY + 32, 'text-anchor': 'middle', fill: '#fff', 'font-size': 16, 'font-weight': 800 }, rotor).textContent = 'S';
    el('circle', { cx: MX, cy: MY, r: 9, fill: '#c9d1dc' }, svg);

    /* ---- highlight frames for the four steps */
    const frames = [
      el('rect', { x: 8, y: 24, width: 98, height: 66, rx: 12, fill: 'none', stroke: '#7be07f', 'stroke-width': 2.5, opacity: 0 }, svg),
      el('rect', { x: 114, y: 24, width: 92, height: 66, rx: 12, fill: 'none', stroke: '#4cc3ff', 'stroke-width': 2.5, opacity: 0 }, svg),
      el('circle', { cx: MX, cy: MY, r: R_STATOR + 7, fill: 'none', stroke: '#ffb020', 'stroke-width': 2.5, opacity: 0 }, svg),
      el('circle', { cx: MX, cy: MY, r: R_ROTOR + 7, fill: 'none', stroke: '#ff7a2f', 'stroke-width': 2.5, opacity: 0 }, svg)
    ];

    /* ---- labels */
    const labels = el('g', { class: 'ec-labels' }, svg);
    const label = (x, y, anchor) => el('text', { x, y, 'text-anchor': anchor }, labels);
    // Top labels sit above their boxes, clear of the phase lines running down.
    const lBattery = label(53, 18, 'middle');
    const lInverter = label(160, 18, 'middle');
    const lField = label(261, 18, 'middle');
    const lStator = label(MX + R_STATOR - 6, MY + R_STATOR + 4, 'start');
    const lRotor = label(MX, MY + R_ROTOR + 26, 'middle');

    /* ---- animation */
    let theta = 0; // field angle in radians
    let time = 0;
    let speed = 1;
    let playing = true;
    let visible = true;
    let step = -1;
    let stepClock = 0;
    let last = performance.now();

    function setStep(i) {
      if (i === step) return;
      step = i;
      frames.forEach((f, j) => f.setAttribute('opacity', j === i ? 1 : 0));
      onStroke(i);
    }

    function draw() {
      const deg = (theta * 180) / Math.PI;
      // Coils glow when the field points at them; colour = their phase.
      for (const c of coils) {
        const strength = Math.max(0, Math.cos(theta - (c.angle * Math.PI) / 180));
        const s = strength * strength;
        c.coil.setAttribute('opacity', (0.2 + 0.8 * s).toFixed(2));
        c.halo.setAttribute('opacity', (0.55 * s).toFixed(2));
      }
      field.setAttribute('transform', `rotate(${deg.toFixed(1)} ${MX} ${MY})`);
      rotor.setAttribute('transform', `rotate(${(deg - 22).toFixed(1)} ${MX} ${MY})`);
      // Phase currents: three sine waves 120° apart.
      waves.forEach((w, p) => {
        let d = '';
        for (let i = 0; i <= 40; i++) {
          const x = 220 + i * 2;
          const y = 57 - 22 * Math.cos(theta - (i / 40) * Math.PI * 2 - (p * 2 * Math.PI) / 3);
          d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
        }
        w.setAttribute('d', d);
      });
      phaseLines.forEach((l, p) => {
        const current = Math.abs(Math.cos(theta - (p * 2 * Math.PI) / 3));
        l.setAttribute('opacity', (0.25 + 0.75 * current).toFixed(2));
        l.setAttribute('stroke-dashoffset', (-time * 40).toFixed(1));
      });
      dcLine.setAttribute('stroke-dashoffset', (-time * 30).toFixed(1));
      switches.forEach((sw, i) => sw.setAttribute('fill', Math.sin(time * 22 + i * 1.7) > 0.3 ? '#4cc3ff' : '#2a3647'));
      cells.forEach((c, i) => c.setAttribute('opacity', (0.35 + 0.5 * Math.max(0, Math.sin(time * 2 - i * 0.7))).toFixed(2)));
    }

    function tick(now) {
      const dt = clampDt((now - last) / 1000);
      last = now;
      if (playing && visible) {
        time += dt;
        theta += dt * Math.PI * 1.1 * speed;
        stepClock += dt;
        setStep(Math.floor(stepClock / STEP_SECONDS) % 4);
        draw();
      }
      requestAnimationFrame(tick);
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
      }).observe(svg);
    }

    setStep(0);
    draw();
    requestAnimationFrame(tick);

    return {
      setLabels(l) {
        lBattery.textContent = l.battery;
        lInverter.textContent = l.inverter;
        lField.textContent = l.field;
        lStator.textContent = l.stator;
        lRotor.textContent = l.rotor;
      },
      setPlaying(value) {
        playing = value;
      },
      isPlaying: () => playing,
      setSpeed(value) {
        speed = value;
      },
      goToStroke(i) {
        stepClock = i * STEP_SECONDS + 0.01;
        setStep(i);
        draw();
      }
    };
  }

  window.MotorCycle = { create };
})();

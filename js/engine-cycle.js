/* Animated single-cylinder diagram of the four-stroke cycle.
   window.EngineCycle.create(svgElement, { onStroke, mode }) draws into the SVG and
   calls onStroke(index) whenever the active stroke changes. mode 'otto' (petrol,
   spark plug) or 'diesel' (air only, injector, ignition by compression heat). */
(function () {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';
  const CX = 160, CY = 362, CRANK = 55, ROD = 140;
  const HEAD_Y = 84; // bottom of the cylinder head
  const PISTON_H = 56;

  function el(name, attrs, parent) {
    const node = document.createElementNS(NS, name);
    for (const k in attrs) node.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(node);
    return node;
  }

  // The first animation frame can carry a timestamp slightly before creation time.
  const clampDt = dt => Math.min(0.05, Math.max(0, dt));
  const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
  const rgba = c => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${c[3].toFixed(3)})`;

  // Gas colour for each stroke (start → end), as [r, g, b, alpha].
  const GAS = {
    otto: [
      [[80, 170, 255, 0.18], [80, 170, 255, 0.5]],
      [[80, 170, 255, 0.5], [120, 150, 255, 0.85]],
      [[255, 196, 90, 0.95], [255, 90, 40, 0.45]],
      [[150, 150, 165, 0.5], [150, 150, 165, 0.12]]
    ],
    // Diesel: clear air comes in and turns hot (orange) as it is squeezed.
    diesel: [
      [[190, 225, 255, 0.08], [190, 225, 255, 0.28]],
      [[190, 225, 255, 0.28], [255, 150, 70, 0.6]],
      [[255, 200, 100, 0.95], [255, 90, 40, 0.45]],
      [[110, 110, 120, 0.55], [110, 110, 120, 0.14]]
    ]
  };

  function create(svg, options = {}) {
    const onStroke = options.onStroke || (() => {});
    const diesel = options.mode === 'diesel';
    const gasColors = diesel ? GAS.diesel : GAS.otto;
    svg.setAttribute('viewBox', '0 0 320 440');
    svg.innerHTML = '';

    const defs = el('defs', {}, svg);
    const metal = el('linearGradient', { id: 'ecMetal', x1: '0', x2: '1', y1: '0', y2: '0' }, defs);
    el('stop', { offset: '0', 'stop-color': '#5b6574' }, metal);
    el('stop', { offset: '0.45', 'stop-color': '#c9d1dc' }, metal);
    el('stop', { offset: '1', 'stop-color': '#4a5361' }, metal);
    const wall = el('linearGradient', { id: 'ecWall', x1: '0', x2: '1' }, defs);
    el('stop', { offset: '0', 'stop-color': '#232a36' }, wall);
    el('stop', { offset: '1', 'stop-color': '#394355' }, wall);
    const sparkGrad = el('radialGradient', { id: 'ecSpark' }, defs);
    el('stop', { offset: '0', 'stop-color': '#fff' }, sparkGrad);
    el('stop', { offset: '0.35', 'stop-color': '#ffe08a' }, sparkGrad);
    el('stop', { offset: '1', 'stop-color': 'rgba(255,160,40,0)' }, sparkGrad);

    // Cylinder head (drawn first, the ports are cut through it)
    el('rect', { x: 70, y: 20, width: 180, height: HEAD_Y - 20, rx: 6, fill: '#1b212c', stroke: '#2c3646', 'stroke-width': 1 }, svg);

    // Intake and exhaust ports
    const intakePort = el('path', { d: 'M8 36 H112 Q126 36 126 50 V84 H104 V60 H8 Z', fill: 'rgba(80,170,255,0.08)', stroke: '#3a4558', 'stroke-width': 2 }, svg);
    const exhaustPort = el('path', { d: 'M312 36 H208 Q194 36 194 50 V84 H216 V60 H312 Z', fill: 'rgba(150,150,165,0.06)', stroke: '#3a4558', 'stroke-width': 2 }, svg);
    const intakeFlow = el('path', { d: 'M14 48 H112', stroke: diesel ? '#cfe8ff' : '#5ab4ff', 'stroke-width': 3, 'stroke-dasharray': '6 10', 'stroke-linecap': 'round', fill: 'none', opacity: 0 }, svg);
    const exhaustFlow = el('path', { d: 'M208 48 H306', stroke: '#b5bcc8', 'stroke-width': 3, 'stroke-dasharray': '6 10', 'stroke-linecap': 'round', fill: 'none', opacity: 0 }, svg);

    // Combustion chamber gas
    const gas = el('rect', { x: 96, y: HEAD_Y, width: 128, height: 50, fill: 'rgba(80,170,255,0.2)' }, svg);
    const flash = el('circle', { cx: CX, cy: HEAD_Y + 8, r: 0, fill: 'url(#ecSpark)', opacity: 0 }, svg);
    // Diesel: a cone of fuel spray from the injector just before ignition.
    const spray = el('g', { opacity: 0 }, svg);
    if (diesel) {
      for (const dx of [-34, -20, -7, 7, 20, 34]) {
        el('line', { x1: CX, y1: HEAD_Y + 2, x2: CX + dx, y2: HEAD_Y + 30, stroke: '#ffd166', 'stroke-width': 2.4, 'stroke-linecap': 'round', 'stroke-dasharray': '2 4' }, spray);
      }
    }

    // Cylinder walls
    el('rect', { x: 84, y: HEAD_Y, width: 12, height: 222, fill: 'url(#ecWall)' }, svg);
    el('rect', { x: 224, y: HEAD_Y, width: 12, height: 222, fill: 'url(#ecWall)' }, svg);

    // Valves
    const valve = (x, color) => {
      const g = el('g', {}, svg);
      el('rect', { x: x - 3, y: 26, width: 6, height: 54, fill: '#8b96a6' }, g);
      el('path', { d: `M${x - 18} ${HEAD_Y} L${x - 5} ${HEAD_Y - 9} H${x + 5} L${x + 18} ${HEAD_Y} Z`, fill: color }, g);
      return g;
    };
    const intakeValve = valve(126, '#4aa8ff');
    const exhaustValve = valve(194, '#c0c6cf');

    if (diesel) {
      // Injector: a slim body with a fuel line, ending in a nozzle in the chamber roof.
      el('rect', { x: 151, y: 0, width: 18, height: 12, rx: 3, fill: '#2f3a4a' }, svg);
      el('rect', { x: 155, y: 12, width: 10, height: 58, rx: 3, fill: '#aab4c2' }, svg);
      el('path', { d: `M156 70 H164 L161 ${HEAD_Y} H159 Z`, fill: '#d0d6de' }, svg);
      el('path', { d: 'M169 6 H186', stroke: '#ffb020', 'stroke-width': 3, 'stroke-linecap': 'round' }, svg);
    } else {
      // Spark plug
      el('rect', { x: 152, y: 0, width: 16, height: 26, rx: 3, fill: '#e9edf2' }, svg);
      el('rect', { x: 154, y: 26, width: 12, height: 40, fill: '#9aa4b2' }, svg);
      el('rect', { x: 158, y: 66, width: 4, height: HEAD_Y - 64, fill: '#d0d6de' }, svg);
    }

    // Crankcase and crank
    el('circle', { cx: CX, cy: CY, r: 74, fill: 'rgba(255,255,255,0.02)', stroke: '#2a3342', 'stroke-width': 2, 'stroke-dasharray': '4 6' }, svg);
    const crankGroup = el('g', {}, svg);
    el('path', { d: `M${CX - 62} ${CY} A62 62 0 0 0 ${CX + 62} ${CY} L${CX + 20} ${CY} A20 20 0 0 1 ${CX - 20} ${CY} Z`, fill: '#2b3442' }, crankGroup);
    el('rect', { x: CX - 14, y: CY - CRANK - 14, width: 28, height: CRANK + 14, rx: 12, fill: '#3a4556' }, crankGroup);
    el('circle', { cx: CX, cy: CY, r: 14, fill: '#566275' }, svg);

    // Connecting rod and piston
    const rodLine = el('line', { stroke: '#8d99ab', 'stroke-width': 14, 'stroke-linecap': 'round' }, svg);
    const crankPin = el('circle', { r: 9, fill: '#c9d1dc' }, svg);
    const piston = el('g', {}, svg);
    el('rect', { x: 97, y: 0, width: 126, height: PISTON_H, rx: 5, fill: 'url(#ecMetal)' }, piston);
    for (const y of [9, 17, 25]) el('rect', { x: 97, y, width: 126, height: 3, fill: 'rgba(20,24,32,0.55)' }, piston);
    el('circle', { cx: CX, cy: PISTON_H * 0.62, r: 9, fill: '#3a4556' }, piston);

    // Labels
    const labels = el('g', { class: 'ec-labels' }, svg);
    const mkLabel = (x, y, anchor) => el('text', { x, y, 'text-anchor': anchor }, labels);
    const labelMix = mkLabel(10, 78, 'start');
    const labelExhaust = mkLabel(310, 78, 'end');
    const labelSpark = mkLabel(diesel ? 190 : 176, 14, 'start');
    const labelPiston = mkLabel(244, 0, 'start');
    const labelCrank = mkLabel(244, CY + 4, 'start');

    /* ---- animation */
    let angle = 0; // crank angle in degrees, 0..720
    let speed = 1;
    let playing = true;
    let visible = true;
    let lastStroke = -1;
    let last = performance.now();

    function draw() {
      const a = (angle * Math.PI) / 180;
      const pinX = CX + CRANK * Math.sin(a);
      const pinY = CY - CRANK * Math.cos(a);
      const wristY = pinY - Math.sqrt(ROD * ROD - Math.pow(CRANK * Math.sin(a), 2));
      const top = wristY - PISTON_H * 0.62;

      piston.setAttribute('transform', `translate(0 ${top.toFixed(2)})`);
      rodLine.setAttribute('x1', CX);
      rodLine.setAttribute('y1', wristY.toFixed(2));
      rodLine.setAttribute('x2', pinX.toFixed(2));
      rodLine.setAttribute('y2', pinY.toFixed(2));
      crankPin.setAttribute('cx', pinX.toFixed(2));
      crankPin.setAttribute('cy', pinY.toFixed(2));
      crankGroup.setAttribute('transform', `rotate(${angle % 360} ${CX} ${CY})`);
      labelPiston.setAttribute('y', (top + 34).toFixed(1));

      const stroke = Math.floor(angle / 180) % 4;
      const t = (angle % 180) / 180;

      gas.setAttribute('height', Math.max(0, top - HEAD_Y).toFixed(2));
      gas.setAttribute('fill', rgba(mix(gasColors[stroke][0], gasColors[stroke][1], t)));

      const lift = Math.sin(t * Math.PI) * 14;
      intakeValve.setAttribute('transform', `translate(0 ${stroke === 0 ? lift : 0})`);
      exhaustValve.setAttribute('transform', `translate(0 ${stroke === 3 ? lift : 0})`);
      intakeFlow.setAttribute('opacity', stroke === 0 ? Math.sin(t * Math.PI).toFixed(2) : 0);
      exhaustFlow.setAttribute('opacity', stroke === 3 ? Math.sin(t * Math.PI).toFixed(2) : 0);
      intakePort.setAttribute('fill', stroke === 0 ? (diesel ? 'rgba(200,230,255,0.18)' : 'rgba(80,170,255,0.22)') : 'rgba(80,170,255,0.06)');
      exhaustPort.setAttribute('fill', stroke === 3 ? 'rgba(150,150,165,0.24)' : 'rgba(150,150,165,0.06)');

      if (diesel) {
        // Fuel is sprayed in just before top dead centre and ignites a moment later.
        const sprayAmount = angle > 338 && angle < 372 ? Math.sin(((angle - 338) / 34) * Math.PI) : 0;
        spray.setAttribute('opacity', sprayAmount.toFixed(2));
        const burn = angle > 360 && angle < 400 ? Math.sin(((angle - 360) / 40) * Math.PI) : 0;
        flash.setAttribute('r', (10 + burn * 58).toFixed(1));
        flash.setAttribute('opacity', burn.toFixed(2));
      } else {
        // Spark right around top dead centre between compression and power.
        const fromSpark = Math.abs(angle - 360);
        const s = fromSpark < 22 ? 1 - fromSpark / 22 : 0;
        flash.setAttribute('r', (8 + s * 46).toFixed(1));
        flash.setAttribute('opacity', s.toFixed(2));
      }

      if (stroke !== lastStroke) {
        lastStroke = stroke;
        onStroke(stroke);
      }
    }

    function tick(now) {
      const dt = clampDt((now - last) / 1000);
      last = now;
      if (playing && visible) {
        angle = (angle + dt * 160 * speed) % 720;
        const offset = (now / 40) % 16;
        intakeFlow.setAttribute('stroke-dashoffset', -offset);
        exhaustFlow.setAttribute('stroke-dashoffset', -offset);
        draw();
      }
      requestAnimationFrame(tick);
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
      }).observe(svg);
    }

    draw();
    requestAnimationFrame(tick);

    return {
      setLabels(l) {
        labelMix.textContent = l.mix;
        labelExhaust.textContent = l.exhaust;
        labelSpark.textContent = l.spark;
        labelPiston.textContent = l.piston;
        labelCrank.textContent = l.crank;
      },
      setPlaying(value) {
        playing = value;
      },
      isPlaying: () => playing,
      setSpeed(value) {
        speed = value;
      },
      goToStroke(i) {
        angle = i * 180 + 1;
        draw();
      }
    };
  }

  window.EngineCycle = { create };
})();

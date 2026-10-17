/* Under the Hood — shared 3D engine.
   Each car (js/cars/*.js) builds its model from the helpers in KIT; this file
   lights it, "explodes" it with scroll progress (0 = assembled, 1 = taken
   apart), handles picking, and renders part previews and showcase turntables.
   Exposes window.CarScene = { create, showcase, KIT }. */
(function () {
  'use strict';

  const T = window.THREE;
  if (!T) {
    window.CarScene = null;
    return;
  }

  // Treat hex colours as sRGB, so materials match the colours written in code.
  if (T.ColorManagement) T.ColorManagement.legacyMode = false;

  const V = (x, y, z) => new T.Vector3(x, y, z);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const span = (a, b, t) => easeInOut(clamp((t - a) / (b - a), 0, 1));

  const HIGHLIGHT = new T.Color(0xff7a2f);

  /* ------------------------------------------------------------ geometry */

  // Smooth normals across shallow angles but keep hard creases. Weighting by
  // face area keeps big flat caps flat next to small bevel faces.
  function creaseNormals(geo, angleDeg = 40) {
    if (geo.index) geo = geo.toNonIndexed();
    const pos = geo.attributes.position;
    const count = pos.count;
    const cosLimit = Math.cos((angleDeg * Math.PI) / 180);
    const a = new T.Vector3(), b = new T.Vector3(), c = new T.Vector3();
    const ab = new T.Vector3(), cb = new T.Vector3();
    const faceN = [], faceA = [];
    for (let f = 0; f < count / 3; f++) {
      a.fromBufferAttribute(pos, f * 3);
      b.fromBufferAttribute(pos, f * 3 + 1);
      c.fromBufferAttribute(pos, f * 3 + 2);
      cb.subVectors(c, b);
      ab.subVectors(a, b);
      cb.cross(ab);
      const area = cb.length();
      faceA.push(area);
      faceN.push(area > 1e-12 ? cb.clone().divideScalar(area) : V(0, 1, 0));
    }
    const key = i => `${Math.round(pos.getX(i) * 1e4)},${Math.round(pos.getY(i) * 1e4)},${Math.round(pos.getZ(i) * 1e4)}`;
    const shared = new Map();
    for (let i = 0; i < count; i++) {
      const k = key(i);
      if (!shared.has(k)) shared.set(k, []);
      shared.get(k).push((i / 3) | 0);
    }
    const normals = new Float32Array(count * 3);
    const acc = new T.Vector3();
    for (let i = 0; i < count; i++) {
      const own = faceN[(i / 3) | 0];
      acc.set(0, 0, 0);
      for (const f of shared.get(key(i))) {
        if (faceN[f].dot(own) >= cosLimit) acc.addScaledVector(faceN[f], faceA[f]);
      }
      if (acc.lengthSq() === 0) acc.copy(own);
      acc.normalize();
      normals[i * 3] = acc.x;
      normals[i * 3 + 1] = acc.y;
      normals[i * 3 + 2] = acc.z;
    }
    geo.setAttribute('normal', new T.BufferAttribute(normals, 3));
    return geo;
  }

  function roundedRect(w, h, r) {
    r = Math.max(0.0005, Math.min(r, w / 2, h / 2));
    const x = -w / 2, y = -h / 2;
    const s = new T.Shape();
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y);
    s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h);
    s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r);
    s.quadraticCurveTo(x, y, x + r, y);
    return s;
  }

  // Rounded box: w along X, h along Y, d along Z, centred on the origin.
  function rboxGeo(w, h, d, r = 0.03) {
    const b = Math.max(0.002, Math.min(r, w / 3, h / 3, d / 3));
    const shape = roundedRect(w - 2 * b, h - 2 * b, Math.max(0.001, r - b));
    const depth = Math.max(0.001, d - 2 * b);
    const geo = new T.ExtrudeGeometry(shape, {
      depth, bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelSegments: 3, curveSegments: 5
    });
    geo.translate(0, 0, -depth / 2);
    return creaseNormals(geo);
  }

  // Extrude a side-profile shape (drawn in the XY plane) across the car's width.
  function extrudeGeo(shape, depth, bevel = 0.015) {
    const geo = new T.ExtrudeGeometry(shape, {
      depth, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3, curveSegments: 28
    });
    geo.translate(0, 0, -depth / 2);
    return creaseNormals(geo);
  }

  function mesh(geo, mat, x = 0, y = 0, z = 0) {
    const m = new T.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    return m;
  }

  const rbox = (w, h, d, r, mat, x, y, z) => mesh(rboxGeo(w, h, d, r), mat, x, y, z);
  const box = (w, h, d, mat, x, y, z) => mesh(new T.BoxGeometry(w, h, d), mat, x, y, z);

  // Cylinder whose axis runs along X (radiusTop sits on the +X end).
  function cylX(rTop, rBottom, len, mat, x, y, z, seg = 28) {
    const g = new T.CylinderGeometry(rTop, rBottom, len, seg);
    g.rotateZ(-Math.PI / 2);
    return mesh(g, mat, x, y, z);
  }

  // Cylinder whose axis runs along Z.
  function cylZ(r, len, mat, x, y, z, seg = 28, open = false) {
    const g = new T.CylinderGeometry(r, r, len, seg, 1, open);
    g.rotateX(Math.PI / 2);
    return mesh(g, mat, x, y, z);
  }

  // Cylinder between two points.
  function rod(a, b, r, mat, seg = 12) {
    const dir = new T.Vector3().subVectors(b, a);
    const len = dir.length();
    const m = mesh(new T.CylinderGeometry(r, r, len, seg), mat);
    m.position.copy(a).addScaledVector(dir, 0.5);
    m.quaternion.setFromUnitVectors(V(0, 1, 0), dir.normalize());
    return m;
  }

  function tube(points, r, mat, segments = 48, closed = false) {
    const curve = new T.CatmullRomCurve3(points.map(p => V(p[0], p[1], p[2])), closed);
    return mesh(new T.TubeGeometry(curve, segments, r, 10, closed), mat);
  }

  // Wrap an object in a group whose origin is a hinge, so it rotates around it.
  function pivot(obj, x, y, z) {
    const g = new T.Group();
    g.position.set(x, y, z);
    obj.position.x -= x;
    obj.position.y -= y;
    obj.position.z -= z;
    g.add(obj);
    return g;
  }

  // A rounded beam between two points.
  function beam(a, b, w, h, mat) {
    const dir = new T.Vector3().subVectors(b, a);
    const len = dir.length();
    const m = mesh(rboxGeo(len, h, w, Math.min(w, h) * 0.3), mat);
    m.position.copy(a).addScaledVector(dir, 0.5);
    m.quaternion.setFromUnitVectors(V(1, 0, 0), dir.normalize());
    return m;
  }

  // Flat spur gear: radius r, teeth around the edge, axis along X or Z.
  function gearGeo(r, teeth, depth, axis = 'z') {
    const shape = new T.Shape();
    const steps = teeth * 4;
    const toothH = Math.max(0.006, r * 0.18);
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      const k = i % 4;
      const rr = k === 1 || k === 2 ? r : r - toothH;
      if (i === 0) shape.moveTo(Math.cos(a) * rr, Math.sin(a) * rr);
      else shape.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
    }
    const geo = new T.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 1 });
    geo.translate(0, 0, -depth / 2);
    if (axis === 'x') geo.rotateY(Math.PI / 2);
    return geo;
  }

  /* ----------------------------------------------------------- materials */

  function finTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    g.fillStyle = '#262c35';
    g.fillRect(0, 0, 64, 64);
    g.fillStyle = '#7d8a99';
    for (let i = 0; i < 64; i += 4) g.fillRect(i, 0, 2, 64);
    g.fillStyle = 'rgba(0,0,0,0.45)';
    for (let j = 0; j < 64; j += 16) g.fillRect(0, j, 64, 3);
    const tex = new T.CanvasTexture(c);
    tex.wrapS = tex.wrapT = T.RepeatWrapping;
    tex.repeat.set(14, 2);
    tex.encoding = T.sRGBEncoding;
    return tex;
  }

  function radialTexture(stops) {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    stops.forEach(([o, col]) => grad.addColorStop(o, col));
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    const tex = new T.CanvasTexture(c);
    tex.encoding = T.sRGBEncoding;
    return tex;
  }

  const std = (color, roughness, metalness, extra) =>
    new T.MeshStandardMaterial(Object.assign({ color, roughness, metalness }, extra));

  // Shared material set; each car sets its paint, glass and engine colour and may add its own.
  function makeMaterials(car) {
    const look = car.look || {};
    const paint = Object.assign({ color: 0x2c8c9c, roughness: 0.3, metalness: 0.3 }, look.paint);
    const glass = Object.assign({ color: 0xa8d4ff, opacity: 0.24 }, look.glass);
    const M = {
      paint: new T.MeshPhysicalMaterial(Object.assign({ clearcoat: 1, clearcoatRoughness: 0.05 }, paint)),
      glass: new T.MeshPhysicalMaterial({ color: glass.color, roughness: 0.03, metalness: 0.2, transparent: true, opacity: glass.opacity, depthWrite: false }),
      chrome: std(0xf4f6f9, 0.1, 1.0, { envMapIntensity: 1.6 }),
      trim: std(0x16191f, 0.55, 0.3),
      rubber: std(0x111214, 0.86, 0.04),
      whitewall: std(0xf1eee6, 0.65, 0.0),
      steel: std(0xa3acb7, 0.32, 0.85),
      darkSteel: std(0x41474f, 0.5, 0.7),
      castIron: std(0x3b3d42, 0.7, 0.55),
      engine: std(look.engine !== undefined ? look.engine : 0xd9541e, 0.42, 0.25),
      spring: std(0xe8e2d0, 0.4, 0.5),
      vinyl: std(0x1b1d22, 0.45, 0.05),
      exhaust: std(0x9a8679, 0.4, 0.8),
      tank: std(0x3a4048, 0.55, 0.5),
      battery: std(0x1c1e22, 0.6, 0.1),
      plugRed: std(0xb3202e, 0.5, 0.2),
      floor: std(0x2a2f37, 0.7, 0.2),
      plate: std(0xdfe4ea, 0.5, 0.1),
      amber: std(0xffb347, 0.3, 0.1, { emissive: 0xff8c1a, emissiveIntensity: 0.8 }),
      headlight: std(0xffffff, 0.12, 0.2, { emissive: 0xfff2d6, emissiveIntensity: 1.3 }),
      taillight: std(0xff3030, 0.3, 0.2, { emissive: 0xff1a1a, emissiveIntensity: 1.1 }),
      radiator: std(0xffffff, 0.5, 0.6, { map: finTexture() })
    };
    if (car.materials) Object.assign(M, car.materials(std, T));
    return M;
  }

  // A tiny procedural "studio" used as reflection environment for the paint.
  // `chrome` adds a tall bright band so polished metal reads as chrome from any angle.
  function buildEnvironment(renderer, chrome = false) {
    const env = new T.Scene();
    const sky = new T.SphereGeometry(20, 32, 16);
    const colors = [];
    const col = new T.Color();
    const top = new T.Color(0.24, 0.27, 0.33), mid = new T.Color(0.07, 0.075, 0.09), bottom = new T.Color(0.015, 0.015, 0.02);
    const p = sky.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const y = p.getY(i) / 20;
      if (y > 0) col.copy(mid).lerp(top, y);
      else col.copy(mid).lerp(bottom, -y);
      colors.push(col.r, col.g, col.b);
    }
    sky.setAttribute('color', new T.Float32BufferAttribute(colors, 3));
    env.add(new T.Mesh(sky, new T.MeshBasicMaterial({ side: T.BackSide, vertexColors: true })));

    const panel = (w, h, color, intensity, pos, look) => {
      const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: new T.Color(color).multiplyScalar(intensity), side: T.DoubleSide }));
      m.position.set(...pos);
      m.lookAt(...look);
      env.add(m);
    };
    panel(8, 3, 0xffffff, 2.2, [0, 14, 0], [0, 0, 0]);
    panel(10, 1.5, 0xffc89a, 2.2, [12, 4, 8], [0, 1, 0]);
    panel(6, 1, 0x9ccfff, 0.9, [-12, 9, -6], [0, 1, 0]);
    panel(6, 1.4, 0xffffff, 1.2, [2, 6, -14], [0, 1, 0]);

    // A soft bright band around the horizon gives chrome its typical streak.
    const band = new T.Mesh(
      new T.CylinderGeometry(18, 18, chrome ? 16 : 2.2, 64, 1, true),
      new T.MeshBasicMaterial({ color: new T.Color(0xdfe8f5).multiplyScalar(chrome ? 0.7 : 0.9), side: T.BackSide })
    );
    band.position.y = chrome ? 0 : 1.2;
    env.add(band);

    const pmrem = new T.PMREMGenerator(renderer);
    const tex = pmrem.fromScene(env, 0.035).texture;
    pmrem.dispose();
    return tex;
  }

  /* ----------------------------------------------------------- the kit */

  // Everything a car file needs to build its model.
  const KIT = {
    T, V, lerp, clamp, PI: Math.PI,
    mesh, rbox, rboxGeo, box, cylX, cylZ, rod, tube, pivot, beam, gearGeo, extrudeGeo, roundedRect
  };

  // Build a car into `root`: materials, parts (each with its own material copies) and pieces.
  function assemble(car, renderer, root) {
    const M = makeMaterials(car);
    M.chrome.envMap = buildEnvironment(renderer, true);
    // Lathe-built wheel covers are drawn double-sided so they light correctly from both faces.
    M.coverChrome = M.chrome.clone();
    M.coverChrome.side = T.DoubleSide;
    const parts = {};
    const pieces = [];
    const pickables = [];
    const refs = {};

    function add(id, obj, off, opts = {}) {
      if (!parts[id]) {
        const group = new T.Group();
        group.userData.partId = id;
        root.add(group);
        parts[id] = { group, mats: [], dimmed: false };
      }
      parts[id].group.add(obj);
      pieces.push({
        obj, id,
        basePos: obj.position.clone(),
        baseRot: obj.rotation.clone(),
        off: V(off[0], off[1], off[2]),
        rot: opts.rot ? V(opts.rot[0], opts.rot[1], opts.rot[2]) : null,
        stage: (car.stages && car.stages[id]) || [0, 1],
        preview: opts.preview !== false,
        phase: Math.random() * Math.PI * 2,
        k: 0
      });
    }

    car.build(KIT, M, add, refs);

    // Give every part its own copies of the materials, so it can be
    // highlighted or dimmed independently.
    for (const id in parts) {
      const map = new Map();
      parts[id].group.traverse(o => {
        if (!o.isMesh) return;
        if (!map.has(o.material)) {
          const m = o.material.clone();
          map.set(o.material, m);
          parts[id].mats.push({
            m,
            opacity: m.opacity,
            transparent: m.transparent,
            depthWrite: m.depthWrite,
            emissive: m.emissive ? m.emissive.clone() : null
          });
        }
        o.material = map.get(o.material);
        o.userData.partId = id;
        pickables.push(o);
      });
    }
    return { M, parts, pieces, pickables, refs };
  }

  /* ------------------------------------------------------------- scene */

  function create(canvas, car, options = {}) {
    const onHover = options.onHover || (() => {});
    const onPick = options.onPick || (() => {});

    let renderer;
    try {
      renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (err) {
      return null;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = T.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);

    const scene = new T.Scene();
    scene.environment = buildEnvironment(renderer);

    const camera = new T.PerspectiveCamera(32, 1, 0.1, 100);

    // Lights
    scene.add(new T.HemisphereLight(0xcfe3ff, 0x15161b, 0.35));
    const key = new T.DirectionalLight(0xfff1e0, 1.7);
    key.position.set(4, 9, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -8;
    key.shadow.camera.right = 8;
    key.shadow.camera.top = 8;
    key.shadow.camera.bottom = -8;
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 30;
    key.shadow.bias = -0.0004;
    key.shadow.normalBias = 0.02;
    scene.add(key);
    const rim = new T.DirectionalLight(0x7fc4ff, 1.2);
    rim.position.set(-6, 4, -5);
    scene.add(rim);
    const warm = new T.PointLight(0xff8a3d, 0.9, 14, 2);
    warm.position.set(3, 1.2, 3.5);
    scene.add(warm);

    // Floor: shadow catcher, soft glow and a slowly turning ring of ticks.
    const floor = new T.Mesh(new T.PlaneGeometry(40, 40), new T.ShadowMaterial({ opacity: 0.38 }));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const glow = new T.Mesh(
      new T.CircleGeometry(4.8, 64),
      new T.MeshBasicMaterial({
        map: radialTexture([[0, 'rgba(255,122,47,0.32)'], [0.45, 'rgba(255,122,47,0.10)'], [1, 'rgba(255,122,47,0)']]),
        transparent: true, depthWrite: false, blending: T.AdditiveBlending
      })
    );
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = 0.002;
    scene.add(glow);

    const ring = new T.Group();
    const tickMat = new T.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18 });
    const tickGeo = new T.PlaneGeometry(0.02, 0.16);
    for (let i = 0; i < 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      const t = new T.Mesh(tickGeo, i % 8 === 0 ? new T.MeshBasicMaterial({ color: 0xff7a2f, transparent: true, opacity: 0.7 }) : tickMat);
      t.rotation.x = -Math.PI / 2;
      t.rotation.z = -a;
      t.position.set(Math.sin(a) * 4.2, 0.003, Math.cos(a) * 4.2);
      ring.add(t);
    }
    const circle = new T.Mesh(new T.RingGeometry(4.45, 4.465, 128), new T.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12 }));
    circle.rotation.x = -Math.PI / 2;
    circle.position.y = 0.003;
    ring.add(circle);
    scene.add(ring);

    // The car
    const carRoot = new T.Group();
    scene.add(carRoot);

    const { parts, pieces, pickables, refs } = assemble(car, renderer, carRoot);
    const view = Object.assign({ radius: [9.6, 16.8], targetY: [0.55, 2.05], lift: 1.55 }, car.view);

    // Exhaust smoke puffs while the car is assembled and "idling".
    const smokeTex = radialTexture([[0, 'rgba(255,255,255,0.9)'], [0.5, 'rgba(255,255,255,0.35)'], [1, 'rgba(255,255,255,0)']]);
    const smoke = [];
    for (let i = 0; i < 22; i++) {
      const s = new T.Sprite(new T.SpriteMaterial({ map: smokeTex, color: 0xc9d1dc, transparent: true, opacity: 0, depthWrite: false }));
      s.visible = false;
      s.userData = { life: 1, vel: V(0, 0, 0) };
      carRoot.add(s);
      smoke.push(s);
    }
    const exhaustPiece = pieces.find(p => p.id === 'exhaust' && p.obj.children.length > 3);

    /* ---- state */
    let width = 1, height = 1;
    let targetProgress = 0, progress = 0;
    let hovered = null, selected = null;
    let shiftX = 0, shiftY = 0, shiftXTarget = 0, shiftYTarget = 0;
    let userAz = 0, azVel = 0;
    let active = true;
    let smokeTimer = 0, smokeIndex = 0;
    const target = V(0, 0.6, 0);
    const clock = new T.Clock();

    function resize() {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      if (w === width && h === height) return;
      width = w;
      height = h;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    /* ---- pointer: drag to rotate, hover and click to pick */
    const raycaster = new T.Raycaster();
    const ndc = new T.Vector2();
    let down = null;

    function pick(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      // Account for the view offset used to shift the car sideways.
      ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.intersectObjects(pickables, false)[0];
      return hit ? hit.object.userData.partId : null;
    }

    canvas.addEventListener('pointerdown', e => {
      down = { x: e.clientX, y: e.clientY, lastX: e.clientX, moved: 0, id: e.pointerId };
    });
    window.addEventListener('pointermove', e => {
      if (down && e.pointerId === down.id) {
        const dx = e.clientX - down.lastX;
        down.lastX = e.clientX;
        down.moved += Math.abs(dx) + Math.abs(e.clientY - down.y) * 0.1;
        if (down.moved > 4) {
          userAz += dx * 0.006;
          azVel = dx * 0.006;
          canvas.classList.add('dragging');
        }
        return;
      }
      if (e.target !== canvas || e.pointerType === 'touch') return;
      const id = pick(e.clientX, e.clientY);
      if (id !== hovered) {
        hovered = id;
        canvas.style.cursor = id ? 'pointer' : '';
      }
      onHover(id, e.clientX, e.clientY);
    });
    window.addEventListener('pointerup', e => {
      if (!down || e.pointerId !== down.id) return;
      const wasClick = down.moved <= 4 && e.target === canvas;
      down = null;
      canvas.classList.remove('dragging');
      if (wasClick) onPick(pick(e.clientX, e.clientY));
    });
    window.addEventListener('pointercancel', () => {
      down = null;
      canvas.classList.remove('dragging');
    });
    canvas.addEventListener('pointerleave', () => {
      if (hovered) {
        hovered = null;
        canvas.style.cursor = '';
      }
      onHover(null);
    });

    /* ---- highlight / dim */
    function updateMaterials(time) {
      const pulse = 0.5 + 0.5 * Math.sin(time * 4);
      for (const id in parts) {
        const p = parts[id];
        const shouldDim = selected !== null && selected !== id && hovered !== id;
        if (shouldDim !== p.dimmed) {
          p.dimmed = shouldDim;
          for (const e of p.mats) {
            e.m.transparent = shouldDim ? true : e.transparent;
            e.m.opacity = shouldDim ? e.opacity * 0.14 : e.opacity;
            e.m.depthWrite = shouldDim ? false : e.depthWrite;
            e.m.needsUpdate = true;
          }
        }
        let glowAmount = 0;
        if (id === selected) glowAmount = 0.06 + 0.1 * pulse;
        else if (id === hovered) glowAmount = 0.14;
        for (const e of p.mats) {
          if (!e.emissive) continue;
          e.m.emissive.copy(e.emissive);
          if (glowAmount > 0) {
            e.m.emissive.r += HIGHLIGHT.r * glowAmount;
            e.m.emissive.g += HIGHLIGHT.g * glowAmount;
            e.m.emissive.b += HIGHLIGHT.b * glowAmount;
          }
        }
      }
    }

    /* ---- per-frame update */
    function frame() {
      requestAnimationFrame(frame);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!active) return;
      const time = clock.elapsedTime;
      resize();

      progress += (targetProgress - progress) * Math.min(1, dt * 5);
      const e = span(0.02, 0.95, progress);
      const eCam = span(0.02, 0.5, progress); // camera pulls back early, while the body flies off

      // Explode
      for (const pc of pieces) {
        const k = span(pc.stage[0], pc.stage[1], progress);
        pc.k = k;
        pc.obj.position.copy(pc.basePos).addScaledVector(pc.off, k);
        pc.obj.position.y += Math.sin(time * 0.9 + pc.phase) * 0.03 * k;
        if (pc.rot) {
          pc.obj.rotation.set(pc.baseRot.x + pc.rot.x * k, pc.baseRot.y + pc.rot.y * k, pc.baseRot.z + pc.rot.z * k);
        }
      }
      carRoot.position.y = view.lift * e;
      // A barely-visible idle shake while the car is assembled.
      carRoot.rotation.x = Math.sin(time * 38) * 0.0012 * (1 - e);

      // Moving parts
      if (refs.fan) refs.fan.rotation.x += dt * 14;
      const spinRate = 0.6 + 2.4 * e;
      if (refs.driveshaft) refs.driveshaft.rotation.x += dt * spinRate * 2;
      for (const w of refs.wheels || []) w.rotation.z -= dt * spinRate * 0.5 * e;
      ring.rotation.y += dt * 0.05;

      // Smoke
      smokeTimer += dt;
      if (e < 0.08 && smokeTimer > (car.smokeEvery || 0.09) && exhaustPiece && refs.tailpipes) {
        smokeTimer = 0;
        const pipe = refs.tailpipes[smokeIndex % refs.tailpipes.length];
        const s = smoke[smokeIndex++ % smoke.length];
        s.position.copy(pipe).add(exhaustPiece.obj.position);
        s.userData.life = 0;
        s.userData.vel.set(-0.5 - Math.random() * 0.25, 0.12 + Math.random() * 0.1, (Math.random() - 0.5) * 0.15);
        s.visible = true;
      }
      for (const s of smoke) {
        if (!s.visible) continue;
        const d = s.userData;
        d.life += dt / 2.2;
        if (d.life >= 1) {
          s.visible = false;
          continue;
        }
        s.position.addScaledVector(d.vel, dt);
        const sc = 0.07 + d.life * 0.45;
        s.scale.set(sc, sc, sc);
        s.material.opacity = 0.32 * Math.sin(d.life * Math.PI) * Math.max(0, 1 - e * 10);
      }

      updateMaterials(time);

      // Camera
      if (!down) {
        userAz += azVel;
        azVel *= 0.92;
      }
      const aspect = width / height;
      // On portrait screens look more from the front and from above: the long car then
      // projects narrower and taller, so it can be shown bigger.
      const portrait = clamp((1.1 - aspect) / 0.5, 0, 1);
      const fit = aspect < 1.3 ? (1.3 / aspect) * lerp(0.82, 0.7, portrait) : 1;
      const r = lerp(view.radius[0], view.radius[1], eCam) * Math.max(1, fit);
      const elev = lerp(0.3, 0.5, e) + 0.12 * portrait;
      const az = lerp(0.62, 0.86, e) - 0.3 * portrait + Math.sin(time * 0.15) * 0.1 + userAz;
      target.set(0, lerp(view.targetY[0], view.targetY[1], eCam), 0);
      camera.position.set(
        target.x + r * Math.cos(elev) * Math.cos(az),
        target.y + r * Math.sin(elev),
        target.z + r * Math.cos(elev) * Math.sin(az)
      );
      camera.lookAt(target);

      // Shift the rendered image so the car sits beside the text overlays.
      shiftX += (shiftXTarget - shiftX) * Math.min(1, dt * 4);
      shiftY += (shiftYTarget - shiftY) * Math.min(1, dt * 4);
      camera.setViewOffset(width, height, -shiftX * width, shiftY * height, width, height);

      renderer.render(scene, camera);
    }


    /* ---- part preview: a second, small renderer that shows one part on its own */
    function createPreview(previewCanvas) {
      let pr;
      try {
        pr = new T.WebGLRenderer({ canvas: previewCanvas, antialias: true, alpha: true });
      } catch (err) {
        return null;
      }
      pr.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      pr.outputEncoding = T.sRGBEncoding;
      pr.toneMapping = T.ACESFilmicToneMapping;
      pr.setClearColor(0x000000, 0);

      // Environment maps belong to one WebGL context, so the preview builds its own.
      const ps = new T.Scene();
      ps.environment = buildEnvironment(pr);
      const chromeEnv = buildEnvironment(pr, true);
      ps.add(new T.HemisphereLight(0xcfe3ff, 0x15161b, 0.5));
      const pKey = new T.DirectionalLight(0xfff1e0, 1.6);
      pKey.position.set(3, 5, 4);
      ps.add(pKey);
      const pRim = new T.DirectionalLight(0x7fc4ff, 1.1);
      pRim.position.set(-4, 2, -3);
      ps.add(pRim);

      const pGlow = new T.Mesh(
        new T.CircleGeometry(1, 48),
        new T.MeshBasicMaterial({
          map: radialTexture([[0, 'rgba(255,122,47,0.35)'], [0.5, 'rgba(255,122,47,0.1)'], [1, 'rgba(255,122,47,0)']]),
          transparent: true, depthWrite: false, blending: T.AdditiveBlending
        })
      );
      pGlow.rotation.x = -Math.PI / 2;
      ps.add(pGlow);

      const pCam = new T.PerspectiveCamera(30, 1, 0.05, 100);
      const holder = new T.Group();
      ps.add(holder);
      const pClock = new T.Clock();
      const emptyAnimated = () => ({ spin: [], swing: [], bounce: [], open: [], piston: [], spark: [], flash: [], cell: [], flow: [], diff: [], slide: [], shake: false });
      let animated = emptyAnimated();
      let flowGeos = [];
      let clonedMats = [];
      let radius = 1;
      const pSize = new T.Vector3(1, 1, 1);
      let visible = false;
      let pAz = 0.8, pVel = 0, pDown = null, pElev = 0.42;
      let pw = 0, ph = 0;

      function clear() {
        while (holder.children.length) holder.remove(holder.children[0]);
        clonedMats.forEach(m => m.dispose());
        clonedMats = [];
        flowGeos.forEach(g => g.dispose());
        flowGeos = [];
        animated = emptyAnimated();
      }

      // Copy a material with the part's original look, not its current dimmed/highlighted state.
      function cleanMaterial(part, material) {
        const entry = part.mats.find(e => e.m === material);
        const m = material.clone();
        if (entry) {
          m.opacity = entry.opacity;
          m.transparent = entry.transparent;
          m.depthWrite = entry.depthWrite;
          if (entry.emissive) m.emissive.copy(entry.emissive);
        }
        if (m.envMap) m.envMap = chromeEnv;
        clonedMats.push(m);
        return m;
      }

      // Glowing dots that travel along a path (gas, fuel, air, electricity).
      function addFlow(parent, f) {
        const curve = new T.CatmullRomCurve3(f.points.map(p => V(p[0], p[1], p[2])));
        const geo = new T.SphereGeometry(f.size, 10, 8);
        flowGeos.push(geo);
        for (let i = 0; i < f.count; i++) {
          const m = new T.MeshBasicMaterial({ color: f.color, transparent: true, opacity: 0.9, blending: T.AdditiveBlending, depthWrite: false });
          clonedMats.push(m);
          const dot = new T.Mesh(geo, m);
          const offset = i / f.count;
          dot.position.copy(curve.getPointAt(offset));
          parent.add(dot);
          animated.flow.push({ dot, curve, offset, speed: f.speed, c1: new T.Color(f.color), c2: f.color2 !== undefined ? new T.Color(f.color2) : null });
        }
      }

      function show(id) {
        clear();
        pElev = 0.42;
        const part = parts[id];
        if (!part) return;
        const root = new T.Group();
        const matMap = new Map();
        for (const pc of pieces) {
          if (pc.id !== id || !pc.preview) continue;
          const c = pc.obj.clone(true);
          c.position.copy(pc.basePos);
          c.rotation.copy(pc.baseRot);
          c.traverse(o => {
            const ud = o.userData;
            if (o.isMesh) {
              // Animated meshes (x-ray, sparks, flashes, cells) need a material of their own.
              const own = ud.xray || ud.spark !== undefined || ud.cell !== undefined || ud.flash !== undefined;
              if (own) {
                o.material = cleanMaterial(part, o.material);
                if (ud.xray) {
                  o.material.transparent = true;
                  o.material.opacity = 0.22;
                  o.material.depthWrite = false;
                }
              } else {
                if (!matMap.has(o.material)) matMap.set(o.material, cleanMaterial(part, o.material));
                o.material = matMap.get(o.material);
              }
            }
            if (ud.piston) animated.piston.push(o);
            if (ud.spark !== undefined) animated.spark.push(o);
            if (ud.flash !== undefined) {
              o.visible = true;
              animated.flash.push(o);
            }
            if (ud.cell !== undefined) animated.cell.push(o);
            if (ud.diff) animated.diff.push(o);
            if (ud.slide) animated.slide.push({ o, base: o.position[ud.slide.axis] });
            if (ud.spin) animated.spin.push(o);
            if (ud.swing) animated.swing.push({ o, base: o.rotation[ud.swing.axis] });
            if (ud.bounce !== undefined) animated.bounce.push(o);
          });
          if (pc.rot) animated.open.push({ o: c, base: pc.baseRot.clone(), rot: pc.rot });
          if (c.userData.shake) animated.shake = true;
          if (c.userData.previewElev !== undefined) pElev = c.userData.previewElev;
          for (const f of c.userData.flows || []) addFlow(c, f);
          root.add(c);
        }
        const bounds = new T.Box3().setFromObject(root);
        const center = bounds.getCenter(new T.Vector3());
        const size = bounds.getSize(new T.Vector3());
        root.position.sub(center);
        holder.add(root);
        radius = Math.max(0.25, size.length() / 2);
        pSize.copy(size);
        pGlow.scale.setScalar(radius * 1.15);
        pGlow.position.y = -size.y / 2 - 0.01;
        pAz = 0.8;
        pVel = 0;
        visible = true;
        pClock.getDelta();
      }

      function hide() {
        visible = false;
      }

      previewCanvas.addEventListener('pointerdown', e => {
        pDown = { x: e.clientX, id: e.pointerId };
        previewCanvas.setPointerCapture(e.pointerId);
      });
      previewCanvas.addEventListener('pointermove', e => {
        if (!pDown || e.pointerId !== pDown.id) return;
        const dx = e.clientX - pDown.x;
        pDown.x = e.clientX;
        pAz += dx * 0.01;
        pVel = dx * 0.01;
      });
      const release = () => { pDown = null; };
      previewCanvas.addEventListener('pointerup', release);
      previewCanvas.addEventListener('pointercancel', release);

      function loop() {
        requestAnimationFrame(loop);
        const dt = Math.min(pClock.getDelta(), 0.05);
        if (!visible) return;
        const time = pClock.elapsedTime;

        const w = previewCanvas.clientWidth, h = previewCanvas.clientHeight;
        if (!w || !h) return;
        if (w !== pw || h !== ph) {
          pw = w;
          ph = h;
          pr.setSize(w, h, false);
          pCam.aspect = w / h;
          pCam.updateProjectionMatrix();
        }

        if (!pDown) {
          pVel *= 0.93;
          pAz += dt * 0.35 + pVel;
        }

        // Show each part doing its job.
        for (const o of animated.spin) o.rotation[o.userData.spin.axis] += dt * o.userData.spin.speed;
        for (const s of animated.swing) {
          const sw = s.o.userData.swing;
          s.o.rotation[sw.axis] = s.base + (sw.offset || 0) + Math.sin(time * sw.speed) * sw.amp;
        }
        const squash = 1 - 0.14 * (0.5 + 0.5 * Math.sin(time * 3));
        for (const o of animated.bounce) {
          o.scale.y = squash;
          o.position.y = o.userData.bounce * (1 - squash);
        }
        // Engine: pistons pump, plugs flash at top dead centre, the block shakes a little.
        const crank = time * 7;
        for (const o of animated.piston) o.position.y = o.userData.piston.y + o.userData.piston.amp * Math.sin(crank + o.userData.piston.phase);
        for (const o of animated.spark) {
          const e = Math.pow(Math.max(0, Math.sin(crank + o.userData.spark)), 14);
          o.material.emissive.setRGB(e * 2.6, e * 1.7, e * 0.6);
        }
        for (const o of animated.flash) {
          const e = Math.pow(Math.max(0, Math.sin(crank + o.userData.flash)), 10);
          o.material.opacity = e;
          o.scale.setScalar(0.6 + 0.6 * e);
        }
        holder.position.y = animated.shake ? Math.sin(time * 47) * 0.003 : 0;
        // Battery: cells light up one after another, like a charge meter.
        for (const o of animated.cell) {
          const k = (((time * 2.5 - o.userData.cell) % 6) + 6) % 6;
          o.material.emissiveIntensity = 0.25 + 2.2 * Math.max(0, 1 - k);
        }
        // Flows: dots travel along pipes and cables, fading in and out at the ends.
        for (const f of animated.flow) {
          const u = (f.offset + time * f.speed) % 1;
          f.dot.position.copy(f.curve.getPointAt(u));
          f.dot.material.opacity = 0.95 * Math.sin(u * Math.PI);
          if (f.c2) f.dot.material.color.copy(f.c1).lerp(f.c2, u);
        }

        for (const s of animated.slide) {
          const sl = s.o.userData.slide;
          s.o.position[sl.axis] = s.base + Math.sin(time * sl.speed) * sl.amp;
        }

        // Differential: the car keeps cornering left and right. The ring gear and carrier turn
        // at a steady speed; the outer axle speeds up, the inner slows down, the spiders spin.
        const turn = 0.45 * Math.sin(time * 0.7);
        for (const o of animated.diff) {
          const d = o.userData.diff;
          if (d.role === 'carrier') o.rotation.z += dt * 3;
          else if (d.role === 'pinion') o.rotation.x += dt * 3 * 3.1;
          else if (d.role === 'axle') o.rotation.z += dt * 3 * (1 + d.side * turn);
          else if (d.role === 'spider') o.rotation.x += dt * 3 * turn * 3 * d.side;
        }

        const opening = 0.5 - 0.5 * Math.cos(time * 1.2);
        for (const a of animated.open) {
          a.o.rotation.set(a.base.x + a.rot.x * opening, a.base.y + a.rot.y * opening, a.base.z + a.rot.z * opening);
        }

        // Fit the part's footprint (whatever way it has turned) and height into the frame,
        // so long, flat parts like the exhaust fill the width instead of floating small.
        const vFov = (pCam.fov * Math.PI) / 180;
        const hFov = 2 * Math.atan(Math.tan(vFov / 2) * pCam.aspect);
        const diag = Math.hypot(pSize.x, pSize.z);
        // Parts pointing at the camera look taller up close, hence the extra vertical room.
        const tall = (pSize.y * Math.cos(pElev) + diag * Math.sin(pElev)) * 1.2;
        const dist = Math.max((diag / 2) / Math.tan(hFov / 2), (tall / 2) / Math.tan(vFov / 2)) * 0.95 + diag * 0.2;
        pCam.position.set(dist * Math.cos(pElev) * Math.cos(pAz), dist * Math.sin(pElev), dist * Math.cos(pElev) * Math.sin(pAz));
        pCam.lookAt(0, 0, 0);
        pr.render(ps, pCam);
      }
      requestAnimationFrame(loop);

      return { show, hide };
    }

    resize();
    requestAnimationFrame(frame);

    return {
      createPreview,
      setProgress(p) {
        targetProgress = clamp(p, 0, 1);
      },
      select(id) {
        selected = id || null;
      },
      setLayout(x, y) {
        shiftXTarget = x;
        shiftYTarget = y;
      },
      setActive(value) {
        active = value;
        if (value) clock.getDelta();
      }
    };
  }

  /* ---------------------------------------------------------- showcase */

  // A small turntable of the assembled car, used on the start page.
  function showcase(canvas, car) {
    let r;
    try {
      r = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch (err) {
      return null;
    }
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    r.outputEncoding = T.sRGBEncoding;
    r.toneMapping = T.ACESFilmicToneMapping;
    r.toneMappingExposure = 0.95;
    r.shadowMap.enabled = true;
    r.shadowMap.type = T.PCFSoftShadowMap;
    r.setClearColor(0x000000, 0);

    const sc = new T.Scene();
    sc.environment = buildEnvironment(r);
    sc.add(new T.HemisphereLight(0xcfe3ff, 0x15161b, 0.35));
    const key = new T.DirectionalLight(0xfff1e0, 1.7);
    key.position.set(4, 9, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    Object.assign(key.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 25 });
    key.shadow.normalBias = 0.02;
    sc.add(key);
    const rimLight = new T.DirectionalLight(0x7fc4ff, 1.2);
    rimLight.position.set(-6, 4, -5);
    sc.add(rimLight);

    const floor = new T.Mesh(new T.PlaneGeometry(20, 20), new T.ShadowMaterial({ opacity: 0.4 }));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    sc.add(floor);
    const glow = new T.Mesh(
      new T.CircleGeometry(3.6, 64),
      new T.MeshBasicMaterial({
        map: radialTexture([[0, 'rgba(255,122,47,0.3)'], [0.5, 'rgba(255,122,47,0.08)'], [1, 'rgba(255,122,47,0)']]),
        transparent: true, depthWrite: false, blending: T.AdditiveBlending
      })
    );
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = 0.002;
    sc.add(glow);

    const root = new T.Group();
    sc.add(root);
    const { refs } = assemble(car, r, root);
    const bounds = new T.Box3().setFromObject(root);
    const size = bounds.getSize(new T.Vector3());
    const camera = new T.PerspectiveCamera(28, 1, 0.1, 100);
    const clock = new T.Clock();
    let az = 0.7, vel = 0, down = null, visible = true, hover = 0, w = 0, h = 0;

    canvas.addEventListener('pointerdown', e => { down = { x: e.clientX }; });
    window.addEventListener('pointermove', e => {
      if (!down) return;
      vel = (e.clientX - down.x) * 0.01;
      az += vel;
      down.x = e.clientX;
    });
    window.addEventListener('pointerup', () => { down = null; });
    if ('IntersectionObserver' in window) new IntersectionObserver(en => { visible = en[0].isIntersecting; }).observe(canvas);

    function loop() {
      requestAnimationFrame(loop);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!visible) return;
      if (canvas.clientWidth !== w || canvas.clientHeight !== h) {
        w = canvas.clientWidth;
        h = canvas.clientHeight;
        if (!w || !h) return;
        r.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      if (!down) {
        vel *= 0.94;
        az += dt * (0.25 + hover * 0.5) + vel;
      }
      if (refs.fan) refs.fan.rotation.x += dt * 14;
      // Fit the car's footprint into the frame from a 3/4 view.
      const diag = Math.hypot(size.x, size.z);
      const vFov = (camera.fov * Math.PI) / 180;
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
      const dist = Math.max((diag / 2) / Math.tan(hFov / 2), (size.y * 1.05) / Math.tan(vFov / 2)) * 1.1 + diag * 0.1;
      const elev = 0.32;
      camera.position.set(dist * Math.cos(elev) * Math.cos(az), size.y * 0.45 + dist * Math.sin(elev), dist * Math.cos(elev) * Math.sin(az));
      camera.lookAt(0, size.y * 0.42, 0);
      r.render(sc, camera);
    }
    requestAnimationFrame(loop);
    return { setHover(v) { hover = v ? 1 : 0; } };
  }

  window.CarScene = { create, showcase, KIT };
})();

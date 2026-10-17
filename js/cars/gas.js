/* Gas: 1964 Chevrolet Impala Sport Coupe.
   About 5.4 m long, 2 m wide, 3.02 m wheelbase; a front V8 drives a live rear axle,
   all mounted on an X-shaped frame. */
(function () {
  'use strict';
  window.CARS = window.CARS || {};

  window.CARS.gas = {
    id: 'gas',
    page: 'gas.html',
    cycle: 'otto',
    smokeEvery: 0.09,

    // Part order, system and related parts (texts live in content.js / below).
    parts: [
      { id: 'body', cat: 'body', related: ['hood', 'cabin', 'chassis'] },
      { id: 'hood', cat: 'body', related: ['engine', 'body'] },
      { id: 'cabin', cat: 'body', related: ['seats', 'body'] },
      { id: 'seats', cat: 'body', related: ['cabin', 'steering'] },
      { id: 'steering', cat: 'chassis', related: ['wheels', 'suspension'] },
      { id: 'engine', cat: 'engine', related: ['intake', 'fuel', 'exhaust', 'transmission'] },
      { id: 'intake', cat: 'engine', related: ['engine', 'fuel'] },
      { id: 'radiator', cat: 'engine', related: ['engine'] },
      { id: 'battery', cat: 'engine', related: ['engine'] },
      { id: 'fuel', cat: 'engine', related: ['engine', 'exhaust'] },
      { id: 'exhaust', cat: 'engine', related: ['engine', 'fuel'] },
      { id: 'transmission', cat: 'drivetrain', related: ['engine', 'driveshaft'] },
      { id: 'driveshaft', cat: 'drivetrain', related: ['transmission', 'differential'] },
      { id: 'differential', cat: 'drivetrain', related: ['driveshaft', 'wheels'] },
      { id: 'wheels', cat: 'drivetrain', related: ['brakes', 'suspension'] },
      { id: 'brakes', cat: 'chassis', related: ['wheels'] },
      { id: 'suspension', cat: 'chassis', related: ['wheels', 'chassis'] },
      { id: 'chassis', cat: 'chassis', related: ['body', 'suspension'] }
    ],

    // How energy travels from the tank to the road.
    flow: ['fuel', 'engine', 'transmission', 'driveshaft', 'differential', 'wheels'],
    // Parts whose first service tip is featured in the "At the car service" section.
    service: ['engine', 'brakes', 'wheels', 'battery', 'radiator', 'transmission', 'exhaust', 'cabin'],

    // Deep aqua paint, close to the 1964 "Azure Aqua", and the classic orange engine.
    look: { paint: { color: 0x2c8c9c }, engine: 0xd9541e },

    // When each part starts and finishes moving, as a share of scroll progress.
    // Body comes off first, then the engine bay, drivetrain and finally the chassis.
    stages: {
      body: [0.04, 0.36], hood: [0.04, 0.32], cabin: [0.06, 0.36],
      seats: [0.22, 0.52], steering: [0.24, 0.54],
      engine: [0.3, 0.6], intake: [0.32, 0.62], radiator: [0.3, 0.58], battery: [0.32, 0.6],
      fuel: [0.36, 0.66], exhaust: [0.36, 0.68],
      transmission: [0.46, 0.74], driveshaft: [0.48, 0.76], differential: [0.5, 0.78],
      wheels: [0.58, 0.88], brakes: [0.62, 0.9], suspension: [0.6, 0.88], chassis: [0.62, 0.93]
    },

    // Camera distance and height (assembled → taken apart) and how far the car lifts.
    view: { radius: [9.6, 16.8], targetY: [0.55, 2.05], lift: 1.55 },

    // Texts that differ from the shared ones in content.js.
    i18n: {
      en: {
        ui: {
          meta: { title: 'Under the Hood — How a gas car works' },
          hero: {
            eyebrow: '1964 Chevrolet Impala · Gas V8',
            title: 'How a gas car works',
            sub: 'Scroll to take a classic petrol car apart, piece by piece. Click any part to learn what it does.'
          },
          footer: {
            note: 'A learning project. The model is based on the 1964 Chevrolet Impala Sport Coupe — a front-engine, rear-wheel-drive car with a V8.'
          }
        },
        parts: {
          engine: {
            what: 'Burns a mix of fuel and air to produce the power that moves the car. The engine in this model is a V8: eight cylinders in two rows of four, set in a V shape.'
          },
          fuel: {
            how: 'An electric pump inside the tank pushes fuel through lines and a filter to the injectors, which spray a fine mist into the engine. Fuel vapours are captured by a charcoal canister instead of escaping into the air. Older cars like the 1964 Impala use a mechanical pump on the engine and a carburettor instead.'
          },
          steering: {
            how: 'The steering wheel turns a column with a small gear (pinion) at its end. The pinion slides a toothed bar (rack) left or right, and tie rods push the front wheels to turn. Hydraulic or electric power steering reduces the effort. Older cars like the 1964 Impala use a steering box instead: the column turns a worm gear running on steel balls, which swings an arm that pushes the wheels through linkage rods.'
          },
          chassis: {
            how: 'Older cars and trucks use a separate ladder frame made of steel rails. Most modern cars use a unibody, where the floor, rails and body are welded into one shell — lighter and safer. The tunnel in the middle of the floor makes room for the gearbox and driveshaft. The 1964 Impala uses a separate X-shaped frame: two rails cross in the middle of the car, which keeps it stiff while letting the body sit low.'
          },
          intake: {
            how: 'Air passes through a paper filter that traps dust — on this 1964 V8 it sits inside the big round chrome air cleaner — then through the throttle (controlled by the gas pedal) and into the intake manifold, which shares it out between the cylinders. In older cars the throttle is part of the carburettor, which also mixes fuel into the air; modern cars use a throttle body and fuel injectors instead.'
          },
          brakes: {
            how: 'Pressing the pedal pushes brake fluid through lines to every wheel. In disc brakes, used on modern cars, pads squeeze a spinning disc. In drum brakes, like on this 1964 car, curved shoes press outwards against the inside of a spinning drum. Either way, friction turns the car’s kinetic energy into heat. On modern cars ABS stops the wheels from locking so you can still steer.'
          }
        }
      },
      uk: {
        ui: {
          meta: { title: 'Під капотом — як працює бензиновий автомобіль' },
          hero: {
            eyebrow: 'Chevrolet Impala 1964 · Бензиновий V8',
            title: 'Як працює бензиновий автомобіль',
            sub: 'Гортайте, щоб розібрати класичний бензиновий автомобіль деталь за деталлю. Натисніть на будь-яку частину, щоб дізнатися, що вона робить.'
          },
          footer: {
            note: 'Навчальний проєкт. Модель створено на основі Chevrolet Impala Sport Coupe 1964 року — автомобіля з переднім розташуванням двигуна V8 і заднім приводом.'
          }
        },
        parts: {
          engine: {
            what: 'Спалює суміш пального й повітря, щоб створити потужність, яка рухає автомобіль. У цій моделі стоїть V8: вісім циліндрів у двох рядах по чотири, розташованих у формі літери V.'
          },
          fuel: {
            how: 'Електричний насос усередині бака жене пальне трубками через фільтр до форсунок, які розпилюють його дрібним туманом у двигун. Пари пального вловлює вугільний адсорбер, щоб вони не потрапляли в повітря. Старі автомобілі, як-от Impala 1964 року, натомість мають механічний насос на двигуні та карбюратор.'
          },
          steering: {
            how: 'Кермо обертає вал із маленькою шестернею на кінці. Шестерня рухає зубчасту рейку ліворуч або праворуч, а кермові тяги повертають передні колеса. Гідравлічний чи електричний підсилювач зменшує зусилля. Старі автомобілі, як-от Impala 1964 року, мають натомість кермовий механізм із черв’яком на сталевих кульках: він повертає сошку, а та через систему тяг повертає колеса.'
          },
          chassis: {
            how: 'Старі автомобілі й вантажівки мають окрему раму зі сталевих лонжеронів. Більшість сучасних авто — з несучим кузовом, де підлога, лонжерони й кузов зварені в одну оболонку: так легше й безпечніше. Тунель посередині підлоги дає місце для коробки передач і карданного вала. Impala 1964 року має окрему X-подібну раму: два лонжерони перехрещуються посередині автомобіля, що робить його жорстким і дає кузову сидіти низько.'
          },
          intake: {
            how: 'Повітря проходить крізь паперовий фільтр, що затримує пил (на цьому V8 1964 року він схований у великому круглому хромованому корпусі), далі — через дросельну заслінку (нею керує педаль газу) у впускний колектор, який розподіляє його по циліндрах. У старих автомобілях заслінка є частиною карбюратора, який ще й змішує пальне з повітрям; сучасні авто натомість мають дросельний вузол і форсунки.'
          },
          brakes: {
            how: 'Натискання на педаль жене гальмівну рідину трубками до кожного колеса. У дискових гальмах, як у сучасних авто, колодки стискають диск, що обертається. У барабанних гальмах, як на цьому автомобілі 1964 року, вигнуті колодки притискаються зсередини до барабана, що обертається. В обох випадках тертя перетворює кінетичну енергію автомобіля на тепло. У сучасних авто ABS не дає колесам блокуватися, тож ви можете кермувати й під час гальмування.'
          }
        }
      },
      ru: {
        ui: {
          meta: { title: 'Под капотом — как работает бензиновый автомобиль' },
          hero: {
            eyebrow: 'Chevrolet Impala 1964 · Бензиновый V8',
            title: 'Как работает бензиновый автомобиль',
            sub: 'Прокручивайте, чтобы разобрать классический бензиновый автомобиль деталь за деталью. Нажмите на любую часть, чтобы узнать, что она делает.'
          },
          footer: {
            note: 'Учебный проект. Модель создана на основе Chevrolet Impala Sport Coupe 1964 года — автомобиля с передним расположением двигателя V8 и задним приводом.'
          }
        },
        parts: {
          engine: {
            what: 'Сжигает смесь топлива и воздуха, чтобы создать мощность, которая движет автомобиль. В этой модели стоит V8: восемь цилиндров в двух рядах по четыре, расположенных в форме буквы V.'
          },
          fuel: {
            how: 'Электрический насос внутри бака гонит топливо по трубкам через фильтр к форсункам, которые распыляют его мелким туманом в двигатель. Пары топлива улавливает угольный адсорбер, чтобы они не попадали в воздух. Старые автомобили, например Impala 1964 года, вместо этого используют механический насос на двигателе и карбюратор.'
          },
          steering: {
            how: 'Руль вращает вал с маленькой шестернёй на конце. Шестерня двигает зубчатую рейку влево или вправо, а рулевые тяги поворачивают передние колёса. Гидравлический или электрический усилитель уменьшает усилие. Старые автомобили, например Impala 1964 года, вместо этого используют рулевой механизм с червяком на стальных шариках: он поворачивает сошку, а та через систему тяг поворачивает колёса.'
          },
          chassis: {
            how: 'Старые автомобили и грузовики имеют отдельную раму из стальных лонжеронов. Большинство современных машин — с несущим кузовом, где пол, лонжероны и кузов сварены в одну оболочку: так легче и безопаснее. Тоннель посередине пола даёт место для коробки передач и карданного вала. У Impala 1964 года отдельная X-образная рама: два лонжерона перекрещиваются посередине автомобиля, что делает его жёстким и позволяет кузову сидеть низко.'
          },
          intake: {
            how: 'Воздух проходит через бумажный фильтр, задерживающий пыль (на этом V8 1964 года он спрятан в большом круглом хромированном корпусе), затем через дроссельную заслонку (ей управляет педаль газа) во впускной коллектор, который распределяет его по цилиндрам. В старых автомобилях заслонка — часть карбюратора, который ещё и смешивает топливо с воздухом; современные машины вместо этого используют дроссельный узел и форсунки.'
          },
          brakes: {
            how: 'Нажатие на педаль гонит тормозную жидкость по трубкам к каждому колесу. В дисковых тормозах, как у современных машин, колодки сжимают вращающийся диск. В барабанных тормозах, как на этом автомобиле 1964 года, изогнутые колодки прижимаются изнутри к вращающемуся барабану. В обоих случаях трение превращает кинетическую энергию автомобиля в тепло. У современных машин ABS не даёт колёсам блокироваться, поэтому вы можете рулить и во время торможения.'
          }
        }
      }
    },

    build(K, M, add, refs) {
      const { T, V, lerp, PI, mesh, rbox, rboxGeo, box, cylX, cylZ, rod, tube, pivot, beam, gearGeo, extrudeGeo } = K;
      const FA = 1.65; // front axle
      const RA = -1.37; // rear axle
      const WY = 0.35; // wheel centre height (= tyre radius)
      const WZ = 0.76; // half track

      /* ---- body: long flat sides with chrome trim */
      const side = new T.Shape();
      side.moveTo(-2.62, 0.3);
      side.lineTo(RA - 0.43, 0.3);
      side.absarc(RA, 0.33, 0.43, PI, 0, true);
      side.lineTo(RA + 0.43, 0.3);
      side.lineTo(FA - 0.43, 0.3);
      side.absarc(FA, 0.33, 0.43, PI, 0, true);
      side.lineTo(FA + 0.43, 0.3);
      side.lineTo(2.52, 0.3);
      side.quadraticCurveTo(2.6, 0.31, 2.6, 0.4);
      side.lineTo(2.62, 0.84);
      side.quadraticCurveTo(2.63, 0.925, 2.55, 0.925);
      side.lineTo(0.95, 0.945);
      side.lineTo(-1.6, 0.95);
      side.lineTo(-2.62, 0.935);
      side.quadraticCurveTo(-2.7, 0.93, -2.7, 0.86);
      side.lineTo(-2.7, 0.4);
      side.quadraticCurveTo(-2.7, 0.3, -2.62, 0.3);
      const sideGeo = extrudeGeo(side, 0.08, 0.03);
      const archGeo = new T.TorusGeometry(0.4, 0.009, 8, 40, PI);

      for (const s of [-1, 1]) {
        const g = new T.Group();
        g.position.z = s * 0.93;
        g.add(mesh(sideGeo, M.paint));
        const zf = s * 0.072; // outer face of the panel
        for (const x of [0.92, -0.58]) g.add(box(0.008, 0.6, 0.006, M.trim, x, 0.63, zf)); // door seams
        g.add(rbox(0.17, 0.03, 0.03, 0.012, M.chrome, -0.42, 0.87, zf)); // door handle
        g.add(cylX(0.009, 0.009, 5.15, M.chrome, -0.04, 0.8, zf, 8)); // side spear along the crease
        g.add(rbox(2.1, 0.035, 0.02, 0.01, M.chrome, 0.14, 0.34, zf)); // rocker molding
        for (const x of [FA, RA]) g.add(mesh(archGeo, M.chrome, x, 0.33, zf)); // wheel-arch trim
        g.add(cylX(0.011, 0.011, 2.55, M.chrome, -0.32, 0.98, 0, 8)); // belt molding under the windows
        if (s === -1) {
          // Round chrome mirror on the driver's door.
          g.add(rbox(0.04, 0.08, 0.04, 0.015, M.chrome, 0.72, 1.01, s * 0.08));
          g.add(cylX(0.055, 0.055, 0.03, M.chrome, 0.72, 1.07, s * 0.1, 20));
        }
        add('body', g, [0, -0.45, s * 1.85]);
      }

      /* ---- front: quad headlights in a full-width chrome grille, chrome bumper */
      const front = new T.Group();
      front.add(rbox(0.05, 0.26, 1.74, 0.02, M.trim, 2.6, 0.66, 0));
      front.add(rbox(0.04, 0.09, 1.74, 0.02, M.paint, 2.6, 0.84, 0)); // header panel above the grille
      for (const y of [0.6, 0.64, 0.68, 0.72]) front.add(box(0.012, 0.01, 1.62, M.chrome, 2.63, y, 0));
      for (const y of [0.535, 0.785]) front.add(rbox(0.04, 0.03, 1.78, 0.012, M.chrome, 2.63, y, 0));
      const headBezel = new T.TorusGeometry(0.078, 0.012, 10, 32);
      headBezel.rotateY(PI / 2);
      for (const z of [-0.72, -0.5, 0.5, 0.72]) {
        front.add(cylX(0.072, 0.072, 0.03, M.headlight, 2.635, 0.66, z, 28));
        front.add(mesh(headBezel, M.chrome, 2.65, 0.66, z));
      }
      front.add(rbox(0.03, 0.05, 0.12, 0.015, M.chrome, 2.65, 0.66, 0)); // centre emblem
      front.add(rbox(0.17, 0.12, 1.96, 0.05, M.chrome, 2.68, 0.44, 0)); // bumper
      for (const s of [-1, 1]) {
        front.add(rbox(0.34, 0.12, 0.08, 0.04, M.chrome, 2.52, 0.44, s * 0.97)); // bumper wrap-around
        front.add(rbox(0.02, 0.035, 0.2, 0.012, M.amber, 2.77, 0.44, s * 0.6)); // parking lights
      }
      add('body', front, [1.0, 0.1, 0]);

      /* ---- rear: three round taillights per side, chrome bumper */
      const rear = new T.Group();
      rear.add(rbox(0.05, 0.4, 1.76, 0.02, M.paint, -2.73, 0.7, 0));
      const tailBezel = new T.TorusGeometry(0.07, 0.011, 10, 32);
      tailBezel.rotateY(PI / 2);
      for (const s of [-1, 1]) {
        for (const z of [0.36, 0.56, 0.76]) {
          rear.add(cylX(0.064, 0.064, 0.03, M.taillight, -2.76, 0.7, s * z, 28));
          rear.add(mesh(tailBezel, M.chrome, -2.775, 0.7, s * z));
        }
        rear.add(rbox(0.3, 0.12, 0.08, 0.04, M.chrome, -2.62, 0.43, s * 0.97));
      }
      for (const y of [0.6, 0.8]) rear.add(rbox(0.02, 0.018, 1.7, 0.008, M.chrome, -2.765, y, 0));
      rear.add(rbox(0.17, 0.12, 1.96, 0.05, M.chrome, -2.79, 0.43, 0)); // bumper
      rear.add(rbox(0.02, 0.12, 0.3, 0.01, M.plate, -2.88, 0.44, 0)); // number plate (fuel filler behind it)
      add('body', rear, [-1.0, 0.1, 0]);

      /* ---- trunk lid: long and flat */
      const trunkShape = new T.Shape();
      trunkShape.moveTo(-1.58, 0.965);
      trunkShape.lineTo(-2.6, 0.95);
      trunkShape.quadraticCurveTo(-2.7, 0.945, -2.71, 0.9);
      trunkShape.lineTo(-2.66, 0.9);
      trunkShape.lineTo(-2.58, 0.915);
      trunkShape.lineTo(-1.58, 0.925);
      trunkShape.lineTo(-1.58, 0.965);
      const trunk = mesh(extrudeGeo(trunkShape, 1.72, 0.015), M.paint);
      add('body', pivot(trunk, -1.58, 0.945, 0), [-0.8, 1.2, 0], { rot: [0, 0, -0.45] });

      /* ---- hood: flat, between the fender tops */
      const hoodShape = new T.Shape();
      hoodShape.moveTo(0.95, 0.955);
      hoodShape.lineTo(2.55, 0.935);
      hoodShape.quadraticCurveTo(2.64, 0.93, 2.63, 0.88);
      hoodShape.lineTo(2.58, 0.88);
      hoodShape.lineTo(2.5, 0.905);
      hoodShape.lineTo(0.95, 0.915);
      hoodShape.lineTo(0.95, 0.955);
      const hood = mesh(extrudeGeo(hoodShape, 1.72, 0.015), M.paint);
      add('hood', pivot(hood, 0.95, 0.935, 0), [0.8, 1.35, 0], { rot: [0, 0, 0.42] });

      /* ---- cabin: pillarless hardtop roof, wide C-pillars, chrome window trim */
      const cabin = new T.Group();
      const glassShape = new T.Shape();
      glassShape.moveTo(0.95, 0.955);
      glassShape.quadraticCurveTo(0.55, 1.2, 0.22, 1.355);
      glassShape.quadraticCurveTo(-0.35, 1.395, -0.95, 1.37);
      glassShape.quadraticCurveTo(-1.3, 1.2, -1.56, 0.97);
      glassShape.lineTo(0.95, 0.955);
      const glass = mesh(extrudeGeo(glassShape, 1.66, 0.03), M.glass);
      glass.castShadow = false;
      glass.renderOrder = 2;
      cabin.add(glass);

      const roofShape = new T.Shape();
      roofShape.moveTo(0.24, 1.385);
      roofShape.quadraticCurveTo(-0.35, 1.43, -0.97, 1.4);
      roofShape.lineTo(-0.94, 1.365);
      roofShape.quadraticCurveTo(-0.35, 1.39, 0.2, 1.35);
      roofShape.lineTo(0.24, 1.385);
      cabin.add(mesh(extrudeGeo(roofShape, 1.7, 0.025), M.paint));

      const cPillar = new T.Shape();
      cPillar.moveTo(-0.62, 0.97);
      cPillar.lineTo(-0.88, 1.37);
      cPillar.lineTo(-1.0, 1.375);
      cPillar.quadraticCurveTo(-1.3, 1.2, -1.56, 0.97);
      cPillar.lineTo(-0.62, 0.97);
      const cPillarGeo = extrudeGeo(cPillar, 0.03, 0.012);
      for (const s of [-1, 1]) {
        cabin.add(mesh(cPillarGeo, M.paint, 0, 0, s * 0.87));
        cabin.add(rod(V(0.95, 0.97, s * 0.83), V(0.22, 1.37, s * 0.81), 0.018, M.chrome, 10)); // A-pillar
        cabin.add(rod(V(0.22, 1.375, s * 0.845), V(-0.92, 1.385, s * 0.845), 0.009, M.chrome, 8)); // drip rail
      }
      cabin.add(rbox(0.32, 0.14, 1.68, 0.05, M.paint, 0.74, 0.9, 0)); // dashboard
      cabin.add(box(0.01, 0.02, 1.6, M.chrome, 0.575, 0.92, 0));
      // Windshield wipers. Each sits in a frame lying on the glass (local Y = glass normal),
      // so in the part preview it can sweep across the windshield.
      const glassNormal = V(0.48, 0.877, 0).normalize();
      for (const pz of [-0.6, 0.05]) {
        const wiper = new T.Group();
        wiper.position.set(0.923, 1.01, pz);
        wiper.quaternion.setFromUnitVectors(V(0, 1, 0), glassNormal);
        const sweep = new T.Group();
        // Parked flat along the bottom of the glass; in the preview they sweep up and back.
        sweep.userData.swing = { axis: 'y', amp: 0.7, speed: 1.6, offset: -0.7 };
        sweep.add(mesh(new T.CylinderGeometry(0.018, 0.018, 0.02, 12), M.trim));
        sweep.add(box(0.012, 0.012, 0.42, M.trim, 0, 0.008, 0.21)); // arm
        sweep.add(box(0.02, 0.016, 0.4, M.trim, -0.012, 0.012, 0.42)); // blade
        wiper.add(sweep);
        cabin.add(wiper);
      }
      add('cabin', cabin, [0, 1.95, 0]);

      /* ---- seats: vinyl front buckets and a rear bench (no headrests in 1964) */
      function seat(x, z, w, adjustable) {
        const g = new T.Group();
        g.position.set(x, 0, z);
        g.add(rbox(0.52, 0.13, w, 0.05, M.vinyl, 0, 0.53, 0));
        // Backrest hinged at the rear of the cushion, so it can recline.
        const back = new T.Group();
        back.position.set(-0.26, 0.55, 0);
        back.rotation.z = 0.2;
        back.add(rbox(0.12, 0.52, w, 0.05, M.vinyl, 0, 0.25, 0));
        for (let i = -2; i <= 2; i++) back.add(box(0.004, 0.4, 0.01, M.darkSteel, 0.065, 0.27, (i * w) / 6)); // pleats
        g.add(back);
        for (const s of [-1, 1]) g.add(box(0.46, 0.04, 0.04, M.darkSteel, 0, 0.45, s * w * 0.32));
        if (adjustable) {
          // In the part preview front seats slide on their rails and the backrest reclines.
          g.userData.slide = { axis: 'x', amp: 0.06, speed: 0.9 };
          back.userData.swing = { axis: 'z', amp: 0.13, speed: 1.3 };
        }
        return g;
      }
      add('seats', seat(-0.05, -0.42, 0.52, true), [0, 1.15, -0.2]);
      add('seats', seat(-0.05, 0.42, 0.52, true), [0, 1.15, 0.2]);
      add('seats', seat(-1.0, 0, 1.6, false), [-0.35, 1.15, 0]);

      /* ---- steering: big thin wheel with a chrome horn ring, steering box and linkage */
      const steer = new T.Group();
      const wheelRing = new T.Group();
      wheelRing.position.set(0.28, 1.02, -0.42);
      wheelRing.rotation.z = -0.5;
      const ringGeo = new T.TorusGeometry(0.2, 0.014, 12, 48);
      ringGeo.rotateY(PI / 2);
      // Inner group turns around the column axis in the part preview.
      const wheelTurn = new T.Group();
      wheelTurn.userData.swing = { axis: 'x', amp: 1.1, speed: 1.4 };
      wheelRing.add(wheelTurn);
      wheelTurn.add(mesh(ringGeo, M.trim));
      const hornGeo = new T.TorusGeometry(0.12, 0.007, 8, 40);
      hornGeo.rotateY(PI / 2);
      wheelTurn.add(mesh(hornGeo, M.chrome, -0.02, 0, 0));
      wheelTurn.add(box(0.012, 0.018, 0.38, M.chrome, -0.01, 0, 0));
      wheelTurn.add(cylX(0.045, 0.045, 0.05, M.chrome, 0, 0, 0, 20));
      steer.add(wheelRing);
      steer.add(rod(V(0.3, 1.01, -0.42), V(1.55, 0.48, -0.42), 0.022, M.darkSteel));
      steer.add(rbox(0.14, 0.12, 0.14, 0.03, M.castIron, 1.6, 0.46, -0.42)); // steering box
      steer.add(rod(V(1.62, 0.42, -0.42), V(1.78, 0.36, -0.42), 0.016, M.steel)); // pitman arm
      steer.add(cylZ(0.018, 0.9, M.steel, 1.78, 0.36, 0, 12)); // centre link
      for (const s of [-1, 1]) steer.add(rod(V(1.78, 0.36, s * 0.42), V(1.82, 0.35, s * 0.66), 0.015, M.steel));
      add('steering', steer, [-0.1, 0.8, -0.65]);

      /* ---- engine: V8 small-block in Chevy orange with chrome valve covers */
      const eng = new T.Group();
      const EX = 1.42;
      const crankcase = rbox(0.72, 0.24, 0.44, 0.03, M.engine, EX, 0.5, 0);
      crankcase.userData.xray = true;
      eng.add(crankcase);
      eng.add(rbox(0.66, 0.1, 0.38, 0.03, M.engine, EX, 0.34, 0)); // oil pan
      for (const s of [-1, 1]) {
        const bank = new T.Group();
        bank.position.set(EX, 0.6, s * 0.12);
        bank.rotation.x = s * 0.62;
        const block = rbox(0.7, 0.22, 0.2, 0.02, M.engine, 0, 0, 0); // cylinder bank
        block.userData.xray = true; // see-through in the part preview, so the pistons show
        bank.add(block);
        const head = rbox(0.72, 0.07, 0.22, 0.02, M.engine, 0, 0.14, 0); // cylinder head
        head.userData.xray = true;
        bank.add(head);
        bank.add(rbox(0.64, 0.07, 0.17, 0.03, M.chrome, 0, 0.21, 0)); // valve cover
        for (let i = 0; i < 4; i++) {
          const x = -0.255 + i * 0.17;
          // Pistons sit inside the block; each fires in turn (phase), its plug flashing at the top.
          const phase = [0, Math.PI, Math.PI / 2, Math.PI * 1.5][i] + (s > 0 ? Math.PI / 4 : 0);
          const plug = cylZ(0.016, 0.07, M.plugRed, x, 0.1, s * 0.13, 10);
          plug.userData.spark = phase;
          bank.add(plug);
          const piston = mesh(new T.CylinderGeometry(0.062, 0.062, 0.06, 18), M.chrome, x, 0, 0);
          piston.add(box(0.016, 0.1, 0.016, M.darkSteel, 0, -0.07, 0)); // connecting rod
          piston.userData.piston = { y: -0.01, amp: 0.035, phase };
          bank.add(piston);
          // Combustion flash above the piston; hidden in the big car, shown in the part preview.
          const flash = new T.Mesh(new T.SphereGeometry(0.06, 16, 12), new T.MeshBasicMaterial({ color: 0xffa040, transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false }));
          flash.position.set(x, 0.075, 0);
          flash.visible = false;
          flash.userData.flash = phase;
          bank.add(flash);
        }
        eng.add(bank);
      }
      eng.add(rbox(0.52, 0.08, 0.2, 0.03, M.engine, EX, 0.75, 0)); // intake manifold
      eng.add(mesh(new T.CylinderGeometry(0.04, 0.045, 0.1, 16), M.trim, EX - 0.4, 0.78, 0)); // distributor
      eng.add(cylX(0.06, 0.06, 0.08, M.engine, 1.82, 0.62, 0)); // water pump
      const crankPulley = new T.Group();
      crankPulley.position.set(1.82, 0.42, 0);
      crankPulley.add(cylX(0.09, 0.09, 0.04, M.darkSteel, 0, 0, 0));
      crankPulley.add(box(0.045, 0.03, 0.02, M.chrome, 0.012, 0.065, 0)); // timing mark, so the turning shows
      crankPulley.userData.spin = { axis: 'x', speed: 7 };
      eng.add(crankPulley);
      eng.userData.shake = true;
      eng.userData.previewElev = 0.16; // look from the side, into the see-through block
      eng.add(cylX(0.065, 0.065, 0.2, M.steel, 1.72, 0.66, 0.3)); // generator
      eng.add(tube([[1.86, 0.33, 0], [1.86, 0.4, 0.09], [1.86, 0.62, 0.36], [1.86, 0.72, 0.34], [1.86, 0.68, 0.05], [1.86, 0.45, -0.09]], 0.009, M.rubber, 60, true));
      eng.add(cylX(0.06, 0.06, 0.18, M.darkSteel, 1.1, 0.42, -0.28)); // starter
      add('engine', eng, [0.4, 0.9, 0]);

      /* ---- air intake: carburettor under a big round chrome air cleaner */
      const intake = new T.Group();
      intake.add(rbox(0.14, 0.08, 0.14, 0.02, M.steel, EX, 0.82, 0)); // carburettor
      intake.add(mesh(new T.CylinderGeometry(0.21, 0.21, 0.02, 40), M.trim, EX, 0.85, 0));
      intake.add(mesh(new T.CylinderGeometry(0.2, 0.21, 0.05, 40), M.chrome, EX, 0.88, 0));
      intake.add(mesh(new T.CylinderGeometry(0.02, 0.02, 0.02, 12), M.chrome, EX, 0.91, 0)); // wing nut
      intake.userData.flows = [{ points: [[EX + 0.75, 1.1, 0.05], [EX + 0.45, 0.98, 0.02], [EX + 0.24, 0.88, 0], [EX, 0.86, 0], [EX, 0.78, 0]], color: 0x8fd6ff, count: 10, speed: 0.45, size: 0.022 }];
      add('intake', intake, [0.4, 1.6, 0]);

      /* ---- radiator and four-blade fan */
      const rad = new T.Group();
      rad.add(box(0.05, 0.42, 1.3, M.radiator, 2.33, 0.6, 0));
      for (const s of [-1, 1]) rad.add(rbox(0.08, 0.46, 0.06, 0.02, M.trim, 2.33, 0.6, s * 0.68));
      const fan = new T.Group();
      fan.position.set(2.22, 0.6, 0);
      fan.add(cylX(0.05, 0.05, 0.06, M.darkSteel, 0, 0, 0, 16));
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * PI * 2;
        const blade = rbox(0.012, 0.2, 0.08, 0.004, M.darkSteel, 0, Math.cos(a) * 0.12, Math.sin(a) * 0.12);
        blade.rotation.x = -a;
        blade.rotation.y = 0.35;
        fan.add(blade);
      }
      rad.add(fan);
      rad.add(tube([[2.3, 0.78, -0.35], [2.1, 0.82, -0.25], [1.85, 0.78, -0.05], [1.74, 0.76, 0]], 0.025, M.trim, 20));
      refs.fan = fan;
      fan.userData.spin = { axis: 'x', speed: 14 };
      add('radiator', rad, [1.15, 0.5, 0]);

      /* ---- battery with vent caps */
      const bat = new T.Group();
      bat.add(rbox(0.26, 0.22, 0.18, 0.02, M.battery, 2.12, 0.62, -0.62));
      for (let i = 0; i < 6; i++) {
        const cap = mesh(new T.CylinderGeometry(0.014, 0.014, 0.02, 10), M.amber, 2.02 + i * 0.04, 0.74, -0.62);
        cap.userData.cell = i; // lights up in sequence in the part preview
        bat.add(cap);
      }
      const plusCable = [[2.03, 0.765, -0.68], [2.0, 0.84, -0.66], [1.9, 0.8, -0.5], [1.8, 0.6, -0.4], [1.74, 0.5, -0.32]];
      bat.add(tube(plusCable, 0.012, M.plugRed, 32));
      bat.add(tube([[2.21, 0.765, -0.68], [2.25, 0.82, -0.66], [2.3, 0.75, -0.55], [2.3, 0.5, -0.5]], 0.012, M.trim, 24));
      bat.userData.flows = [{ points: plusCable, color: 0x7fd8ff, count: 7, speed: 0.7, size: 0.02 }];
      bat.add(mesh(new T.CylinderGeometry(0.018, 0.018, 0.035, 12), M.plugRed, 2.03, 0.745, -0.68));
      bat.add(mesh(new T.CylinderGeometry(0.018, 0.018, 0.035, 12), M.trim, 2.21, 0.745, -0.68));
      add('battery', bat, [0.55, 1.2, -0.55]);

      /* ---- fuel tank under the trunk floor, filler behind the number plate */
      const fuel = new T.Group();
      fuel.add(rbox(0.55, 0.2, 1.1, 0.06, M.tank, -2.12, 0.4, 0));
      fuel.add(tube([[-2.35, 0.46, 0], [-2.6, 0.5, 0], [-2.74, 0.5, 0]], 0.03, M.steel, 16));
      fuel.add(tube([[-1.85, 0.36, 0.22], [-1.0, 0.3, 0.25], [0.5, 0.3, 0.25], [1.15, 0.38, 0.3], [1.24, 0.42, 0.3]], 0.01, M.steel, 60));
      fuel.add(rbox(0.08, 0.08, 0.08, 0.02, M.castIron, 1.26, 0.42, 0.3)); // mechanical fuel pump
      fuel.userData.flows = [{ points: [[-1.85, 0.36, 0.22], [-1.0, 0.3, 0.25], [0.5, 0.3, 0.25], [1.15, 0.38, 0.3], [1.24, 0.42, 0.3]], color: 0xffb020, count: 14, speed: 0.18, size: 0.05 }];
      fuel.userData.previewElev = 0.9;
      add('fuel', fuel, [-0.9, -0.6, 0]);

      /* ---- dual exhaust: cast-iron manifolds, two mufflers, two tailpipes */
      const ex = new T.Group();
      refs.tailpipes = [];
      const flows = [];
      for (const s of [-1, 1]) {
        ex.add(cylX(0.035, 0.035, 0.64, M.castIron, EX, 0.6, s * 0.37, 14));
        for (let i = 0; i < 4; i++) {
          const x = EX - 0.255 + i * 0.17;
          ex.add(rod(V(x, 0.65, s * 0.29), V(x, 0.6, s * 0.37), 0.022, M.castIron));
        }
        ex.add(tube([[1.15, 0.58, s * 0.37], [1.05, 0.4, s * 0.33], [0.85, 0.22, s * 0.3], [0.3, 0.21, s * 0.33], [-0.05, 0.21, s * 0.42]], 0.03, M.exhaust, 40));
        ex.add(rbox(0.55, 0.14, 0.22, 0.06, M.exhaust, -0.35, 0.22, s * 0.42));
        ex.add(tube([[-0.62, 0.21, s * 0.42], [-1.0, 0.2, s * 0.45], [RA, 0.19, s * 0.5], [-1.9, 0.2, s * 0.6], [-2.72, 0.22, s * 0.62]], 0.03, M.exhaust, 60));
        ex.add(cylX(0.036, 0.036, 0.1, M.chrome, -2.78, 0.22, s * 0.62, 16));
        refs.tailpipes.push(V(-2.84, 0.22, s * 0.62));
        flows.push({
          points: [[1.15, 0.58, s * 0.37], [1.05, 0.4, s * 0.33], [0.85, 0.22, s * 0.3], [0.3, 0.21, s * 0.33], [-0.05, 0.21, s * 0.42],
            [-0.35, 0.22, s * 0.42], [-0.62, 0.21, s * 0.42], [-1.0, 0.2, s * 0.45], [RA, 0.19, s * 0.5], [-1.9, 0.2, s * 0.6], [-2.72, 0.22, s * 0.62], [-3.0, 0.25, s * 0.62]],
          color: 0xff7a2f, color2: 0x9aa3b0, count: 16, speed: 0.22, size: 0.065
        });
      }
      ex.userData.flows = flows;
      ex.userData.previewElev = 0.95; // long and flat: look from above
      add('exhaust', ex, [0, -1.0, 0]);

      /* ---- transmission, with its gears inside (visible in the part preview) */
      const gb = new T.Group();
      const xray = m => {
        m.userData.xray = true;
        return m;
      };
      gb.add(xray(cylX(0.2, 0.16, 0.2, M.steel, 0.96, 0.5, 0, 32)));
      gb.add(xray(cylX(0.15, 0.11, 0.5, M.steel, 0.61, 0.47, 0, 32)));
      gb.add(xray(cylX(0.06, 0.06, 0.16, M.darkSteel, 0.28, 0.45, 0, 20)));
      for (const x of [0.78, 0.63, 0.48]) {
        const r = lerp(0.11, 0.15, (x - 0.36) / 0.5) + 0.008;
        const ring = new T.TorusGeometry(r, 0.01, 8, 32);
        ring.rotateY(PI / 2);
        gb.add(xray(mesh(ring, M.darkSteel, x, 0.47, 0)));
      }
      // Main shaft above, countershaft below: three gear pairs whose sizes set the ratios.
      const MAIN_Y = 0.51, COUNTER_Y = 0.4, SHAFT_SPEED = 6;
      gb.add(cylX(0.012, 0.012, 0.62, M.darkSteel, 0.6, MAIN_Y, 0, 10));
      gb.add(cylX(0.012, 0.012, 0.4, M.darkSteel, 0.62, COUNTER_Y, 0, 10));
      for (const [x, rMain] of [[0.75, 0.042], [0.62, 0.055], [0.49, 0.066]]) {
        const rCounter = MAIN_Y - COUNTER_Y - rMain;
        const main = mesh(gearGeo(rMain, Math.round(rMain * 300), 0.035, 'x'), M.chrome, x, MAIN_Y, 0);
        main.userData.spin = { axis: 'x', speed: SHAFT_SPEED };
        gb.add(main);
        const counter = mesh(gearGeo(rCounter, Math.round(rCounter * 300), 0.035, 'x'), M.engine, x, COUNTER_Y, 0);
        counter.userData.spin = { axis: 'x', speed: -SHAFT_SPEED * (rMain / rCounter) };
        gb.add(counter);
      }
      const lever = new T.Group();
      lever.add(rod(V(0.55, 0.6, 0), V(0.48, 0.9, 0), 0.012, M.chrome));
      lever.add(mesh(new T.SphereGeometry(0.035, 16, 12), M.trim, 0.475, 0.92, 0));
      const leverPivot = pivot(lever, 0.55, 0.6, 0);
      leverPivot.userData.swing = { axis: 'z', amp: 0.22, speed: 0.9 }; // rocks as if shifting
      gb.add(leverPivot);
      gb.userData.previewElev = 0.22;
      add('transmission', gb, [-0.35, 0.4, 0]);

      /* ---- driveshaft */
      const ds = new T.Group();
      const dsA = V(0.2, 0.45, 0), dsB = V(RA + 0.15, 0.37, 0);
      const dsDir = new T.Vector3().subVectors(dsB, dsA);
      const dsLen = dsDir.length();
      ds.position.copy(dsA);
      ds.quaternion.setFromUnitVectors(V(1, 0, 0), dsDir.clone().normalize());
      const dsSpin = new T.Group();
      dsSpin.add(cylX(0.04, 0.04, dsLen - 0.1, M.steel, dsLen / 2, 0, 0, 20));
      for (const x of [0.04, dsLen - 0.04]) {
        dsSpin.add(rbox(0.06, 0.09, 0.09, 0.015, M.darkSteel, x, 0, 0));
        dsSpin.add(box(0.02, 0.13, 0.03, M.darkSteel, x, 0, 0));
      }
      ds.add(dsSpin);
      refs.driveshaft = dsSpin;
      dsSpin.userData.spin = { axis: 'x', speed: 8 };
      add('driveshaft', ds, [0, -0.5, 0]);

      /* ---- differential in a live rear axle, with its gears inside (visible in the part preview) */
      const diff = new T.Group();
      const housing = mesh(new T.SphereGeometry(0.15, 32, 20), M.castIron, RA, WY, 0);
      housing.scale.set(1, 0.92, 1.1);
      housing.userData.xray = true;
      diff.add(housing);
      const cover = cylX(0.13, 0.13, 0.04, M.darkSteel, RA - 0.13, WY, 0, 32);
      cover.userData.xray = true;
      diff.add(cover);
      const nose = cylX(0.05, 0.065, 0.14, M.castIron, RA + 0.16, WY + 0.01, 0, 20);
      nose.userData.xray = true;
      diff.add(nose);
      for (const s of [-1, 1]) {
        // Axle tube on each side (two pieces, leaving the housing clear).
        const tubeSide = cylZ(0.048, 0.52, M.castIron, RA, WY, s * 0.4);
        tubeSide.userData.xray = true;
        diff.add(tubeSide);
      }
      // Pinion from the driveshaft drives the ring gear; the carrier holds the spider gears.
      const pinion = mesh(gearGeo(0.035, 10, 0.04, 'x'), M.chrome, RA + 0.11, WY, -0.03);
      pinion.userData.diff = { role: 'pinion' };
      diff.add(pinion);
      const carrier = new T.Group();
      carrier.position.set(RA, WY, 0);
      carrier.userData.diff = { role: 'carrier' };
      carrier.add(mesh(gearGeo(0.11, 32, 0.025, 'z'), M.chrome, 0, 0, -0.07));
      carrier.add(cylX(0.01, 0.01, 0.13, M.darkSteel, 0, 0, 0, 8)); // cross pin
      for (const s of [-1, 1]) {
        const spider = mesh(gearGeo(0.028, 9, 0.022, 'x'), M.engine, s * 0.045, 0, 0);
        spider.userData.diff = { role: 'spider', side: s };
        carrier.add(spider);
      }
      diff.add(carrier);
      for (const s of [-1, 1]) {
        // Each axle shaft carries a side gear inside and a flange with marks at the wheel end.
        const axle = new T.Group();
        axle.position.set(RA, WY, 0);
        axle.userData.diff = { role: 'axle', side: s };
        axle.add(mesh(gearGeo(0.034, 11, 0.022, 'z'), M.engine, 0, 0, s * 0.04));
        axle.add(cylZ(0.016, 0.62, M.steel, 0, 0, s * 0.35, 10));
        axle.add(cylZ(0.075, 0.03, M.steel, 0, 0, s * 0.66));
        for (const a of [0, PI]) axle.add(box(0.02, 0.05, 0.035, M.engine, Math.sin(a) * 0.05, Math.cos(a) * 0.05, s * 0.67));
        diff.add(axle);
      }
      diff.userData.previewElev = 0.32;
      add('differential', diff, [-0.5, -0.5, 0]);

      /* ---- wheels: whitewall tyres and chrome wheel covers; drum brakes; coil springs */
      const tireProfile = [[0.235, -0.1], [0.31, -0.1], [0.34, -0.085], [0.35, -0.05], [0.35, 0.05], [0.34, 0.085], [0.31, 0.1], [0.235, 0.1]]
        .map(([r, y]) => new T.Vector2(r, y));
      const tireGeo = new T.LatheGeometry(tireProfile, 64);
      tireGeo.rotateX(PI / 2);
      const barrelGeo = new T.CylinderGeometry(0.235, 0.235, 0.18, 40, 1, true);
      barrelGeo.rotateX(PI / 2);
      const whitewallGeo = new T.RingGeometry(0.255, 0.3, 64);
      // Listed from the rim inwards so the lathe's normals face outwards.
      const coverProfile = [[0.238, 0.09], [0.225, 0.104], [0.2, 0.108], [0.16, 0.1], [0.12, 0.095], [0.075, 0.1], [0.06, 0.108], [0.04, 0.116], [0.001, 0.118]]
        .map(([r, y]) => new T.Vector2(r, y));
      const coverGeo = { 1: new T.LatheGeometry(coverProfile, 48), '-1': new T.LatheGeometry(coverProfile, 48) };
      coverGeo[1].rotateX(PI / 2);
      coverGeo['-1'].rotateX(-PI / 2);
      const drumGeo = new T.CylinderGeometry(0.15, 0.15, 0.07, 36);
      drumGeo.rotateX(PI / 2);
      const drumRibGeo = new T.TorusGeometry(0.152, 0.006, 6, 36);
      const backingGeo = new T.CylinderGeometry(0.16, 0.16, 0.012, 36);
      backingGeo.rotateX(PI / 2);

      refs.wheels = [];
      for (const x of [FA, RA]) {
        for (const s of [-1, 1]) {
          // wheel
          const wheel = new T.Group();
          wheel.position.set(x, WY, s * WZ);
          const spin = new T.Group();
          spin.add(mesh(tireGeo, M.rubber));
          spin.add(mesh(barrelGeo, M.darkSteel));
          const ww = mesh(whitewallGeo, M.whitewall, 0, 0, s * 0.1015);
          if (s === -1) ww.rotation.y = PI;
          spin.add(ww);
          spin.add(mesh(coverGeo[s], M.coverChrome));
          for (let i = 0; i < 12; i++) {
            const a = (i / 12) * PI * 2;
            const flute = box(0.006, 0.05, 0.006, M.trim, Math.sin(a) * 0.15, Math.cos(a) * 0.15, s * 0.1);
            flute.rotation.z = -a;
            spin.add(flute);
          }
          for (let i = 0; i < 3; i++) {
            const a = (i / 3) * PI * 2;
            const bar = rbox(0.022, 0.1, 0.014, 0.006, M.chrome, Math.sin(a) * 0.05, Math.cos(a) * 0.05, s * 0.122);
            bar.rotation.z = -a;
            spin.add(bar);
          }
          wheel.add(spin);
          refs.wheels.push(spin);
          spin.userData.spin = { axis: 'z', speed: -3 };
          // Parts repeated at every corner show just one corner, up close, in the part preview.
          const inPreview = x === FA && s === 1;
          add('wheels', wheel, [0, 0.1, s * 1.25], { preview: inPreview });

          // drum brake
          const brake = new T.Group();
          brake.position.set(x, WY, s * 0.7);
          brake.add(mesh(drumGeo, M.castIron));
          for (const dz of [-0.02, 0.0, 0.02]) brake.add(mesh(drumRibGeo, M.darkSteel, 0, 0, dz));
          brake.add(mesh(backingGeo, M.darkSteel, 0, 0, -s * 0.04));
          brake.add(cylZ(0.04, 0.04, M.steel, 0, 0, s * 0.04, 16)); // hub
          brake.userData.spin = { axis: 'z', speed: -3 };
          add('brakes', brake, [0, 0.1, s * 0.65], { preview: inPreview });

          // suspension
          const sus = new T.Group();
          const front = x === FA;
          const sz = s * (front ? 0.52 : 0.55);
          const y0 = front ? 0.45 : 0.42, y1 = front ? 0.82 : 0.8;
          const pts = [];
          const turns = 6, n = turns * 16;
          for (let i = 0; i <= n; i++) {
            const a = (i / n) * turns * PI * 2;
            pts.push(V(x + Math.cos(a) * 0.07, y0 + (y1 - y0) * (i / n), sz + Math.sin(a) * 0.07));
          }
          const spring = mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), n * 2, 0.013, 8), M.spring);
          spring.userData.bounce = y0; // compresses towards its base in the part preview
          sus.add(spring);
          sus.add(mesh(new T.CylinderGeometry(0.024, 0.024, 0.5, 14), M.darkSteel, x, (y0 + y1) / 2, sz));
          sus.add(mesh(new T.CylinderGeometry(0.085, 0.085, 0.02, 20), M.darkSteel, x, y1 + 0.01, sz));
          sus.add(mesh(new T.CylinderGeometry(0.085, 0.085, 0.02, 20), M.darkSteel, x, y0 - 0.01, sz));
          if (front) {
            // Double wishbones and a steering knuckle.
            sus.add(rod(V(x + 0.15, 0.3, s * 0.3), V(x, 0.3, s * 0.64), 0.018, M.darkSteel));
            sus.add(rod(V(x - 0.15, 0.3, s * 0.3), V(x, 0.3, s * 0.64), 0.018, M.darkSteel));
            sus.add(rod(V(x + 0.1, 0.84, s * 0.36), V(x, 0.78, s * 0.6), 0.015, M.darkSteel));
            sus.add(rod(V(x - 0.1, 0.84, s * 0.36), V(x, 0.78, s * 0.6), 0.015, M.darkSteel));
            sus.add(rbox(0.06, 0.5, 0.06, 0.02, M.castIron, x, 0.54, s * 0.63));
          } else {
            // Trailing arms locate the live axle.
            sus.add(rod(V(x, 0.3, s * 0.55), V(x + 0.75, 0.3, s * 0.5), 0.02, M.darkSteel));
            sus.add(rod(V(x, 0.46, s * 0.12), V(x + 0.55, 0.44, s * 0.3), 0.018, M.darkSteel));
          }
          add('suspension', sus, [0, 0.45, s * 0.3], { preview: inPreview });
        }
      }

      /* ---- chassis: X-frame, floor pan with transmission tunnel, trunk floor */
      const ch = new T.Group();
      const rail = (a, b) => ch.add(beam(V(...a), V(...b), 0.1, 0.1, M.darkSteel));
      for (const s of [-1, 1]) {
        rail([2.35, 0.36, s * 0.42], [1.0, 0.32, s * 0.42]);
        rail([1.0, 0.32, s * 0.42], [-0.1, 0.3, s * 0.12]);
        rail([-0.1, 0.3, s * 0.12], [-1.0, 0.32, s * 0.5]);
        rail([-1.0, 0.32, s * 0.5], [-1.2, 0.55, s * 0.55]);
        rail([-1.2, 0.55, s * 0.55], [-1.6, 0.55, s * 0.55]);
        rail([-1.6, 0.55, s * 0.55], [-1.85, 0.4, s * 0.55]);
        rail([-1.85, 0.4, s * 0.55], [-2.65, 0.4, s * 0.55]);
        const floorPan = rbox(2.2, 0.025, 0.7, 0.01, M.floor, -0.2, 0.4, s * 0.6);
        floorPan.userData.xray = true;
        ch.add(floorPan);
      }
      ch.add(rbox(0.5, 0.1, 0.34, 0.03, M.darkSteel, -0.1, 0.3, 0)); // centre of the X
      ch.add(rbox(0.1, 0.08, 0.94, 0.02, M.darkSteel, FA, 0.3, 0)); // front crossmember
      ch.add(rbox(0.06, 0.06, 1.4, 0.02, M.darkSteel, 2.3, 0.35, 0)); // radiator support
      ch.add(rbox(0.1, 0.08, 1.2, 0.02, M.darkSteel, -2.55, 0.4, 0)); // rear crossmember
      const tunnel = new T.CylinderGeometry(0.24, 0.24, 2.2, 28, 1, true, 0, PI);
      tunnel.rotateZ(PI / 2);
      const tunnelMesh = mesh(tunnel, M.floor, -0.2, 0.4, 0);
      tunnelMesh.userData.xray = true;
      ch.add(tunnelMesh);
      const trunkFloor = rbox(1.1, 0.025, 1.8, 0.01, M.floor, -2.12, 0.53, 0);
      trunkFloor.userData.xray = true;
      ch.add(trunkFloor);
      // Pulses run along the top of each rail: loads from the wheels and engine travelling through the frame.
      ch.userData.flows = [-1, 1].map(s => ({
        points: [[2.35, 0.36, s * 0.42], [1.0, 0.32, s * 0.42], [-0.1, 0.3, s * 0.12], [-1.0, 0.32, s * 0.5], [-1.2, 0.55, s * 0.55], [-1.6, 0.55, s * 0.55], [-1.85, 0.4, s * 0.55], [-2.65, 0.4, s * 0.55]]
          .map(([x, y, z]) => [x, y + 0.07, z]),
        color: 0x7be07f, count: 12, speed: 0.16, size: 0.045
      }));
      add('chassis', ch, [0, -1.4, 0]);
    }
  };
})();

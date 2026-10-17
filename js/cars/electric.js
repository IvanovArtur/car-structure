/* Electric: Tesla Model Y Long Range, dual motor.
   About 4.75 m long, 1.92 m wide, 1.62 m tall, 2.89 m wheelbase. A battery pack
   fills the floor between the axles; each axle has its own drive unit (motor,
   inverter and a single reduction gear) and there is no gearbox or exhaust. */
(function () {
  'use strict';
  window.CARS = window.CARS || {};

  // Rows of round cell tops, used as the texture of the battery modules.
  function cellTexture(T) {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    g.fillStyle = '#1d2733';
    g.fillRect(0, 0, 64, 64);
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        g.beginPath();
        g.arc(8 + x * 16, 8 + y * 16, 6, 0, Math.PI * 2);
        g.fillStyle = '#a9b4c2';
        g.fill();
        g.beginPath();
        g.arc(8 + x * 16, 8 + y * 16, 2.2, 0, Math.PI * 2);
        g.fillStyle = '#5c6878';
        g.fill();
      }
    }
    const tex = new T.CanvasTexture(c);
    tex.wrapS = tex.wrapT = T.RepeatWrapping;
    tex.repeat.set(10, 22);
    tex.encoding = T.sRGBEncoding;
    return tex;
  }

  window.CARS.electric = {
    id: 'electric',
    page: 'electric.html',
    cycle: 'electric',

    parts: [
      { id: 'body', cat: 'body', related: ['frunk', 'cabin', 'chassis'] },
      { id: 'frunk', cat: 'body', related: ['thermal', 'battery', 'body'] },
      { id: 'cabin', cat: 'body', related: ['seats', 'body'] },
      { id: 'seats', cat: 'body', related: ['cabin', 'steering'] },
      { id: 'steering', cat: 'chassis', related: ['wheels', 'suspension'] },
      { id: 'hvBattery', cat: 'engine', related: ['charging', 'inverter', 'thermal'] },
      { id: 'motor', cat: 'engine', related: ['inverter', 'reduction'] },
      { id: 'inverter', cat: 'engine', related: ['hvBattery', 'motor'] },
      { id: 'charging', cat: 'engine', related: ['hvBattery'] },
      { id: 'thermal', cat: 'engine', related: ['hvBattery', 'motor'] },
      { id: 'battery', cat: 'engine', related: ['hvBattery'] },
      { id: 'reduction', cat: 'drivetrain', related: ['motor', 'driveshaft'] },
      { id: 'driveshaft', cat: 'drivetrain', related: ['reduction', 'wheels'] },
      { id: 'wheels', cat: 'drivetrain', related: ['brakes', 'suspension'] },
      { id: 'brakes', cat: 'chassis', related: ['wheels', 'motor'] },
      { id: 'suspension', cat: 'chassis', related: ['wheels', 'chassis'] },
      { id: 'chassis', cat: 'chassis', related: ['body', 'hvBattery'] }
    ],

    flow: ['charging', 'hvBattery', 'inverter', 'motor', 'reduction', 'wheels'],
    // Parts whose first service tip is featured in the "At the car service" section.
    service: ['motor', 'brakes', 'hvBattery', 'battery', 'wheels', 'thermal', 'charging', 'reduction'],

    // Pearl-white paint and dark tinted glass all over the roof.
    look: { paint: { color: 0xf1f2f3, metalness: 0.12, roughness: 0.26 }, glass: { color: 0x141a22, opacity: 0.86 } },

    materials: (std, T) => ({
      alu: std(0xc4cad1, 0.32, 0.85),
      casting: std(0x9aa3ad, 0.45, 0.8),
      seatWhite: std(0xe7e3db, 0.55, 0.05),
      wheelDark: std(0x2b2f35, 0.35, 0.7),
      packCase: std(0x3a4049, 0.5, 0.6),
      cells: std(0xffffff, 0.45, 0.4, { map: cellTexture(T), emissive: 0x2aa7ff, emissiveIntensity: 0.15 }),
      hvOrange: std(0xff7a1a, 0.45, 0.1),
      coil: std(0xc77b3a, 0.35, 0.8, { emissive: 0xff8a2a, emissiveIntensity: 0.15 }),
      screen: std(0x0d1520, 0.2, 0.2, { emissive: 0x2a5d9a, emissiveIntensity: 0.6 }),
      led: std(0x9fdcff, 0.3, 0.2, { emissive: 0x4cc3ff, emissiveIntensity: 0.3 })
    }),

    stages: {
      body: [0.04, 0.36], frunk: [0.04, 0.32], cabin: [0.06, 0.36],
      seats: [0.22, 0.52], steering: [0.24, 0.54],
      thermal: [0.3, 0.58], battery: [0.3, 0.58], charging: [0.32, 0.62],
      inverter: [0.36, 0.66], motor: [0.4, 0.7], reduction: [0.46, 0.76],
      hvBattery: [0.5, 0.8], driveshaft: [0.5, 0.8],
      wheels: [0.58, 0.88], brakes: [0.62, 0.9], suspension: [0.6, 0.88], chassis: [0.62, 0.93]
    },

    view: { radius: [9.0, 16.0], targetY: [0.62, 2.15], lift: 1.55 },

    i18n: {
      en: {
        ui: {
          meta: { title: 'Under the Hood — How an electric car works' },
          nav: { cycle: 'Electric motor' },
          hero: {
            eyebrow: 'Tesla Model Y Long Range · Electric',
            title: 'How an electric car works',
            sub: 'Scroll to take an electric SUV apart, piece by piece. Click any part to learn what it does.'
          },
          ch1: { kicker: '01 · The shell', title: 'Body first', text: 'Giant single-piece aluminium castings and a stiff steel cage carry everything — including a battery that weighs about half a tonne.' },
          ch2: { kicker: '02 · The energy', title: 'Battery & electronics', text: 'Instead of a fuel tank and an engine: a battery pack in the floor, and electronics that turn its power into a spinning magnetic field.' },
          ch3: { kicker: '03 · The power path', title: 'Two motors, no gearbox', text: 'Each axle has its own motor with a single fixed gear. No clutch, no gear changes and no exhaust.' },
          ch4: { kicker: '04 · Control', title: 'Stop, steer, recover', text: 'Brakes, steering and suspension — and when you lift off, the motors slow the car and recharge the battery. Now click any part.' },
          cycle: {
            eyebrow: 'Inside the motor',
            title: 'How an electric motor spins',
            text: 'There are no explosions inside: magnets do all the work. Electronics switch coils on and off so quickly that the magnetic field rotates — and drags the rotor with it.',
            open: 'Learn about the motors',
            strokes: [
              { name: 'Battery', text: 'The battery stores energy as direct current (DC) at around 400 volts.' },
              { name: 'Inverter', text: 'The inverter chops that DC into three alternating currents (AC), each shifted in time, switching thousands of times per second.' },
              { name: 'Rotating field', text: 'The three currents feed the coils around the stator. As they rise and fall in turn, the magnetic field spins around the motor.' },
              { name: 'Rotor', text: 'The magnetic rotor is pulled along by the spinning field and turns the wheels through a fixed gear. Lift off the pedal and it works in reverse — as a generator.' }
            ],
            labels: { battery: 'Battery', inverter: 'Inverter', field: '3-phase current', stator: 'Stator coils', rotor: 'Rotor' }
          },
          flow: { text: 'Follow the energy from the charging port to the tyres. Click a step to open that part.' },
          cats: { engine: 'Battery & motors' },
          footer: { note: 'A learning project. The model is based on the Tesla Model Y Long Range with two motors and all-wheel drive.' }
        },
        parts: {
          body: {
            how: 'Most of the body is welded steel and aluminium, but the front and rear underbody are each made as one giant aluminium casting instead of 70-plus stamped parts. The battery pack in the floor stiffens the car and keeps its centre of gravity very low.',
            tip: 'With the heavy battery so low down, electric SUVs are much less likely to roll over than tall petrol SUVs.'
          },
          frunk: {
            name: 'Frunk (front trunk)',
            short: 'Storage where the engine used to be',
            what: 'A lockable storage space under the front lid — there is no engine to fill it.',
            how: 'The lid is hinged at the windshield like a normal hood. Underneath sit a plastic storage tub, the 12-volt battery, the brake fluid reservoir and parts of the cooling and air-conditioning system.',
            tip: 'The frunk is also a crumple zone: with no engine block in the way, the front can absorb crash energy very evenly.'
          },
          cabin: {
            how: 'The roof is almost entirely tinted glass, resting on strong steel pillars that form the safety cage. The glass is laminated and coated to block UV light and most of the sun’s heat.',
            tip: 'Without engine noise, wind and tyre sounds become more noticeable — which is why EVs often use thicker, acoustic glass.'
          },
          hvBattery: {
            name: 'Battery pack',
            short: 'The “fuel tank” of an electric car',
            what: 'Stores the energy that drives the car — about 75 kWh, enough for roughly 500 km.',
            how: 'Thousands of cylindrical lithium-ion cells are grouped into modules inside a sealed, armoured box in the floor. A battery management system watches every cell’s voltage and temperature, and liquid cooling keeps them in their comfortable range of about 20–40 °C.',
            tip: 'Batteries last longest when kept between about 20% and 80% charge day to day; charge to 100% only before long trips.'
          },
          motor: {
            name: 'Electric motors',
            short: 'Turn electricity into rotation',
            what: 'Drive the wheels. This car has two: one on the front axle and one on the rear, which together give all-wheel drive.',
            how: 'Coils in the fixed outer part (the stator) create a magnetic field that rotates. The rotor in the middle is pulled around by it — with permanent magnets in the rear motor and an induction design at the front. Full torque is available from zero speed, which is why EVs accelerate so briskly. Scroll down to see it in action.',
            tip: 'An electric motor turns about 90% of its energy into motion — a petrol engine manages only around 30%.'
          },
          inverter: {
            name: 'Inverters',
            short: 'Turn battery DC into motor AC',
            what: 'Control how much power flows to each motor — the inverter is the electric car’s “throttle”.',
            how: 'Fast silicon-carbide switches turn the battery’s direct current on and off thousands of times per second to build three smooth alternating currents. Changing their frequency changes the motor speed; changing their strength changes the torque. When braking, they work in reverse and send energy back to the battery.',
            tip: 'The faint whine you hear from an EV while it accelerates comes largely from the inverter switching and the motor’s magnetic forces.'
          },
          reduction: {
            name: 'Reduction gear & differential',
            short: 'One fixed gear instead of a gearbox',
            what: 'Brings the motor’s very high speed down to wheel speed and splits torque between the left and right wheels.',
            how: 'The motor spins at up to about 18,000 rpm. Two pairs of gears reduce that by roughly 9:1, so the wheels turn about nine times slower but with nine times more force. An electric motor works well across its whole speed range, so no gear changes are needed.',
            tip: 'No gear changes means no clutch, no shift jolts and smooth acceleration all the way to top speed.'
          },
          driveshaft: {
            name: 'Half-shafts',
            short: 'Carry torque from each motor to its wheels',
            what: 'Connect each drive unit to its two wheels.',
            how: 'Each half-shaft has a constant-velocity (CV) joint at both ends, so it keeps turning smoothly while the suspension moves up and down and the front wheels steer. Rubber boots keep the grease in and the dirt out.',
            tip: 'A torn CV boot is cheap to replace; a CV joint ruined by dirt is not — have the boots checked at every service.'
          },
          charging: {
            name: 'Charge port & charger',
            short: 'Where the energy comes in',
            what: 'Lets you plug in to recharge the battery at home or at a fast charger.',
            how: 'At home, the on-board charger converts alternating current (AC) from the grid into direct current (DC) that the battery can store. At a fast charger, DC goes straight into the battery — up to about 250 kW, adding around 250 km of range in 15 minutes.',
            tip: 'Charging slows down as the battery fills up, so fast-charging from 10% to 80% is much quicker per kilometre than from 80% to 100%.'
          },
          thermal: {
            name: 'Heat pump & cooling',
            short: 'Keeps the battery, motors and cabin at the right temperature',
            what: 'Heats and cools the battery, motors, electronics and the cabin.',
            how: 'Coolant flows through the battery, motors and inverters. A heat pump moves heat to where it is needed — it can even collect waste heat from the motors to warm the cabin. A smart multi-way valve routes the coolant, and a radiator at the front gets rid of extra heat.',
            tip: 'In winter, pre-heating the car while it is still plugged in saves battery range for the drive.'
          },
          battery: {
            name: '12-volt battery',
            short: 'Powers the lights, screens and computers',
            what: 'Keeps the car’s computers, locks, lights and screens running — even while the big battery is switched off.',
            how: 'There is no alternator: a DC-DC converter takes power from the high-voltage pack and keeps this small lithium-ion battery charged. It also powers the switches that connect the main battery when you start driving.',
            tip: 'If the 12-volt battery is flat, an EV will not “wake up” — even with a fully charged main battery.'
          },
          brakes: {
            how: 'Most of the time the car slows down with its motors: when you lift off the accelerator they act as generators and push energy back into the battery (regenerative braking). The friction brakes — discs squeezed by calipers — take over for hard stops and the last few km/h.',
            tip: 'Because they are used so little, EV brake pads can last over 150,000 km — but discs can rust, so brake firmly now and then.'
          },
          chassis: {
            how: 'There is no separate frame: the steel and aluminium body is the structure. Big cast front and rear sections hold the suspension and motors, strong side sills protect the battery in a side impact, and the battery pack itself stiffens the floor.',
            tip: 'A stiff structure lets the suspension be tuned more precisely — and protects the battery cells, which must never be crushed.'
          }
        }
      },

      uk: {
        ui: {
          meta: { title: 'Під капотом — як працює електромобіль' },
          nav: { cycle: 'Електромотор' },
          hero: {
            eyebrow: 'Tesla Model Y Long Range · Електро',
            title: 'Як працює електромобіль',
            sub: 'Гортайте, щоб розібрати електричний кросовер деталь за деталлю. Натисніть на будь-яку частину, щоб дізнатися, що вона робить.'
          },
          ch1: { kicker: '01 · Оболонка', title: 'Спершу кузов', text: 'Величезні цільнолиті алюмінієві деталі та жорстка сталева клітка тримають усе — зокрема батарею вагою близько пів тонни.' },
          ch2: { kicker: '02 · Енергія', title: 'Батарея та електроніка', text: 'Замість паливного бака й двигуна — батарея в підлозі та електроніка, що перетворює її енергію на обертове магнітне поле.' },
          ch3: { kicker: '03 · Шлях потужності', title: 'Два мотори, без коробки', text: 'Кожна вісь має власний електромотор з однією постійною передачею. Ні зчеплення, ні перемикань, ні вихлопу.' },
          ch4: { kicker: '04 · Керування', title: 'Гальмувати, кермувати, рекуперувати', text: 'Гальма, кермо й підвіска — а коли ви відпускаєте педаль, мотори сповільнюють авто й заряджають батарею. Тепер натисніть на будь-яку деталь.' },
          cycle: {
            eyebrow: 'Усередині мотора',
            title: 'Як обертається електромотор',
            text: 'Усередині немає вибухів — усю роботу роблять магніти. Електроніка вмикає й вимикає котушки так швидко, що магнітне поле обертається й тягне за собою ротор.',
            open: 'Більше про електромотори',
            strokes: [
              { name: 'Батарея', text: 'Батарея зберігає енергію у вигляді постійного струму (DC) напругою близько 400 вольт.' },
              { name: 'Інвертор', text: 'Інвертор перетворює постійний струм на три змінні (AC), зсунуті в часі, перемикаючись тисячі разів на секунду.' },
              { name: 'Обертове поле', text: 'Три струми живлять котушки статора. Вони по черзі наростають і спадають, і магнітне поле біжить по колу.' },
              { name: 'Ротор', text: 'Магнітний ротор тягнеться за обертовим полем і через постійну передачу крутить колеса. Відпустіть педаль — і він працює навпаки, як генератор.' }
            ],
            labels: { battery: 'Батарея', inverter: 'Інвертор', field: 'Трифазний струм', stator: 'Котушки статора', rotor: 'Ротор' }
          },
          flow: { text: 'Простежте шлях енергії від зарядного порту до шин. Натисніть на крок, щоб відкрити деталь.' },
          cats: { engine: 'Батарея та мотори' },
          footer: { note: 'Навчальний проєкт. Модель створено на основі Tesla Model Y Long Range з двома моторами й повним приводом.' }
        },
        parts: {
          body: {
            how: 'Більша частина кузова — зварені сталь і алюміній, але передня й задня частини днища відлиті як дві величезні цільні алюмінієві деталі замість понад 70 штампованих. Батарея в підлозі робить авто жорсткішим і тримає центр ваги дуже низько.',
            tip: 'Через низько розташовану важку батарею електричні кросовери перекидаються набагато рідше за високі бензинові.'
          },
          frunk: {
            name: 'Фрунк (передній багажник)',
            short: 'Багажник там, де раніше був двигун',
            what: 'Відсік для речей під передньою кришкою, що замикається, — двигуна, який би його займав, немає.',
            how: 'Кришка кріпиться на петлях біля лобового скла, як звичайний капот. Під нею — пластикова ванна для речей, 12-вольтовий акумулятор, бачок гальмівної рідини й частини систем охолодження та кондиціювання.',
            tip: 'Фрунк — ще й зона деформації: без блока двигуна передня частина дуже рівномірно поглинає енергію удару.'
          },
          cabin: {
            how: 'Дах майже повністю з тонованого скла, яке спирається на міцні сталеві стійки захисної клітки. Скло багатошарове й має покриття, що блокує ультрафіолет і більшу частину сонячного тепла.',
            tip: 'Без шуму двигуна гучнішими стають вітер і шини — тому в електромобілях часто ставлять товстіше акустичне скло.'
          },
          hvBattery: {
            name: 'Тягова батарея',
            short: '«Паливний бак» електромобіля',
            what: 'Зберігає енергію, що рухає авто, — близько 75 кВт·год, приблизно на 500 км.',
            how: 'Тисячі циліндричних літій-іонних елементів зібрано в модулі всередині герметичного броньованого корпусу в підлозі. Система керування батареєю стежить за напругою й температурою кожного елемента, а рідинне охолодження тримає їх у комфортних 20–40 °C.',
            tip: 'Батарея служить найдовше, якщо щодня тримати заряд приблизно між 20% і 80%; до 100% заряджайте лише перед далекою поїздкою.'
          },
          motor: {
            name: 'Електромотори',
            short: 'Перетворюють електрику на обертання',
            what: 'Крутять колеса. Тут їх два: на передній і на задній осі, разом вони дають повний привід.',
            how: 'Котушки в нерухомій зовнішній частині (статорі) створюють магнітне поле, що обертається. Ротор усередині тягнеться за ним — у задньому моторі з постійними магнітами, у передньому асинхронний. Повний крутний момент доступний з нуля, тому електромобілі так швидко розганяються. Прогорніть нижче, щоб побачити це в дії.',
            tip: 'Електромотор перетворює на рух близько 90% енергії — бензиновий двигун лише близько 30%.'
          },
          inverter: {
            name: 'Інвертори',
            short: 'Перетворюють постійний струм батареї на змінний для мотора',
            what: 'Керують тим, скільки енергії йде до кожного мотора, — інвертор є «педаллю газу» електромобіля.',
            how: 'Швидкі ключі з карбіду кремнію вмикають і вимикають постійний струм батареї тисячі разів на секунду, створюючи три плавні змінні струми. Зміна їхньої частоти змінює оберти мотора, а зміна сили — крутний момент. Під час гальмування вони працюють навпаки й повертають енергію в батарею.',
            tip: 'Тихе завивання під час розгону електромобіля здебільшого створюють перемикання інвертора й магнітні сили в моторі.'
          },
          reduction: {
            name: 'Редуктор і диференціал',
            short: 'Одна постійна передача замість коробки',
            what: 'Знижує дуже високі оберти мотора до обертів коліс і ділить крутний момент між лівим і правим колесом.',
            how: 'Мотор обертається до приблизно 18 000 об/хв. Дві пари шестерень зменшують це приблизно в 9 разів, тож колеса крутяться в дев’ять разів повільніше, але з дев’ятикратною силою. Електромотор добре працює в усьому діапазоні обертів, тому перемикати передачі не треба.',
            tip: 'Немає перемикань — немає зчеплення, ривків і пауз: розгін плавний аж до максимальної швидкості.'
          },
          driveshaft: {
            name: 'Півосі',
            short: 'Передають крутний момент від кожного мотора до коліс',
            what: 'З’єднують кожен привідний блок із двома його колесами.',
            how: 'Кожна піввісь має шарнір рівних кутових швидкостей (ШРУС) на обох кінцях, тож вона плавно обертається, поки підвіска рухається вгору-вниз, а передні колеса повертаються. Гумові пильовики тримають мастило всередині, а бруд — зовні.',
            tip: 'Порваний пильовик ШРУСа замінити дешево, а ШРУС, зіпсований брудом, — ні. Просіть перевіряти пильовики на кожному ТО.'
          },
          charging: {
            name: 'Зарядний порт і зарядний пристрій',
            short: 'Звідки надходить енергія',
            what: 'Дає змогу заряджати батарею вдома або на швидкій зарядній станції.',
            how: 'Удома вбудований зарядний пристрій перетворює змінний струм (AC) з мережі на постійний (DC), який може зберігати батарея. На швидкій зарядці постійний струм іде прямо в батарею — до приблизно 250 кВт, додаючи близько 250 км запасу ходу за 15 хвилин.',
            tip: 'Що повніша батарея, то повільніше заряджання, тож швидко зарядитися з 10% до 80% набагато вигідніше за кілометр, ніж з 80% до 100%.'
          },
          thermal: {
            name: 'Тепловий насос і охолодження',
            short: 'Тримає батарею, мотори й салон при правильній температурі',
            what: 'Нагріває й охолоджує батарею, мотори, електроніку та салон.',
            how: 'Охолоджувальна рідина тече крізь батарею, мотори й інвертори. Тепловий насос переносить тепло туди, де воно потрібне, — він навіть може забирати відпрацьоване тепло моторів, щоб гріти салон. Розумний багатоходовий клапан спрямовує рідину, а радіатор спереду скидає зайве тепло.',
            tip: 'Узимку прогрівайте авто, поки воно ще підключене до зарядки, — так запас ходу батареї залишиться для поїздки.'
          },
          battery: {
            name: '12-вольтовий акумулятор',
            short: 'Живить світло, екрани й комп’ютери',
            what: 'Підтримує роботу комп’ютерів, замків, світла й екранів — навіть коли велика батарея вимкнена.',
            how: 'Генератора тут немає: DC-DC перетворювач бере енергію від високовольтної батареї й підзаряджає цей невеликий літій-іонний акумулятор. Він також живить вимикачі, що під’єднують головну батарею, коли ви рушаєте.',
            tip: 'Якщо 12-вольтовий акумулятор розряджений, електромобіль не «прокинеться» — навіть із повністю зарядженою головною батареєю.'
          },
          brakes: {
            how: 'Здебільшого автомобіль сповільнюється моторами: коли ви відпускаєте педаль акселератора, вони працюють як генератори й повертають енергію в батарею (рекуперативне гальмування). Фрикційні гальма — диски, які стискають супорти, — вмикаються для різкого гальмування й останніх кількох км/год.',
            tip: 'Оскільки їх використовують нечасто, колодки електромобіля можуть прослужити понад 150 000 км — але диски можуть іржавіти, тож час від часу гальмуйте рішуче.'
          },
          chassis: {
            how: 'Окремої рами немає: сталевий і алюмінієвий кузов і є несучою конструкцією. Великі литі передня й задня частини тримають підвіску та мотори, міцні пороги захищають батарею під час бокового удару, а сама батарея робить підлогу жорсткішою.',
            tip: 'Жорстка конструкція дає точніше налаштувати підвіску — і захищає елементи батареї, які ні в якому разі не можна зминати.'
          }
        }
      },

      ru: {
        ui: {
          meta: { title: 'Под капотом — как работает электромобиль' },
          nav: { cycle: 'Электромотор' },
          hero: {
            eyebrow: 'Tesla Model Y Long Range · Электро',
            title: 'Как работает электромобиль',
            sub: 'Прокручивайте, чтобы разобрать электрический кроссовер деталь за деталью. Нажмите на любую часть, чтобы узнать, что она делает.'
          },
          ch1: { kicker: '01 · Оболочка', title: 'Сначала кузов', text: 'Огромные цельнолитые алюминиевые детали и жёсткая стальная клетка держат всё — в том числе батарею весом около полутонны.' },
          ch2: { kicker: '02 · Энергия', title: 'Батарея и электроника', text: 'Вместо топливного бака и двигателя — батарея в полу и электроника, которая превращает её энергию во вращающееся магнитное поле.' },
          ch3: { kicker: '03 · Путь мощности', title: 'Два мотора, без коробки', text: 'У каждой оси свой электромотор с одной постоянной передачей. Ни сцепления, ни переключений, ни выхлопа.' },
          ch4: { kicker: '04 · Управление', title: 'Тормозить, рулить, рекуперировать', text: 'Тормоза, руль и подвеска — а когда вы отпускаете педаль, моторы замедляют машину и заряжают батарею. Теперь нажмите на любую деталь.' },
          cycle: {
            eyebrow: 'Внутри мотора',
            title: 'Как вращается электромотор',
            text: 'Внутри нет взрывов — всю работу делают магниты. Электроника включает и выключает катушки так быстро, что магнитное поле вращается и тянет за собой ротор.',
            open: 'Подробнее об электромоторах',
            strokes: [
              { name: 'Батарея', text: 'Батарея хранит энергию в виде постоянного тока (DC) напряжением около 400 вольт.' },
              { name: 'Инвертор', text: 'Инвертор превращает постоянный ток в три переменных (AC), сдвинутых во времени, переключаясь тысячи раз в секунду.' },
              { name: 'Вращающееся поле', text: 'Три тока питают катушки статора. Они по очереди нарастают и спадают, и магнитное поле бежит по кругу.' },
              { name: 'Ротор', text: 'Магнитный ротор тянется за вращающимся полем и через постоянную передачу вращает колёса. Отпустите педаль — и он работает наоборот, как генератор.' }
            ],
            labels: { battery: 'Батарея', inverter: 'Инвертор', field: 'Трёхфазный ток', stator: 'Катушки статора', rotor: 'Ротор' }
          },
          flow: { text: 'Проследите путь энергии от зарядного порта до шин. Нажмите на шаг, чтобы открыть деталь.' },
          cats: { engine: 'Батарея и моторы' },
          footer: { note: 'Учебный проект. Модель создана на основе Tesla Model Y Long Range с двумя моторами и полным приводом.' }
        },
        parts: {
          body: {
            how: 'Большая часть кузова — сваренные сталь и алюминий, но передняя и задняя части днища отлиты как две огромные цельные алюминиевые детали вместо более чем 70 штампованных. Батарея в полу делает машину жёстче и держит центр тяжести очень низко.',
            tip: 'Из-за низко расположенной тяжёлой батареи электрические кроссоверы опрокидываются гораздо реже высоких бензиновых.'
          },
          frunk: {
            name: 'Франк (передний багажник)',
            short: 'Багажник там, где раньше был двигатель',
            what: 'Запирающийся отсек для вещей под передней крышкой — двигателя, который бы его занимал, нет.',
            how: 'Крышка крепится на петлях у лобового стекла, как обычный капот. Под ней — пластиковая ванна для вещей, 12-вольтовый аккумулятор, бачок тормозной жидкости и части систем охлаждения и кондиционирования.',
            tip: 'Франк — ещё и зона деформации: без блока двигателя передняя часть очень равномерно поглощает энергию удара.'
          },
          cabin: {
            how: 'Крыша почти целиком из тонированного стекла, которое опирается на прочные стальные стойки защитной клетки. Стекло многослойное и с покрытием, блокирующим ультрафиолет и большую часть солнечного тепла.',
            tip: 'Без шума двигателя громче становятся ветер и шины — поэтому в электромобилях часто ставят более толстое акустическое стекло.'
          },
          hvBattery: {
            name: 'Тяговая батарея',
            short: '«Топливный бак» электромобиля',
            what: 'Хранит энергию, которая движет машину, — около 75 кВт·ч, примерно на 500 км.',
            how: 'Тысячи цилиндрических литий-ионных элементов собраны в модули внутри герметичного бронированного корпуса в полу. Система управления батареей следит за напряжением и температурой каждого элемента, а жидкостное охлаждение держит их в комфортных 20–40 °C.',
            tip: 'Батарея служит дольше всего, если каждый день держать заряд примерно между 20% и 80%; до 100% заряжайте только перед дальней поездкой.'
          },
          motor: {
            name: 'Электромоторы',
            short: 'Превращают электричество во вращение',
            what: 'Вращают колёса. Здесь их два: на передней и на задней оси, вместе они дают полный привод.',
            how: 'Катушки в неподвижной внешней части (статоре) создают вращающееся магнитное поле. Ротор внутри тянется за ним — в заднем моторе с постоянными магнитами, в переднем асинхронный. Полный крутящий момент доступен с нуля, поэтому электромобили так быстро разгоняются. Прокрутите ниже, чтобы увидеть это в действии.',
            tip: 'Электромотор превращает в движение около 90% энергии — бензиновый двигатель лишь около 30%.'
          },
          inverter: {
            name: 'Инверторы',
            short: 'Превращают постоянный ток батареи в переменный для мотора',
            what: 'Управляют тем, сколько энергии идёт к каждому мотору, — инвертор это «педаль газа» электромобиля.',
            how: 'Быстрые ключи из карбида кремния включают и выключают постоянный ток батареи тысячи раз в секунду, создавая три плавных переменных тока. Изменение их частоты меняет обороты мотора, а изменение силы — крутящий момент. При торможении они работают наоборот и возвращают энергию в батарею.',
            tip: 'Тихое завывание при разгоне электромобиля в основном создают переключения инвертора и магнитные силы в моторе.'
          },
          reduction: {
            name: 'Редуктор и дифференциал',
            short: 'Одна постоянная передача вместо коробки',
            what: 'Снижает очень высокие обороты мотора до оборотов колёс и делит крутящий момент между левым и правым колесом.',
            how: 'Мотор вращается примерно до 18 000 об/мин. Две пары шестерён уменьшают это примерно в 9 раз, поэтому колёса крутятся в девять раз медленнее, но с девятикратной силой. Электромотор хорошо работает во всём диапазоне оборотов, поэтому переключать передачи не нужно.',
            tip: 'Нет переключений — нет сцепления, рывков и пауз: разгон плавный вплоть до максимальной скорости.'
          },
          driveshaft: {
            name: 'Полуоси',
            short: 'Передают крутящий момент от каждого мотора к колёсам',
            what: 'Соединяют каждый приводной блок с двумя его колёсами.',
            how: 'У каждой полуоси есть шарнир равных угловых скоростей (ШРУС) на обоих концах, поэтому она плавно вращается, пока подвеска движется вверх-вниз, а передние колёса поворачиваются. Резиновые пыльники держат смазку внутри, а грязь — снаружи.',
            tip: 'Порванный пыльник ШРУСа заменить дёшево, а ШРУС, испорченный грязью, — нет. Просите проверять пыльники на каждом ТО.'
          },
          charging: {
            name: 'Зарядный порт и зарядное устройство',
            short: 'Откуда поступает энергия',
            what: 'Позволяет заряжать батарею дома или на быстрой зарядной станции.',
            how: 'Дома встроенное зарядное устройство превращает переменный ток (AC) из сети в постоянный (DC), который может хранить батарея. На быстрой зарядке постоянный ток идёт прямо в батарею — примерно до 250 кВт, добавляя около 250 км запаса хода за 15 минут.',
            tip: 'Чем полнее батарея, тем медленнее зарядка, поэтому быстро зарядиться с 10% до 80% гораздо выгоднее на километр, чем с 80% до 100%.'
          },
          thermal: {
            name: 'Тепловой насос и охлаждение',
            short: 'Держит батарею, моторы и салон при правильной температуре',
            what: 'Нагревает и охлаждает батарею, моторы, электронику и салон.',
            how: 'Охлаждающая жидкость течёт через батарею, моторы и инверторы. Тепловой насос переносит тепло туда, где оно нужно, — он даже может забирать отработанное тепло моторов, чтобы греть салон. Умный многоходовой клапан направляет жидкость, а радиатор спереди сбрасывает лишнее тепло.',
            tip: 'Зимой прогревайте машину, пока она ещё подключена к зарядке, — так запас хода батареи останется для поездки.'
          },
          battery: {
            name: '12-вольтовый аккумулятор',
            short: 'Питает свет, экраны и компьютеры',
            what: 'Поддерживает работу компьютеров, замков, света и экранов — даже когда большая батарея выключена.',
            how: 'Генератора здесь нет: DC-DC преобразователь берёт энергию от высоковольтной батареи и подзаряжает этот небольшой литий-ионный аккумулятор. Он также питает выключатели, которые подключают главную батарею, когда вы трогаетесь.',
            tip: 'Если 12-вольтовый аккумулятор разряжен, электромобиль не «проснётся» — даже с полностью заряженной главной батареей.'
          },
          brakes: {
            how: 'Чаще всего машина замедляется моторами: когда вы отпускаете педаль акселератора, они работают как генераторы и возвращают энергию в батарею (рекуперативное торможение). Фрикционные тормоза — диски, которые сжимают суппорты, — включаются при резком торможении и на последних нескольких км/ч.',
            tip: 'Поскольку ими пользуются редко, колодки электромобиля могут прослужить больше 150 000 км — но диски могут ржаветь, поэтому время от времени тормозите решительно.'
          },
          chassis: {
            how: 'Отдельной рамы нет: стальной и алюминиевый кузов и есть несущая конструкция. Большие литые передняя и задняя части держат подвеску и моторы, прочные пороги защищают батарею при боковом ударе, а сама батарея делает пол жёстче.',
            tip: 'Жёсткая конструкция позволяет точнее настроить подвеску — и защищает элементы батареи, которые ни в коем случае нельзя сминать.'
          }
        }
      }
    },

    build(K, M, add, refs) {
      const { T, V, PI, mesh, rbox, rboxGeo, box, cylX, cylZ, rod, tube, pivot, beam, gearGeo, extrudeGeo } = K;
      const FA = 1.45; // front axle
      const RA = -1.44; // rear axle
      const WY = 0.355; // wheel centre height (= tyre radius)
      const WZ = 0.82; // half track
      const xray = m => {
        m.userData.xray = true;
        return m;
      };
      function shaft(a, b, r, speed, mat = M.steel) {
        const g = new T.Group();
        const dir = new T.Vector3().subVectors(b, a);
        const len = dir.length();
        g.position.copy(a);
        g.quaternion.setFromUnitVectors(V(1, 0, 0), dir.clone().normalize());
        const spin = new T.Group();
        spin.add(cylX(r, r, len, mat, len / 2, 0, 0, 16));
        spin.userData.spin = { axis: 'x', speed };
        g.add(spin);
        return { group: g, spin, len };
      }

      /* ---- body: smooth fastback sides, no grille */
      const side = new T.Shape();
      side.moveTo(-2.3, 0.28);
      side.lineTo(RA - 0.46, 0.28);
      side.absarc(RA, 0.37, 0.46, PI, 0, true);
      side.lineTo(RA + 0.46, 0.28);
      side.lineTo(FA - 0.46, 0.28);
      side.absarc(FA, 0.37, 0.46, PI, 0, true);
      side.lineTo(FA + 0.46, 0.28);
      side.lineTo(2.28, 0.28);
      side.quadraticCurveTo(2.38, 0.3, 2.39, 0.45);
      side.lineTo(2.38, 0.62);
      side.quadraticCurveTo(2.36, 0.78, 2.2, 0.85);
      side.quadraticCurveTo(1.6, 0.93, 1.0, 0.98);
      side.lineTo(-1.6, 1.04);
      side.lineTo(-2.22, 1.08);
      side.quadraticCurveTo(-2.4, 1.05, -2.39, 0.9);
      side.lineTo(-2.4, 0.45);
      side.quadraticCurveTo(-2.39, 0.28, -2.3, 0.28);
      const sideGeo = extrudeGeo(side, 0.08, 0.035);

      for (const s of [-1, 1]) {
        const g = new T.Group();
        g.position.z = s * 0.89;
        g.add(mesh(sideGeo, M.paint));
        const zf = s * 0.076;
        for (const x of [0.98, -0.15]) g.add(box(0.007, 0.66, 0.006, M.trim, x, 0.68, zf)); // door seams
        g.add(box(0.007, 0.28, 0.006, M.trim, -1.14, 0.9, zf));
        for (const x of [0.25, -0.8]) g.add(box(0.16, 0.012, 0.006, M.trim, x, 0.92, zf)); // flush door handles
        g.add(rbox(1.8, 0.06, 0.03, 0.015, M.trim, 0.0, 0.31, zf * 0.9)); // dark rocker trim
        g.add(rbox(0.1, 0.05, 0.05, 0.02, M.trim, 0.86, 1.03, s * 0.07)); // mirror base
        g.add(rbox(0.14, 0.1, 0.19, 0.045, M.paint, 0.82, 1.08, s * 0.16));
        add('body', g, [0, -0.45, s * 1.9]);
      }

      /* ---- front: smooth nose with slim headlights and a lower air intake */
      const front = new T.Group();
      front.add(rbox(0.3, 0.34, 1.82, 0.12, M.paint, 2.25, 0.46, 0)); // bumper
      front.add(rbox(0.05, 0.06, 1.0, 0.025, M.trim, 2.39, 0.36, 0)); // lower intake
      for (const s of [-1, 1]) {
        const housing = rbox(0.22, 0.075, 0.4, 0.035, M.trim, 2.26, 0.76, s * 0.62);
        housing.rotation.y = s * 0.12;
        front.add(housing);
        const strip = rbox(0.05, 0.03, 0.36, 0.01, M.headlight, 2.34, 0.765, s * 0.6); // LED signature
        strip.rotation.y = s * 0.12;
        front.add(strip);
        front.add(cylX(0.03, 0.03, 0.03, M.headlight, 2.36, 0.75, s * 0.48, 16));
      }
      add('body', front, [0.95, 0.1, 0]);

      /* ---- rear: bumper with diffuser, wraparound taillights */
      const rear = new T.Group();
      rear.add(rbox(0.26, 0.32, 1.82, 0.1, M.paint, -2.3, 0.48, 0));
      rear.add(rbox(0.06, 0.08, 1.4, 0.02, M.trim, -2.4, 0.34, 0)); // diffuser
      for (const s of [-1, 1]) {
        rear.add(rbox(0.12, 0.09, 0.44, 0.035, M.taillight, -2.32, 0.99, s * 0.6));
        rear.add(rbox(0.06, 0.05, 0.16, 0.02, M.taillight, -2.36, 0.48, s * 0.78)); // reflector
      }
      add('body', rear, [-0.95, 0.1, 0]);

      // Liftgate (lower panel and spoiler lip; the glass belongs to the cabin).
      const liftgate = new T.Group();
      liftgate.add(rbox(0.07, 0.48, 1.3, 0.03, M.paint, -2.35, 0.83, 0));
      liftgate.add(rbox(0.12, 0.03, 1.34, 0.012, M.paint, -2.3, 1.085, 0)); // ducktail spoiler
      liftgate.add(rbox(0.02, 0.11, 0.4, 0.01, M.plate, -2.39, 0.72, 0));
      add('body', pivot(liftgate, -2.24, 1.08, 0), [-0.6, 0.9, 0], { rot: [0, 0, -0.9] });

      /* ---- frunk: front lid and the storage tub under it */
      const lidShape = new T.Shape();
      lidShape.moveTo(1.0, 0.995);
      lidShape.quadraticCurveTo(1.6, 0.95, 2.2, 0.865);
      lidShape.quadraticCurveTo(2.33, 0.83, 2.36, 0.77);
      lidShape.lineTo(2.3, 0.77);
      lidShape.quadraticCurveTo(2.27, 0.81, 2.18, 0.825);
      lidShape.quadraticCurveTo(1.6, 0.905, 1.0, 0.955);
      lidShape.lineTo(1.0, 0.995);
      const lid = mesh(extrudeGeo(lidShape, 1.74, 0.015), M.paint);
      add('frunk', pivot(lid, 1.0, 0.975, 0), [0.8, 1.35, 0], { rot: [0, 0, 0.45] });
      add('frunk', rbox(0.5, 0.22, 0.9, 0.06, M.trim, 1.78, 0.66, 0), [0.6, 0.8, 0]);

      /* ---- cabin: glass roof flowing into a fastback rear window */
      const cabin = new T.Group();
      const glassShape = new T.Shape();
      glassShape.moveTo(1.0, 0.99);
      glassShape.quadraticCurveTo(0.5, 1.3, 0.05, 1.54);
      glassShape.quadraticCurveTo(-0.6, 1.66, -1.4, 1.52);
      glassShape.quadraticCurveTo(-1.9, 1.38, -2.2, 1.1);
      glassShape.lineTo(1.0, 0.99);
      const glass = mesh(extrudeGeo(glassShape, 1.66, 0.035), M.glass);
      glass.castShadow = false;
      glass.renderOrder = 2;
      cabin.add(glass);
      const cPillar = new T.Shape();
      cPillar.moveTo(-1.18, 1.06);
      cPillar.lineTo(-1.34, 1.5);
      cPillar.lineTo(-1.62, 1.45);
      cPillar.quadraticCurveTo(-1.95, 1.3, -2.12, 1.1);
      cPillar.lineTo(-1.9, 1.07);
      cPillar.lineTo(-1.18, 1.06);
      const cGeo = extrudeGeo(cPillar, 0.03, 0.012);
      for (const s of [-1, 1]) {
        cabin.add(mesh(cGeo, M.paint, 0, 0, s * 0.875));
        cabin.add(rod(V(1.0, 1.0, s * 0.86), V(0.06, 1.54, s * 0.83), 0.03, M.trim, 10)); // A-pillar
        cabin.add(rbox(0.1, 0.46, 0.03, 0.012, M.trim, -0.15, 1.28, s * 0.86)); // B-pillar
        cabin.add(rod(V(0.06, 1.555, s * 0.84), V(-1.36, 1.535, s * 0.84), 0.016, M.trim, 8)); // roof edge
      }
      cabin.add(rbox(0.36, 0.12, 1.6, 0.05, M.trim, 0.65, 0.94, 0)); // dashboard
      const screen = rbox(0.02, 0.2, 0.36, 0.01, M.screen, 0.5, 1.1, 0);
      screen.rotation.z = 0.25;
      cabin.add(screen);
      const glassNormal = V(0.501, 0.865, 0).normalize();
      for (const pz of [-0.5, 0.15]) {
        const wiper = new T.Group();
        wiper.position.set(0.966, 1.05, pz);
        wiper.quaternion.setFromUnitVectors(V(0, 1, 0), glassNormal);
        const sweep = new T.Group();
        sweep.userData.swing = { axis: 'y', amp: 0.7, speed: 1.6, offset: -0.7 };
        sweep.add(mesh(new T.CylinderGeometry(0.018, 0.018, 0.02, 12), M.trim));
        sweep.add(box(0.012, 0.012, 0.44, M.trim, 0, 0.008, 0.22));
        sweep.add(box(0.02, 0.016, 0.44, M.trim, -0.012, 0.012, 0.45));
        wiper.add(sweep);
        cabin.add(wiper);
      }
      add('cabin', cabin, [0, 1.95, 0]);

      /* ---- seats: white, with integrated headrests */
      function seat(x, z, w, heads, adjustable) {
        const g = new T.Group();
        g.position.set(x, 0.02, z);
        g.add(rbox(0.52, 0.13, w, 0.05, M.seatWhite, 0, 0.53, 0));
        const back = new T.Group();
        back.position.set(-0.26, 0.55, 0);
        back.rotation.z = 0.18;
        back.add(rbox(0.13, 0.52, w, 0.05, M.seatWhite, 0, 0.26, 0));
        for (const hz of heads) back.add(rbox(0.12, 0.18, 0.28, 0.06, M.seatWhite, 0.0, 0.6, hz));
        g.add(back);
        for (const s of [-1, 1]) g.add(box(0.46, 0.04, 0.04, M.darkSteel, 0, 0.45, s * w * 0.32));
        if (adjustable) {
          g.userData.slide = { axis: 'x', amp: 0.06, speed: 0.9 };
          back.userData.swing = { axis: 'z', amp: 0.13, speed: 1.3 };
        }
        return g;
      }
      add('seats', seat(-0.08, -0.42, 0.5, [0], true), [0, 1.15, -0.2]);
      add('seats', seat(-0.08, 0.42, 0.5, [0], true), [0, 1.15, 0.2]);
      add('seats', seat(-1.05, 0, 1.5, [-0.5, 0, 0.5], false), [-0.35, 1.15, 0]);

      /* ---- steering: round wheel, column, rack with electric assist */
      const steer = new T.Group();
      const wheelRing = new T.Group();
      wheelRing.position.set(0.34, 1.04, -0.42);
      wheelRing.rotation.z = -0.42;
      const wheelTurn = new T.Group();
      wheelTurn.userData.swing = { axis: 'x', amp: 1.1, speed: 1.4 };
      wheelRing.add(wheelTurn);
      const ringGeo = new T.TorusGeometry(0.18, 0.024, 12, 48);
      ringGeo.rotateY(PI / 2);
      wheelTurn.add(mesh(ringGeo, M.trim));
      wheelTurn.add(rbox(0.05, 0.1, 0.12, 0.03, M.trim, -0.01, 0, 0));
      wheelTurn.add(box(0.02, 0.03, 0.34, M.alu, 0, -0.01, 0));
      steer.add(wheelRing);
      steer.add(rod(V(0.36, 1.03, -0.42), V(1.2, 0.5, -0.35), 0.022, M.darkSteel));
      steer.add(cylZ(0.032, 1.1, M.steel, 1.25, 0.45, 0));
      steer.add(cylX(0.05, 0.05, 0.12, M.darkSteel, 1.25, 0.5, 0.25));
      for (const s of [-1, 1]) steer.add(rod(V(1.25, 0.45, s * 0.55), V(1.35, 0.42, s * 0.72), 0.016, M.steel));
      add('steering', steer, [-0.1, 0.85, -0.65]);

      /* ---- high-voltage battery pack in the floor, with orange HV cables */
      const pack = new T.Group();
      pack.add(xray(rbox(2.5, 0.14, 1.52, 0.04, M.packCase, -0.02, 0.285, 0)));
      [-0.92, -0.31, 0.3, 0.91].forEach((x, i) => {
        const module = rbox(0.56, 0.085, 1.38, 0.02, M.cells, x, 0.29, 0);
        module.userData.cell = i; // modules light up in turn in the part preview
        pack.add(module);
      });
      const hvFront = [[1.2, 0.33, 0.25], [1.36, 0.42, 0.22], [FA, 0.58, 0.2]];
      const hvRear = [[-1.22, 0.33, 0.25], [-1.36, 0.45, 0.22], [RA, 0.6, 0.2]];
      pack.add(tube(hvFront, 0.022, M.hvOrange, 16));
      pack.add(tube(hvRear, 0.022, M.hvOrange, 16));
      pack.userData.flows = [
        { points: [[0, 0.36, 0.25], ...hvFront], color: 0x7fd8ff, count: 8, speed: 0.5, size: 0.03 },
        { points: [[0, 0.36, 0.25], ...hvRear], color: 0x7fd8ff, count: 8, speed: 0.5, size: 0.03 }
      ];
      pack.userData.previewElev = 0.75;
      add('hvBattery', pack, [0, -0.85, 0]);

      /* ---- drive units: motor, inverter and reduction gear on each axle */
      for (const [x, dir] of [[FA, 1], [RA, -1]]) {
        // Motor: stator coils around a spinning rotor, inside a see-through housing.
        const motor = new T.Group();
        motor.add(xray(cylZ(0.15, 0.3, M.alu, x, 0.42, -0.12, 32)));
        const rotor = new T.Group();
        rotor.position.set(x, 0.42, -0.12);
        rotor.add(cylZ(0.075, 0.26, M.steel, 0, 0, 0, 24));
        rotor.add(box(0.03, 0.15, 0.26, M.plugRed, 0, 0, 0)); // magnet poles, so the turning shows
        rotor.userData.spin = { axis: 'z', speed: 9 };
        motor.add(rotor);
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * PI * 2;
          const coil = rbox(0.06, 0.05, 0.24, 0.015, M.coil, x + Math.cos(a) * 0.115, 0.42 + Math.sin(a) * 0.115, -0.12);
          coil.rotation.z = a;
          coil.userData.cell = i; // lit in sequence: the rotating field
          motor.add(coil);
        }
        // The part preview shows the front unit up close (both are alike).
        add('motor', motor, [dir * 0.35, 0.55, -0.45], { preview: dir === 1 });

        // Inverter: finned box on top, three phase bars down to the motor.
        const inv = new T.Group();
        inv.add(rbox(0.3, 0.12, 0.32, 0.03, M.alu, x, 0.64, 0.06));
        for (let i = 0; i < 5; i++) inv.add(box(0.28, 0.03, 0.012, M.alu, x, 0.715, -0.06 + i * 0.06));
        const phaseColors = [0xff7a2f, 0x4cc3ff, 0x7be07f];
        inv.userData.flows = [];
        for (let p = 0; p < 3; p++) {
          const pts = [[x - 0.08 + p * 0.08, 0.58, -0.04], [x - 0.08 + p * 0.08, 0.56, -0.1], [x - 0.04 + p * 0.04, 0.52, -0.12]];
          inv.add(tube(pts, 0.012, M.hvOrange, 8));
          inv.userData.flows.push({ points: pts, color: phaseColors[p], count: 3, speed: 1.2, size: 0.02 });
        }
        inv.userData.flows.push({ points: [[x, 0.58, 0.2], [x, 0.62, 0.12], [x, 0.64, 0.06]], color: 0x7fd8ff, count: 3, speed: 0.8, size: 0.02 });
        inv.userData.previewElev = 0.5;
        add('inverter', inv, [dir * 0.35, 1.1, 0.05], { preview: dir === 1 });

        // Reduction gear: motor pinion → intermediate gears → final gear on the differential.
        const red = new T.Group();
        // Three meshing gears: small motor pinion → intermediate gear → big final gear.
        red.add(xray(rbox(0.42, 0.48, 0.2, 0.05, M.alu, x, 0.46, 0.13)));
        const g1 = mesh(gearGeo(0.035, 11, 0.04, 'z'), M.chrome, x - 0.08, 0.6, 0.13);
        g1.userData.spin = { axis: 'z', speed: 9 };
        const g2 = mesh(gearGeo(0.08, 24, 0.04, 'z'), M.engine, x, 0.52, 0.13);
        g2.userData.spin = { axis: 'z', speed: -9 * (0.035 / 0.08) };
        const g3 = mesh(gearGeo(0.11, 30, 0.04, 'z'), M.chrome, x + 0.06, 0.34, 0.13);
        g3.userData.spin = { axis: 'z', speed: 9 * (0.035 / 0.11) };
        red.add(g1, g2, g3);
        red.userData.previewElev = 0.3;
        add('reduction', red, [dir * 0.35, 0.45, 0.6], { preview: dir === 1 });
      }

      /* ---- half-shafts with CV boots */
      const shafts = new T.Group();
      for (const x of [FA, RA]) {
        for (const s of [-1, 1]) {
          const hs = shaft(V(x, WY, s * 0.14 + 0.13), V(x, WY, s * 0.68), 0.022, 4);
          for (const u of [0.06, hs.len - 0.06]) hs.spin.add(cylX(0.045, 0.03, 0.08, M.rubber, u, 0, 0, 14));
          shafts.add(hs.group);
        }
      }
      refs.driveshaft = null;
      add('driveshaft', shafts, [0, -0.55, 0]);

      /* ---- charge port and on-board charger */
      const chg = new T.Group();
      chg.add(rbox(0.08, 0.1, 0.04, 0.02, M.trim, -2.15, 1.0, -0.955)); // port in the taillight
      chg.add(rbox(0.07, 0.025, 0.012, 0.005, M.led, -2.15, 1.03, -0.98)); // status light
      chg.add(rbox(0.32, 0.1, 0.26, 0.03, M.alu, -1.62, 0.56, -0.3)); // on-board charger
      const chgPath = [[-2.15, 1.0, -0.93], [-2.0, 0.85, -0.8], [-1.8, 0.62, -0.5], [-1.62, 0.56, -0.3], [-1.4, 0.4, -0.25], [-1.22, 0.33, -0.25]];
      chg.add(tube(chgPath, 0.018, M.hvOrange, 30));
      chg.userData.flows = [{ points: chgPath, color: 0x7be07f, count: 10, speed: 0.4, size: 0.03 }];
      chg.userData.previewElev = 0.5;
      add('charging', chg, [-0.6, 0.55, -0.6]);

      /* ---- thermal system: front radiator and fan, heat pump valve, coolant loops */
      const th = new T.Group();
      th.add(box(0.05, 0.28, 1.1, M.radiator, 2.2, 0.52, 0));
      const fan = new T.Group();
      fan.position.set(2.12, 0.52, 0);
      fan.add(cylX(0.04, 0.04, 0.05, M.darkSteel, 0, 0, 0, 16));
      for (let i = 0; i < 7; i++) {
        const blade = box(0.012, 0.11, 0.06, M.trim, 0, 0, 0);
        const a = (i / 7) * PI * 2;
        blade.position.set(0, Math.cos(a) * 0.075, Math.sin(a) * 0.075);
        blade.rotation.x = -a;
        blade.rotation.y = 0.35;
        fan.add(blade);
      }
      fan.userData.spin = { axis: 'x', speed: 14 };
      refs.fan = fan;
      th.add(fan);
      th.add(rbox(0.2, 0.16, 0.2, 0.04, M.alu, 1.88, 0.56, 0.52)); // heat-pump valve unit
      const cold = [[1.88, 0.52, 0.52], [1.6, 0.4, 0.5], [1.25, 0.34, 0.45], [0.9, 0.34, 0.4]];
      const warm = [[0.9, 0.34, -0.45], [1.25, 0.36, -0.45], [FA, 0.48, -0.3], [1.9, 0.5, -0.35], [2.18, 0.52, -0.4]];
      th.add(tube(cold, 0.018, M.adblue || M.alu, 24));
      th.add(tube(warm, 0.018, M.plugRed, 24));
      th.userData.flows = [
        { points: cold, color: 0x4cc3ff, count: 8, speed: 0.35, size: 0.028 },
        { points: warm, color: 0xff6a3d, count: 10, speed: 0.35, size: 0.028 }
      ];
      th.userData.previewElev = 0.6;
      add('thermal', th, [0.9, 0.55, 0.3]);

      /* ---- 12-volt battery in the frunk area */
      const bat = new T.Group();
      bat.add(rbox(0.22, 0.15, 0.16, 0.02, M.battery, 1.95, 0.72, -0.56));
      for (let i = 0; i < 4; i++) {
        const led = box(0.03, 0.012, 0.02, M.amber, 1.88 + i * 0.045, 0.8, -0.5);
        led.userData.cell = i;
        bat.add(led);
      }
      const dcdc = [[1.9, 0.8, -0.6], [1.8, 0.7, -0.5], [1.6, 0.6, -0.3], [FA + 0.08, 0.6, 0.1]];
      bat.add(tube(dcdc, 0.01, M.plugRed, 20));
      bat.userData.flows = [{ points: dcdc.slice().reverse(), color: 0x7fd8ff, count: 6, speed: 0.6, size: 0.02 }];
      add('battery', bat, [0.5, 1.3, -0.5]);

      /* ---- wheels (aero covers), brakes, suspension */
      const tireProfile = [[0.235, -0.127], [0.31, -0.127], [0.345, -0.105], [0.355, -0.065], [0.355, 0.065], [0.345, 0.105], [0.31, 0.127], [0.235, 0.127]]
        .map(([r, y]) => new T.Vector2(r, y));
      const tireGeo = new T.LatheGeometry(tireProfile, 64);
      tireGeo.rotateX(PI / 2);
      const barrelGeo = new T.CylinderGeometry(0.235, 0.235, 0.22, 40, 1, true);
      barrelGeo.rotateX(PI / 2);
      const coverGeo = new T.CylinderGeometry(0.235, 0.235, 0.02, 48);
      coverGeo.rotateX(PI / 2);
      const spokeGeo = rboxGeo(0.05, 0.18, 0.02, 0.012);
      const discGeo = new T.CylinderGeometry(0.18, 0.18, 0.03, 40);
      discGeo.rotateX(PI / 2);
      const caliperGeo = rboxGeo(0.09, 0.15, 0.08, 0.03);

      refs.wheels = [];
      for (const x of [FA, RA]) {
        for (const s of [-1, 1]) {
          const inPreview = x === FA && s === 1;
          const wheel = new T.Group();
          wheel.position.set(x, WY, s * WZ);
          const spin = new T.Group();
          spin.add(mesh(tireGeo, M.rubber));
          spin.add(mesh(barrelGeo, M.darkSteel));
          spin.add(mesh(coverGeo, M.wheelDark, 0, 0, s * 0.1)); // aero cover
          for (let i = 0; i < 5; i++) {
            const a = (i / 5) * PI * 2;
            const sp = mesh(spokeGeo, M.alu, Math.sin(a) * 0.13, Math.cos(a) * 0.13, s * 0.112);
            sp.rotation.z = -a;
            spin.add(sp);
          }
          spin.add(cylZ(0.045, 0.03, M.alu, 0, 0, s * 0.115, 20));
          spin.userData.spin = { axis: 'z', speed: -3 };
          wheel.add(spin);
          refs.wheels.push(spin);
          add('wheels', wheel, [0, 0.1, s * 1.2], { preview: inPreview });

          const brake = new T.Group();
          brake.position.set(x, WY, s * 0.72);
          const disc = new T.Group();
          disc.add(mesh(discGeo, M.steel));
          disc.userData.spin = { axis: 'z', speed: -3 };
          brake.add(disc);
          brake.add(mesh(caliperGeo, M.alu, -0.12, 0.1, 0));
          add('brakes', brake, [0, 0.1, s * 0.62], { preview: inPreview });

          const sus = new T.Group();
          const sz = s * 0.6, y0 = 0.5, y1 = 0.85;
          const pts = [];
          const turns = 6, n = turns * 16;
          for (let i = 0; i <= n; i++) {
            const a = (i / n) * turns * PI * 2;
            pts.push(V(x + Math.cos(a) * 0.07, y0 + (y1 - y0) * (i / n), sz + Math.sin(a) * 0.07));
          }
          const spring = mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), n * 2, 0.013, 8), M.spring);
          spring.userData.bounce = y0;
          sus.add(spring);
          sus.add(mesh(new T.CylinderGeometry(0.026, 0.026, 0.5, 14), M.darkSteel, x, 0.65, sz));
          sus.add(mesh(new T.CylinderGeometry(0.085, 0.085, 0.02, 20), M.darkSteel, x, y1 + 0.01, sz));
          sus.add(rod(V(x + 0.15, 0.3, s * 0.42), V(x, 0.3, s * 0.68), 0.018, M.alu));
          sus.add(rod(V(x - 0.15, 0.3, s * 0.42), V(x, 0.3, s * 0.68), 0.018, M.alu));
          sus.add(rod(V(x + 0.1, 0.7, s * 0.45), V(x, 0.66, s * 0.66), 0.015, M.alu));
          add('suspension', sus, [0, 0.5, s * 0.3], { preview: inPreview });
        }
      }

      /* ---- chassis: front and rear mega-castings, sills, floor */
      const ch = new T.Group();
      ch.add(xray(rbox(0.75, 0.22, 1.25, 0.06, M.casting, 1.92, 0.47, 0))); // front casting
      ch.add(xray(rbox(0.85, 0.26, 1.35, 0.06, M.casting, -1.95, 0.5, 0))); // rear casting
      ch.add(xray(rbox(2.5, 0.02, 1.6, 0.01, M.floor, -0.02, 0.38, 0))); // floor over the battery
      const rail = (a, b, w = 0.1, h = 0.12) => ch.add(beam(V(...a), V(...b), w, h, M.darkSteel));
      for (const s of [-1, 1]) {
        rail([1.6, 0.42, s * 0.5], [1.25, 0.34, s * 0.86]);
        rail([1.25, 0.34, s * 0.86], [-1.3, 0.34, s * 0.86], 0.12, 0.16); // sills
        rail([-1.3, 0.34, s * 0.86], [-1.6, 0.45, s * 0.55]);
      }
      for (const x of [1.2, 0.35, -0.45, -1.25]) ch.add(rbox(0.08, 0.06, 1.7, 0.02, M.darkSteel, x, 0.39, 0));
      ch.userData.flows = [-1, 1].map(s => ({
        points: [[2.2, 0.55, s * 0.4], [1.6, 0.5, s * 0.5], [1.25, 0.42, s * 0.86], [-1.3, 0.42, s * 0.86], [-1.6, 0.53, s * 0.55], [-2.3, 0.6, s * 0.45]],
        color: 0x7be07f, count: 12, speed: 0.16, size: 0.045
      }));
      add('chassis', ch, [0, -1.45, 0]);
    }
  };
})();

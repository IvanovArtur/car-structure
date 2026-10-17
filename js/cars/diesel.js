/* Diesel: Mercedes-Benz GLK 250 BlueTEC 4MATIC (X204, 2013–2015).
   About 4.54 m long, 1.84 m wide, 1.69 m tall, 2.755 m wheelbase. A longitudinal
   2.1-litre turbo-diesel four drives a 7-speed automatic and a transfer case that
   sends power to both axles; the body is a steel unibody. */
(function () {
  'use strict';
  window.CARS = window.CARS || {};

  window.CARS.diesel = {
    id: 'diesel',
    page: 'diesel.html',
    cycle: 'diesel',
    smokeEvery: 0.16, // clean diesel: only a faint haze

    parts: [
      { id: 'body', cat: 'body', related: ['hood', 'cabin', 'chassis'] },
      { id: 'hood', cat: 'body', related: ['engine', 'body'] },
      { id: 'cabin', cat: 'body', related: ['seats', 'body'] },
      { id: 'seats', cat: 'body', related: ['cabin', 'steering'] },
      { id: 'steering', cat: 'chassis', related: ['wheels', 'suspension'] },
      { id: 'engine', cat: 'engine', related: ['turbo', 'fuel', 'exhaust', 'transmission'] },
      { id: 'turbo', cat: 'engine', related: ['engine', 'exhaust'] },
      { id: 'radiator', cat: 'engine', related: ['engine', 'turbo'] },
      { id: 'battery', cat: 'engine', related: ['engine'] },
      { id: 'fuel', cat: 'engine', related: ['engine', 'exhaust'] },
      { id: 'exhaust', cat: 'engine', related: ['engine', 'adblue', 'turbo'] },
      { id: 'adblue', cat: 'engine', related: ['exhaust'] },
      { id: 'transmission', cat: 'drivetrain', related: ['engine', 'transferCase'] },
      { id: 'transferCase', cat: 'drivetrain', related: ['transmission', 'driveshaft'] },
      { id: 'driveshaft', cat: 'drivetrain', related: ['transferCase', 'differential'] },
      { id: 'differential', cat: 'drivetrain', related: ['driveshaft', 'wheels'] },
      { id: 'wheels', cat: 'drivetrain', related: ['brakes', 'suspension'] },
      { id: 'brakes', cat: 'chassis', related: ['wheels'] },
      { id: 'suspension', cat: 'chassis', related: ['wheels', 'chassis'] },
      { id: 'chassis', cat: 'chassis', related: ['body', 'suspension'] }
    ],

    flow: ['fuel', 'engine', 'transmission', 'transferCase', 'driveshaft', 'differential', 'wheels'],
    // Parts whose first service tip is featured in the "At the car service" section.
    service: ['exhaust', 'engine', 'turbo', 'adblue', 'brakes', 'transferCase', 'battery', 'fuel'],

    // Palladium-silver metallic paint.
    look: { paint: { color: 0xaab0b8, metalness: 0.55, roughness: 0.3 }, glass: { color: 0x2a3644, opacity: 0.62 } },

    materials: std => ({
      alu: std(0xb9bfc7, 0.35, 0.85),
      alloy: std(0xd7dbe0, 0.22, 0.92),
      leather: std(0xb39b80, 0.6, 0.05),
      cladding: std(0x25282d, 0.78, 0.1),
      engineCover: std(0x1b1d21, 0.5, 0.2),
      adblue: std(0x2f6fbf, 0.45, 0.2)
    }),

    stages: {
      body: [0.04, 0.36], hood: [0.04, 0.32], cabin: [0.06, 0.36],
      seats: [0.22, 0.52], steering: [0.24, 0.54],
      engine: [0.3, 0.6], turbo: [0.32, 0.62], radiator: [0.3, 0.58], battery: [0.32, 0.6],
      fuel: [0.36, 0.66], exhaust: [0.36, 0.68], adblue: [0.38, 0.68],
      transmission: [0.46, 0.74], transferCase: [0.47, 0.75], driveshaft: [0.48, 0.78], differential: [0.5, 0.8],
      wheels: [0.58, 0.88], brakes: [0.62, 0.9], suspension: [0.6, 0.88], chassis: [0.62, 0.93]
    },

    view: { radius: [8.8, 15.6], targetY: [0.7, 2.25], lift: 1.6 },

    i18n: {
      en: {
        ui: {
          meta: { title: 'Under the Hood — How a diesel car works' },
          hero: {
            eyebrow: 'Mercedes-Benz GLK 250 BlueTEC 4MATIC · Diesel',
            title: 'How a diesel car works',
            sub: 'Scroll to take a diesel SUV apart, piece by piece. Click any part to learn what it does.'
          },
          ch1: { kicker: '01 · The shell', title: 'Body first', text: 'A steel unibody protects you and carries every other part. Watch it come apart.' },
          ch2: { kicker: '02 · The heart', title: 'Diesel & air', text: 'No spark plugs here: the engine squeezes air until it is hot enough to ignite the fuel. A turbo, an intercooler and a clean-exhaust system help it along.' },
          ch3: { kicker: '03 · The power path', title: 'Four driven wheels', text: 'A 7-speed automatic and a transfer case send power to both axles through two driveshafts and two differentials.' },
          ch4: { kicker: '04 · Control', title: 'Stop, steer, absorb', text: 'Brakes, steering and suspension turn torque into a car you can control. Now click any part.' },
          cycle: {
            eyebrow: 'Inside the engine',
            title: 'The diesel cycle',
            text: 'A diesel also works in four strokes — but it has no spark plug. Squeezing air makes it so hot that fuel ignites by itself the moment it is injected.',
            open: 'Learn about the diesel engine',
            strokes: [
              { name: 'Intake', text: 'The piston moves down and pulls in air only — no fuel yet. The turbocharger pushes extra air in.' },
              { name: 'Compression', text: 'The piston squeezes the air to about a sixteenth of its volume. That heats it to over 500 °C.' },
              { name: 'Power', text: 'The injector sprays a fine mist of diesel into the hot air. It ignites instantly and drives the piston down.' },
              { name: 'Exhaust', text: 'The exhaust valve opens and the piston pushes the burnt gases out — on to the turbo and the exhaust cleaning system.' }
            ],
            labels: { mix: 'Air', exhaust: 'Exhaust', spark: 'Injector', piston: 'Piston', crank: 'Crankshaft' }
          },
          flow: { title: 'How power reaches all four wheels' },
          footer: { note: 'A learning project. The model is based on the Mercedes-Benz GLK 250 BlueTEC 4MATIC — a diesel SUV with all-wheel drive.' }
        },
        parts: {
          engine: {
            name: 'Diesel engine',
            short: 'Ignites fuel by compression alone',
            what: 'Burns diesel fuel to make power. This one is a 2.1-litre four-cylinder with about 150 kW (204 hp) and a strong 500 N·m of torque.',
            how: 'Diesel engines have no spark plugs. The piston squeezes air so hard (about 16:1) that it gets hotter than 500 °C, and when the injectors spray in fuel it ignites by itself. Glow plugs pre-heat the cylinders for cold starts. Scroll down to see the diesel cycle.',
            tip: 'Diesels are roughly a third more efficient than petrol engines, which is why they are popular for long distances and towing.'
          },
          turbo: {
            name: 'Turbocharger & intercooler',
            short: 'Uses the exhaust to pump in more air',
            what: 'Forces extra air into the engine, so a small engine can burn more fuel and make more power.',
            how: 'Hot exhaust gas spins a turbine wheel at up to 200,000 rpm. On the same shaft, a compressor wheel squeezes fresh air into the engine. Squeezed air gets hot, so the intercooler — a small radiator for air — cools it, which packs even more oxygen into each cylinder.',
            tip: 'After hard driving, let the engine idle for a few seconds before switching off: the oil keeps cooling the very hot turbo.'
          },
          fuel: {
            name: 'Fuel tank & common rail',
            short: 'Stores diesel and injects it at huge pressure',
            what: 'Stores the diesel and delivers it to the injectors at extremely high pressure.',
            how: 'A pump in the tank sends fuel to a high-pressure pump on the engine, which pushes it into a shared tube — the common rail — at up to 2,000 bar. Electronic injectors open several times per stroke, spraying tiny, precise doses that burn quietly and cleanly.',
            tip: 'Never fill a diesel car with petrol: petrol does not lubricate the high-pressure pump and can destroy it within minutes.'
          },
          exhaust: {
            name: 'Exhaust & emissions system',
            short: 'Traps soot and cleans the gases',
            what: 'Carries the exhaust away and removes most of the soot and nitrogen oxides before they leave the car.',
            how: 'An oxidation catalyst burns off carbon monoxide and unburnt fuel. The diesel particulate filter (DPF) traps soot in a ceramic honeycomb and burns it off from time to time. Then the SCR catalyst uses AdBlue to turn nitrogen oxides (NOx) into harmless nitrogen and water.',
            tip: 'Lots of very short trips can clog a DPF, because it never gets hot enough to clean itself. A longer drive at highway speed helps it regenerate.'
          },
          adblue: {
            name: 'AdBlue tank',
            short: 'A fluid that neutralises NOx',
            what: 'Stores AdBlue — a mix of urea and purified water — for the SCR exhaust cleaning system.',
            how: 'A pump sprays small doses of AdBlue into the hot exhaust just before the SCR catalyst. There it turns into ammonia, which reacts with nitrogen oxides and converts them into nitrogen and water vapour.',
            tip: 'A full tank lasts thousands of kilometres. If it runs empty, the car warns you and may refuse to start until you top it up.'
          },
          transmission: {
            name: 'Automatic gearbox (7-speed)',
            short: 'Changes gear by itself',
            what: 'Keeps the engine in its efficient speed range by choosing one of seven gears automatically.',
            how: 'A torque converter — a fluid coupling — lets the car creep and pull away smoothly. Inside, planetary gear sets are locked in different combinations by hydraulic clutches, controlled by a computer that reads speed, load and pedal position.',
            tip: 'Diesels have a narrow rev range, so seven or more gears help them stay in their sweet spot for pulling power and economy.'
          },
          transferCase: {
            name: 'Transfer case (4MATIC)',
            short: 'Splits power between front and rear',
            what: 'Divides the engine’s power between the front and rear axles for all-wheel drive.',
            how: 'Bolted to the back of the gearbox, it sends about 45% of the torque to the front axle and 55% to the rear. A centre differential lets the axles turn at slightly different speeds in corners, and a second driveshaft runs forward alongside the engine to the front differential.',
            tip: 'All-wheel drive helps you pull away on snow and mud — but it does not help you stop. Braking grip still depends on the tyres.'
          },
          driveshaft: {
            name: 'Driveshafts',
            short: 'Carry power to both axles and all four wheels',
            what: 'Carry rotation from the transfer case to the front and rear differentials, and from them to each wheel.',
            how: 'Two propeller shafts run to the front and rear differentials. From there, short half-shafts with constant-velocity (CV) joints turn the wheels, flexing as the suspension moves and the front wheels steer.',
            tip: 'A clicking noise when turning sharply is a classic sign of a worn CV joint.'
          },
          differential: {
            name: 'Front & rear differentials',
            short: 'Let the wheels turn at different speeds',
            what: 'Split the power between the left and right wheels on each axle and let them turn at different speeds in corners.'
          }
        }
      },

      uk: {
        ui: {
          meta: { title: 'Під капотом — як працює дизельний автомобіль' },
          hero: {
            eyebrow: 'Mercedes-Benz GLK 250 BlueTEC 4MATIC · Дизель',
            title: 'Як працює дизельний автомобіль',
            sub: 'Гортайте, щоб розібрати дизельний позашляховик деталь за деталлю. Натисніть на будь-яку частину, щоб дізнатися, що вона робить.'
          },
          ch1: { kicker: '01 · Оболонка', title: 'Спершу кузов', text: 'Сталевий несучий кузов захищає вас і тримає всі інші деталі. Дивіться, як він розбирається.' },
          ch2: { kicker: '02 · Серце', title: 'Дизель і повітря', text: 'Свічок запалювання тут немає: двигун стискає повітря, доки воно не стане достатньо гарячим, щоб підпалити пальне. Йому допомагають турбіна, інтеркулер і система очищення вихлопу.' },
          ch3: { kicker: '03 · Шлях потужності', title: 'Чотири ведучі колеса', text: '7-ступінчастий автомат і роздавальна коробка передають потужність на обидві осі через два карданні вали та два диференціали.' },
          ch4: { kicker: '04 · Керування', title: 'Гальмувати, кермувати, поглинати', text: 'Гальма, кермо та підвіска перетворюють крутний момент на автомобіль, яким можна керувати. Тепер натисніть на будь-яку деталь.' },
          cycle: {
            eyebrow: 'Усередині двигуна',
            title: 'Дизельний цикл',
            text: 'Дизель теж працює в чотири такти — але свічки запалювання в нього немає. Стиснене повітря так нагрівається, що пальне спалахує саме, щойно його впорскують.',
            open: 'Більше про дизельний двигун',
            strokes: [
              { name: 'Впуск', text: 'Поршень рухається вниз і втягує лише повітря — пального ще немає. Турбіна заганяє додаткове повітря.' },
              { name: 'Стиск', text: 'Поршень стискає повітря приблизно в шістнадцять разів. Від цього воно нагрівається понад 500 °C.' },
              { name: 'Робочий хід', text: 'Форсунка розпилює дрібний туман дизельного пального в гаряче повітря. Воно миттєво спалахує й штовхає поршень униз.' },
              { name: 'Випуск', text: 'Випускний клапан відкривається, і поршень виштовхує відпрацьовані гази — далі до турбіни та системи очищення вихлопу.' }
            ],
            labels: { mix: 'Повітря', exhaust: 'Вихлоп', spark: 'Форсунка', piston: 'Поршень', crank: 'Колінвал' }
          },
          flow: { title: 'Як потужність доходить до всіх чотирьох коліс' },
          footer: { note: 'Навчальний проєкт. Модель створено на основі Mercedes-Benz GLK 250 BlueTEC 4MATIC — дизельного позашляховика з повним приводом.' }
        },
        parts: {
          engine: {
            name: 'Дизельний двигун',
            short: 'Підпалює пальне самим лише стиском',
            what: 'Спалює дизельне пальне, щоб створити потужність. Тут це 2,1-літровий чотирициліндровий двигун потужністю близько 150 кВт (204 к. с.) із великим крутним моментом 500 Н·м.',
            how: 'У дизеля немає свічок запалювання. Поршень так сильно стискає повітря (приблизно 16:1), що воно нагрівається понад 500 °C, і пальне з форсунок спалахує саме. Свічки розжарювання прогрівають циліндри для холодного пуску. Прогорніть нижче, щоб побачити дизельний цикл.',
            tip: 'Дизелі приблизно на третину ефективніші за бензинові двигуни — тому їх люблять для далеких поїздок і буксирування.'
          },
          turbo: {
            name: 'Турбокомпресор та інтеркулер',
            short: 'Використовує вихлоп, щоб нагнітати більше повітря',
            what: 'Заганяє в двигун додаткове повітря, тож невеликий двигун може спалювати більше пального й видавати більше потужності.',
            how: 'Гарячі вихлопні гази розкручують колесо турбіни до 200 000 об/хв. На тому самому валу колесо компресора стискає свіже повітря й подає його в двигун. Стиснене повітря нагрівається, тому інтеркулер — маленький радіатор для повітря — охолоджує його, і в кожен циліндр потрапляє ще більше кисню.',
            tip: 'Після активної їзди дайте двигуну кілька секунд попрацювати на холостих перед вимкненням: олива ще охолоджує дуже гарячу турбіну.'
          },
          fuel: {
            name: 'Паливний бак і Common Rail',
            short: 'Зберігає дизель і впорскує його під величезним тиском',
            what: 'Зберігає дизельне пальне й подає його до форсунок під надзвичайно високим тиском.',
            how: 'Насос у баку подає пальне до насоса високого тиску на двигуні, а той заганяє його в спільну трубку — паливну рампу (Common Rail) — під тиском до 2000 бар. Електронні форсунки відкриваються кілька разів за такт і впорскують крихітні точні порції, що згоряють тихо й чисто.',
            tip: 'Ніколи не заливайте бензин у дизельний автомобіль: бензин не змащує насос високого тиску й може зруйнувати його за лічені хвилини.'
          },
          exhaust: {
            name: 'Вихлоп і система очищення',
            short: 'Затримує сажу й очищує гази',
            what: 'Відводить вихлопні гази й прибирає більшу частину сажі та оксидів азоту, перш ніж вони покинуть автомобіль.',
            how: 'Окиснювальний каталізатор допалює чадний газ і незгоріле пальне. Сажовий фільтр (DPF) затримує сажу в керамічних стільниках і час від часу її випалює. Далі каталізатор SCR за допомогою AdBlue перетворює оксиди азоту (NOx) на нешкідливі азот і воду.',
            tip: 'Багато дуже коротких поїздок можуть забити DPF, бо він не встигає нагрітися достатньо, щоб очиститися. Довша поїздка трасою допомагає йому регенеруватися.'
          },
          adblue: {
            name: 'Бак AdBlue',
            short: 'Рідина, що знешкоджує NOx',
            what: 'Зберігає AdBlue — суміш сечовини й очищеної води — для системи очищення вихлопу SCR.',
            how: 'Насос упорскує невеликі дози AdBlue в гарячий вихлоп перед каталізатором SCR. Там рідина перетворюється на аміак, який реагує з оксидами азоту й перетворює їх на азот і водяну пару.',
            tip: 'Повного бака вистачає на тисячі кілометрів. Якщо він спорожніє, автомобіль попередить і може не завестися, доки ви не доллєте рідину.'
          },
          transmission: {
            name: 'Автоматична коробка (7 передач)',
            short: 'Перемикає передачі сама',
            what: 'Тримає двигун в ефективному діапазоні обертів, автоматично обираючи одну із семи передач.',
            how: 'Гідротрансформатор — рідинна муфта — дає автомобілю плавно рушати й повзти. Усередині планетарні ряди блокуються в різних комбінаціях гідравлічними муфтами, якими керує комп’ютер, що стежить за швидкістю, навантаженням і положенням педалі.',
            tip: 'У дизеля вузький діапазон обертів, тож сім і більше передач допомагають йому лишатися в зоні найкращої тяги й економності.'
          },
          transferCase: {
            name: 'Роздавальна коробка (4MATIC)',
            short: 'Ділить потужність між передньою і задньою осями',
            what: 'Розподіляє потужність двигуна між передньою і задньою осями для повного приводу.',
            how: 'Вона прикручена позаду коробки передач і віддає приблизно 45% крутного моменту на передню вісь і 55% — на задню. Міжосьовий диференціал дає осям обертатися з трохи різною швидкістю в поворотах, а другий карданний вал іде вперед уздовж двигуна до переднього диференціала.',
            tip: 'Повний привід допомагає рушити на снігу й багнюці — але не допомагає зупинитися. Гальмівне зчеплення все одно залежить від шин.'
          },
          driveshaft: {
            name: 'Карданні вали та півосі',
            short: 'Передають потужність на обидві осі та всі чотири колеса',
            what: 'Передають обертання від роздавальної коробки до переднього й заднього диференціалів, а від них — до кожного колеса.',
            how: 'Два карданні вали йдуть до переднього й заднього диференціалів. Звідти короткі півосі з шарнірами рівних кутових швидкостей (ШРУС) крутять колеса, згинаючись, коли працює підвіска й повертаються передні колеса.',
            tip: 'Клацання під час різкого повороту — класична ознака зношеного ШРУСа.'
          },
          differential: {
            name: 'Передній і задній диференціали',
            short: 'Дають колесам крутитися з різною швидкістю',
            what: 'Ділять потужність між лівим і правим колесом на кожній осі та дозволяють їм обертатися з різною швидкістю в поворотах.'
          }
        }
      },

      ru: {
        ui: {
          meta: { title: 'Под капотом — как работает дизельный автомобиль' },
          hero: {
            eyebrow: 'Mercedes-Benz GLK 250 BlueTEC 4MATIC · Дизель',
            title: 'Как работает дизельный автомобиль',
            sub: 'Прокручивайте, чтобы разобрать дизельный внедорожник деталь за деталью. Нажмите на любую часть, чтобы узнать, что она делает.'
          },
          ch1: { kicker: '01 · Оболочка', title: 'Сначала кузов', text: 'Стальной несущий кузов защищает вас и держит все остальные детали. Смотрите, как он разбирается.' },
          ch2: { kicker: '02 · Сердце', title: 'Дизель и воздух', text: 'Свечей зажигания здесь нет: двигатель сжимает воздух, пока тот не станет достаточно горячим, чтобы поджечь топливо. Ему помогают турбина, интеркулер и система очистки выхлопа.' },
          ch3: { kicker: '03 · Путь мощности', title: 'Четыре ведущих колеса', text: '7-ступенчатый автомат и раздаточная коробка передают мощность на обе оси через два карданных вала и два дифференциала.' },
          ch4: { kicker: '04 · Управление', title: 'Тормозить, рулить, смягчать', text: 'Тормоза, рулевое управление и подвеска превращают крутящий момент в автомобиль, которым можно управлять. Теперь нажмите на любую деталь.' },
          cycle: {
            eyebrow: 'Внутри двигателя',
            title: 'Дизельный цикл',
            text: 'Дизель тоже работает в четыре такта — но свечи зажигания у него нет. Сжатый воздух так нагревается, что топливо вспыхивает само, как только его впрыскивают.',
            open: 'Подробнее о дизельном двигателе',
            strokes: [
              { name: 'Впуск', text: 'Поршень движется вниз и втягивает только воздух — топлива ещё нет. Турбина нагнетает дополнительный воздух.' },
              { name: 'Сжатие', text: 'Поршень сжимает воздух примерно в шестнадцать раз. От этого он нагревается выше 500 °C.' },
              { name: 'Рабочий ход', text: 'Форсунка распыляет мелкий туман дизельного топлива в горячий воздух. Он мгновенно вспыхивает и толкает поршень вниз.' },
              { name: 'Выпуск', text: 'Выпускной клапан открывается, и поршень выталкивает отработавшие газы — дальше к турбине и системе очистки выхлопа.' }
            ],
            labels: { mix: 'Воздух', exhaust: 'Выхлоп', spark: 'Форсунка', piston: 'Поршень', crank: 'Коленвал' }
          },
          flow: { title: 'Как мощность доходит до всех четырёх колёс' },
          footer: { note: 'Учебный проект. Модель создана на основе Mercedes-Benz GLK 250 BlueTEC 4MATIC — дизельного внедорожника с полным приводом.' }
        },
        parts: {
          engine: {
            name: 'Дизельный двигатель',
            short: 'Поджигает топливо одним лишь сжатием',
            what: 'Сжигает дизельное топливо, чтобы создать мощность. Здесь это 2,1-литровый четырёхцилиндровый двигатель мощностью около 150 кВт (204 л. с.) с большим крутящим моментом 500 Н·м.',
            how: 'У дизеля нет свечей зажигания. Поршень так сильно сжимает воздух (примерно 16:1), что тот нагревается выше 500 °C, и топливо из форсунок вспыхивает само. Свечи накаливания прогревают цилиндры для холодного пуска. Прокрутите ниже, чтобы увидеть дизельный цикл.',
            tip: 'Дизели примерно на треть эффективнее бензиновых двигателей — поэтому их любят для дальних поездок и буксировки.'
          },
          turbo: {
            name: 'Турбокомпрессор и интеркулер',
            short: 'Использует выхлоп, чтобы нагнетать больше воздуха',
            what: 'Нагнетает в двигатель дополнительный воздух, поэтому небольшой двигатель может сжигать больше топлива и выдавать больше мощности.',
            how: 'Горячие выхлопные газы раскручивают колесо турбины до 200 000 об/мин. На том же валу колесо компрессора сжимает свежий воздух и подаёт его в двигатель. Сжатый воздух нагревается, поэтому интеркулер — маленький радиатор для воздуха — охлаждает его, и в каждый цилиндр попадает ещё больше кислорода.',
            tip: 'После активной езды дайте двигателю несколько секунд поработать на холостых перед выключением: масло ещё охлаждает очень горячую турбину.'
          },
          fuel: {
            name: 'Топливный бак и Common Rail',
            short: 'Хранит дизель и впрыскивает его под огромным давлением',
            what: 'Хранит дизельное топливо и подаёт его к форсункам под чрезвычайно высоким давлением.',
            how: 'Насос в баке подаёт топливо к насосу высокого давления на двигателе, а тот нагнетает его в общую трубку — топливную рампу (Common Rail) — под давлением до 2000 бар. Электронные форсунки открываются несколько раз за такт и впрыскивают крошечные точные порции, которые сгорают тихо и чисто.',
            tip: 'Никогда не заливайте бензин в дизельный автомобиль: бензин не смазывает насос высокого давления и может разрушить его за считанные минуты.'
          },
          exhaust: {
            name: 'Выхлоп и система очистки',
            short: 'Задерживает сажу и очищает газы',
            what: 'Отводит выхлопные газы и убирает большую часть сажи и оксидов азота, прежде чем они покинут автомобиль.',
            how: 'Окислительный катализатор дожигает угарный газ и несгоревшее топливо. Сажевый фильтр (DPF) задерживает сажу в керамических сотах и время от времени её выжигает. Затем катализатор SCR с помощью AdBlue превращает оксиды азота (NOx) в безвредные азот и воду.',
            tip: 'Много очень коротких поездок могут забить DPF, потому что он не успевает нагреться достаточно, чтобы очиститься. Более долгая поездка по трассе помогает ему регенерироваться.'
          },
          adblue: {
            name: 'Бак AdBlue',
            short: 'Жидкость, обезвреживающая NOx',
            what: 'Хранит AdBlue — смесь мочевины и очищенной воды — для системы очистки выхлопа SCR.',
            how: 'Насос впрыскивает небольшие дозы AdBlue в горячий выхлоп перед катализатором SCR. Там жидкость превращается в аммиак, который реагирует с оксидами азота и превращает их в азот и водяной пар.',
            tip: 'Полного бака хватает на тысячи километров. Если он опустеет, автомобиль предупредит и может не завестись, пока вы не дольёте жидкость.'
          },
          transmission: {
            name: 'Автоматическая коробка (7 передач)',
            short: 'Переключает передачи сама',
            what: 'Держит двигатель в эффективном диапазоне оборотов, автоматически выбирая одну из семи передач.',
            how: 'Гидротрансформатор — жидкостная муфта — позволяет автомобилю плавно трогаться и ползти. Внутри планетарные ряды блокируются в разных комбинациях гидравлическими муфтами, которыми управляет компьютер, следящий за скоростью, нагрузкой и положением педали.',
            tip: 'У дизеля узкий диапазон оборотов, поэтому семь и больше передач помогают ему оставаться в зоне лучшей тяги и экономичности.'
          },
          transferCase: {
            name: 'Раздаточная коробка (4MATIC)',
            short: 'Делит мощность между передней и задней осями',
            what: 'Распределяет мощность двигателя между передней и задней осями для полного привода.',
            how: 'Она прикручена позади коробки передач и отдаёт примерно 45% крутящего момента на переднюю ось и 55% — на заднюю. Межосевой дифференциал позволяет осям вращаться с немного разной скоростью в поворотах, а второй карданный вал идёт вперёд вдоль двигателя к переднему дифференциалу.',
            tip: 'Полный привод помогает тронуться на снегу и в грязи — но не помогает остановиться. Тормозное сцепление всё равно зависит от шин.'
          },
          driveshaft: {
            name: 'Карданные валы и полуоси',
            short: 'Передают мощность на обе оси и все четыре колеса',
            what: 'Передают вращение от раздаточной коробки к переднему и заднему дифференциалам, а от них — к каждому колесу.',
            how: 'Два карданных вала идут к переднему и заднему дифференциалам. Оттуда короткие полуоси с шарнирами равных угловых скоростей (ШРУС) вращают колёса, изгибаясь, когда работает подвеска и поворачиваются передние колёса.',
            tip: 'Щелчки при резком повороте — классический признак изношенного ШРУСа.'
          },
          differential: {
            name: 'Передний и задний дифференциалы',
            short: 'Позволяют колёсам вращаться с разной скоростью',
            what: 'Делят мощность между левым и правым колесом на каждой оси и позволяют им вращаться с разной скоростью в поворотах.'
          }
        }
      }
    },

    build(K, M, add, refs) {
      const { T, V, PI, mesh, rbox, rboxGeo, box, cylX, cylZ, rod, tube, pivot, beam, gearGeo, extrudeGeo } = K;
      const FA = 1.38; // front axle
      const RA = -1.375; // rear axle
      const WY = 0.36; // wheel centre height (= tyre radius)
      const WZ = 0.8; // half track
      const xray = m => {
        m.userData.xray = true;
        return m;
      };
      // A shaft between two points that can spin around its own axis (in the part preview).
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

      /* ---- body: boxy sides with dark cladding and wheel-arch flares */
      const side = new T.Shape();
      side.moveTo(-2.22, 0.3);
      side.lineTo(RA - 0.47, 0.3);
      side.absarc(RA, 0.38, 0.47, PI, 0, true);
      side.lineTo(RA + 0.47, 0.3);
      side.lineTo(FA - 0.47, 0.3);
      side.absarc(FA, 0.38, 0.47, PI, 0, true);
      side.lineTo(FA + 0.47, 0.3);
      side.lineTo(2.14, 0.3);
      side.quadraticCurveTo(2.24, 0.32, 2.25, 0.45);
      side.lineTo(2.26, 0.88);
      side.quadraticCurveTo(2.26, 0.98, 2.14, 1.0);
      side.lineTo(0.95, 1.08);
      side.lineTo(-1.95, 1.11);
      side.lineTo(-2.22, 1.11);
      side.quadraticCurveTo(-2.3, 1.1, -2.3, 1.0);
      side.lineTo(-2.31, 0.45);
      side.quadraticCurveTo(-2.3, 0.3, -2.22, 0.3);
      const sideGeo = extrudeGeo(side, 0.08, 0.03);
      const flareGeo = new T.TorusGeometry(0.47, 0.035, 8, 40, PI);

      for (const s of [-1, 1]) {
        const g = new T.Group();
        g.position.z = s * 0.87;
        g.add(mesh(sideGeo, M.paint));
        const zf = s * 0.072;
        for (const x of [FA, RA]) g.add(mesh(flareGeo, M.cladding, x, 0.38, zf * 0.7)); // arch flares
        g.add(rbox(1.75, 0.1, 0.05, 0.02, M.cladding, 0.0, 0.34, zf)); // sill cladding
        g.add(rbox(1.7, 0.025, 0.02, 0.01, M.chrome, 0.0, 0.43, zf)); // chrome strip
        for (const x of [0.92, -0.22]) g.add(box(0.008, 0.72, 0.006, M.trim, x, 0.72, zf)); // door seams
        g.add(box(0.008, 0.24, 0.006, M.trim, -1.12, 0.98, zf));
        for (const x of [0.22, -0.74]) g.add(rbox(0.15, 0.03, 0.03, 0.012, M.chrome, x, 0.98, zf)); // handles
        // Mirror on a black base.
        g.add(rbox(0.1, 0.06, 0.06, 0.02, M.trim, 0.78, 1.12, s * 0.07));
        g.add(rbox(0.14, 0.11, 0.19, 0.045, M.paint, 0.74, 1.18, s * 0.16));
        add('body', g, [0, -0.45, s * 1.9]);
      }

      /* ---- front: two-louvre grille with a round badge, headlights, bumper with skid plate */
      const front = new T.Group();
      // Big upright grille framed in chrome, two thick louvres and a round badge.
      front.add(rbox(0.06, 0.34, 0.86, 0.04, M.trim, 2.25, 0.79, 0));
      front.add(rbox(0.05, 0.36, 0.88, 0.05, M.chrome, 2.235, 0.79, 0));
      for (const y of [0.73, 0.85]) front.add(rbox(0.04, 0.045, 0.82, 0.02, M.chrome, 2.285, y, 0));
      const badge = new T.TorusGeometry(0.085, 0.014, 10, 32);
      badge.rotateY(PI / 2);
      front.add(mesh(badge, M.chrome, 2.31, 0.79, 0));
      front.add(cylX(0.075, 0.075, 0.015, M.chrome, 2.305, 0.79, 0, 24));
      for (const s of [-1, 1]) {
        front.add(rbox(0.12, 0.13, 0.3, 0.04, M.headlight, 2.2, 0.86, s * 0.66));
        front.add(rbox(0.03, 0.02, 0.26, 0.008, M.headlight, 2.25, 0.79, s * 0.66)); // LED daytime lights
        front.add(cylX(0.035, 0.035, 0.03, M.headlight, 2.34, 0.45, s * 0.64, 18)); // fog lights
      }
      front.add(rbox(0.26, 0.3, 1.8, 0.08, M.paint, 2.2, 0.5, 0)); // bumper
      front.add(rbox(0.05, 0.1, 1.0, 0.03, M.trim, 2.33, 0.47, 0)); // lower air intake
      front.add(rbox(0.08, 0.05, 1.0, 0.02, M.steel, 2.32, 0.34, 0)); // skid plate
      add('body', front, [0.95, 0.1, 0]);

      /* ---- rear: bumper with skid plate, corner taillights */
      const rear = new T.Group();
      rear.add(rbox(0.24, 0.3, 1.8, 0.08, M.paint, -2.28, 0.5, 0));
      rear.add(rbox(0.06, 0.08, 1.4, 0.02, M.cladding, -2.38, 0.38, 0));
      rear.add(rbox(0.05, 0.04, 0.9, 0.015, M.steel, -2.4, 0.44, 0));
      for (const s of [-1, 1]) rear.add(rbox(0.08, 0.16, 0.34, 0.04, M.taillight, -2.29, 1.0, s * 0.68));
      add('body', rear, [-0.95, 0.1, 0]);

      // Tailgate (lower panel; the glass belongs to the cabin), hinged at the top.
      const tailgate = new T.Group();
      tailgate.add(rbox(0.06, 0.46, 1.3, 0.03, M.paint, -2.3, 0.88, 0));
      tailgate.add(rbox(0.02, 0.11, 0.4, 0.01, M.plate, -2.34, 0.8, 0));
      tailgate.add(rbox(0.02, 0.025, 0.6, 0.008, M.chrome, -2.34, 0.95, 0));
      add('body', pivot(tailgate, -2.28, 1.11, 0), [-0.6, 0.9, 0], { rot: [0, 0, -0.9] });

      /* ---- hood */
      const hoodShape = new T.Shape();
      hoodShape.moveTo(0.95, 1.095);
      hoodShape.lineTo(2.1, 1.01);
      hoodShape.quadraticCurveTo(2.24, 1.0, 2.26, 0.95);
      hoodShape.lineTo(2.2, 0.95);
      hoodShape.lineTo(2.08, 0.975);
      hoodShape.lineTo(0.95, 1.055);
      hoodShape.lineTo(0.95, 1.095);
      const hood = mesh(extrudeGeo(hoodShape, 1.72, 0.015), M.paint);
      add('hood', pivot(hood, 0.95, 1.075, 0), [0.8, 1.35, 0], { rot: [0, 0, 0.42] });

      /* ---- cabin: upright glasshouse, roof rails, pillars, chrome trim, wipers */
      const cabin = new T.Group();
      const glassShape = new T.Shape();
      glassShape.moveTo(0.95, 1.09);
      glassShape.quadraticCurveTo(0.62, 1.37, 0.32, 1.6);
      glassShape.quadraticCurveTo(-0.8, 1.66, -1.92, 1.63);
      glassShape.quadraticCurveTo(-2.12, 1.4, -2.2, 1.13);
      glassShape.lineTo(0.95, 1.09);
      const glass = mesh(extrudeGeo(glassShape, 1.68, 0.03), M.glass);
      glass.castShadow = false;
      glass.renderOrder = 2;
      cabin.add(glass);
      const roofShape = new T.Shape();
      roofShape.moveTo(0.34, 1.615);
      roofShape.quadraticCurveTo(-0.8, 1.68, -1.94, 1.645);
      roofShape.lineTo(-1.9, 1.61);
      roofShape.quadraticCurveTo(-0.8, 1.645, 0.3, 1.585);
      roofShape.lineTo(0.34, 1.615);
      cabin.add(mesh(extrudeGeo(roofShape, 1.72, 0.025), M.paint));
      const cPillar = new T.Shape();
      cPillar.moveTo(-1.12, 1.11);
      cPillar.lineTo(-1.3, 1.62);
      cPillar.lineTo(-1.55, 1.63);
      cPillar.lineTo(-1.4, 1.11);
      cPillar.lineTo(-1.12, 1.11);
      const dPillar = new T.Shape();
      dPillar.moveTo(-1.84, 1.63);
      dPillar.lineTo(-1.95, 1.63);
      dPillar.quadraticCurveTo(-2.12, 1.4, -2.2, 1.13);
      dPillar.lineTo(-2.04, 1.11);
      dPillar.lineTo(-1.84, 1.63);
      const cGeo = extrudeGeo(cPillar, 0.03, 0.012), dGeo = extrudeGeo(dPillar, 0.03, 0.012);
      for (const s of [-1, 1]) {
        cabin.add(mesh(cGeo, M.paint, 0, 0, s * 0.86));
        cabin.add(mesh(dGeo, M.paint, 0, 0, s * 0.86));
        cabin.add(rod(V(0.95, 1.1, s * 0.84), V(0.33, 1.6, s * 0.82), 0.03, M.paint, 10)); // A-pillar
        cabin.add(rbox(0.1, 0.5, 0.03, 0.012, M.trim, -0.22, 1.36, s * 0.85)); // B-pillar
        cabin.add(cylX(0.009, 0.009, 3.05, M.chrome, -0.62, 1.115, s * 0.88, 8)); // chrome beltline
        cabin.add(rod(V(0.33, 1.605, s * 0.845), V(-1.9, 1.625, s * 0.845), 0.008, M.chrome, 8)); // window trim
        // Roof rails.
        cabin.add(rod(V(0.1, 1.72, s * 0.62), V(-1.75, 1.72, s * 0.62), 0.022, M.alu, 12));
        for (const x of [0.08, -1.73]) cabin.add(rod(V(x, 1.64, s * 0.62), V(x, 1.72, s * 0.62), 0.02, M.alu, 10));
      }
      cabin.add(rbox(0.4, 0.16, 1.6, 0.05, M.trim, 0.6, 0.98, 0)); // dashboard
      const glassNormal = V(0.629, 0.777, 0).normalize();
      for (const pz of [-0.55, 0.1]) {
        const wiper = new T.Group();
        wiper.position.set(0.925, 1.155, pz);
        wiper.quaternion.setFromUnitVectors(V(0, 1, 0), glassNormal);
        const sweep = new T.Group();
        sweep.userData.swing = { axis: 'y', amp: 0.7, speed: 1.6, offset: -0.7 };
        sweep.add(mesh(new T.CylinderGeometry(0.018, 0.018, 0.02, 12), M.trim));
        sweep.add(box(0.012, 0.012, 0.42, M.trim, 0, 0.008, 0.21));
        sweep.add(box(0.02, 0.016, 0.42, M.trim, -0.012, 0.012, 0.43));
        wiper.add(sweep);
        cabin.add(wiper);
      }
      add('cabin', cabin, [0, 2.0, 0]);

      /* ---- seats: leather, with headrests */
      function seat(x, z, w, heads, adjustable) {
        const g = new T.Group();
        g.position.set(x, 0.1, z);
        g.add(rbox(0.52, 0.14, w, 0.05, M.leather, 0, 0.53, 0));
        const back = new T.Group();
        back.position.set(-0.26, 0.55, 0);
        back.rotation.z = 0.18;
        back.add(rbox(0.13, 0.55, w, 0.05, M.leather, 0, 0.27, 0));
        for (const hz of heads) back.add(rbox(0.09, 0.15, 0.26, 0.04, M.leather, 0.0, 0.66, hz));
        g.add(back);
        for (const s of [-1, 1]) g.add(box(0.46, 0.04, 0.04, M.darkSteel, 0, 0.45, s * w * 0.32));
        if (adjustable) {
          g.userData.slide = { axis: 'x', amp: 0.06, speed: 0.9 };
          back.userData.swing = { axis: 'z', amp: 0.13, speed: 1.3 };
        }
        return g;
      }
      add('seats', seat(-0.12, -0.4, 0.5, [0], true), [0, 1.2, -0.2]);
      add('seats', seat(-0.12, 0.4, 0.5, [0], true), [0, 1.2, 0.2]);
      add('seats', seat(-1.08, 0, 1.5, [-0.5, 0, 0.5], false), [-0.35, 1.2, 0]);

      /* ---- steering: three-spoke wheel with an airbag hub, rack and pinion */
      const steer = new T.Group();
      const wheelRing = new T.Group();
      wheelRing.position.set(0.32, 1.1, -0.4);
      wheelRing.rotation.z = -0.4;
      const wheelTurn = new T.Group();
      wheelTurn.userData.swing = { axis: 'x', amp: 1.1, speed: 1.4 };
      wheelRing.add(wheelTurn);
      const ringGeo = new T.TorusGeometry(0.19, 0.022, 12, 48);
      ringGeo.rotateY(PI / 2);
      wheelTurn.add(mesh(ringGeo, M.trim));
      wheelTurn.add(rbox(0.06, 0.12, 0.14, 0.03, M.trim, -0.01, 0, 0)); // airbag hub
      for (const a of [PI / 2, PI * 1.17, PI * 1.83]) {
        const spoke = box(0.02, 0.15, 0.035, M.alu, 0, Math.sin(a) * 0.09, Math.cos(a) * 0.09);
        spoke.rotation.x = -a + PI / 2;
        wheelTurn.add(spoke);
      }
      steer.add(wheelRing);
      steer.add(rod(V(0.34, 1.09, -0.4), V(1.12, 0.5, -0.33), 0.022, M.darkSteel));
      steer.add(cylZ(0.032, 1.1, M.steel, 1.15, 0.45, 0));
      steer.add(cylX(0.05, 0.05, 0.12, M.darkSteel, 1.15, 0.5, 0.25)); // electric assist motor
      for (const s of [-1, 1]) steer.add(rod(V(1.15, 0.45, s * 0.55), V(1.25, 0.42, s * 0.7), 0.016, M.steel));
      add('steering', steer, [-0.1, 0.85, -0.65]);

      /* ---- engine: inline four-cylinder diesel with a plastic cover */
      const eng = new T.Group();
      const EX = 1.3;
      const block = new T.Group();
      block.position.set(EX, 0.62, 0);
      block.add(xray(rbox(0.58, 0.34, 0.26, 0.03, M.castIron, 0, 0, 0)));
      block.add(xray(rbox(0.6, 0.1, 0.3, 0.02, M.alu, 0, 0.22, 0))); // cylinder head
      const firing = [0, PI, PI, 0];
      for (let i = 0; i < 4; i++) {
        const x = -0.21 + i * 0.14;
        const phase = firing[i] + (i > 1 ? 0.15 : 0);
        const piston = mesh(new T.CylinderGeometry(0.055, 0.055, 0.06, 18), M.chrome, x, -0.02, 0);
        piston.add(box(0.016, 0.12, 0.016, M.darkSteel, 0, -0.08, 0));
        piston.userData.piston = { y: -0.02, amp: 0.05, phase };
        block.add(piston);
        const flash = new T.Mesh(new T.SphereGeometry(0.06, 16, 12), new T.MeshBasicMaterial({ color: 0xffa040, transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false }));
        flash.position.set(x, 0.12, 0);
        flash.visible = false;
        flash.userData.flash = phase;
        block.add(flash);
        const injector = mesh(new T.CylinderGeometry(0.014, 0.014, 0.08, 10), M.steel, x, 0.3, 0.04); // flashes as it injects
        injector.userData.spark = phase;
        block.add(injector);
      }
      eng.add(block);
      eng.add(rbox(0.62, 0.07, 0.42, 0.03, M.engineCover, EX, 0.93, 0)); // engine cover
      for (const z of [-0.08, 0, 0.08]) eng.add(box(0.5, 0.008, 0.012, M.alu, EX, 0.968, z));
      eng.add(rbox(0.5, 0.12, 0.2, 0.03, M.darkSteel, EX, 0.38, 0)); // oil pan
      const crankPulley = new T.Group();
      crankPulley.position.set(1.63, 0.5, 0);
      crankPulley.add(cylX(0.08, 0.08, 0.04, M.darkSteel, 0, 0, 0));
      crankPulley.add(box(0.045, 0.03, 0.02, M.chrome, 0.012, 0.06, 0));
      crankPulley.userData.spin = { axis: 'x', speed: 7 };
      eng.add(crankPulley);
      eng.add(cylX(0.05, 0.05, 0.04, M.darkSteel, 1.63, 0.7, 0)); // water pump
      eng.add(cylX(0.06, 0.06, 0.18, M.alu, 1.53, 0.7, 0.22)); // alternator
      eng.add(tube([[1.66, 0.42, 0], [1.66, 0.5, 0.09], [1.66, 0.66, 0.29], [1.66, 0.76, 0.24], [1.66, 0.74, 0.03], [1.66, 0.52, -0.08]], 0.008, M.rubber, 60, true));
      eng.add(cylX(0.055, 0.055, 0.16, M.darkSteel, 1.05, 0.45, -0.2)); // starter
      eng.userData.shake = true;
      eng.userData.previewElev = 0.16;
      add('engine', eng, [0.4, 0.95, 0]);

      /* ---- turbocharger, air filter, intercooler and charge-air pipes */
      const turbo = new T.Group();
      const TX = 0.95, TY = 0.64, TZ = -0.3;
      const turbine = new T.TorusGeometry(0.065, 0.042, 10, 28);
      turbine.rotateY(PI / 2);
      turbo.add(mesh(turbine, M.castIron, TX + 0.07, TY, TZ));
      turbo.add(xray(mesh(turbine.clone(), M.alu, TX - 0.07, TY, TZ)));
      turbo.add(cylX(0.03, 0.03, 0.14, M.steel, TX, TY, TZ, 12));
      const wheelC = mesh(gearGeo(0.055, 9, 0.03, 'x'), M.chrome, TX - 0.07, TY, TZ);
      wheelC.userData.spin = { axis: 'x', speed: 40 };
      turbo.add(wheelC);
      turbo.add(rbox(0.32, 0.15, 0.24, 0.04, M.trim, 1.72, 0.86, -0.48)); // air filter box
      turbo.add(tube([[1.56, 0.86, -0.48], [1.2, 0.82, -0.42], [0.86, 0.72, -0.34], [TX - 0.12, TY, TZ]], 0.04, M.trim, 30));
      turbo.add(box(0.05, 0.2, 0.9, M.radiator, 2.14, 0.5, 0)); // intercooler
      turbo.add(tube([[TX - 0.07, TY - 0.06, TZ - 0.04], [1.2, 0.42, -0.4], [1.9, 0.42, -0.4], [2.12, 0.5, -0.4]], 0.035, M.alu, 30));
      turbo.add(tube([[2.12, 0.5, 0.4], [1.9, 0.45, 0.42], [1.6, 0.6, 0.35], [1.45, 0.78, 0.2], [1.3, 0.8, 0.17]], 0.035, M.alu, 30));
      turbo.add(rbox(0.5, 0.08, 0.08, 0.02, M.alu, EX, 0.8, 0.17)); // intake manifold
      for (let i = 0; i < 4; i++) turbo.add(rod(V(1.09 + i * 0.14, 0.7, -0.15), V(1.0 + i * 0.05, TY + 0.03, TZ + 0.04), 0.02, M.castIron));
      turbo.userData.flows = [
        { points: [[1.86, 0.92, -0.48], [1.56, 0.86, -0.48], [1.2, 0.82, -0.42], [0.86, 0.72, -0.34], [TX - 0.1, TY, TZ], [1.2, 0.42, -0.4], [1.9, 0.42, -0.4], [2.12, 0.5, -0.3], [2.12, 0.5, 0.3], [1.9, 0.45, 0.42], [1.6, 0.6, 0.35], [1.3, 0.8, 0.17]], color: 0x8fd6ff, count: 18, speed: 0.16, size: 0.03 },
        { points: [[1.5, 0.72, -0.15], [1.2, 0.7, -0.2], [TX + 0.07, TY, TZ], [TX + 0.1, 0.5, -0.32]], color: 0xff7a2f, color2: 0xffc04a, count: 8, speed: 0.4, size: 0.03 }
      ];
      add('turbo', turbo, [0.3, 1.35, -0.75]);

      /* ---- radiator and electric fan */
      const rad = new T.Group();
      rad.add(box(0.05, 0.38, 1.2, M.radiator, 2.05, 0.72, 0));
      for (const s of [-1, 1]) rad.add(rbox(0.08, 0.42, 0.06, 0.02, M.trim, 2.05, 0.72, s * 0.63));
      const fan = new T.Group();
      fan.position.set(1.95, 0.72, 0);
      fan.add(cylX(0.05, 0.05, 0.06, M.darkSteel, 0, 0, 0, 16));
      for (let i = 0; i < 7; i++) {
        const blade = box(0.012, 0.15, 0.07, M.trim, 0, 0, 0);
        const a = (i / 7) * PI * 2;
        blade.position.set(0, Math.cos(a) * 0.1, Math.sin(a) * 0.1);
        blade.rotation.x = -a;
        blade.rotation.y = 0.35;
        fan.add(blade);
      }
      const shroud = new T.TorusGeometry(0.19, 0.014, 8, 40);
      shroud.rotateY(PI / 2);
      rad.add(mesh(shroud, M.trim, 1.96, 0.72, 0));
      rad.add(fan);
      rad.add(tube([[2.02, 0.86, -0.35], [1.85, 0.9, -0.25], [1.7, 0.82, -0.05], [1.63, 0.74, 0]], 0.025, M.trim, 20));
      refs.fan = fan;
      fan.userData.spin = { axis: 'x', speed: 14 };
      add('radiator', rad, [1.0, 0.55, 0]);

      /* ---- 12-volt battery */
      const bat = new T.Group();
      bat.add(rbox(0.24, 0.2, 0.18, 0.02, M.battery, 1.85, 0.78, 0.55));
      for (let i = 0; i < 6; i++) {
        const cap = mesh(new T.CylinderGeometry(0.013, 0.013, 0.02, 10), M.amber, 1.76 + i * 0.036, 0.89, 0.55);
        cap.userData.cell = i;
        bat.add(cap);
      }
      const plusCable = [[1.76, 0.9, 0.49], [1.72, 0.96, 0.45], [1.6, 0.86, 0.32], [1.5, 0.72, 0.24]];
      bat.add(mesh(new T.CylinderGeometry(0.017, 0.017, 0.03, 12), M.plugRed, 1.76, 0.9, 0.49));
      bat.add(tube(plusCable, 0.012, M.plugRed, 24));
      bat.add(tube([[1.94, 0.9, 0.49], [1.98, 0.95, 0.45], [2.0, 0.8, 0.4], [2.0, 0.6, 0.35]], 0.012, M.trim, 24));
      bat.userData.flows = [{ points: plusCable, color: 0x7fd8ff, count: 6, speed: 0.7, size: 0.02 }];
      add('battery', bat, [0.5, 1.3, 0.55]);

      /* ---- fuel: tank under the rear seat, lines, high-pressure pump and common rail */
      const fuel = new T.Group();
      fuel.add(rbox(0.55, 0.22, 1.2, 0.06, M.tank, -0.7, 0.34, 0));
      fuel.add(tube([[-0.95, 0.45, -0.5], [-1.5, 0.62, -0.6], [-1.95, 0.95, -0.86]], 0.025, M.steel, 24));
      fuel.add(cylZ(0.035, 0.03, M.trim, -1.95, 0.95, -0.87, 16));
      const fuelLine = [[-0.45, 0.35, 0.3], [0.5, 0.36, 0.3], [1.2, 0.5, 0.25], [1.5, 0.66, 0.22]];
      fuel.add(tube(fuelLine, 0.01, M.copper || M.steel, 40));
      fuel.add(cylX(0.045, 0.045, 0.12, M.alu, 1.56, 0.68, 0.22)); // high-pressure pump
      fuel.add(cylX(0.018, 0.018, 0.52, M.steel, EX, 0.89, 0.13, 12)); // common rail
      fuel.add(tube([[1.56, 0.68, 0.22], [1.58, 0.82, 0.18], [1.55, 0.89, 0.13]], 0.009, M.steel, 12));
      for (let i = 0; i < 4; i++) fuel.add(tube([[1.09 + i * 0.14, 0.89, 0.13], [1.09 + i * 0.14, 0.92, 0.08], [1.09 + i * 0.14, 0.92, 0.05]], 0.007, M.steel, 8));
      fuel.userData.flows = [
        { points: fuelLine, color: 0xffb020, count: 12, speed: 0.2, size: 0.03 },
        { points: [[1.55, 0.89, 0.13], [1.3, 0.89, 0.13], [1.05, 0.89, 0.13]], color: 0xffd060, count: 6, speed: 0.8, size: 0.025 }
      ];
      fuel.userData.previewElev = 0.85;
      add('fuel', fuel, [-0.2, -0.65, 0.5]);

      /* ---- exhaust: catalyst + particle filter, SCR, rear silencer, twin tips */
      const ex = new T.Group();
      refs.tailpipes = [];
      const exPath = [[TX + 0.1, 0.5, -0.32], [0.85, 0.32, -0.3], [0.7, 0.28, -0.3]];
      ex.add(tube(exPath, 0.032, M.exhaust, 20));
      ex.add(cylX(0.085, 0.085, 0.5, M.exhaust, 0.42, 0.28, -0.3, 20)); // DOC + DPF
      ex.add(tube([[0.17, 0.28, -0.3], [-0.05, 0.27, -0.3]], 0.03, M.exhaust, 8));
      ex.add(cylX(0.075, 0.075, 0.36, M.exhaust, -0.23, 0.27, -0.3, 20)); // SCR catalyst
      ex.add(tube([[-0.41, 0.27, -0.3], [-1.0, 0.26, -0.3], [RA, 0.25, -0.3], [-1.85, 0.3, -0.25], [-1.95, 0.35, -0.2]], 0.03, M.exhaust, 40));
      ex.add(rbox(0.28, 0.15, 0.9, 0.05, M.exhaust, -2.05, 0.38, 0)); // rear silencer
      for (const s of [-1, 1]) {
        ex.add(tube([[-2.15, 0.38, s * 0.42], [-2.3, 0.38, s * 0.5]], 0.028, M.exhaust, 6));
        ex.add(rbox(0.06, 0.06, 0.17, 0.02, M.chrome, -2.39, 0.39, s * 0.5));
        refs.tailpipes.push(V(-2.43, 0.39, s * 0.5));
      }
      ex.userData.flows = [-1, 1].map(s => ({
        points: [[TX + 0.1, 0.5, -0.32], [0.85, 0.32, -0.3], [0.42, 0.28, -0.3], [-0.23, 0.27, -0.3], [-1.0, 0.26, -0.3], [RA, 0.25, -0.3], [-1.95, 0.35, -0.2], [-2.05, 0.38, s * 0.3], [-2.3, 0.38, s * 0.5], [-2.5, 0.4, s * 0.5]],
        color: 0xff7a2f, color2: 0x9aa3b0, count: 14, speed: 0.2, size: 0.05
      }));
      ex.userData.previewElev = 0.95;
      add('exhaust', ex, [0, -1.05, -0.65]);

      /* ---- AdBlue tank and dosing line to the SCR catalyst */
      const ad = new T.Group();
      ad.add(rbox(0.3, 0.18, 0.32, 0.05, M.adblue, -1.9, 0.5, 0.52));
      ad.add(cylZ(0.04, 0.04, M.batteryTop || M.adblue, -1.95, 0.6, 0.7, 16));
      const doseLine = [[-1.9, 0.42, 0.38], [-1.0, 0.32, 0.32], [-0.3, 0.3, -0.05], [-0.05, 0.3, -0.25]];
      ad.add(tube(doseLine, 0.009, M.adblue, 30));
      ad.add(cylZ(0.015, 0.06, M.steel, -0.05, 0.33, -0.27, 8)); // dosing injector
      ad.userData.flows = [{ points: doseLine, color: 0x5fb4ff, count: 10, speed: 0.25, size: 0.025 }];
      ad.userData.previewElev = 0.8;
      add('adblue', ad, [-0.6, -0.3, 0.9]);

      /* ---- 7-speed automatic gearbox, gears visible in the part preview */
      const gb = new T.Group();
      gb.add(xray(cylX(0.19, 0.15, 0.2, M.alu, 0.9, 0.56, 0, 32)));
      gb.add(xray(cylX(0.15, 0.12, 0.55, M.alu, 0.53, 0.53, 0, 32)));
      const MAIN_Y = 0.56, COUNTER_Y = 0.45;
      gb.add(cylX(0.012, 0.012, 0.6, M.darkSteel, 0.55, MAIN_Y, 0, 10));
      gb.add(cylX(0.012, 0.012, 0.42, M.darkSteel, 0.56, COUNTER_Y, 0, 10));
      for (const [x, rMain] of [[0.7, 0.042], [0.57, 0.055], [0.44, 0.066]]) {
        const rCounter = MAIN_Y - COUNTER_Y - rMain;
        const main = mesh(gearGeo(rMain, Math.round(rMain * 300), 0.035, 'x'), M.chrome, x, MAIN_Y, 0);
        main.userData.spin = { axis: 'x', speed: 6 };
        gb.add(main);
        const counter = mesh(gearGeo(rCounter, Math.round(rCounter * 300), 0.035, 'x'), M.engine, x, COUNTER_Y, 0);
        counter.userData.spin = { axis: 'x', speed: -6 * (rMain / rCounter) };
        gb.add(counter);
      }
      gb.userData.previewElev = 0.22;
      add('transmission', gb, [-0.3, 0.45, 0]);

      /* ---- transfer case: chain drive to a front output beside the gearbox */
      const tc = new T.Group();
      tc.add(xray(rbox(0.24, 0.24, 0.42, 0.05, M.alu, 0.17, 0.5, 0.1)));
      const sprocketA = mesh(gearGeo(0.07, 18, 0.04, 'x'), M.chrome, 0.17, 0.52, 0);
      const sprocketB = mesh(gearGeo(0.07, 18, 0.04, 'x'), M.engine, 0.17, 0.46, 0.21);
      sprocketA.userData.spin = { axis: 'x', speed: 6 };
      sprocketB.userData.spin = { axis: 'x', speed: 6 };
      tc.add(sprocketA, sprocketB);
      const chain = new T.CatmullRomCurve3([V(0.17, 0.6, 0), V(0.17, 0.52, -0.08), V(0.17, 0.44, 0), V(0.17, 0.38, 0.21), V(0.17, 0.46, 0.29), V(0.17, 0.54, 0.21)], true);
      tc.add(mesh(new T.TubeGeometry(chain, 60, 0.008, 6, true), M.darkSteel));
      tc.userData.flows = [{ points: [[0.17, 0.6, 0], [0.17, 0.52, -0.08], [0.17, 0.44, 0], [0.17, 0.38, 0.21], [0.17, 0.46, 0.29], [0.17, 0.54, 0.21], [0.17, 0.6, 0]], color: 0x4cc3ff, count: 10, speed: 0.5, size: 0.016 }];
      tc.userData.previewElev = 0.3;
      add('transferCase', tc, [-0.25, 0.2, 0.55]);

      /* ---- driveshafts: front and rear propeller shafts, four half-shafts */
      const shafts = new T.Group();
      const rearProp = shaft(V(0.05, 0.5, 0), V(RA + 0.16, 0.4, 0), 0.04, 8);
      refs.driveshaft = rearProp.spin;
      shafts.add(rearProp.group);
      shafts.add(shaft(V(0.2, 0.46, 0.21), V(FA - 0.12, 0.42, 0.21), 0.032, 8).group);
      for (const [x, cz] of [[FA, 0.21], [RA, 0]]) {
        for (const s of [-1, 1]) {
          const a = V(x, x === FA ? 0.4 : 0.38, cz + s * 0.1);
          const b = V(x, WY, s * 0.66);
          const hs = shaft(a, b, 0.022, 4);
          // CV joint boots at both ends.
          for (const u of [0.06, hs.len - 0.06]) hs.spin.add(cylX(0.045, 0.03, 0.08, M.rubber, u, 0, 0, 14));
          shafts.add(hs.group);
        }
      }
      add('driveshaft', shafts, [0, -0.55, 0]);

      /* ---- differentials (front beside the oil pan, rear between the half-shafts) */
      const diff = new T.Group();
      function diffUnit(x, y, z, size) {
        const housing = mesh(new T.SphereGeometry(0.13 * size, 28, 18), M.alu, x, y, z);
        housing.scale.set(1, 0.92, 1.05);
        housing.userData.xray = true;
        diff.add(housing);
        const pinion = mesh(gearGeo(0.032 * size, 10, 0.04, 'x'), M.chrome, x + 0.1 * size, y, z - 0.03);
        pinion.userData.diff = { role: 'pinion' };
        diff.add(pinion);
        const carrier = new T.Group();
        carrier.position.set(x, y, z);
        carrier.userData.diff = { role: 'carrier' };
        carrier.add(mesh(gearGeo(0.095 * size, 30, 0.022, 'z'), M.chrome, 0, 0, -0.06 * size));
        carrier.add(cylX(0.009, 0.009, 0.11 * size, M.darkSteel, 0, 0, 0, 8));
        for (const s of [-1, 1]) {
          const spider = mesh(gearGeo(0.026 * size, 9, 0.02, 'x'), M.engine, s * 0.04 * size, 0, 0);
          spider.userData.diff = { role: 'spider', side: s };
          carrier.add(spider);
        }
        diff.add(carrier);
        for (const s of [-1, 1]) {
          const axle = new T.Group();
          axle.position.set(x, y, z);
          axle.userData.diff = { role: 'axle', side: s };
          axle.add(mesh(gearGeo(0.03 * size, 11, 0.02, 'z'), M.engine, 0, 0, s * 0.036 * size));
          axle.add(cylZ(0.05 * size, 0.025, M.steel, 0, 0, s * 0.13 * size, 20)); // output flange
          for (const a of [0, PI]) axle.add(box(0.016, 0.04, 0.03, M.engine, Math.sin(a) * 0.035 * size, Math.cos(a) * 0.035 * size, s * 0.145 * size));
          diff.add(axle);
        }
      }
      diffUnit(FA, 0.4, 0.21, 0.8);
      diffUnit(RA, 0.38, 0, 1);
      diff.userData.previewElev = 0.4;
      add('differential', diff, [-0.45, -0.5, 0]);

      /* ---- wheels (5-twin-spoke alloys), brakes, suspension */
      const tireProfile = [[0.245, -0.117], [0.32, -0.117], [0.35, -0.1], [0.36, -0.06], [0.36, 0.06], [0.35, 0.1], [0.32, 0.117], [0.245, 0.117]]
        .map(([r, y]) => new T.Vector2(r, y));
      const tireGeo = new T.LatheGeometry(tireProfile, 64);
      tireGeo.rotateX(PI / 2);
      const barrelGeo = new T.CylinderGeometry(0.245, 0.245, 0.2, 40, 1, true);
      barrelGeo.rotateX(PI / 2);
      const lipGeo = new T.TorusGeometry(0.245, 0.012, 8, 48);
      const spokeGeo = rboxGeo(0.032, 0.2, 0.03, 0.01);
      const capGeo = new T.CylinderGeometry(0.05, 0.05, 0.04, 24);
      capGeo.rotateX(PI / 2);
      const discGeo = new T.CylinderGeometry(0.19, 0.19, 0.03, 40);
      discGeo.rotateX(PI / 2);
      const hatGeo = new T.CylinderGeometry(0.08, 0.08, 0.05, 24);
      hatGeo.rotateX(PI / 2);
      const caliperGeo = rboxGeo(0.1, 0.16, 0.08, 0.03);

      refs.wheels = [];
      for (const x of [FA, RA]) {
        for (const s of [-1, 1]) {
          const inPreview = x === FA && s === 1;
          const wheel = new T.Group();
          wheel.position.set(x, WY, s * WZ);
          const spin = new T.Group();
          spin.add(mesh(tireGeo, M.rubber));
          spin.add(mesh(barrelGeo, M.darkSteel));
          spin.add(mesh(lipGeo, M.alloy, 0, 0, s * 0.1));
          for (let i = 0; i < 5; i++) {
            for (const d of [-0.12, 0.12]) {
              const a = (i / 5) * PI * 2 + d;
              const sp = mesh(spokeGeo, M.alloy, Math.sin(a) * 0.125, Math.cos(a) * 0.125, s * 0.09);
              sp.rotation.z = -a;
              spin.add(sp);
            }
          }
          spin.add(mesh(capGeo, M.trim, 0, 0, s * 0.095));
          wheel.add(spin);
          refs.wheels.push(spin);
          spin.userData.spin = { axis: 'z', speed: -3 };
          add('wheels', wheel, [0, 0.1, s * 1.2], { preview: inPreview });

          const brake = new T.Group();
          brake.position.set(x, WY, s * 0.72);
          const disc = new T.Group();
          disc.add(mesh(discGeo, M.steel));
          disc.add(mesh(hatGeo, M.darkSteel, 0, 0, s * 0.01));
          disc.userData.spin = { axis: 'z', speed: -3 };
          brake.add(disc);
          brake.add(mesh(caliperGeo, M.alu, -0.13, 0.11, 0));
          add('brakes', brake, [0, 0.1, s * 0.62], { preview: inPreview });

          const sus = new T.Group();
          const front = x === FA;
          const sx = front ? x : x + 0.12;
          const sz = s * (front ? 0.6 : 0.55);
          const y0 = front ? 0.56 : 0.36, y1 = front ? 0.92 : 0.64;
          const pts = [];
          const turns = 6, n = turns * 16;
          for (let i = 0; i <= n; i++) {
            const a = (i / n) * turns * PI * 2;
            pts.push(V(sx + Math.cos(a) * 0.07, y0 + (y1 - y0) * (i / n), sz + Math.sin(a) * 0.07));
          }
          const spring = mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), n * 2, 0.013, 8), M.spring);
          spring.userData.bounce = y0;
          sus.add(spring);
          sus.add(mesh(new T.CylinderGeometry(0.085, 0.085, 0.02, 20), M.darkSteel, sx, y1 + 0.01, sz));
          if (front) {
            sus.add(mesh(new T.CylinderGeometry(0.026, 0.026, 0.55, 14), M.darkSteel, sx, 0.66, sz)); // strut
            sus.add(rod(V(x + 0.15, 0.32, s * 0.3), V(x, 0.32, s * 0.66), 0.018, M.darkSteel));
            sus.add(rod(V(x - 0.15, 0.32, s * 0.3), V(x, 0.32, s * 0.66), 0.018, M.darkSteel));
            sus.add(rbox(0.06, 0.4, 0.06, 0.02, M.castIron, x, 0.45, s * 0.66));
          } else {
            sus.add(rod(V(x - 0.12, 0.34, s * 0.5), V(x - 0.14, 0.82, s * 0.5), 0.022, M.darkSteel)); // damper
            for (const [dx, dy] of [[0.15, 0.32], [-0.15, 0.32], [0.05, 0.55]]) sus.add(rod(V(x + dx, dy, s * 0.25), V(x, dy, s * 0.64), 0.016, M.darkSteel));
          }
          add('suspension', sus, [0, 0.5, s * 0.3], { preview: inPreview });
        }
      }

      /* ---- chassis: unibody floor, sills, front rails and subframes */
      const ch = new T.Group();
      const floorPan = xray(rbox(2.6, 0.025, 1.6, 0.01, M.floor, -0.25, 0.44, 0));
      ch.add(floorPan);
      const tunnel = new T.CylinderGeometry(0.2, 0.2, 2.2, 28, 1, true, 0, PI);
      tunnel.rotateZ(PI / 2);
      ch.add(xray(mesh(tunnel, M.floor, -0.1, 0.44, 0)));
      ch.add(xray(rbox(0.9, 0.025, 1.7, 0.01, M.floor, -1.85, 0.6, 0))); // load floor
      const rail = (a, b, w = 0.1, h = 0.1) => ch.add(beam(V(...a), V(...b), w, h, M.darkSteel));
      for (const s of [-1, 1]) {
        rail([2.15, 0.5, s * 0.45], [0.95, 0.42, s * 0.45]); // front rails
        rail([0.95, 0.42, s * 0.45], [0.7, 0.36, s * 0.82]);
        rail([0.7, 0.36, s * 0.82], [-1.0, 0.36, s * 0.82], 0.12, 0.14); // sills
        rail([-1.0, 0.36, s * 0.82], [-1.25, 0.5, s * 0.55]);
        rail([-1.25, 0.5, s * 0.55], [-2.2, 0.52, s * 0.55]); // rear rails
      }
      ch.add(rbox(0.1, 0.08, 1.0, 0.02, M.darkSteel, FA + 0.2, 0.4, 0)); // front subframe
      ch.add(rbox(0.1, 0.08, 1.0, 0.02, M.darkSteel, FA - 0.25, 0.4, 0));
      ch.add(rbox(0.08, 0.08, 1.25, 0.02, M.darkSteel, -1.15, 0.38, 0)); // rear subframe
      ch.add(rbox(0.08, 0.08, 1.25, 0.02, M.darkSteel, -1.6, 0.38, 0));
      ch.add(rbox(0.06, 0.06, 1.3, 0.02, M.darkSteel, 2.12, 0.62, 0)); // radiator support
      ch.userData.flows = [-1, 1].map(s => ({
        points: [[2.15, 0.5, s * 0.45], [0.95, 0.42, s * 0.45], [0.7, 0.36, s * 0.82], [-1.0, 0.36, s * 0.82], [-1.25, 0.5, s * 0.55], [-2.2, 0.52, s * 0.55]]
          .map(([x, y, z]) => [x, y + 0.08, z]),
        color: 0x7be07f, count: 12, speed: 0.16, size: 0.045
      }));
      add('chassis', ch, [0, -1.45, 0]);
    }
  };
})();

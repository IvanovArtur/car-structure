/* Shared text content for every page, in all languages.
   Car-specific texts (and anything that differs from these) live in js/cars/*.js
   and are merged on top of these. */

window.LANGS = ['en', 'uk', 'ru'];

window.I18N = {
  /* ------------------------------------------------------------------ EN */
  en: {
    ui: {
      meta: {
        title: 'Under the Hood — How a car really works',
        description: 'An interactive guide to how a petrol car works. Scroll to take a car apart and click any part to learn what it does.'
      },
      brand: 'Under the Hood',
      nav: { explore: 'Explore', cycle: 'Engine cycle', flow: 'Power flow', parts: 'Parts', home: 'All cars' },
      lang: 'Language',
      hero: {
        eyebrow: 'An interactive guide to the car',
        title: 'How a car really works',
        sub: 'Scroll to take a petrol car apart, piece by piece. Click any part to learn what it does.',
        scroll: 'Scroll to disassemble'
      },
      ch1: {
        kicker: '01 · The shell',
        title: 'Body first',
        text: 'The body protects you, shapes the airflow and holds everything in place. Watch it come apart.'
      },
      ch2: {
        kicker: '02 · The heart',
        title: 'Engine & energy',
        text: 'Fuel, air and a spark: the engine burns them to make power, while the radiator and exhaust deal with heat and waste.'
      },
      ch3: {
        kicker: '03 · The power path',
        title: 'From engine to road',
        text: 'The gearbox, driveshaft and differential carry rotation from the engine all the way to the wheels.'
      },
      ch4: {
        kicker: '04 · Control',
        title: 'Stop, steer, absorb',
        text: 'Brakes, steering and suspension turn raw power into a car you can control. Now click any part.'
      },
      ui: {
        progress: 'Disassembled',
        hint: 'Drag to rotate · Click a part',
        hintTouch: 'Drag to rotate · Tap a part',
        tooltip: 'Click for details',
        loading: 'Assembling the car…',
        error: 'The 3D view needs WebGL and an internet connection to load three.js. Everything else on the page still works.'
      },
      panel: {
        what: 'What it does',
        how: 'How it works',
        tip: 'Good to know',
        related: 'Related parts',
        prev: 'Previous',
        next: 'Next',
        close: 'Close',
        drag: 'Drag to rotate'
      },
      cycle: {
        eyebrow: 'Inside the engine',
        title: 'The four-stroke cycle',
        text: 'Almost every petrol car engine repeats these four steps thousands of times per minute, in every cylinder.',
        play: 'Play',
        pause: 'Pause',
        speed: 'Speed',
        open: 'Learn about the engine',
        strokes: [
          { name: 'Intake', text: 'The piston moves down and the intake valve opens, drawing in a mix of air and fuel.' },
          {
            name: 'Compression',
            text: 'Both valves close and the piston rises, squeezing the mixture to about a tenth of its volume.'
          },
          {
            name: 'Power',
            text: 'The spark plug fires. The burning mixture expands and forces the piston down — this is what moves the car.'
          },
          {
            name: 'Exhaust',
            text: 'The exhaust valve opens and the rising piston pushes the burnt gases out into the exhaust system.'
          }
        ],
        labels: { mix: 'Air + fuel', exhaust: 'Exhaust', spark: 'Spark plug', piston: 'Piston', crank: 'Crankshaft' }
      },
      flow: {
        eyebrow: 'Power flow',
        title: 'How power reaches the road',
        text: 'Follow the energy from the fuel tank to the tyres. Click a step to open that part.'
      },
      parts: {
        eyebrow: 'Parts catalogue',
        title: 'Every part, explained',
        text: 'Click any card to open the full explanation, or filter by system.',
        all: 'All'
      },
      cats: { body: 'Body', engine: 'Engine & energy', drivetrain: 'Drivetrain', chassis: 'Chassis & control' },
      footer: {
        note: 'A learning project. Every car here is a simplified 3D model built entirely in code.',
        built: 'Built with HTML, CSS, JavaScript and three.js',
        top: 'Back to top'
      },
      cars: { label: 'Powertrain', gas: 'Gas', diesel: 'Diesel', electric: 'Electric' },
      home: {
        meta: 'Under the Hood — How does a car work?',
        eyebrow: 'An interactive guide to the car',
        title: 'How does a car work?',
        sub: 'Pick what powers it. Each car comes apart piece by piece, and every part explains what it does and how it works.',
        choose: 'Choose a powertrain',
        explore: 'Take it apart',
        drag: 'Drag to spin',
        cards: {
          gas: {
            model: '1964 Chevrolet Impala',
            tagline: 'Petrol V8 · Rear-wheel drive',
            blurb: 'The classic: fuel and a spark make thousands of small explosions that push the pistons.'
          },
          diesel: {
            model: 'Mercedes-Benz GLK 250 BlueTEC',
            tagline: 'Turbo diesel · All-wheel drive',
            blurb: 'No spark plugs: air is squeezed until it is so hot that the fuel ignites by itself.'
          },
          electric: {
            model: 'Tesla Model Y',
            tagline: 'Two electric motors · All-wheel drive',
            blurb: 'No engine at all: a battery and magnets turn the wheels almost silently.'
          }
        },
        compare: {
          eyebrow: 'Side by side',
          title: 'Compare at a glance',
          rows: [
            {
              label: 'Energy source',
              gas: 'Petrol in a tank',
              diesel: 'Diesel in a tank',
              electric: 'Electricity in a battery'
            },
            {
              label: 'What makes the power',
              gas: 'A spark ignites fuel and air',
              diesel: 'Hot squeezed air ignites the fuel',
              electric: 'A rotating magnetic field turns a rotor'
            },
            { label: 'Gears', gas: 'Usually 4–10', diesel: 'Usually 6–9', electric: 'One fixed gear' },
            { label: 'Energy that reaches the wheels', gas: '≈ 25–30%', diesel: '≈ 30–40%', electric: '≈ 85–90%' },
            {
              label: 'Refuel / recharge',
              gas: '≈ 5 minutes',
              diesel: '≈ 5 minutes',
              electric: '20–40 min fast charging, or overnight at home'
            },
            {
              label: 'From the exhaust',
              gas: 'CO₂, NOx, CO',
              diesel: 'CO₂, NOx, soot (filtered)',
              electric: 'Nothing — there is no exhaust'
            }
          ]
        }
      }
    },
    parts: {
      body: {
        name: 'Body shell',
        short: 'The car’s skin and skeleton in one',
        what: 'Holds everything together, shapes the airflow and protects the passengers. Side panels, doors and bumpers are all part of it.',
        how: 'Modern bodies are made of stamped steel and aluminium sheets welded into one rigid structure called a monocoque. Crumple zones at the front and rear are designed to fold in a crash and absorb energy before it reaches the cabin.',
        tip: 'The bumper you see is usually just a plastic cover — the real energy-absorbing beam is hidden behind it.'
      },
      hood: {
        name: 'Hood (bonnet)',
        short: 'The lid over the engine bay',
        what: 'Covers and protects the engine bay and gives access to the engine for service.',
        how: 'It is hinged near the windshield and held shut by a latch at the front plus a secondary safety catch, so it can’t fly open while driving. Many hoods are designed to deform and soften the impact for pedestrians.',
        tip: 'Under the hood you check oil, coolant, brake fluid and washer fluid — the four basic fluids every driver should know.'
      },
      cabin: {
        name: 'Cabin, roof & glass',
        short: 'The safety cage you sit in',
        what: 'Shields the passengers from weather and gives the driver a clear view all around.',
        how: 'The roof pillars (A, B and C) form a strong cage that keeps its shape even in a rollover. The windshield is laminated: two layers of glass with a plastic film between them, so it cracks but doesn’t shatter into the cabin.',
        tip: 'The windshield is part of the structure: it stiffens the roof and supports the passenger airbag when it deploys.'
      },
      seats: {
        name: 'Seats',
        short: 'Where safety meets comfort',
        what: 'Hold everyone in the right position so seat belts and airbags can do their job.',
        how: 'A steel frame bolted to the floor carries springs and foam padding. Headrests stop the head from snapping backwards in a rear impact (whiplash).',
        tip: 'Set the headrest so its top is level with the top of your head — it’s a safety device, not a pillow.'
      },
      steering: {
        name: 'Steering',
        short: 'Turns your hands into wheel angle',
        what: 'Lets the driver point the front wheels where the car should go.',
        how: 'The steering wheel turns a column with a small gear (pinion) at its end. The pinion slides a toothed bar (rack) left or right, and tie rods push the front wheels to turn. Hydraulic or electric power steering reduces the effort.',
        tip: 'In a corner the front wheels turn at slightly different angles — the inner wheel follows a tighter circle (Ackermann geometry).'
      },
      engine: {
        name: 'Engine',
        short: 'Turns fuel into motion',
        what: 'Burns a mix of fuel and air to produce the power that moves the car.',
        how: 'Inside each cylinder a piston goes through four strokes: intake, compression, power and exhaust. A spark plug ignites the compressed mixture, the expanding gas pushes the piston down, and the crankshaft turns this up-and-down motion into rotation. Scroll down to see the cycle in action.',
        tip: 'At 3,000 rpm each spark plug in a four-stroke engine fires 25 times every second.'
      },
      intake: {
        name: 'Air intake & filter',
        short: 'The engine’s lungs',
        what: 'Supplies clean air to the engine — it takes about 14.7 kg of air to burn 1 kg of petrol.',
        how: 'Air passes through a paper filter that traps dust, then through the throttle body (controlled by the gas pedal) and into the intake manifold, which shares it out between the cylinders.',
        tip: 'A clogged air filter costs power and fuel. It’s one of the cheapest parts to replace yourself.'
      },
      radiator: {
        name: 'Radiator & cooling fan',
        short: 'Keeps the engine from overheating',
        what: 'Removes excess heat — only about a third of the fuel’s energy becomes motion, and most of the rest turns into heat.',
        how: 'A water pump circulates coolant through channels in the engine, where it heats up, then through the thin tubes and fins of the radiator. Air flowing through — helped by the fan — carries the heat away. A thermostat keeps the engine near its ideal temperature (about 90 °C).',
        tip: 'Never open the radiator cap on a hot engine — the coolant is under pressure and can be well above 100 °C.'
      },
      battery: {
        name: 'Battery & charging',
        short: 'Electric power for starting and systems',
        what: 'Powers the starter motor that cranks the engine, and feeds the lights and electronics when the engine is off.',
        how: 'A 12-volt lead-acid battery stores energy chemically. Once the engine is running, the belt-driven alternator generates electricity, powers the car and recharges the battery.',
        tip: 'Cold weather reduces battery capacity — that’s why cars are hardest to start on frosty mornings.'
      },
      fuel: {
        name: 'Fuel tank & fuel system',
        short: 'Stores and delivers petrol',
        what: 'Stores fuel safely and delivers it to the engine at the right pressure.',
        how: 'An electric pump inside the tank pushes fuel through lines and a filter to the injectors, which spray a fine mist into the engine. Fuel vapours are captured by a charcoal canister instead of escaping into the air.',
        tip: 'Always driving on a near-empty tank can shorten the life of the fuel pump — the fuel also keeps it cool.'
      },
      exhaust: {
        name: 'Exhaust system',
        short: 'Cleans and quiets the engine’s breath',
        what: 'Carries hot gases away from the engine, cleans them and reduces noise.',
        how: 'The exhaust manifold collects gases from every cylinder. The catalytic converter uses precious metals (platinum, palladium, rhodium) to turn toxic gases into less harmful ones. The muffler cancels sound waves with chambers and baffles, and oxygen sensors help the engine computer fine-tune the fuel mix.',
        tip: 'Water dripping from the tailpipe is normal — it’s a by-product of burning fuel.'
      },
      transmission: {
        name: 'Gearbox (transmission)',
        short: 'Matches engine speed to road speed',
        what: 'Keeps the engine in its efficient speed range, whether you’re pulling away or cruising on the highway.',
        how: 'Pairs of gears of different sizes trade speed for force: low gears give strong pull for starting off, high gears let the car go fast at low engine rpm. A clutch (manual) or torque converter (automatic) connects and disconnects the engine smoothly.',
        tip: 'An engine only works well in a narrow rpm range. Without gears a car could either pull away or go fast — not both.'
      },
      driveshaft: {
        name: 'Driveshaft',
        short: 'Carries power to the rear axle',
        what: 'Transfers rotation from the gearbox to the rear axle in rear-wheel-drive cars.',
        how: 'It’s a strong, balanced tube with universal joints at each end, which let it keep spinning while the suspension moves up and down. Front-wheel-drive cars use short half-shafts that connect the gearbox straight to the front wheels instead.',
        tip: 'At highway speed a driveshaft can spin over 3,000 times a minute, so it has to be perfectly balanced.'
      },
      differential: {
        name: 'Differential & rear axle',
        short: 'Lets the wheels turn at different speeds',
        what: 'Splits power between the left and right wheels and lets them rotate at different speeds in corners.',
        how: 'In a turn the outer wheel travels further than the inner one. Small “spider” gears inside the differential let one wheel speed up while the other slows down — without them the tyres would skid and wear out. It also holds the final gear reduction.',
        tip: 'That’s why a car can get stuck with one wheel on ice: an open differential sends power to the wheel that spins most easily.'
      },
      wheels: {
        name: 'Wheels & tyres',
        short: 'The only contact with the road',
        what: 'Carry the car’s weight and pass acceleration, braking and steering forces to the road.',
        how: 'The rubber and tread pattern grip the road and channel water away, while the air inside acts as the first spring of the suspension. All of the car’s grip comes from four contact patches, each about the size of your palm.',
        tip: 'Check tyre pressure monthly while the tyres are cold — under-inflation increases fuel use and braking distance.'
      },
      brakes: {
        name: 'Brakes',
        short: 'Turn motion into heat',
        what: 'Slow down and stop the car.',
        how: 'Pressing the pedal pushes brake fluid through lines to the calipers. Hydraulic pressure squeezes the brake pads against a spinning disc, and friction turns the car’s kinetic energy into heat. ABS stops the wheels from locking so you can still steer.',
        tip: 'Brake discs can reach 500 °C or more under hard braking — that’s why many of them are vented.'
      },
      suspension: {
        name: 'Suspension',
        short: 'Keeps the wheels on the road and you comfortable',
        what: 'Absorbs bumps and keeps the tyres pressed to the road for grip and control.',
        how: 'Springs carry the car’s weight and compress over bumps. Shock absorbers (dampers) force oil through small valves so the car doesn’t keep bouncing. Control arms guide each wheel as it moves.',
        tip: 'Worn shock absorbers increase braking distance — the tyres bounce and lose contact with the road.'
      },
      chassis: {
        name: 'Chassis & floor',
        short: 'The backbone everything bolts to',
        what: 'Supports the engine, suspension and body and keeps the whole car rigid.',
        how: 'Older cars and trucks use a separate ladder frame made of steel rails. Most modern cars use a unibody, where the floor, rails and body are welded into one shell — lighter and safer. The tunnel in the middle of the floor makes room for the gearbox and driveshaft.',
        tip: 'A stiffer chassis lets the suspension work more precisely, which makes the car handle better.'
      }
    }
  },

  /* ------------------------------------------------------------------ UK */
  uk: {
    ui: {
      meta: {
        title: 'Під капотом — як насправді працює автомобіль',
        description: 'Інтерактивний гід про те, як працює бензиновий автомобіль. Гортайте, щоб розібрати авто, і натискайте на деталі, щоб дізнатися, що вони роблять.'
      },
      brand: 'Під капотом',
      nav: { explore: 'Огляд', cycle: 'Цикл двигуна', flow: 'Потік потужності', parts: 'Деталі', home: 'Усі авто' },
      lang: 'Мова',
      hero: {
        eyebrow: 'Інтерактивний гід автомобілем',
        title: 'Як насправді працює автомобіль',
        sub: 'Гортайте, щоб розібрати бензиновий автомобіль деталь за деталлю. Натисніть на будь-яку частину, щоб дізнатися, що вона робить.',
        scroll: 'Гортайте, щоб розібрати'
      },
      ch1: {
        kicker: '01 · Оболонка',
        title: 'Спершу кузов',
        text: 'Кузов захищає вас, формує повітряний потік і тримає все на своїх місцях. Дивіться, як він розбирається.'
      },
      ch2: {
        kicker: '02 · Серце',
        title: 'Двигун та енергія',
        text: 'Пальне, повітря й іскра: двигун спалює їх, щоб створити потужність, а радіатор і вихлоп відводять тепло та відпрацьовані гази.'
      },
      ch3: {
        kicker: '03 · Шлях потужності',
        title: 'Від двигуна до дороги',
        text: 'Коробка передач, карданний вал і диференціал передають обертання від двигуна аж до коліс.'
      },
      ch4: {
        kicker: '04 · Керування',
        title: 'Гальмувати, кермувати, поглинати',
        text: 'Гальма, кермо та підвіска перетворюють сиру потужність на автомобіль, яким можна керувати. Тепер натисніть на будь-яку деталь.'
      },
      ui: {
        progress: 'Розібрано',
        hint: 'Тягніть, щоб обертати · Натисніть на деталь',
        hintTouch: 'Тягніть, щоб обертати · Торкніться деталі',
        tooltip: 'Натисніть, щоб дізнатися більше',
        loading: 'Збираємо автомобіль…',
        error: 'Для 3D-перегляду потрібні WebGL та інтернет для завантаження three.js. Решта сторінки працює як звичайно.'
      },
      panel: {
        what: 'Що робить',
        how: 'Як працює',
        tip: 'Варто знати',
        related: 'Пов’язані деталі',
        prev: 'Назад',
        next: 'Далі',
        close: 'Закрити',
        drag: 'Тягніть, щоб обертати'
      },
      cycle: {
        eyebrow: 'Усередині двигуна',
        title: 'Чотиритактний цикл',
        text: 'Майже кожен бензиновий двигун повторює ці чотири кроки тисячі разів на хвилину — у кожному циліндрі.',
        play: 'Відтворити',
        pause: 'Пауза',
        speed: 'Швидкість',
        open: 'Більше про двигун',
        strokes: [
          {
            name: 'Впуск',
            text: 'Поршень рухається вниз, впускний клапан відкривається, і в циліндр надходить суміш повітря та пального.'
          },
          {
            name: 'Стиск',
            text: 'Обидва клапани закриті, поршень піднімається і стискає суміш приблизно в десять разів.'
          },
          {
            name: 'Робочий хід',
            text: 'Свічка запалювання дає іскру. Суміш згоряє, розширюється і штовхає поршень униз — саме це рухає автомобіль.'
          },
          {
            name: 'Випуск',
            text: 'Випускний клапан відкривається, і поршень, піднімаючись, виштовхує відпрацьовані гази у вихлопну систему.'
          }
        ],
        labels: { mix: 'Повітря + пальне', exhaust: 'Вихлоп', spark: 'Свічка', piston: 'Поршень', crank: 'Колінвал' }
      },
      flow: {
        eyebrow: 'Потік потужності',
        title: 'Як потужність доходить до дороги',
        text: 'Простежте шлях енергії від паливного бака до шин. Натисніть на крок, щоб відкрити деталь.'
      },
      parts: {
        eyebrow: 'Каталог деталей',
        title: 'Кожна деталь — з поясненням',
        text: 'Натисніть на картку, щоб відкрити повне пояснення, або фільтруйте за системою.',
        all: 'Усі'
      },
      cats: { body: 'Кузов', engine: 'Двигун та енергія', drivetrain: 'Трансмісія', chassis: 'Шасі та керування' },
      footer: {
        note: 'Навчальний проєкт. Кожен автомобіль тут — спрощена 3D-модель, повністю створена в коді.',
        built: 'Створено на HTML, CSS, JavaScript і three.js',
        top: 'Нагору'
      },
      cars: { label: 'Тип двигуна', gas: 'Бензин', diesel: 'Дизель', electric: 'Електро' },
      home: {
        meta: 'Під капотом — як працює автомобіль?',
        eyebrow: 'Інтерактивний гід автомобілем',
        title: 'Як працює автомобіль?',
        sub: 'Оберіть, що рухає авто. Кожен автомобіль розбирається деталь за деталлю, а кожна деталь пояснює, що вона робить і як працює.',
        choose: 'Оберіть тип двигуна',
        explore: 'Розібрати',
        drag: 'Тягніть, щоб обертати',
        cards: {
          gas: {
            model: 'Chevrolet Impala 1964',
            tagline: 'Бензиновий V8 · Задній привід',
            blurb: 'Класика: пальне й іскра створюють тисячі маленьких вибухів, що штовхають поршні.'
          },
          diesel: {
            model: 'Mercedes-Benz GLK 250 BlueTEC',
            tagline: 'Турбодизель · Повний привід',
            blurb: 'Без свічок запалювання: повітря стискають, доки воно не нагріється так, що пальне спалахує саме.'
          },
          electric: {
            model: 'Tesla Model Y',
            tagline: 'Два електромотори · Повний привід',
            blurb: 'Жодного двигуна внутрішнього згоряння: батарея й магніти майже безшумно крутять колеса.'
          }
        },
        compare: {
          eyebrow: 'Поруч',
          title: 'Порівняння з першого погляду',
          rows: [
            {
              label: 'Джерело енергії',
              gas: 'Бензин у баку',
              diesel: 'Дизельне пальне в баку',
              electric: 'Електрика в батареї'
            },
            {
              label: 'Що створює потужність',
              gas: 'Іскра підпалює суміш пального й повітря',
              diesel: 'Гаряче стиснене повітря підпалює пальне',
              electric: 'Обертове магнітне поле крутить ротор'
            },
            { label: 'Передачі', gas: 'Зазвичай 4–10', diesel: 'Зазвичай 6–9', electric: 'Одна постійна передача' },
            { label: 'Енергія, що доходить до коліс', gas: '≈ 25–30%', diesel: '≈ 30–40%', electric: '≈ 85–90%' },
            {
              label: 'Заправка / зарядка',
              gas: '≈ 5 хвилин',
              diesel: '≈ 5 хвилин',
              electric: '20–40 хв швидкої зарядки або ніч удома'
            },
            {
              label: 'Що виходить із вихлопу',
              gas: 'CO₂, NOx, CO',
              diesel: 'CO₂, NOx, сажа (фільтрується)',
              electric: 'Нічого — вихлопу немає'
            }
          ]
        }
      }
    },
    parts: {
      body: {
        name: 'Кузов',
        short: 'Шкіра й скелет автомобіля водночас',
        what: 'Тримає все разом, формує повітряний потік і захищає пасажирів. Бокові панелі, двері та бампери — усе це частини кузова.',
        how: 'Сучасні кузови складаються зі штампованих сталевих і алюмінієвих листів, зварених в одну жорстку конструкцію — монокок. Зони деформації спереду й ззаду розраховані на те, щоб зминатися під час аварії й поглинати енергію, перш ніж вона дійде до салону.',
        tip: 'Бампер, який ви бачите, зазвичай лише пластикова накладка — справжня енергопоглинальна балка схована за ним.'
      },
      hood: {
        name: 'Капот',
        short: 'Кришка над моторним відсіком',
        what: 'Закриває й захищає моторний відсік та дає доступ до двигуна для обслуговування.',
        how: 'Він кріпиться на петлях біля лобового скла й тримається замком спереду з додатковим запобіжним гачком, тож не відкриється на ходу. Багато капотів спроєктовано так, щоб деформуватися й пом’якшувати удар для пішоходів.',
        tip: 'Під капотом перевіряють оливу, охолоджувальну рідину, гальмівну рідину та рідину омивача — чотири базові рідини, які варто знати кожному водієві.'
      },
      cabin: {
        name: 'Салон, дах і скло',
        short: 'Захисна клітка, у якій ви сидите',
        what: 'Захищає пасажирів від негоди й дає водієві добрий огляд на всі боки.',
        how: 'Стійки даху (A, B і C) утворюють міцну клітку, яка зберігає форму навіть під час перекидання. Лобове скло багатошарове: два шари скла з плівкою між ними, тож воно тріскається, але не розлітається по салону.',
        tip: 'Лобове скло — частина конструкції: воно додає даху жорсткості й слугує опорою для подушки безпеки пасажира.'
      },
      seats: {
        name: 'Сидіння',
        short: 'Там, де безпека зустрічає комфорт',
        what: 'Утримують людей у правильному положенні, щоб ремені й подушки безпеки спрацювали як слід.',
        how: 'Сталевий каркас, прикручений до підлоги, несе пружини й поролон. Підголівники не дають голові різко відкинутися назад під час удару ззаду (хлистова травма).',
        tip: 'Відрегулюйте підголівник так, щоб його верх був на рівні маківки — це засіб безпеки, а не подушка.'
      },
      steering: {
        name: 'Кермове керування',
        short: 'Перетворює рух рук на поворот коліс',
        what: 'Дає водієві змогу спрямовувати передні колеса туди, куди має їхати автомобіль.',
        how: 'Кермо обертає вал із маленькою шестернею на кінці. Шестерня рухає зубчасту рейку ліворуч або праворуч, а кермові тяги повертають передні колеса. Гідравлічний чи електричний підсилювач зменшує зусилля.',
        tip: 'У повороті передні колеса повертаються на трохи різні кути — внутрішнє колесо йде по меншому колу (геометрія Аккермана).'
      },
      engine: {
        name: 'Двигун',
        short: 'Перетворює пальне на рух',
        what: 'Спалює суміш пального й повітря, щоб створити потужність, яка рухає автомобіль.',
        how: 'У кожному циліндрі поршень проходить чотири такти: впуск, стиск, робочий хід і випуск. Свічка підпалює стиснуту суміш, гази розширюються й штовхають поршень униз, а колінчастий вал перетворює рух угору-вниз на обертання. Прогорніть нижче, щоб побачити цикл у дії.',
        tip: 'За 3000 об/хв кожна свічка чотиритактного двигуна іскрить 25 разів щосекунди.'
      },
      intake: {
        name: 'Впуск повітря та фільтр',
        short: 'Легені двигуна',
        what: 'Подає до двигуна чисте повітря — щоб спалити 1 кг бензину, потрібно близько 14,7 кг повітря.',
        how: 'Повітря проходить крізь паперовий фільтр, що затримує пил, далі — через дросельну заслінку (нею керує педаль газу) у впускний колектор, який розподіляє його по циліндрах.',
        tip: 'Забитий повітряний фільтр забирає потужність і збільшує витрату пального. Це одна з найдешевших деталей, яку легко замінити самостійно.'
      },
      radiator: {
        name: 'Радіатор і вентилятор',
        short: 'Не дає двигуну перегрітися',
        what: 'Відводить зайве тепло — лише близько третини енергії пального стає рухом, а більша частина решти перетворюється на тепло.',
        how: 'Водяна помпа ганяє охолоджувальну рідину каналами двигуна, де та нагрівається, а потім — тонкими трубками й ребрами радіатора. Потік повітря, якому допомагає вентилятор, забирає тепло. Термостат тримає двигун біля ідеальної температури (близько 90 °C).',
        tip: 'Ніколи не відкривайте кришку радіатора на гарячому двигуні — рідина під тиском і може бути гарячішою за 100 °C.'
      },
      battery: {
        name: 'Акумулятор і зарядка',
        short: 'Електрика для запуску та систем',
        what: 'Живить стартер, який прокручує двигун, а також світло й електроніку, коли двигун вимкнено.',
        how: '12-вольтовий свинцево-кислотний акумулятор зберігає енергію хімічно. Коли двигун працює, генератор (його обертає ремінь) виробляє електрику, живить автомобіль і заряджає акумулятор.',
        tip: 'На морозі ємність акумулятора падає — тому взимку вранці автомобіль заводиться найважче.'
      },
      fuel: {
        name: 'Паливний бак і паливна система',
        short: 'Зберігає та подає бензин',
        what: 'Безпечно зберігає пальне й подає його до двигуна під потрібним тиском.',
        how: 'Електричний насос усередині бака жене пальне трубками через фільтр до форсунок, які розпилюють його дрібним туманом у двигун. Пари пального вловлює вугільний адсорбер, щоб вони не потрапляли в повітря.',
        tip: 'Постійна їзда з майже порожнім баком може скоротити життя паливного насоса — пальне ще й охолоджує його.'
      },
      exhaust: {
        name: 'Вихлопна система',
        short: 'Очищує й приглушує «подих» двигуна',
        what: 'Відводить гарячі гази від двигуна, очищує їх і зменшує шум.',
        how: 'Випускний колектор збирає гази з кожного циліндра. Каталізатор за допомогою дорогоцінних металів (платини, паладію, родію) перетворює токсичні гази на менш шкідливі. Глушник гасить звукові хвилі камерами й перегородками, а лямбда-зонди допомагають комп’ютеру двигуна точно налаштовувати суміш.',
        tip: 'Вода, що капає з вихлопної труби, — це нормально: вона утворюється під час згоряння пального.'
      },
      transmission: {
        name: 'Коробка передач',
        short: 'Узгоджує оберти двигуна зі швидкістю',
        what: 'Тримає двигун в ефективному діапазоні обертів — і під час рушання, і на трасі.',
        how: 'Пари шестерень різного розміру обмінюють швидкість на силу: низькі передачі дають сильну тягу для рушання, високі дозволяють їхати швидко на низьких обертах. Зчеплення (у механіці) або гідротрансформатор (в автоматі) плавно з’єднує й роз’єднує двигун.',
        tip: 'Двигун добре працює лише у вузькому діапазоні обертів. Без передач автомобіль міг би або рушити, або їхати швидко — але не те й інше.'
      },
      driveshaft: {
        name: 'Карданний вал',
        short: 'Передає потужність на задній міст',
        what: 'Передає обертання від коробки передач до заднього моста в задньопривідних автомобілях.',
        how: 'Це міцна збалансована труба з карданними шарнірами на кінцях, які дають їй обертатися, поки підвіска рухається вгору-вниз. У передньопривідних автомобілях замість нього короткі півосі з’єднують коробку прямо з передніми колесами.',
        tip: 'На трасі карданний вал може робити понад 3000 обертів на хвилину, тому він має бути ідеально збалансованим.'
      },
      differential: {
        name: 'Диференціал і задній міст',
        short: 'Дає колесам крутитися з різною швидкістю',
        what: 'Ділить потужність між лівим і правим колесом і дозволяє їм обертатися з різною швидкістю в поворотах.',
        how: 'У повороті зовнішнє колесо проходить більший шлях, ніж внутрішнє. Маленькі шестерні-сателіти всередині диференціала дають одному колесу крутитися швидше, а іншому — повільніше. Без них шини проковзували б і швидко зношувалися. Тут також розташована головна передача.',
        tip: 'Ось чому автомобіль може застрягнути, коли одне колесо на льоду: вільний диференціал віддає потужність колесу, яке крутиться найлегше.'
      },
      wheels: {
        name: 'Колеса та шини',
        short: 'Єдиний контакт із дорогою',
        what: 'Несуть вагу автомобіля й передають на дорогу сили розгону, гальмування та повороту.',
        how: 'Гума й протектор чіпляються за дорогу та відводять воду, а повітря всередині шини працює як перша пружина підвіски. Усе зчеплення автомобіля забезпечують чотири плями контакту, кожна завбільшки з долоню.',
        tip: 'Перевіряйте тиск у шинах щомісяця, поки шини холодні, — недокачані шини збільшують витрату пального й гальмівний шлях.'
      },
      brakes: {
        name: 'Гальма',
        short: 'Перетворюють рух на тепло',
        what: 'Сповільнюють і зупиняють автомобіль.',
        how: 'Натискання на педаль жене гальмівну рідину трубками до супортів. Гідравлічний тиск притискає колодки до диска, що обертається, і тертя перетворює кінетичну енергію автомобіля на тепло. ABS не дає колесам блокуватися, тож ви можете кермувати й під час гальмування.',
        tip: 'Під час різкого гальмування диски можуть нагріватися до 500 °C і більше — тому їх часто роблять вентильованими.'
      },
      suspension: {
        name: 'Підвіска',
        short: 'Тримає колеса на дорозі, а вас — у комфорті',
        what: 'Поглинає нерівності й притискає шини до дороги для зчеплення й керованості.',
        how: 'Пружини тримають вагу автомобіля й стискаються на нерівностях. Амортизатори проганяють оливу крізь маленькі клапани, щоб автомобіль не розгойдувався. Важелі спрямовують рух кожного колеса.',
        tip: 'Зношені амортизатори збільшують гальмівний шлях — колеса підстрибують і втрачають контакт із дорогою.'
      },
      chassis: {
        name: 'Шасі та підлога',
        short: 'Основа, до якої кріпиться все',
        what: 'Тримає двигун, підвіску й кузов та робить увесь автомобіль жорстким.',
        how: 'Старі автомобілі й вантажівки мають окрему раму зі сталевих лонжеронів. Більшість сучасних авто — з несучим кузовом, де підлога, лонжерони й кузов зварені в одну оболонку: так легше й безпечніше. Тунель посередині підлоги дає місце для коробки передач і карданного вала.',
        tip: 'Жорсткіше шасі дає підвісці працювати точніше, і автомобіль краще керується.'
      }
    }
  },

  /* ------------------------------------------------------------------ RU */
  ru: {
    ui: {
      meta: {
        title: 'Под капотом — как на самом деле работает автомобиль',
        description: 'Интерактивный гид о том, как работает бензиновый автомобиль. Прокручивайте, чтобы разобрать машину, и нажимайте на детали, чтобы узнать, что они делают.'
      },
      brand: 'Под капотом',
      nav: { explore: 'Обзор', cycle: 'Цикл двигателя', flow: 'Поток мощности', parts: 'Детали', home: 'Все авто' },
      lang: 'Язык',
      hero: {
        eyebrow: 'Интерактивный гид по автомобилю',
        title: 'Как на самом деле работает автомобиль',
        sub: 'Прокручивайте, чтобы разобрать бензиновый автомобиль деталь за деталью. Нажмите на любую часть, чтобы узнать, что она делает.',
        scroll: 'Прокрутите, чтобы разобрать'
      },
      ch1: {
        kicker: '01 · Оболочка',
        title: 'Сначала кузов',
        text: 'Кузов защищает вас, формирует воздушный поток и держит всё на своих местах. Смотрите, как он разбирается.'
      },
      ch2: {
        kicker: '02 · Сердце',
        title: 'Двигатель и энергия',
        text: 'Топливо, воздух и искра: двигатель сжигает их, чтобы создать мощность, а радиатор и выхлоп отводят тепло и отработавшие газы.'
      },
      ch3: {
        kicker: '03 · Путь мощности',
        title: 'От двигателя к дороге',
        text: 'Коробка передач, карданный вал и дифференциал передают вращение от двигателя до самых колёс.'
      },
      ch4: {
        kicker: '04 · Управление',
        title: 'Тормозить, рулить, смягчать',
        text: 'Тормоза, рулевое управление и подвеска превращают сырую мощность в автомобиль, которым можно управлять. Теперь нажмите на любую деталь.'
      },
      ui: {
        progress: 'Разобрано',
        hint: 'Тяните, чтобы вращать · Нажмите на деталь',
        hintTouch: 'Тяните, чтобы вращать · Коснитесь детали',
        tooltip: 'Нажмите, чтобы узнать больше',
        loading: 'Собираем автомобиль…',
        error: 'Для 3D-просмотра нужны WebGL и интернет для загрузки three.js. Остальная часть страницы работает как обычно.'
      },
      panel: {
        what: 'Что делает',
        how: 'Как работает',
        tip: 'Полезно знать',
        related: 'Связанные детали',
        prev: 'Назад',
        next: 'Далее',
        close: 'Закрыть',
        drag: 'Тяните, чтобы вращать'
      },
      cycle: {
        eyebrow: 'Внутри двигателя',
        title: 'Четырёхтактный цикл',
        text: 'Почти каждый бензиновый двигатель повторяет эти четыре шага тысячи раз в минуту — в каждом цилиндре.',
        play: 'Воспроизвести',
        pause: 'Пауза',
        speed: 'Скорость',
        open: 'Подробнее о двигателе',
        strokes: [
          {
            name: 'Впуск',
            text: 'Поршень движется вниз, впускной клапан открывается, и в цилиндр поступает смесь воздуха и топлива.'
          },
          { name: 'Сжатие', text: 'Оба клапана закрыты, поршень поднимается и сжимает смесь примерно в десять раз.' },
          {
            name: 'Рабочий ход',
            text: 'Свеча зажигания даёт искру. Смесь сгорает, расширяется и толкает поршень вниз — именно это движет автомобиль.'
          },
          {
            name: 'Выпуск',
            text: 'Выпускной клапан открывается, и поднимающийся поршень выталкивает отработавшие газы в выхлопную систему.'
          }
        ],
        labels: { mix: 'Воздух + топливо', exhaust: 'Выхлоп', spark: 'Свеча', piston: 'Поршень', crank: 'Коленвал' }
      },
      flow: {
        eyebrow: 'Поток мощности',
        title: 'Как мощность доходит до дороги',
        text: 'Проследите путь энергии от топливного бака до шин. Нажмите на шаг, чтобы открыть деталь.'
      },
      parts: {
        eyebrow: 'Каталог деталей',
        title: 'Каждая деталь — с объяснением',
        text: 'Нажмите на карточку, чтобы открыть полное объяснение, или фильтруйте по системе.',
        all: 'Все'
      },
      cats: { body: 'Кузов', engine: 'Двигатель и энергия', drivetrain: 'Трансмиссия', chassis: 'Шасси и управление' },
      footer: {
        note: 'Учебный проект. Каждый автомобиль здесь — упрощённая 3D-модель, полностью созданная в коде.',
        built: 'Сделано на HTML, CSS, JavaScript и three.js',
        top: 'Наверх'
      },
      cars: { label: 'Тип двигателя', gas: 'Бензин', diesel: 'Дизель', electric: 'Электро' },
      home: {
        meta: 'Под капотом — как работает автомобиль?',
        eyebrow: 'Интерактивный гид по автомобилю',
        title: 'Как работает автомобиль?',
        sub: 'Выберите, что движет машину. Каждый автомобиль разбирается деталь за деталью, а каждая деталь объясняет, что она делает и как работает.',
        choose: 'Выберите тип двигателя',
        explore: 'Разобрать',
        drag: 'Тяните, чтобы вращать',
        cards: {
          gas: {
            model: 'Chevrolet Impala 1964',
            tagline: 'Бензиновый V8 · Задний привод',
            blurb: 'Классика: топливо и искра создают тысячи маленьких взрывов, которые толкают поршни.'
          },
          diesel: {
            model: 'Mercedes-Benz GLK 250 BlueTEC',
            tagline: 'Турбодизель · Полный привод',
            blurb: 'Без свечей зажигания: воздух сжимают, пока он не нагреется так, что топливо вспыхивает само.'
          },
          electric: {
            model: 'Tesla Model Y',
            tagline: 'Два электромотора · Полный привод',
            blurb: 'Никакого двигателя внутреннего сгорания: батарея и магниты почти бесшумно вращают колёса.'
          }
        },
        compare: {
          eyebrow: 'Рядом',
          title: 'Сравнение с первого взгляда',
          rows: [
            {
              label: 'Источник энергии',
              gas: 'Бензин в баке',
              diesel: 'Дизельное топливо в баке',
              electric: 'Электричество в батарее'
            },
            {
              label: 'Что создаёт мощность',
              gas: 'Искра поджигает смесь топлива и воздуха',
              diesel: 'Горячий сжатый воздух поджигает топливо',
              electric: 'Вращающееся магнитное поле крутит ротор'
            },
            { label: 'Передачи', gas: 'Обычно 4–10', diesel: 'Обычно 6–9', electric: 'Одна постоянная передача' },
            { label: 'Энергия, доходящая до колёс', gas: '≈ 25–30%', diesel: '≈ 30–40%', electric: '≈ 85–90%' },
            {
              label: 'Заправка / зарядка',
              gas: '≈ 5 минут',
              diesel: '≈ 5 минут',
              electric: '20–40 мин быстрой зарядки или ночь дома'
            },
            {
              label: 'Что выходит из выхлопа',
              gas: 'CO₂, NOx, CO',
              diesel: 'CO₂, NOx, сажа (фильтруется)',
              electric: 'Ничего — выхлопа нет'
            }
          ]
        }
      }
    },
    parts: {
      body: {
        name: 'Кузов',
        short: 'Кожа и скелет автомобиля одновременно',
        what: 'Держит всё вместе, формирует воздушный поток и защищает пассажиров. Боковые панели, двери и бамперы — всё это части кузова.',
        how: 'Современные кузова состоят из штампованных стальных и алюминиевых листов, сваренных в одну жёсткую конструкцию — монокок. Зоны деформации спереди и сзади рассчитаны на то, чтобы сминаться при аварии и поглощать энергию, прежде чем она дойдёт до салона.',
        tip: 'Бампер, который вы видите, обычно лишь пластиковая накладка — настоящая энергопоглощающая балка спрятана за ним.'
      },
      hood: {
        name: 'Капот',
        short: 'Крышка над моторным отсеком',
        what: 'Закрывает и защищает моторный отсек и даёт доступ к двигателю для обслуживания.',
        how: 'Он крепится на петлях у лобового стекла и удерживается замком спереди с дополнительным страховочным крючком, поэтому не откроется на ходу. Многие капоты спроектированы так, чтобы деформироваться и смягчать удар для пешеходов.',
        tip: 'Под капотом проверяют масло, охлаждающую жидкость, тормозную жидкость и жидкость омывателя — четыре базовые жидкости, которые стоит знать каждому водителю.'
      },
      cabin: {
        name: 'Салон, крыша и стёкла',
        short: 'Защитная клетка, в которой вы сидите',
        what: 'Защищает пассажиров от непогоды и даёт водителю хороший обзор во все стороны.',
        how: 'Стойки крыши (A, B и C) образуют прочную клетку, которая сохраняет форму даже при опрокидывании. Лобовое стекло многослойное: два слоя стекла с плёнкой между ними, поэтому оно трескается, но не разлетается по салону.',
        tip: 'Лобовое стекло — часть конструкции: оно добавляет крыше жёсткости и служит опорой для подушки безопасности пассажира.'
      },
      seats: {
        name: 'Сиденья',
        short: 'Где безопасность встречается с комфортом',
        what: 'Удерживают людей в правильном положении, чтобы ремни и подушки безопасности сработали как надо.',
        how: 'Стальной каркас, прикрученный к полу, несёт пружины и поролон. Подголовники не дают голове резко откинуться назад при ударе сзади (хлыстовая травма).',
        tip: 'Отрегулируйте подголовник так, чтобы его верх был на уровне макушки — это средство безопасности, а не подушка.'
      },
      steering: {
        name: 'Рулевое управление',
        short: 'Превращает движение рук в поворот колёс',
        what: 'Позволяет водителю направлять передние колёса туда, куда должен ехать автомобиль.',
        how: 'Руль вращает вал с маленькой шестернёй на конце. Шестерня двигает зубчатую рейку влево или вправо, а рулевые тяги поворачивают передние колёса. Гидравлический или электрический усилитель уменьшает усилие.',
        tip: 'В повороте передние колёса поворачиваются на немного разные углы — внутреннее колесо идёт по меньшему кругу (геометрия Аккермана).'
      },
      engine: {
        name: 'Двигатель',
        short: 'Превращает топливо в движение',
        what: 'Сжигает смесь топлива и воздуха, чтобы создать мощность, которая движет автомобиль.',
        how: 'В каждом цилиндре поршень проходит четыре такта: впуск, сжатие, рабочий ход и выпуск. Свеча поджигает сжатую смесь, газы расширяются и толкают поршень вниз, а коленчатый вал превращает движение вверх-вниз во вращение. Прокрутите ниже, чтобы увидеть цикл в действии.',
        tip: 'При 3000 об/мин каждая свеча четырёхтактного двигателя искрит 25 раз в секунду.'
      },
      intake: {
        name: 'Впуск воздуха и фильтр',
        short: 'Лёгкие двигателя',
        what: 'Подаёт в двигатель чистый воздух — чтобы сжечь 1 кг бензина, нужно около 14,7 кг воздуха.',
        how: 'Воздух проходит через бумажный фильтр, задерживающий пыль, затем через дроссельную заслонку (ей управляет педаль газа) во впускной коллектор, который распределяет его по цилиндрам.',
        tip: 'Забитый воздушный фильтр отнимает мощность и увеличивает расход топлива. Это одна из самых дешёвых деталей, которую легко заменить самому.'
      },
      radiator: {
        name: 'Радиатор и вентилятор',
        short: 'Не даёт двигателю перегреться',
        what: 'Отводит лишнее тепло — лишь около трети энергии топлива становится движением, а большая часть остального превращается в тепло.',
        how: 'Водяной насос гонит охлаждающую жидкость по каналам двигателя, где она нагревается, а затем по тонким трубкам и рёбрам радиатора. Поток воздуха, которому помогает вентилятор, уносит тепло. Термостат держит двигатель около идеальной температуры (примерно 90 °C).',
        tip: 'Никогда не открывайте крышку радиатора на горячем двигателе — жидкость под давлением и может быть горячее 100 °C.'
      },
      battery: {
        name: 'Аккумулятор и зарядка',
        short: 'Электричество для запуска и систем',
        what: 'Питает стартер, который проворачивает двигатель, а также свет и электронику, когда двигатель выключен.',
        how: '12-вольтовый свинцово-кислотный аккумулятор хранит энергию химически. Когда двигатель работает, генератор (его вращает ремень) вырабатывает электричество, питает автомобиль и заряжает аккумулятор.',
        tip: 'На морозе ёмкость аккумулятора падает — поэтому зимним утром машина заводится труднее всего.'
      },
      fuel: {
        name: 'Топливный бак и топливная система',
        short: 'Хранит и подаёт бензин',
        what: 'Безопасно хранит топливо и подаёт его в двигатель под нужным давлением.',
        how: 'Электрический насос внутри бака гонит топливо по трубкам через фильтр к форсункам, которые распыляют его мелким туманом в двигатель. Пары топлива улавливает угольный адсорбер, чтобы они не попадали в воздух.',
        tip: 'Постоянная езда с почти пустым баком может сократить жизнь топливного насоса — топливо ещё и охлаждает его.'
      },
      exhaust: {
        name: 'Выхлопная система',
        short: 'Очищает и приглушает «дыхание» двигателя',
        what: 'Отводит горячие газы от двигателя, очищает их и снижает шум.',
        how: 'Выпускной коллектор собирает газы из каждого цилиндра. Катализатор с помощью драгоценных металлов (платины, палладия, родия) превращает токсичные газы в менее вредные. Глушитель гасит звуковые волны камерами и перегородками, а лямбда-зонды помогают компьютеру двигателя точно настраивать смесь.',
        tip: 'Вода, капающая из выхлопной трубы, — это нормально: она образуется при сгорании топлива.'
      },
      transmission: {
        name: 'Коробка передач',
        short: 'Согласует обороты двигателя со скоростью',
        what: 'Держит двигатель в эффективном диапазоне оборотов — и при трогании, и на трассе.',
        how: 'Пары шестерён разного размера меняют скорость на силу: низкие передачи дают сильную тягу для трогания, высокие позволяют ехать быстро на низких оборотах. Сцепление (в механике) или гидротрансформатор (в автомате) плавно соединяет и разъединяет двигатель.',
        tip: 'Двигатель хорошо работает лишь в узком диапазоне оборотов. Без передач машина могла бы либо тронуться, либо ехать быстро — но не то и другое.'
      },
      driveshaft: {
        name: 'Карданный вал',
        short: 'Передаёт мощность на задний мост',
        what: 'Передаёт вращение от коробки передач к заднему мосту в заднеприводных автомобилях.',
        how: 'Это прочная сбалансированная труба с карданными шарнирами на концах, которые позволяют ей вращаться, пока подвеска движется вверх-вниз. В переднеприводных автомобилях вместо него короткие полуоси соединяют коробку прямо с передними колёсами.',
        tip: 'На трассе карданный вал может делать больше 3000 оборотов в минуту, поэтому он должен быть идеально сбалансирован.'
      },
      differential: {
        name: 'Дифференциал и задний мост',
        short: 'Позволяет колёсам вращаться с разной скоростью',
        what: 'Делит мощность между левым и правым колесом и позволяет им вращаться с разной скоростью в поворотах.',
        how: 'В повороте внешнее колесо проходит больший путь, чем внутреннее. Маленькие шестерни-сателлиты внутри дифференциала позволяют одному колесу крутиться быстрее, а другому — медленнее. Без них шины проскальзывали бы и быстро изнашивались. Здесь же находится главная передача.',
        tip: 'Вот почему машина может застрять, когда одно колесо на льду: свободный дифференциал отдаёт мощность колесу, которое крутится легче всего.'
      },
      wheels: {
        name: 'Колёса и шины',
        short: 'Единственный контакт с дорогой',
        what: 'Несут вес автомобиля и передают на дорогу силы разгона, торможения и поворота.',
        how: 'Резина и протектор цепляются за дорогу и отводят воду, а воздух внутри шины работает как первая пружина подвески. Всё сцепление автомобиля обеспечивают четыре пятна контакта, каждое размером с ладонь.',
        tip: 'Проверяйте давление в шинах раз в месяц, пока шины холодные, — недокачанные шины увеличивают расход топлива и тормозной путь.'
      },
      brakes: {
        name: 'Тормоза',
        short: 'Превращают движение в тепло',
        what: 'Замедляют и останавливают автомобиль.',
        how: 'Нажатие на педаль гонит тормозную жидкость по трубкам к суппортам. Гидравлическое давление прижимает колодки к вращающемуся диску, и трение превращает кинетическую энергию автомобиля в тепло. ABS не даёт колёсам блокироваться, поэтому вы можете рулить и во время торможения.',
        tip: 'При резком торможении диски могут нагреваться до 500 °C и выше — поэтому их часто делают вентилируемыми.'
      },
      suspension: {
        name: 'Подвеска',
        short: 'Держит колёса на дороге, а вас — в комфорте',
        what: 'Поглощает неровности и прижимает шины к дороге для сцепления и управляемости.',
        how: 'Пружины держат вес автомобиля и сжимаются на неровностях. Амортизаторы прогоняют масло через маленькие клапаны, чтобы машина не раскачивалась. Рычаги направляют движение каждого колеса.',
        tip: 'Изношенные амортизаторы увеличивают тормозной путь — колёса подпрыгивают и теряют контакт с дорогой.'
      },
      chassis: {
        name: 'Шасси и пол',
        short: 'Основа, к которой крепится всё',
        what: 'Держит двигатель, подвеску и кузов и делает весь автомобиль жёстким.',
        how: 'Старые автомобили и грузовики имеют отдельную раму из стальных лонжеронов. Большинство современных машин — с несущим кузовом, где пол, лонжероны и кузов сварены в одну оболочку: так легче и безопаснее. Тоннель посередине пола даёт место для коробки передач и карданного вала.',
        tip: 'Более жёсткое шасси позволяет подвеске работать точнее, и автомобиль лучше управляется.'
      }
    }
  }
};

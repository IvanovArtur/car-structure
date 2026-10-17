/* "At the car service" tips: how not to get tricked into paying for work the car
   doesn't need. For every part: real warning signs, common upsells ("they say" →
   reality) and questions to ask. `byCar` replaces a part's tips for one powertrain.
   Used by the car pages (panel + #service section) and the start page (rules). */
window.SERVICE = {
  /* ------------------------------------------------------------------ EN */
  en: {
    ui: {
      nav: 'Service tips',
      eyebrow: 'Know before you go',
      title: 'Don’t get tricked at the car service',
      text: 'Most mechanics are honest, but some use jargon to sell work your car doesn’t need. Learn the real warning signs and the right questions to ask.',
      myths: {
        gas: 'Common upsells on petrol cars',
        diesel: 'Common upsells on diesel cars',
        electric: 'Common upsells on electric cars'
      },
      mythsText: 'What you might hear, and what is actually true. Open a card to see the part and more tips.',
      rulesTitle: '8 rules for every visit',
      caution: 'Not every recommendation is a trick. Brakes, tyres, steering and suspension keep you alive: if you doubt a diagnosis, get a second opinion instead of skipping the repair.',
      note: 'General advice for modern cars. Intervals differ between models, so always check your owner’s manual.',
      panel: 'At the car service',
      signs: 'Real signs it needs attention',
      they: 'They say',
      truth: 'Reality',
      ask: 'Ask the mechanic',
      more: 'More about this part',
      home: {
        eyebrow: 'Going to a car service?',
        title: 'Don’t get tricked',
        text: 'Knowing how your car works is the best protection against paying for repairs it doesn’t need. Start with these rules, then open a car to see tips for every part.',
        cta: 'Tips for this car'
      }
    },
    rules: [
      { title: 'Get it in writing', text: 'Ask for a written estimate before work starts, and say clearly: “Call me before doing anything that isn’t on this list.”' },
      { title: 'Ask to see it', text: 'Ask them to show you the problem on your car: the worn part, a photo or video, a measurement in millimetres, a voltage or a fault code.' },
      { title: 'Take your old parts', text: 'Ask for the replaced parts back. It proves they were really replaced, and that they really were worn.' },
      { title: 'Follow the manual, not the menu', text: 'Your owner’s manual lists what the car needs and when. A shop’s “recommended package” often adds extras.' },
      { title: 'Recommended is not required', text: 'Ask: “Is this a safety issue? What happens if I wait?” Ask them to sort the work into now, soon and keep an eye on it.' },
      { title: 'Warning light = fault code', text: 'Ask for the exact code and look it up yourself. A basic OBD code reader costs less than one diagnosis.' },
      { title: 'Second opinion for big jobs', text: 'For any large bill, get another quote. An honest shop won’t mind.' },
      { title: 'Keep every receipt', text: 'Receipts are your car’s history and your evidence. In the EU, servicing at an independent garage doesn’t void the warranty if it follows the schedule and uses proper parts.' }
    ],
    parts: {
      body: {
        signs: ['Bubbling paint or rust at the wheel arches and door bottoms', 'Doors or the boot that suddenly don’t close evenly: a sign of hidden damage'],
        watch: [{ claim: '“This scratch needs a full panel respray.”', truth: 'Scratches that haven’t gone through the clear coat can often be polished out, and small dents fixed with paintless dent repair, at a fraction of the price.' }],
        ask: ['Can this be polished or fixed with paintless dent repair instead of repainting?']
      },
      hood: {
        signs: ['The hood doesn’t latch, or the safety catch doesn’t hold', 'Fresh fluid stains or drips under the engine bay'],
        watch: [{ claim: '“Your fluids were low, so we topped them up” (as an extra on the bill).', truth: 'Checking oil, coolant, brake and washer fluid takes two minutes, and you can do it yourself. A level that keeps dropping is a symptom: ask where it is leaking instead of paying for top-ups.' }],
        ask: ['Which fluid was low, by how much, and where is it going?']
      },
      cabin: {
        signs: ['Air conditioning that blows warm or smells musty', 'A chip in the windscreen that starts to spread into a crack'],
        watch: [
          { claim: '“Your air conditioning needs a regas every year.”', truth: 'The AC system is sealed. If it still blows cold, it doesn’t need refilling. If it keeps losing gas, there is a leak that should be found, not topped up every year.' },
          { claim: '“The windscreen has to be replaced.”', truth: 'A chip smaller than a coin and outside the driver’s line of sight can usually be repaired with resin in half an hour.' }
        ],
        ask: ['What vent temperature and system pressure did you measure?']
      },
      seats: {
        signs: ['The airbag warning light is on', 'A seat belt that doesn’t retract, or doesn’t lock when tugged sharply'],
        watch: [{ claim: '“The airbag light means the airbag module must be replaced.”', truth: 'Very often the cause is a loose connector or a worn wire under the front seat (seat sensor, belt buckle). Ask for the exact fault code first.' }],
        ask: ['What is the exact fault code, and which component does it point to?']
      },
      steering: {
        signs: ['The car pulls to one side on a straight, flat road', 'Play or a knock in the steering wheel, or a whine when turning', 'The steering wheel is off-centre when driving straight'],
        watch: [
          { claim: '“You need a wheel alignment” (at every visit).', truth: 'Alignment is needed after a hard hit on a kerb or pothole, after steering or suspension parts are replaced, or when the tyres wear unevenly. Otherwise it usually stays put.' },
          { claim: '“Power steering fluid flush.”', truth: 'Many modern cars have electric power steering with no fluid at all. If yours is hydraulic, check whether the manual lists a fluid change.' }
        ],
        ask: ['Can I have the before-and-after alignment printout?']
      },
      engine: {
        signs: ['Check-engine light on (if it flashes, stop driving)', 'Knocking, rattling or other new noises', 'Using more than about 1 litre of oil per 1,000 km', 'Blue or thick white smoke from the exhaust'],
        watch: [
          { claim: '“Your engine needs a flush.”', truth: 'Engine flushes aren’t part of carmakers’ maintenance schedules. Changing the oil and filter on time keeps the engine clean.' },
          { claim: '“The oil is black, so change it now.”', truth: 'Oil darkens quickly because it holds dirt in suspension. That’s its job. Go by the interval in the manual (km or months) and the level on the dipstick, not by the colour.' },
          { claim: '“Time to replace the spark plugs.”', truth: 'Modern iridium or platinum plugs often last 60,000 to 100,000 km or more. Check the interval in your manual.' }
        ],
        ask: ['Is this in my car’s maintenance schedule? Show me where.', 'Which fault code is stored? Can I see the live data?']
      },
      intake: {
        signs: ['An air filter that looks dark and clogged when held up to the light', 'Whistling or hissing from the intake (an air leak)'],
        watch: [
          { claim: '“Your air filter is filthy” (while showing you a dirty filter).', truth: 'Ask them to take it out of your car in front of you. An air filter is a cheap 5-minute job that you can often do yourself, and changing it at every oil change is usually too often.' },
          { claim: '“Throttle body cleaning service.”', truth: 'It’s only worth doing if there is a real symptom, such as an unstable idle. It isn’t routine maintenance.' }
        ],
        ask: ['Can you take the filter out of my car and show me?']
      },
      radiator: {
        signs: ['The temperature gauge climbs above its usual position', 'A sweet smell, or green, pink or orange drops under the car', 'A coolant level that keeps dropping'],
        watch: [
          { claim: '“Coolant flush, every year.”', truth: 'Modern long-life coolant typically lasts 5 years or 150,000 km or more. Follow the interval in your manual.' },
          { claim: '“The radiator is leaking, so you need a new one.”', truth: 'Ask for a pressure test that shows where it leaks. A cheap hose or clamp is often the real culprit.' }
        ],
        ask: ['Did you do a pressure test? Where exactly is the leak?']
      },
      battery: {
        signs: ['The engine cranks slowly, especially on cold mornings', 'The battery is more than 5 years old', 'Warning lights or electrical glitches when starting'],
        watch: [{ claim: '“Your battery is weak, so it needs replacing.”', truth: 'A battery can simply be flat after lots of short trips. Ask for the printout of a proper battery test (measured cold-cranking amps vs the rating). A healthy, fully charged battery reads about 12.6 V.' }],
        ask: ['Can I see the tester printout: measured CCA versus the rating on the label?']
      },
      fuel: {
        signs: ['A smell of fuel around the car', 'Hard starting, or stalling after refuelling'],
        watch: [
          { claim: '“Fuel system and injector cleaning.”', truth: 'With normal fuel from a decent station, injectors rarely need cleaning. It’s only worth it if a diagnosis points at the injectors.' },
          { claim: '“Your car needs premium fuel.”', truth: 'Only if the manual or the sticker on the fuel flap says so. Higher octane gives no benefit to an engine designed for regular.' }
        ],
        ask: ['Is the fuel filter a service item on my car, and at what interval?']
      },
      exhaust: {
        signs: ['A much louder exhaust, roaring or popping', 'Rattling from underneath at idle', 'An exhaust smell inside the cabin. This is dangerous: get it checked right away'],
        watch: [
          { claim: '“The catalytic converter has failed.”', truth: 'The fault code (P0420 on many cars) can also come from an oxygen sensor, an exhaust leak or a misfire. Ask what they checked before replacing an expensive catalyst.' },
          { claim: '“The whole exhaust has to be replaced.”', truth: 'A rattle is often just a loose heat shield or a broken clamp, and a single rusted section can be replaced on its own.' }
        ],
        ask: ['What exactly is rattling? Can just that section or clamp be fixed?']
      },
      transmission: {
        signs: ['Slipping: the revs rise but the car doesn’t speed up', 'Harsh, late or jerky gear changes', 'A burning smell, or red fluid under the car'],
        watch: [
          { claim: '“Transmission flush.”', truth: 'Check the manual: some gearboxes have a fluid-change interval and some have none. If you do it, the standard is a drain-and-fill with the exact specified fluid. The wrong fluid can damage the gearbox.' },
          { claim: '“Your clutch is gone.”', truth: 'A slipping clutch is easy to show: in a high gear at low revs, press the accelerator hard. If the revs jump but the car doesn’t speed up, it slips. If it doesn’t, ask why they think so.' }
        ],
        ask: ['Which fluid specification are you using, and is it the one in my manual?']
      },
      driveshaft: {
        signs: ['Clicking when turning at full lock (the CV joint)', 'A clunk when pulling away, or vibration at speed'],
        watch: [{ claim: '“The CV boot is torn, so the whole driveshaft must be replaced.”', truth: 'If the joint doesn’t click yet, a new rubber boot and grease is often enough. Act quickly, because dirt that gets inside soon destroys the joint.' }],
        ask: ['Is it only the boot, or is the joint itself worn? Does it click?']
      },
      differential: {
        signs: ['A howl or whine that changes with speed, not with revs', 'Oil leaking around the axle'],
        watch: [{ claim: '“The differential oil needs changing.”', truth: 'This can be legitimate on rear-wheel and all-wheel-drive cars, but the intervals are long. Check whether and when it’s in your schedule, and ask to see the old oil.' }],
        ask: ['When is the differential oil due according to my schedule?']
      },
      wheels: {
        signs: ['Tread worn down to the wear bars (1.6 mm, the legal minimum in the EU; 3 mm is a safer limit)', 'Bulges or cracks in the sidewall', 'Uneven wear on one edge'],
        watch: [
          { claim: '“Your tyres need replacing.”', truth: 'Ask for the measured tread depth of each tyre in millimetres, and check it yourself with a cheap gauge. The 4-digit code on the sidewall (e.g. 2319 = week 23 of 2019) shows the tyre’s age.' },
          { claim: '“Fill your tyres with nitrogen.”', truth: 'Air is already 78% nitrogen. Checking the pressure regularly matters far more than the gas inside.' }
        ],
        ask: ['What is the tread depth on each tyre, in mm?']
      },
      brakes: {
        signs: ['Squealing or grinding when braking', 'Vibration in the pedal or steering wheel when braking', 'A soft or sinking brake pedal: get it checked immediately'],
        watch: [
          { claim: '“You need new pads and discs.”', truth: 'Ask for numbers: pad thickness in mm (around 3 mm or less means replace) and disc thickness against the minimum stamped on the disc. Pads often wear out twice as fast as discs.' },
          { claim: '“Brake fluid change.”', truth: 'This one is usually legitimate: brake fluid absorbs water over time, and many makers recommend changing it every 2 years. Check your manual.' }
        ],
        ask: ['How many mm of pad is left, and what is the disc thickness versus the minimum?']
      },
      suspension: {
        signs: ['The car keeps bouncing after a bump', 'Clunks or knocks over bumps', 'The nose dives hard when braking'],
        watch: [{ claim: '“Your shock absorbers are leaking.”', truth: 'A light oily film (“misting”) is normal; a shock that is wet with dripping oil is not. Ask to see it on the lift. Shocks are replaced in pairs on the same axle, and that part is fair.' }],
        ask: ['Can you show me the leak or the play with the car on the lift?']
      },
      chassis: {
        signs: ['Rust holes or flaking metal underneath', 'Damage after hitting a high kerb or a big bump'],
        watch: [{ claim: '“You need an underbody rust-proofing treatment.”', truth: 'New cars already have factory corrosion protection and long anti-rust warranties. A badly applied coating can even trap moisture.' }],
        ask: ['Can I see it on the lift myself, or get photos?']
      },
      frunk: {
        signs: ['The frunk won’t open: often a sign that the 12 V battery is dying', 'Water collecting inside after rain (a blocked drain)'],
        watch: [{ claim: '“The frunk latch needs replacing.”', truth: 'If the frunk and doors won’t open electrically, check the 12 V battery first. A blocked drain or a worn seal is much cheaper than new parts.' }],
        ask: ['Have you checked the 12 V battery first?']
      }
    },
    byCar: {
      diesel: {
        engine: {
          signs: ['Hard to start when cold (glow plugs)', 'Black smoke when accelerating', 'Rough idle or knocking that changes as the engine warms up'],
          watch: [
            { claim: '“All the injectors need replacing.”', truth: 'Ask for a leak-off (back-flow) test or the injector correction values from the diagnostic tool. Often only one injector is faulty, or just its sealing washer leaks.' },
            { claim: '“Any diesel oil will do.”', truth: 'Engines with a particulate filter need low-ash oil with the maker’s approval (for Mercedes, for example MB 229.51 or 229.52). The wrong oil clogs the filter faster, so check what goes in.' }
          ],
          ask: ['Can you show me the leak-off test or the correction values for each injector?']
        },
        turbo: {
          signs: ['Loss of power, often with a warning light (limp mode)', 'A new siren-like whistle', 'Lots of blue smoke, or oil pooling in the intake pipes'],
          watch: [{ claim: '“The turbo is dead, so you need a new one.”', truth: 'Lost boost is often caused by a split boost hose, a sticking vane mechanism or a faulty sensor. A thin film of oil in the pipes and a tiny side-to-side play in the shaft are normal.' }],
          ask: ['Did you smoke-test the boost pipes for leaks and check the actuator?']
        },
        exhaust: {
          signs: ['The particulate filter (DPF) warning light', 'The fan runs on and the idle is high after you switch off: a regeneration was interrupted', 'Limp mode with low power'],
          watch: [{ claim: '“The DPF is blocked: replace it, or let us remove it.”', truth: 'Removing a DPF is illegal in the EU and many other countries, and the car fails inspection. A forced regeneration or professional cleaning often solves it for a fraction of the cost. The usual cause is lots of short trips; a regular 20–30 minute motorway drive helps.' }],
          ask: ['What are the measured soot load and differential pressure? Did you try a forced regeneration?']
        },
        adblue: {
          signs: ['An AdBlue warning with a km countdown: at zero the engine won’t restart', 'White crystals around the filler or the injector'],
          watch: [
            { claim: '“We can switch off the AdBlue system for you.”', truth: 'An AdBlue “delete” or emulator is illegal and can fail inspection. Most faults are a sensor, a heater or crystallised fluid, and those parts can be fixed.' },
            { claim: 'Topping up AdBlue at service prices.', truth: 'AdBlue is cheap at any fuel station, and you can pour it in yourself through the blue cap.' }
          ],
          ask: ['Which exact component failed: the sensor, the heater, the pump or the injector?']
        },
        fuel: {
          signs: ['Hard starting, or misfiring after refuelling', 'A water-in-fuel warning'],
          watch: [{ claim: '“Diesel fuel system cleaning.”', truth: 'Not a maintenance item. What is real on a diesel is the fuel filter, which also separates water. Change it at the interval in your manual.' }],
          ask: ['When was the fuel filter last changed, according to the service book?']
        },
        battery: {
          signs: ['The engine cranks slowly, especially on cold mornings', 'The start-stop system stops working', 'The battery is more than 5 years old'],
          watch: [{ claim: '“Your car needs a special battery, and it has to be coded.”', truth: 'Often true: cars with start-stop need an AGM or EFB battery, and many need the new battery registered by computer. That’s a fair charge, but ask for a proper battery test first.' }],
          ask: ['Can I see the tester printout: measured CCA versus the rating on the label?']
        },
        transferCase: {
          signs: ['Clunks or binding when turning sharply at low speed', 'A whine or vibration from the middle of the car'],
          watch: [{ claim: '“You must replace all four tyres, not just two.”', truth: 'On an all-wheel-drive car this can be fair: a big tread difference between the axles makes the transfer case and differentials work all the time. Ask what maximum difference the maker allows.' }],
          ask: ['What is the tread difference between the front and rear tyres, in mm?']
        }
      },
      electric: {
        hvBattery: {
          signs: ['Range clearly lower than similar cars of the same age, in the same season', 'Warning messages about the battery or charging'],
          watch: [
            { claim: '“Your battery is worn out, so you need a new pack.”', truth: 'Losing 10–20% of range over many years is normal, and range drops by up to 20–30% in freezing weather. Ask for a battery State of Health (SoH) report from a proper diagnostic tool.' },
            { claim: '“The high-voltage battery needs regular servicing.”', truth: 'For most EVs, including the Model Y, the high-voltage battery has no routine service. Only trained, certified technicians should work on it.' }
          ],
          ask: ['Can I get the State of Health report for the battery?']
        },
        motor: {
          signs: ['A new whine, hum or clunk when accelerating or lifting off', 'A drive-unit warning message'],
          watch: [{ claim: '“Oil change, spark plugs, timing belt.”', truth: 'An electric car has none of these. The drive unit uses long-life oil that rarely needs changing, if ever. If someone offers an “engine service”, ask exactly what they will do.' }],
          ask: ['Which items in the manufacturer’s schedule are you doing?']
        },
        inverter: {
          signs: ['A sudden loss of power with a warning message', 'The car refuses to go into drive'],
          watch: [{ claim: '“The inverter has to be replaced.”', truth: 'Ask for the exact fault code. Some faults are fixed by a software update or a cheaper component, so get the manufacturer’s service centre to confirm before replacing an expensive unit.' }],
          ask: ['What is the fault code, and is there a software update for it?']
        },
        charging: {
          signs: ['The cable won’t lock, or charging stops halfway', 'Fast charging much slower than usual'],
          watch: [{ claim: '“The charge port is broken and needs replacing.”', truth: 'The cause is often dirt on the pins, a stuck latch or a faulty charger at the station, so try another charger. Slower charging in cold weather or at a high battery level is normal.' }],
          ask: ['Did you try a different charger or cable?']
        },
        thermal: {
          signs: ['Heating or cooling weaker than usual', 'Battery or coolant warning messages'],
          watch: [{ claim: '“Coolant flush and air-conditioning regas.”', truth: 'Check the schedule: the coolant is long-life and the AC system is sealed. The real service item is the cabin air filter, a cheap part that is often easy to change yourself.' }],
          ask: ['Is this in the maker’s service schedule for my car?']
        },
        battery: {
          signs: ['A “12 V battery needs service” message', 'The car won’t wake up or unlock even though the main battery is full'],
          watch: [{ claim: '“The main battery is the problem.”', truth: 'If the car is completely dead, it’s usually the small 12 V (low-voltage) battery: a common, inexpensive replacement.' }],
          ask: ['Have you tested the 12 V battery?']
        },
        reduction: {
          signs: ['A whine that gets louder with speed', 'Oil leaking around the drive unit'],
          watch: [{ claim: '“Gearbox service.”', truth: 'There’s just one fixed gear and no clutch. The oil is long-life, so check whether your manual lists a change at all.' }],
          ask: ['Where is this in the manufacturer’s schedule?']
        },
        brakes: {
          signs: ['Squealing or grinding when braking', 'Brakes that feel grabby or noisy after the car has stood unused', 'A soft or sinking brake pedal: get it checked immediately'],
          watch: [{ claim: '“Your brake pads are worn out.”', truth: 'An EV slows down mostly with its motor (regenerative braking), so pads can last well over 100,000 km. The real risk is the opposite: unused discs rust and caliper slides seize. Cleaning and lubricating the calipers is a legitimate service, especially where roads are salted.' }],
          ask: ['How many mm of pad is left? Are the discs rusty or the slides stuck?']
        },
        wheels: {
          signs: ['Tread worn down to the wear bars (1.6 mm, the legal minimum in the EU; 3 mm is a safer limit)', 'Bulges or cracks in the sidewall', 'Uneven wear on one edge'],
          watch: [{ claim: '“EVs eat tyres, so you’ll need new ones often.”', truth: 'Partly true: the weight and instant torque wear tyres faster. Regular rotation (Tesla suggests roughly every 10,000 km) is a legitimate, cheap service. New tyres need the right load index, but they don’t need an “EV” label.' }],
          ask: ['What is the tread depth on each tyre, in mm?']
        }
      }
    }
  },

  /* ------------------------------------------------------------------ UK */
  uk: {
    ui: {
      nav: 'Поради на СТО',
      eyebrow: 'Знай, перш ніж їхати',
      title: 'Як не дати себе обдурити на СТО',
      text: 'Більшість механіків чесні, але деякі користуються термінами, щоб продати роботу, яка вашому авто не потрібна. Дізнайтеся справжні ознаки несправностей і правильні запитання.',
      myths: {
        gas: 'Що часто «впарюють» власникам бензинових авто',
        diesel: 'Що часто «впарюють» власникам дизелів',
        electric: 'Що часто «впарюють» власникам електромобілів'
      },
      mythsText: 'Що ви можете почути і як насправді. Відкрийте картку, щоб побачити деталь і більше порад.',
      rulesTitle: '8 правил для кожного візиту',
      caution: 'Не кожна рекомендація — обман. Гальма, шини, кермо й підвіска бережуть ваше життя: якщо сумніваєтеся в діагнозі, отримайте другу думку, а не відкладайте ремонт.',
      note: 'Загальні поради для сучасних авто. Інтервали відрізняються між моделями, тож завжди звіряйтеся з інструкцією до свого авто.',
      panel: 'На СТО',
      signs: 'Справжні ознаки, що потрібна увага',
      they: 'Вам кажуть',
      truth: 'Насправді',
      ask: 'Запитайте механіка',
      more: 'Більше про цю деталь',
      home: {
        eyebrow: 'Їдете на СТО?',
        title: 'Не дайте себе обдурити',
        text: 'Розуміння того, як працює авто, — найкращий захист від оплати непотрібного ремонту. Почніть із цих правил, а потім відкрийте авто, щоб побачити поради для кожної деталі.',
        cta: 'Поради для цього авто'
      }
    },
    rules: [
      { title: 'Усе письмово', text: 'Попросіть письмовий кошторис до початку робіт і чітко скажіть: «Зателефонуйте мені, перш ніж робити щось поза цим списком».' },
      { title: 'Попросіть показати', text: 'Нехай покажуть проблему на вашому авто: зношену деталь, фото чи відео, вимір у міліметрах, напругу або код помилки.' },
      { title: 'Заберіть старі деталі', text: 'Попросіть повернути замінені деталі. Це доказ, що їх справді замінили і що вони справді були зношені.' },
      { title: 'Регламент, а не «меню»', text: 'В інструкції до авто написано, що й коли йому потрібно. «Рекомендований пакет» сервісу часто містить зайве.' },
      { title: 'Рекомендовано ≠ обов’язково', text: 'Запитайте: «Це впливає на безпеку? Що буде, якщо почекати?» Попросіть розділити роботи на «зараз», «скоро» і «стежити».' },
      { title: 'Лампочка = код помилки', text: 'Попросіть точний код і перевірте його самі. Простий OBD-сканер коштує менше, ніж одна діагностика.' },
      { title: 'Друга думка для великих робіт', text: 'Якщо рахунок великий, отримайте ще одну оцінку. Чесний сервіс не образиться.' },
      { title: 'Зберігайте всі чеки', text: 'Чеки — це історія вашого авто і ваші докази. У ЄС обслуговування в незалежному сервісі не скасовує гарантію, якщо дотримано регламенту і використано належні деталі.' }
    ],
    parts: {
      body: {
        signs: ['Здуття фарби або іржа на арках і низу дверей', 'Двері чи багажник раптом закриваються нерівно — ознака прихованого пошкодження'],
        watch: [{ claim: '«Цю подряпину треба фарбувати всю деталь».', truth: 'Подряпини, що не пройшли крізь лак, часто можна заполірувати, а невеликі вм’ятини — прибрати без фарбування (PDR) за частку ціни.' }],
        ask: ['Можна це заполірувати або виправити без фарбування?']
      },
      hood: {
        signs: ['Капот не фіксується або не тримає запобіжний гачок', 'Свіжі плями чи краплі рідини під моторним відсіком'],
        watch: [{ claim: '«У вас було мало рідин, ми долили» — окремим рядком у рахунку.', truth: 'Перевірити оливу, антифриз, гальмівну рідину й омивач — дві хвилини, і це можна зробити самому. Рівень, що постійно падає, — це симптом: питайте, де тече, а не платіть за доливання.' }],
        ask: ['Якої рідини бракувало, скільки і куди вона дівається?']
      },
      cabin: {
        signs: ['Кондиціонер дме теплим або пахне затхлістю', 'Скол на лобовому склі починає перетворюватися на тріщину'],
        watch: [
          { claim: '«Кондиціонер треба заправляти щороку».', truth: 'Система кондиціонера герметична. Якщо вона холодить, заправка не потрібна. Якщо фреон постійно зникає, треба знайти витік, а не доливати щороку.' },
          { claim: '«Лобове скло треба міняти».', truth: 'Скол, менший за монету й поза зоною огляду водія, зазвичай ремонтують полімером за пів години.' }
        ],
        ask: ['Яку температуру на дефлекторі й тиск у системі ви виміряли?']
      },
      seats: {
        signs: ['Горить лампа подушки безпеки', 'Ремінь не змотується або не блокується при різкому ривку'],
        watch: [{ claim: '«Лампа airbag — треба міняти блок подушок».', truth: 'Дуже часто причина — роз’єм, що відійшов, або перетертий дріт під переднім сидінням (датчик сидіння, замок ременя). Спершу попросіть точний код помилки.' }],
        ask: ['Який точний код помилки і на яку деталь він вказує?']
      },
      steering: {
        signs: ['Авто тягне вбік на прямій рівній дорозі', 'Люфт чи стук у кермі або гул під час повороту', 'Кермо стоїть криво, коли їдете прямо'],
        watch: [
          { claim: '«Вам треба зробити розвал-сходження» — щоразу.', truth: 'Розвал-сходження потрібне після сильного удару об бордюр чи яму, після заміни деталей керма або підвіски, або коли шини зношуються нерівно. Інакше налаштування зазвичай не збивається.' },
          { claim: '«Промивка гідропідсилювача».', truth: 'У багатьох сучасних авто електропідсилювач, у якому взагалі немає рідини. Якщо у вас гідравлічний — перевірте, чи є заміна в регламенті.' }
        ],
        ask: ['Можна роздруківку розвал-сходження «до» і «після»?']
      },
      engine: {
        signs: ['Горить Check Engine (якщо блимає — припиніть рух)', 'Стук, брязкіт чи інші нові звуки', 'Витрата оливи понад ~1 л на 1000 км', 'Синій або густий білий дим із вихлопу'],
        watch: [
          { claim: '«Двигуну потрібна промивка».', truth: 'Промивок двигуна немає в регламентах автовиробників. Вчасна заміна оливи й фільтра і так тримає двигун чистим.' },
          { claim: '«Олива чорна — міняйте негайно».', truth: 'Олива швидко темніє, бо утримує бруд у собі, — це її робота. Орієнтуйтеся на інтервал з інструкції (км або місяці) і рівень на щупі, а не на колір.' },
          { claim: '«Пора міняти свічки запалювання».', truth: 'Сучасні іридієві чи платинові свічки часто служать 60–100 тис. км і більше. Перевірте інтервал в інструкції.' }
        ],
        ask: ['Це є в регламенті мого авто? Покажіть, де саме.', 'Який код помилки записаний? Можна подивитися живі дані?']
      },
      intake: {
        signs: ['Повітряний фільтр темний і забитий, якщо подивитися на світло', 'Свист або шипіння з впуску (підсмоктування повітря)'],
        watch: [
          { claim: '«Ваш повітряний фільтр жахливо брудний» — і показують брудний фільтр.', truth: 'Попросіть дістати його з вашого авто при вас. Повітряний фільтр — дешева 5-хвилинна робота, яку часто можна зробити самому, а міняти його на кожному ТО зазвичай надто часто.' },
          { claim: '«Чистка дросельної заслінки».', truth: 'Має сенс лише за наявності симптому, наприклад нестабільного холостого ходу. Це не планове обслуговування.' }
        ],
        ask: ['Можете дістати фільтр із мого авто і показати?']
      },
      radiator: {
        signs: ['Стрілка температури піднімається вище звичного', 'Солодкуватий запах або зелені, рожеві чи помаранчеві краплі під авто', 'Рівень антифризу постійно падає'],
        watch: [
          { claim: '«Заміна антифризу — щороку».', truth: 'Сучасний антифриз зазвичай служить 5 років або 150 тис. км і більше. Дотримуйтеся інтервалу з інструкції.' },
          { claim: '«Радіатор тече, потрібен новий».', truth: 'Попросіть тест тиском, який покаже місце витоку. Часто винен дешевий патрубок чи хомут.' }
        ],
        ask: ['Ви робили тест тиском? Де саме витік?']
      },
      battery: {
        signs: ['Стартер крутить мляво, особливо холодного ранку', 'Акумулятору понад 5 років', 'Лампи чи збої електроніки під час запуску'],
        watch: [{ claim: '«Акумулятор слабкий, треба міняти».', truth: 'Акумулятор може бути просто розрядженим після коротких поїздок. Попросіть роздруківку справжнього тесту (виміряний пусковий струм проти номіналу). Здоровий заряджений акумулятор показує близько 12,6 В.' }],
        ask: ['Можна роздруківку тестера: виміряний CCA проти номіналу на етикетці?']
      },
      fuel: {
        signs: ['Запах палива біля авто', 'Важкий запуск або глухне після заправки'],
        watch: [
          { claim: '«Промивка паливної системи й форсунок».', truth: 'Якщо заправлятися нормальним пальним на пристойній АЗС, форсунки рідко потребують чистки. Це має сенс лише тоді, коли діагностика вказує на форсунки.' },
          { claim: '«Вашому авто потрібен лише 98-й».', truth: 'Тільки якщо так написано в інструкції або на кришці бака. Двигуну, розрахованому на 95-й, вищий октан нічого не дає.' }
        ],
        ask: ['Чи є паливний фільтр у регламенті мого авто і з яким інтервалом?']
      },
      exhaust: {
        signs: ['Вихлоп став значно гучнішим, ревіння чи «вистріли»', 'Брязкіт знизу на холостому ходу', 'Запах вихлопу в салоні — це небезпечно, перевірте негайно'],
        watch: [
          { claim: '«Каталізатор вийшов з ладу».', truth: 'Код помилки (на багатьох авто P0420) може спричинити й лямбда-зонд, підсмоктування у вихлопі чи пропуски запалювання. Запитайте, що перевірили, перш ніж міняти дорогий каталізатор.' },
          { claim: '«Треба міняти весь вихлоп».', truth: 'Брязкіт часто дає лише відкручений теплозахисний екран чи зламаний хомут, а одну прогнилу ділянку можна замінити окремо.' }
        ],
        ask: ['Що саме брязкає? Можна полагодити лише цю ділянку чи хомут?']
      },
      transmission: {
        signs: ['Пробуксовка: оберти ростуть, а авто не прискорюється', 'Різкі, запізнілі чи ривкові перемикання', 'Запах гару або червона рідина під авто'],
        watch: [
          { claim: '«Промивка коробки передач».', truth: 'Перевірте інструкцію: для одних коробок є інтервал заміни рідини, для інших — ні. Якщо міняти, стандарт — злив і заливка саме тієї рідини, що вказана виробником. Неправильна рідина може зіпсувати коробку.' },
          { claim: '«У вас здохло зчеплення».', truth: 'Пробуксовку легко показати: на високій передачі й низьких обертах різко натисніть газ. Якщо оберти підскочили, а авто не прискорилося — зчеплення буксує. Якщо ні — запитайте, чому так вирішили.' }
        ],
        ask: ['Яку специфікацію рідини ви заливаєте і чи відповідає вона інструкції?']
      },
      driveshaft: {
        signs: ['Хрускіт під час повороту з вивернутим кермом (ШРУС)', 'Стук під час рушання або вібрація на швидкості'],
        watch: [{ claim: '«Порвався пильник — треба міняти весь привід».', truth: 'Якщо ШРУС ще не хрустить, часто достатньо нового пильника і змащення. Не зволікайте: бруд усередині швидко вбиває шарнір.' }],
        ask: ['Це лише пильник чи зношений сам шарнір? Він хрустить?']
      },
      differential: {
        signs: ['Гул або виття, що змінюється зі швидкістю, а не з обертами', 'Олива тече біля моста'],
        watch: [{ claim: '«Треба міняти оливу в диференціалі».', truth: 'На задньо- та повнопривідних авто це буває обґрунтовано, але інтервали довгі. Перевірте, чи є це в регламенті і коли, та попросіть показати злиту оливу.' }],
        ask: ['Коли за регламентом міняється олива в диференціалі?']
      },
      wheels: {
        signs: ['Протектор зношений до індикаторів (1,6 мм — юридичний мінімум у ЄС; 3 мм — безпечніша межа)', 'Грижі чи тріщини на боковині', 'Нерівний знос з одного краю'],
        watch: [
          { claim: '«Шини треба міняти».', truth: 'Попросіть виміряну глибину протектора кожної шини в міліметрах і перевірте самі дешевим глибиноміром. Чотири цифри на боковині (наприклад, 2319 = 23-й тиждень 2019 року) показують вік шини.' },
          { claim: '«Накачайте шини азотом».', truth: 'Повітря і так на 78% складається з азоту. Регулярна перевірка тиску важить набагато більше, ніж газ усередині.' }
        ],
        ask: ['Яка глибина протектора на кожній шині, у мм?']
      },
      brakes: {
        signs: ['Писк або скрегіт під час гальмування', 'Вібрація в педалі чи кермі при гальмуванні', 'М’яка чи провальна педаль гальма — перевірте негайно'],
        watch: [
          { claim: '«Треба міняти колодки й диски».', truth: 'Попросіть цифри: товщину колодок у мм (близько 3 мм і менше — міняти) і товщину диска порівняно з мінімумом, вибитим на ньому. Колодки часто зношуються вдвічі швидше за диски.' },
          { claim: '«Заміна гальмівної рідини».', truth: 'Тут усе зазвичай чесно: гальмівна рідина з часом вбирає воду, і багато виробників радять міняти її кожні 2 роки. Перевірте інструкцію.' }
        ],
        ask: ['Скільки мм колодки залишилося і яка товщина диска порівняно з мінімумом?']
      },
      suspension: {
        signs: ['Авто довго розгойдується після нерівності', 'Стуки на нерівностях', 'Сильний «клювок» при гальмуванні'],
        watch: [{ claim: '«У вас течуть амортизатори».', truth: 'Легка масляна плівка («запотівання») — це норма, а мокрий амортизатор із краплями оливи — ні. Попросіть показати на підйомнику. Амортизатори міняють парами на одній осі — і це чесно.' }],
        ask: ['Можете показати витік чи люфт на підйомнику?']
      },
      chassis: {
        signs: ['Іржаві дірки чи метал, що лущиться, знизу', 'Пошкодження після удару об високий бордюр або велику нерівність'],
        watch: [{ claim: '«Вам потрібна антикорозійна обробка днища».', truth: 'Нові авто вже мають заводський антикор і тривалу гарантію від наскрізної корозії. Погано нанесене покриття може навіть затримувати вологу.' }],
        ask: ['Можна мені самому подивитися на підйомнику або отримати фото?']
      },
      frunk: {
        signs: ['Передній багажник не відкривається — часто ознака, що сідає 12-вольтовий акумулятор', 'Після дощу всередині збирається вода (забитий дренаж)'],
        watch: [{ claim: '«Треба міняти замок переднього багажника».', truth: 'Якщо багажник і двері не відкриваються електрично, спершу перевірте 12-вольтовий акумулятор. Забитий дренаж чи зношений ущільнювач — набагато дешевше за нові деталі.' }],
        ask: ['Ви спершу перевірили 12-вольтовий акумулятор?']
      }
    },
    byCar: {
      diesel: {
        engine: {
          signs: ['Важко заводиться на холодну (свічки розжарювання)', 'Чорний дим під час розгону', 'Нерівний холостий хід чи стук, що змінюється з прогрівом'],
          watch: [
            { claim: '«Треба міняти всі форсунки».', truth: 'Попросіть тест на зворотний злив («обратку») або коригування форсунок з діагностичного приладу. Часто несправна лише одна форсунка або просто пропускає її ущільнювальна шайба.' },
            { claim: '«Підійде будь-яка дизельна олива».', truth: 'Двигунам із сажовим фільтром потрібна малозольна олива з допуском виробника (для Mercedes, наприклад, MB 229.51 чи 229.52). Неправильна олива швидше забиває фільтр — перевіряйте, що заливають.' }
          ],
          ask: ['Можете показати тест «обратки» або коригування для кожної форсунки?']
        },
        turbo: {
          signs: ['Втрата потужності, часто з лампою на панелі (аварійний режим)', 'Новий свист, схожий на сирену', 'Багато синього диму або калюжі оливи в патрубках'],
          watch: [{ claim: '«Турбіна мертва, потрібна нова».', truth: 'Тиск наддуву часто падає через лопнутий патрубок, закислу геометрію або несправний датчик. Тонка масляна плівка в патрубках і крихітний радіальний люфт вала — це норма.' }],
          ask: ['Ви перевіряли патрубки наддуву димогенератором і перевірили актуатор?']
        },
        exhaust: {
          signs: ['Лампа сажового фільтра (DPF)', 'Після вимкнення працює вентилятор і підвищені оберти — регенерацію перервано', 'Аварійний режим зі слабкою тягою'],
          watch: [{ claim: '«Сажовий фільтр забитий — міняйте або давайте видалимо».', truth: 'Видалення DPF незаконне в ЄС і багатьох інших країнах, і авто не пройде техогляд. Примусова регенерація або професійна чистка часто вирішують проблему за частку ціни. Звична причина — багато коротких поїздок; регулярна поїздка трасою на 20–30 хвилин допомагає.' }],
          ask: ['Яке виміряне заповнення сажею і перепад тиску? Ви пробували примусову регенерацію?']
        },
        adblue: {
          signs: ['Попередження AdBlue з відліком кілометрів — на нулі двигун не запуститься', 'Білі кристали біля горловини чи форсунки'],
          watch: [
            { claim: '«Можемо вимкнути вам систему AdBlue».', truth: 'Видалення чи емулятор AdBlue незаконні й можуть провалити техогляд. Більшість несправностей — це датчик, нагрівач або кристалізована рідина, і ці деталі ремонтуються.' },
            { claim: 'Доливання AdBlue за цінами сервісу.', truth: 'AdBlue недорогий на будь-якій АЗС, і ви можете залити його самі через синю кришку.' }
          ],
          ask: ['Яка саме деталь несправна: датчик, нагрівач, насос чи форсунка?']
        },
        fuel: {
          signs: ['Важкий запуск або перебої після заправки', 'Попередження про воду в паливі'],
          watch: [{ claim: '«Розкоксовка і чистка паливної системи дизеля».', truth: 'Цього немає в регламенті. Що справді важливо для дизеля, то це паливний фільтр, який ще й відділяє воду. Міняйте його за інтервалом з інструкції.' }],
          ask: ['Коли за сервісною книжкою востаннє міняли паливний фільтр?']
        },
        battery: {
          signs: ['Стартер крутить мляво, особливо холодного ранку', 'Перестала працювати система старт-стоп', 'Акумулятору понад 5 років'],
          watch: [{ claim: '«Вашому авто потрібен особливий акумулятор, і його треба прописати».', truth: 'Часто це правда: авто зі старт-стопом потребують AGM чи EFB-акумулятор, і багатьом треба зареєструвати новий акумулятор через комп’ютер. Це чесна оплата, але спершу попросіть нормальний тест акумулятора.' }],
          ask: ['Можна роздруківку тестера: виміряний CCA проти номіналу на етикетці?']
        },
        transferCase: {
          signs: ['Стуки чи «закушування» під час крутого повороту на малій швидкості', 'Гул або вібрація із середини авто'],
          watch: [{ claim: '«Треба міняти всі чотири шини, а не дві».', truth: 'На повнопривідному авто це може бути справедливо: велика різниця протектора між осями змушує роздавальну коробку й диференціали працювати постійно. Запитайте, яку максимальну різницю допускає виробник.' }],
          ask: ['Яка різниця протектора між передніми й задніми шинами, у мм?']
        }
      },
      electric: {
        hvBattery: {
          signs: ['Запас ходу помітно менший, ніж у схожих авто того ж віку в той самий сезон', 'Попередження про батарею чи заряджання'],
          watch: [
            { claim: '«Батарея зношена, потрібна нова».', truth: 'Втратити 10–20% запасу ходу за багато років — нормально, а в мороз запас ходу падає до 20–30%. Попросіть звіт про стан батареї (SoH) з нормального діагностичного приладу.' },
            { claim: '«Високовольтна батарея потребує регулярного обслуговування».', truth: 'Для більшості електромобілів, зокрема Model Y, у високовольтної батареї немає планового обслуговування. Працювати з нею мають лише навчені сертифіковані фахівці.' }
          ],
          ask: ['Можна отримати звіт про стан (SoH) батареї?']
        },
        motor: {
          signs: ['Новий гул, виття чи стук під час розгону або скидання газу', 'Попередження про привідний блок'],
          watch: [{ claim: '«Заміна оливи, свічок, ременя ГРМ».', truth: 'В електромобілі нічого з цього немає. У привідному блоці довговічна олива, яку міняють рідко або взагалі ніколи. Якщо вам пропонують «ТО двигуна», запитайте, що саме зроблять.' }],
          ask: ['Які пункти регламенту виробника ви виконуєте?']
        },
        inverter: {
          signs: ['Раптова втрата потужності з попередженням', 'Авто не вмикає режим руху'],
          watch: [{ claim: '«Інвертор треба міняти».', truth: 'Попросіть точний код помилки. Деякі несправності виправляє оновлення ПЗ або дешевша деталь, тож нехай офіційний сервіс підтвердить, перш ніж міняти дорогий блок.' }],
          ask: ['Який код помилки і чи є для неї оновлення ПЗ?']
        },
        charging: {
          signs: ['Кабель не фіксується або заряджання зупиняється на півдорозі', 'Швидке заряджання значно повільніше, ніж зазвичай'],
          watch: [{ claim: '«Порт заряджання зламаний, треба міняти».', truth: 'Часто причина — бруд на контактах, заїдання фіксатора або несправна станція, тож спробуйте іншу зарядку. Повільніше заряджання в холод чи при високому рівні заряду — це норма.' }],
          ask: ['Ви пробували іншу зарядну станцію чи кабель?']
        },
        thermal: {
          signs: ['Обігрів чи охолодження слабші, ніж зазвичай', 'Попередження про батарею чи охолоджувальну рідину'],
          watch: [{ claim: '«Заміна антифризу і заправка кондиціонера».', truth: 'Перевірте регламент: антифриз довговічний, а система кондиціонера герметична. Справжня позиція обслуговування — салонний фільтр, недорога деталь, яку часто легко замінити самому.' }],
          ask: ['Це є в регламенті виробника для мого авто?']
        },
        battery: {
          signs: ['Повідомлення «потрібне обслуговування 12-вольтового акумулятора»', 'Авто не «прокидається» і не відмикається, хоча основна батарея повна'],
          watch: [{ claim: '«Проблема в основній батареї».', truth: 'Якщо авто повністю «мертве», зазвичай винен маленький 12-вольтовий (низьковольтний) акумулятор — поширена й недорога заміна.' }],
          ask: ['Ви перевірили 12-вольтовий акумулятор?']
        },
        reduction: {
          signs: ['Виття, що посилюється зі швидкістю', 'Олива тече біля привідного блока'],
          watch: [{ claim: '«Обслуговування коробки передач».', truth: 'Тут лише одна фіксована передача і немає зчеплення. Олива довговічна, тож перевірте, чи взагалі є її заміна в інструкції.' }],
          ask: ['Де це написано в регламенті виробника?']
        },
        brakes: {
          signs: ['Писк або скрегіт під час гальмування', 'Гальма «хапають» чи шумлять після простою авто', 'М’яка чи провальна педаль гальма — перевірте негайно'],
          watch: [{ claim: '«Гальмівні колодки зношені».', truth: 'Електромобіль гальмує переважно мотором (рекуперація), тож колодки можуть пройти понад 100 тис. км. Справжній ризик протилежний: диски без роботи іржавіють, а напрямні супортів закисають. Чистка й змащення супортів — чесна послуга, особливо там, де дороги посипають сіллю.' }],
          ask: ['Скільки мм колодки залишилося? Диски іржаві чи напрямні закисли?']
        },
        wheels: {
          signs: ['Протектор зношений до індикаторів (1,6 мм — юридичний мінімум у ЄС; 3 мм — безпечніша межа)', 'Грижі чи тріщини на боковині', 'Нерівний знос з одного краю'],
          watch: [{ claim: '«Електромобілі «їдять» шини — міняти доведеться часто».', truth: 'Частково правда: вага і миттєвий крутний момент зношують шини швидше. Регулярна перестановка коліс (Tesla радить приблизно кожні 10 тис. км) — чесна й недорога послуга. Нові шини мають мати правильний індекс навантаження, але позначка «EV» не обов’язкова.' }],
          ask: ['Яка глибина протектора на кожній шині, у мм?']
        }
      }
    }
  },

  /* ------------------------------------------------------------------ RU */
  ru: {
    ui: {
      nav: 'Советы для СТО',
      eyebrow: 'Знай, прежде чем ехать',
      title: 'Как не дать себя обмануть в автосервисе',
      text: 'Большинство механиков честны, но некоторые пользуются терминами, чтобы продать работу, которая вашей машине не нужна. Узнайте настоящие признаки неисправностей и правильные вопросы.',
      myths: {
        gas: 'Что часто «впаривают» владельцам бензиновых машин',
        diesel: 'Что часто «впаривают» владельцам дизелей',
        electric: 'Что часто «впаривают» владельцам электромобилей'
      },
      mythsText: 'Что вы можете услышать и как на самом деле. Откройте карточку, чтобы увидеть деталь и больше советов.',
      rulesTitle: '8 правил для каждого визита',
      caution: 'Не каждая рекомендация — обман. Тормоза, шины, рулевое и подвеска берегут вашу жизнь: если сомневаетесь в диагнозе, получите второе мнение, а не откладывайте ремонт.',
      note: 'Общие советы для современных машин. Интервалы отличаются между моделями, поэтому всегда сверяйтесь с инструкцией к своей машине.',
      panel: 'В автосервисе',
      signs: 'Настоящие признаки, что нужно внимание',
      they: 'Вам говорят',
      truth: 'На самом деле',
      ask: 'Спросите механика',
      more: 'Подробнее об этой детали',
      home: {
        eyebrow: 'Едете в автосервис?',
        title: 'Не дайте себя обмануть',
        text: 'Понимание того, как устроена машина, — лучшая защита от оплаты ненужного ремонта. Начните с этих правил, а затем откройте машину, чтобы увидеть советы для каждой детали.',
        cta: 'Советы для этой машины'
      }
    },
    rules: [
      { title: 'Всё письменно', text: 'Попросите письменную смету до начала работ и чётко скажите: «Позвоните мне, прежде чем делать что-то сверх этого списка».' },
      { title: 'Попросите показать', text: 'Пусть покажут проблему на вашей машине: изношенную деталь, фото или видео, замер в миллиметрах, напряжение или код ошибки.' },
      { title: 'Заберите старые детали', text: 'Попросите вернуть заменённые детали. Это доказательство, что их действительно заменили и что они действительно были изношены.' },
      { title: 'Регламент, а не «меню»', text: 'В инструкции к машине написано, что и когда ей нужно. «Рекомендованный пакет» сервиса часто содержит лишнее.' },
      { title: 'Рекомендовано ≠ обязательно', text: 'Спросите: «Это влияет на безопасность? Что будет, если подождать?» Попросите разделить работы на «сейчас», «скоро» и «следить».' },
      { title: 'Лампочка = код ошибки', text: 'Попросите точный код и проверьте его сами. Простой OBD-сканер стоит меньше, чем одна диагностика.' },
      { title: 'Второе мнение для крупных работ', text: 'Если счёт большой, получите ещё одну оценку. Честный сервис не обидится.' },
      { title: 'Храните все чеки', text: 'Чеки — это история вашей машины и ваши доказательства. В ЕС обслуживание в независимом сервисе не отменяет гарантию, если соблюдён регламент и использованы надлежащие детали.' }
    ],
    parts: {
      body: {
        signs: ['Вздутие краски или ржавчина на арках и низу дверей', 'Двери или багажник вдруг закрываются неровно — признак скрытого повреждения'],
        watch: [{ claim: '«Эту царапину надо красить всю деталь».', truth: 'Царапины, не прошедшие сквозь лак, часто можно заполировать, а небольшие вмятины — убрать без покраски (PDR) за долю цены.' }],
        ask: ['Можно это заполировать или исправить без покраски?']
      },
      hood: {
        signs: ['Капот не фиксируется или не держит страховочный крючок', 'Свежие пятна или капли жидкости под моторным отсеком'],
        watch: [{ claim: '«У вас было мало жидкостей, мы долили» — отдельной строкой в счёте.', truth: 'Проверить масло, антифриз, тормозную жидкость и омыватель — две минуты, и это можно сделать самому. Уровень, который постоянно падает, — это симптом: спрашивайте, где течёт, а не платите за доливку.' }],
        ask: ['Какой жидкости не хватало, сколько и куда она девается?']
      },
      cabin: {
        signs: ['Кондиционер дует тёплым или пахнет затхлостью', 'Скол на лобовом стекле начинает превращаться в трещину'],
        watch: [
          { claim: '«Кондиционер надо заправлять каждый год».', truth: 'Система кондиционера герметична. Если она холодит, заправка не нужна. Если фреон постоянно уходит, нужно найти утечку, а не доливать каждый год.' },
          { claim: '«Лобовое стекло надо менять».', truth: 'Скол меньше монеты и вне зоны обзора водителя обычно ремонтируют полимером за полчаса.' }
        ],
        ask: ['Какую температуру на дефлекторе и давление в системе вы измерили?']
      },
      seats: {
        signs: ['Горит лампа подушки безопасности', 'Ремень не сматывается или не блокируется при резком рывке'],
        watch: [{ claim: '«Лампа airbag — надо менять блок подушек».', truth: 'Очень часто причина — отошедший разъём или перетёртый провод под передним сиденьем (датчик сиденья, замок ремня). Сначала попросите точный код ошибки.' }],
        ask: ['Какой точный код ошибки и на какую деталь он указывает?']
      },
      steering: {
        signs: ['Машину тянет в сторону на прямой ровной дороге', 'Люфт или стук в руле или гул при повороте', 'Руль стоит криво, когда едете прямо'],
        watch: [
          { claim: '«Вам надо сделать развал-схождение» — каждый раз.', truth: 'Развал-схождение нужно после сильного удара о бордюр или яму, после замены деталей рулевого или подвески, или когда шины изнашиваются неравномерно. Иначе настройка обычно не сбивается.' },
          { claim: '«Промывка гидроусилителя».', truth: 'Во многих современных машинах электроусилитель, в котором жидкости нет вообще. Если у вас гидравлический — проверьте, есть ли замена в регламенте.' }
        ],
        ask: ['Можно распечатку развал-схождения «до» и «после»?']
      },
      engine: {
        signs: ['Горит Check Engine (если мигает — прекратите движение)', 'Стук, лязг или другие новые звуки', 'Расход масла больше ~1 л на 1000 км', 'Синий или густой белый дым из выхлопа'],
        watch: [
          { claim: '«Двигателю нужна промывка».', truth: 'Промывок двигателя нет в регламентах автопроизводителей. Своевременная замена масла и фильтра и так держит двигатель чистым.' },
          { claim: '«Масло чёрное — меняйте немедленно».', truth: 'Масло быстро темнеет, потому что удерживает грязь в себе, — это его работа. Ориентируйтесь на интервал из инструкции (км или месяцы) и уровень на щупе, а не на цвет.' },
          { claim: '«Пора менять свечи зажигания».', truth: 'Современные иридиевые или платиновые свечи часто служат 60–100 тыс. км и больше. Проверьте интервал в инструкции.' }
        ],
        ask: ['Это есть в регламенте моей машины? Покажите, где именно.', 'Какой код ошибки записан? Можно посмотреть живые данные?']
      },
      intake: {
        signs: ['Воздушный фильтр тёмный и забитый, если посмотреть на свет', 'Свист или шипение со стороны впуска (подсос воздуха)'],
        watch: [
          { claim: '«Ваш воздушный фильтр ужасно грязный» — и показывают грязный фильтр.', truth: 'Попросите достать его из вашей машины при вас. Воздушный фильтр — дешёвая 5-минутная работа, которую часто можно сделать самому, а менять его на каждом ТО обычно слишком часто.' },
          { claim: '«Чистка дроссельной заслонки».', truth: 'Имеет смысл только при симптоме, например нестабильном холостом ходе. Это не плановое обслуживание.' }
        ],
        ask: ['Можете достать фильтр из моей машины и показать?']
      },
      radiator: {
        signs: ['Стрелка температуры поднимается выше привычного', 'Сладковатый запах или зелёные, розовые или оранжевые капли под машиной', 'Уровень антифриза постоянно падает'],
        watch: [
          { claim: '«Замена антифриза — каждый год».', truth: 'Современный антифриз обычно служит 5 лет или 150 тыс. км и больше. Следуйте интервалу из инструкции.' },
          { claim: '«Радиатор течёт, нужен новый».', truth: 'Попросите опрессовку, которая покажет место утечки. Часто виноват дешёвый патрубок или хомут.' }
        ],
        ask: ['Вы делали опрессовку? Где именно утечка?']
      },
      battery: {
        signs: ['Стартер крутит вяло, особенно холодным утром', 'Аккумулятору больше 5 лет', 'Лампы или сбои электроники при запуске'],
        watch: [{ claim: '«Аккумулятор слабый, надо менять».', truth: 'Аккумулятор может быть просто разряжен после коротких поездок. Попросите распечатку настоящего теста (измеренный пусковой ток против номинала). Здоровый заряженный аккумулятор показывает около 12,6 В.' }],
        ask: ['Можно распечатку тестера: измеренный CCA против номинала на этикетке?']
      },
      fuel: {
        signs: ['Запах топлива возле машины', 'Тяжёлый запуск или глохнет после заправки'],
        watch: [
          { claim: '«Промывка топливной системы и форсунок».', truth: 'Если заправляться нормальным топливом на приличной АЗС, форсунки редко нуждаются в чистке. Это имеет смысл, только если диагностика указывает на форсунки.' },
          { claim: '«Вашей машине нужен только 98-й».', truth: 'Только если так написано в инструкции или на лючке бака. Двигателю, рассчитанному на 95-й, более высокий октан ничего не даёт.' }
        ],
        ask: ['Есть ли топливный фильтр в регламенте моей машины и с каким интервалом?']
      },
      exhaust: {
        signs: ['Выхлоп стал заметно громче, рёв или «выстрелы»', 'Дребезг снизу на холостом ходу', 'Запах выхлопа в салоне — это опасно, проверьте немедленно'],
        watch: [
          { claim: '«Катализатор вышел из строя».', truth: 'Код ошибки (на многих машинах P0420) может вызвать и лямбда-зонд, подсос в выхлопе или пропуски зажигания. Спросите, что проверили, прежде чем менять дорогой катализатор.' },
          { claim: '«Надо менять весь выхлоп».', truth: 'Дребезг часто даёт лишь открутившийся теплозащитный экран или сломанный хомут, а один прогнивший участок можно заменить отдельно.' }
        ],
        ask: ['Что именно дребезжит? Можно починить только этот участок или хомут?']
      },
      transmission: {
        signs: ['Пробуксовка: обороты растут, а машина не ускоряется', 'Резкие, запоздалые или рывковые переключения', 'Запах гари или красная жидкость под машиной'],
        watch: [
          { claim: '«Промывка коробки передач».', truth: 'Проверьте инструкцию: для одних коробок есть интервал замены жидкости, для других — нет. Если менять, стандарт — слив и заливка именно той жидкости, которую указал производитель. Неправильная жидкость может испортить коробку.' },
          { claim: '«У вас сдохло сцепление».', truth: 'Пробуксовку легко показать: на высокой передаче и низких оборотах резко нажмите газ. Если обороты подскочили, а машина не ускорилась — сцепление буксует. Если нет — спросите, почему так решили.' }
        ],
        ask: ['Какую спецификацию жидкости вы заливаете и соответствует ли она инструкции?']
      },
      driveshaft: {
        signs: ['Хруст при повороте с вывернутым рулём (ШРУС)', 'Стук при трогании или вибрация на скорости'],
        watch: [{ claim: '«Порвался пыльник — надо менять весь привод».', truth: 'Если ШРУС ещё не хрустит, часто достаточно нового пыльника и смазки. Не тяните: грязь внутри быстро убивает шарнир.' }],
        ask: ['Это только пыльник или изношен сам шарнир? Он хрустит?']
      },
      differential: {
        signs: ['Гул или вой, который меняется со скоростью, а не с оборотами', 'Масло течёт возле моста'],
        watch: [{ claim: '«Надо менять масло в дифференциале».', truth: 'На задне- и полноприводных машинах это бывает обоснованно, но интервалы длинные. Проверьте, есть ли это в регламенте и когда, и попросите показать слитое масло.' }],
        ask: ['Когда по регламенту меняется масло в дифференциале?']
      },
      wheels: {
        signs: ['Протектор изношен до индикаторов (1,6 мм — юридический минимум в ЕС; 3 мм — более безопасная граница)', 'Грыжи или трещины на боковине', 'Неравномерный износ с одного края'],
        watch: [
          { claim: '«Шины надо менять».', truth: 'Попросите измеренную глубину протектора каждой шины в миллиметрах и проверьте сами дешёвым глубиномером. Четыре цифры на боковине (например, 2319 = 23-я неделя 2019 года) показывают возраст шины.' },
          { claim: '«Накачайте шины азотом».', truth: 'Воздух и так на 78% состоит из азота. Регулярная проверка давления важнее, чем газ внутри.' }
        ],
        ask: ['Какая глубина протектора на каждой шине, в мм?']
      },
      brakes: {
        signs: ['Писк или скрежет при торможении', 'Вибрация в педали или руле при торможении', 'Мягкая или проваливающаяся педаль тормоза — проверьте немедленно'],
        watch: [
          { claim: '«Надо менять колодки и диски».', truth: 'Попросите цифры: толщину колодок в мм (около 3 мм и меньше — менять) и толщину диска в сравнении с минимумом, выбитым на нём. Колодки часто изнашиваются вдвое быстрее дисков.' },
          { claim: '«Замена тормозной жидкости».', truth: 'Здесь обычно всё честно: тормозная жидкость со временем впитывает воду, и многие производители советуют менять её каждые 2 года. Проверьте инструкцию.' }
        ],
        ask: ['Сколько мм колодки осталось и какая толщина диска в сравнении с минимумом?']
      },
      suspension: {
        signs: ['Машина долго раскачивается после неровности', 'Стуки на неровностях', 'Сильный «клевок» при торможении'],
        watch: [{ claim: '«У вас текут амортизаторы».', truth: 'Лёгкая масляная плёнка («запотевание») — это норма, а мокрый амортизатор с каплями масла — нет. Попросите показать на подъёмнике. Амортизаторы меняют парами на одной оси — и это честно.' }],
        ask: ['Можете показать течь или люфт на подъёмнике?']
      },
      chassis: {
        signs: ['Ржавые дыры или шелушащийся металл снизу', 'Повреждения после удара о высокий бордюр или большую неровность'],
        watch: [{ claim: '«Вам нужна антикоррозийная обработка днища».', truth: 'Новые машины уже имеют заводской антикор и долгую гарантию от сквозной коррозии. Плохо нанесённое покрытие может даже удерживать влагу.' }],
        ask: ['Можно мне самому посмотреть на подъёмнике или получить фото?']
      },
      frunk: {
        signs: ['Передний багажник не открывается — часто признак того, что садится 12-вольтовый аккумулятор', 'После дождя внутри собирается вода (забит дренаж)'],
        watch: [{ claim: '«Надо менять замок переднего багажника».', truth: 'Если багажник и двери не открываются электрически, сначала проверьте 12-вольтовый аккумулятор. Забитый дренаж или изношенный уплотнитель — гораздо дешевле новых деталей.' }],
        ask: ['Вы сначала проверили 12-вольтовый аккумулятор?']
      }
    },
    byCar: {
      diesel: {
        engine: {
          signs: ['Тяжело заводится на холодную (свечи накаливания)', 'Чёрный дым при разгоне', 'Неровный холостой ход или стук, меняющийся с прогревом'],
          watch: [
            { claim: '«Надо менять все форсунки».', truth: 'Попросите тест на обратный слив («обратку») или коррекции форсунок с диагностического прибора. Часто неисправна лишь одна форсунка или просто пропускает её уплотнительная шайба.' },
            { claim: '«Подойдёт любое дизельное масло».', truth: 'Двигателям с сажевым фильтром нужно малозольное масло с допуском производителя (для Mercedes, например, MB 229.51 или 229.52). Неправильное масло быстрее забивает фильтр — проверяйте, что заливают.' }
          ],
          ask: ['Можете показать тест «обратки» или коррекции для каждой форсунки?']
        },
        turbo: {
          signs: ['Потеря мощности, часто с лампой на панели (аварийный режим)', 'Новый свист, похожий на сирену', 'Много синего дыма или лужи масла в патрубках'],
          watch: [{ claim: '«Турбина мертва, нужна новая».', truth: 'Давление наддува часто падает из-за лопнувшего патрубка, закисшей геометрии или неисправного датчика. Тонкая масляная плёнка в патрубках и крошечный радиальный люфт вала — это норма.' }],
          ask: ['Вы проверяли патрубки наддува дымогенератором и проверили актуатор?']
        },
        exhaust: {
          signs: ['Лампа сажевого фильтра (DPF)', 'После выключения работает вентилятор и повышенные обороты — регенерация прервана', 'Аварийный режим со слабой тягой'],
          watch: [{ claim: '«Сажевый фильтр забит — меняйте или давайте удалим».', truth: 'Удаление DPF незаконно в ЕС и многих других странах, и машина не пройдёт техосмотр. Принудительная регенерация или профессиональная чистка часто решают проблему за долю цены. Обычная причина — много коротких поездок; регулярная поездка по трассе на 20–30 минут помогает.' }],
          ask: ['Какое измеренное заполнение сажей и перепад давления? Вы пробовали принудительную регенерацию?']
        },
        adblue: {
          signs: ['Предупреждение AdBlue с обратным отсчётом километров — на нуле двигатель не запустится', 'Белые кристаллы у горловины или форсунки'],
          watch: [
            { claim: '«Можем отключить вам систему AdBlue».', truth: 'Удаление или эмулятор AdBlue незаконны и могут провалить техосмотр. Большинство неисправностей — это датчик, нагреватель или кристаллизовавшаяся жидкость, и эти детали ремонтируются.' },
            { claim: 'Доливка AdBlue по ценам сервиса.', truth: 'AdBlue недорог на любой АЗС, и вы можете залить его сами через синюю крышку.' }
          ],
          ask: ['Какая именно деталь неисправна: датчик, нагреватель, насос или форсунка?']
        },
        fuel: {
          signs: ['Тяжёлый запуск или перебои после заправки', 'Предупреждение о воде в топливе'],
          watch: [{ claim: '«Раскоксовка и чистка топливной системы дизеля».', truth: 'Этого нет в регламенте. Что действительно важно для дизеля, так это топливный фильтр, который ещё и отделяет воду. Меняйте его по интервалу из инструкции.' }],
          ask: ['Когда по сервисной книжке последний раз меняли топливный фильтр?']
        },
        battery: {
          signs: ['Стартер крутит вяло, особенно холодным утром', 'Перестала работать система старт-стоп', 'Аккумулятору больше 5 лет'],
          watch: [{ claim: '«Вашей машине нужен особый аккумулятор, и его надо прописать».', truth: 'Часто это правда: машины со старт-стопом требуют AGM или EFB-аккумулятор, и многим нужно зарегистрировать новый аккумулятор через компьютер. Это честная оплата, но сначала попросите нормальный тест аккумулятора.' }],
          ask: ['Можно распечатку тестера: измеренный CCA против номинала на этикетке?']
        },
        transferCase: {
          signs: ['Стуки или «закусывание» при крутом повороте на малой скорости', 'Гул или вибрация из середины машины'],
          watch: [{ claim: '«Надо менять все четыре шины, а не две».', truth: 'На полноприводной машине это может быть справедливо: большая разница протектора между осями заставляет раздаточную коробку и дифференциалы работать постоянно. Спросите, какую максимальную разницу допускает производитель.' }],
          ask: ['Какая разница протектора между передними и задними шинами, в мм?']
        }
      },
      electric: {
        hvBattery: {
          signs: ['Запас хода заметно меньше, чем у похожих машин того же возраста в тот же сезон', 'Предупреждения о батарее или зарядке'],
          watch: [
            { claim: '«Батарея изношена, нужна новая».', truth: 'Потерять 10–20% запаса хода за много лет — нормально, а в мороз запас хода падает до 20–30%. Попросите отчёт о состоянии батареи (SoH) с нормального диагностического прибора.' },
            { claim: '«Высоковольтная батарея требует регулярного обслуживания».', truth: 'Для большинства электромобилей, включая Model Y, у высоковольтной батареи нет планового обслуживания. Работать с ней должны только обученные сертифицированные специалисты.' }
          ],
          ask: ['Можно получить отчёт о состоянии (SoH) батареи?']
        },
        motor: {
          signs: ['Новый гул, вой или стук при разгоне или сбросе газа', 'Предупреждение о приводном блоке'],
          watch: [{ claim: '«Замена масла, свечей, ремня ГРМ».', truth: 'В электромобиле ничего из этого нет. В приводном блоке долговечное масло, которое меняют редко или вообще никогда. Если вам предлагают «ТО двигателя», спросите, что именно сделают.' }],
          ask: ['Какие пункты регламента производителя вы выполняете?']
        },
        inverter: {
          signs: ['Внезапная потеря мощности с предупреждением', 'Машина не включает режим движения'],
          watch: [{ claim: '«Инвертор надо менять».', truth: 'Попросите точный код ошибки. Некоторые неисправности исправляет обновление ПО или более дешёвая деталь, поэтому пусть официальный сервис подтвердит, прежде чем менять дорогой блок.' }],
          ask: ['Какой код ошибки и есть ли для неё обновление ПО?']
        },
        charging: {
          signs: ['Кабель не фиксируется или зарядка останавливается на полпути', 'Быстрая зарядка заметно медленнее обычного'],
          watch: [{ claim: '«Порт зарядки сломан, надо менять».', truth: 'Часто причина — грязь на контактах, заедание фиксатора или неисправная станция, поэтому попробуйте другую зарядку. Более медленная зарядка в холод или при высоком уровне заряда — это норма.' }],
          ask: ['Вы пробовали другую зарядную станцию или кабель?']
        },
        thermal: {
          signs: ['Обогрев или охлаждение слабее обычного', 'Предупреждения о батарее или охлаждающей жидкости'],
          watch: [{ claim: '«Замена антифриза и заправка кондиционера».', truth: 'Проверьте регламент: антифриз долговечный, а система кондиционера герметична. Настоящая позиция обслуживания — салонный фильтр, недорогая деталь, которую часто легко заменить самому.' }],
          ask: ['Это есть в регламенте производителя для моей машины?']
        },
        battery: {
          signs: ['Сообщение «требуется обслуживание 12-вольтового аккумулятора»', 'Машина не «просыпается» и не открывается, хотя основная батарея полная'],
          watch: [{ claim: '«Проблема в основной батарее».', truth: 'Если машина полностью «мёртвая», обычно виноват маленький 12-вольтовый (низковольтный) аккумулятор — распространённая и недорогая замена.' }],
          ask: ['Вы проверили 12-вольтовый аккумулятор?']
        },
        reduction: {
          signs: ['Вой, который усиливается со скоростью', 'Масло течёт возле приводного блока'],
          watch: [{ claim: '«Обслуживание коробки передач».', truth: 'Здесь только одна фиксированная передача и нет сцепления. Масло долговечное, поэтому проверьте, есть ли вообще его замена в инструкции.' }],
          ask: ['Где это написано в регламенте производителя?']
        },
        brakes: {
          signs: ['Писк или скрежет при торможении', 'Тормоза «хватают» или шумят после простоя машины', 'Мягкая или проваливающаяся педаль тормоза — проверьте немедленно'],
          watch: [{ claim: '«Тормозные колодки изношены».', truth: 'Электромобиль тормозит в основном мотором (рекуперация), поэтому колодки могут пройти больше 100 тыс. км. Настоящий риск противоположный: диски без работы ржавеют, а направляющие суппортов закисают. Чистка и смазка суппортов — честная услуга, особенно там, где дороги посыпают солью.' }],
          ask: ['Сколько мм колодки осталось? Диски ржавые или направляющие закисли?']
        },
        wheels: {
          signs: ['Протектор изношен до индикаторов (1,6 мм — юридический минимум в ЕС; 3 мм — более безопасная граница)', 'Грыжи или трещины на боковине', 'Неравномерный износ с одного края'],
          watch: [{ claim: '«Электромобили «едят» шины — менять придётся часто».', truth: 'Отчасти правда: вес и мгновенный крутящий момент изнашивают шины быстрее. Регулярная перестановка колёс (Tesla советует примерно каждые 10 тыс. км) — честная и недорогая услуга. Новые шины должны иметь правильный индекс нагрузки, но пометка «EV» не обязательна.' }],
          ask: ['Какая глубина протектора на каждой шине, в мм?']
        }
      }
    }
  }
};

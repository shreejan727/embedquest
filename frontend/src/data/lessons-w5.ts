// ============================================================
// EMBEDQUEST — WORLD 5: BASIC ELECTRONICS
// 8 lessons. Components, circuits, tools, troubleshooting.
// ============================================================
import type { Lesson, QuizQuestion } from '../lib/types';

export const world5Lessons: Lesson[] = [
  // ---------------------------------------------------------- w5l1
  {
    id: 'w5l1',
    worldId: 'w5',
    title: 'What is Electricity?',
    minutes: 8,
    sections: [
      {
        kind: 'intro',
        heading: 'Invisible force',
        body: 'Electricity = charged particles movement. atom level la irundhu LED glow varaikkam — embedded engineer ku idhu daily visibility venum!',
      },
      {
        kind: 'explain',
        heading: 'Charge & electrons',
        body: 'Ellaa matter = atoms: nucleus (protons +, neutrons) + electrons (−) orbiting.\nCharge (Q, coulombs) = property. Like charges repel, unlike attract.\n\nMetals la outer electrons LOOSE — free electrons drift = electric current! Copper = excellent conductor (free electrons galore). Rubber/plastic = insulators (electrons locked).\n\nConventional current: + → − direction (historical!). Electron flow: actually − → +. Circuit analysis la conventional dhaan use pannuvom.',
      },
      {
        kind: 'analogy',
        heading: 'Crowded corridor analogy',
        body: 'Conductor = wide corridor (easy walk). Insulator = locked door (no movement). Semiconductor = bouncer-controlled door (SOMETIMES open) — transistors, diodes idhu dhaan!',
      },
      {
        kind: 'visual',
        heading: 'Conductor vs insulator',
        code: ' CONDUCTOR (Cu):  electrons\n    ● ● ● ● ● ● ●  (free to move)\n\n INSULATOR:       electrons\n    ⊗ ⊗ ⊗ ⊗ ⊗ ⊗    (locked to atoms)\n\n SEMICONDUCTOR (Si):\n    gated flow (voltage controlled!)',
      },
      {
        kind: 'technical',
        heading: 'DC vs AC + safety',
        list: [
          'DC (Direct Current): one direction only — batteries, USB, MCUs (5V/3.3V).',
          'AC (Alternating Current): direction reverses 50-60×/sec — wall sockets (230V India!).',
          'Embedded work = DC low voltage ONLY (5V, 3.3V, 12V).',
          'Current kills, voltage pushes: even 50mA through heart = dangerous. Mains 230V = NEVER experiment!',
          'Safe rule: touch only battery/USB powered circuits.',
        ],
      },
      {
        kind: 'example',
        heading: 'Everyday electricity',
        body: 'AA battery: 1.5V DC, ~2000mAh capacity.\nUSB: 5V DC (500mA standard port).\nPhone battery: 3.7V DC, ~4000mAh.\nWall socket: 230V AC — DANGER zone, embedded la touch pannave koodadhu!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Mains (230V) la experiment panradhu — low voltage DC only!',
          'Electron flow direction = conventional current nu confuse (analysis la conventional use pannunga).',
          'AC/DC difference miss pannradhu — MCU = DC only!',
        ],
      },
    ],
    task: {
      title: 'Mini task: Voltage hunter',
      steps: [
        'Veetla DC devices list pannunga + voltage (battery, adapter labels paaru).',
        'Why 230V dangerous nu 2 lines ezhudhunga.',
      ],
    },
    quiz: [
      {
        q: 'Current flow = ?',
        options: [
          'Protons moving',
          'Free electrons moving',
          'Neutrons moving',
          'Atoms jumping',
        ],
        answer: 1,
        explain: 'Free electrons drift = current in conductors.',
      },
      {
        q: 'MCU boards (Arduino/ESP32) power type?',
        options: ['AC', 'DC low voltage', '230V AC', 'Any'],
        answer: 1,
        explain: '5V/3.3V DC — safe low voltage world!',
      },
      {
        q: 'Conductor example?',
        options: ['Rubber', 'Copper', 'Plastic', 'Wood'],
        answer: 1,
        explain: 'Copper = free electrons → excellent conductor.',
      },
    ],
  },

  // ---------------------------------------------------------- w5l2
  {
    id: 'w5l2',
    worldId: 'w5',
    title: "Ohm's Law Deep Dive",
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'The #1 formula',
        body: 'V = I × R — electronics la most used equation! Resistor selection, LED protection, current limiting — ellaam idhu dhaan. Master this!',
      },
      {
        kind: 'explain',
        heading: 'The triangle',
        body: 'V = I × R\nI = V / R\nR = V / I\n\nTriangle trick: V on top, I & R bottom. Cover the one you want → formula visible!\n\nPower also: P = V × I = I² × R = V² / R (watts). Resistor wattage rating matters — 0.25W standard, exceeded = burn!',
      },
      {
        kind: 'analogy',
        heading: 'Water pipe (again — it works!)',
        body: 'Pressure (V) = flow (I) × pipe-thinness (R). Double pressure → double flow. Half pipe width (double R) → half flow. Intuition locked!',
      },
      {
        kind: 'visual',
        heading: 'The magic triangle',
        code: '      V\n     ---\n    I | R\n\nCover V: I × R\nCover I: V / R\nCover R: V / I\n\nP = V × I (power = heat!)',
      },
      {
        kind: 'technical',
        heading: 'Worked patterns',
        list: [
          'LED protection: (5V - 2V) / 0.02A = 150Ω → 220Ω standard use pannunga.',
          'Arduino pin max 40mA (20mA safe!) — direct LED without resistor = pin damage!',
          'Series resistor current SAME. Voltage drop = I × R.',
          'Multimeter: voltage = parallel connect, current = series connect (break circuit!).',
          'Resistor power: P = I²R — 100Ω with 50mA → 0.25W → use 0.5W resistor!',
        ],
      },
      {
        kind: 'example',
        heading: 'Three solved problems',
        body: '1. 12V supply, need 0.5A: R = V/I = 12/0.5 = 24Ω\n2. 3.3V pin, 330Ω resistor: I = 3.3/330 = 10mA ✓ safe\n3. 100Ω with 0.1A: P = I²R = 0.01 × 100 = 1W → 1W rated resistor needed!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'mA/A unit mix: 20mA = 0.02A — divide by 1000!',
          'LED forward voltage (2V) ignore pannradhu: R = (5-2)/I, not 5/I.',
          'Resistor wattage rating miss — smoke test! 💨',
        ],
      },
    ],
    task: {
      title: 'Mini task: Ohm calculator',
      steps: [
        'Ohm\'s Law tool open pannunga (Tools hub!) — 3 combos try pannunga.',
        '9V battery + 470Ω → current calculate (19.1mA).',
        'LED circuit: 3.3V supply, red LED (1.8V), 15mA target → R = 100Ω verify.',
      ],
    },
    quiz: [
      {
        q: 'Ohm\'s Law?',
        options: ['V = I × R', 'V = I / R', 'I = V × R', 'R = V × I'],
        answer: 0,
        explain: 'Voltage = Current × Resistance.',
      },
      {
        q: '5V, 1000Ω → current?',
        options: ['5mA', '5A', '0.5mA', '50mA'],
        answer: 0,
        explain: 'I = 5/1000 = 0.005A = 5mA.',
      },
      {
        q: 'LED (2V drop) on 5V, want 15mA: R = ?',
        options: ['33Ω', '200Ω', '333Ω', '2000Ω'],
        answer: 1,
        explain: 'R = (5-2)/0.015 = 200Ω.',
      },
    ],
  },

  // ---------------------------------------------------------- w5l3
  {
    id: 'w5l3',
    worldId: 'w5',
    title: 'Series and Parallel Circuits',
    minutes: 11,
    sections: [
      {
        kind: 'intro',
        heading: 'Circuit topologies',
        body: 'Components connect panna rendu vazhi: series (chain) and parallel (branches). Rules totally different! Home wiring parallel, old fairy lights series — yean nu puriyum!',
      },
      {
        kind: 'explain',
        heading: 'Series rules',
        body: 'SERIES (one path):\n- Current SAME everywhere: I total = I1 = I2 = ...\n- Voltages ADD: V = V1 + V2 + ...\n- Resistance ADDS: R = R1 + R2 + ...\n\nExample: 3V + 3V batteries series = 6V. One bulb burns out → ALL OFF (path broken!).',
      },
      {
        kind: 'analogy',
        heading: 'Toll gates analogy',
        body: 'Series = toll gates in a row (current same through each, pressure drops at each). Parallel = multiple toll booths side by side (same pressure, traffic splits!).',
      },
      {
        kind: 'visual',
        heading: 'Parallel rules',
        code: ' PARALLEL (branches):\n - Voltage SAME across all\n - Currents ADD: I = I1 + I2\n - 1/R = 1/R1 + 1/R2\n\n Two equal R: R/2 (halves!)\n\n Old Christmas lights: series\n (one breaks → all dark!)',
      },
      {
        kind: 'technical',
        heading: 'Key formulas & uses',
        list: [
          'Parallel 2 resistors: R = (R1 × R2) / (R1 + R2) — product over sum shortcut!',
          'Equal resistors parallel: R/n (3×300Ω parallel = 100Ω).',
          'Parallel total < smallest resistor. Series total > largest.',
          'Voltage divider = series: Vout = Vin × R2/(R1+R2) — LDR circuits, sensor scaling!',
          'Home wiring = parallel: yedhavadhu device off pannaa, mathellam ON irukku! Same voltage each.',
        ],
      },
      {
        kind: 'example',
        heading: 'Full worked example',
        body: 'Series: 220Ω + 330Ω = 550Ω total. 5V → I = 5/550 = 9.1mA (same both).\nV drops: 220Ω → 2V, 330Ω → 3V ✓ (sums to 5V)\n\nParallel: 220Ω ∥ 330Ω:\nR = (220×330)/(220+330) = 72600/550 = 132Ω (less than 220!)\n5V → I = 37.9mA total (branches split!).\n\nVoltage divider: R1=10k, R2=10k, Vin=5V → Vout = 2.5V (mid-point!).',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Parallel resistance ADD panradhu — reciprocal formula dhaan!',
          'Series la current splits nu nenaikiradhu — current SAME, voltage splits!',
          'Voltage divider load ignore panradhu — load connected na voltage changes!',
        ],
      },
    ],
    task: {
      title: 'Mini task: Circuit calculator',
      steps: [
        'Series: 100Ω + 220Ω + 470Ω → total? (790Ω). 5V la current?',
        'Parallel: 1kΩ ∥ 1kΩ → ? (500Ω). Use tool verify!',
      ],
    },
    quiz: [
      {
        q: 'Series circuit current?',
        options: [
          'Splits between components',
          'Same through all',
          'Zero',
          'Doubles',
        ],
        answer: 1,
        explain: 'Single path → same current everywhere.',
      },
      {
        q: 'Parallel circuit voltage?',
        options: [
          'Adds up',
          'Same across all branches',
          'Zero',
          'Halves',
        ],
        answer: 1,
        explain: 'All branches see the same supply voltage.',
      },
      {
        q: '1kΩ ∥ 1kΩ = ?',
        options: ['2000Ω', '1000Ω', '500Ω', '250Ω'],
        answer: 2,
        explain: 'Equal R parallel: R/n = 1000/2 = 500Ω.',
      },
      {
        q: 'Home wiring type?',
        options: ['Series', 'Parallel', 'Random', 'Mixed always'],
        answer: 1,
        explain: 'Parallel: same voltage per device, independent operation!',
      },
    ],
  },

  // ---------------------------------------------------------- w5l4
  {
    id: 'w5l4',
    worldId: 'w5',
    title: 'Resistors and Color Codes',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Rainbow decoder',
        body: 'Resistor la color bands = value code! Decoder skill = lab la MUST (multimeter illama fast value check!). Tool: Resistor Color Code (Tools hub!).',
      },
      {
        kind: 'explain',
        heading: 'The code',
        body: '4-band resistor:\nBand 1 = first digit\nBand 2 = second digit\nBand 3 = multiplier (×10^n)\nBand 4 = tolerance (±%)\n\nColor → digit:\nBlack 0, Brown 1, Red 2, Orange 3, Yellow 4, Green 5, Blue 6, Violet 7, Grey 8, White 9.\nTolerance: Gold ±5%, Silver ±10%, Brown ±1%, Red ±2%.',
      },
      {
        kind: 'analogy',
        heading: 'Mnemonic (Better Be Right...)',
        body: '"Better Be Right Or Your Great Big Venture Goes West"\nB B R O Y G B V G W → 0-9! Tolerance band usually gold/silver (end la, gap uda).',
      },
      {
        kind: 'visual',
        heading: 'Reading direction',
        code: ' |🟤|⚫|🔴|🟡|  → wait, read from\n              the tolerance side!\n\n [BROWN][BLACK][RED][GOLD]\n   1      0    ×100  ±5%\n   = 10 × 100 = 1000Ω = 1kΩ\n\n Gap band = RIGHT side (tolerance last)',
      },
      {
        kind: 'technical',
        heading: 'Resistor facts',
        list: [
          'Units: Ω, kΩ (×1000), MΩ (×10⁶). 4k7 = 4.7kΩ (shorthand!).',
          'Power ratings: 1/4W (0.25W) standard, 1/2W, 1W+ for power.',
          'Tolerance meaning: 1kΩ ±5% = 950-1050Ω actual range.',
          'Types: carbon film (general), metal film (precision), SMD (tiny, printed codes).',
          'Pull-up/pull-down: 10kΩ standard value (input stabilization!).',
        ],
      },
      {
        kind: 'example',
        heading: 'Three decodes',
        body: 'Brown-Black-Red-Gold:\n1, 0, ×100, ±5% → 1000Ω = 1kΩ ±5%\n\nYellow-Violet-Orange-Gold:\n4, 7, ×1000 → 47kΩ ±5%\n\nBrown-Red-Black-Gold:\n1, 2, ×1 → 12Ω ±5%\n\nReverse: 330Ω 5% = Orange-Orange-Brown-Gold (33 × 10).',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Reading direction wrong — tolerance (gold/silver) band RIGHT side!',
          'Multiplier band = digit nu nenaikiradhu — band 3 = ×10^n!',
          'Tolerance miss — ±5% real range matter in precision circuits!',
        ],
      },
    ],
    task: {
      title: 'Mini task: Rainbow decoder',
      steps: [
        'Decode: Red-Red-Brown-Gold (220Ω), Brown-Green-Orange-Gold (15kΩ).',
        'Encode: 470Ω 5% color bands? (Yellow-Violet-Brown-Gold)',
        'Tool use panni 5 resistors verify pannunga.',
      ],
    },
    quiz: [
      {
        q: 'Brown-Black-Red = ?',
        options: ['100Ω', '1kΩ', '10kΩ', '100kΩ'],
        answer: 1,
        explain: '1, 0, ×100 → 1000Ω = 1kΩ.',
      },
      {
        q: 'Digit value of Yellow?',
        options: ['2', '3', '4', '5'],
        answer: 2,
        explain: 'BBROYGBVGW: Yellow = 4.',
      },
      {
        q: 'Gold tolerance band?',
        options: ['±1%', '±2%', '±5%', '±10%'],
        answer: 2,
        explain: 'Gold = ±5%, Silver = ±10%.',
      },
    ],
  },

  // ---------------------------------------------------------- w5l5
  {
    id: 'w5l5',
    worldId: 'w5',
    title: 'Capacitors and Inductors',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Energy storage duo',
        body: 'Resistor = burns energy. Capacitor = stores in electric field. Inductor = stores in magnetic field. Power filtering, timing, noise removal — idhu dhaan combo!',
      },
      {
        kind: 'explain',
        heading: 'Capacitor',
        body: 'Capacitor = two metal plates + insulator between. Charge STORES: C = Q/V (farads).\n\nCharges fast, discharges fast. Blocks DC, passes AC (signal coupling!).\n\nRC time constant: τ = R × C seconds. 1τ = 63% charge. 5τ ≈ full. Timing circuits, debounce smoothing idhu dhaan!\n\nTypes: ceramic (small, nF-µF), electrolytic (big µF, POLARITY +/−!), tantalum.',
      },
      {
        kind: 'analogy',
        heading: 'Water tank vs spring analogy',
        body: 'Capacitor = small water tank (fill fast, empty fast — pressure smoothing). Inductor = water wheel (spinning momentum — resists flow CHANGES). Capacitor resists VOLTAGE change; inductor resists CURRENT change!',
      },
      {
        kind: 'visual',
        heading: 'RC charging curve',
        code: ' V\n |     _____  ← ~5τ full\n |    /\n |   /  ← 63% at 1τ\n |  /\n |_/___________ t\n   |←τ→|\n\n τ = R × C  (e.g. 10kΩ × 100µF = 1s)',
      },
      {
        kind: 'technical',
        heading: 'Inductor & uses',
        list: [
          'Inductor: coil wire. L = henries. Current changes resist pannum (EMF back-EMF!).',
          'Relay/solenoid coils = inductors — switch OFF time back-EMF spike! Flyback diode MUST.',
          'Filters: capacitor smooths voltage ripple (power supplies), inductor chokes noise.',
          'Units: picofarad (pF), nanofarad (nF), microfarad (µF). µH, mH for inductors.',
          'Embedded: decoupling caps 0.1µF near every chip power pin — MANDATORY practice!',
        ],
      },
      {
        kind: 'example',
        heading: 'Real values',
        body: 'Arduino power rail: 10µF electrolytic + 0.1µF ceramic = clean supply.\n\n555 timer: R=10k, C=10µF → τ = 0.1s timing base.\n\nElectrolytic polarity: + leg longer, stripe = − leg. Reverse = BOOM (literally!). 💥',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Electrolytic cap polarity reverse — explodes! Stripe = negative!',
          'τ = R×C maranthu R/C use panradhu.',
          'Relay coil without flyback diode — transistor dies from spike!',
        ],
      },
    ],
    task: {
      title: 'Mini task: Cap identifier',
      steps: [
        'Ceramic cap code "104" → 10 × 10^4 pF = 100nF decode pannunga.',
        'τ calculate: 1kΩ + 100µF (0.1s). LED fade circuit imagine!',
      ],
    },
    quiz: [
      {
        q: 'Capacitor stores energy in?',
        options: [
          'Magnetic field',
          'Electric field',
          'Heat',
          'Light',
        ],
        answer: 1,
        explain: 'Plates + insulator → electric field storage.',
      },
      {
        q: 'RC time constant formula?',
        options: ['τ = R/C', 'τ = R × C', 'τ = C/R', 'τ = R + C'],
        answer: 1,
        explain: 'τ = R × C (ohms × farads = seconds).',
      },
      {
        q: 'Inductor resists changes in?',
        options: ['Voltage', 'Current', 'Resistance', 'Frequency'],
        answer: 1,
        explain: 'Back-EMF opposes current changes.',
      },
      {
        q: '0.1µF cap near chip power pins = ?',
        options: [
          'Decoration',
          'Decoupling (noise filtering)',
          'Timing',
          'Safety',
        ],
        answer: 1,
        explain: 'Local charge buffer smooths supply noise — best practice!',
      },
    ],
  },

  // ---------------------------------------------------------- w5l6
  {
    id: 'w5l6',
    worldId: 'w5',
    title: 'Diodes and LEDs',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'One-way valves + light!',
        body: 'Diode = electrical check valve (one direction only). LED = light-emitting diode — embedded la #1 output indicator! Polarity, forward voltage, current limiting — critical basics!',
      },
      {
        kind: 'explain',
        heading: 'Diode behavior',
        body: 'Forward biased (anode +, cathode −) → conducts (after ~0.7V silicon / 0.3V germanium).\nReverse biased → blocks (until breakdown — zener diodes USE this for voltage reference!).\n\nUses: rectification (AC→DC), flyback protection, reverse polarity protection, signal clipping.',
      },
      {
        kind: 'analogy',
        heading: 'One-way street analogy',
        body: 'Diode = one-way road: forward → drive freely (after small toll = 0.7V!). Reverse → barrier (blocked). Zener = toll booth with designed breakdown.',
      },
      {
        kind: 'visual',
        heading: 'LED anatomy + circuit',
        code: ' LED:  anode(+)──▷│──cathode(−)\n       long leg    |    short leg\n                          (flat side)\n\n 5V ──[220Ω]──▶|── GND\n\n Resistor = current limiter\n (20mA max typical LED!)',
      },
      {
        kind: 'technical',
        heading: 'LED specifics',
        list: [
          'Forward voltages: red 1.8-2.2V, yellow/green 2-2.4V, blue/white 3-3.5V.',
          'Current: 20mA max typical, 10-15mA safe. 3.3V logic: R = (3.3-2)/0.015 = 87Ω → 100Ω.',
          'Polarity: long leg = anode (+), short leg/flat side = cathode (−).',
          'Always series resistor! Without = burn LED + damage MCU pin.',
          'Types: standard, SMD, RGB (3 diodes in one!), IR (remote controls).',
        ],
      },
      {
        kind: 'example',
        heading: 'Resistor calculation (memorize pattern!)',
        body: 'Red LED on Arduino 5V:\nR = (5 − 2) / 0.015 = 200Ω → use 220Ω standard ✓\n\nBlue LED on ESP32 3.3V:\nR = (3.3 − 3.0) / 0.010 = 30Ω → 33-47Ω\n(smaller margin — blue/white need less R!)\n\nLED strip (12V): series resistors inside, but current higher — transistor/MOSFET switch needed (next lesson!).',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'No resistor with LED — instant burn! ALWAYS calculate.',
          'Polarity reverse — LED off (no damage usually, but nothing works!).',
          'All LEDs same forward voltage nu nenaikiradhu — color dependent!',
        ],
      },
    ],
    task: {
      title: 'Mini task: LED designer',
      steps: [
        'Green LED (2.1V) on 5V @ 15mA → R calculate (≈193 → 220Ω).',
        'LED polarity check: flat side = ? (cathode −)',
      ],
    },
    quiz: [
      {
        q: 'LED long leg = ?',
        options: ['Cathode (−)', 'Anode (+)', 'Ground', 'Control'],
        answer: 1,
        explain: 'Long leg = anode +. Short/flat = cathode −.',
      },
      {
        q: 'Red LED forward voltage ≈ ?',
        options: ['0.7V', '2V', '5V', '12V'],
        answer: 1,
        explain: 'Red ≈ 1.8-2.2V. Blue/white = 3-3.5V.',
      },
      {
        q: 'LED series resistor purpose?',
        options: [
          'Brightness increase',
          'Current limiting (protection!)',
          'Voltage storage',
          'Decoration',
        ],
        answer: 1,
        explain: 'Limits current to safe level — no resistor = burn!',
      },
    ],
  },

  // ---------------------------------------------------------- w5l7
  {
    id: 'w5l7',
    worldId: 'w5',
    title: 'Transistors, Relays & Switches',
    minutes: 11,
    sections: [
      {
        kind: 'intro',
        heading: 'Electronic hands',
        body: 'MCU pins small current dhaan (20mA)! Motor, relay, big LED strip — power switch panna amplifier/switch venum: transistor! Electronics la most important invention idhu dhaan!',
      },
      {
        kind: 'explain',
        heading: 'BJT as switch',
        body: 'BJT (Bipolar Junction Transistor) 3 pins: Base, Collector, Emitter.\n\nNPN switch mode: Base + small current (IB) → Collector-Emitter ON (large current IC).\nAmplification: IC = β × IB (β = 50-300!).\n\nSwitch usage: MCU pin → 1kΩ → Base. 3.3V pin → base current ~2.6mA → collector handles 100mA+ load! Small signal controls big power = TRANSISTOR MAGIC.',
      },
      {
        kind: 'analogy',
        heading: 'Water tap analogy',
        body: 'Base = tap handle (small effort). Collector-Emitter pipe = main water flow (big!). Handle slight turn → full flow. MCU = handle turner, load = water. MOSFET = even easier (voltage controlled tap!).',
      },
      {
        kind: 'visual',
        heading: 'NPN low-side switch',
        code: '        +12V\n         |\n      [MOTOR]\n         |\n  C ─────┘\n [NPN]  ← BC547/2N2222\n  B ──[1kΩ]── MCU pin\n  E ────── GND\n\n Pin HIGH → motor ON\n Pin LOW  → motor OFF',
      },
      {
        kind: 'technical',
        heading: 'Relay & switch family',
        list: [
          'MOSFET: voltage controlled (gate — no current!), better for high loads. Logic-level MOSFETs for 3.3V/5V.',
          'Relay: electromagnet + mechanical switch. Isolation + big AC/DC loads (but coil = inductor → flyback diode!).',
          'Manual switches: SPST (on/off), SPDT (changeover), push buttons (momentary).',
          'Common BJTs: BC547 (100mA), 2N2222 (800mA), TIP120 (Darlington, 5A!).',
          'Optocoupler: LED + phototransistor in one — full isolation!',
        ],
      },
      {
        kind: 'example',
        heading: 'Relay with protection',
        body: 'Relay coil: 5V, 70mA → MCU pin handle pannave mudiyadhu (20mA max!).\n\nCircuit: pin → 1kΩ → NPN base. Collector → relay coil → 5V. FLYBACK DIODE across coil (cathode to +5V)!\n\nPin HIGH → transistor ON → coil energized → switch contacts close → external load ON.\nWithout diode: coil OFF moment back-EMF spike (50V+) → transistor dies! ☠️',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Relay/motor flyback diode miss — component murder!',
          'Base resistor miss — pin overload!',
          'NPN/PNP confuse — NPN low-side switching (load between +V and collector).',
        ],
      },
    ],
    task: {
      title: 'Mini task: Switch designer',
      steps: [
        'NPN + relay + flyback diode circuit paper la draw pannunga.',
        'β=100, need 500mA load → base current? (5mA → base resistor (5V-0.7)/5mA = 860Ω → 1kΩ standard)',
      ],
    },
    quiz: [
      {
        q: 'BJT pins?',
        options: [
          'Source, Gate, Drain',
          'Base, Collector, Emitter',
          'Plus, Minus, Ground',
          'In, Out, Ground',
        ],
        answer: 1,
        explain: 'BJT: Base (control), Collector, Emitter. (MOSFET: G/D/S!)',
      },
      {
        q: 'Relay coil flyback diode purpose?',
        options: [
          'Speed up',
          'Protect from back-EMF spike',
          'Increase current',
          'Reduce noise',
        ],
        answer: 1,
        explain: 'Coil OFF → huge voltage spike → diode safely clamps it.',
      },
      {
        q: 'MCU pin max current ≈ ?',
        options: ['2mA', '20-40mA', '500mA', '2A'],
        answer: 1,
        explain: '~40mA absolute max, 20mA safe. Bigger loads need transistor!',
      },
    ],
  },

  // ---------------------------------------------------------- w5l8
  {
    id: 'w5l8',
    worldId: 'w5',
    title: 'Breadboards, Multimeter & Troubleshooting',
    minutes: 11,
    sections: [
      {
        kind: 'intro',
        heading: 'Lab survival kit',
        body: 'Solder illama circuit build = breadboard. Measurements = multimeter. Problems fix = troubleshooting methodology. Intha lesson = hands-on lab manual!',
      },
      {
        kind: 'explain',
        heading: 'Breadboard anatomy',
        body: 'Connection rules:\n- Power rails (±): full row horizontal connected (red +, blue −).\n- Terminal strips: columns a-e VERTICAL connected (5-hole groups).\n- Center channel: IC placement (a-e and f-j separate!).\n- Same column = same node (electrically connected!).\n\nVirtual Breadboard tool la interactive-a explore pannunga (Tools hub!).',
      },
      {
        kind: 'analogy',
        heading: 'Multimeter = doctor stethoscope',
        body: 'Voltage mode = blood pressure check (parallel, no break). Current mode = flow meter (SERIES, circuit break!). Continuity mode = "connection irukka?" beep test. Resistance mode = component check (power OFF!).',
      },
      {
        kind: 'visual',
        heading: 'Multimeter modes',
        code: ' V⎓ (DC volts)   — parallel, circuit ON\n A  (amps)       — SERIES, break circuit!\n Ω  (ohms)       — component alone, OFF\n ·)) (continuity)— beep = connected\n\n Wrong mode = fuse blow or\n wrong readings!',
      },
      {
        kind: 'technical',
        heading: 'Troubleshooting method',
        list: [
          'Step 1: VISUAL check — loose wires, wrong holes, reversed LED, missing ground!',
          'Step 2: POWER verify — multimeter V mode: supply correct-ah?',
          'Step 3: Continuity — expected connections really connected-ah? (power OFF first!)',
          'Step 4: Component test — resistor value, LED polarity, transistor pinout.',
          'Step 5: Divide & conquer — half circuit disconnect, half test. Binary search approach!',
          'Common faults: floating input (needs pull-up!), missing common GND, wrong resistor band read.',
        ],
      },
      {
        kind: 'example',
        heading: 'Classic debugging story',
        body: 'LED circuit not working:\n1. Visual: LED polarity? ✓ correct. Resistor right band? → 470Ω, but circuit needs 220Ω — works but dim, not dead.\n2. Voltage check: 5V rail ✓. LED anode point: 5V ✓. Cathode point: 5V?! ← LED not conducting!\n3. Continuity: LED leg to breadboard hole — loose leg! Fix → LED ON ✓\n\nVoltage probes = circuit story teller. Learn to READ them!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Current mode parallel connect — short circuit! Series dhaan!',
          'Ohm mode with power ON — wrong reading + meter damage.',
          'Breadboard rail assumptions wrong — some boards rails break in middle! Verify continuity.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Lab drill',
      steps: [
        'Breadboard tool pannunga (Tools hub!) — column connection rules learn.',
        'LED + resistor circuit breadboard plan ezhudhunga (hole numbers uda!).',
        'Multimeter modes list + use case match pannunga.',
      ],
    },
    quiz: [
      {
        q: 'Breadboard same column (a-e) holes = ?',
        options: [
          'Isolated',
          'Connected (same node)',
          'Power rails',
          'Ground only',
        ],
        answer: 1,
        explain: 'Vertical 5-hole group = one electrical node.',
      },
      {
        q: 'Current measurement connection?',
        options: ['Parallel', 'Series (break circuit)', 'Anywhere', 'Never'],
        answer: 1,
        explain: 'Ammeter = series. Parallel = short circuit!',
      },
      {
        q: 'Continuity mode beep = ?',
        options: [
          'Voltage present',
          'Connected path (low resistance)',
          'Broken wire',
          'High resistance',
        ],
        answer: 1,
        explain: 'Beep = electrical connection exists.',
      },
      {
        q: 'LED not lighting — first step?',
        options: [
          'Replace everything',
          'Visual check (polarity, connections)',
          'Buy new breadboard',
          'Give up',
        ],
        answer: 1,
        explain: 'Systematic: visual → power → continuity → component. 80% = simple faults!',
      },
    ],
  },
];

export const world5Boss: QuizQuestion[] = [
  {
    q: 'BOSS: 12V supply, 600Ω load → current?',
    options: ['0.02A (20mA)', '0.2A', '2A', '5A'],
    answer: 0,
    explain: 'I = 12/600 = 0.02A = 20mA.',
  },
  {
    q: 'BOSS: Three 300Ω resistors in parallel = ?',
    options: ['900Ω', '300Ω', '100Ω', '33Ω'],
    answer: 2,
    explain: 'Equal R parallel: R/n = 300/3 = 100Ω.',
  },
  {
    q: 'BOSS: Blue-Gray-Red-Gold resistor = ?',
    options: ['6.8kΩ', '680Ω', '68kΩ', '8.6kΩ'],
    answer: 2,
    explain: '6, 8, ×100 → 6800Ω = 6.8kΩ.',
  },
  {
    q: 'BOSS: Electrolytic capacitor polarity stripe = ?',
    options: ['Positive', 'Negative', 'Neutral', 'Signal'],
    answer: 1,
    explain: 'Stripe marks the − leg. Reverse = boom!',
  },
  {
    q: 'BOSS: NPN transistor as switch — load yeng connect?',
    options: [
      'Between +V and collector (low-side)',
      'Between emitter and GND',
      'Parallel with base',
      'Across the base resistor',
    ],
    answer: 0,
    explain: 'NPN low-side: load on collector side, emitter to GND.',
  },
  {
    q: 'BOSS: Voltage divider: Vin=5V, R1=10k, R2=10k → Vout?',
    options: ['1.25V', '2.5V', '3.75V', '5V'],
    answer: 1,
    explain: 'Vout = 5 × 10/(10+10) = 2.5V.',
  },
  {
    q: 'BOSS: LED dim/burn prevention component?',
    options: ['Capacitor', 'Series resistor', 'Inductor', 'Relay'],
    answer: 1,
    explain: 'Current limiter = series resistor (always!).',
  },
];

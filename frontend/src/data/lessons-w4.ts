// ============================================================
// EMBEDQUEST — WORLD 4: DIGITAL ELECTRONICS
// 8 lessons. Gates, truth tables, adders, flip-flops.
// ============================================================
import type { Lesson, QuizQuestion } from '../lib/types';

export const world4Lessons: Lesson[] = [
  // ---------------------------------------------------------- w4l1
  {
    id: 'w4l1',
    worldId: 'w4',
    title: 'Voltage, Current, Resistance Basics',
    minutes: 9,
    sections: [
      {
        kind: 'intro',
        heading: 'Electricity ABC',
        body: 'Embedded systems = electricity control! Circuit la yenna nadakudhu nu puriyanama component connect pannaa — smoke test dhaan 😅. Basics first!',
      },
      {
        kind: 'explain',
        heading: 'Three pillars',
        body: 'Voltage (V, volts) = electrical pressure/push. Water pressure maari — push strength.\nCurrent (I, amps) = flow rate. Yevalo electrons flow aagudhu per second. Water flow rate maari.\nResistance (R, ohms Ω) = flow opposition. Pipe size maari — small pipe = more resistance.\n\nRelationship: Ohm\'s Law V = I × R (World 5 la deep dive!). Voltage push pannudhu, resistance thadukkudhu, current flow aagudhu.',
      },
      {
        kind: 'analogy',
        heading: 'Water tank analogy',
        body: 'Overhead tank = voltage (height = pressure). Pipe = resistance (thin pipe = high resistance). Water flow = current. Tank height ↑ → pressure ↑ → flow ↑. Pipe thin → flow ↓. Perfect mapping!',
      },
      {
        kind: 'visual',
        heading: 'Circuit basics',
        code: '  +----[ R ]----+\n  |             |\n (V)           (bulb)\n  |             |\n  +-------------+\n\n V (battery) pushes current I\n through R. Closed loop =\n complete circuit NEEDED!',
      },
      {
        kind: 'technical',
        heading: 'Units & measuring',
        list: [
          'Voltage: volt (V). 1.5V AA battery, 5V USB, 230V mains (DANGER!).',
          'Current: ampere (A). LED needs ~20mA (0.02A). 1A = 1000mA.',
          'Resistance: ohm (Ω). Wires ~0Ω, resistors 1Ω to 10MΩ.',
          'Multimeter measures all three (mode select!).',
          'Power P = V × I (watts) — LED 5V×20mA = 0.1W.',
        ],
      },
      {
        kind: 'example',
        heading: 'Quick calculations',
        body: '5V supply, 220Ω resistor:\nI = V/R = 5/220 = 0.0227A = 22.7mA → LED safe range!\n\n9V battery, 1kΩ:\nI = 9/1000 = 9mA → small LED glow.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Voltage/current confuse — voltage = pressure, current = flow.',
          'Open circuit test panradhu — loop complete aaganum, current flow aagum!',
          'mA/A conversion miss: 0.02A = 20mA.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Unit builder',
      steps: [
        'AA battery voltage, phone charger current, LED resistor values note pannunga.',
        'I = V/R calculate pannunga: 5V + 500Ω.',
      ],
    },
    quiz: [
      {
        q: 'Current unit?',
        options: ['Volt', 'Ampere', 'Ohm', 'Watt'],
        answer: 1,
        explain: 'Current = amperes (A). Voltage = volts, resistance = ohms.',
      },
      {
        q: 'Resistance yenna pannum?',
        options: [
          'Increases current',
          'Opposes current flow',
          'Stores charge',
          'Creates voltage',
        ],
        answer: 1,
        explain: 'Resistance = flow opposition (thin pipe!).',
      },
      {
        q: '5V + 250Ω → current?',
        options: ['0.02A (20mA)', '2A', '1250A', '0.5A'],
        answer: 0,
        explain: 'I = 5/250 = 0.02A = 20mA.',
      },
    ],
  },

  // ---------------------------------------------------------- w4l2
  {
    id: 'w4l2',
    worldId: 'w4',
    title: 'Analog vs Digital + Logic HIGH/LOW',
    minutes: 9,
    sections: [
      {
        kind: 'intro',
        heading: 'Two signal worlds',
        body: 'Temperature smoothly changes = analog. Light ON/OFF = digital. Embedded la both mix aagum — ADC (World 6) convert pannum. Base first!',
      },
      {
        kind: 'explain',
        heading: 'Analog vs digital',
        body: 'Analog = continuous values (0.1, 0.2, 0.15... infinite steps). Real world: temperature, sound, light intensity.\nDigital = discrete steps: only defined levels. Computers la 2 levels: HIGH and LOW.\n\nLogic HIGH = "1" (TTL: ~5V, actually 2.5V-5V range).\nLogic LOW = "0" (0V-0.8V range).\n\nIn-between voltages = forbidden zone (undefined!) — noise illama design pannanum.',
      },
      {
        kind: 'analogy',
        heading: 'Ramp vs staircase analogy',
        body: 'Analog = smooth ramp (every height possible). Digital = staircase (fixed steps). Microcontroller sees staircase only — ramp-a steps-a convert pannanum = ADC!',
      },
      {
        kind: 'visual',
        heading: 'Signal shapes',
        code: ' ANALOG:  _/‾\\_/‾\\_  (smooth wave)\n\n DIGITAL: ___|‾‾‾|___|‾‾‾\n          (sharp square jumps)\n\n HIGH=1 (~5V)  LOW=0 (~0V)',
      },
      {
        kind: 'technical',
        heading: 'Logic levels detail',
        list: [
          'TTL (5V logic): HIGH = 2.0V+, LOW = 0.8V- (noise margin!).',
          '3.3V logic (ESP32!): HIGH ≈ 3.3V. 5V direct = DANGER for ESP32 pins!',
          'Noise immunity: HIGH/LOW ranges have margins — small noise doesn\'t flip logic.',
          'Square wave = digital clock signal (MHz!).',
          'Embedded: sensors give analog (LM35), digital (DHT11), or both options.',
        ],
      },
      {
        kind: 'example',
        heading: 'Real readings',
        body: 'Button pressed → pin reads HIGH (5V) → logic 1.\nButton released → LOW (0V) → logic 0.\n\nLDR output 2.7V (TTL input) → between 0.8 and 2.0? NO — 2.7 > 2.0 → reads HIGH ✓\nLDR output 1.5V → UNDEFINED zone! → unreliable reading. Design lesson: keep away from margins.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Analog signal digital pin la read panradhu — ADC pin dhaan!',
          '5V signal 3.3V MCU la direct connect — damage!',
          'HIGH = exactly 5.00V nu nenaikiradhu — range dhaan (2.5-5V TTL).',
        ],
      },
    ],
    task: {
      title: 'Mini task: Signal sorter',
      steps: [
        'Classify: sound wave, button state, temperature, light ON/OFF, motor speed.',
        'TTL pin 3.7V input → HIGH or undefined? Calculate pannunga.',
      ],
    },
    quiz: [
      {
        q: 'Analog signal nature?',
        options: [
          'Only 0 and 1',
          'Continuous values',
          'Only square waves',
          'Only sound',
        ],
        answer: 1,
        explain: 'Analog = continuous (infinite intermediate values).',
      },
      {
        q: 'TTL logic HIGH voltage range?',
        options: ['0-0.8V', '2.0-5V', 'Exactly 5V', '1.5-2.0V'],
        answer: 1,
        explain: 'HIGH = 2.0V to 5V. LOW = 0 to 0.8V. Between = undefined.',
      },
      {
        q: 'Digital signal advantage?',
        options: [
          'More detail than analog',
          'Noise immunity (clear HIGH/LOW margins)',
          'Needs no power',
          'Analog sound quality',
        ],
        answer: 1,
        explain: 'Noise margins make digital robust — small noise won\'t flip logic.',
      },
    ],
  },

  // ---------------------------------------------------------- w4l3
  {
    id: 'w4l3',
    worldId: 'w4',
    title: 'Basic Logic Gates: AND, OR, NOT',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Digital building blocks',
        body: 'Ellaa digital circuit = logic gates combination! Billions of gates un CPU ulla. 3 basic gates first — innum moonu (NAND/NOR/XOR) next lesson!',
      },
      {
        kind: 'explain',
        heading: 'The big three',
        body: 'AND: Ella inputs um 1 na output 1. (Series switches: both press → bulb ON)\nOR: Yedhavadhu input 1 na output 1. (Parallel switches: any press → ON)\nNOT: Input flip. 1→0, 0→1. (Inverter/bubble)\n\nTruth table = ovvoru input combination ku output list. Gates oda ID card!',
      },
      {
        kind: 'analogy',
        heading: 'Bank security analogy',
        body: 'AND = vault: manager AND guard rendu keys venum (both 1). OR = back door: manager OR guard pothum (any 1). NOT = opposite-day guard (flip!).',
      },
      {
        kind: 'visual',
        heading: 'Truth tables',
        code: ' A B |AND| OR\n 0 0 | 0 | 0\n 0 1 | 0 | 1\n 1 0 | 0 | 1\n 1 1 | 1 | 1\n\n A | NOT\n 0 |  1\n 1 |  0',
      },
      {
        kind: 'technical',
        heading: 'Symbols & expressions',
        list: [
          'AND symbol: D shape. OR: curved shield. NOT: triangle + bubble.',
          'Boolean: AND = A·B (or AB), OR = A+B, NOT = A\' (or Ā).',
          'AND output 0 count = 3 (only 11 → 1). OR output 1 count = 3 (only 00 → 0).',
          'Real gates: 7408 (quad AND), 7432 (quad OR), 7404 (hex NOT) — classic ICs!',
          'Embedded: GPIO port logic ulla gates, address decoders.',
        ],
      },
      {
        kind: 'example',
        heading: 'Switch circuit mapping',
        body: 'AND circuit: two switches in SERIES — both close (1) → current flows → bulb ON.\n\n  V --[S1]--[S2]-- bulb\n  (S1=1, S2=1 needed!)\n\nOR circuit: two switches in PARALLEL — any one closes → ON.\n\n  V --+--[S1]--+-- bulb\n      +--[S2]--+\n\nLogic = physical wiring of decisions!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'AND/OR truth table mix-up: AND = all-1, OR = any-1.',
          'NOT gate 2 inputs expect panradhu — single input inverter!',
          'Boolean + = addition nu nenaikiradhu (in OR context it means logical OR).',
        ],
      },
    ],
    task: {
      title: 'Mini task: Gate sketcher',
      steps: [
        'AND, OR, NOT truth tables memory la draw pannunga (no peeking!).',
        '3-input OR truth table (8 rows) ezhudhunga.',
      ],
    },
    quiz: [
      {
        q: 'AND gate output 1 when?',
        options: [
          'Any input 1',
          'Both inputs 1',
          'Both inputs 0',
          'Inputs different',
        ],
        answer: 1,
        explain: 'AND = all inputs must be 1.',
      },
      {
        q: 'OR gate: 1, 0 inputs → output?',
        options: ['0', '1', 'Undefined', 'Depends'],
        answer: 1,
        explain: 'OR: any 1 → 1.',
      },
      {
        q: 'NOT gate: input 0 → output?',
        options: ['0', '1', '2', 'Undefined'],
        answer: 1,
        explain: 'NOT flips: 0 → 1.',
      },
    ],
  },

  // ---------------------------------------------------------- w4l4
  {
    id: 'w4l4',
    worldId: 'w4',
    title: 'NAND, NOR, XOR, XNOR',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'The power gates',
        body: 'NAND/NOR = "universal gates" — intha rendu la irundhu ELLAA other gates build pannalam! XOR = adder heart. Chip manufacturing la NAND dhaan king!',
      },
      {
        kind: 'explain',
        heading: 'Four gates',
        body: 'NAND = AND + NOT (bubble on output). Both 1 → 0. Illa 1.\nNOR = OR + NOT. Both 0 → 1. Illa 0.\nXOR (Exclusive OR) = inputs DIFFERENT na 1. Same na 0.\nXNOR = XOR + NOT. Same na 1. Different na 0.\n\nXOR = "difference detector". XNOR = "equality detector".',
      },
      {
        kind: 'analogy',
        heading: 'Room occupancy analogy',
        body: 'XOR = "room la EXACTLY oru person irukka?" (both irundha 0, yaarum illa 0, one person 1). XNOR = "rendu peruum same situation-a?" (both or both illa = 1).',
      },
      {
        kind: 'visual',
        heading: 'Truth tables',
        code: ' A B |NAND|NOR|XOR|XNOR\n 0 0 |  1 | 1 | 0 |  1\n 0 1 |  1 | 0 | 1 |  0\n 1 0 |  1 | 0 | 1 |  0\n 1 1 |  0 | 0 | 0 |  1\n\n XOR = odd number of 1s!',
      },
      {
        kind: 'technical',
        heading: 'Universal gate magic',
        list: [
          'NOT from NAND: both inputs tied → A NAND A = NOT A.',
          'AND from NAND: NAND → NOT → AND.',
          'OR from NAND: (A\')\' NAND (B\') = OR (De Morgan!).',
          'IC numbers: 7400 = quad NAND, 7402 = quad NOR, 7486 = quad XOR.',
          'Chips are cheaper/simpler with one gate type repeated — manufacturing win.',
        ],
      },
      {
        kind: 'example',
        heading: 'XOR in real life',
        body: 'Corridor light 2 switches: either switch flips light state = XOR behavior!\n\nBinary addition SUM bit = A XOR B:\n1+0=1, 0+1=1, 1+1=0 (carry!), 0+0=0.\nXOR = "sum without carry". Half adder next lesson!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'XOR/OR mix: OR 1,1→1 but XOR 1,1→0!',
          'NAND "both 0 → 1" nu nenaikiradhu — NAND both-1 → 0, ILLA (incl both-0) → 1!',
          'Universal gates = NAND & NOR (XOR illa!).',
        ],
      },
    ],
    task: {
      title: 'Mini task: Gate decoder',
      steps: [
        'NAND truth table draw pannunga, AND uda compare pannunga.',
        'NAND use panni NOT gate build logic pannunga (A NAND A).',
      ],
    },
    quiz: [
      {
        q: 'XOR: 1, 1 → output?',
        options: ['1', '0', 'Both', 'Undefined'],
        answer: 1,
        explain: 'XOR: same inputs → 0.',
      },
      {
        q: 'NAND: 0, 0 → output?',
        options: ['0', '1', 'Undefined', 'Both'],
        answer: 1,
        explain: 'NAND = NOT AND: only 1,1 gives 0. So 0,0 → 1.',
      },
      {
        q: 'Universal gates?',
        options: ['AND, OR', 'NAND, NOR', 'XOR, XNOR', 'NOT only'],
        answer: 1,
        explain: 'NAND/NOR alone can build every other gate!',
      },
    ],
  },

  // ---------------------------------------------------------- w4l5
  {
    id: 'w4l5',
    worldId: 'w4',
    title: 'Truth Tables, Boolean Algebra & De Morgan',
    minutes: 11,
    sections: [
      {
        kind: 'intro',
        heading: 'Logic math',
        body: 'Circuit simplify panna Boolean algebra — same behavior, fewer gates = cheaper chip! De Morgan = the master key!',
      },
      {
        kind: 'explain',
        heading: 'Boolean laws',
        body: 'Identity: A·1 = A, A+0 = A\nNull: A·0 = 0, A+1 = 1\nIdempotent: A·A = A, A+A = A\nComplement: A·A\' = 0, A+A\' = 1\nCommutative/Associative: normal math maari (AND/OR swap ok).\nDistributive: A·(B+C) = A·B + A·C\n\nDe Morgan\'s THEOREM:\n(A·B)\' = A\' + B\'\n(A+B)\' = A\' · B\'\n"Bubble push through the gate, gate flips!"',
      },
      {
        kind: 'analogy',
        heading: 'Party rule analogy',
        body: '(A AND B)\' = "rendu perum vanthaanga" illa = "at least one varala" = A\' OR B\'. Negation flips AND↔OR — De Morgan dhaan idhu!',
      },
      {
        kind: 'visual',
        heading: 'De Morgan visual',
        code: ' (A·B)\'  ==  A\' + B\'\n\n ┌──┐        ┌──┐\n A·B─○ ==  A─○+\n └──┘        B─○ +\n\n NAND = OR of inverted inputs\n NOR  = AND of inverted inputs',
      },
      {
        kind: 'technical',
        heading: 'Simplification power',
        list: [
          'A + A·B = A (absorption) — prove: A(1+B) = A·1 = A.',
          'A + A\'·B = A + B — classic simplification!',
          'Simplify → fewer gates → less power, cost, delay.',
          'K-map (Karnaugh) = systematic simplification method (diploma topic!).',
          'Verification: truth tables of original & simplified must MATCH.',
        ],
      },
      {
        kind: 'example',
        heading: 'Full simplification',
        body: 'F = A·B + A·B\'\n   = A·(B + B\')   [distribute]\n   = A·1          [complement]\n   = A            ✓\n\nTwo ANDs + OR → just wire A! 4 gates → 0 gates.\n\nDe Morgan verify:\n(A+B)\' : A=1,B=0 → (1+0)\' = 0.\nA\'·B\' = 0·1 = 0 ✓ MATCH!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'De Morgan la bubble push pannum bodhu gate flip maranthu — AND↔OR swap mandatory!',
          'Distributive A+(B·C) = (A+B)·(A+C) nu maranthu — OR distribute differently!',
          'Verify illama simplify panradhu — truth table check MANDATORY!',
        ],
      },
    ],
    task: {
      title: 'Mini task: Logic lawyer',
      steps: [
        'A + A\'B = A + B prove pannunga (truth table 4 rows compare).',
        '(A·B)\' De Morgan apply panni NAND-or-NOR circuit maari ezhudhunga.',
      ],
    },
    quiz: [
      {
        q: "De Morgan: (A·B)' = ?",
        options: ["A'·B'", "A' + B'", 'A + B', 'A·B'],
        answer: 1,
        explain: 'Negate AND → OR of negations. Bubble push!',
      },
      {
        q: 'A + 1 = ?',
        options: ['A', '1', '0', "A'"],
        answer: 1,
        explain: 'Null law: OR with 1 always 1.',
      },
      {
        q: 'A + A\'B simplifies to?',
        options: ['A', 'B', 'A + B', 'A·B'],
        answer: 2,
        explain: 'Classic identity: A + A\'B = A + B.',
      },
    ],
  },

  // ---------------------------------------------------------- w4l6
  {
    id: 'w4l6',
    worldId: 'w4',
    title: 'Half Adder & Full Adder',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Math machine build',
        body: 'CPU la ella calculation um adder circuit base! Binary addition circuit build pannrom — XOR + AND = half adder. First REAL digital design!',
      },
      {
        kind: 'explain',
        heading: 'Half adder',
        body: 'Two bits A, B add pannom:\nSUM = A XOR B (difference!)\nCARRY = A AND B (both 1 na carry!)\n\nVerify: 1+1 = 10 → SUM=0, CARRY=1 ✓ (XOR:0, AND:1!)\n1+0 = 01 → SUM=1, CARRY=0 ✓\n\nLimitation: previous carry ignore pannudhu — full bits addition needs MORE.',
      },
      {
        kind: 'analogy',
        heading: 'Column addition analogy',
        body: 'Hand addition: 7+5 = 12 → "2 ezhudhu, 1 carry" — SUM digit + CARRY digit. Half adder = single column calculator!',
      },
      {
        kind: 'visual',
        heading: 'Circuit + truth table',
        code: ' A ──┬──XOR──→ SUM\n     └──AND──→ CARRY\n  B ──┴──(same inputs)\n\n A B | SUM CARRY\n 0 0 |  0    0\n 0 1 |  1    0\n 1 0 |  1    0\n 1 1 |  0    1',
      },
      {
        kind: 'technical',
        heading: 'Full adder',
        list: [
          'Inputs: A, B, Cin (carry in). Outputs: SUM, Cout.',
          'SUM = A ⊕ B ⊕ Cin (odd-ones detector!).',
          'Cout = AB + Cin(A ⊕ B) — majority-ish logic.',
          'Full adder = 2 half adders + OR gate.',
          '4-bit adder = 4 full adders chained (ripple carry).',
          'CPU ALU ulla 32/64-bit adders — this pattern scaled up!',
        ],
      },
      {
        kind: 'example',
        heading: 'Full adder trace',
        body: 'A=1, B=1, Cin=1:\nSUM = 1⊕1⊕1 = 1 (odd ones!)\nCout = (1·1) + 1·(1⊕1) = 1 + 0 = 1\nResult: 11₂ = 3 ✓ (1+1+1 = 3!)\n\n4-bit: 1011 + 0110:\n= 11 + 6 = 17 = 10001 (5 bits — final carry out!)',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Half adder la Cin input expect panradhu — ILLA! Full adder dhaan.',
          'SUM = XOR, CARRY = AND swap panradhu.',
          'Ripple carry delay miss — big adders slow (carry travels!).',
        ],
      },
    ],
    task: {
      title: 'Mini task: Adder architect',
      steps: [
        'Half adder truth table draw pannunga (XOR/AND verify uda).',
        'Full adder ulla 1+1+1 trace pannunga (SUM=1, Cout=1).',
      ],
    },
    quiz: [
      {
        q: 'Half adder SUM expression?',
        options: ['A AND B', 'A OR B', 'A XOR B', 'A NAND B'],
        answer: 2,
        explain: 'SUM = A⊕B (difference detector).',
      },
      {
        q: 'Half adder CARRY expression?',
        options: ['A XOR B', 'A AND B', 'A OR B', 'NOT A'],
        answer: 1,
        explain: 'CARRY = A·B (both 1 → carry).',
      },
      {
        q: 'Full adder inputs?',
        options: ['A, B', 'A, B, Cin', 'Cin only', 'A, SUM'],
        answer: 1,
        explain: 'Full adder handles incoming carry: A, B, Cin.',
      },
    ],
  },

  // ---------------------------------------------------------- w4l7
  {
    id: 'w4l7',
    worldId: 'w4',
    title: 'Multiplexers, Demux, Encoders, Decoders',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Data traffic controllers',
        body: 'Many signals, few wires — yepdi manage? MUX/DEMUX/Encoder/Decoder = data routing family. GPIO expanders, 7-segment displays, memory selection — ellaam idhu dhaan!',
      },
      {
        kind: 'explain',
        heading: 'The four roles',
        body: 'MUX (Multiplexer) = many inputs → 1 output. Select lines choose WHICH input passes. "Data selector".\nDEMUX = 1 input → many outputs (select chooses destination). "Data distributor".\nEncoder = 2^n inputs → n-bit code ("which line active?" → binary).\nDecoder = n-bit code → 2^n outputs (one active). "Address opener".\n\nMUX = reverse of DEMUX. Encoder = reverse of Decoder.',
      },
      {
        kind: 'analogy',
        heading: 'Train tracks analogy',
        body: 'MUX = tracks merging (switch decides which track continues). DEMUX = track splitting. Decoder = station announcement ("platform 3 ulla varunga!"). Encoder = passenger count reporter.',
      },
      {
        kind: 'visual',
        heading: '2:1 MUX',
        code: '  I0 ──┐\n       ├─[MUX]── S=0→I0\n  I1 ──┘   ↑     S=1→I1\n           S (select)\n\n S | OUT\n 0 | I0\n 1 | I1\n\n OUT = S\'·I0 + S·I1',
      },
      {
        kind: 'technical',
        heading: 'Uses everywhere',
        list: [
          '2:1 MUX: 1 select line, 2 inputs. 4:1 MUX: 2 select lines. n select → 2^n inputs.',
          '3:8 decoder (74HC138): 3-bit address → 8 chip-select lines (memory maps!).',
          '7-segment decoder (74HC47/CD4511): BCD → display segments!',
          'Priority encoder: many active na, highest priority wins (keyboard scanning).',
          'Embedded: ADC channel MUX ulla (analogRead selects channel!), bus sharing.',
        ],
      },
      {
        kind: 'example',
        heading: 'Decoder in action',
        body: '2:4 decoder: inputs A1 A0 → outputs D0-D3:\n00 → D0 active\n01 → D1 active\n10 → D2 active\n11 → D3 active\n\nReal use: MCU address 0x2000-0x2FFF → RAM chip select; 0x3000+ → sensor chip. Decoder routes the request! Memory-mapped I/O (World 7) base idhu dhaan.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'MUX/DEMUX direction confuse — MUX many→1, DEMUX 1→many.',
          'Encoder/decoder role swap — encoder inputs=lines, outputs=code.',
          'Select line count miss: 4 inputs needs 2 select lines (2^2=4).',
        ],
      },
    ],
    task: {
      title: 'Mini task: Router design',
      steps: [
        '4:1 MUX select lines yethana? Draw truth table.',
        '2:4 decoder ulla input 10 → yendha output active? (D2)',
      ],
    },
    quiz: [
      {
        q: 'MUX function?',
        options: [
          '1 input → many outputs',
          'Many inputs → 1 output (selected)',
          'Code to lines',
          'Memory store',
        ],
        answer: 1,
        explain: 'MUX = data selector: many → 1.',
      },
      {
        q: '4:1 MUX select lines needed?',
        options: ['1', '2', '3', '4'],
        answer: 1,
        explain: '2^2 = 4 → 2 select lines.',
      },
      {
        q: '3:8 decoder — yendha type?',
        options: [
          'n-bit code → 2^n outputs',
          '2^n inputs → n-bit code',
          'Analog switch',
          'Amplifier',
        ],
        answer: 0,
        explain: 'Decoder: binary address → one active line.',
      },
    ],
  },

  // ---------------------------------------------------------- w4l8
  {
    id: 'w4l8',
    worldId: 'w4',
    title: 'Flip-Flops, Counters & Registers',
    minutes: 11,
    sections: [
      {
        kind: 'intro',
        heading: 'Memory is born!',
        body: 'Gates = instant reaction (memory illa). Flip-flop = 1-BIT MEMORY! Registers, counters, CPU state — ellaam flip-flops dhaan. Sequential logic starts here!',
      },
      {
        kind: 'explain',
        heading: 'From gates to memory',
        body: 'Combinational (gates): output = f(current inputs only). Memory illa.\nSequential (flip-flops): output depends on inputs + STATE. Clock sync!\n\nSR latch: cross-coupled NOR gates → S=1 set, R=1 reset, S=R=1 forbidden.\nD flip-flop: clock edge la D → Q copy. "Delay" flip-flop.\n\nClock edge (rising ↑) la state change — synchronized dance!',
      },
      {
        kind: 'analogy',
        heading: 'Photo capture analogy',
        body: 'D flip-flop = camera: clock click la D input photo edukum, appuram D change aanaalum photo (Q) same! Clock = shutter button. Ella flip-flops same shutter → sync!',
      },
      {
        kind: 'visual',
        heading: 'D flip-flop timing',
        code: ' CLK: _/‾\\_/‾\\_/‾\\_\n  D:   X──1────0───\n  Q:   ?──1────0───  (copies at edges ↑)\n\n At each rising edge: Q <= D\n Between edges: Q HOLDS (memory!)',
      },
      {
        kind: 'technical',
        heading: 'Counters & registers',
        list: [
          'Register = n flip-flops sharing clock (8-bit register = 8 D-FFs).',
          'Shift register: bits move left/right each clock (serial↔parallel conversion! 74HC595!).',
          'Counter: T/JK flip-flops chained → counts clock pulses (0,1,2,3...).',
          'Ripple counter: Q of one → clock of next (simple but slow).\nSync counter: all share clock (fast).',
          'Embedded: timer peripherals = big counters! PWM, delays, baud rates.',
        ],
      },
      {
        kind: 'example',
        heading: 'Counter trace',
        body: '4-bit counter, start 0000:\n\nClock pulse → 0001 (1)\n→ 0010 (2)\n→ 0011 (3)\n...\n→ 1111 (15)\n→ 0000 (wrap!)\n\nYean wrap? 4 bits max = 15. Timer ulla same: UNO Timer0 = 8-bit → 256 steps overflow → interrupt! (World 7!)\n\nShift register: 1011 in, serial out ulla 1,1,0,1 one by one — UART basics (World 8)!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'SR latch forbidden state (S=R=1) miss — invalid output!',
          'Latch vs flip-flop: latch = level triggered, FF = edge triggered (clock).',
          'Counter overflow wrap miss — 8-bit counter 255+1 = 0!',
        ],
      },
    ],
    task: {
      title: 'Mini task: State builder',
      steps: [
        'D flip-flop timing diagram paper la draw pannunga (3 clock pulses).',
        '4-bit counter 5 pulses trace pannunga (0000 → 0101).',
      ],
    },
    quiz: [
      {
        q: 'Flip-flop = ?',
        options: ['1-bit memory', 'Gate type', 'Amplifier', 'Multiplexer'],
        answer: 0,
        explain: 'FF stores 1 bit — sequential memory element!',
      },
      {
        q: 'D flip-flop copies D→Q when?',
        options: [
          'Always',
          'At clock edge',
          'When D changes',
          'Never',
        ],
        answer: 1,
        explain: 'Edge-triggered: samples D at clock edge, holds otherwise.',
      },
      {
        q: '8-bit register = ?',
        options: ['8 gates', '8 flip-flops', '8 multiplexers', '1 flip-flop'],
        answer: 1,
        explain: 'One FF per bit, shared clock.',
      },
      {
        q: '4-bit counter max count?',
        options: ['4', '8', '15', '16'],
        answer: 2,
        explain: '2^4-1 = 15, then wraps to 0.',
      },
    ],
  },
];

export const world4Boss: QuizQuestion[] = [
  {
    q: 'BOSS: Which gate outputs 1 ONLY for different inputs?',
    options: ['XNOR', 'XOR', 'NAND', 'OR'],
    answer: 1,
    explain: 'XOR = difference detector (1,0 or 0,1 → 1).',
  },
  {
    q: 'BOSS: De Morgan: (A + B)\' = ?',
    options: ["A' + B'", "A'·B'", 'A + B', 'A·B'],
    answer: 1,
    explain: 'NOR = AND of inverted inputs.',
  },
  {
    q: 'BOSS: Full adder SUM = ?',
    options: ['A⊕B', 'A⊕B⊕Cin', 'AB+Cin', 'A+B+Cin'],
    answer: 1,
    explain: 'Three-way XOR (odd ones).',
  },
  {
    q: 'BOSS: 4:1 MUX la select lines?',
    options: ['1', '2', '3', '4'],
    answer: 1,
    explain: '2 select lines → 4 combinations → 4 inputs.',
  },
  {
    q: 'BOSS: Simplify: A·B + A·B\'',
    options: ['B', 'A', 'A·B', 'A+B'],
    answer: 1,
    explain: 'A(B+B\') = A·1 = A.',
  },
  {
    q: 'BOSS: Sequential circuit difference?',
    options: [
      'Faster',
      'Output depends on state (has memory)',
      'No clock',
      'Only analog',
    ],
    answer: 1,
    explain: 'Flip-flops hold state → output = f(inputs, state).',
  },
  {
    q: 'BOSS: D flip-flop la Q follows D at...',
    options: ['Random times', 'Clock edge', 'When power applied', 'Never'],
    answer: 1,
    explain: 'Edge-triggered sampling — sync foundation.',
  },
];

// ============================================================
// EMBEDQUEST — WORLD 2: NUMBER SYSTEMS
// 12 lessons. Tanglish tone same as lessons-w1.ts exemplar.
// ============================================================
import type { Lesson, QuizQuestion } from '../lib/types';

export const world2Lessons: Lesson[] = [
  // ---------------------------------------------------------- w2l1
  {
    id: 'w2l1',
    worldId: 'w2',
    title: 'Decimal Numbers (Base 10)',
    minutes: 7,
    sections: [
      {
        kind: 'intro',
        heading: 'Yean idha first-a paakuran?',
        body: 'Binary, hex ellam purinjukka, munnadi "number system" na enna nu solid-a puriyanum. Nee daily use panra decimal la irundhu start pannuvom — adhu dhaan base!',
      },
      {
        kind: 'explain',
        heading: 'Base 10 na enna?',
        body: 'Decimal system la 10 symbols irukku: 0,1,2,3,4,5,6,7,8,9. "Base 10" na idhu dhaan — 10 digits. Yean 10? Nammaloda kaila 10 viral! ancient humans viral count panninaanga.\n\nImportant concept: POSITION matters. "345" la 3, 4, 5 ellam numbers dhaan, aana avanga place (POSITION) value determine pannudhu.',
      },
      {
        kind: 'analogy',
        heading: 'Place value = flat hierarchy',
        body: 'Apartment numbering maari: Building → Floor → Flat. 345 la: 5 = ground floor units, 4 = tens floor, 3 = hundreds floor. Ovvoru position ku "weight" irukku — right la irundhu left poga weight ×10 aagum.',
      },
      {
        kind: 'visual',
        heading: 'Place value breakdown',
        code: '  3  4  5\n  |  |  |\n  |  |  +-- ones    (x1)\n  |  +----- tens    (x10)\n  +-------- hundreds(x100)\n\n345 = 3x100 + 4x10 + 5x1\n    = 300 + 40 + 5',
      },
      {
        kind: 'technical',
        heading: 'Technical terms',
        list: [
          'Base (radix): number of unique digits in a system. Decimal base = 10.',
          'Positional notation: digit value depends on its position.',
          'Most Significant Digit (MSD): leftmost (biggest weight). Least Significant Digit (LSD): rightmost.',
          'Decimal point: fractional part separator (3.14 → 3 + 1/10 + 4/100).',
        ],
      },
      {
        kind: 'example',
        heading: 'Worked example',
        body: '2097 = 2×1000 + 0×100 + 9×10 + 7×1\n     = 2000 + 0 + 90 + 7 = 2097 ✓\n\nGeneral formula: digit × (base ^ position), position right la 0 la start aagum. Intha formula DHAAN ella number systems ukum common — base mattum change!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Digits order maathi value maathuraanga — position fix pannanum (305 ≠ 350).',
          'Base concept illama ellame decimal la dhaan irukku nu nenaikiradhu — base is just the digit count.',
          'Leading zeros matter nu nenaikiradhu (007 = 7 value same, aana bit systems la position matters!).',
        ],
      },
    ],
    task: {
      title: 'Mini task: Decompose it',
      steps: [
        '6409 va place value breakdown pannunga (6×? + 4×? + 0×? + 9×?).',
        'Yean humans base 10 use pannraanga nu oru line la reason.',
      ],
    },
    quiz: [
      {
        q: 'Decimal system base?',
        options: ['2', '8', '10', '16'],
        answer: 2,
        explain: '10 digits (0-9) → base 10. Viral count story!',
      },
      {
        q: '"345" la digit 4 oda place value?',
        options: ['4', '40', '400', '4000'],
        answer: 1,
        explain: '4 is in the tens position → 4 × 10 = 40.',
      },
      {
        q: 'Number system la "base" na?',
        options: [
          'Biggest number',
          'Unique digits count in that system',
          'Multiplication result',
          'Zero position',
        ],
        answer: 1,
        explain: 'Base = radix = how many unique symbols the system uses.',
      },
    ],
  },

  // ---------------------------------------------------------- w2l2
  {
    id: 'w2l2',
    worldId: 'w2',
    title: 'Binary Numbers (Base 2)',
    minutes: 9,
    sections: [
      {
        kind: 'intro',
        heading: 'Machine oda language',
        body: 'Computer ulla ellame binary! CPU, memory, sensors data — ellame 0 and 1. Idhu puriyama C programming onnum puriyadhu. So intha lesson = most important lesson so far!',
      },
      {
        kind: 'explain',
        heading: 'Switches → 0/1',
        body: 'Computer ulla ellame tiny electrical switches: ON (current flow) and OFF (no current). ON = 1, OFF = 0. Adhaan binary la rendu digits dhaan: 0 and 1. Base 2.\n\nPositional value: right la irundhu left poga weight ×2 aagum: 1, 2, 4, 8, 16, 32, 64, 128...\n\n1011 = (1×8) + (0×4) + (1×2) + (1×1) = 11 (decimal).',
      },
      {
        kind: 'analogy',
        heading: 'Light switches analogy',
        body: 'Room la 4 switches irukku nu nenaikunga. Ovvoru switch ON/OFF. 4 switches = 16 different combinations (2^4). Computer memory bit = oru switch. 8 bits = 1 byte = 256 combinations!',
      },
      {
        kind: 'visual',
        heading: 'Bit place values',
        code: '  1  0  1  1\n  |  |  |  |\n  |  |  |  +-- 1 (2^0)\n  |  |  +----- 2 (2^1)\n  |  +-------- 4 (2^2)\n  +----------- 8 (2^3)\n\n1011₂ = 8+0+2+1 = 11₁₀',
      },
      {
        kind: 'technical',
        heading: 'Technical terms',
        list: [
          'Bit: single binary digit (0 or 1). Smallest data unit.',
          'Byte: 8 bits. Standard character storage unit.',
          'LSB (Least Significant Bit): rightmost bit. MSB: leftmost bit.',
          '2^n combinations: n bits → 2^n different values (3 bits = 8 values: 000 to 111).',
        ],
      },
      {
        kind: 'example',
        heading: 'Count in binary',
        body: '3 bits la count pannunga (decimal 0 to 7):\n\n000 = 0\n001 = 1\n010 = 2\n011 = 3\n100 = 4\n101 = 5\n110 = 6\n111 = 7\n\nPattern: right side bit toggle fast-a aagum, left side slow-a. Analog clock second/minute needle maari!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Binary la 2 use panna mudiyadhu (only 0,1) — "102" invalid binary!',
          'Position weights maarakkudadhu — memorize: 128 64 32 16 8 4 2 1.',
          'Bit and byte confuse panradhu — 8 bits = 1 byte.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Switch counter',
      steps: [
        '4 switches (or fingers) use panni 0-15 varaikkam binary count pannunga.',
        '1101 binary value decimal la convert pannunga (place values use panni).',
      ],
    },
    quiz: [
      {
        q: 'Binary la yethana digits?',
        options: ['1', '2 (0,1)', '8', '10'],
        answer: 1,
        explain: 'Binary = base 2 → only 0 and 1 (switch OFF/ON).',
      },
      {
        q: '1011 (binary) = ? (decimal)',
        options: ['9', '11', '13', '15'],
        answer: 1,
        explain: '8+0+2+1 = 11.',
      },
      {
        q: '4 bits la yethana combinations?',
        options: ['4', '8', '16', '32'],
        answer: 2,
        explain: '2^4 = 16 combinations (0000 to 1111).',
      },
      {
        q: '1 byte = ?',
        options: ['4 bits', '8 bits', '16 bits', '1024 bits'],
        answer: 1,
        explain: '8 bits = 1 byte. Remember this!',
      },
    ],
  },

  // ---------------------------------------------------------- w2l3
  {
    id: 'w2l3',
    worldId: 'w2',
    title: 'Hexadecimal (Base 16)',
    minutes: 9,
    sections: [
      {
        kind: 'intro',
        heading: 'Programmer oda shorthand',
        body: 'Embedded la memory addresses, register values, color codes — ellame hex la dhaan varum! "0x2F" maari values paakum bodhu shock aagave koodadhu. Intha lesson la adha easy-a purinjukalam.',
      },
      {
        kind: 'explain',
        heading: '0-9 + A-F',
        body: 'Hex base 16 → 16 symbols venum. 0-9 (10 digits) pothuma? Illa. Adhanaala A-F letters add pannirukanga: A=10, B=11, C=12, D=13, E=14, F=15.\n\nPrefix "0x" nu signal: idhu hex number. Example: 0x1F = 1×16 + 15 = 31 (decimal).\n\nHex la position weights: 1, 16, 256, 4096... (×16 per step).',
      },
      {
        kind: 'analogy',
        heading: 'Compact packing analogy',
        body: 'Binary la 8 bits ezhudha "10101111" — 8 characters. Hex la same value: "AF" — 2 characters dhaan! Hex = binary oda suitcase packing (4 bits → 1 hex digit). Long binary strings readable aagum.',
      },
      {
        kind: 'visual',
        heading: 'Binary ↔ Hex bridge',
        code: ' 1010 1111\n  |    |\n  A    F     (1010=A, 1111=F)\n\n0xAF = 10101111₂ = 175₁₀\n\n4 bits -> 1 hex digit (always!)',
      },
      {
        kind: 'technical',
        heading: 'Where hex appears in embedded',
        list: [
          'Memory addresses: 0x2000, 0xFFFE (register maps!).',
          'Register values: PORTB = 0x20 maari.',
          'Color codes: #FF6600 (web), OLED displays.',
          'File formats: .hex firmware files — Arduino upload idhu dhaan!',
          'MAC addresses: 00:1A:2B:3C:4D:5E.',
        ],
      },
      {
        kind: 'example',
        heading: 'Hex → decimal examples',
        body: '0x2F = 2×16 + 15×1 = 32 + 15 = 47\n0xFF = 15×16 + 15 = 255 (max 8-bit!)\n0x100 = 1×256 = 256\n0x10 = 16\n\nReverse: 47 → 47÷16 = 2 remainder 15 → 0x2F. Practice aagum bodhu automatic aagum!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'A-F digits nu maranthu 10-15 va convert pannadhu (A = 10, not "letter A").',
          '0x prefix miss pannradhu — 0x10 = 16, but 10 = 10. Big difference!',
          'Hex position weight ×10 nu nenaikiradhu — ×16 dhaan!',
        ],
      },
    ],
    task: {
      title: 'Mini task: Hex decoder',
      steps: [
        '0x1A, 0x3C, 0xB2 values decimal la convert pannunga.',
        'Un favorite color HEX code (#RRGGBB) paaru — first two hex digits red intensity!',
      ],
    },
    quiz: [
      {
        q: 'Hex la "C" value?',
        options: ['3', '12', '13', '110'],
        answer: 1,
        explain: 'A=10, B=11, C=12, D=13, E=14, F=15.',
      },
      {
        q: '0xFF = ? decimal',
        options: ['15', '128', '255', '256'],
        answer: 2,
        explain: '15×16 + 15 = 255. Max value of 8 bits!',
      },
      {
        q: 'Oru hex digit = yethana bits?',
        options: ['2', '3', '4', '8'],
        answer: 2,
        explain: '4 bits = 1 hex digit. 16 combinations = 0-F.',
      },
      {
        q: '0x10 = ? decimal',
        options: ['10', '16', '100', '110'],
        answer: 1,
        explain: '1×16 + 0 = 16. Hex weights: 1, 16, 256...',
      },
    ],
  },

  // ---------------------------------------------------------- w2l4
  {
    id: 'w2l4',
    worldId: 'w2',
    title: 'Octal Numbers (Base 8)',
    minutes: 7,
    sections: [
      {
        kind: 'intro',
        heading: 'Innum oru base',
        body: 'Octal ippo kammi use aagudhu, aana diploma syllabus la irukkum + Linux file permissions (chmod 755) la direct-a use aagum. Quick-a kathukalam!',
      },
      {
        kind: 'explain',
        heading: 'Base 8',
        body: 'Octal la 8 digits: 0,1,2,3,4,5,6,7. Base 8. Position weights: 1, 8, 64, 512... (×8 per step).\n\n17 (octal) = 1×8 + 7×1 = 15 (decimal).\n\nHistorical reason: old computers 12-bit, 24-bit, 36-bit words use panninaanga — 3 bits = 1 octal digit, so binary-a group panna easy. Modern systems 8-bit words (bytes) use pannum — 4-bit groups (hex) fit better.',
      },
      {
        kind: 'analogy',
        heading: 'Missing digits analogy',
        body: 'Octal la "8" and "9" digits kidayadhu — avanga veetla 8 per irundha, adhuku appuram "10" nu solluvaanga (one group of 8 + 0 extra). Base change = counting rules change!',
      },
      {
        kind: 'visual',
        heading: 'Octal ↔ binary (3-bit groups)',
        code: ' 011 101\n  |   |\n  3   7     → 037 (octal)\n\n3 bits -> 1 octal digit\n(hex ku 4 bits, octal ku 3 bits)',
      },
      {
        kind: 'technical',
        heading: 'Where octal appears',
        list: [
          'Linux/Unix file permissions: chmod 755 → rwxr-xr-x (7=rwx, 5=r-x).',
          'Some programming languages: leading 0 = octal literal (C la 010 = 8!). Careful!',
          'Old embedded systems and aviation equipment.',
          'C escape sequences: \\101 = character A (65 decimal).',
        ],
      },
      {
        kind: 'example',
        heading: 'Conversions',
        body: '0o765 (octal) = 7×64 + 6×8 + 5 = 448 + 48 + 5 = 501 decimal\n\nDecimal 501 → octal: 501÷8=62 r5, 62÷8=7 r6, 7÷8=0 r7 → read bottom-up: 765 ✓\n\nBinary 011101 → group 3 bits: 011=3, 101=5 → 35 octal.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Octal la 8 or 9 use panradhu — invalid! Only 0-7.',
          'C la 010 decimal 10 nu nenaikiradhu — leading 0 means octal = 8.',
          'Octal group 4 bits nu nenaikiradhu — 3 bits dhaan (hex ku mattum 4).',
        ],
      },
    ],
    task: {
      title: 'Mini task: Permission decoder',
      steps: [
        'chmod 644 → enna permissions nu decode pannunga (6=rw-, 4=r--).',
        'Binary 110101 → octal la convert pannunga (3-bit groups).',
      ],
    },
    quiz: [
      {
        q: 'Octal digits set?',
        options: ['0-9', '0-7', '0-8', '1-8'],
        answer: 1,
        explain: 'Base 8 → digits 0 to 7 only.',
      },
      {
        q: '17 (octal) = ? decimal',
        options: ['15', '17', '23', '71'],
        answer: 0,
        explain: '1×8 + 7 = 15.',
      },
      {
        q: 'Oru octal digit = yethana bits?',
        options: ['2', '3', '4', '8'],
        answer: 1,
        explain: '3 bits = 1 octal digit (2^3 = 8 combinations).',
      },
    ],
  },

  // ---------------------------------------------------------- w2l5
  {
    id: 'w2l5',
    worldId: 'w2',
    title: 'Decimal → Binary Conversion',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Daily-use skill',
        body: 'Embedded la sensor value 145 → microcontroller binary la dhaan store pannum. Decimal→binary conversion interview la um kettuvaanga. Intha lesson mudicha, idhu automatic aagum!',
      },
      {
        kind: 'explain',
        heading: 'Repeated division method',
        body: 'Method: number-a 2 la divide pannunga, remainder note pannunga. Quotient-a thirumba 2 la divide... quotient 0 aagum varaikkam. Remainders-a BOTTOM to TOP read pannunga.\n\nYean idhu work aagudhu? Odd number = LSB 1, even = LSB 0. Divide by 2 = shift right one bit. Adhaan remainders dhaan bits!',
      },
      {
        kind: 'analogy',
        heading: 'Coin counting analogy',
        body: '₹45 un kitta irukku, ₹16, ₹8, ₹4, ₹2, ₹1 coins mattum. Biggest coin irundhu fit pannunga: 45 = 32? no wait — 2-power coins use pannunga: 32+8+4+1 = 45. Use aana coin positions = 1, illa = 0 → 101101!',
      },
      {
        kind: 'visual',
        heading: 'Division ladder for 45',
        code: '45 ÷ 2 = 22 r 1  ← LSB\n22 ÷ 2 = 11 r 0\n11 ÷ 2 =  5 r 1\n 5 ÷ 2 =  2 r 1\n 2 ÷ 2 =  1 r 0\n 1 ÷ 2 =  0 r 1  ← MSB\n\nRead UP: 101101 ✓\nCheck: 32+8+4+1 = 45 ✓',
      },
      {
        kind: 'technical',
        heading: 'Technical notes',
        list: [
          'Alternative method: subtract biggest 2-power (place value method) — same answer.',
          'Powers of 2 memorize: 1,2,4,8,16,32,64,128,256,512,1024.',
          'Fixed width: 8-bit la 45 = 00101101 (leading zeros pad). Microcontroller la width always fixed!',
          'Fractional decimals: ×2 method (0.625 → 0.101) — rare in embedded basics.',
        ],
      },
      {
        kind: 'example',
        heading: 'More examples',
        body: '13: 13÷2=6r1, 6÷2=3r0, 3÷2=1r1, 1÷2=0r1 → 1101 ✓\n\n200: 200÷2=100r0, 100÷2=50r0, 50÷2=25r0, 25÷2=12r1, 12÷2=6r0, 6÷2=3r0, 3÷2=1r1, 1÷2=0r1 → 11001000 ✓\n(128+64+8 = 200 ✓)',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Remainders top-to-bottom read panradhu — BOTTOM to TOP dhaan!',
          'Division stop pannadhu irukradhu — quotient 0 varaikkam continue pannanum.',
          'Width ignore panradhu — MCU la 8-bit register la 45 = 00101101, not 101101.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Convert 5 numbers',
      steps: [
        'Division method use panni convert pannunga: 37, 88, 150, 7, 255.',
        'Answers verify pannunga (binary la place values add panni decimal thirumba check).',
      ],
    },
    quiz: [
      {
        q: '45 decimal binary la?',
        options: ['101101', '110011', '101011', '110101'],
        answer: 0,
        explain: '32+8+4+1 = 45 → 101101.',
      },
      {
        q: 'Division method la remainders read order?',
        options: ['Top to bottom', 'Bottom to top', 'Random', 'Left to right'],
        answer: 1,
        explain: 'Last remainder = MSB. So read UP (bottom to top).',
      },
      {
        q: '8-bit la 7 = ?',
        options: ['111', '00000111', '00001110', '11100000'],
        answer: 1,
        explain: '8-bit width la leading zeros pad: 00000111.',
      },
    ],
  },

  // ---------------------------------------------------------- w2l6
  {
    id: 'w2l6',
    worldId: 'w2',
    title: 'Binary → Decimal Conversion',
    minutes: 8,
    sections: [
      {
        kind: 'intro',
        heading: 'Reverse gear',
        body: 'Sensor reading 0b10010101 vantha, adhu enna value nu innum kekanum. Binary→decimal = place values add pannradhu. Easy dhaan, aana speed venum!',
      },
      {
        kind: 'explain',
        heading: 'Place value method',
        body: 'Ovvoru bit ku weight kudukunga (right la 1, left poga ×2): 128 64 32 16 8 4 2 1. Bit = 1 na weight add pannunga, 0 na skip.\n\nExample: 10010101 = 128 + 16 + 4 + 1 = 149.',
      },
      {
        kind: 'analogy',
        heading: 'Buffet menu analogy',
        body: 'Menu la items price fixed: ₹128, ₹64, ₹32, ₹16, ₹8, ₹4, ₹2, ₹1. Binary "1" = "order pannirukken", "0" = skip. Total bill = decimal value!',
      },
      {
        kind: 'visual',
        heading: 'Weight table',
        code: ' 128  64  32  16   8   4   2   1\n   1   0   0   1   0   1   0   1\n\nsum = 128+16+4+1 = 149\n\nTip: weights half-half pattern\n8-bit max = 255, 16-bit = 65535',
      },
      {
        kind: 'technical',
        heading: 'Speed tricks',
        list: [
          'All 1s: 11111111 = 255. 1111 = 15. (2^n - 1 pattern for n bits)',
          'Single 1: 10000000 = 128, 00010000 = 16 (power of 2 directly).',
          'MSB region: 1xxxxxxx = 128+ (big). 0xxxxxxx = small (<128).',
          'Embedded la ADC value 1023 (10-bit max) = 1111111111.',
        ],
      },
      {
        kind: 'example',
        heading: 'Practice examples',
        body: '0110 = 4+2 = 6\n1111 = 8+4+2+1 = 15\n10000000 = 128\n10101010 = 128+32+8+2 = 170\n11001100 = 128+64+8+4 = 204',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Weights reverse pannradhu — 1 is LSB (rightmost), 128 is MSB (leftmost) for 8 bits.',
          '0 bits um add panradhu — only 1 bits add pannunga!',
          '8-bit la values > 255 expect panradhu — impossible (overflow!).',
        ],
      },
    ],
    task: {
      title: 'Mini task: Decode 5 values',
      steps: [
        'Convert: 1101, 11110000, 10000001, 01100110, 11111111.',
        'Timer vachi speed test: 3 single-bit values (10000000, 00001000, 00100000) 5 seconds la decode.',
      ],
    },
    quiz: [
      {
        q: '1101 (binary) = ?',
        options: ['11', '13', '14', '15'],
        answer: 1,
        explain: '8+4+0+1 = 13.',
      },
      {
        q: '11111111 = ?',
        options: ['128', '254', '255', '256'],
        answer: 2,
        explain: 'All bits set = 2^8 - 1 = 255.',
      },
      {
        q: '10000001 = ?',
        options: ['127', '128', '129', '255'],
        answer: 2,
        explain: '128 + 1 = 129.',
      },
    ],
  },

  // ---------------------------------------------------------- w2l7
  {
    id: 'w2l7',
    worldId: 'w2',
    title: 'Binary ↔ Hexadecimal Conversion',
    minutes: 9,
    sections: [
      {
        kind: 'intro',
        heading: 'The embedded superpower',
        body: 'Debug output la "PORTB = 0b00010100" nu paatha romba kashtam. Hex la "0x14" — instant readable! Binary↔hex conversion = embedded engineer oda daily superpower.',
      },
      {
        kind: 'explain',
        heading: '4-bit grouping rule',
        body: '4 bits = exactly 1 hex digit (2^4 = 16 = hex base). So binary-a RIGHT la irundhu 4-4 bits group pannunga, ovvonru group-a hex digit-a convert pannunga.\n\n00010100 → 0001 | 0100 → 1 | 4 → 0x14 ✓\n\nReverse: hex digit-a 4-bit binary expand pannunga. F → 1111, 3 → 0011.',
      },
      {
        kind: 'analogy',
        heading: 'Compression analogy',
        body: '4-4 bits-a suitcase la ottikitu hex label podradhu maari. 32-bit register = 8 hex digits dhaan. Readable + compact + no information loss.',
      },
      {
        kind: 'visual',
        heading: 'Nibble map (memorize!)',
        code: '0000=0  0001=1  0010=2  0011=3\n0100=4  0101=5  0110=6  0111=7\n1000=8  1001=9  1010=A  1011=B\n1100=C  1101=D  1110=E  1111=F\n\n8-bit byte = 2 hex digits',
      },
      {
        kind: 'technical',
        heading: 'Technical notes',
        list: [
          'Nibble = 4 bits = half byte = 1 hex digit.',
          'Byte 0b10110010 → groups 1011|0010 → 0xB2. Always 2 hex chars per byte.',
          '32-bit value: 0xDEADBEEF = 1101 1110 1010 1101 1011 1110 1110 1111.',
          'Bit masks embedded la hex la dhaan ezhuduvaanga: mask = 0x0F (low nibble).',
        ],
      },
      {
        kind: 'example',
        heading: 'Both directions',
        body: 'Binary → Hex:\n11011011 → 1101|1011 → D|B → 0xDB\n101 → 0101 → 0x5 (pad left!)\n\nHex → Binary:\n0x3C → 3|C → 0011 1100\n0xA5 → 1010 0101\n0x0F → 0000 1111 (low nibble mask!)',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Grouping LEFT side la start panradhu — RIGHT la irundhu group pannanum (pad left with 0s).',
          'Nibble map thappu: 1010 = A (not 10 as digit!) — A means decimal ten.',
          'Hex digit = 3 bits nu nenaikiradhu — 4 bits (octal ku 3).',
        ],
      },
    ],
    task: {
      title: 'Mini task: Nibble master',
      steps: [
        'Nibble map-a 4 times ezhudhu practice pannunga (muscle memory!).',
        'Convert: 11110000 → hex, 0x9E → binary, 10101111 → hex.',
      ],
    },
    quiz: [
      {
        q: '11011011 binary = ? hex',
        options: ['0xD8', '0xDB', '0xBD', '0xCB'],
        answer: 1,
        explain: '1101=D, 1011=B → 0xDB.',
      },
      {
        q: '0x3C binary la?',
        options: ['00111100', '00110100', '11001100', '00001111'],
        answer: 0,
        explain: '3=0011, C=1100 → 00111100.',
      },
      {
        q: 'Nibble na?',
        options: ['2 bits', '4 bits', '8 bits', '16 bits'],
        answer: 1,
        explain: '4 bits = nibble = 1 hex digit.',
      },
      {
        q: '101 (3 bits) hex la eppdi write?',
        options: ['0x101', '0x5', '0xA', '0x15'],
        answer: 1,
        explain: 'Pad left: 0101 → 5 → 0x5.',
      },
    ],
  },

  // ---------------------------------------------------------- w2l8
  {
    id: 'w2l8',
    worldId: 'w2',
    title: 'Binary Addition & Subtraction',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'CPU ku idhu dhaan homework',
        body: 'CPU adder circuit vachi dhaan ella math pannum. Binary addition rules theriyanum na, processor epdi work aagudhu nu puriyum. 2 rules dhaan!',
      },
      {
        kind: 'explain',
        heading: 'Addition rules',
        body: 'Rules:\n0+0 = 0\n0+1 = 1\n1+1 = 10 (0, carry 1)\n1+1+1 = 11 (1, carry 1)\n\nCarry = next column ku poosittu povudhu — decimal addition maari dhaan, aana 2 base la carry 2 aana (2 = binary 10).',
      },
      {
        kind: 'analogy',
        heading: 'Overfull bucket analogy',
        body: 'Ovvoru column oru bucket with capacity 1. 2 water pour pannaa bucket overflow — 1 stays, 1 next bucket ku overflow. Adhu dhaan carry!',
      },
      {
        kind: 'visual',
        heading: 'Addition with carries',
        code: '  carries: 1 1 1\n            \n     1 0 1 1   (11)\n   + 0 1 1 0   ( 6)\n   ---------\n   1 0 0 0 1   (17) ✓\n\nCheck: 11+6 = 17 ✓',
      },
      {
        kind: 'technical',
        heading: 'Subtraction rules (borrow)',
        body: 'Rules:\n0-0 = 0\n1-0 = 1\n1-1 = 0\n0-1 = 1, borrow 1 from left\n\nBorrow na: left column la 1 reduce, current column ku +2 (2 in binary = 10). Decimal borrow maari dhaan, aana base 2.',
      },
      {
        kind: 'example',
        heading: 'Subtraction example',
        body: '1010 - 0110 (10 - 6):\n\n  1 0 1 0\n- 0 1 1 0\n---------\nColumn by column (right to left):\n0-0=0, 1-1=0, 0-1 → borrow: 10-1=1, MSB 0 (after borrow) -0 = 0\nResult: 0100 = 4 ✓ (10-6=4)\n\nHardware la subtraction = addition with two\'s complement (next lesson!).',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Carry write pannama maranthu pogaanga — carry line draw pannunga!',
          'Borrow = -1 nu nenaikiradhu — borrow +2 kudukkum (base 2 la).',
          'Result width ignore: 4-bit la 11+6=17 overflow (17 > 15) — carry bit 5th bit!',
        ],
      },
    ],
    task: {
      title: 'Mini task: Human adder',
      steps: [
        'Convert pannunga: 1001 + 0111 (paper la carry lines uda).',
        'Verify: decimal la convert panni answer check pannunga. (9+7=16=10000)',
        'Try subtraction: 1100 - 0110 (12-6=6).',
      ],
    },
    quiz: [
      {
        q: '1011 + 0110 = ?',
        options: ['10001', '10010', '11111', '11011'],
        answer: 0,
        explain: '11+6 = 17 = 10001.',
      },
      {
        q: 'Binary la 1+1 = ?',
        options: ['2', '10', '01', '11'],
        answer: 1,
        explain: '1+1 = 2 = binary 10 → write 0, carry 1.',
      },
      {
        q: '1010 - 0101 = ?',
        options: ['0011', '0101', '0111', '1001'],
        answer: 1,
        explain: '10-5 = 5 = 0101.',
      },
    ],
  },

  // ---------------------------------------------------------- w2l9
  {
    id: 'w2l9',
    worldId: 'w2',
    title: 'Bits, Bytes, KB, MB, GB',
    minutes: 8,
    sections: [
      {
        kind: 'intro',
        heading: 'Size sense',
        body: '"8 GB RAM", "32 KB flash", "512 MB file" — ella ad scale puriyanum. Especially embedded la memory SOLLAVE romba small! Arduino UNO = 2 KB RAM nu solren, adhu evalo chinna nu feel pannanum.',
      },
      {
        kind: 'explain',
        heading: 'The ladder',
        body: '1 bit = 0 or 1\n1 nibble = 4 bits\n1 byte (B) = 8 bits\n1 Kilobyte (KB) = 1024 bytes (2^10)\n1 Megabyte (MB) = 1024 KB\n1 Gigabyte (GB) = 1024 MB\n1 Terabyte (TB) = 1024 GB\n\nYean 1024, not 1000? Computers binary — 2^10 = 1024 is a clean binary number. (Note: disk manufacturers 1000 use pannuvaanga marketing la — "1 TB disk" = ~931 GiB real!)',
      },
      {
        kind: 'analogy',
        heading: 'Village→city analogy',
        body: 'Bit = oru man (single). Byte = oru family (8). KB = oru street (1024 families). MB = oru town. GB = city. TB = metro city! Embedded chip = small house (KB), cloud server = full city (TB).',
      },
      {
        kind: 'visual',
        heading: 'Real device memory map',
        code: ' Arduino UNO:  2 KB SRAM, 32 KB flash\n ESP32:      ~520 KB SRAM, 4 MB flash\n Phone:        8 GB RAM, 128 GB storage\n Laptop:      16 GB RAM, 512 GB SSD\n\n UNO la 1 int (2 bytes) = 0.1% of RAM!',
      },
      {
        kind: 'technical',
        heading: 'Technical units',
        list: [
          'KiB/MiB/GiB (binary): 1024-based, correct convention. KB/MB (SI): 1000-based marketing.',
          'Word: CPU natural data size (8-bit MCU = 1 byte word, 32-bit MCU = 4 bytes).',
          'Embedded la int size varies: Arduino UNO int = 2 bytes, ESP32 int = 4 bytes!',
          'Data types memory: char 1B, int 2B (UNO)/4B (ESP32), float 4B, double 4B (AVR)/8B (ESP32).',
        ],
      },
      {
        kind: 'example',
        heading: 'Quick calculations',
        body: '1 byte = 256 values (0-255)\n2 bytes (16-bit) = 65536 values (0-65535)\n4 bytes (32-bit) = ~4.29 billion values\n\nText "HELLO" = 5 chars × 1 byte = 5 bytes\nA 3MP photo ≈ 1-2 MB\n4 KB flash = 4096 bytes = 4096 characters of code!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'KB = 1000 bytes nu nenaikiradhu (binary convention la 1024).',
          'Bit vs Byte: internet speed Mbps = megabits; file size MB = megabytes. 8× difference!',
          'Embedded memory phone memory scale la nenaikiradhu — KB world la dhaan naama irukkom!',
        ],
      },
    ],
    task: {
      title: 'Mini task: Memory detective',
      steps: [
        'Un phone RAM/storage size kandupidi, bytes la calculate pannunga (×1024 ladder).',
        'Arduino UNO 2 KB RAM la yethana int variables (2B) fit aagum nu calculate.',
      ],
    },
    quiz: [
      {
        q: '1 KB = ? bytes',
        options: ['1000', '1024', '512', '2048'],
        answer: 1,
        explain: '2^10 = 1024 bytes (binary convention).',
      },
      {
        q: '1 byte la yethana different values?',
        options: ['8', '128', '255', '256'],
        answer: 3,
        explain: '2^8 = 256 values (0-255).',
      },
      {
        q: 'Arduino UNO RAM size?',
        options: ['2 KB', '2 MB', '32 KB', '520 KB'],
        answer: 0,
        explain: '2 KB SRAM. Tiny! Efficient code venum.',
      },
    ],
  },

  // ---------------------------------------------------------- w2l10
  {
    id: 'w2l10',
    worldId: 'w2',
    title: 'Signed and Unsigned Numbers',
    minutes: 8,
    sections: [
      {
        kind: 'intro',
        heading: 'Negative numbers problem',
        body: 'Temperature -5°C, motor speed -100 (reverse)... negative numbers real la venum! Binary la minus sign (-) illa — 0 and 1 mattum. Eppdi represent panraanga? Intha lesson answer.',
      },
      {
        kind: 'explain',
        heading: 'Same bits, different meaning',
        body: 'Unsigned: ella 8 bits um magnitude → 0 to 255.\nSigned: MSB (leftmost bit) = sign bit. 0 = positive, 1 = negative.\n\n10000001:\n- Unsigned → 129\n- Signed → -127 (sign-bit interpretation)\n\nSame bits, different meaning! Adhaan C la data type important: unsigned char vs char (signed by default on many compilers).',
      },
      {
        kind: 'analogy',
        heading: 'Thermometer analogy',
        body: 'Thermometer la 0 ku mela reading = positive, keela = negative. Sign bit = "keela irukka, mela irukka" flag. Same glass, same mercury — interpretation mattum dhaan different!',
      },
      {
        kind: 'visual',
        heading: '8-bit ranges',
        code: ' UNSIGNED: 0 .......... 255\n           (all 256 values positive)\n\n SIGNED:  -128 ....... 0 ....... 127\n          |negative  |zero|positive|\n          MSB=1      MSB=0\n\n Same 8 bits, two interpretations!',
      },
      {
        kind: 'technical',
        heading: 'Technical terms',
        list: [
          'unsigned char (uint8_t): 0 to 255. char (int8_t): -128 to 127.',
          'Sign-magnitude: MSB sign + rest magnitude (old method, two zeros problem: 00000000 and 10000000 both "zero").',
          "One's complement: invert bits for negative (also two zeros).",
          "Two's complement: modern standard (next lesson!) — single zero, easy hardware.",
          'C la: unsigned int overflow wraps (255+1 = 0), signed overflow = undefined behavior!',
        ],
      },
      {
        kind: 'example',
        heading: 'Range calculations',
        body: '8-bit unsigned: 2^8 - 1 = 255 max\n8-bit signed: +127 max (01111111), -128 min (10000000)\n16-bit unsigned: 65535, signed: -32768 to 32767\n\nSensor reading 0-1023 (ADC): fits in unsigned 16-bit (or unsigned int).\nTemperature -40 to +125°C: needs signed type!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Signed la MSB weight = -128 nu maranthu +128 nu treat panradhu (two\'s complement la MSB weight = -128!).',
          'Unsigned variable la negative assign panradhu — huge value wrap aagum!',
          'Comparison bug: unsigned 0 - 1 = 4294967295 (wrap!), not -1.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Type selector',
      steps: [
        'Intha data ku type choose pannunga: ADC reading (0-1023), temperature (-40 to 85), person count (0+), motor direction speed (-255 to 255).',
        'Yean 8-bit unsigned la -1 store panna mudiyadhu nu oru line la ezhudhunga.',
      ],
    },
    quiz: [
      {
        q: '8-bit signed range?',
        options: ['0 to 255', '-127 to 127', '-128 to 127', '-255 to 255'],
        answer: 2,
        explain: 'Sign bit takes one combination: -128 to +127.',
      },
      {
        q: '10000001 as UNSIGNED = ?',
        options: ['1', '127', '129', '-127'],
        answer: 2,
        explain: 'Unsigned: no sign bit — 128+1 = 129.',
      },
      {
        q: 'Unsigned 8-bit la 255 + 1 = ?',
        options: ['256', '-1', '0 (wrap)', 'Error'],
        answer: 2,
        explain: 'Overflow wraps to 0. Classic embedded bug!',
      },
    ],
  },

  // ---------------------------------------------------------- w2l11
  {
    id: 'w2l11',
    worldId: 'w2',
    title: "Two's Complement",
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'The universal negative',
        body: ' Ella modern computers la negative numbers two\'s complement la dhaan! Subtraction hardware, signed math, MCU registers — ellam idhu base la. Interview guaranteed question!',
      },
      {
        kind: 'explain',
        heading: 'Negate = invert + 1',
        body: "Two's complement la -N kandupidikka: N bits-a invert (flip) pannunga, +1 add pannunga.\n\nExample: -5 (8-bit):\n5 = 00000101\ninvert → 11111010\n+1 → 11111011 = -5 ✓\n\nMSB weight = -128 (8-bit la). So 11111011 = -128+64+32+16+8+2+1 = -5 ✓ Elegant!",
      },
      {
        kind: 'analogy',
        heading: 'Odometer analogy',
        body: 'Car odometer 000 maari: reverse poga 999, 998... aagum. Binary 8-bit odometer: 0 la irundhu back = 255, 254, 253... = -1, -2, -3! 11111111 = -1 nu puriyum.',
      },
      {
        kind: 'visual',
        heading: 'Number circle (8-bit)',
        code: '        0 (00000000)\n   -1 ↗      ↘ +1\n(11111111)  (00000001)\n    ...        ...\n -128          +127\n(10000000)  (01111111)\n\nCircle! +127+1 → -128 (wrap)',
      },
      {
        kind: 'technical',
        heading: 'Why two\'s complement wins',
        list: [
          'Single zero representation (sign-magnitude has +0 and -0).',
          'Subtraction = addition: A - B = A + (-B) → same adder circuit! Hardware savings.',
          'MSB weight = -2^(n-1): positional value works naturally.',
          'Range: -2^(n-1) to 2^(n-1)-1. 8-bit: -128 to 127.',
          'Sign extension: 8-bit -1 (11111111) → 16-bit -1 (1111111111111111) — MSB copy pannunga.',
        ],
      },
      {
        kind: 'example',
        heading: 'Full walkthrough',
        body: 'Compute 7 - 5 using two\'s complement:\n7 = 00000111\n-5 = 11111011 (from invert+1 of 5)\nAdd: 00000111 + 11111011 = (1)00000010 → carry discard → 00000010 = 2 ✓\n\nSame adder, subtraction free. Adhaan hardware engineers love this!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Invert pannitu +1 maranthu pogaanga — both steps needed!',
          "MSB weight +128 nu nenaikiradhu — two's complement signed la -128.",
          'Carry discard nu maranthu answer la vachukiradhu — final carry bit ignore (same width la).',
        ],
      },
    ],
    task: {
      title: 'Mini task: Negate master',
      steps: [
        "Two's complement negate pannunga (8-bit): -3, -12, -100.",
        'Verify pannunga: 12 + (-12) = 0 bits la (add panni all zeros varanum).',
      ],
    },
    quiz: [
      {
        q: "Two's complement la -1 (8-bit)?",
        options: ['10000001', '11111110', '11111111', '01111111'],
        answer: 2,
        explain: '1=00000001 → invert 11111110 → +1 = 11111111.',
      },
      {
        q: "Negate steps?",
        options: [
          'Invert bits, add 1',
          'Invert bits, subtract 1',
          'Add 1 only',
          'Flip MSB only',
        ],
        answer: 0,
        explain: "Invert (one's complement) then +1 = two's complement.",
      },
      {
        q: '11111011 (8-bit signed) = ?',
        options: ['251', '123', '-5', '-4'],
        answer: 2,
        explain: "-128+64+32+16+8+2+1 = -5. (Or negate: invert+1 → 00000101 = 5 → so it's -5)",
      },
    ],
  },

  // ---------------------------------------------------------- w2l12
  {
    id: 'w2l12',
    worldId: 'w2',
    title: 'Conversion Practice + Real Uses',
    minutes: 9,
    sections: [
      {
        kind: 'intro',
        heading: 'World 2 wrap-up',
        body: 'Ellaa conversions um kathutom — ippo real embedded world la yeng yeng use aagudhu nu paakalam. Idhu revision + application lesson!',
      },
      {
        kind: 'explain',
        heading: 'Conversion cheat sheet',
        body: 'DEC → BIN: division by 2, read up\nBIN → DEC: place values add\nBIN → HEX: 4-bit groups, nibble map\nHEX → BIN: expand each digit to 4 bits\nDEC → HEX: divide by 16, read up (or via binary!)\nOCT: 3-bit groups\n\nOvvoru method um practiced-a irukanum — speed comes with reps!',
      },
      {
        kind: 'analogy',
        heading: 'Language translator analogy',
        body: 'Decimal = un mother tongue, binary = machine language, hex = machine language oda shorthand. Nee translator maari ella languages ukum between convert pannanum — embedded engineer oda daily job idhu dhaan!',
      },
      {
        kind: 'visual',
        heading: 'Same value, 4 faces',
        code: '       200\n      / | \\ \\\n  BIN  OCT HEX  use case\n11001000 310 C8  a byte in RAM\n\n Always the SAME value —\n just different notations!',
      },
      {
        kind: 'technical',
        heading: 'Real embedded uses',
        list: [
          'C literals: 42, 0b10101010 (GCC extension), 0x1F, 052 (octal!).',
          'Register addresses: 0x25 = DDRB on ATmega328P. Datasheets la hex!',
          'Bitmasks: 0x80 (MSB check), 0x0F (low nibble), 0xFF (all).',
          'ADC values: analogRead → 0-1023 (10-bit). Value × 5.0 / 1023 = voltage.',
          'Checksums & protocols: data bytes hex la compare pannuvaanga.',
        ],
      },
      {
        kind: 'example',
        heading: 'Mini workout (verify answers!)',
        body: '1. 77 → binary? 01001101 (64+8+4+1)\n2. 0xB7 → decimal? 11×16+7 = 183\n3. 10110110 → hex? B6\n4. 0x40 → binary? 01000000\n5. -20 two\'s complement (8-bit)?\n   20=00010100 → invert 11101011 → +1 → 11101100 ✓',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes (final warning!)',
        list: [
          'Speed pressure la shortcut — verify with reverse conversion!',
          '0b prefix C standard illa (GCC extension) — portable code ku hex use pannunga.',
          'Decimal la ezhudha octal literal bug: int x = 050; → 40 decimal! Leading zero danger.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Conversion sprint',
      steps: [
        '5 conversions (mixed bases) 10 minutes la pannunga: 99→BIN, 0x2A→DEC, 11110011→HEX, 240→HEX, -9→8-bit two\'s complement.',
        'Answers reverse-convert panni verify pannunga.',
        'World boss ku ready-a irunga! 🔥',
      ],
    },
    quiz: [
      {
        q: '77 decimal = ? binary',
        options: ['01001101', '01001110', '10011010', '00110111'],
        answer: 0,
        explain: '64+8+4+1 = 77 → 01001101.',
      },
      {
        q: '0x2A = ? decimal',
        options: ['22', '28', '42', '52'],
        answer: 2,
        explain: '2×16 + 10 = 42.',
      },
      {
        q: '0x40 = ? binary',
        options: ['01000000', '00000100', '00010000', '10000000'],
        answer: 0,
        explain: '4=0100, 0=0000 → 01000000 (64).',
      },
      {
        q: '-9 in 8-bit two\'s complement?',
        options: ['10001001', '11110110', '11110111', '01110111'],
        answer: 2,
        explain: '9=00001001 → invert 11110110 → +1 = 11110111.',
      },
    ],
  },
];

export const world2Boss: QuizQuestion[] = [
  {
    q: 'BOSS: 0xEC = ? (binary and decimal)',
    options: [
      '11101100, 236',
      '11001110, 206',
      '11101101, 237',
      '11110000, 240',
    ],
    answer: 0,
    explain: 'E=1110, C=1100 → 11101100 = 128+64+32+8+4 = 236.',
  },
  {
    q: 'BOSS: 8-bit two\'s complement la 01111111 + 00000001 = ?',
    options: ['10000000 = +128', '10000000 = -128 (overflow!)', '00000000', '01111111'],
    answer: 1,
    explain: '+127 + 1 wraps to -128 — the famous signed overflow circle!',
  },
  {
    q: 'BOSS: 3-bit binary la maximum decimal value?',
    options: ['3', '7', '8', '15'],
    answer: 1,
    explain: '2^3 - 1 = 7 (111).',
  },
  {
    q: 'BOSS: 101101 subtract 011010 = ?',
    options: ['010011', '010101', '100111', '001011'],
    answer: 0,
    explain: '45-26 = 19 = 010011 ✓',
  },
  {
    q: 'BOSS: Embedded la sensor value -35 store panna best C type?',
    options: ['unsigned char', 'char (int8_t)', 'unsigned int', 'bool'],
    answer: 1,
    explain: 'Negative values need signed: int8_t handles -128 to 127.',
  },
  {
    q: 'BOSS: 0x0F mask ulla bit operation ku use pannaa, adhu select pannudhu?',
    options: ['MSB', 'Low nibble (4 bits)', 'Full byte', 'High nibble'],
    answer: 1,
    explain: '00001111 = lower 4 bits set — classic low-nibble mask.',
  },
  {
    q: 'BOSS: 16-bit la 65535 binary la?',
    options: [
      '1111111111111111 (16 ones)',
      '1000000000000000',
      '11111111 (8 ones)',
      '1023 pattern',
    ],
    answer: 0,
    explain: 'Max 16-bit = all 16 bits set = 2^16 - 1.',
  },
];

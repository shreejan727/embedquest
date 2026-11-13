// ============================================================
// EMBEDQUEST — WORLD 7: EMBEDDED C
// Registers, memory-mapped IO, bit manipulation, interrupts,
// timers, AVR hands-on, debugging workflow.
// Tanglish style, technical terms stay in English.
// ============================================================
import type { Lesson, QuizQuestion } from '../lib/types';

export const world7Lessons: Lesson[] = [
  // ---------------------------------------------------------- w7l1
  {
    id: 'w7l1',
    worldId: 'w7',
    title: 'Embedded C vs Normal C',
    minutes: 9,
    sections: [
      {
        kind: 'intro',
        heading: 'Same language, different planet',
        body: 'World 3 la C kathutom — laptop la compile panni run pannom. Ippo oru question: washing machine kulla irukura microcontroller um adhe C language-a use pannudha? Answer: aam, C dhaan. Aana rules romba different. Indha lesson la enna maathri irukku nu paakalam.',
      },
      {
        kind: 'explain',
        heading: 'Enna difference?',
        body: 'Syntax, variables, loops, functions — ellame same C. Difference na environment:\n\nNormal C (PC): OS irukku, RAM GB scale, keyboard/monitor support irukku. printf automatic-a screen la print aagum.\n\nEmbedded C (MCU): RAM kilobytes la, OS mostly illa (bare-metal), output na pins, LEDs, sensors. printf va direct-a use pannina adhu screen la print aagadhu — naama adha UART ku "retarget" pannanum.\n\nPlus one big thing: PC C program PC la compile aagi PC la run aagum. Embedded program na PC la compile panni, microcontroller ku flash pannanum. Idhu dhaan cross-compilation.',
      },
      {
        kind: 'analogy',
        heading: 'Hotel chef vs food truck chef',
        body: 'Normal C programmer = big hotel chef. Unlimited ingredients, big kitchen, helpers (OS) irukku. Embedded C programmer = food truck chef. Same cooking skills, aana space romba limited, electricity romba konjam, oru mistake panna adhu fix panna romba kastam. Skills same, constraints different.',
      },
      {
        kind: 'visual',
        heading: 'PC program vs MCU program',
        code: 'PC C PROGRAM          MCU EMBEDDED C\n OS (Windows/Linux)      OS illa / RTOS\n RAM: 8-16 GB            RAM: 2-320 KB\n C library full          Minimal libc\n printf -> screen        printf -> UART*\n compile+run same box    cross-compile+flash\n speed: GHz, multi-core  8-240 MHz, 1-2 core\n\n* UART setup naama dhaan pannanum',
      },
      {
        kind: 'technical',
        heading: 'Terms to remember',
        list: [
          'Host: compiler run aagura machine (un PC). Target: program finally run aagura machine (MCU).',
          'Cross-compiler: host ku illa target ku code generate pannura compiler. Example: avr-gcc for Arduino Uno.',
          'Toolchain: compiler + assembler + linker + uploader (avrdude / esptool) — oru chain.',
          'Firmware: MCU kulla permanent-a flash panna software. Embedded C program = firmware.',
          'Bare-metal: OS illama, naama direct hardware va control pannura style.',
        ],
      },
      {
        kind: 'example',
        heading: 'Same logic, two worlds',
        body: 'Laptop la: int a=3, b=4; printf("%d", a+b); → 7 print aagum.\n\nMCU la idhu eppadi irukkum?\n1. Serial.begin(9600) — UART setup (printf-ku replacement)\n2. Serial.print(a+b) — adhu 7 anupum PC monitor ku\n3. Laptop la int = 4 bytes. Arduino Uno (8-bit AVR) la int = 2 bytes! Adhanala int la 40000 store panna overflow aagum.\n\nIdhu dhaan embedded mindset: "en variable evlo bytes, en memory evlo irukku" nu always think pannanum.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'PC maari printf direct use pannuradhu — MCU la output path (UART) setup pannadhaama printf ezhudhuradhu.',
          'int = 4 bytes nu assume pannuradhu — 8-bit MCU la int 2 bytes dhaan. Size verify pannunga: sizeof(int).',
          'malloc/new romba use pannuradhu — small MCU la heap fragmentation memory-a kill pannum. Static allocation preferred.',
          'PC program speed la nenaichi MCU expectation vachuradhu — MCU 1000 times slower.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Constraint scanner',
      steps: [
        'Un Arduino board (illa datasheet) la: Flash, RAM, clock speed, int size (sizeof(int) via serial print) note pannunga.',
        '"PC C vs Embedded C" rendu column table ezhudhunga — 5 differences.',
        'World 3 la ezhudha oru simple program edhuthu, printf ku badhila Serial.print use panni MCU style-ku convert pannunga (paper la podhum).',
      ],
    },
    quiz: [
      {
        q: 'Cross-compilation na enna?',
        options: [
          'PC la compile panni MCU ku flash panradhu',
          'Rendu languages mix pannuradhu',
          'Program-a twice compile panradhu',
          'WiFi la code anupuradhu',
        ],
        answer: 0,
        explain: 'Host (PC) la avr-gcc compile pannum, binary-a target (MCU) ku flash panrom. Idhu dhaan cross-compilation.',
      },
      {
        q: 'Arduino Uno (ATmega328P) la int size evlo?',
        options: ['4 bytes', '8 bytes', '2 bytes', '1 byte'],
        answer: 2,
        explain: '8-bit AVR la int = 16-bit = 2 bytes. PC la adhu 4 bytes. Always sizeof() paakannum.',
      },
      {
        q: 'Bare-metal na enna?',
        options: [
          'Metal case la irukura board',
          'OS illama direct hardware control',
          'Internet illama irukura device',
          'Battery mattum vachu work pannuradhu',
        ],
        answer: 1,
        explain: 'Bare-metal = operating system illama, naama code direct-a hardware (registers) access pannum.',
      },
      {
        q: 'Firmware na enna?',
        options: [
          'Hardware oda metal part',
          'MCU kulla flash panna software',
          'Antenna wire',
          'Power supply',
        ],
        answer: 1,
        explain: 'Firmware = MCU flash memory la irukura program. Namma ezhudhra embedded C code adhu dhaan firmware aagum.',
      },
    ],
  },

  // ---------------------------------------------------------- w7l2
  {
    id: 'w7l2',
    worldId: 'w7',
    title: 'Registers & Memory-Mapped IO',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'LED-a ON panna naama enna ezhudhanum?',
        body: 'World 6 la digitalWrite(13, HIGH) pathom. Aana andha function kulla enna nadakkudhu nu paathoma? No! Ippo paakalam. MCU la LED ON pannuradhu na — oru "special memory address" la oru number ezhudhuradhu. Idhu dhaan indha lesson oda core idea.',
      },
      {
        kind: 'explain',
        heading: 'Register na enna?',
        body: 'MCU kulla RAM maari oru address space irukku. Normal addresses la naama data store panrom. Aana konjam addresses special: avanga hardware (GPIO, timers, ADC, UART) va control pannuvanga. Indha special addresses dhaan registers.\n\nMemory-mapped IO na: ellaa peripherals um memory addresses maari map pannirukanga. So register la value ezhudhina = hardware action nadakkum. Address irundha data-a illa hardware-a nu address number mattum dhaan sollum.\n\nExample (ATmega328P): address 0x25 = PORTB register. Adhula bit 5 = 1 ezhudhina, Arduino pin 13 HIGH aagum.',
      },
      {
        kind: 'analogy',
        heading: 'Apartment mailbox analogy',
        body: 'Oru apartment la ground floor la special mailboxes irukku (registers). Normal flat mailbox la letter podina adhu store aagum dhaan. Aana ground floor "power office" mailbox la oru note podina — current flow ON aagum, light burn start aagum! Same address system, aana andha box oda effect special. Register la ezhudhuradhu = action. RAM la ezhudhuradhu = storage.',
      },
      {
        kind: 'visual',
        heading: 'ATmega328P memory map (simplified)',
        code: '0x0000 -------- Flash (program)\n0x0100 -+------- RAM area\n        |\n0x0020  |  IO registers start\n0x0023  |  PINB  (read pins)\n0x0024  |  DDRB  (direction)\n0x0025  |  PORTB (write output)\n0x0026  |  PINC ...\n        |\n0x0100--+ normal RAM (variables)',
      },
      {
        kind: 'technical',
        heading: 'Register families',
        list: [
          'Direction registers (DDR): pin output-a input-a nu sollum. Bit 1 = output, bit 0 = input.',
          'Data/output registers (PORT): output value set panna (HIGH/LOW, pull-up on/off).',
          'Input registers (PIN): pin la ippo enna voltage irukku nu read panna.',
          'Control registers: peripheral behaviour set (mode, speed, prescaler).',
          'Status registers: peripheral oda current state (ready, error, data available).',
        ],
      },
      {
        kind: 'example',
        heading: 'C la register access eppadi?',
        body: 'C la oru address la value ezhudha pointer use pannanum:\n\n#define PORTB (*(volatile uint8_t*)0x25)\n\nIdhu break down pannalam:\n1. 0x25 = address number\n2. (volatile uint8_t*)0x25 = adha "1-byte variable pointer" nu cast pannom\n3. *(...) dereference = andha address la irukura box\n4. volatile = compiler-a "idha optimize pannadha" nu sollum (next lesson detail!)\n\nIppo: PORTB = 0b00100000; ezhudhina — hardware la pin 13 HIGH. Normal variable assignment maari dhaan, aana effect physical!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Wrong address access — datasheet paakama address guess pannuradhu. Oru bit off = whole peripheral kedaichi.',
          'Read-only register la ezhudhuradhu (example: PINB la write pannuradhu) — some registers write-only, some read-only.',
          'Register la value store panniten, save panniten nu nenaikiradhu — adhu storage illa, control command.',
          'Volatile miss pannuradhu — compiler register access-a remove pannidum (next lesson!).',
        ],
      },
    ],
    task: {
      title: 'Mini task: Register detective',
      steps: [
        'ATmega328P datasheet (online PDF) la PORTB, DDRB, PINB addresses find pannunga.',
        'Ovvonnum edhuku use aagum nu oru line la ezhudhunga.',
        'Worlds page > Tools > Arduino Pins tool open panni, pin 13 register bit identify pannunga.',
      ],
    },
    quiz: [
      {
        q: 'Memory-mapped IO na enna?',
        options: [
          'RAM la photos store panradhu',
          'Peripheral registers memory addresses maari access pannuradhu',
          'SD card la files map panradhu',
          'Google Maps use panradhu',
        ],
        answer: 1,
        explain: 'Hardware registers um normal memory addresses maari address space la map pannuvanga. Address write = hardware action.',
      },
      {
        q: 'DDRB register role enna?',
        options: [
          'Pin direction sollum (output/input)',
          'LED brightness control',
          'Clock speed maathum',
          'Battery monitor',
        ],
        answer: 0,
        explain: 'DDR = Data Direction Register. Bit 1 ezhudha output, bit 0 ezhudha input.',
      },
      {
        q: 'PORTB la value ezhudhina enna aagum?',
        options: [
          'RAM la save aagum',
          'Pin voltage maarum (hardware action)',
          'Screen la print aagum',
          'Nothing',
        ],
        answer: 1,
        explain: 'PORTB write = physical pin output level maarum. Adhu storage illa control command.',
      },
      {
        q: 'PIND register use panna enna theriyum?',
        options: [
          'Pin oda current voltage state',
          'Pin direction',
          'Pull-up value',
          'Timer value',
        ],
        answer: 0,
        explain: 'PINx register read panna = andha port pins oda live state (HIGH/LOW) theriyum.',
      },
    ],
  },

  // ---------------------------------------------------------- w7l3
  {
    id: 'w7l3',
    worldId: 'w7',
    title: 'Bit Manipulation + volatile',
    minutes: 11,
    sections: [
      {
        kind: 'intro',
        heading: 'World 2 binary skills ippo weapon aagum',
        body: 'World 2 la binary, shifts, masks kathutom. World 7 la adha daily tool maari use pannuvom. Register la oru bit mattum ON pannanum, mattum OFF pannanum, mattum flip pannanum — indha 4 patterns un career la daily use aagum.',
      },
      {
        kind: 'explain',
        heading: 'Four golden patterns',
        body: 'Register R, bit n (0-based) nu vaangikalam:\n\n1. SET bit (ON): R |= (1 << n)\n2. CLEAR bit (OFF): R &= ~(1 << n)\n3. TOGGLE bit: R ^= (1 << n)\n4. CHECK bit: if (R & (1 << n))\n\nLogic: (1 << n) na "mask" — andha bit mattum 1, baaki ellam 0.\n\nSET: OR pannina andha bit 1 aagum, baaki untouched.\nCLEAR: mask invert (~(1<<n) = andha bit 0, baaki 1) panni AND — andha bit dhaan 0 aagum.\nTOGGLE: XOR pannina andha bit flip aagum, baaki untouched.\nCHECK: AND result non-zero na bit ON.',
      },
      {
        kind: 'analogy',
        heading: 'Switchboard analogy',
        body: 'Oru switchboard la 8 switches irukku. Neenga switch 5 mattum ON pannanum, baaki switches state change aagakoodadhu. Idhu dhaan bit mask operation. Full board-a reset pannuradhu (R = 0xFF) na ella switch um ON aagum — usually adhu thappu! So selective operation: mask use pannunga.',
      },
      {
        kind: 'visual',
        heading: 'Operations step by step',
        code: 'R        = 0b00000100\n(1<<3)   = 0b00001000  mask\nSET:\n  R |= mask -> 0b00001100\nCLEAR:\n  ~mask    -> 0b11110111\n  R &= ~m  -> 0b00000100\nTOGGLE:\n  R ^= mask -> bit3 flips\nCHECK:\n  R & mask  -> 0 or non-0',
      },
      {
        kind: 'technical',
        heading: 'volatile keyword',
        list: [
          'volatile = "idha compiler optimize pannadha, eppovum real memory la irundhu read/write pannu" nu instruction.',
          'Register access la MUST — illana compiler register read-a cache panni, hardware change theriyadhu.',
          'ISR la share panna variables la MUST — main loop andha variable value-a register la cache pannidum, ISR update theriyadhu.',
          'volatile int counter; — declaration pattern: type munnadi keyword.',
        ],
      },
      {
        kind: 'example',
        heading: 'volatile illana enna aagum?',
        body: 'volatile int flag = 0;\nmain loop: while (flag == 0) { }\nISR: flag = 1;\n\nvolatile illana compiler so: "flag main loop la change aagala, adha register la cache pannuren" nu andha while condition-a "while (0 == 0)" maari optimise pannidum → infinite loop, ISR update never check aagum!\n\nvolatile add panna: compiler eppovum real memory irundhu read pannum → ISR update immediate-a visible.\n\nNext lesson la ISR la innum detail paakaporoam.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'R = (1 << n) ezhudhuradhu — baaki ella bits-a erase pannidum! Selective change na |= or &= ~.',
          'CLEAR la ~ miss pannuradhu: R &= (1<<n) ezhudhina andha bit mattum porathu, baaki ella bits clear aagum (opposite!).',
          'Bit numbering 1 irundhu start pannuradhu — bit 0 dhaan first bit (LSB). (1<<5) = 6th bit.',
          'Register access la volatile miss pannuradhu — code PC la work aagum, board la work aagadhu.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Bit drill',
      steps: [
        'Converter tool open panni (Worlds page > Tools > Converter) — binary practice pannunga.',
        'R = 0b10110001 vachukonga. Set bit 2, clear bit 4, toggle bit 7 — paper la step by step pannunga.',
        'Answers: set→0b10110101, clear→0b10010001, toggle→0b00110001. Verify pannunga!',
      ],
    },
    quiz: [
      {
        q: 'Bit n-a SET panna operation?',
        options: ['R |= (1 << n)', 'R &= (1 << n)', 'R ^= n', 'R = n'],
        answer: 0,
        explain: 'OR with mask (1<<n) → andha bit ON, baaki bits untouched.',
      },
      {
        q: 'Bit n-a CLEAR panna?',
        options: ['R &= ~(1 << n)', 'R |= (1 << n)', 'R ^= (1 << n)', 'R &= (1 << n)'],
        answer: 0,
        explain: 'Mask invert panni (~) AND pannina andha bit mattum OFF aagum, baaki safe.',
      },
      {
        q: 'R = 0b00000100, apram R |= (1<<3) → R?',
        options: ['0b00001100', '0b00000000', '0b11111011', '0b00001000'],
        answer: 0,
        explain: '0b00000100 | 0b00001000 = 0b00001100. Bit2 already irundhuchu, bit3 new add.',
      },
      {
        q: 'volatile eppadi help pannudhu?',
        options: [
          'Code speed increase',
          'RAM decrease',
          'Compiler optimization block pannum — real memory read/write',
          'Pin direction control',
        ],
        answer: 2,
        explain: 'volatile = compiler-a andha variable real memory la irundhu dhaan eppovum access pannu nu sollum. Caching/block pannadhu.',
      },
      {
        q: 'volatile eppadi miss pannina worst case?',
        options: [
          'Program crash aagum',
          'ISR update main loop ku theriyadhu → hang',
          'Compile error',
          'Pin damage',
        ],
        answer: 1,
        explain: 'Compiler variable-a cache pannidum, ISR la update aana value main loop la eppovum puriyadhu — infinite wait possibility.',
      },
    ],
  },

  // ---------------------------------------------------------- w7l4
  {
    id: 'w7l4',
    worldId: 'w7',
    title: 'Interrupts & Timers',
    minutes: 11,
    sections: [
      {
        kind: 'intro',
        heading: 'Doorbell concept',
        body: 'Neenga door kitta constant-a nikkura, oru nimisham signal-a paathukitu irukkeengala? Illa doorbell poduviteenga, TV paakura, bell ring panna odane door ku poreengala? Idhu dhaan polling vs interrupt. MCU world la intha decision un design oda quality decide pannum.',
      },
      {
        kind: 'explain',
        heading: 'Polling vs Interrupt',
        body: 'Polling: main loop la ella time-um "button press aacha? press aacha?" nu check panradhu. Simple, aana CPU full time waste, timing miss aagalam.\n\nInterrupt: hardware event (button press, timer tick, UART data) nadakkum bodhu CPU ku oru signal. Current work pause, special function (ISR - Interrupt Service Routine) run, apram resume. CPU efficient, timing accurate.\n\nTimers: MCU kulla built-in counters. Clock pulses count pannuvanga. Prescaler = input clock-a divide pannudhu (16MHz/1024 = 15625 Hz). Timer overflow or compare match trigger pannum bodhu interrupt generate aagum. Idhu dhaan millis(), delay(), PWM ellam work aagura base mechanism.',
      },
      {
        kind: 'analogy',
        heading: 'Alarm clock analogy',
        body: 'Timer = alarm clock. Nee sleep pannuva (main loop other work), alarm 6 AM ku ring pannum (timer overflow interrupt), nee ezhundhu oru specific action pannuva (ISR), apram daily routine continue (main loop resume). Alarm miss pannakoodadhu — perfect timing dhaan real-time systems oda heart.',
      },
      {
        kind: 'visual',
        heading: 'Interrupt flow',
        code: 'Main loop ----------+\n  |                 |\n  v                 v\n [work A] [work B] [work C]\n                 X  <- interrupt signal!\n                 |\n                 v\n          save context\n                 v\n          ISR (short work)\n                 v\n          restore context\n                 v\n          resume [work C]',
      },
      {
        kind: 'technical',
        heading: 'ISR golden rules',
        list: [
          'ISR romba SHORT and FAST — microseconds scale. Heavy work main loop la pannanum.',
          'delay(), Serial.print(), long loops ISR kulla use pannakoodadhu.',
          'ISR la share panna variables MUST be volatile.',
          'AVR Arduino: external interrupts pin 2 (INT0) and pin 3 (INT1) la dhaan. attachInterrupt(digitalPinToInterrupt(2), fn, FALLING) pattern.',
          'Modes: RISING (LOW→HIGH), FALLING (HIGH→LOW), CHANGE, LOW level.',
        ],
      },
      {
        kind: 'example',
        heading: 'Button interrupt example',
        body: 'volatile int presses = 0;\n\nvoid countPress() { presses++; }\n\nvoid setup() {\n  pinMode(2, INPUT_PULLUP);\n  pinMode(13, OUTPUT);\n  attachInterrupt(digitalPinToInterrupt(2),\n                  countPress, FALLING);\n}\n\nvoid loop() {\n  if (presses > 0) {\n    presses = 0;\n    digitalWrite(13, HIGH);  // LED blink\n    delay(200);\n    digitalWrite(13, LOW);\n  }\n}\n\nISR la volatile counter increment mattum. Actual LED work loop la. Idhu dhaan clean ISR pattern. (Bounce handling: hardware small RC circuit or software delay check — real product la MUST.)',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'ISR kulla delay(500) potturadhu — whole system freeze maari feel aagum.',
          'Serial.print ISR la use pannuradhu — UART blocking, ISR hang risk.',
          'volatile miss pannuradhu — loop ku ISR update theriyadhu.',
          'Button bounce handle pannadhaama increment — oru press la 10-20 counts varum.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Design decision',
      steps: [
        '3 scenarios note pannunga: (1) button press LED blink, (2) temperature monitor every second, (3) emergency stop button. Ovvonrukum polling use pannuva interrupt use pannuva nu decide pannunga + reason.',
        'ISR golden rules 5 list pannunga.',
        'Alarm clock analogy un words la 2 lines la ezhudhunga.',
      ],
    },
    quiz: [
      {
        q: 'Polling oda main problem?',
        options: [
          'CPU full time check pannitu irukku — waste',
          'Code romba complex',
          'Hardware damage',
          'Memory full',
        ],
        answer: 0,
        explain: 'Polling la CPU ella loop la check pannitu irukku. Interrupt la CPU free-a other work pannum, event varum bodhu dhaan react.',
      },
      {
        q: 'ISR na enna?',
        options: [
          'Interrupt Service Routine — event bodhu run aagura special function',
          'Internet Service Router',
          'Normal main loop',
          'Sensor type',
        ],
        answer: 0,
        explain: 'ISR = interrupt trigger panna bodhu automatically call aagura small function. Work mudichu main program resume.',
      },
      {
        q: '16MHz clock + 1024 prescaler = ?',
        options: ['15625 Hz', '16000 Hz', '1024 Hz', '625 Hz'],
        answer: 0,
        explain: '16000000 / 1024 = 15625 Hz. Timer per second 15625 ticks count pannum.',
      },
      {
        q: 'ISR kulla enna safe-ah avoid pannanum?',
        options: [
          'volatile variable increment',
          'delay() and Serial.print()',
          'Simple flag set',
          'Nothing, ellaam safe',
        ],
        answer: 1,
        explain: 'delay blocking + Serial.print UART blocking — ISR la use pannina system slow/hang. Short flag-based work only.',
      },
      {
        q: 'Arduino Uno external interrupts edi pins?',
        options: ['Pin 0, 1', 'Pin 2, 3', 'Pin 13, 12', 'A0, A1'],
        answer: 1,
        explain: 'ATmega328P la INT0 = pin 2, INT1 = pin 3 dhaan external interrupt support.',
      },
    ],
  },

  // ---------------------------------------------------------- w7l5
  {
    id: 'w7l5',
    worldId: 'w7',
    title: 'AVR GPIO Registers — Hands On',
    minutes: 12,
    sections: [
      {
        kind: 'intro',
        heading: 'digitalWrite ku badhila direct register',
        body: 'Arduino pin 13 LED blink pannalam — aana indha time digitalWrite use pannama, direct-a DDRB/PORTB registers use pannuvom. Ippo paakalam. Idhu real embedded C engineers oda daily style. Note: idhu educational simulation — Tinkercad/Proteus la practice pannunga, or Arduino IDE la actual board la.',
      },
      {
        kind: 'explain',
        heading: 'Pin 13 = PORTB bit 5',
        body: 'Arduino Uno oda pin mapping:\n- Pin 13 = PB5 (PORTB, bit 5)\n- Pin 13 LED = on-board LED\n\nGPIO register roles:\n- DDRB: bit 5 = 1 → pin 13 OUTPUT; bit 5 = 0 → INPUT\n- PORTB: DDRB output aana bodhu, bit 5 = 1 → pin HIGH (5V), bit 5 = 0 → LOW (0V)\n- PINB: pin oda actual voltage read (input state)\n\nSo LED ON sequence:\n1. DDRB |= (1<<5);   // output\n2. PORTB |= (1<<5);  // HIGH\n\nOFF: PORTB &= ~(1<<5);',
      },
      {
        kind: 'analogy',
        heading: 'Two-switch control analogy',
        body: 'DDR = "nee output mode la irukka, input mode la irukka" mode switch. PORT = actual on/off switch. Rendu switch set pannadhaama LED work aagadhu. Mode miss pannina — LED change aagadhu. Idhu dhaan beginners oda #1 register mistake.',
      },
      {
        kind: 'visual',
        heading: 'Register effect map',
        code: 'DDRB bit5=1, PORTB bit5=1 -> 5V (HIGH)\nDDRB bit5=1, PORTB bit5=0 -> 0V (LOW)\nDDRB bit5=0, PORTB bit5=1 -> input+pullup\nDDRB bit5=0, PORTB bit5=0 -> input float\n\nRead: PINB & (1<<5) -> 1 = pin HIGH',
      },
      {
        kind: 'technical',
        heading: 'Full bare-metal blink code',
        list: [
          '#include <avr/io.h>  // register definitions',
          '#include <util/delay.h>  // _delay_ms()',
          'int main(void) {',
          '  DDRB |= (1 << 5);      // pin 13 = output',
          '  while (1) {',
          '    PORTB ^= (1 << 5);   // toggle pin 13',
          '    _delay_ms(500);      // half second wait',
          '  }',
          '}',
          'Idhu Arduino IDE la compile aagum (F_CPU automatically defined). Board la directly flash pannalam.',
        ],
      },
      {
        kind: 'example',
        heading: 'Button read with registers',
        body: '// Pin 2 = PD2 (PORTD bit 2)\nDDRD &= ~(1 << 2);    // PD2 = input\nPORTD |= (1 << 2);    // enable pull-up\n\n// read\nif (!(PIND & (1 << 2))) {\n  // button pressed (LOW because pull-up)\n}\n\nNote: pull-up ON na unpressed = HIGH, pressed = LOW. So check inverted (!).\n\nInput floating issue: DDR input + pull-up OFF na pin "floating" — random HIGH/LOW readings. Pull-up or external resistor MUST.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'DDRB set pannadhaama PORTB write pannuradhu — pin still input, LED no response.',
          'PORTB read panren nu PIND ku badhila PORTB read pannuradhu — PORTB = output command, PIND = actual pin state.',
          'Input floating — pull-up resistor miss pannuradhu.',
          'digitalWrite slow (~3-5 microseconds), direct register write fast (~0.1 microsecond). Critical timing la register, normal code la Arduino API.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Register LED project',
      steps: [
        'Mela irukura blink code Tinkercad (illa real Arduino) la try pannunga. Serial print attach pannunga.',
        'Pin 13 ku badhila pin 12 (PB4) ku switch pannunga — code modify pannunga (bit 5 → bit 4).',
        'Button read code add panni: button press → LED ON logic pannunga.',
        'Notebook la DDRB/PORTB/PINB roles oru table la note pannunga.',
      ],
    },
    quiz: [
      {
        q: 'Pin 13 (PB5) output set panna first step?',
        options: [
          'PORTB |= (1 << 5)',
          'DDRB |= (1 << 5)',
          'PIND |= (1 << 5)',
          'DDRB &= ~(1 << 5)',
        ],
        answer: 1,
        explain: 'First DDRB bit 5 = 1 (output direction). Apram dhaan PORTB write effect aagum.',
      },
      {
        q: 'DDRB output, PORTB bit=1 → pin voltage?',
        options: ['0V', '5V', '2.5V', 'floating'],
        answer: 1,
        explain: 'Output mode + PORTB bit 1 = HIGH = 5V (UNO 5V logic).',
      },
      {
        q: '0x20 binary la enna?',
        options: ['0b00100000', '0b00010000', '0b00001000', '0b01000000'],
        answer: 0,
        explain: '0x20 = 32 = 0b00100000 = bit 5 mask. Adhu dhaan PB5 mask.',
      },
      {
        q: 'Pin input read panna register?',
        options: ['PORTB', 'DDRB', 'PINB', 'TCCR1B'],
        answer: 2,
        explain: 'PINx register = pin la ippo irukura real voltage state. PORTB write only, PINB read.',
      },
      {
        q: 'Input pull-up ON na unpressed button state?',
        options: ['LOW', 'HIGH', 'floating', 'undefined'],
        answer: 1,
        explain: 'Pull-up = unpressed HIGH (internal resistor pulls to 5V). Press = LOW. So check ! (inverted).',
      },
    ],
  },

  // ---------------------------------------------------------- w7l6
  {
    id: 'w7l6',
    worldId: 'w7',
    title: 'Debugging Embedded Code',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Console illa — eppadi debug pannuvom?',
        body: 'PC programming la console print, breakpoints, stack trace — ella comfort irukku. MCU la console illa, screen illa. Appo bug find eppadi? Indha lesson practical debugging workflow — un career la adhigama use aagum skill.',
      },
      {
        kind: 'explain',
        heading: 'Embedded debugging toolbox',
        body: '1. LED debug: oru pin LED-a "checkpoint indicator" maari use pannunga. Code reach aagudha illa nu visually confirm.\n\n2. UART printf debug: Serial.print statements vachi variable values PC monitor la paakalam. Serial monitor = embedded engineer oda best friend.\n\n3. Multimeter: voltage check — pin HIGH-a 5V irukka? LOW-a 0V irukka? Power supply correct-a?\n\n4. Logic analyzer / oscilloscope: pin signals over time visual-a paakalam (timing bugs ku). Advanced but powerful.\n\n5. Simulator: Tinkercad, Proteus, SimulIDE — board illama logic test.\n\n6. Divide and conquer: code half-a comment panni, bug area narrow down. Bisection debugging.',
      },
      {
        kind: 'analogy',
        heading: 'Doctor diagnosis analogy',
        body: 'Doctor patient ku symptoms check pannuvaanga: temperature, BP, scans. Direct-a guess pannuvaangala? Illa. Embedded debugging same: symptoms (LED, voltage, serial output) collect pannunga, hypothesis form pannunga, test pannunga, confirm. Shot-in-the-dark fixes avoid pannunga.',
      },
      {
        kind: 'visual',
        heading: 'Debug decision tree',
        code: 'Board respond aagala?\n |\n +-- Power LED ON? -> No: wiring/power\n +-- Upload success? -> No: driver/port\n +-- Serial data varudha? -> No: baud/pin\n +-- Signal pin voltage? -> No: register/pin\n +-- Logic analyzer? -> timing issue',
      },
      {
        kind: 'technical',
        heading: 'Professional habits',
        list: [
          'Version control (Git): ella change commit pannunga. Bug vandha previous version ku revert mudiyum.',
          'Change ONE thing at a time — simultaneous changes bug location hide pannum.',
          'Small test first: big code ezhudhaama, small piece test panni expand pannunga.',
          'Datasheet read: peripheral register behaviour datasheet la dhaan official truth. Guess panradhu risky.',
          'Serial log with timestamps: millis() add panni events sequence track pannunga.',
        ],
      },
      {
        kind: 'example',
        heading: 'Debug walkthrough',
        body: 'Bug: "LED blink aagala".\n\nStep 1: Upload success aacha? → Serial monitor "Hello" print aagudha check → yes.\nStep 2: Power LED board la ON-a? → yes.\nStep 3: Pin 13 voltage multimeter la? → 0V constant.\nStep 4: Code paakka → DDRB |= (1<<5) line MISS! Direction set pannala.\nStep 5: DDRB line add → LED blink start.\n\nNote pattern: guess pannala, system-a step by step verify pannom. Indha workflow oru muscle memory maakum.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Shotgun debugging: random-a code change panni hope pannuradhu — bug introduce aagum chance increase.',
          'Hardware blame first: 90% cases bug code la dhaan. Hardware check last.',
          'Ore change la 5 things modify pannuradhu — revert impossible, bug locate impossible.',
          'Backup illama board flash pannuradhu — previous working code irundha always save.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Debug journal',
      steps: [
        'Un past code bugs (World 3-6) list pannunga — 3 bugs, enna cause, enna fix nu.',
        'Debug toolbox methods 6 list panni, oru line use case ezhudhunga.',
        'Next project start bodhu "commit + change one thing" rule follow pannunga (practice!).',
      ],
    },
    quiz: [
      {
        q: 'Embedded la simplest debug tool?',
        options: ['LED checkpoint indicator', 'Stack trace', 'Cloud logging', 'AI assistant'],
        answer: 0,
        explain: 'LED = cheap, visual, immediate. Code reach aagudha nu confirm panna first tool.',
      },
      {
        q: 'Bisection debugging na enna?',
        options: [
          'Code half comment panni bug area narrow down',
          'Binary search data la',
          'Baud rate divide',
          'Battery level check',
        ],
        answer: 0,
        explain: 'Divide and conquer: half code disable → bug irukka illaya check → repeat → bug location pinpoint.',
      },
      {
        q: 'Best debugging habit?',
        options: [
          'Ella change um ore time la pannuradhu',
          'One change at a time + version control',
          'Hardware first blame',
          'Console illa so skip debugging',
        ],
        answer: 1,
        explain: 'One change at a time + Git version control = bug revert panna mudiyum, cause clear-a theriyum.',
      },
      {
        q: 'Timing bug find panna best tool?',
        options: ['Logic analyzer / oscilloscope', 'Serial monitor', 'Multimeter', 'Calculator'],
        answer: 0,
        explain: 'Logic analyzer signals over time graph la kaatum. Small timing glitches (microseconds) adhu dhaan catch pannum.',
      },
    ],
  },
];

export const world7Boss: QuizQuestion[] = [
  {
    q: 'BOSS: Embedded C vs PC C — biggest structural difference?',
    options: [
      'Language syntax completely different',
      'Embedded code cross-compiled and flashed to target MCU',
      'Embedded C la functions illa',
      'Embedded C variables store pannave mudiyadhu',
    ],
    answer: 1,
    explain: 'Syntax same C. Difference: host la compile → target MCU ku flash. Plus constraints: small RAM, no OS, hardware access.',
  },
  {
    q: 'BOSS: Pin direction (output) set panna register write?',
    options: [
      'PORTB |= (1 << 5)',
      'DDRB |= (1 << 5)',
      'PINB |= (1 << 5)',
      'DDRB &= ~(1 << 5)',
    ],
    answer: 1,
    explain: 'DDR = direction. Bit 1 = output. PORTB = output value, PINB = read state.',
  },
  {
    q: 'BOSS: PORTB |= (1 << 5), DDRB bit5=1 → pin 13 state?',
    options: ['LOW (0V)', 'HIGH (5V)', 'floating', 'input mode'],
    answer: 1,
    explain: 'PORTB bit 5 = 1 + DDRB output = pin HIGH = 5V on Uno. LED 13 will light.',
  },
  {
    q: 'BOSS: R = 0b00001100, R &= ~(1 << 2) → R?',
    options: ['0b00001000', '0b00001100', '0b00000000', '0b11110011'],
    answer: 0,
    explain: '~(1<<2) = 0b11111011. AND: 0b00001100 & 0b11111011 = 0b00001000. Bit 2 cleared, others safe.',
  },
  {
    q: 'BOSS: volatile enna problem fix pannudhu?',
    options: [
      'Program too slow',
      'Compiler cache — ISR/register updates main loop la theriyadhu',
      'RAM overflow',
      'Stack corruption',
    ],
    answer: 1,
    explain: 'volatile forces real memory access every time. ISR or hardware change panna value loop ku correct-a theriyum.',
  },
  {
    q: 'BOSS: Timer1 CTC, F_CPU=16MHz, prescaler 1024, OCR1A=15624 → interrupt period?',
    options: ['1 second', '1 millisecond', '1 minute', '65536 seconds'],
    answer: 0,
    explain: '16MHz/1024 = 15625 Hz → 15625 ticks = 1 second. OCR1A=15624 means 15625 counts (0..15624).',
  },
  {
    q: 'BOSS: ISR golden rule — what goes INSIDE the ISR?',
    options: [
      'Full application logic',
      'Short fast flag set / counter update only',
      'delay() for timing',
      'Serial.println for logging',
    ],
    answer: 1,
    explain: 'ISR = quick and short. Heavy work main loop la. delay/Serial.print ISR la blocking issue create pannum.',
  },
];

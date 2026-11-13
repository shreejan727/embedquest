// ============================================================
// EMBEDQUEST — WORLD 6: MICROCONTROLLERS
// 8 lessons. Arduino UNO, ESP32, GPIO, ADC, PWM, interrupts.
// ============================================================
import type { Lesson, QuizQuestion } from '../lib/types';

export const world6Lessons: Lesson[] = [
  // ---------------------------------------------------------- w6l1
  {
    id: 'w6l1',
    worldId: 'w6',
    title: 'What is a Microcontroller?',
    minutes: 9,
    sections: [
      {
        kind: 'intro',
        heading: 'Computer in a fingernail',
        body: 'Microcontroller = full computer in ONE chip: CPU + memory + I/O! Washing machine, remote, car ECU, toys — everyday la 50+ MCUs around you!',
      },
      {
        kind: 'explain',
        heading: 'MCU vs MPU',
        body: 'Microprocessor (MPU): CPU ONLY chip (PC ka Intel/AMD). RAM, storage external connect pannanum. Power hungry, expensive, powerful.\n\nMicrocontroller (MCU): CPU + RAM + Flash + I/O (GPIO, ADC, timers) all-in-one! Low power, cheap (₹50-500!), less powerful.\n\nMCU = all-in-one printer (compact, pothum). MPU = separate printer+scanner+fax (powerful, modular).',
      },
      {
        kind: 'analogy',
        heading: 'Swiss army knife analogy',
        body: 'MCU = Swiss knife: blade+scissors+opener in one handle (fixed tools, compact). MPU = full toolbox (every tool possible, but heavy). Embedded = knife pothum, PC = toolbox venum!',
      },
      {
        kind: 'visual',
        heading: 'MCU internals',
        code: ' ┌──────────────────────────┐\n │  CPU (brain)             │\n │  ┌─────┐ ┌─────┐ ┌─────┐ │\n │  │RAM  │ │Flash│ │Peri-│ │\n │  │     │ │     │ │pherals│\n │  └─────┘ └─────┘ └─────┘ │\n │  GPIO/ADC/Timer/UART     │\n └──┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬───┘\n    pins! (sensors, LEDs...)',
      },
      {
        kind: 'technical',
        heading: 'Where MCUs live',
        list: [
          'Automotive: engine control, ABS, airbag (100+ MCUs per car!).',
          'Home: washing machine, microwave, AC, TV remote.',
          'Wearables: smartwatch, fitness band.',
          'Industrial: motor drives, PLCs, robots.',
          'Common chips: ATmega328P (Arduino), ESP32 (IoT), STM32 (industry), PIC (legacy).',
        ],
      },
      {
        kind: 'example',
        heading: 'Washing machine MCU job',
        body: '1. Read door sensor (GPIO input) — closed-a?\n2. Read water level sensor (ADC).\n3. Control motor speed (PWM!).\n4. Open/close water valve (GPIO output + driver).\n5. Run wash cycle program (timer + state machine).\n6. Buzzer alarm end (GPIO).\n\nFull embedded system — naama intha pattern dhaan kathukitom!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'MCU/MPU confuse — all-in-one vs CPU-only!',
          'MCU = mini PC nu nenaikiradhu — different design philosophy!',
          'RAM sizes: MCU = KB world, PC = GB world!',
        ],
      },
    ],
    task: {
      title: 'Mini task: MCU safari',
      steps: [
        'Veetla 5 MCU devices list pannunga.',
        'Arduino UNO vs phone: CPU speed, RAM, storage compare table ezhudhunga.',
      ],
    },
    quiz: [
      {
        q: 'MCU ulla yedhu yedhu irukku?',
        options: [
          'CPU only',
          'CPU + RAM + Flash + I/O peripherals',
          'Only RAM',
          'Only I/O',
        ],
        answer: 1,
        explain: 'All-in-one = microcontroller definition!',
      },
      {
        q: 'PC la use panra chip type?',
        options: ['MCU', 'MPU (microprocessor)', 'PIC', 'None'],
        answer: 1,
        explain: 'MPU = powerful CPU, external RAM/storage.',
      },
      {
        q: 'MCU RAM typical size?',
        options: ['KB range', 'MB range', 'GB range', 'TB range'],
        answer: 0,
        explain: 'KB! UNO = 2KB. Efficiency is the game.',
      },
    ],
  },

  // ---------------------------------------------------------- w6l2
  {
    id: 'w6l2',
    worldId: 'w6',
    title: 'Arduino UNO Architecture',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Your first dev board',
        body: 'Arduino UNO = beginner oda best friend: ATmega328P chip + USB + regulators + easy pins. Understand the BOARD, then the CHIP!',
      },
      {
        kind: 'explain',
        heading: 'Board anatomy',
        body: 'ATmega328P (black chip center) = MCU brain.\n- 16MHz crystal = clock (16 million cycles/sec!).\n- 14 digital pins (D0-D13), 6 analog inputs (A0-A5).\n- 2KB SRAM (variables), 32KB Flash (program), 1KB EEPROM (permanent data).\n- USB port = programming + power + serial monitor.\n- Power jack (7-12V), voltage regulator (5V/3.3V).\n- Power pins: 5V, 3.3V, GND ×3, Vin.\n\nD0/D1 = Serial RX/TX (upload la use — avoid user circuits!). D13 = onboard LED!',
      },
      {
        kind: 'analogy',
        heading: 'Bicycle with training wheels analogy',
        body: 'Bare ATmega chip = bike without training wheels (power, clock, USB all self-wire!). UNO board = training wheels + bell + basket attached — safe start, focus on LEARNING!',
      },
      {
        kind: 'visual',
        heading: 'UNO pin map',
        code: '      ┌[USB]──[PWR]─┐\n AREF │             │ D13(LED)\n GND  │  ATmega328P │ D12\n D13..│             │ ...\n A0-A5│             │ D0(RX)\n      └──[RESET]────┘\n\n Top: analog side\n Bottom: digital side',
      },
      {
        kind: 'technical',
        heading: 'ATmega328P specs',
        list: [
          '8-bit AVR core, 16MHz → ~16 MIPS.',
          'Flash 32KB (program), SRAM 2KB (variables!), EEPROM 1KB.',
          '3 timers (2×8-bit, 1×16-bit) → PWM, delays.',
          '10-bit ADC ×6 channels (0-1023).',
          'UART, SPI, I2C hardware — protocols free!',
          'Max pin current 40mA (20mA recommended) — transistor for bigger loads (World 5!).',
        ],
      },
      {
        kind: 'example',
        heading: '2KB RAM reality check',
        body: 'int = 2 bytes → 1000 ints max (theoretically!).\n\nchar msg[50] = 50 bytes.\nint readings[100] = 200 bytes.\nfloat matrix[30][8] = 960 bytes ← 47% of RAM!!\n\nLesson: embedded la memory conscious coding MANDATORY. Serial buffer + stack + globals ellam share this 2KB!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'D0/D1 pins user circuits la use — upload conflicts!',
          'String (class) heavy use on UNO — RAM fragmentation!',
          'Pin current limits ignore — direct motor connect = dead pin!',
        ],
      },
    ],
    task: {
      title: 'Mini task: Board map',
      steps: [
        'UNO board (real/photo) paaru — 14 digital, 6 analog, power pins identify.',
        'UNO vs ESP32 specs table (RAM, speed, WiFi) — next lesson prep!',
      ],
    },
    quiz: [
      {
        q: 'UNO brain chip?',
        options: ['ESP8266', 'ATmega328P', 'STM32', '8051'],
        answer: 1,
        explain: 'ATmega328P — 8-bit AVR, 16MHz.',
      },
      {
        q: 'UNO SRAM size?',
        options: ['2KB', '32KB', '520KB', '2MB'],
        answer: 0,
        explain: '2KB SRAM (variables). 32KB = Flash (program).',
      },
      {
        q: 'Onboard LED pin?',
        options: ['D0', 'D1', 'D13', 'A5'],
        answer: 2,
        explain: 'D13 built-in LED — first blink project here!',
      },
      {
        q: 'UNO ADC resolution?',
        options: ['8-bit', '10-bit (0-1023)', '12-bit', '16-bit'],
        answer: 1,
        explain: '10-bit → 1024 levels (0-1023).',
      },
    ],
  },

  // ---------------------------------------------------------- w6l3
  {
    id: 'w6l3',
    worldId: 'w6',
    title: 'ESP32 Architecture',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'IoT powerhouse',
        body: 'ESP32 = WiFi + Bluetooth + dual core + lots of peripherals — ₹300 la full IoT platform! ESP8266 oda successor, industry favorite!',
      },
      {
        kind: 'explain',
        heading: 'ESP32 specs',
        body: 'CPU: dual-core Xtensa LX6, 240MHz (UNO la 8-bit 16MHz — 30× faster!).\nRAM: ~520KB SRAM (260× UNO!). Flash: 4MB typical.\nWiFi 802.11 b/g/n + Bluetooth 4.2 (Classic + BLE).\nGPIO: 34 programmable (some pins reserved).\nPeripherals: 12-bit ADC (18 ch), 2× DAC (true analog out!), PWM ×16, UART ×3, SPI ×4, I2C ×2, touch sensors, hall sensor, CAN bus!\n\nProgramming: Arduino IDE (C++), MicroPython, ESP-IDF (native C).',
      },
      {
        kind: 'analogy',
        heading: 'Scooter vs truck analogy',
        body: 'UNO = simple scooter (kathuka easy, pothum for local). ESP32 = loaded pickup truck (power, WiFi, more cargo — bit more complex!). Both kathukonga — jobs differ!',
      },
      {
        kind: 'visual',
        heading: 'ESP32 vs UNO',
        code: '           UNO      ESP32\n CPU:      8b@16MHz  32b@240MHz×2\n RAM:      2KB       520KB\n Flash:    32KB      4MB\n WiFi:     ✗         ✓\n BT:       ✗         ✓\n Price:    ₹500      ₹300',
      },
      {
        kind: 'technical',
        heading: 'Important pins & cautions',
        list: [
          'ADC pins: GPIO32-39 (ADC1), GPIO0,2,4,12-15,25-27 (ADC2 — WiFi use time la conflict!).',
          'Strapping pins (boot behavior): GPIO0, 2, 5, 12, 15 — careful with pull-ups!',
          'Input-only pins: GPIO34-39.',
          'DAC: GPIO25, 26 (true analog voltage output!).',
          'Power: 3.3V logic ONLY — 5V signals damage! Level shifter needed for 5V modules.',
          'Deep sleep: 10µA — battery projects king!',
        ],
      },
      {
        kind: 'example',
        heading: 'Why ESP32 for IoT',
        body: 'Project: temperature logger to cloud.\n- UNO: no WiFi → need Ethernet shield or WiFi module extra + code complexity.\n- ESP32: WiFi built-in → 20 lines connect, MQTT publish, deep sleep between readings (battery life months!).\n\nWorld 10 la full IoT projects ESP32 la dhaan!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          '5V sensor direct connect — 3.3V logic damage! Level shifter / 3.3V compatible modules.',
          'Strapping pins random use — boot failures!',
          'ADC2 + WiFi simultaneously — conflict! ADC1 (32-39) use when WiFi active.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Spec compare',
      steps: [
        'ESP32 vs UNO table complete pannunga (5 rows minimum).',
        'ESP32 pinout image paaru — ADC pins, DAC pins, input-only pins mark.',
      ],
    },
    quiz: [
      {
        q: 'ESP32 cores?',
        options: ['1', '2 (dual-core)', '4', '8'],
        answer: 1,
        explain: 'Dual-core LX6 @ 240MHz.',
      },
      {
        q: 'ESP32 wireless features?',
        options: ['WiFi only', 'Bluetooth only', 'WiFi + Bluetooth', 'None'],
        answer: 2,
        explain: 'Both! WiFi b/g/n + BT Classic/BLE.',
      },
      {
        q: 'ESP32 logic voltage?',
        options: ['5V', '3.3V', 'Both safe', '12V'],
        answer: 1,
        explain: '3.3V only! 5V signals = damage risk.',
      },
      {
        q: 'ESP32 ADC resolution?',
        options: ['8-bit', '10-bit', '12-bit (0-4095)', '16-bit'],
        answer: 2,
        explain: '12-bit → 4096 levels.',
      },
    ],
  },

  // ---------------------------------------------------------- w6l4
  {
    id: 'w6l4',
    worldId: 'w6',
    title: 'GPIO: Digital Input & Output',
    minutes: 12,
    sections: [
      {
        kind: 'intro',
        heading: 'Pins = your hands',
        body: 'GPIO (General Purpose Input Output) = MCU oda fingers. LED on (output), button read (input) — first real interaction! pinMode, digitalWrite, digitalRead triad!',
      },
      {
        kind: 'explain',
        heading: 'Digital output',
        body: 'pinMode(pin, OUTPUT); → pin set as output.\ndigitalWrite(pin, HIGH); → 5V (UNO) / 3.3V (ESP32) on pin.\ndigitalWrite(pin, LOW); → 0V.\n\nLED circuit: pin → resistor (220Ω) → LED → GND. HIGH = on, LOW = off!\n\n pinMode(13, OUTPUT);\n digitalWrite(13, HIGH);  // LED ON\n digitalWrite(13, LOW);   // LED OFF',
      },
      {
        kind: 'analogy',
        heading: 'Light switch analogy',
        body: 'Pin = switch. HIGH = switch ON (current flows out). LOW = switch OFF. pinMode = "indha switch output-a input-a?" nu declaration!',
      },
      {
        kind: 'visual',
        heading: 'Button input + pull-up',
        code: ' 5V──[10kΩ]──┬── pin 2\n              │\n        [BTN]  │\n              │\n GND──────────┘\n\n No press: pull-up → HIGH (1)\n Press: pin→GND → LOW (0)\n\n (pin floating = random values!)',
      },
      {
        kind: 'technical',
        heading: 'Pull-up/pull-down + input',
        list: [
          'pinMode(pin, INPUT); digitalWrite(pin, HIGH); = INPUT_PULLUP (internal 20-50kΩ!).',
          'Pull-up: idle = HIGH, button to GND → press = LOW. (Inverted logic — remember!)',
          'Pull-down: idle = LOW, button to VCC → press = HIGH.',
          'Floating pin (no pull) = antenna — random HIGH/LOW noise!',
          'Debounce: mechanical contacts bounce (ms) → 10-50ms delay or library. Button count bugs killer!',
        ],
      },
      {
        kind: 'example',
        heading: 'Button LED toggle (full sketch)',
        body: 'const int BTN = 2, LED = 13;\nbool ledState = false, lastBtn = HIGH;\n\nvoid setup() {\n  pinMode(BTN, INPUT_PULLUP);\n  pinMode(LED, OUTPUT);\n}\n\nvoid loop() {\n  bool b = digitalRead(BTN);\n  if (b == LOW && lastBtn == HIGH) { // press edge\n    ledState = !ledState;\n    digitalWrite(LED, ledState);\n    delay(30);  // debounce\n  }\n  lastBtn = b;\n}',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Floating input — pull-up/pull-down MUST (random noise!).',
          'INPUT_PULLUP logic inverted expect — pressed = LOW!',
          'Debounce miss — one press = 5 counts!',
          'pinMode miss pannu — pin state undefined!',
        ],
      },
    ],
    task: {
      title: 'Mini task: First interaction',
      steps: [
        'LED blink sketch (no button): 500ms on/off D13.',
        'Button + LED toggle sketch type pannunga, simulate-a trace pannunga.',
        'Floating pin concept: pull-up illa na yenna aagum nu ezhudhunga.',
      ],
    },
    quiz: [
      {
        q: 'digitalWrite(pin, HIGH) = ?',
        options: ['0V', '5V (UNO)', 'Input mode', 'Analog'],
        answer: 1,
        explain: 'HIGH = supply voltage at the pin.',
      },
      {
        q: 'INPUT_PULLUP la button pressed reads?',
        options: ['HIGH', 'LOW', 'Random', 'Analog'],
        answer: 1,
        explain: 'Press connects pin to GND → LOW. Inverted!',
      },
      {
        q: 'Floating pin problem?',
        options: [
          'Burns out',
          'Random HIGH/LOW noise readings',
          'Stays HIGH always',
          'Stays LOW always',
        ],
        answer: 1,
        explain: 'No reference → picks up noise like an antenna. Pull resistor fixes!',
      },
    ],
  },

  // ---------------------------------------------------------- w6l5
  {
    id: 'w6l5',
    worldId: 'w6',
    title: 'Analog Input, ADC & DAC',
    minutes: 11,
    sections: [
      {
        kind: 'intro',
        heading: 'Real world → numbers',
        body: 'Temperature, light, sound = analog (continuous). MCU = digital brain. ADC = translator (analog voltage → number)! DAC = reverse. Intha lesson puriyama sensor projects kashtam!',
      },
      {
        kind: 'explain',
        heading: 'ADC conversion',
        body: 'ADC (Analog to Digital Converter): input voltage → integer.\n\nUNO: 10-bit ADC → 0-1023. Formula: reading = Vin × 1023 / Vref (Vref = 5V).\nExample: 2.5V → 2.5 × 1023/5 = 512.\n\nanalogRead(A0) → 0-1023 int.\nVoltage back: volts = reading × 5.0 / 1023.0;\n\nESP32: 12-bit → 0-4095 (0-3.3V range).\n\nResolution meaning: 10-bit = 1024 steps = 4.9mV per step (5V/1024).',
      },
      {
        kind: 'analogy',
        heading: 'Ruler analogy',
        body: 'ADC = ruler with marks: 10-bit = 1024 marks on 5V ruler (4.9mV apart). Voltage = yeng irukku nu measure. More bits = more marks = more precision!',
      },
      {
        kind: 'visual',
        heading: 'LDR divider → ADC',
        code: ' 5V──[LDR]──┬──[10kΩ]──GND\n             │\n             └── A0 (analogRead)\n\n Light ↑ → LDR resistance ↓\n → A0 voltage ↑ → reading ↑\n\n Map: reading < 300 = DARK!',
      },
      {
        kind: 'technical',
        heading: 'DAC & details',
        list: [
          'DAC: number → analog voltage. UNO: ILLA! ESP32: 2 channels (GPIO25/26, 8-bit).',
          'PWM = fake analog (duty cycle average — next lesson!).',
          'ADC speed: UNO ~10ksps (slow!), ESP32 faster. Audio processing needs speed.',
          'Reference voltage: UNO 5V default (AREF option). ESP32: internal, attenuations set range.',
          'Sensor types: LM35 (10mV/°C analog), LDR divider, potentiometer (direct divider!).',
        ],
      },
      {
        kind: 'example',
        heading: 'Potentiometer + conversion',
        body: 'int raw = analogRead(A0);        // 0-1023\nfloat volts = raw * 5.0 / 1023.0; // 0-5V\n\nPot middle: raw ≈ 512, volts ≈ 2.5V ✓\n\nLM35: temp = volts × 100;\n(10mV/°C → 0.27V = 27°C!)\n\nSerial.print(volts); → live sensor watch!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          '1023/1024 off-by-one confusion — reading × 5.0 / 1023.0 practical (or 1024 for exact span).',
          'UNO la analogWrite = ADC nu nenaikiradhu — analogWrite = PWM (different!).',
          '5V sensor on ESP32 ADC (3.3V max) — overrange damage! Divider needed.',
        ],
      },
    ],
    task: {
      title: 'Mini task: ADC lab',
      steps: [
        'raw=780 (UNO 5V) → volts calculate (3.81V).',
        'LM35 reads 0.31V → temperature? (31°C)',
        'ESP32 12-bit: 2048 raw → volts? (1.65V)',
      ],
    },
    quiz: [
      {
        q: 'UNO ADC max reading?',
        options: ['255', '511', '1023', '4095'],
        answer: 2,
        explain: '10-bit = 0-1023.',
      },
      {
        q: 'analogRead returns 512 (5V ref) → input voltage ≈ ?',
        options: ['1V', '2.5V', '3.3V', '5V'],
        answer: 1,
        explain: '512/1023 ≈ half of 5V = 2.5V.',
      },
      {
        q: 'DAC = ?',
        options: [
          'Digital → Analog converter',
          'Analog → Digital',
          'Data access',
          'Display adapter',
        ],
        answer: 0,
        explain: 'Number → voltage (ESP32 has true DAC!).',
      },
    ],
  },

  // ---------------------------------------------------------- w6l6
  {
    id: 'w6l6',
    worldId: 'w6',
    title: 'PWM (Pulse Width Modulation)',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Fake analog magic',
        body: 'True DAC illa (UNO)! Aana LED dim, motor speed control, servo — venum! PWM = digital pulses + DUTY CYCLE trick. Analog effect, digital hardware!',
      },
      {
        kind: 'explain',
        heading: 'Duty cycle concept',
        body: 'PWM = square wave, fast switching (UNO: ~490Hz/980Hz).\nDuty cycle = HIGH time / total time.\n\nanalogWrite(pin, value): 0-255 (8-bit).\n- 0 = always LOW (0% duty) → LED off\n- 127 ≈ 50% duty → half brightness\n- 255 = always HIGH (100%) → full on\n\nLED eye trick: 50% duty → eye sees "half brightness" (switching too fast to see!). Motor: average voltage effect.',
      },
      {
        kind: 'analogy',
        heading: 'Fan switch tapping analogy',
        body: 'Fan switch super-fast 50% time ON, 50% OFF → feel-a "half speed". Eye/motor smoothing the pulses. Real power = pulse average!',
      },
      {
        kind: 'visual',
        heading: 'Duty cycle patterns',
        code: ' 25%:  ‾|__|__|__|  (mostly off)\n 50%:  ‾‾|__‾‾|__|  (half)\n 75%:  ‾‾‾|_‾‾‾|_   (mostly on)\n\nanalogWrite(pin, 64);  // 25%\nanalogWrite(pin, 191); // 75%\n\nPWM pins UNO: 3,5,6,9,10,11 (diger ~)',
      },
      {
        kind: 'technical',
        heading: 'PWM uses',
        list: [
          'LED dimming / fading effects (breathing LED!).',
          'DC motor speed control (with driver transistor!).',
          'Servo control: 50Hz PWM, 1-2ms pulses → angle! (Servo library)',
          'Buzzer tones (frequency = PWM frequency!).',
          'Power converters (buck/boost — advanced!).',
          'UNO: 6 PWM pins (3,5,6,9,10,11). ESP32: 16 channels, any GPIO, LEDC API!',
        ],
      },
      {
        kind: 'example',
        heading: 'Breathing LED',
        body: 'void loop() {\n  // fade in\n  for (int v = 0; v <= 255; v += 5) {\n    analogWrite(9, v);\n    delay(15);\n  }\n  // fade out\n  for (int v = 255; v >= 0; v -= 5) {\n    analogWrite(9, v);\n    delay(15);\n  }\n}\n\nLoop = smooth breathe! 🌬️',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Non-PWM pin la analogWrite — no effect (D13!)!',
          'PWM = true analog voltage nu nenaikiradhu — pulses dhaan (average effect!)!',
          'Servo library + PWM pin conflict (timer sharing).',
        ],
      },
    ],
    task: {
      title: 'Mini task: PWM lab',
      steps: [
        'analogWrite value 128 → duty %? (50%). LED brightness prediction!',
        'Breathing LED sketch trace pannunga.',
        'UNO PWM pins list pannunga (6 pins!).',
      ],
    },
    quiz: [
      {
        q: 'analogWrite(pin, 127) ≈ duty cycle?',
        options: ['25%', '50%', '75%', '100%'],
        answer: 1,
        explain: '127/255 ≈ 50% duty.',
      },
      {
        q: 'PWM = ?',
        options: [
          'True analog output',
          'Fast digital pulses, average = analog effect',
          'Analog input method',
          'Serial protocol',
        ],
        answer: 1,
        explain: 'Digital switching trick — eye/motor sees average!',
      },
      {
        q: 'UNO PWM pin NOT in list?',
        options: ['3', '6', '13', '11'],
        answer: 2,
        explain: 'D13 has no PWM (it\'s the LED pin, digital only!).',
      },
    ],
  },

  // ---------------------------------------------------------- w6l7
  {
    id: 'w6l7',
    worldId: 'w6',
    title: 'Timers and Interrupts',
    minutes: 12,
    sections: [
      {
        kind: 'intro',
        heading: 'Background workers',
        body: 'delay(1000) = program FROZEN 1 second — wasteful! Timers = background counters, interrupts = "event alerts". Professional embedded = event-driven, not delay-driven!',
      },
      {
        kind: 'explain',
        heading: 'Timers',
        body: 'Timer = hardware counter, clock ticks count pannum (background, CPU free!).\n\nUNO: 3 timers (T0: 8-bit used by millis()!, T1: 16-bit, T2: 8-bit).\nOverflow: counter max reach → flag/interrupt. T0 8-bit @ 16MHz/64 = 1.024ms overflow → millis() base!\n\nUses: precise delays (millis(), micros()), PWM generation, event counting, periodic interrupts.',
      },
      {
        kind: 'analogy',
        heading: 'Doorbell vs staring analogy',
        body: 'Polling = door ulla staring ("visitor vandhaanga-la? vandhaanga-la?" — time waste!). Interrupt = doorbell (_normal work continue, bell ring → attend!). Efficiency = interrupts!',
      },
      {
        kind: 'visual',
        heading: 'Interrupt flow',
        code: ' main loop running...\n      |\n [INTERRUPT EVENT] (button/timeout)\n      |\n current step saved →\n [ISR runs] (FAST, short!)\n      |\n return → main continues\n\n setup(): attachInterrupt(\n   digitalPinToInterrupt(2),\n   myISR, FALLING);',
      },
      {
        kind: 'technical',
        heading: 'Interrupt rules (IMPORTANT!)',
        list: [
          'ISR = Interrupt Service Routine: short & fast ONLY! No delay(), no Serial (slow!).',
          'Shared variables with main code: MUST be volatile! (compiler cache thadukka)',
          'UNO external interrupts: D2, D3 (INT0, INT1). Modes: RISING, FALLING, CHANGE, LOW.',
          ' millis() inside ISR: works but frozen value (no tick updates).',
          ' volatile int count; — ISR increments, main reads. Data races: noInterrupts()/interrupts() guard multi-byte reads!',
        ],
      },
      {
        kind: 'example',
        heading: 'Button interrupt sketch',
        body: 'volatile int presses = 0;\n\nvoid setup() {\n  pinMode(2, INPUT_PULLUP);\n  attachInterrupt(digitalPinToInterrupt(2), onPress, FALLING);\n  Serial.begin(9600);\n}\n\nvoid onPress() {\n  presses++;   // ISR: short only!\n}\n\nvoid loop() {\n  Serial.println(presses);\n  delay(1000);  // main free to do other work!\n}',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'delay() inside ISR — system freeze!',
          'volatile miss — main loop never sees ISR changes (compiler optimizes read away)!',
          'Heavy work in ISR — other interrupts missed. Set flag in ISR, work in loop!',
        ],
      },
    ],
    task: {
      title: 'Mini task: Event thinking',
      steps: [
        'Button count: polling version vs interrupt version differences list.',
        'ISR rules 3 ezhudhunga (short, volatile, no delay).',
      ],
    },
    quiz: [
      {
        q: 'delay(1000) problem?',
        options: [
          'Nothing',
          'CPU blocked — nothing else runs',
          'Crashes',
          'Uses no CPU',
        ],
        answer: 1,
        explain: 'Busy wait = frozen program. Timers/interrupts better!',
      },
      {
        q: 'ISR inside best practice?',
        options: [
          'Long processing',
          'Short & fast (set flags)',
          'delay() usage',
          'Serial.print debugging',
        ],
        answer: 1,
        explain: 'ISR minimal — flag + return. Work in main loop.',
      },
      {
        q: 'ISR shared variable needs?',
        options: ['static', 'const', 'volatile', 'unsigned'],
        answer: 2,
        explain: 'volatile stops compiler optimization of shared variables!',
      },
      {
        q: 'UNO external interrupt pins?',
        options: ['Any pin', 'D2, D3', 'A0, A1', 'D13 only'],
        answer: 1,
        explain: 'INT0 = D2, INT1 = D3.',
      },
    ],
  },

  // ---------------------------------------------------------- w6l8
  {
    id: 'w6l8',
    worldId: 'w6',
    title: 'First Projects: Blink, Button & Sensors',
    minutes: 12,
    sections: [
      {
        kind: 'intro',
        heading: 'Graduation time!',
        body: 'World 6 concepts combine panni real sketches ezhudhuvom: blink (hello world), button control, sensor read. Intha 3 patterns = 80% of embedded programs!',
      },
      {
        kind: 'explain',
        heading: 'Sketch anatomy',
        body: 'Every Arduino sketch:\n\nvoid setup() { } → runs ONCE at power/reset. pinMode, Serial.begin here.\nvoid loop() { } → repeats FOREVER. Main logic here.\n\nCompiled C++ with auto-generations (int main ulla call pannudhu). #include not needed for core functions!',
      },
      {
        kind: 'analogy',
        heading: 'Restaurant pattern analogy',
        body: 'setup = shop open prep (once). loop = customer serve (repeat till close!). Same structure ellaam sketch ulla — naama logic mattum fill pannanum!',
      },
      {
        kind: 'visual',
        heading: 'Blink (the classic!)',
        code: 'void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}\n\n= LED on 1s, off 1s forever!',
      },
      {
        kind: 'technical',
        heading: 'Pattern 2: Button → LED',
        list: [
          'INPUT_PULLUP button (D2), LED (D13).',
          'Toggle pattern: edge detect (HIGH→LOW transition) + debounce.',
          'Direct follow pattern: pressed = LED ON, released = OFF (simpler!).',
        ],
      },
      {
        kind: 'example',
        heading: 'Pattern 3: Sensor read + alert',
        body: 'const int LDR = A0, LED = 13;\n\nvoid setup() {\n  pinMode(LED, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int light = analogRead(LDR);\n  Serial.println(light);\n  if (light < 300) {      // dark!\n    digitalWrite(LED, HIGH);  // night lamp\n  } else {\n    digitalWrite(LED, LOW);\n  }\n  delay(200);\n}\n\n= automatic night lamp core (Project p2!).\n\nBonus: millis() blink without delay:\nif (millis() - last > 500) { toggle; last = millis(); }',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Serial.begin miss — monitor empty!',
          'Serial monitor baud mismatch (9600 vs 115200) — garbage!',
          'delay() ulla sensor read freeze — millis() pattern better!',
          'Upload error: correct board + port select in IDE!',
        ],
      },
    ],
    task: {
      title: 'Mini task: Sketch author',
      steps: [
        'Blink sketch type + trace (LED timing prediction).',
        'Night lamp sketch trace: light=250 → LED state? (ON - dark!)',
        'millis() blink pattern oru line la explain.',
      ],
    },
    quiz: [
      {
        q: 'setup() runs?',
        options: ['Every loop', 'Once at start', 'Never', 'On interrupt'],
        answer: 1,
        explain: 'One-time init. loop() repeats forever.',
      },
      {
        q: 'light=250, threshold 300 → LED?',
        options: ['ON (dark side)', 'OFF', 'Blink', 'Error'],
        answer: 0,
        explain: '250 < 300 → dark → night lamp ON!',
      },
      {
        q: 'Non-blocking blink uses?',
        options: ['delay()', 'millis() timing', 'while loop', 'interrupt only'],
        answer: 1,
        explain: 'millis() check = CPU free for other tasks!',
      },
    ],
  },
];

export const world6Boss: QuizQuestion[] = [
  {
    q: 'BOSS: UNO vs ESP32 — RAM ratio ≈ ?',
    options: ['1:10', '1:100', '1:260 (2KB vs 520KB)', 'Same'],
    answer: 2,
    explain: '520KB / 2KB = 260×! ESP32 = IoT power.',
  },
  {
    q: 'BOSS: INPUT_PULLUP button pressed → ?',
    options: ['HIGH', 'LOW', 'Floating', 'Analog'],
    answer: 1,
    explain: 'Button to GND: press → LOW (inverted logic!).',
  },
  {
    q: 'BOSS: analogRead = 1023 (UNO) → voltage?',
    options: ['2.5V', '3.3V', '5V', '0V'],
    answer: 2,
    explain: 'Max reading = full reference = 5V.',
  },
  {
    q: 'BOSS: analogWrite(9, 64) ≈ duty?',
    options: ['25%', '50%', '75%', '100%'],
    answer: 0,
    explain: '64/255 ≈ 25%.',
  },
  {
    q: 'BOSS: ISR golden rules?',
    options: [
      'Long code OK',
      'Short + fast + volatile shared vars',
      'delay() inside fine',
      'Serial.print inside fine',
    ],
    answer: 1,
    explain: 'ISR minimal work — flags only, heavy work in loop!',
  },
  {
    q: 'BOSS: LDR + 10k divider, dark = high resistance → A0 voltage?',
    options: ['High', 'Low', 'Same', 'Undefined'],
    answer: 1,
    explain: 'LDR on top (5V side): high resistance → less voltage at junction → LOW. (Circuit layout matters — trace it!)',
  },
  {
    q: 'BOSS: 5V sensor output to ESP32 GPIO — safe?',
    options: ['Yes always', 'No! 3.3V logic — level shift/divider needed', 'Only digital', 'Only analog'],
    answer: 1,
    explain: 'ESP32 pins NOT 5V tolerant — protect with divider/shifter!',
  },
  {
    q: 'BOSS: millis() pattern advantage over delay()?',
    options: [
      'More accurate timing only',
      'Non-blocking — loop does other work too',
      'Uses less memory',
      'Auto debounce',
    ],
    answer: 1,
    explain: 'Non-blocking multitasking within loop()!',
  },
];

// ============================================================
// EMBEDQUEST — WORLD 8: SENSORS & PROTOCOLS
// Sensor basics, UART, SPI, I2C, CAN + comparison, practical
// sensor code (HC-SR04, DHT11, LM35).
// ============================================================
import type { Lesson, QuizQuestion } from '../lib/types';

export const world8Lessons: Lesson[] = [
  // ---------------------------------------------------------- w8l1
  {
    id: 'w8l1',
    worldId: 'w8',
    title: 'Sensors — MCU oda Kanna & Mookku',
    minutes: 9,
    sections: [
      {
        kind: 'intro',
        heading: 'MCU ku ulagam eppadi theriyum?',
        body: 'Microcontroller ku kannu illa, mookku illa. Aana room temperature, distance, light — ellaam adhukku theriyum. Epdi? Sensors. Indha lesson la sensors universe-a paakalam — enna type, epdi work aagum, epdi select pannanum.',
      },
      {
        kind: 'explain',
        heading: 'Sensor na enna?',
        body: 'Sensor = physical quantity (heat, light, distance, motion) va electrical signal-a maathura device. Idhu dhaan transducer concept: one form of energy → another form.\n\nTwo output families:\n1. ANALOG output: continuous voltage. Example: LM35 temperature → 10mV per degree. MCU ku ADC (analog-to-digital converter) venu — World 6 la analogRead() kathutom.\n2. DIGITAL output: HIGH/LOW or a digital protocol (UART/I2C/SPI). Example: HC-SR04 distance → echo pulse width; DHT11 → own serial protocol.\n\nSensor select pannum bodhu paakanum: range (measurement limits), resolution (smallest change detectable), accuracy (how close to true), interface (analog/digital), voltage (3.3V or 5V logic!).',
      },
      {
        kind: 'analogy',
        heading: 'Human senses analogy',
        body: 'Un body la sensors full irukku: eye = light sensor, skin = temperature sensor, ear = sound sensor, nose = chemical sensor. Brain (MCU) ellaam process pannum. Sensors data kudukum, brain decide pannum, hands/legs (actuators) react pannum. Robot body = same architecture.',
      },
      {
        kind: 'visual',
        heading: 'Sense → Think → Act loop',
        code: ' [SENSORS]      [MCU]       [ACTUATORS]\n LM35  temp --> compare     --> fan ON/OFF\n HC-SR04 dist-> distance    --> buzzer\n LDR   light --> threshold   --> lamp relay\n DHT11 hum  --> log          --> display',
      },
      {
        kind: 'technical',
        heading: 'Common sensors quick map',
        list: [
          'LM35: temperature, analog, 10mV/°C.',
          'LDR (photoresistor): light, analog (voltage divider with resistor).',
          'HC-SR04: ultrasonic distance 2cm-400cm, digital trigger+echo.',
          'DHT11: temperature + humidity, digital single-wire, 1 reading/second max.',
          'MPU6050: accelerometer + gyroscope, I2C interface.',
          'PIR (HC-SR501): motion detect, digital HIGH/LOW output.',
        ],
      },
      {
        kind: 'example',
        heading: 'Interface decision example',
        body: 'Project: automatic fan (temperature based).\n- LM35 (analog): analogRead(A0) → voltage → temperature. Simple, but one analog pin per sensor.\n- DHT11 (digital): library read → temp + humidity 2-in-1. Aana 1 second ku mela update mudiyadhu.\n\nDecision rule: continuous fast readings venum na analog/simple digital. Multiple values or noisy environment na protocol-based digital sensors (I2C) better — wiring konjam, data clean.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          '5V sensor output direct-a 3.3V MCU (ESP32) ku connect pannuradhu — voltage divider/level shifter venu.',
          'Range miss: sensor 0-50°C support pannum, nee 100°C measure panren nu nenaikiradhu.',
          'Accuracy vs resolution confusion: resolution = smallest step, accuracy = truth distance. Rendu different!',
          'Sensor without datasheet connect pannuradhu — pin order, voltage range, wiring ellaam datasheet la dhaan.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Sensor shortlist',
      steps: [
        '"Automatic plant watering" project ku sensors list pannunga (moisture, temperature...) — minimum 3.',
        'Ovvonrukum analog-a digital-a nu classify panni, interface (ADC / digital pin / I2C) ezhudhunga.',
        'Oru sensor datasheet open panni, range + voltage line find pannunga.',
      ],
    },
    quiz: [
      {
        q: 'Sensor oda basic job?',
        options: [
          'Physical quantity → electrical signal',
          'Electrical signal → mechanical motion',
          'Data store pannuradhu',
          'Internet connect pannuradhu',
        ],
        answer: 0,
        explain: 'Sensor converts physical world (heat/light/distance) into electrical signals MCU can read.',
      },
      {
        q: 'Analog sensor output eppadi MCU la read aagum?',
        options: ['digitalRead', 'analogRead (ADC)', 'Serial.read', 'WiFi'],
        answer: 1,
        explain: 'Analog = continuous voltage → ADC convert panni number aakum. analogRead() 0-1023 (10-bit) kudukkum.',
      },
      {
        q: 'Resolution na enna?',
        options: [
          'Measure panna mudira smallest change',
          'Sensor price',
          'Sensor size',
          'Max voltage',
        ],
        answer: 0,
        explain: 'Resolution = sensor detect panna mudira smallest difference. Accuracy = real value oda closeness.',
      },
      {
        q: 'DHT11 oda reading rate limit?',
        options: ['1000/second', '100/second', '1 per second', '1 per minute'],
        answer: 2,
        explain: 'DHT11 sampling max ~1Hz. Fast reading venum na other sensors (LM35, SHT31) use pannunga.',
      },
    ],
  },

  // ---------------------------------------------------------- w8l2
  {
    id: 'w8l2',
    worldId: 'w8',
    title: 'UART — Serial Communication',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Serial Monitor behind the scenes',
        body: 'Serial.begin(9600) ezhudhi serial monitor la data paathirukom — aana adhu eppadi work aagudhu? Two devices electronic-a eppadi pesuvanga? Indha lesson la UART — embedded world oda oldest and most used communication.',
      },
      {
        kind: 'explain',
        heading: 'UART basics',
        body: 'UART (Universal Asynchronous Receiver/Transmitter) = asynchronous serial communication. Asynchronous na — clock wire illa! Rendu devices baud rate agree pannuvanga, timing-a adhaara predict pannuvanga.\n\nWires:\n- TX (transmit): data send wire\n- RX (receive): data receive wire\n- GND: common ground — MUST! Voltage relative-a dhaan.\n\nConnection rule: Device A TX → Device B RX, Device A RX → Device B TX (crossover).\n\nBaud rate = bits per second. 9600 baud common. Frame: 1 start bit (LOW) + 5-9 data bits (LSB first, usually 8) + optional parity + 1-2 stop bits (HIGH). "9600 8N1" = 9600 baud, 8 data bits, No parity, 1 stop bit.',
      },
      {
        kind: 'analogy',
        heading: 'Post box analogy',
        body: 'UART = post office letter. Clock sync illama, letter envelope format fixed (start, data, stop). Rendu post offices (devices) ore schedule la work pannanum (baud rate agree). Speed mismatch na letters garbled-a aagum — oru word kulla rendu letters overlap maari noise varum.',
      },
      {
        kind: 'visual',
        heading: 'UART frame + wiring',
        code: 'Frame (8N1):\n idle  START  D0 D1 D2 D3 D4 D5 D6 D7  STOP\n HIGH  LOW   <---- 8 data bits -------> HIGH\n\nWiring:\n  MCU A TX -----> MCU B RX\n  MCU A RX <----- MCU B TX\n  MCU A GND <--> MCU B GND',
      },
      {
        kind: 'technical',
        heading: 'UART practical notes',
        list: [
          'Arduino: Serial.begin(9600); Serial.print("Hi"); Serial.read() for receive.',
          'Hardware UART pins limited (Uno: pin 0/1). SoftwareSerial library vachi other pins la second UART create pannalam (slower, less reliable).',
          'USB-serial bridge chip (CH340, CP2102, FT232): MCU UART ↔ PC USB conversion. Un board la irukku.',
          'Distance: short range (few meters max). Long distance na RS-485 (differential, 1200m).',
          'Point-to-point dhaan — one TX talks to one RX. Multi-device network illa.',
        ],
      },
      {
        kind: 'example',
        heading: 'Baud mismatch koods',
        body: 'MCU side: Serial.begin(9600)\nPC monitor side: 115200\n\nResult: "Hello" → "†x9#~.." random symbols.\n\nWhy: MCU bit duration = 1/9600 s ≈ 104µs. PC expecting 1/115200 ≈ 8.7µs. 12x speed mismatch → sampling wrong positions → garbage.\n\nFix: both sides same baud. Golden debug step: "garbage serial output = baud mismatch 90%".',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'TX-TX, RX-RX direct connect pannuradhu — crossover venu (TX→RX).',
          'GND common connect pannadhaama data expect pannuradhu — voltage reference illama data meaningless.',
          'Baud rate different values use pannuradhu — garbage output.',
          'Pin 0/1 (hardware UART) la same time USB programming + external device connect pannuradhu — upload fail aagum.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Serial talk',
      steps: [
        'Arduino IDE (illa Tinkercad) la Serial.begin(9600) + Serial.println("Vanakkam") upload pannunga. Serial monitor confirm pannunga.',
        'Baud monitor la 115200 ku maathi — garbage pattern note pannunga. Adha document pannunga.',
        'UART frame diagram notebook la draw panni, start/stop bit role label pannunga.',
      ],
    },
    quiz: [
      {
        q: 'UART la clock wire irukka?',
        options: ['Illa — async, baud rate timing', 'Irukku — SCK', 'Irukku — SCL', 'Battery wire'],
        answer: 0,
        explain: 'UART asynchronous — clock illa. Rendu sides baud rate agree pannitu timing predict pannuvanga.',
      },
      {
        q: 'Device A TX connect pannanum Device B oda?',
        options: ['TX', 'RX', 'GND', 'VCC'],
        answer: 1,
        explain: 'Crossover rule: TX (send) → RX (receive). Same wire types connect pannina communication fail.',
      },
      {
        q: '9600 8N1 meaning?',
        options: [
          '9600 baud, 8 data bits, no parity, 1 stop bit',
          '9600 bytes, 8 nodes',
          '9 pins, 8 nets',
          '9600 mV, 8 mA',
        ],
        answer: 0,
        explain: 'Standard notation: baud / data bits / parity / stop bits. 8N1 most common config.',
      },
      {
        q: 'Serial monitor la garbage symbols → first suspect?',
        options: ['Baud rate mismatch', 'CPU failure', 'WiFi issue', 'Battery dead'],
        answer: 0,
        explain: 'Garbage = timing mismatch = baud rate difference. Both sides same baud set pannunga.',
      },
      {
        q: 'GND wire UART la evlo important?',
        options: [
          'Optional',
          'MUST — common voltage reference illama data meaningless',
          'Only long wires',
          'Only 5V systems',
        ],
        answer: 1,
        explain: 'Voltage is relative. Without common GND, HIGH/LOW levels different reference la measure aagum → communication breaks.',
      },
    ],
  },

  // ---------------------------------------------------------- w8l3
  {
    id: 'w8l3',
    worldId: 'w8',
    title: 'SPI — Fast Synchronous Bus',
    minutes: 9,
    sections: [
      {
        kind: 'intro',
        heading: 'Speed venum na SPI',
        body: 'SD card, TFT display, flash memory — ivanga ellaam UART la pesa maattanga, romba fast data transfer venum. Adhu ku solution: SPI. Indha lesson la SPI architecture-a paakalam.',
      },
      {
        kind: 'explain',
        heading: 'SPI basics',
        body: 'SPI (Serial Peripheral Interface) = synchronous full-duplex communication. Synchronous na — dedicated clock line irukku! Master clock generate pannum, data clock edges la move aagum. No timing agreement problem.\n\n4 wires:\n- SCK (clock): master generate\n- MOSI (Master Out Slave In): master → slave data\n- MISO (Master In Slave Out): slave → master data\n- CS/SS (chip select): one per slave — LOW = active\n\nFull-duplex na: MOSI + MISO simultaneously — data send pannum bodhu receive um pannalam. Shift register mechanism: rendu sides oda shift registers exchange bits at clock edges.',
      },
      {
        kind: 'analogy',
        heading: 'Two-tin-can phone with metronome',
        body: 'SPI = rendu per wire phone (MOSI one way, MISO other way — full duplex!) plus a metronome (SCK). Metronome beat la talk aagum, beat la listen — perfect sync. CS = "indha phone un phone dhaan" nu oru private line selector. Other slaves listen stop.',
      },
      {
        kind: 'visual',
        heading: 'SPI wiring with 2 slaves',
        code: 'MASTER                SLAVE1   SLAVE2\n SCK  ---------------> SCK      SCK\n MOSI ---------------> MOSI     MOSI\n MISO <--------------- MISO     MISO\n CS1  ---[active LOW]--> CS      (high)\n CS2  ---------------> (high)   CS\n GND  ---------------- common',
      },
      {
        kind: 'technical',
        heading: 'SPI key facts',
        list: [
          'Master always drives SCK — slave never talks unless master enables and clocks.',
          'CS per device: Ella slave ku oru CS pin. Active slave CS=LOW, others HIGH.',
          'Modes 0-3 (CPOL + CPHA): clock idle level + edge sampling combination. Device datasheet la mode specify pannum (most common mode 0).',
          'Speed: MHz range — 10MHz+ common (Uno max 8MHz = F_CPU/2). UART 9600 bps vs SPI 8,000,000 bps — huge difference!',
          'No addressing/address ACK in protocol — CS wiring dhaan device selection.',
        ],
      },
      {
        kind: 'example',
        heading: 'Where SPI shines',
        body: 'SD card logging: 512-byte block write at SPI 4MHz = fast. UART la idhe data 9600 baud la anupina ~0.5 seconds per block.\n\nArduino code pattern (educational):\n#include <SPI.h>\nSPI.begin();\nSPI.beginTransaction(SPISettings(4000000, MSBFIRST, SPI_MODE0));\ndigitalWrite(CS, LOW);\nSPI.transfer(0x9F);      // send command byte\nbyte id = SPI.transfer(0); // read response\n digitalWrite(CS, HIGH);\nSPI.endTransaction();\n\nPattern: CS LOW → exchange bytes → CS HIGH. Idhu dhaan SPI transaction rhythm.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'CS pin float (pull-down resistor illa) — slave random-a active aagum. Pull-up recommended.',
          'Mode wrong (0 vs 3) — data bits shift by half clock, garbage data.',
          'Shared lines (SCK/MOSI/MISO) la one CS HIGH leave pannadha ignored — bus contention, bus damage possible.',
          'Speed too high for wire length — signal integrity issues, reduce clock or shorten wires.',
        ],
      },
    ],
    task: {
      title: 'Mini task: SPI map',
      steps: [
        '4 SPI wires role note pannunga (SCK, MOSI, MISO, CS) — un words la.',
        'SPI vs UART speed compare table ezhudhunga (baud numbers use pannunga).',
        'CS working principle 2 lines la ezhudhunga (LOW = active concept).',
      ],
    },
    quiz: [
      {
        q: 'SPI full-duplex enna meaning?',
        options: [
          'Simultaneous send + receive (MOSI + MISO)',
          'Two masters',
          'Double speed',
          'Two power supplies',
        ],
        answer: 0,
        explain: 'Full-duplex = MOSI (master→slave) and MISO (slave→master) parallel-a work pannum.',
      },
      {
        q: 'SPI slave selection eppadi?',
        options: [
          'Address byte anupi',
          'CS pin LOW active',
          'Baud rate change',
          'Auto-detect',
        ],
        answer: 1,
        explain: 'SPI protocol la addressing illa. Ovvonru slave ku CS pin — LOW pannina active, HIGH = ignored.',
      },
      {
        q: 'SPI la clock line name?',
        options: ['SCL', 'SCK', 'TX', 'CLK-GND'],
        answer: 1,
        explain: 'SPI clock = SCK (Serial Clock). I2C clock = SCL. Different bus, different names!',
      },
      {
        q: 'SPI mode misconfigure (CPOL/CPHA wrong) → result?',
        options: [
          'Communication fail / garbage data',
          'Speed doubles',
          'Nothing happens',
          'Power draw increase',
        ],
        answer: 0,
        explain: 'Mode = sampling edge. Wrong mode = wrong bit sampling = garbage. Datasheet la mode check pannunga.',
      },
    ],
  },

  // ---------------------------------------------------------- w8l4
  {
    id: 'w8l4',
    worldId: 'w8',
    title: 'I2C — Two-Wire Multi-Device Bus',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Two wires, many devices',
        body: 'Ore 2 wires la LCD, RTC, gyro sensor, EEPROM ellam connect panna mudiyuma? I2C la mudiyum! Embedded world la most convenient bus — indha lesson la deep dive.',
      },
      {
        kind: 'explain',
        heading: 'I2C basics',
        body: 'I2C (Inter-Integrated Circuit, "I-squared-C") = synchronous, multi-device, 2-wire bus.\n\nWires:\n- SDA (data): bidirectional data line\n- SCL (clock): master driven clock\n\nKey concepts:\n1. Open-drain + pull-up resistors: lines HIGH aaga pull-ups venu (usually 4.7k). Nobody drives HIGH directly — devices pull LOW dhaan. Idhu dhaan bus sharing safety.\n2. Addressing: slave devices ku 7-bit address (0-127). Master adha specify panni talk pannum. Same address conflict avoid pannunga (example MPU6050 0x68/0x69 selectable).\n3. ACK/NACK: receiver every byte apram 1-bit acknowledgement kudukkum — delivery confirmation!\n4. Speeds: 100kHz standard, 400kHz fast, 1MHz fast+.\n\nCommon addresses: LCD1602 backpack = 0x27/0x3F, DS1307 RTC = 0x68, MPU6050 = 0x68.',
      },
      {
        kind: 'analogy',
        heading: 'Class roll-call analogy',
        body: 'I2C = classroom. Teacher (master) roll number sollitu pesum ("0x27, nee eppadi irukka?"). Andha student dhaan answer pannum (ACK + data). Others silent. Two shared wires dhaan — data line (SDA) and rhythm line (SCL). Roll number (address) illama yaarum pesadhu. Teacher question, student answer, teacher nod (ACK) — conversation structured.',
      },
      {
        kind: 'visual',
        heading: 'I2C bus with 3 devices',
        code: '        VCC\n         |\n        [4.7k]  [4.7k]\n         |        |\n SDA ----+--------+----+----+----\n SCL ----+--------+----+----+----\n         |        |    |    |\n      MASTER   LCD 0x27  RTC 0x68\n  (2 pull-ups total, whole bus)',
      },
      {
        kind: 'technical',
        heading: 'I2C practical notes',
        list: [
          'Arduino Wire library: Wire.begin(); Wire.beginTransmission(0x27); Wire.write(0x00); Wire.endTransmission();',
          'Read: Wire.requestFrom(0x27, 2); Wire.read() x2.',
          'I2C scanner sketch = unknown address find tool. Embedded engineer MUST have.',
          'Pull-up resistors: breakout boards (LCD backpack) la built-in. 3+ boards connect pannina resistance too low — remove extra pull-ups or smaller value.',
          'Clock stretching: slave busy na SCL LOW hold pannum — master wait pannum. Slow slaves handle panna mechanism.',
        ],
      },
      {
        kind: 'example',
        heading: 'LCD I2C transaction',
        body: '#include <Wire.h>\n#include <LiquidCrystal_I2C.h>\n\nLiquidCrystal_I2C lcd(0x27, 16, 2);\n\nvoid setup() {\n  Wire.begin();\n  lcd.init();\n  lcd.backlight();\n  lcd.print("Vanakkam!");\n}\n\nBehind the scenes: Wire la bytes move — address 0x27 + data bytes. LCD backpack MCU (PCF8574) adhu LCD pins convert pannum. Naama 2 wires (SDA/SCL) + 5V + GND mattum dhaan!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Pull-up resistors miss pannuradhu — lines floating, random errors. Bare I2C device = pull-ups MUST.',
          'Address wrong (0x27 vs 0x3F) — LCD no response. Scanner run pannunga.',
          'Same address devices ore bus la — conflict. Address pins/jumpers use panni change pannunga.',
          '3.3V device + 5V bus direct — level shifting venu (or 3.3V-compatible devices select).',
          'SDA/SCL swap — nothing works. Pin labels double check.',
        ],
      },
    ],
    task: {
      title: 'Mini task: I2C explorer',
      steps: [
        'I2C scanner code (Arduino IDE examples la) run panni, connected devices addresses note pannunga.',
        'Common I2C addresses 5 list pannunga (LCD, RTC, MPU6050...).',
        'Pull-up resistor role 2 lines la ezhudhunga.',
      ],
    },
    quiz: [
      {
        q: 'I2C wires?',
        options: ['TX/RX', 'SDA/SCL', 'MOSI/MISO', 'D+/D-'],
        answer: 1,
        explain: 'I2C = SDA (data) + SCL (clock). UART = TX/RX, SPI = SCK/MOSI/MISO/CS.',
      },
      {
        q: 'I2C device address size (typical)?',
        options: ['8-bit', '7-bit', '16-bit', '32-bit'],
        answer: 1,
        explain: 'Standard I2C = 7-bit address (0-127). 10-bit mode exists but rare.',
      },
      {
        q: 'ACK bit role?',
        options: [
          'Receiver "got it" confirmation',
          'Error code',
          'Clock speed indicator',
          'Address extension',
        ],
        answer: 0,
        explain: 'Every byte apram receiver ACK kudukkum — data delivered confirmation. NACK = problem/not ready.',
      },
      {
        q: 'I2C lines idle state?',
        options: [
          'HIGH (pull-ups)',
          'LOW',
          'Floating',
          'Alternating',
        ],
        answer: 0,
        explain: 'Open-drain bus + pull-ups = idle HIGH. Devices pull LOW dhaan to signal. This prevents bus conflicts.',
      },
      {
        q: 'LCD1602 I2C backpack common address?',
        options: ['0x08', '0x27 or 0x3F', '0xFF', '0x50'],
        answer: 1,
        explain: 'PCF8574-based backpacks = 0x27 (most) or 0x3F (some). Scanner confirms.',
      },
    ],
  },

  // ---------------------------------------------------------- w8l5
  {
    id: 'w8l5',
    worldId: 'w8',
    title: 'CAN + Protocol Comparison',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Car kulla enna bus?',
        body: 'Modern car kulla 70+ MCUs pesitu irukkum — engine, brakes, airbag, dashboard. Rendu wires la ellaam connect? CAN bus dhaan. Indha lesson la CAN basics + ella protocols compare panni full picture paakalam.',
      },
      {
        kind: 'explain',
        heading: 'CAN bus basics',
        body: 'CAN (Controller Area Network) = robust multi-master serial bus, automotive/industrial design.\n\nKey features:\n1. Differential signaling: CANH + CANL rendu wires. Noise maari voltage shift rendu wires layum same — difference same-a irukkum. Noise immunity excellent!\n2. Multi-master: ella nodes equal rights — yaarum venum bodhu send pannalam.\n3. Arbitration: ore time la 2 nodes talk pannina, lower ID wins (dominant bit 0 = wins). Message priority by ID. Collision = no data loss, automatic retry.\n4. Message-based: node address illa — message ID + data (up to 8 bytes classic CAN).\n5. Speed/distance trade-off: 1Mbps @ 40m, 125kbps @ 500m.\n6. Built-in error detection: CRC, ACK slot, error counters.\n\nTerminator: bus ends la 120-ohm resistors — signal reflections prevent.',
      },
      {
        kind: 'analogy',
        heading: 'Ambulance priority analogy',
        body: 'CAN bus = one shared road. Ella vehicles (nodes) venum bodhu enter pannalam (multi-master). Aana ambulance (lower ID = high priority) first go. Traffic jam (collision) aana priority order automatically resolve — accident (data corruption) illa. Arbitration silent-a, fast-a handle aagum.',
      },
      {
        kind: 'visual',
        heading: 'CAN bus topology',
        code: ' CANH --+------+------+------+\n        |      |      |      |\n CANL --+------+------+------+\n        |      |      |      |\n     [120R] ENGINE  ABS  DASH\n      term   ECU    ECU   ECU\n (120R at BOTH ends of the bus)',
      },
      {
        kind: 'technical',
        heading: 'Protocol comparison table',
        list: [
          'UART: 2 wires (TX/RX+GND), async, point-to-point, 9600-115200 typical, debug/GPS/Bluetooth modules.',
          'SPI: 4+ wires, sync clock, full duplex, MHz speed, fast peripherals (SD, display, flash).',
          'I2C: 2 wires (SDA/SCL), sync, multi-device addressing, 100k-1MHz, sensors/LCD/RTC.',
          'CAN: 2 wires differential, multi-master, arbitration, 125k-1Mbps, automotive/industrial.',
          'Selection rule: 1 device = UART; few fast devices = SPI; many small sensors = I2C; harsh environment multi-node = CAN.',
        ],
      },
      {
        kind: 'example',
        heading: 'Decision scenario',
        body: 'Project 1: temperature logger with SD card → SD card = SPI (speed venum).\nProject 2: LCD + RTC + 2 sensors → I2C (2 wires, addressing easy).\nProject 3: PC debugging output → UART (simple, universal).\nProject 4: 5 nodes robot arm communication with noise (motors nearby) → CAN (differential, robust).\n\nIdhu dhaan protocol selection muscle: wires, speed, distance, noise, device count → answer automatically varum.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'CAN la terminator resistors miss pannuradhu — reflections, errors. Both ends 120-ohm MUST.',
          'Long distance la high speed protocol use pannuradhu — signal integrity kill.',
          'I2C la same address conflict — scanner + address jumper check.',
          'SPI slave count adhigama — CS pin shortage. I2C switch pannunga or CS expander use.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Protocol selector',
      steps: [
        '4 scenario ku correct protocol select pannunga + reason: (1) GPS module read, (2) OLED display, (3) tractor engine network, (4) flash memory chip.',
        'Comparison table notebook la draw panni (UART/SPI/I2C/CAN — wires, sync/async, speed, use case).',
        'CAN differential noise immunity principle 2 lines la ezhudhunga.',
      ],
    },
    quiz: [
      {
        q: 'CAN arbitration rule?',
        options: [
          'Higher ID wins',
          'Lower ID wins (higher priority)',
          'Random',
          'First connected wins',
        ],
        answer: 1,
        explain: 'Dominant bit (0) = wins. Lower ID = more leading 0s = wins arbitration. Priority by ID value.',
      },
      {
        q: 'CAN noise immunity reason?',
        options: [
          'Differential signaling (CANH-CANL difference)',
          'High voltage',
          'Thick wires',
          'Shielded plastic',
        ],
        answer: 0,
        explain: 'Noise affects both wires equally; receiver reads difference. Common noise cancels out.',
      },
      {
        q: 'Fastest protocol (MCU la, short distance)?',
        options: ['UART 9600', 'SPI 8MHz', 'I2C 100kHz', 'CAN 125kbps'],
        answer: 1,
        explain: 'SPI = MHz scale (8MHz on Uno). UART/I2C/CAN = 10-100x slower.',
      },
      {
        q: 'Many small sensors, minimal wires — best bus?',
        options: ['SPI', 'UART', 'I2C', 'CAN'],
        answer: 2,
        explain: 'I2C = 2 wires + addressing + ACK. Sensor-heavy projects oda default choice.',
      },
    ],
  },

  // ---------------------------------------------------------- w8l6
  {
    id: 'w8l6',
    worldId: 'w8',
    title: 'Real Sensors — Hands On Code',
    minutes: 12,
    sections: [
      {
        kind: 'intro',
        heading: 'Three sensors, three styles',
        body: 'Indha lesson la 3 popular sensors full code paakaporoam: HC-SR04 (digital pulse), LM35 (analog), DHT11 (library protocol). Note: idhu educational simulation — code Tinkercad/Proteus/Arduino IDE la run pannunga. Every line explain pannuvom.',
      },
      {
        kind: 'explain',
        heading: 'HC-SR04 ultrasonic distance',
        body: 'How it works:\n1. TRIG pin la 10µs HIGH pulse → sensor 40kHz sound burst send\n2. Sound travels, object hit, bounce back\n3. ECHO pin goes HIGH for the round-trip time\n4. Distance = pulse duration µs / 58 = centimeters\n\nWhy /58? Sound speed ≈ 343 m/s = 0.0343 cm/µs. Round trip = 2x distance. So distance = t × 0.0343 / 2 = t / 58.3. Yes, the 58 is physics!',
      },
      {
        kind: 'analogy',
        heading: 'Bat echo analogy',
        body: 'Bat irubil — sound throw panni, bounce back time measure. Far object = long return time, near = short. HC-SR04 = electronic bat. Idhu dhaan SONAR principle.',
      },
      {
        kind: 'visual',
        heading: 'Code: HC-SR04 + LM35 + DHT11',
        code: 'HC-SR04:\n digitalWrite(TRIG, LOW);\n delayMicroseconds(2);\n digitalWrite(TRIG, HIGH);\n delayMicroseconds(10);\n digitalWrite(TRIG, LOW);\n long t = pulseIn(ECHO, HIGH);\n int cm = t / 58;\n\nLM35 (A0):\n int raw = analogRead(A0);\n float c = raw * 5.0 / 1023.0 * 100.0;\n\nDHT11 (lib):\n float h = dht.readHumidity();\n float t = dht.readTemperature();',
      },
      {
        kind: 'technical',
        heading: 'LM35 math check',
        list: [
          'LM35: 10mV per °C → 25°C = 250mV output.',
          'Uno ADC: 5V ref, 10-bit → voltage = raw × 5.0 / 1023.0.',
          'raw = 51 → 0.2493V → ×100 = 24.9°C ≈ 25°C. Correct!',
          'ESP32 note: 3.3V ADC, different attenuation, values differ — datasheet map pannunga.',
        ],
      },
      {
        kind: 'example',
        heading: 'DHT11 usage',
        body: '#include <DHT.h>\nDHT dht(2, DHT11);\n\nvoid setup() {\n  Serial.begin(9600);\n  dht.begin();\n}\n\nvoid loop() {\n  float h = dht.readHumidity();\n  float t = dht.readTemperature();\n  if (isnan(h) || isnan(t)) {\n    Serial.println("DHT read fail");\n  } else {\n    Serial.print("T:"); Serial.print(t);\n    Serial.print(" H:"); Serial.println(h);\n  }\n  delay(2000);  // DHT11 max 1 reading/sec\n}\n\nisnan() check = sensor fail detect — always add!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'HC-SR04 5V logic ESP32 ku direct — level shifting venu (3.3V damage risk).',
          'pulseIn timeout miss — object illa na function 1 second block aagum. pulseIn(ECHO, HIGH, 30000) timeout add.',
          'LM35 3.3V supply la 5V formula use pannuradhu — reference voltage change pannunga.',
          'DHT11 fast loop (delay(100)) — sensor hangs, NaN values. ≥1s wait.',
          'isnan() check miss — garbage data silently accept pannuradhu.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Sensor lab',
      steps: [
        'Tinkercad la HC-SR04 + LED project build panni: distance < 20cm → LED ON logic code pannunga.',
        'LM35 formula step-by-step calculate pannunga: raw = 102 → temperature? (Answer: ~49.9°C)',
        'DHT11 code la isnan() check add pannadhuku reason 1 line ezhudhunga.',
      ],
    },
    quiz: [
      {
        q: 'HC-SR04 echo pulse = 1160µs → distance?',
        options: ['~20cm', '58cm', '116cm', '5.8cm'],
        answer: 0,
        explain: '1160 / 58 = 20cm. Formula: cm = µs / 58.',
      },
      {
        q: 'LM35 raw ADC = 51 (5V, 10-bit) → temperature?',
        options: ['~25°C', '51°C', '10°C', '2.5°C'],
        answer: 0,
        explain: '51 × 5.0/1023 = 0.249V = 249mV. LM35 = 10mV/°C → 249/10 = 24.9°C ≈ 25°C.',
      },
      {
        q: 'pulseIn timeout add pannadhuku reason?',
        options: [
          'Speed increase',
          'No object = infinite block prevention',
          'Memory save',
          'Noise reduction',
        ],
        answer: 1,
        explain: 'Timeout illama, echo never returns (no object) → 1 second full block. Timeout = fail-fast.',
      },
      {
        q: 'DHT11 fail indicator?',
        options: ['NaN values', '0 only', 'Negative', 'No change'],
        answer: 0,
        explain: 'DHT library failed read = NaN. isnan() check = error detection.',
      },
    ],
  },
];

export const world8Boss: QuizQuestion[] = [
  {
    q: 'BOSS: UART crossover wiring — A TX goes to B oda?',
    options: ['TX', 'RX', 'CS', 'SCL'],
    answer: 1,
    explain: 'TX (send) → RX (receive). Cross connection. Plus common GND MUST.',
  },
  {
    q: 'BOSS: SPI full-duplex data lines?',
    options: ['SDA + SCL', 'MOSI + MISO', 'TX + RX', 'CANH + CANL'],
    answer: 1,
    explain: 'MOSI (master→slave) + MISO (slave→master) = simultaneous two-way. Full duplex.',
  },
  {
    q: 'BOSS: I2C slave = 0x27 request — Wire library pattern?',
    options: [
      'Wire.requestFrom(0x27, n)',
      'Serial.read(0x27)',
      'SPI.transfer(0x27)',
      'digitalRead(0x27)',
    ],
    answer: 0,
    explain: 'I2C = Wire library. requestFrom(address, count) then Wire.read() loop.',
  },
  {
    q: 'BOSS: CAN bus both ends la enna component MUST?',
    options: ['100nF cap', '120-ohm terminator', '10k pull-up', 'Diode'],
    answer: 1,
    explain: '120-ohm terminator resistors at both ends = signal reflections stop = reliable bus.',
  },
  {
    q: 'BOSS: HC-SR04 echo = 2900µs → distance?',
    options: ['~50cm', '~29cm', '~58cm', '~145cm'],
    answer: 0,
    explain: '2900 / 58 = 50cm. Formula: cm = µs / 58.',
  },
  {
    q: 'BOSS: LM35 at 30°C outputs?',
    options: ['300mV', '30mV', '3V', '30µV'],
    answer: 0,
    explain: 'LM35 = 10mV/°C → 30°C = 300mV. ADC la ~61 raw (5V ref).',
  },
  {
    q: 'BOSS: I2C pull-up resistor illa na bus state?',
    options: ['Always HIGH', 'Always LOW', 'Floating — unreliable', 'Faster'],
    answer: 2,
    explain: 'Open-drain bus needs pull-ups. Missing = floating lines = random errors. 4.7k typical.',
  },
];

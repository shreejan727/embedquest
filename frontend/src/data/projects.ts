// ============================================================
// EMBEDQUEST — GUIDED PRACTICAL PROJECTS (p1..p9)
// Plain data shaped by the Project type in src/lib/types.ts.
// Tanglish style: Tamil in English letters, tech terms English.
// Difficulty ramp: Beginner -> Easy -> Medium -> Advanced ->
// Capstone. All circuits are LOW VOLTAGE (5V/3.3V) only.
// ============================================================
import type { Project } from '../lib/types';

export const projects: Project[] = [
  // ---------------------------------------------------------- p1
  {
    id: 'p1',
    num: 1,
    title: 'LED Blinking Circuit',
    difficulty: 'Beginner',
    objective: 'Arduino UNO la first circuit: LED-a ovvoru 1 second ku blink panna code ezhudhu, upload pannu, board-a control pannu.',
    components: [
      'Arduino UNO R3 board x1',
      'USB A-to-B cable x1 (UNO programming + power)',
      'LED 5mm (red/green, any colour) x1',
      '220 ohm resistor (red-red-brown) x1',
      'Mini breadboard x1',
      'Jumper wires (M-M) x3',
    ],
    circuit: [
      ' ARDUINO UNO (USB power - no battery!)',
      '',
      '   D13 ---[220 ohm]---|>|--- GND',
      '                       LED',
      '    long leg (+) ---- resistor side',
      '    short leg (-) --- GND side',
      '',
      '   LED symbol |>| : A = +, K = -',
      '',
      ' Breadboard tip: resistor + LED same row',
      ' series connection. Resistor LED ku',
      ' munnadi illa pinnadi - rendium OK.',
    ].join('\n'),
    steps: [
      '1. Arduino IDE install pannunga (arduino.cc → Software) and open pannunga.',
      '2. Breadboard mela LED vachunga: LONG leg (anode +) oru row la, SHORT leg (cathode −) vera row la.',
      '3. Long leg row la 220Ω resistor ooru side connect pannunga.',
      '4. Resistor other side → jumper wire → UNO digital pin D13.',
      '5. LED short leg row → jumper wire → UNO GND pin.',
      '6. USB cable UNO ku connect pannunga — board mela green ON LED glow aagum.',
      '7. IDE la Tools → Board → "Arduino UNO", Tools → Port → COM port (UNO) select pannunga.',
      '8. Kizha code-a copy panni, Upload (→ arrow) button press pannunga. "Done uploading" varum.',
    ],
    code: `// =====================================================
// EMBEDQUEST p1 - LED Blinking Circuit
// Board: Arduino UNO | Blink every 1 second
// Wiring: D13 - 220 ohm - LED(+) ... LED(-) - GND
// =====================================================

const int LED_PIN = 13;   // LED connected to digital pin 13

void setup() {
  pinMode(LED_PIN, OUTPUT);   // pin 13 = OUTPUT mode set
}

void loop() {
  digitalWrite(LED_PIN, HIGH);  // LED ON (pin = 5V)
  delay(1000);                  // wait 1000 ms = 1 sec
  digitalWrite(LED_PIN, LOW);   // LED OFF (pin = 0V)
  delay(1000);                  // wait 1 sec again
}`,
    codeExplanation: [
      { code: 'const int LED_PIN = 13;', note: 'LED yentha pin la irukku nu oru variable la vachukkoam. const na idhu program la change aagadhu — safe practice.' },
      { code: 'void setup() { }', note: 'Indha function board ON aagum bodhu ONCE dhaan run aagum. Pin mode setting ellaam inga dhaan.' },
      { code: 'pinMode(LED_PIN, OUTPUT);', note: 'Pin 13-a OUTPUT nu configure pannuom. Ippo naama adhula voltage force panna mudiyum.' },
      { code: 'void loop() { }', note: 'Idhu repeat aagum — power off aagura varaikkam. Program oda heart ithu dhaan.' },
      { code: 'digitalWrite(LED_PIN, HIGH);', note: 'HIGH = pin la 5V. Current: 5V → resistor → LED → GND flow aagum → LED ON.' },
      { code: 'delay(1000);', note: '1000 milliseconds = 1 second. Processor ithu la wait pannum. Intha number maathina blink speed maathum!' },
      { code: 'digitalWrite(LED_PIN, LOW);', note: 'LOW = 0V. LED munnadi pinnadi voltage difference illa → current illa → OFF.' },
      { code: 'delay(1000);  // loop end', note: 'Loop thirumba start aagum, so pattern: 1s ON, 1s OFF, repeat forever.' },
    ],
    expectedOutput: 'LED 1 second ON → 1 second OFF → repeat. Steady rhythm la blink aagum, USB cable irukura varaikkam continue aagum. Serial Monitor onnu vendaam — indha project la output LED eye la dhaan.',
    troubleshooting: [
      'LED ON aagalaa → polarity check: long leg (+) resistor/D13 side, short leg (−) GND side. Reverse pannina LED dark dhaan.',
      '"Board not in sync" / port error → Tools → Port la correct COM port select pannunga; USB cable loose-a irukka nu paarunga.',
      'LED romba dim → resistor/LED breadboard contact loose. Legs firm-a press pannunga.',
      'Blink speed thappa irukku → delay() ulla value maathirukka? 1000 = 1s. 100 ezhudhita 10x fast blink.',
      'LED hot aagudhu / burn smell → resistor illama direct 5V connect pannirukka? Resistor series la EPPAVUM venum — adhu current limit pannudhu.',
    ],
    safety: [
      'Full circuit USB 5V dhaan — low voltage, shock risk zero. Mains 230V intha stage la completely OFF-limits.',
      'LED resistor illama direct-a connect pannadheenga — overcurrent na LED + pin rendu damaged.',
      'Wiring change pannum bodhu USB cable remove pannunga — live wires kooda rewiring pannadheenga.',
    ],
    checklist: [
      'Arduino IDE install + correct board/port select pannirukka?',
      'LED polarity theriyudha — long leg (+) side correct-a connect aachu?',
      '220Ω resistor LED series la irukka?',
      'Upload success — "Done uploading" message vandhucha?',
      'LED 1 second rhythm la blink aagudha?',
      'delay(1000) → delay(2000) maathi slow blink test pannirukka?',
      'Loose wire illa nu connections tight-a check pannirukka?',
    ],
    xp: 100,
  },
  // ---------------------------------------------------------- p2
  {
    id: 'p2',
    num: 2,
    title: 'Automatic Night Lamp using LDR',
    difficulty: 'Easy',
    objective: 'LDR light sensor + voltage divider use panni, room dark aana automatic-a LED night lamp ON aagura circuit build pannu.',
    components: [
      'Arduino UNO R3 + USB cable x1',
      'LDR / photoresistor (GL5528 type) x1',
      '10 kΩ resistor (voltage divider) x1',
      'LED 5mm x1',
      '220 Ω resistor x1',
      'Breadboard x1 + jumper wires x6',
    ],
    circuit: [
      ' LDR DIVIDER (analog part):',
      '  5V --- LDR ---+--- A0',
      '                |',
      '              [10K]',
      '                |',
      '  GND ----------+',
      '',
      ' LED OUTPUT:',
      '  D7 ---[220R]---|>|--- GND',
      '',
      '  Bright -> LDR res LOW  -> A0 HIGH',
      '  Dark   -> LDR res HIGH -> A0 LOW',
      '  (LED ON when A0 value < THRESHOLD)',
    ].join('\n'),
    steps: [
      '1. Breadboard la LDR vachunga — legs rendu row la separate.',
      '2. LDR oru leg → jumper → UNO 5V.',
      '3. LDR aduttha leg → jumper → UNO A0 pin (indha row dhaan "middle point").',
      '4. Same middle row la 10kΩ resistor connect pannunga, other side → GND rail.',
      '5. GND rail → jumper → UNO GND (indha circuit oda common ground).',
      '6. LED vachunga: long leg → 220Ω → D7, short leg → GND rail.',
      '7. Code upload panni, Serial Monitor open pannunga (baud 9600).',
      '8. LDR mela kai vachi dark pannunga → LED ON! Torch kondu light pannunga → LED OFF.',
    ],
    code: `// =====================================================
// EMBEDQUEST p2 - Automatic Night Lamp (LDR + LED)
// Logic: room dark aana -> LED ON, light aana -> LED OFF
// Wiring: 5V-LDR-A0, A0-10K-GND, D7-220R-LED-GND
// =====================================================

const int LDR_PIN   = A0;   // LDR divider middle point
const int LED_PIN   = 7;    // night lamp LED
const int THRESHOLD = 300;  // below this = DARK

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);       // sensor value paaka
}

void loop() {
  int lightLevel = analogRead(LDR_PIN);  // 0..1023

  Serial.print("Light value = ");
  Serial.println(lightLevel);

  if (lightLevel < THRESHOLD) {
    digitalWrite(LED_PIN, HIGH);   // DARK -> lamp ON
    Serial.println("DARK -> Night lamp ON");
  } else {
    digitalWrite(LED_PIN, LOW);    // BRIGHT -> lamp OFF
    Serial.println("BRIGHT -> Night lamp OFF");
  }

  delay(500);   // check every 0.5 second
}`,
    codeExplanation: [
      { code: 'const int THRESHOLD = 300;', note: 'Dark/bright cut-off value. A0 reading 0-1023 range la varum (10-bit ADC — World 6 la deep dive!). Un room ku nee tune pannanum.' },
      { code: 'Serial.begin(9600);', note: 'Serial monitor la live sensor value paaka idhu venum. 9600 = communication speed (baud rate).' },
      { code: 'int lightLevel = analogRead(LDR_PIN);', note: 'A0 pin la irukura voltage-a 0-1023 number-a convert pannudhu. Idhu dhaan ADC job — analog world to digital brain.' },
      { code: 'Serial.print / Serial.println', note: 'print = same line la, println = new line. Debugging ku sensor values print pannradhu super habit.' },
      { code: 'if (lightLevel < THRESHOLD)', note: 'Decision point! Reading 300 ku keezha na "dark" nu consider pannuom. Idhu dhaan computer oda if-brain.' },
      { code: 'digitalWrite(LED_PIN, HIGH);', note: 'Dark condition match aana D7 la 5V → LED ON. Night lamp goal achieved!' },
      { code: 'else { digitalWrite(LED_PIN, LOW); }', note: 'Bright condition → lamp OFF. if-else = automatic decision making — idhu dhaan "automatic" lamp nu.' },
      { code: 'delay(500);', note: 'Half second ku oru check. Fast check pannalum OK, aana Serial screen romba spam aagum.' },
    ],
    expectedOutput: 'Serial Monitor (9600 baud) la ovvoru 0.5 second ku "Light value = 234" maari number print aagum. LDR mela kai vachi / room light off pannum bodhu value keezha poyi "DARK -> Night lamp ON" + LED ON. Torch light pannum bodhu value eerum, LED OFF. Ippo room light illama lamp automatic-a ON aagum — real night lamp!',
    troubleshooting: [
      'Value eppovum ~1023 dhaan / respond aagalaa → LDR divider wiring check: 5V–LDR–A0, A0–10K–GND. LDR and resistor SWAP pannina logic reverse aagum!',
      'Dark la um LED ON aagalaa → THRESHOLD konjam keezha: dark condition la print aagura value paaru, adha vida konjam mela set pannunga (example dark = 250 na threshold 300).',
      'Light la um LED ON aagudhu → THRESHOLD romba high. Bright value paathu adha vida keezha pannunga.',
      'Value jump-jump nu flicker → LDR mela shadow / hand movement. Steady room condition la test pannunga.',
      'Serial la garbage symbols → baud mismatch. Monitor bottom la 9600 select pannunga.',
    ],
    safety: [
      'Ellam USB 5V low voltage — safe. Indha output-a mains 230V bulb ku relay illama direct connect pannadheenga — relay stage la mattum, isolation oda.',
      'Wiring maathum bodhu USB cable remove pannunga.',
      'LDR legs romba bend pannadheenga — leg urugum / break aagum.',
    ],
    checklist: [
      'LDR divider order: 5V – LDR – A0 – 10K – GND correct-a?',
      'LED D7 + 220Ω + GND connect aachu?',
      'Serial Monitor baud 9600 la values print aagudha?',
      'Dark pannum bodhu LED ON aagudha?',
      'Light pannum bodhu LED OFF aagudha?',
      'THRESHOLD value un room light ku tune pannirukka?',
      'Day value vs night value notebook la note pannirukka?',
    ],
    xp: 120,
  },
  // ---------------------------------------------------------- p3
  {
    id: 'p3',
    num: 3,
    title: 'Smart Distance Detector',
    difficulty: 'Easy',
    objective: 'HC-SR04 ultrasonic sensor la distance measure panni, object 20cm near aana buzzer alert sound pannu — mini parking sensor!',
    components: [
      'Arduino UNO R3 + USB cable x1',
      'HC-SR04 ultrasonic sensor x1',
      'Active buzzer 5V x1',
      'Breadboard x1',
      'Jumper wires (M-F) x6',
    ],
    circuit: [
      ' HC-SR04 (5V sensor)   UNO',
      '  VCC  ----------- 5V',
      '  TRIG ----------- D9',
      '  ECHO ----------- D10',
      '  GND  ----------- GND',
      '',
      ' BUZZER (active 5V):',
      '  D8  -- buzzer(+)',
      '  GND -- buzzer(-)',
      '',
      ' Formula: distance = duration',
      '          * 0.034 / 2  (cm)',
    ].join('\n'),
    steps: [
      '1. HC-SR04-a breadboard mela vachunga (4 pins: VCC, TRIG, ECHO, GND).',
      '2. Sensor VCC → UNO 5V, GND → UNO GND jumper wires.',
      '3. Sensor TRIG pin → UNO D9, ECHO pin → UNO D10. (Swap pannadheenga!)',
      '4. Buzzer + leg → D8, − leg → UNO GND.',
      '5. USB connect pannunga, Tools la board/port verify.',
      '6. Code upload pannunga, Serial Monitor open (9600 baud).',
      '7. Sensor munnadi oru book/hand vachunga, distance readings paarunga.',
      '8. 20cm ku keezha kondu pona buzzer beep + alert test pannunga.',
    ],
    code: `// =====================================================
// EMBEDQUEST p3 - Smart Distance Detector
// HC-SR04: TRIG=D9, ECHO=D10 | Buzzer=D8
// Object < 20 cm aana -> buzzer alert!
// =====================================================

const int TRIG_PIN   = 9;
const int ECHO_PIN   = 10;
const int BUZZER_PIN = 8;
const int ALARM_CM   = 20;   // alert distance

void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // 1) Trigger pulse: 10 microsecond HIGH
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // 2) Echo return time (microseconds)
  //    30ms timeout = hang avoid pannum
  long duration = pulseIn(ECHO_PIN, HIGH, 30000);

  // 3) distance = time * speed / 2
  //    sound speed = 0.034 cm per microsecond
  float distance = duration * 0.034 / 2;

  Serial.print("Distance: ");
  Serial.print(distance, 1);
  Serial.println(" cm");

  if (distance > 0 && distance < ALARM_CM) {
    digitalWrite(BUZZER_PIN, HIGH);   // danger zone
  } else {
    digitalWrite(BUZZER_PIN, LOW);    // safe zone
  }

  delay(200);   // 5 readings per second
}`,
    codeExplanation: [
      { code: 'const int ALARM_CM = 20;', note: 'Alert distance 20 cm. Neew yaar nu decide pannuom — parking sensor la adhu safety margin.' },
      { code: 'digitalWrite(TRIG_PIN, HIGH); delayMicroseconds(10);', note: 'Sensor ku 10 microsecond "start" signal. Adhu 40kHz ultrasonic sound burst anupum — human ear ku kekadadhu!' },
      { code: 'long duration = pulseIn(ECHO_PIN, HIGH, 30000);', note: 'pulseIn = echo pin HIGH aagura varaikkam wait pannum — sound object adi thirumbi vandha time (µs). 30000 timeout na sensor hang-a avoid.' },
      { code: 'float distance = duration * 0.034 / 2;', note: 'Sound speed 0.034 cm/µs. "/2" yaaru? Sound poyi + vandhu — rendu way travel, so time half pannanum. Idhu dhaan p3 oda core physics!' },
      { code: 'Serial.print(distance, 1);', note: 'Decimal 1 digit mattum (example 15.3). Clean output — full float 15.299999 nu print aagave vendam.' },
      { code: 'if (distance > 0 && distance < ALARM_CM)', note: 'Rendu condition: reading valid (>0) AND 20cm ku within → buzzer. && na "and". Timeout na duration 0 → false alarm block.' },
      { code: 'digitalWrite(BUZZER_PIN, HIGH);', note: 'Buzzer + side ku 5V → beep. Active buzzer na internal oscillator irukku — digitalWrite mattum pothum.' },
      { code: 'delay(200);', note: '0.2 second ku oru measurement — second ku 5 readings. Distance realtime feel kudukkum.' },
    ],
    expectedOutput: 'Serial Monitor la "Distance: 45.2 cm" maari lines ovvoru 0.2 second ku print aagum. Hand/book 20cm ku keezha kondu pona buzzer beep + distance 20 ku keezha print aagum. Object thuram pona buzzer silent. Hand-a slow-a sensor pakkam kondu pona beep frequency feel maari increase aagum.',
    troubleshooting: [
      'Distance eppovum 0 → TRIG/ECHO wires swap aagirukka. TRIG=D9, ECHO=D10 double-check.',
      'Random big/small jump values → object soft/cloth maari (sound absorb) illa angled. Flat cardboard, munnadi vachunga.',
      'Buzzer silent aana distance low print aagudhu → buzzer polarity: + D8, − GND. Passive buzzer na tone() function venum.',
      'Serial la readings stop → USB loose / baud mismatch (9600).',
      'Values eppovum thuram (200cm+) → sensor munnadi clear-a irukka? Ceiling/floor reflection um capture aagum.',
    ],
    safety: [
      'Full circuit 5V USB — low voltage safe. HC-SR04 ku 5V dhaan (3.3V la weak, 12V na damage).',
      'Buzzer continuous long time beep → annoying; testing la short bursts use pannunga.',
      'Indha output-a mains siren/motor ku direct connect pannadheenga — demo low voltage dhaan.',
    ],
    checklist: [
      'HC-SR04 VCC 5V + GND connect aachu?',
      'TRIG = D9, ECHO = D10 mapping correct-a?',
      'Buzzer polarity (+ D8, − GND) correct-a?',
      'Distance values Serial Monitor la print aagudha?',
      '20cm ku keezha buzzer beep test pannirukka?',
      'ALARM_CM value maathi (15cm / 30cm) test pannirukka?',
      'Flat object use panni steady readings verified?',
    ],
    xp: 140,
  },
  // ---------------------------------------------------------- p4
  {
    id: 'p4',
    num: 4,
    title: 'Temperature Monitoring System',
    difficulty: 'Medium',
    objective: 'DHT11 sensor la room temperature read panni Serial la °C print pannu; 30°C mela aana alert LED ON pannu.',
    components: [
      'Arduino UNO R3 + USB cable x1',
      'DHT11 temperature/humidity sensor x1',
      '10 kΩ resistor (pull-up — bare sensor ku; module la built-in)',
      'LED 5mm x1 + 220 Ω resistor x1',
      'Breadboard x1 + jumper wires x7',
      'Library: "DHT sensor library" (Adafruit) + "Adafruit Unified Sensor"',
    ],
    circuit: [
      ' DHT11              UNO',
      '  VCC  ----------- 5V',
      '  DATA ----------- D2 --+--[10K]-- 5V',
      '  GND  ----------- GND   (pull-up for',
      '                          bare sensor)',
      '',
      ' ALERT LED:',
      '  D7 ---[220R]---|>|--- GND',
      '',
      ' (DHT11 3-pin module = 10K already',
      '  inside - external pull-up vendaam)',
    ].join('\n'),
    steps: [
      '1. Library install: Sketch → Include Library → Manage Libraries → "DHT sensor library" (Adafruit) Install. Adafruit Unified Sensor prompt aana adhuvum install.',
      '2. DHT11 breadboard la vachunga. Bare 4-pin sensor na unused pin 3 ignore pannunga.',
      '3. VCC → 5V, GND → UNO GND.',
      '4. DATA pin → UNO D2. Bare sensor na DATA-5V naduvula 10kΩ pull-up resistor.',
      '5. Alert LED: long leg → 220Ω → D7, short leg → GND.',
      '6. Code upload pannunga, Serial Monitor (9600 baud) open.',
      '7. Temperature + humidity readings print aagura paakanga — ovvoru 2 second ku update.',
      '8. Sensor-a kaivelu / fen heat mela vachi 30°C cross pannunga → LED + alert message test.',
    ],
    code: `// =====================================================
// EMBEDQUEST p4 - Temperature Monitoring System
// Sensor: DHT11 on pin 2 | Alert LED on D7 (>30 C)
// Library: DHT sensor library (Adafruit)
// =====================================================

#include <DHT.h>            // Adafruit DHT library

#define DHTPIN    2         // DATA wire pin
#define DHTTYPE   DHT11     // sensor model
#define LED_PIN   7         // heat alert LED
#define TEMP_LIMIT 30.0     // alert threshold (C)

DHT dht(DHTPIN, DHTTYPE);   // sensor object

void setup() {
  Serial.begin(9600);
  dht.begin();              // start sensor
  pinMode(LED_PIN, OUTPUT);
  Serial.println("DHT11 Temperature Monitor starting...");
}

void loop() {
  delay(2000);   // DHT11 needs 2s between reads

  float t = dht.readTemperature();   // Celsius
  float h = dht.readHumidity();      // % bonus reading

  // isnan = "Not a Number" = reading fail
  if (isnan(t) || isnan(h)) {
    Serial.println("ERROR: DHT11 read fail! Check wiring.");
    digitalWrite(LED_PIN, LOW);
    return;    // indha cycle skip
  }

  Serial.print("Temp: ");
  Serial.print(t, 1);
  Serial.print(" C | Humidity: ");
  Serial.print(h, 0);
  Serial.println(" %");

  if (t > TEMP_LIMIT) {
    digitalWrite(LED_PIN, HIGH);   // TOO HOT!
    Serial.println("!! ALERT: Temperature above 30 C !!");
  } else {
    digitalWrite(LED_PIN, LOW);    // normal
  }
}`,
    codeExplanation: [
      { code: '#include <DHT.h>', note: 'DHT sensor oda official library. Idhu illa na DHT11 protocol (exact timing pulses) naama hand-a write pannanum — library dhaan easy.' },
      { code: '#define DHTTYPE DHT11', note: 'Sensor model constant. Future la DHT22 (accurate) vaangina indha name mattum maathipom.' },
      { code: 'DHT dht(DHTPIN, DHTTYPE);', note: 'Sensor object create: "pin 2 la oru DHT11 irukku" nu library ku sollurom.' },
      { code: 'dht.begin();', note: 'Setup la ONCE sensor init. Idhu miss pannina readings eppovum NaN dhaan.' },
      { code: 'delay(2000);', note: 'DHT11 maximum 0.5 Hz dhaan (2 sec ku oru reading). Fast-a poll pannina sensor confused — NaN/error varum.' },
      { code: 'float t = dht.readTemperature();', note: 'Temperature Celsius la float (example 28.50). Fahrenheit venum na readTemperature(true).' },
      { code: 'if (isnan(t) || isnan(h))', note: 'isnan = Not a Number. Wire loose, library fail — ella error um NaN va return pannum. Good code eppovum error check pannum!' },
      { code: 'Serial.print(t, 1);', note: '1 decimal place (28.5) — clean output. Live room temp tracking ku ready.' },
      { code: 'if (t > TEMP_LIMIT)', note: 'Threshold compare → alert. Idhu dhaan monitoring system oda main job: measure + decide + react.' },
    ],
    expectedOutput: 'Serial Monitor (9600) la "Temp: 29.5 C | Humidity: 70 %" ovvoru 2 second ku print aagum. Sensor mela kaivelu / fen heat vachum bodhu temp 30 cross → LED ON + "!! ALERT" line print. Temp normal pona LED OFF. DHT11 accuracy ±2°C — readings konjam round-a irukkum, adhu normal.',
    troubleshooting: [
      '"ERROR: DHT11 read fail" → VCC/GND/DATA wiring verify; bare sensor na 10K pull-up venum; module na 3 pins mattum.',
      'Compile error "DHT.h: No such file" → Library Manager la "DHT sensor library" + "Adafruit Unified Sensor" rendaium install pannunga.',
      'Eppovum nan values → DATA wire loose / wrong pin. D2 la dhaan irukkanum (code la DHTPIN 2).',
      'Values romba jump → delay(2000) missing; 2 second interval strictly follow pannunga.',
      'LED alert ON aagalaa → un room temp 30 vida keezha irukku. Fen hot air illa kaivelu heat test pannunga.',
    ],
    safety: [
      'Circuit full 5V USB — low voltage safe. DHT11 operating range 0-50°C, 3.3-5V supply.',
      'Sensor-a hair dryer / stove maari extreme heat source ku close vachukadheenga — sensor + breadboard damage.',
      'Idhu hobby monitoring alert dhaan — real fire/heater safety control ku certified industrial devices venum.',
    ],
    checklist: [
      'DHT library + Adafruit Unified Sensor install aachu?',
      'DHT11 DATA = pin 2 mapping correct-a?',
      'Serial Monitor 9600 la temp print aagudha?',
      'Humidity % value um print aagudha?',
      '30°C mela LED alert test pannirukka (heat source)?',
      'isnan error path test pannirukka (wire remove → error message)?',
      'Morning vs evening temperature note pannirukka?',
    ],
    xp: 160,
  },
  // ---------------------------------------------------------- p5
  {
    id: 'p5',
    num: 5,
    title: 'Smart Home Automation using ESP32',
    difficulty: 'Medium',
    objective: 'ESP32 + 2-channel relay use panni phone/browser la WiFi over rendu demo 5V lamps ON/OFF pannu — safety-first smart home.',
    components: [
      'ESP32 DevKit V1 + USB cable x1',
      '2-channel 5V relay module (opto-isolated, active-LOW) x1',
      'Demo loads: 5V USB lamp / 5V LED strip x2 (NO 230V!)',
      '5V USB power source (relay + demo loads ku) x1',
      'Breadboard x1 + jumper wires x8',
      'WiFi 2.4GHz network + phone/laptop browser',
    ],
    circuit: [
      ' ESP32          RELAY (active-LOW)',
      '  VIN(5V) ----- VCC',
      '  GND  -------- GND',
      '  D26 --------- IN1  (lamp 1)',
      '  D27 --------- IN2  (lamp 2)',
      '',
      ' DEMO LAMP 1 (5V USB lamp ONLY):',
      '  USB5V(+) --- COM1',
      '  NO1 --- lamp1(+) --- lamp1(-) --- USB5V(-)',
      '',
      ' DEMO LAMP 2:',
      '  USB5V(+) --- COM2',
      '  NO2 --- lamp2(+) --- lamp2(-) --- USB5V(-)',
      '',
      ' Relay = remote-controlled switch.',
      ' NO 230V mains in this project!',
    ].join('\n'),
    steps: [
      '1. ESP32 board support: Boards Manager la "esp32 by Espressif" install pannunga, board select "ESP32 Dev Module".',
      '2. Relay module: VCC → ESP32 VIN (5V), GND → GND. IN1 → D26, IN2 → D27.',
      '3. Demo lamp 1: USB 5V positive → COM1, NO1 → lamp1 +, lamp1 − → USB 5V negative. Lamp 2 um same style COM2/NO2 la.',
      '4. Safety double-check: demo loads 5V DHAAN? Mains 230V wire um project la touch pannala nu confirm.',
      '5. Code la WIFI_SSID + WIFI_PASS un real WiFi details maathunga (2.4GHz network).',
      '6. Upload pannunga (upload hang aana BOOT button hold pannunga). Serial Monitor 115200 baud open.',
      '7. "READY! ... http://192.168.x.x" IP print aana, adha phone browser la open pannunga (same WiFi).',
      '8. Buttons tap pannunga: relay click sound + demo lamp ON/OFF verify pannunga.',
    ],
    code: `// =====================================================
// EMBEDQUEST p5 - Smart Home Automation (ESP32)
// 2-ch relay + two 5V DEMO lamps, WiFi web control.
// SAFETY: demo loads = 5V ONLY. 230V mains NEVER!
// =====================================================

#include <WiFi.h>
#include <WebServer.h>

// 1) Un WiFi details inga maathunga (2.4GHz)
const char* WIFI_SSID = "YOUR_WIFI_NAME";
const char* WIFI_PASS = "YOUR_WIFI_PASSWORD";

// 2) Relay pins (active-LOW module: LOW = ON)
#define RELAY1    26
#define RELAY2    27
#define RELAY_ON  LOW
#define RELAY_OFF HIGH

bool lamp1 = false;   // boot la both OFF (safe)
bool lamp2 = false;

WebServer server(80);   // HTTP server, port 80

void applyRelays() {
  digitalWrite(RELAY1, lamp1 ? RELAY_ON : RELAY_OFF);
  digitalWrite(RELAY2, lamp2 ? RELAY_ON : RELAY_OFF);
}

// Control page (simple HTML + buttons)
void handleRoot() {
  String html = "<html><body style='font-family:sans-serif'>";
  html += "<h2>EMBEDQUEST Smart Home (5V demo)</h2>";
  html += "<p><a href='/lamp1?state=on'>Lamp1 ON</a> | ";
  html += "<a href='/lamp1?state=off'>Lamp1 OFF</a></p>";
  html += "<p><a href='/lamp2?state=on'>Lamp2 ON</a> | ";
  html += "<a href='/lamp2?state=off'>Lamp2 OFF</a></p>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}

// Endpoint 1: /lamp1?state=on  |  /lamp1?state=off
void handleLamp1() {
  if (server.arg("state") == "on")  lamp1 = true;
  if (server.arg("state") == "off") lamp1 = false;
  applyRelays();
  server.send(200, "text/plain",
              lamp1 ? "Lamp1 is ON" : "Lamp1 is OFF");
}

// Endpoint 2: /lamp2?state=on  |  /lamp2?state=off
void handleLamp2() {
  if (server.arg("state") == "on")  lamp2 = true;
  if (server.arg("state") == "off") lamp2 = false;
  applyRelays();
  server.send(200, "text/plain",
              lamp2 ? "Lamp2 is ON" : "Lamp2 is OFF");
}

void setup() {
  Serial.begin(115200);
  pinMode(RELAY1, OUTPUT);
  pinMode(RELAY2, OUTPUT);
  applyRelays();    // safe start: both OFF

  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("WiFi connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("READY! Browser la open: http://");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);        // control page
  server.on("/lamp1", handleLamp1);  // endpoint 1
  server.on("/lamp2", handleLamp2);  // endpoint 2
  server.begin();
}

void loop() {
  server.handleClient();   // browser requests
}`,
    codeExplanation: [
      { code: 'const char* WIFI_SSID = "YOUR_WIFI_NAME";', note: 'Un house WiFi name + password. Upload munnadi real values maathu — illa connect aagave mudiyadhu.' },
      { code: '#define RELAY_ON LOW', note: 'Indha relay module active-LOW: LOW signal na coil energise → ON. Module datasheet paarunga; active-HIGH na rendu constants swap.' },
      { code: 'WebServer server(80);', note: 'Port 80 la HTTP server object. Browser la ESP32 IP type panna indha server dhaan respond pannum.' },
      { code: 'void applyRelays()', note: 'lamp1/lamp2 bool variable → relay pins. Logic single place la — bug risk reduce, clean design.' },
      { code: "html += \"<a href='/lamp1?state=on'>\"", note: 'Button click na browser "/lamp1?state=on" request anupum. Idhu dhaan web control oda base — REST maari.' },
      { code: 'server.arg("state")', note: 'URL la irukura ?state=on value read. "on"/"off" compare panni lamp state update pannuom.' },
      { code: 'while (WiFi.status() != WL_CONNECTED)', note: 'WiFi connect aagura varaikkam wait. "." print aagum bodhu progress theriyum — hang-a nu confuse aagave vendam.' },
      { code: 'Serial.println(WiFi.localIP());', note: 'ESP32 ku kidaitha IP address. Indha number browser la type panna control page. Phone/laptop same WiFi la venum!' },
      { code: 'server.handleClient();', note: 'Loop la continuous-a browser requests process. Idhu call pannadha na buttons work aagave aagadhu.' },
    ],
    expectedOutput: 'Serial Monitor (115200) la "WiFi connecting...." pinnadi "READY! Browser la open: http://192.168.1.45" print aagum. Phone browser la indha IP open → rendu lamp control page. "Lamp1 ON" tap → relay "click" sound + demo lamp glow + page la "Lamp1 is ON" response. Lamp2 um independently control aagum. ESP32 restart aana both lamps safe OFF start.',
    troubleshooting: [
      'WiFi connect aagalaa → SSID/password spelling check; ESP32 5GHz support ILLA — 2.4GHz network select pannunga.',
      'IP browser la open aagalaa → phone/laptop ESP32 oda same WiFi la irukka? Guest networks client isolation block pannum.',
      'Relay state opposite (click na OFF) → active-HIGH module: RELAY_ON HIGH, RELAY_OFF LOW maathunga.',
      'Lamp state change aagalaa → IN1/IN2 wiring + D26/D27 mapping verify; relay click sound kekuradha nu paarunga.',
      'Upload "Connecting..." la stick → BOOT button press-hold panni, dots print aagum bodhu release pannunga.',
    ],
    safety: [
      'DEMO LOADS = 5V USB lamp / LED strip ONLY. 230V bulb/mains idhu relay ku connect pannadheenga — beginner stage la STRICT NO.',
      'Relay module VCC 5V (VIN) la dhaan. 3.3V pin la relay trigger aagave mudiyadhu (undervoltage, erratic behavior).',
      'Wiring maathum bodhu ESP32 USB + 5V supply rendu power off pannunga.',
      'Mains-level automation later, licensed guidance + proper enclosure + isolation oda mattum. Ippo 5V demo dhaan un playground.',
    ],
    checklist: [
      'ESP32 board package install + "ESP32 Dev Module" select aachu?',
      'WIFI_SSID / WIFI_PASS real values maathitu upload pannirukka?',
      'Serial 115200 la IP address print aagudha?',
      'Browser la control page load aagudha?',
      'Lamp1 endpoints (/lamp1?state=on|off) work aagudha?',
      'Lamp2 endpoints work aagudha?',
      'Relay click sound + demo lamp state sync aagudha?',
      'Boot la rendu lamp um OFF (safe start) irukka — verify pannirukka?',
    ],
    xp: 200,
  },
  // ---------------------------------------------------------- p6
  {
    id: 'p6',
    num: 6,
    title: 'IoT Sensor Dashboard (MQTT)',
    difficulty: 'Medium',
    objective: 'ESP32 + DHT11 temperature reading test.mosquitto.org MQTT broker ku publish pannu — topic embedquest/demo/temp, laptop dashboard la live paarunga.',
    components: [
      'ESP32 DevKit V1 + USB cable x1',
      'DHT11 temperature/humidity sensor (module) x1',
      'Breadboard x1 + jumper wires x3',
      'WiFi 2.4GHz router + internet x1',
      'Laptop: MQTTX app (free) or mosquitto_sub tool',
      'Libraries: PubSubClient, DHT sensor library',
    ],
    circuit: [
      ' ESP32         DHT11 module',
      '  3V3 --------- VCC',
      '  D4  --------- DATA',
      '  GND --------- GND',
      '',
      ' DATA PATH:',
      '  DHT11 -> ESP32 -> WiFi router',
      '  -> test.mosquitto.org : 1883',
      '  -> topic embedquest/demo/temp',
      '  -> laptop MQTTX (subscribe)',
    ].join('\n'),
    steps: [
      '1. Libraries: Library Manager la "PubSubClient" (Nick O\u2019Leary) + "DHT sensor library" install.',
      '2. DHT11 module: VCC → 3V3, DATA → D4, GND → GND.',
      '3. Code la WIFI_SSID/WIFI_PASS real values maathunga.',
      '4. Upload pannunga, Serial Monitor 115200 open.',
      '5. "WiFi OK" + "MQTT connecting...connected!" log paarunga.',
      '6. MQTTX app: broker test.mosquitto.org, port 1883 connect pannunga.',
      '7. Topic embedquest/demo/temp subscribe pannunga.',
      '8. Ovvoru 5 second ku temperature message dashboard la pop aagura paarunga. Terminal option: mosquitto_sub -h test.mosquitto.org -t "embedquest/demo/temp"',
    ],
    code: `// =====================================================
// EMBEDQUEST p6 - IoT Sensor Dashboard (MQTT publish)
// ESP32 + DHT11 -> test.mosquitto.org (port 1883)
// Topic: embedquest/demo/temp
// =====================================================

#include <WiFi.h>
#include <PubSubClient.h>   // MQTT library
#include <DHT.h>

// 1) WiFi + broker details
const char* WIFI_SSID   = "YOUR_WIFI_NAME";
const char* WIFI_PASS   = "YOUR_WIFI_PASSWORD";
const char* MQTT_SERVER = "test.mosquitto.org";
const int   MQTT_PORT   = 1883;    // plain MQTT

// 2) DHT11 sensor
#define DHTPIN  4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

WiFiClient espClient;           // network pipe
PubSubClient client(espClient); // MQTT on top

unsigned long lastSend = 0;
const unsigned long SEND_EVERY = 5000;  // 5 sec

void connectMQTT() {
  while (!client.connected()) {
    Serial.print("MQTT connecting...");
    // 3) RANDOM client id - collision avoid!
    String clientId = "EQ-" + String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("connected!");
    } else {
      Serial.print("failed, rc=");
      Serial.println(client.state());
      delay(2000);    // retry
    }
  }
}

void setup() {
  Serial.begin(115200);
  dht.begin();
  randomSeed(analogRead(34));  // floating pin noise

  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.print("\\nWiFi OK, IP: ");
  Serial.println(WiFi.localIP());

  client.setServer(MQTT_SERVER, MQTT_PORT);
}

void loop() {
  if (!client.connected()) connectMQTT();
  client.loop();    // MQTT housekeeping (ping)

  // non-blocking 5 second timer
  if (millis() - lastSend >= SEND_EVERY) {
    lastSend = millis();
    float t = dht.readTemperature();

    if (isnan(t)) {
      Serial.println("DHT read fail");
    } else {
      String payload = String(t, 1);   // "28.5"
      // 4) PUBLISH to topic!
      client.publish("embedquest/demo/temp",
                     payload.c_str());
      Serial.print("Published temp: ");
      Serial.println(payload);
    }
  }
}`,
    codeExplanation: [
      { code: 'const char* MQTT_SERVER = "test.mosquitto.org";', note: 'Free public MQTT test broker. Internet la oru "post office" maari — yaarum message anupalaam, yaarum read pannaalaam. Production ku private broker venum!' },
      { code: 'PubSubClient client(espClient);', note: 'MQTT protocol work pannura library object. WiFiClient socket mela sit pannum — network layer + protocol layer.' },
      { code: 'String(random(0xffff), HEX)', note: 'Random client id generate. Public broker la same id vandha previous connection kick aagum — idhu important IoT detail!' },
      { code: 'client.setServer(MQTT_SERVER, MQTT_PORT);', note: 'Broker address + port 1883 (plain, unencrypted MQTT — test broker standard port) set pannuom.' },
      { code: 'if (!client.connected()) connectMQTT();', note: 'Connection drop aana auto-reconnect. WiFi/broker flicker common — idhu dhaan real-world IoT pattern.' },
      { code: 'client.loop();', note: 'MQTT internal tasks (keep-alive ping, incoming messages) run pannum. Loop la EPPAVUM call pannanum, illa na disconnect.' },
      { code: 'millis() - lastSend >= SEND_EVERY', note: 'delay() use pannala — non-blocking timer. delay() potta MQTT ping miss aagum → disconnect. millis() pattern = pro technique.' },
      { code: 'String payload = String(t, 1);', note: 'Float 28.50 → string "28.5". MQTT payload text dhaan. JSON use pannalaam, simple value simple dhaan.' },
      { code: 'client.publish("embedquest/demo/temp", payload.c_str());', note: 'Topic la message anupum! Topic = dashboard address. c_str() = String → char* conversion.' },
    ],
    expectedOutput: 'Serial Monitor: "WiFi OK, IP: 192.168.x.x" → "MQTT connecting...connected!" → ovvoru 5 sec ku "Published temp: 28.5". Laptop MQTTX la topic embedquest/demo/temp subscribe panna ovvoru 5 sec ku new temperature message pop aagum. Sensor-a kaivelu heat panna dashboard value eerum — live IoT dashboard!',
    troubleshooting: [
      '"failed, rc=-2" → WiFi connect aagala (SSID/pass). "rc=-4"/timeout → internet/broker reach issue; rc=-1 na buffer issue.',
      'MQTTX la message theriyala → broker test.mosquitto.org + port 1883 exact-a? Topic spelling exact match? Subscribe start aachu nu check.',
      'DHT NaN → DATA D4 wiring + module 3V3 power verify.',
      'Publish romba slow → test.mosquitto.org free public broker, busy time la slow; SEND_EVERY 10 sec increase pannunga.',
      'College/office WiFi la fail → port 1883 firewall block aagirukkalam; mobile hotspot try pannunga.',
    ],
    safety: [
      'Public broker la PRIVATE/personal data publish pannadheenga — ellaarum kooda read pannalaam! Demo temperature mattum.',
      'Circuit 3.3V/5V low voltage dhaan — sensor wiring safe.',
      'WiFi password code la irukku — project share/screenshot pannum bodhu credentials hide pannunga.',
    ],
    checklist: [
      'PubSubClient + DHT libraries install aachu?',
      'WiFi credentials real values maathirukka?',
      'Serial la "MQTT connecting...connected!" print aachu?',
      'Ovvoru 5 sec ku publish log print aagudha?',
      'MQTTX/mosquitto_sub la messages receive aagudha?',
      'Topic embedquest/demo/temp exact-a use pannirukka?',
      'Random client id (EQ-xxxx) log la paarunga?',
      'Sensor heat test → dashboard value change aachu?',
    ],
    xp: 220,
  },
  // ---------------------------------------------------------- p7
  {
    id: 'p7',
    num: 7,
    title: 'RTOS-based Multi-tasking Project',
    difficulty: 'Advanced',
    objective: 'ESP32 FreeRTOS la moonu parallel task create pannu — LED blink, LDR monitor, button toggle (semaphore event) — ellam same time la.',
    components: [
      'ESP32 DevKit V1 + USB cable x1',
      'LED 5mm + 220 Ω resistor x1 (Task3 toggle LED)',
      'Push button x1 (Task3 input)',
      'LDR + 10 kΩ resistor (Task2 divider)',
      'Breadboard x1 + jumper wires x8',
      'Library: none extra — FreeRTOS ESP32 core ulla built-in!',
    ],
    circuit: [
      ' Task1: GPIO2 built-in LED (no wire!)',
      '',
      ' Task2 LDR divider (ADC1):',
      '  3V3 -- LDR --+-- GPIO34',
      '               |',
      '             [10K]',
      '               |',
      '             GND',
      '',
      ' Task3 button (INPUT_PULLUP):',
      '  GPIO33 -- button -- GND  (press=LOW)',
      ' Task3 LED: GPIO25 --[220R]--|>|-- GND',
    ].join('\n'),
    steps: [
      '1. Board: "ESP32 Dev Module" select pannunga (p5 la install aachu).',
      '2. LDR divider breadboard la ready: 3V3–LDR–GPIO34, GPIO34–10K–GND (3V3 use pannunga, 5V venaam).',
      '3. Button: GPIO33 → button → GND (INPUT_PULLUP na external resistor vendaam).',
      '4. Toggle LED: GPIO25 → 220Ω → LED(+), LED(−) → GND.',
      '5. Code upload, Serial Monitor 115200 open.',
      '6. Built-in LED 500ms blink + LDR value 2 second ku print — RENDU parallel nu paarunga!',
      '7. Button press → serial la "[Task3] LED toggled: ON/OFF" + external LED toggle.',
      '8. LDR read pannum bodhu blink interrupt aagudha nu paarunga — aagakoodathu! Idhu dhaan RTOS scheduling proof.',
    ],
    code: `// =====================================================
// EMBEDQUEST p7 - RTOS Multi-tasking (ESP32 FreeRTOS)
// Task1: LED blink 500ms | Task2: LDR print 2s
// Task3: button press -> LED toggle (semaphore)
// =====================================================

#include <Arduino.h>

// ----- Shared hardware pins -----
#define BLINK_LED  2    // Task1 (built-in)
#define TOGGLE_LED 25   // Task3 output LED
#define BTN_PIN    33   // Task3 button
#define LDR_PIN    34   // Task2 ADC input

// ----- FreeRTOS handles -----
SemaphoreHandle_t btnSem;    // button event signal
TaskHandle_t task1Handle;    // (optional handle)

// ---------- TASK 1: blink every 500 ms ----------
void taskBlink(void *pv) {
  for (;;) {                          // infinite loop
    digitalWrite(BLINK_LED, HIGH);
    vTaskDelay(pdMS_TO_TICKS(500));
    digitalWrite(BLINK_LED, LOW);
    vTaskDelay(pdMS_TO_TICKS(500));
  }
}

// ---------- TASK 2: LDR print every 2 s ----------
void taskLdr(void *pv) {
  for (;;) {
    int light = analogRead(LDR_PIN);  // 0..4095
    Serial.print("[Task2] LDR value: ");
    Serial.println(light);
    vTaskDelay(pdMS_TO_TICKS(2000));
  }
}

// ---------- Button ISR (interrupt service) ----------
void IRAM_ATTR btnISR() {
  // ISR la fast action only: semaphore 'give'
  xSemaphoreGiveFromISR(btnSem, NULL);
}

// ---------- TASK 3: button -> LED toggle ----------
void taskButton(void *pv) {
  bool ledState = false;
  for (;;) {
    // semaphore varaikkam sleep - CPU save!
    if (xSemaphoreTake(btnSem,
                       portMAX_DELAY) == pdTRUE) {
      ledState = !ledState;           // toggle
      digitalWrite(TOGGLE_LED,
                   ledState ? HIGH : LOW);
      Serial.print("[Task3] LED toggled: ");
      Serial.println(ledState ? "ON" : "OFF");
      vTaskDelay(pdMS_TO_TICKS(300)); // debounce
    }
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(BLINK_LED, OUTPUT);
  pinMode(TOGGLE_LED, OUTPUT);
  pinMode(BTN_PIN, INPUT_PULLUP);  // press = LOW

  // binary semaphore create (starts empty)
  btnSem = xSemaphoreCreateBinary();

  // button falling edge -> ISR trigger
  attachInterrupt(digitalPinToInterrupt(BTN_PIN),
                  btnISR, FALLING);

  // xTaskCreate(func, "name", stack(2048 words),
  //             param, priority, handle)
  xTaskCreate(taskBlink, "Blink",
              2048, NULL, 1, &task1Handle);
  xTaskCreate(taskLdr, "LDR",
              2048, NULL, 1, NULL);
  xTaskCreate(taskButton, "Button",
              2048, NULL, 1, NULL);
}

void loop() {
  vTaskDelay(portMAX_DELAY);  // loop idle:
  // ella work um 3 tasks la - FreeRTOS
  // scheduler dhaan boss intha project la!
}`,
    codeExplanation: [
      { code: 'for (;;) { ... }', note: 'RTOS task function return pannave koodaadhu — infinite loop dhaan standard task pattern. Return pannina task crash/del state.' },
      { code: 'vTaskDelay(pdMS_TO_TICKS(500));', note: 'RTOS style delay: task CPU free pannum → vera task run aagum. delay() na muzhu core block — idhu dhaan RTOS difference!' },
      { code: 'xTaskCreate(taskBlink, "Blink", 2048, NULL, 1, &task1Handle);', note: 'Task create: function, name, 2048 WORDS stack memory, priority 1. Scheduler moonu task um time slice la run pannum.' },
      { code: 'SemaphoreHandle_t btnSem;', note: 'Semaphore = "signal flag". ISR event raise pannum, task flag wait pannum — ISR + task safe communication tool.' },
      { code: 'btnSem = xSemaphoreCreateBinary();', note: 'Binary semaphore (0/1 mattum) create. Button event ku perfect — press = 1, task eduthu count 0 back.' },
      { code: 'void IRAM_ATTR btnISR()', note: 'Interrupt Service Routine. IRAM_ATTR na code flash la illa fast RAM la load — ESP32 ISR ku MANDATORY rule.' },
      { code: 'xSemaphoreGiveFromISR(btnSem, NULL);', note: 'ISR ulla delay()/Serial use pannave mudiyadhu (slow+unsafe). Semaphore give = fastest safe signal. ISR short-a venum!' },
      { code: 'xSemaphoreTake(btnSem, portMAX_DELAY);', note: 'Task flag varaikkam SLEEP — CPU 0% waste. Event-driven design = battery efficient systems oda secret.' },
      { code: 'vTaskDelay(portMAX_DELAY);  // loop()', note: 'loop() ku work illa — ella work moonu task la. Arduino-ESP32 ulla loopTask um oru task dhaan, FreeRTOS ellaam manage pannum.' },
    ],
    expectedOutput: 'Serial Monitor (115200): "[Task2] LDR value: 2100" ovvoru 2 second ku print aagum, MEANWHILE built-in LED (GPIO2) 500ms rhythm la blink aagum — rendu parallel! Button press → "[Task3] LED toggled: ON/OFF" + GPIO25 LED toggle. Moonu activity um same time la nadakum, onnu mattum um block aagave aagadhu — idhu dhaan multitasking!',
    troubleshooting: [
      '"Stack canary watchpoint triggered" reboot → Serial print tasks ku stack romba small; xTaskCreate la 2048 → 4096 increase pannunga.',
      'Button press one time na DOUBLE toggle → switch bounce. taskButton ulla debounce delay 300ms → 500ms increase pannunga.',
      'LDR eppovum 0 → GPIO34 input-only pin (ADC mattum); divider 3V3 la correct-a wiring check.',
      'Serial print random-a interleave → normal RTOS behavior; baud 115200 exact-a select pannunga.',
      'Compile error "btnISR not in IRAM" → IRAM_ATTR keyword miss aachu; ESP32 interrupts ku adhu venum.',
    ],
    safety: [
      'Ellam 3.3V logic — low voltage. GPIO34/35 input-only pins ku OUTPUT connect pannadheenga (chip damage).',
      'Button + LED wiring correct polarity; short circuit avoid panna breadboard rail check.',
      'RTOS demo CPU scheduling dhaan — hardware risk low, aana wiring power off panni maathunga.',
    ],
    checklist: [
      'Moonu task um xTaskCreate la create aachu (2048 stack)?',
      'Built-in LED 500ms blink (Task1) nadakudha?',
      'LDR value ovvoru 2 sec print (Task2) aagudha?',
      'Button press → LED toggle (Task3) work aagudha?',
      'Moonu activity um interfere illama parallel-a nadakudha?',
      'Semaphore give (ISR) + take (task) concept apply aachu?',
      'vTaskDelay + pdMS_TO_TICKS use pannirukka (delay illa)?',
      'Debounce handling test pannirukka?',
    ],
    xp: 260,
  },
  // ---------------------------------------------------------- p8
  {
    id: 'p8',
    num: 8,
    title: 'Simple Agentic AI Assistant',
    difficulty: 'Advanced',
    objective: 'Python terminal agent build pannu — goal vaangi LLM kitta plan keku, calculator + note-saver tools run panni, observe panni answer kudukum.',
    components: [
      'Laptop/PC with Python 3.10+ installed',
      'Terminal (CMD / PowerShell / VS Code terminal)',
      'LLM API key in environment variable (OPTIONAL — offline fallback included)',
      'Internet connection (LLM mode ku mattum)',
      'notes.txt output file (agent auto-create pannum)',
      'No pip install needed — stdlib mattum!',
    ],
    circuit: [
      ' No wires - pure software project!',
      '',
      ' [Terminal] python agent.py',
      '      |',
      '      v',
      '  goal input',
      '      |',
      '      v',
      '  LLM API call (key = env var)',
      '      |            |',
      '      v            v',
      ' TOOL: calc      TOOL: note',
      '      |            |',
      '      v            v',
      '  observation (calc result /',
      '  notes.txt saved)',
      '      |',
      '      v',
      ' ANSWER -> loop (max 5 steps)',
    ].join('\n'),
    steps: [
      '1. python --version terminal la run panni 3.10+ confirm pannunga.',
      '2. agent.py file create pannunga, kizha code paste pannunga.',
      '3. python agent.py run pannunga — "LLM mode: OFF (rule-based fallback)" banner varum (key illa na).',
      '4. Offline test 1: goal "calculate 25*4" → TOOL: calc → observation 25*4 = 100 → answer.',
      '5. Offline test 2: goal "note buy bread tomorrow" → notes.txt file open panni timestamp line verify.',
      '6. LLM mode ON: terminal la key set pannunga (PowerShell: $env:OPENAI_API_KEY="sk-xxxx") then fresh terminal la script run.',
      '7. Complex goal test: "calculate 12*(3+4) and note the answer" — agent plan → tool → observe → answer paarunga.',
      '8. quit type panni clean exit + agent loop-a 5 steps limit ku test pannunga.',
    ],
    code: `# =====================================================
# EMBEDQUEST p8 - Simple Agentic AI Assistant (terminal)
# Goal -> LLM plan -> tools (calc + notes) -> observe
# -> answer. API key OPTIONAL: offline fallback included.
# Run:  python agent.py     (stdlib only - no pip!)
# =====================================================

import os
import re
import ast
import json
import time
import urllib.request   # stdlib HTTP client

NOTES_FILE = "notes.txt"

# ---------- optional LLM settings ----------
# Key set pannunga (LLM mode ON aagum):
#   Windows CMD :  set OPENAI_API_KEY=sk-xxxx
#   PowerShell  :  $env:OPENAI_API_KEY="sk-xxxx"
#   Linux/Mac   :  export OPENAI_API_KEY=sk-xxxx
API_KEY = os.environ.get("OPENAI_API_KEY", "")
API_URL = "https://api.openai.com/v1/chat/completions"
MODEL   = "gpt-4o-mini"

# -----------------------------------------------------
# TOOL 1: SAFE CALCULATOR (eval illa - ast whitelist!)
# -----------------------------------------------------
def tool_calculator(expression):
    allowed = (ast.Expression, ast.BinOp, ast.UnaryOp,
               ast.Constant, ast.Add, ast.Sub,
               ast.Mult, ast.Div, ast.FloorDiv,
               ast.Mod, ast.Pow, ast.USub, ast.UAdd)
    ops = {ast.Add:      lambda a, b: a + b,
           ast.Sub:      lambda a, b: a - b,
           ast.Mult:     lambda a, b: a * b,
           ast.Div:      lambda a, b: a / b,
           ast.FloorDiv: lambda a, b: a // b,
           ast.Mod:      lambda a, b: a % b,
           ast.Pow:      lambda a, b: a ** b}

    def ev(node):
        if isinstance(node, ast.Expression):
            return ev(node.body)
        if (isinstance(node, ast.Constant)
                and isinstance(node.value, (int, float))):
            return node.value
        if isinstance(node, ast.BinOp) and type(node.op) in ops:
            return ops[type(node.op)](ev(node.left),
                                      ev(node.right))
        if (isinstance(node, ast.UnaryOp)
                and isinstance(node.op, (ast.USub, ast.UAdd))):
            v = ev(node.operand)
            return -v if isinstance(node.op, ast.USub) else v
        raise ValueError("unsafe / unknown syntax")

    tree = ast.parse(expression, mode="eval")
    if not all(isinstance(n, allowed) for n in ast.walk(tree)):
        raise ValueError("unsafe expression")
    return f"{expression} = {ev(tree)}"

# -----------------------------------------------------
# TOOL 2: NOTE SAVER (notes.txt append + timestamp)
# -----------------------------------------------------
def tool_save_note(text):
    stamp = time.strftime("%Y-%m-%d %H:%M:%S")
    with open(NOTES_FILE, "a", encoding="utf-8") as f:
        f.write(f"[{stamp}] {text}\\n")
    return f"Note saved: {text!r} -> {NOTES_FILE}"

TOOLS = {"calc": tool_calculator,
         "note": tool_save_note}

# -----------------------------------------------------
# LLM brain (only if API key present)
# -----------------------------------------------------
def llm_reply(goal, history):
    sys_prompt = (
        "You are a helpful terminal agent. Tools:\\n"
        "TOOL: calc <math expression>\\n"
        "TOOL: note <text to save>\\n"
        "Reply EXACTLY one line:\\n"
        "TOOL: calc 12*(3+4)   OR   TOOL: note buy bread\\n"
        "OR when the goal is done:\\n"
        "ANSWER: <final answer for the user>\\n"
        "Use a tool first if it helps, observe its "
        "result, then give ANSWER."
        + ("\\nRecent observations:\\n" + history
           if history else "\\nNo observations yet.")
    )
    body = json.dumps({
        "model": MODEL,
        "messages": [
            {"role": "system", "content": sys_prompt},
            {"role": "user", "content": goal}],
        "max_tokens": 300,
    }).encode("utf-8")
    req = urllib.request.Request(
        API_URL, data=body,
        headers={"Content-Type": "application/json",
                 "Authorization": f"Bearer {API_KEY}"})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = json.loads(r.read().decode("utf-8"))
    text = data["choices"][0]["message"]["content"].strip()
    return text.splitlines()[0] if text else "ANSWER: empty reply"

# -----------------------------------------------------
# OFFLINE fallback: rule-based mini agent
# -----------------------------------------------------
def offline_reply(goal, history=""):
    if history:                     # tool already ran
        return "ANSWER: " + history.strip()
    g = goal.lower()
    m = re.search(r"(?:note|save|remind me)\\s*:?\\s*(.+)", g)
    if m:
        return "TOOL: note " + m.group(1).strip()
    m = re.search(r"calc(?:ulate)?\\s+(.+)", g)
    if m:
        return "TOOL: calc " + \\
            m.group(1).replace("^", "**").strip()
    if re.search(r"[\\d)]\\s*[-+*/]\\s*[\\d(]", g):
        return "TOOL: calc " + \\
            re.search(r"[-+*/().\\d\\s]+", g).group().strip()
    return ("ANSWER: Offline mode: 'calculate 25*4' or "
            "'note buy bread' maari goal kudunga. "
            "LLM mode ku OPENAI_API_KEY env var set pannunga.")

# -----------------------------------------------------
# AGENT LOOP: goal -> act -> observe -> answer
# -----------------------------------------------------
def agent(goal):
    history = ""
    for step in range(5):           # max 5 steps
        print(f"--- Step {step + 1} ---")
        try:
            if API_KEY:
                reply = llm_reply(goal, history)
            else:
                reply = offline_reply(goal, history)
        except Exception as e:
            return "LLM/net error: " + str(e)
        print("Agent decides:", reply)

        if reply.startswith("TOOL:"):
            cmd = reply[len("TOOL:"):].strip()
            name, _, arg = cmd.partition(" ")
            arg = arg.strip()
            if name in TOOLS:
                try:
                    observation = TOOLS[name](arg)
                except Exception as e:
                    observation = "Tool error: " + str(e)
            else:
                observation = "Unknown tool: " + name
            print("Observation:", observation)
            history += observation + "\\n"
            continue                # observe -> next step

        return reply.replace("ANSWER:", "").strip()

    return "Max 5 steps over - goal romba complex-a?"

def main():
    print("=" * 46)
    print("EMBEDQUEST Agentic AI - p8")
    print("LLM mode:", "ON" if API_KEY
          else "OFF (rule-based fallback)")
    print("Type 'quit' to exit")
    print("=" * 46)
    while True:
        goal = input("\\nGoal > ").strip()
        if goal.lower() in ("quit", "exit", ""):
            print("Bye! Notes file:", NOTES_FILE)
            break
        print(agent(goal))

if __name__ == "__main__":
    main()`,
    codeExplanation: [
      { code: 'API_KEY = os.environ.get("OPENAI_API_KEY", "")', note: 'API key ENVIRONMENT VARIABLE la irundhu read — code la hardcode pannave vendam! Idhu dhaan security best practice.' },
      { code: 'def tool_calculator(expression):', note: 'Tool = agent oda "hand". LLM text mattum purinjum; tool action edukum. calc tool oru function dhaan.' },
      { code: 'tree = ast.parse(expression, mode="eval")', note: 'eval() direct-a use pannradhu DANGEROUS (rm -rf maari injection). ast whitelist na math mattum allow — safe calculator engineering.' },
      { code: 'def tool_save_note(text):', note: 'Rendu side effect tool: notes.txt file la append with timestamp. Agent memory external file la — agentic AI base pattern.' },
      { code: 'TOOLS = {"calc": tool_calculator, "note": tool_save_note}', note: 'Tool registry — dict la name → function. Pudhu tool add panna intha dict la mattum add pannuom.' },
      { code: 'reply.startswith("TOOL:")', note: 'LLM reply parse: TOOL: na action run, ANSWER: na user ku final reply. Structured output = agent loop fuel.' },
      { code: 'history += observation + "\\n"', note: 'Tool result observation history la save → next LLM call la adhu pass aagum. Idhu dhaan ReAct loop: Reason → Act → Observe.' },
      { code: 'for step in range(5):', note: 'Max 5 steps limit — LLM loop la stuck aana infinite API bill avoid. Agent safety valve ithu!' },
      { code: 'def offline_reply(goal, history=""):', note: 'Key illa / internet illa na rule-based agent um work aagum — graceful fallback. Real products la um idhu pattern venum!' },
      { code: 'urllib.request.Request(API_URL, data=body, headers=...)', note: 'Stdlib HTTP client — pip install vendaam. Authorization header la Bearer key. requests library familiar-a irukum, concept same.' },
    ],
    expectedOutput: 'Terminal banner: "EMBEDQUEST Agentic AI - p8" + "LLM mode: OFF (rule-based fallback)". Goal > calculate 25*4 → "--- Step 1 --- / Agent decides: TOOL: calc 25*4 / Observation: 25*4 = 100" → "--- Step 2 --- / ANSWER: 25*4 = 100". Goal > note buy bread → "Note saved: ... -> notes.txt". notes.txt la "[2026-11-13 10:20:33] buy bread". Key set panna "LLM mode: ON" — complex goals um plan panni tools use pannum.',
    troubleshooting: [
      "'python' not found → python.org 3.10+ install; Windows la 'py agent.py' um try pannunga.",
      'LLM mode ON aagalaa → env var set panni NEW terminal open pannanum (old terminal refresh aagadhu). PowerShell check: echo $env:OPENAI_API_KEY',
      'HTTP 401/403 error → API key invalid/expired or billing setup illa; key regenerate pannunga.',
      'calc "Tool error: unsafe expression" → letters/variables math ulla poda vendam; 2+2, 12*(3+4) format use.',
      'notes.txt permission error → script run aagura folder write permission check; OneDrive sync folder avoid pannunga.',
    ],
    safety: [
      'API key EPPAVUM code la hardcode pannadheenga — environment variable dhaan. Key leak na un billing abuse aagum!',
      'Public WiFi la LLM API calls venaam — key intercept risk; personal/trusted network use.',
      'LLM output-a blind-a trust pannadheenga — agentic AI human oversight + validation venum (idhu dhaan AI engineering lesson 1!).',
    ],
    checklist: [
      'Python 3.10+ verify pannirukka?',
      'Script run aaguthu + banner print aagudha?',
      'Offline calculator goal end-to-end work aachu?',
      'Note goal → notes.txt timestamp line save aachu?',
      'API key env variable la set panni LLM mode test pannirukka?',
      'Agent step log (decide → observe) print aagudha?',
      'Tool error handling test (bad math input) pannirukka?',
      'quit command + max 5 step limit verified?',
    ],
    xp: 280,
  },
  // ---------------------------------------------------------- p9
  {
    id: 'p9',
    num: 9,
    title: 'Final Capstone: Embedded Systems + AI',
    difficulty: 'Capstone',
    objective: 'End-to-end pipeline build pannu: ESP32 sensors → MQTT → Python gateway → CSV log → rule-based anomaly alerts → optional AI summary.',
    components: [
      'ESP32 DevKit V1 + USB cable x1',
      'DHT11 temperature sensor (module) x1',
      'LDR + 10 kΩ resistor (light sensor divider) x1',
      'Breadboard x1 + jumper wires x5',
      'Laptop: Python 3.10+, pip install paho-mqtt',
      'WiFi 2.4GHz + internet (MQTT broker)',
      'OPTIONAL: LLM API key (env var) for AI summary',
      'Output files: lab_data.csv + alerts.txt (auto-created)',
    ],
    circuit: [
      ' ESP32 wiring:',
      '  3V3 ------ DHT11 VCC',
      '  D4  ------ DHT11 DATA',
      '  GND ------ DHT11 GND',
      '  LDR divider (ADC1):',
      '  3V3 -- LDR --+-- GPIO34',
      '               |',
      '             [10K]',
      '               |',
      '             GND',
      '',
      ' SYSTEM PIPELINE:',
      ' [DHT11+LDR] -> ESP32 -> WiFi',
      '   -> MQTT test.mosquitto.org:1883',
      '   -> topic embedquest/demo/lab1',
      '        |',
      '        v',
      ' laptop gateway.py (paho-mqtt)',
      '   -> lab_data.csv (log)',
      '   -> rule anomaly -> alerts.txt',
      '   -> optional LLM summary (env key)',
    ].join('\n'),
    steps: [
      '1. MILESTONE 1 - Sense: ESP32 wiring pannunga (DHT11 → D4, LDR divider → GPIO34). p4/p6 wiring knowledge reuse!',
      '2. MILESTONE 2 - Publish: esp32_lab1.ino upload (WiFi details maathunga). Serial la "Sent: t=28.5,l=2100" ovvoru 5 sec verify.',
      '3. MILESTONE 3 - Verify link: MQTTX la test.mosquitto.org connect, topic embedquest/demo/lab1 subscribe → messages receive check.',
      '4. MILESTONE 4 - Gateway: pip install paho-mqtt; gateway.py create; run pannunga → "Gateway connected" print.',
      '5. MILESTONE 5 - Log: lab_data.csv open panni time/temp_c/ldr rows fill aagudha verify.',
      '6. MILESTONE 6 - Anomaly test A: sensor-a kaivelu heat pannunga (temp > 35) → terminal "!! ALERT: HEAT!" + alerts.txt la line.',
      '7. MILESTONE 7 - Anomaly test B: DHT11 DATA wire remove (30 sec) → "NO DATA" alert trigger verify.',
      '8. MILESTONE 8 - AI layer (optional): OPENAI_API_KEY env var set, gateway run panni Ctrl+C → last 10 readings AI summary 3 bullets.',
      '9. Demo document pannunga: circuit photo, serial log, CSV screenshot, alert file, summary — full system proof!',
    ],
    code: `// ============================================================
// EMBEDQUEST p9 - CAPSTONE (part 1/2)
// FILE: esp32_lab1.ino  -> upload to ESP32
// Sends temp+light every 5 sec to MQTT topic
// embedquest/demo/lab1 @ test.mosquitto.org
// ============================================================
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

const char* WIFI_SSID   = "YOUR_WIFI_NAME";
const char* WIFI_PASS   = "YOUR_WIFI_PASSWORD";
const char* MQTT_SERVER = "test.mosquitto.org";
const int   MQTT_PORT   = 1883;
const char* TOPIC       = "embedquest/demo/lab1";

#define DHTPIN  4
#define DHTTYPE DHT11
#define LDRPIN  34
DHT dht(DHTPIN, DHTTYPE);

WiFiClient net;
PubSubClient mqtt(net);
unsigned long lastSend = 0;

void connectAll() {
  while (WiFi.status() != WL_CONNECTED) {
    WiFi.begin(WIFI_SSID, WIFI_PASS);
    Serial.print("w");
    delay(1000);
  }
  while (!mqtt.connected()) {
    // ESP32 random() = hardware RNG - no seed needed
    String id = "EQCAP-" + String(random(0xffff), HEX);
    if (mqtt.connect(id.c_str())) {
      Serial.println("\\nMQTT connected");
      break;
    }
    Serial.print("m");
    delay(2000);
  }
}

void setup() {
  Serial.begin(115200);
  dht.begin();
  mqtt.setServer(MQTT_SERVER, MQTT_PORT);
  connectAll();
}

void loop() {
  if (WiFi.status() != WL_CONNECTED ||
      !mqtt.connected()) {
    connectAll();          // self-healing link
  }
  mqtt.loop();             // keep-alive ping

  if (millis() - lastSend < 5000) return;
  lastSend = millis();

  float t = dht.readTemperature();
  int   l = analogRead(LDRPIN);    // 0..4095

  if (isnan(t)) {
    Serial.println("DHT read fail");
    return;
  }
  // payload format: t=28.5,l=2100
  String payload = "t=" + String(t, 1) +
                   ",l=" + String(l);
  mqtt.publish(TOPIC, payload.c_str());
  Serial.println("Sent: " + payload);
}

/* ============================================================
   CAPSTONE part 2/2 -> gateway.py (laptop file)
   Ella gateway code um INTHA block comment ulla dhaan irukku
   (adhaan .ino compile-safe). COPY RULE: '# ===== gateway.py
   START' line irundhu '# ===== gateway.py END' line varaikkam
   gateway.py file la paste pannunga. First run:
   pip install paho-mqtt

# ===== gateway.py START =====
import os, csv, json, time, datetime, urllib.request
import paho.mqtt.client as mqtt

BROKER     = "test.mosquitto.org"
PORT       = 1883
TOPIC      = "embedquest/demo/lab1"
CSV_FILE   = "lab_data.csv"
ALERT_FILE = "alerts.txt"
TEMP_MAX   = 35.0      # rule 1: heat anomaly (C)
DARK_MIN   = 200       # rule 2: dark lab (ADC)
GAP_SEC    = 30        # rule 3: no data window
API_KEY    = os.environ.get("OPENAI_API_KEY", "")
API_URL    = "https://api.openai.com/v1/chat/completions"

last_rx = time.time()  # gap detection clock
recent  = []           # last readings for summary

def log_csv(t, l):
    now = datetime.datetime.now()
    is_new = not os.path.exists(CSV_FILE)
    with open(CSV_FILE, "a", newline="",
              encoding="utf-8") as f:
        w = csv.writer(f)
        if is_new:
            w.writerow(["time", "temp_c", "ldr"])
        w.writerow([now.isoformat(timespec="seconds"),
                    t, l])
    recent.append((now.strftime("%H:%M"), t, l))
    del recent[:-10]   # keep last 10 only

def alert(text):
    line = (f"[{datetime.datetime.now():%H:%M:%S}] "
            f"ALERT: {text}")
    print("!!", line)
    with open(ALERT_FILE, "a", encoding="utf-8") as f:
        f.write(line + "\\n")

def check_rules(t, l):
    if t > TEMP_MAX:
        alert(f"HEAT! temp={t}C > {TEMP_MAX}")
    if l < DARK_MIN:
        alert(f"DARK! ldr={l} < {DARK_MIN}")

def llm_summary():
    if not API_KEY or not recent:
        print("Rule-based summary:", len(recent),
              "readings logged. Files:", CSV_FILE,
              "+", ALERT_FILE)
        return
    lines = "\\n".join(
        f"{a} t={b}C l={c}" for a, b, c in recent)
    body = json.dumps({
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system",
             "content": "Embedded lab monitor. Given "
                        "recent readings, give 3 short "
                        "bullet insights."},
            {"role": "user", "content": lines}],
        "max_tokens": 200}).encode()
    req = urllib.request.Request(
        API_URL, data=body,
        headers={"Content-Type": "application/json",
                 "Authorization": "Bearer " + API_KEY})
    with urllib.request.urlopen(req, timeout=60) as r:
        d = json.loads(r.read().decode())
    print("AI Summary:")
    print(d["choices"][0]["message"]["content"])

def on_connect(client, userdata, flags, rc, props=None):
    # paho v1: rc int | v2: ReasonCode. rc == 0 both la work
    if rc == 0:
        print("Gateway connected:", TOPIC)
        client.subscribe(TOPIC)
    else:
        print("MQTT connect failed:", rc)

def on_message(client, userdata, msg):
    global last_rx
    last_rx = time.time()          # data received!
    text = msg.payload.decode("utf-8")  # "t=28.5,l=2100"
    try:
        parts = dict(p.split("=", 1)
                     for p in text.split(","))
        t = float(parts["t"])
        l = int(parts["l"])
    except Exception:
        print("Bad payload:", text)
        return
    print("RX", text)
    log_csv(t, l)
    check_rules(t, l)

try:    # paho-mqtt 2.x API
    client = mqtt.Client(
        mqtt.CallbackAPIVersion.VERSION2,
        client_id="EQGW-" + str(os.getpid()))
except (AttributeError, TypeError):  # paho-mqtt 1.x
    client = mqtt.Client(
        client_id="EQGW-" + str(os.getpid()))

client.on_connect = on_connect
client.on_message = on_message
try:
    client.connect(BROKER, PORT, keepalive=30)
except Exception as e:
    print("Broker connect fail:", e)
    print("Internet / port 1883 firewall check pannunga")
    raise SystemExit(1)

client.loop_start()   # MQTT background thread
print("Gateway running... Ctrl+C = stop + summary")
try:
    while True:
        if time.time() - last_rx > GAP_SEC:
            alert("NO DATA! ESP32 >30 sec silent")
            last_rx = time.time()   # alert spam block
        time.sleep(1)
except KeyboardInterrupt:
    print("\\nStopping gateway...")
    llm_summary()
    client.loop_stop()
    client.disconnect()
# ===== gateway.py END =====
============================================================ */`,
    codeExplanation: [
      { code: 'String payload = "t=" + String(t, 1) + ",l=" + String(l);', note: 'Compact k=v payload — gateway la easy-a parse. JSON um valid, aana k=v beginner friendly + tiny.' },
      { code: 'mqtt.publish(TOPIC, payload.c_str());', note: 'Sensor data topic ku publish. Topic oru "address" maari — ella subscribers um receive pannuvaanga.' },
      { code: 'if (WiFi.status() != WL_CONNECTED || !mqtt.connected())', note: 'Self-healing link: WiFi or MQTT drop aana auto reconnect. 24/7 IoT device oda must-have pattern!' },
      { code: 'mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, ...)', note: 'Python side: paho-mqtt v1/v2 version difference handle — rendu version um work aagum. Robust library code!' },
      { code: 'def on_message(client, userdata, msg):', note: 'Broker la new message vandha idhu auto-call aagum — event-driven gateway. Main loop block pannave vendam.' },
      { code: "parts = dict(p.split(\"=\", 1) for p in text.split(\",\"))", note: 'Payload "t=28.5,l=2100" → {"t": "28.5", "l": "2100"} dict. String parsing basics in action.' },
      { code: 'w.writerow([now.isoformat(...), t, l])', note: 'CSV row: timestamp + temp + light. Data long-term store — analysis/graph/ML ku future fuel!' },
      { code: 'if t > TEMP_MAX: alert(...)', note: 'Rule-based anomaly detection — threshold cross na alert. AI illama um real systems useful. Simple + explainable!' },
      { code: 'alert("NO DATA! ESP32 >30 sec silent")', note: 'Data absence UM anomaly! Sensor dead/wifi drop detection — monitoring gold rule: "no news is bad news".' },
      { code: 'def llm_summary():', note: 'Ctrl+C bodhu last 10 readings LLM ku anupi 3 bullet insights. Key illa na rule-based summary — graceful fallback, pipeline break aagave aagadhu.' },
      { code: 'client.loop_start()', note: 'MQTT work background thread la run — main loop gap-check continue. Threading basics intro ithu!' },
    ],
    expectedOutput: 'ESP32 Serial: "MQTT connected" + "Sent: t=27.4,l=1850" ovvoru 5 sec. Gateway terminal: "Gateway connected: embedquest/demo/lab1" + "RX t=27.4,l=1850" ovvoru reading ku. lab_data.csv la header + rows fill aagum. Heat test → "!! ALERT: HEAT! temp=36.2C > 35.0" + alerts.txt la line. DATA wire remove → 30 sec pinnadi "NO DATA" alert. Ctrl+C → "Stopping gateway..." + summary (AI key irundha 3 bullet insights; illa rule-based count message).',
    troubleshooting: [
      'Gateway "MQTT connect failed" → internet/firewall (port 1883) check; college WiFi block pannalaam — mobile hotspot try.',
      'CSV rows fill aagalaa → topic spelling ESP32 + gateway la EXACT match? "embedquest/demo/lab1" rendu side um.',
      '"Bad payload" print → old/different sketch publish format; correct part-1 sketch upload pannunga.',
      'NO DATA alert spam → ESP32 publish interval/GAP_SEC tune; ESP32 reset/wifi status verify.',
      'Import paho error → pip install paho-mqtt; virtualenv use panna activate first pannunga.',
      'AI summary call fail → env key + internet check; fail aana um rule-based summary varum — pipeline intact.',
    ],
    safety: [
      'Ellam 3.3V/5V low voltage circuits dhaan. Mains 230V, heater, real appliances — capstone la um STRICT NO.',
      'Heat anomaly test: kaivelu / fen LOW mode mattum — sensor + wires damage avoid.',
      'Public MQTT broker la personal/private data publish pannadheenga — demo readings mattum.',
      'API key environment variable la dhaan — gateway.py share/screenshot pannum bodhu key leak avoid.',
    ],
    checklist: [
      'ESP32 DHT11 + LDR wiring + serial log verified?',
      'MQTTX la embedquest/demo/lab1 messages receive aachu?',
      'gateway.py running + "Gateway connected" print aachu?',
      'lab_data.csv la timestamp rows fill aagudha?',
      'HEAT anomaly test → alerts.txt la alert vandhucha?',
      'NO DATA anomaly test (wire remove) trigger aachu?',
      'Ctrl+C summary (AI or rule-based) print aachu?',
      'Full pipeline demo (circuit → CSV → alert) document pannirukka?',
    ],
    xp: 300,
  },
];

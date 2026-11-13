// ============================================================
// EMBEDQUEST — WORLD 10: INTERNET OF THINGS
// IoT architecture, WiFi/Bluetooth + ESP32, MQTT, HTTP/cloud
// dashboards, sensor-to-cloud project sketch.
// ============================================================
import type { Lesson, QuizQuestion } from '../lib/types';

export const world10Lessons: Lesson[] = [
  // ---------------------------------------------------------- w10l1
  {
    id: 'w10l1',
    worldId: 'w10',
    title: 'IoT — Big Picture',
    minutes: 9,
    sections: [
      {
        kind: 'intro',
        heading: 'Sensor data cloud ku eppadi porakudhu?',
        body: 'World 8 la sensor data MCU la read pannom. World 9 la tasks manage pannom. Ippo final frontier: indha data phone/cloud ku epdi porakudhu? Indha lesson la IoT architecture full picture paakalam.',
      },
      {
        kind: 'explain',
        heading: 'IoT na enna?',
        body: 'IoT (Internet of Things) = physical devices (sensors, actuators) internet connect aagi data share/remote control pannura system.\n\n4-layer architecture:\n1. PERCEPTION layer: sensors + actuators (LM35, relay, motor). Physical world interface.\n2. NETWORK layer: data transport — WiFi, Bluetooth, GSM/4G, LoRa, Ethernet.\n3. PROCESSING/CLOUD layer: data storage, analysis, rules (AWS IoT, Firebase, local server).\n4. APPLICATION layer: user interface — mobile app, web dashboard, alerts.\n\nData flow: sensor → MCU → network → cloud → dashboard → user. Reverse: user command → cloud → MCU → actuator.',
      },
      {
        kind: 'analogy',
        heading: 'Hospital analogy',
        body: 'Perception = nurse checking patient (sensors). Network = phone line reports hospital ku. Cloud = hospital records + doctor analysis. Application = patient app showing reports. Nurse (MCU) local quick action pannum (emergency), doctor (cloud) deep analysis + history.',
      },
      {
        kind: 'visual',
        heading: 'IoT data journey',
        code: ' [SENSOR]  [MCU]   [NETWORK] [CLOUD] [USER]\n  LM35 -> ESP32 -> WiFi -> server -> app\n  temp C   format  packets  store   charts\n           JSON             rules   alerts\n           (fan ON command comes back)',
      },
      {
        kind: 'technical',
        heading: 'Key IoT terms',
        list: [
          'Edge computing: processing near the source (MCU la threshold check) — fast, offline-capable.',
          'Cloud computing: remote servers — big storage, heavy analysis, global access.',
          'Telemetry: periodic sensor data upload (temperature every 30s).',
          'Command/control: user → device direction (turn fan ON).',
          'Payload: actual data content (JSON: {"temp": 27.5}).',
        ],
      },
      {
        kind: 'example',
        heading: 'Smart home temperature example',
        body: 'Flow:\n1. LM35 reads 27.5°C (perception)\n2. ESP32 checks threshold locally: 30°C mela irundha relay ON — edge decision, fast, internet illa na work aagum\n3. Every 30s ESP32 posts {"temp":27.5} to cloud (telemetry)\n4. Cloud stores history, draws graph, sends alert "temp high"\n5. User opens app, sees 27.5°C, taps "fan ON" (application)\n6. Command reaches ESP32, relay ON (actuation)\n\nLocal + cloud both — idhu dhaan real IoT design pattern.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Ella decision um cloud la pannuradhu — internet down = whole system dead. Edge fallback design pannunga.',
          'Security skip: open ports, default passwords — IoT device = attack surface. Later lessons.',
          'Power budget miss: battery device WiFi always-on = battery 1 day. Deep sleep + burst upload design.',
          'Data rate overkill: 1Hz upload for slowly-changing temp — unnecessary. Change-based upload better.',
        ],
      },
    ],
    task: {
      title: 'Mini task: IoT blueprint',
      steps: [
        'Un veetu oru room ku smart monitoring design pannunga: 3 sensors, 2 actuators, network, dashboard — 4-layer map draw pannunga.',
        'Edge vs cloud decision examples 3 ezhudhunga (edhu local, edhu remote).',
        '"Telemetry" and "command" data flow diagram notebook la draw pannunga.',
      ],
    },
    quiz: [
      {
        q: 'IoT perception layer = ?',
        options: ['Sensors + actuators', 'WiFi router', 'Mobile app', 'Server room'],
        answer: 0,
        explain: 'Perception = physical world interface: sensors (read) + actuators (act). Base layer.',
      },
      {
        q: 'Edge computing advantage?',
        options: [
          'Fast local decisions, works offline',
          'More storage',
          'Better graphics',
          'Cheaper internet',
        ],
        answer: 0,
        explain: 'Edge = processing near source. Latency low, internet dependency low. Cloud = heavy analysis.',
      },
      {
        q: 'Telemetry na?',
        options: [
          'Periodic sensor data upload',
          'Remote factory reset',
          'Bluetooth pairing',
          'Code update',
        ],
        answer: 0,
        explain: 'Telemetry = device → cloud periodic data flow ({"temp":27.5} every 30s).',
      },
      {
        q: 'IoT device la ella decision cloud la pannina risk?',
        options: [
          'Faster',
          'Internet down = system dead',
          'Battery lasts longer',
          'More secure',
        ],
        answer: 1,
        explain: 'Cloud-dependent = single point of failure. Edge fallback (threshold local check) MUST design pattern.',
      },
    ],
  },

  // ---------------------------------------------------------- w10l2
  {
    id: 'w10l2',
    worldId: 'w10',
    title: 'WiFi & Bluetooth + ESP32',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'ESP32 = MCU + radio',
        body: 'ESP32 = dual-core MCU + WiFi + Bluetooth + ADC + PWM + FreeRTOS — oru chip la full IoT platform. World 6 la intro paathom; ippo radio features deep dive.',
      },
      {
        kind: 'explain',
        heading: 'WiFi modes',
        body: 'Two main WiFi modes:\n1. STATION (STA): device connects to existing router. Normal IoT pattern — home WiFi join, cloud reach.\n2. SOFT-AP: device becomes its own hotspot. Phone direct connect (setup mode, no router situations).\n\nBoth simultaneously possible (AP+STA).\n\nWiFi = 2.4GHz (ESP32) — range ~30-50m indoor, speed Mbps scale, power hungry (~100-200mA active).\n\nCode: WiFi.begin(ssid, password); wait WiFi.status() == WL_CONNECTED.',
      },
      {
        kind: 'analogy',
        heading: 'Guest vs host analogy',
        body: 'STATION = guest: house party (router) join panni, ellaru kitta pesum (internet). SOFT-AP = host: own party create, others invite. Setup page ku ESP32 = host mode ("ESP32-Setup" network connect panni configure pannunga — smart plugs idhe dhaan!).',
      },
      {
        kind: 'visual',
        heading: 'ESP32 radio capabilities',
        code: 'ESP32 = dual-core MCU + radios\n\nWiFi 2.4GHz: STA | SoftAP | AP+STA\nBluetooth: Classic (audio/SPP)\n           BLE (low energy sensors)\n\nPower: active ~160mA, modem-sleep\n       deep sleep ~10uA (battery IoT!)',
      },
      {
        kind: 'technical',
        heading: 'Bluetooth Classic vs BLE',
        list: [
          'Bluetooth Classic: continuous streaming — audio, serial port (SPP). Power higher.',
          'BLE (Bluetooth Low Energy): burst communication, deep sleep between — wearables, beacons, sensors. IoT default.',
          'BLE structure: device advertises → client connects → services/characteristics read/write.',
          'GATT = data organization standard (services contain characteristics).',
          'Phone apps: nRF Connect (BLE explorer) — device debugging tool.',
        ],
      },
      {
        kind: 'example',
        heading: 'WiFi connect code',
        body: '#include <WiFi.h>\n\nconst char* ssid = "HomeNet";\nconst char* pass = "password123";\n\nvoid setup() {\n  Serial.begin(115200);\n  WiFi.mode(WIFI_STA);\n  WiFi.begin(ssid, pass);\n  while (WiFi.status() != WL_CONNECTED) {\n    delay(500);\n    Serial.print(".");\n  }\n  Serial.println("\\nConnected!");\n  Serial.println(WiFi.localIP());  // e.g. 192.168.1.42\n}\n\nPattern: mode set → begin → poll status → IP print. IP = network address (router assigns via DHCP).',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          '5GHz network connect try pannuradhu — ESP32 2.4GHz only!',
          'SSID/password hardcoded, no error handling — WiFi down = infinite loop. Timeout + retry logic add.',
          'WiFi always-on battery project la — deep sleep + periodic connect pattern use.',
          'BLE vs Classic confusion — sensor data ku Classic use = battery drain fast. BLE choose.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Radio planner',
      steps: [
        '3 devices ku WiFi/BLE/Classic choose pannunga + reason: fitness band, TV audio headphones, weather station.',
        'WiFi connect code notebook la copy panni, evvo line edhuku nu annotate pannunga.',
        'Phone la nRF Connect app install panni, nearby BLE devices list pannunga (practice!).',
      ],
    },
    quiz: [
      {
        q: 'ESP32 WiFi band?',
        options: ['2.4GHz only', '5GHz only', 'Both', '60GHz'],
        answer: 0,
        explain: 'ESP32 = 2.4GHz only. 5GHz network invisible to it. Router 2.4GHz enable pannunga.',
      },
      {
        q: 'SOFT-AP mode = ?',
        options: [
          'ESP32 becomes its own hotspot',
          'ESP32 joins router',
          'Bluetooth mode',
          'Sleep mode',
        ],
        answer: 0,
        explain: 'Soft-AP = ESP32 = access point. Phone directly connects (setup/configuration pattern).',
      },
      {
        q: 'BLE main advantage?',
        options: [
          'Low power (sleep between bursts)',
          'Longer range than WiFi',
          'Faster than WiFi',
          'Free internet',
        ],
        answer: 0,
        explain: 'BLE = Low Energy design. Short bursts + sleep = battery months. Classic = streaming, power heavy.',
      },
      {
        q: 'WiFi.localIP() returns?',
        options: [
          'Device network address (e.g. 192.168.1.42)',
          'MAC address',
          'Router password',
          'Signal strength',
        ],
        answer: 0,
        explain: 'localIP = router assigned (DHCP) network address. Idhu dhaan device identity on LAN.',
      },
    ],
  },

  // ---------------------------------------------------------- w10l3
  {
    id: 'w10l3',
    worldId: 'w10',
    title: 'MQTT — IoT Messaging Standard',
    minutes: 11,
    sections: [
      {
        kind: 'intro',
        heading: 'Devices eppadi ellarum ellaraiyum pesuvanga?',
        body: '100 devices, 1 server — ore direct connections = chaos. MQTT = messaging middleman system. IoT world la de facto standard. Indha lesson la full concept.',
      },
      {
        kind: 'explain',
        heading: 'MQTT model',
        body: 'MQTT (Message Queuing Telemetry Transport) = lightweight pub/sub protocol.\n\nRoles:\n- BROKER: central message server (Mosquitto, HiveMQ, EMQX). Ella messages adhu dhaan route pannum.\n- PUBLISHER: sends messages to a TOPIC ("home/livingroom/temp").\n- SUBSCRIBER: listens to a topic. Broker auto-forwards matching messages.\n\nDevices direct connect aagave illa — ellaam broker ku connect. Phone app, ESP32, server — ellaam clients. Decoupled: publisher subscriber-a theriyave vendam.\n\nTopic = slash hierarchy: home/livingroom/temp, home/kitchen/light. Wildcards: + (one level), # (multi level): home/+/temp = all rooms temp.',
      },
      {
        kind: 'analogy',
        heading: 'WhatsApp group analogy',
        body: 'MQTT broker = WhatsApp group. Temperature sensor = member posting in "home/temp" group. Phone app + laptop = other members reading the group. Sensor phone number theriyave vendam (decoupled!) — group topic mattum dhaan venu. Broker = WhatsApp server, messages route pannum.',
      },
      {
        kind: 'visual',
        heading: 'MQTT pub/sub flow',
        code: ' ESP32(pub)      BROKER        PHONE(sub)\n    |               |               |\n    |--publish----->|               |\n    | home/temp 27.5|--forward--->| display\n    |<--command(fan ON)--publish----|\n    |               |               |\n topics: home/+/temp  (all rooms)',
      },
      {
        kind: 'technical',
        heading: 'MQTT details',
        list: [
          'Port: 1883 (plain), 8883 (TLS secure). Public test broker: broker.hivemq.com (1883).',
          'QoS 0: at most once (fire and forget). QoS 1: at least once (ack + retry — duplicates possible). QoS 2: exactly once (slowest, strongest).',
          'Retain flag: broker keeps last message per topic — new subscriber immediately gets last value.',
          'LWT (Last Will and Testament): client unexpectedly disconnects na broker publishes pre-agreed "device offline" message — presence detection!',
          'Client ID: unique per client. Two clients same ID = connection conflicts.',
          'Payload: any bytes — JSON common: {"temp": 27.5, "unit": "C"}.',
        ],
      },
      {
        kind: 'example',
        heading: 'ESP32 MQTT publish (PubSubClient)',
        body: '#include <PubSubClient.h>\nWiFiClient net;\nPubSubClient mqtt(net);\n\nvoid setup() {\n  // ... WiFi connect ...\n  mqtt.setServer("broker.hivemq.com", 1883);\n  mqtt.connect("esp32-demo-42");  // unique ID!\n}\n\nvoid loop() {\n  mqtt.loop();\n  float t = readTemp();\n  char payload[32];\n  snprintf(payload, 32, "{\\"temp\\":%.1f}", t);\n  mqtt.publish("home/livingroom/temp", payload);\n  delay(30000);\n}\n\nPattern: server set → connect (unique ID) → loop() maintain → publish topic+payload.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Public broker la secrets/passwords publish — ellaarum paakalaam! Public = test data only.',
          'mqtt.loop() miss pannuradhu — connection drops, messages fail. Loop la regular-a call MUST.',
          'Non-unique client ID — broker kicks one client. ID + random suffix better.',
          'QoS 2 ella message um — overkill slow. Telemetry ku QoS 0/1 dhaan.',
          'Device offline detection illa — LWT setup pannunga, presence tracking easy.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Topic design',
      steps: [
        'Smart home 3 rooms (hall, kitchen, bedroom) ku topic tree design pannunga — temp, light, motion sub-topics.',
        '"home/+/temp" wildcard matches edhellam nu list pannunga.',
        'QoS 0/1/2 oru real example ovvonru kuduthu explain pannunga.',
      ],
    },
    quiz: [
      {
        q: 'MQTT broker role?',
        options: [
          'Message routing center (pub/sub)',
          'Database only',
          'Compiler',
          'Power supply',
        ],
        answer: 0,
        explain: 'Broker = central post office. Publishers send, subscribers receive, broker routes by topic.',
      },
      {
        q: 'MQTT default port?',
        options: ['80', '1883', '443', '22'],
        answer: 1,
        explain: '1883 = MQTT plain. 8883 = TLS. HTTP 80/HTTPS 443 — different protocol!',
      },
      {
        q: 'QoS 2 guarantee?',
        options: ['At most once', 'At least once', 'Exactly once', 'No guarantee'],
        answer: 2,
        explain: 'QoS 2 = exactly once (4-way handshake). Slowest but strongest. QoS 0 = fire-and-forget.',
      },
      {
        q: 'Retain flag effect?',
        options: [
          'Broker stores last message — new subscribers get it immediately',
          'Message deleted',
          'Priority boost',
          'Encryption',
        ],
        answer: 0,
        explain: 'Retain = last value persistence. New subscriber joins → immediately current state (e.g. light = ON).',
      },
      {
        q: '"home/+/temp" matches?',
        options: [
          'home/kitchen/temp, home/hall/temp',
          'home/kitchen/light',
          'office/kitchen/temp',
          'home/kitchen/temp/ac',
        ],
        answer: 0,
        explain: '+ = exactly ONE level. home/X/temp pattern only. # = multiple levels.',
      },
    ],
  },

  // ---------------------------------------------------------- w10l4
  {
    id: 'w10l4',
    worldId: 'w10',
    title: 'HTTP, Cloud & Dashboards',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'MQTT illana enna?',
        body: 'MQTT super, aana web world la HTTP universal. ThingSpeak, Blynk, Firebase maari platforms HTTP-based IoT support pannuvanga. Indha lesson la HTTP pattern + dashboard concept.',
      },
      {
        kind: 'explain',
        heading: 'HTTP pattern',
        body: 'HTTP = request-response protocol. Client asks, server answers, connection done.\n\n- GET: data fetch (read sensor history).\n- POST: data send (upload new reading).\n- Status codes: 200 OK, 404 not found, 401 unauthorized (API key wrong), 500 server error.\n- API key = identity token: "idhu naan dhaan" proof. URL la or header la pass pannuvom.\n- JSON = data format standard: {"temp":27.5}.\n\nHTTP vs MQTT:\nHTTP: request-response, one-directional per request, connection overhead per call. Occasional big data ku good.\nMQTT: persistent connection, push-based (broker forwards instantly), tiny overhead. Frequent small telemetry ku good.',
      },
      {
        kind: 'analogy',
        heading: 'Courier vs phone call analogy',
        body: 'HTTP = courier service: parcel (request) anupu, receipt (response) vaangu, deal over. Next time = new parcel. MQTT = phone call: call connected (persistent), ippovum pesalam (push messages), call cut pannalaam. Frequent small talk = phone (MQTT) better. Rare big parcel = courier (HTTP) better.',
      },
      {
        kind: 'visual',
        heading: 'HTTP IoT upload flow',
        code: ' ESP32            CLOUD (ThingSpeak)\n  |                   |\n  |--POST /update---->|\n  |   ?key=ABC123     |\n  |   body: field1=27.5\n  |                   |-- store + chart\n  |                   |\n  |<--200 OK----------|\n  |                   |\n  (next upload = new request)',
      },
      {
        kind: 'technical',
        heading: 'Dashboard concept',
        list: [
          'Dashboard = web/mobile UI: live charts, gauges, buttons. Data visualisation + control.',
          'Popular platforms: ThingSpeak (MATLAB charts), Blynk (mobile app builder), Firebase (Google realtime DB), Home Assistant (self-hosted).',
          'Data pipeline: device → API → database → dashboard chart auto-update.',
          'Alerts: threshold rule → email/Telegram/notification (temp > 35°C → alert).',
          'API rate limits: ThingSpeak free = 15s minimum between updates — plan accordingly.',
        ],
      },
      {
        kind: 'example',
        heading: 'ThingSpeak HTTP POST',
        body: '#include <WiFiClient.h>\n#include <HTTPClient.h>\n\nHTTPClient http;\nString url = "http://api.thingspeak.com/update?api_key=YOURKEY&field1=";\nurl += String(tempC, 1);   // "27.5"\n\nhttp.begin(url);\nint code = http.GET();      // returns 200 + entry number\nhttp.end();\n\nif (code == 200) Serial.println("Uploaded!");\nelse Serial.println("Upload failed");\n\nPattern: URL build → GET/POST → status check → end. Simple. ThingSpeak dashboard auto-chart field1.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'API key code la hardcode + GitHub la public push — key leak! Config/env file use.',
          'HTTP polling overload: every 1s GET = server ban. Rate limits respect.',
          'Status code ignore pannuradhu — upload fail silently, data loss notice pannadhu.',
          'MQTT venu idhe task ku HTTP use pannuradhu — real-time command/control ku HTTP wrong fit.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Platform comparison',
      steps: [
        'HTTP vs MQTT table ezhudhunga (pattern, connection, best use).',
        'ThingSpeak free account create pannunga, oru test API key eduthu note pannunga (share pannadha!).',
        'Dashboard la edha display pannuva nu un smart home ku sketch pannunga (3 widgets).',
      ],
    },
    quiz: [
      {
        q: 'HTTP communication pattern?',
        options: [
          'Request-response',
          'Persistent push',
          'Broadcast',
          'Mesh',
        ],
        answer: 0,
        explain: 'HTTP = client requests, server responds, done. Stateless per-request model.',
      },
      {
        q: 'Status 401 meaning?',
        options: ['OK', 'Not found', 'Unauthorized (auth fail)', 'Server crash'],
        answer: 2,
        explain: '401 = unauthorized. API key wrong/missing. 200=OK, 404=not found, 500=server error.',
      },
      {
        q: 'Frequent small telemetry — best protocol?',
        options: ['HTTP GET each time', 'MQTT', 'Bluetooth Classic', 'USB'],
        answer: 1,
        explain: 'MQTT = persistent + tiny overhead + push. Frequent small messages efficient. HTTP = per-request overhead.',
      },
      {
        q: 'API key purpose?',
        options: [
          'Identity/authentication proof',
          'Encryption key only',
          'WiFi password',
          'Device serial number',
        ],
        answer: 0,
        explain: 'API key = "idhu authorized device/app" nu proof. Server request verify pannum.',
      },
    ],
  },

  // ---------------------------------------------------------- w10l5
  {
    id: 'w10l5',
    worldId: 'w10',
    title: 'Project: Sensor to Cloud',
    minutes: 12,
    sections: [
      {
        kind: 'intro',
        heading: 'Full IoT pipeline build',
        body: 'Ippo ella knowledge combine pannuvom: sensor → ESP32 → WiFi → MQTT → dashboard. Full flow code + architecture. Note: educational simulation — real ESP32 + public broker la test pannunga.',
      },
      {
        kind: 'explain',
        heading: 'Architecture',
        body: 'Components:\n1. DHT11 sensor (temp + humidity) → ESP32 GPIO\n2. ESP32: WiFi connect → MQTT broker connect → periodic publish\n3. Broker: broker.hivemq.com (public, test only)\n4. Subscriber: phone app (IoT MQTT Panel / MQTT Dashboard) or PC MQTT Explorer\n\nTopics:\n- home/room1/temperature (telemetry, 30s)\n- home/room1/humidity\n- home/room1/status (LWT: online/offline)\n\nFlow: DHT read → JSON payload build → publish → subscriber display. Commands reverse: home/room1/led subscribe → callback → LED control.',
      },
      {
        kind: 'analogy',
        heading: 'News agency analogy',
        body: 'DHT11 = reporter. ESP32 = correspondent office (collect + format). Broker = news agency (broker.hivemq.com). Subscriber apps = newspapers/websites. Reporter story anupum, agency distribute pannum, ella newspapers publish. Reporter nu direct-a phone number venum illa — agency topic mattum.',
      },
      {
        kind: 'visual',
        heading: 'Full code (educational)',
        code: '#include <WiFi.h>\n#include <PubSubClient.h>\n#include <DHT.h>\n\nDHT dht(4, DHT11);\nWiFiClient net;\nPubSubClient mqtt(net);\n\nvoid setup() {\n  Serial.begin(115200);\n  dht.begin();\n  WiFi.begin("SSID", "PASS");\n  while (WiFi.status() != WL_CONNECTED)\n    delay(500);\n  mqtt.setServer("broker.hivemq.com", 1883);\n}',
      },
      {
        kind: 'technical',
        heading: 'Loop + publish logic',
        list: [
          'void loop() { if (!mqtt.connected()) reconnect(); mqtt.loop(); static uint32_t last=0; if (millis()-last > 30000) { last=millis(); publishWeather(); } }',
          'void publishWeather() { float h = dht.readHumidity(); float t = dht.readTemperature(); if (isnan(t)) return; char buf[64]; snprintf(buf, 64, "{\\"t\\":%.1f,\\"h\\":%.1f}", t, h); mqtt.publish("home/room1/weather", buf); }',
          'Reconnect pattern: client.connect("esp32-room1-XX") retry loop with delay — network glitch resilient.',
          'Non-blocking style: delay(30000) kulla MQTT keepalive fail — millis() based scheduler use (mela code pattern).',
          'Test: phone MQTT app la same topic subscribe panni live data paakalam.',
        ],
      },
      {
        kind: 'example',
        heading: 'Expected flow',
        body: 'Serial monitor:\nWiFi connected, IP 192.168.1.42\nMQTT connected\npublish: {"t":27.5,"h":60.0}\n(30s later) publish: {"t":27.4,"h":60.2}\n\nPhone MQTT app (topic subscribe):\nhome/room1/weather → {"t":27.5,"h":60.0} live update!\n\nExtension ideas:\n1. LWT set panni status topic track.\n2. LED command topic subscribe + callback.\n3. Local threshold: temp > 30 → fan relay ON (edge logic).\n4. Data rate: change-based publish (temp change > 0.5 na mattum publish).',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Public broker la home security data publish — public = ellaarum paakalaam. Real deployment = private broker + TLS + auth.',
          'Blocking delay in loop — MQTT keepalive timeout, disconnect. millis() scheduler MUST.',
          'isnan() check miss — NaN payload publish panni dashboard corrupt.',
          'Unique client ID miss — reconnect loop conflict. ID la random number add.',
          'WiFi reconnect logic illa — router restart = device dead until manual reset.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Pipeline build',
      steps: [
        'Full code Arduino IDE ESP32 la run panni (SSID/PASS change), Serial output note pannunga.',
        'Phone la MQTT app download panni, "home/room1/weather" topic subscribe panni live data confirm.',
        'Extension: LED command topic add panni callback implement pannunga (guidance: mqtt.setCallback).',
        'Security note: edhu public broker la publish pannakoodadhu nu 3 items list pannunga.',
      ],
    },
    quiz: [
      {
        q: 'ESP32 → MQTT publish loop la delay(30000) problem?',
        options: [
          'MQTT keepalive/connection maintenance fail',
          'Code slower',
          'Memory leak',
          'Sensor damage',
        ],
        answer: 0,
        explain: 'mqtt.loop() 30s call pannadhu = keepalive timeout → disconnect. millis()-based scheduling + regular mqtt.loop().',
      },
      {
        q: 'Sensor → cloud pipeline order?',
        options: [
          'Sensor → MCU → network → broker/cloud → app',
          'App → sensor → MCU',
          'MCU → sensor → app',
          'Cloud → sensor → MCU',
        ],
        answer: 0,
        explain: 'Telemetry direction: sensor (perception) → MCU (format) → WiFi (network) → broker (route) → dashboard (view).',
      },
      {
        q: 'Public test broker la enna publish pannakoodadhu?',
        options: [
          'Test temperature data',
          'Passwords, secrets, personal data',
          'Weather demo',
          'LED status demo',
        ],
        answer: 1,
        explain: 'Public broker = ellaarum read access. Secrets/credentials NEVER. Private broker + TLS for real deployments.',
      },
      {
        q: 'isnan(t) check in publish function — why?',
        options: [
          'NaN payload = corrupt data in dashboard',
          'Speed optimization',
          'Memory save',
          'Required by MQTT spec',
        ],
        answer: 0,
        explain: 'DHT fail = NaN. Publish NaN = dashboard garbage. Early return = data quality guard.',
      },
    ],
  },
];

export const world10Boss: QuizQuestion[] = [
  {
    q: 'BOSS: IoT 4 layers order?',
    options: [
      'Perception → Network → Cloud/Processing → Application',
      'App → Cloud → Network → Sensor',
      'Network → Sensor → App → Cloud',
      'Cloud → App → Sensor → Network',
    ],
    answer: 0,
    explain: 'Data journey: sensors (perception) → transport (network) → processing (cloud) → user view (application).',
  },
  {
    q: 'BOSS: ESP32 WiFi band support?',
    options: ['2.4GHz only', '5GHz only', 'Both', 'None'],
    answer: 0,
    explain: 'ESP32 = 2.4GHz WiFi only. 5GHz network connect aagadhu.',
  },
  {
    q: 'BOSS: MQTT QoS levels meaning?',
    options: [
      '0=at most once, 1=at least once, 2=exactly once',
      '0=fastest speed tier',
      'Encryption levels',
      'Priority ranking',
    ],
    answer: 0,
    explain: 'QoS = delivery guarantee level. 0 = fire-forget, 1 = ack+retry (dup possible), 2 = exactly once (slowest).',
  },
  {
    q: 'BOSS: MQTT vs HTTP — best fit?',
    options: [
      'Frequent small telemetry = MQTT; occasional big requests = HTTP',
      'HTTP always better',
      'MQTT for files, HTTP for sensors',
      'No difference',
    ],
    answer: 0,
    explain: 'MQTT persistent + push + tiny overhead → telemetry. HTTP stateless request-response → occasional fetch/upload.',
  },
  {
    q: 'BOSS: Retain flag purpose?',
    options: [
      'Last message stored — new subscribers get current state instantly',
      'Message encryption',
      'Higher priority',
      'Auto delete',
    ],
    answer: 0,
    explain: 'Retain = broker keeps last per-topic message. New subscriber joins → immediately gets last value (light=ON).',
  },
  {
    q: 'BOSS: LWT (Last Will) use case?',
    options: [
      'Unexpected disconnect → broker publishes "device offline" message',
      'Encrypting the last message',
      'Priority boost for final topic',
      'Automatic firmware rollback',
    ],
    answer: 0,
    explain: 'LWT = pre-registered message broker publishes on unexpected disconnect → presence monitoring (device down alert).',
  },
  {
    q: 'BOSS: BLE chosen over Classic for sensor badge — reason?',
    options: [
      'Battery life (sleep between bursts)',
      'More range',
      'More bandwidth',
      'Free license',
    ],
    answer: 0,
    explain: 'BLE = Low Energy: short bursts + deep sleep. Battery = months. Classic = continuous streaming, power heavy.',
  },
];

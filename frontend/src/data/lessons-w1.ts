// ============================================================
// EMBEDQUEST — WORLD 1: COMPUTER FUNDAMENTALS
// Lessons are plain data (Lesson type in src/lib/types.ts).
// Tanglish style: Tamil written in English letters, technical
// terms stay in English. Teach one concept per lesson.
// ============================================================
import type { Lesson, QuizQuestion } from '../lib/types';

export const world1Lessons: Lesson[] = [
  // ---------------------------------------------------------- w1l1
  {
    id: 'w1l1',
    worldId: 'w1',
    title: 'What is a computer?',
    minutes: 8,
    sections: [
      {
        kind: 'intro',
        heading: 'Indha lesson la enna paakaporoam?',
        body: 'Computer na nu nenaikireenga, laptop/PC dhaan nu? Illa! Un phone, ATM machine, washing machine, smart TV, ellame computers. Intha lesson la computer oda real definition-a paakaporoam. Idhu un course oda foundation stone.',
      },
      {
        kind: 'explain',
        heading: 'Computer na enna?',
        body: 'Simple-a sollanum na: computer is a machine that takes input, processes it, gives output, and can store data.\n\n"Process" na enna? Rendu vishayam pannum:\n1. Calculations (2+2=4 maari)\n2. Decisions (idhu 10 ku mela irukka? illa keezha irukka? maari)\n\nIndha rendu vishayathaiyum romba speed-la, romba correct-a pannum. Second ku billions of calculations! Aana important point: computer ku common sense illa. Naama sollura instruction-a mattum dhaan follow pannum.',
      },
      {
        kind: 'analogy',
        heading: 'Cook analogy',
        body: 'Oru hotel cook-a nenaikunga. Avanga kitta ingredients (input) kudupom. Avanga cooking panraanga (process). Final-a food ready-a varum (output). Leftover food-a fridge la store pannuvaanga (storage). Computer um same style: input vaangitu, process panni, output kudukum, data va store pannum.',
      },
      {
        kind: 'visual',
        heading: 'Input → Process → Output',
        code: ' [INPUT]        [PROCESS]         [OUTPUT]\n keyboard  -->  +-----------+  -->  monitor\n mouse      --> |   CPU     |  -->  speaker\n sensor     --> | (brain)  |  -->  LED/motor\n                +-----------+\n                     |\n                     v\n                [STORAGE: files, data]',
      },
      {
        kind: 'technical',
        heading: 'Technical terms (English la note pannunga)',
        list: [
          'Input: data we give to the computer (keyboard, mouse, sensor).',
          'Process: calculation and decision making done by the CPU.',
          'Output: result shown by the computer (screen, speaker, LED).',
          'Storage: saving data permanently (hard disk, SD card).',
          'Data: raw values (23, "hello"). Information: meaningful processed data ("Room temp = 23°C, comfortable").',
        ],
      },
      {
        kind: 'example',
        heading: 'Step by step example',
        body: 'Calculator app la 25 + 75 type panraom nu nenaikunga:\n1. Keys press panrom → input (numbers 25, 75 and +)\n2. CPU calculates 25+75=100 → process\n3. Screen la "100" display aagum → output\n\nEmbedded systems la um same flow: temperature sensor gives input, microcontroller compares with limit (process), LED alarm ON aagum (output). So indha input-process-output model na un full career oda base model.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes (idhu avoid pannunga)',
        list: [
          '"Computer na laptop/PC dhaan" nu nenaikiradhu — phone um full computer.',
          'Computer human maari "think" pannum nu nenaikiradhu — adhu instruction follow pannum, think pannadhu.',
          'Data and information rendaium same nu nenaikiradhu — data raw, information processed.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Computer hunter',
      steps: [
        'Un veetla or phone la irukura 5 "computers" list pannunga (example: washing machine, TV remote, smart bulb...).',
        'Ovvonnum enna input, enna output nu oru line la ezhudhunga. Example: TV remote — input: button press, output: IR signal.',
        'Notebook la "I-P-O" model draw panni, temperature sensor example add pannunga.',
      ],
    },
    quiz: [
      {
        q: 'Computer oda four main functions enna?',
        options: [
          'Input, Process, Output, Storage',
          'Play, Pause, Stop, Restart',
          'Typing, Printing, Scanning, Copying',
          'Game, Music, Video, Browsing',
        ],
        answer: 0,
        explain: 'Computer = input vaangum, process pannum, output kudukkum, data store pannum. Idhu dhaan base definition.',
      },
      {
        q: '"Process" na enna?',
        options: [
          'Data va delete panradhu',
          'Calculation + decision making',
          'Internet browse panradhu',
          'Screen brightness maathradhu',
        ],
        answer: 1,
        explain: 'Processing = calculations + decisions. Adhu CPU oda main job.',
      },
      {
        q: 'Temperature sensor input output-la varuma, input-la varuma?',
        options: ['Input', 'Output', 'Storage', 'Process'],
        answer: 0,
        explain: 'Sensor environment data vaangitu computer kitta kudukum — so adhu input device.',
      },
      {
        q: 'Computer ku common sense irukka?',
        options: [
          'Yes, adhu automatic-a think pannum',
          'Illa, naama kudutha instruction-a mattum follow pannum',
          'New models la irukku',
          'AI phones la mattum irukku',
        ],
        answer: 1,
        explain: 'Computer oru very obedient machine. Naama ezhudha instruction-a mattum, exactly-a, follow pannum.',
      },
    ],
  },

  // ---------------------------------------------------------- w1l2
  {
    id: 'w1l2',
    worldId: 'w1',
    title: 'Hardware and Software',
    minutes: 8,
    sections: [
      {
        kind: 'intro',
        heading: 'Enna use irukku idhu?',
        body: '"Phone slow-a irukku" nu sollum bodhu, adhu hardware problem-a, software problem-a nu split pannathaan fix panna mudiyum. ECE student-a, un career la full-a intha two words dhaan rotate aagum: hardware design, software design, firmware.',
      },
      {
        kind: 'explain',
        heading: 'Hardware vs Software',
        body: 'Hardware = nee touch panna mudira physical parts. Keyboard, mouse, CPU chip, RAM stick, wires, LED ellam hardware.\n\nSoftware = hardware-a run pannura instructions/programs. Nee touch pannave mudiyadhu. Windows, WhatsApp, games, un C programs ellam software.\n\nSimple rule: can you touch it? → hardware. Is it instructions? → software.',
      },
      {
        kind: 'analogy',
        heading: 'Body and mind analogy',
        body: 'Human body na hardware — nee touch panna mudiyum, weight irukku. Namma thoughts/knowledge na software — touch pannave mudiyadhu, aana body-a move pannudhu. Same: hardware body, software mind.',
      },
      {
        kind: 'visual',
        heading: 'System split',
        code: '        COMPUTER SYSTEM\n        /            \\\n   HARDWARE        SOFTWARE\n   (touchable)     (instructions)\n    |    |            |        |\n  CPU  RAM  disk    OS     Apps\n                     |        |\n                 Windows   WhatsApp\n                 Android   C programs',
      },
      {
        kind: 'technical',
        heading: 'Software types',
        list: [
          'System software: computer-a manage pannudhu. Example: Operating System (Windows, Linux, Android), drivers.',
          'Application software: user-a work panna vaikkum. Example: MS Word, Chrome, games.',
          'Firmware: hardware kulla permanent-a flash panna software. Microcontrollers la idhu dhaan naama write pannurom — idhu thaan embedded systems oda heart! (World 7 la deep-a paakaporoam.)',
        ],
      },
      {
        kind: 'example',
        heading: 'Classify panni paakalam',
        body: 'Indha list-a split pannunga:\n1. Mouse → hardware (touchable device)\n2. MS Excel → software (application)\n3. Arduino bootloader → software (firmware — chip ulla irukkum, aana touch pannave mudiyadhu)\n4. SD card → hardware (physical storage)\n5. C program you write → software',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Software "box kulla irukku" nu nenaikiradhu — adhu instructions, physical object illa.',
          'Firmware and software different nu confuse panradhu — firmware is special software stored in hardware (ROM/flash).',
          'Pendrive la software "ottikitu irukkum" nu nenaikiradhu — pendrive stores files; files are data, not running software.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Hardware/Software sorter',
      steps: [
        'Indha 6 items-a two columns la split pannunga: CPU chip, Chrome browser, LED, Windows, RAM stick, Bluetooth driver.',
        'Ovvonru edge case um reason pannunga: "Chrome = application software because instructions, touch pannave mudiyadhu" maari.',
        'Un phone la oru app open pannunga and yentha hardware use aagudhu (screen, speaker, camera) nu note pannunga.',
      ],
    },
    quiz: [
      {
        q: 'Yedhu hardware?',
        options: ['WhatsApp', 'RAM stick', 'Windows 11', 'C program'],
        answer: 1,
        explain: 'RAM stick touch panna mudiyum — physical. Mathellam instructions dhaan.',
      },
      {
        q: 'Operating system yentha category?',
        options: [
          'Application software',
          'System software',
          'Hardware',
          'Firmware',
        ],
        answer: 1,
        explain: 'OS manages the computer itself, so it is system software.',
      },
      {
        q: 'Microcontroller ulla flash panna program-a enna solvaanga?',
        options: ['Driver', 'Firmware', 'App', 'Cache'],
        answer: 1,
        explain: 'Chip ulla store panna low-level software = firmware. Embedded engineer naama ithu dhaan daily write pannuvom.',
      },
      {
        q: 'Software-a touch panna mudiyuma?',
        options: ['Yes, download app maari', 'Illa, adhu instructions mattum', 'Only paid software', 'Only mobile apps'],
        answer: 1,
        explain: 'Software = instructions. Hardware dhaan touchable.',
      },
    ],
  },

  // ---------------------------------------------------------- w1l3
  {
    id: 'w1l3',
    worldId: 'w1',
    title: 'CPU, RAM, ROM & Storage',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Why this matters',
        body: '"Phone la 10 apps open pannina hang aagudhu" — adhu CPU-RAM story. Microcontroller la yethana variables hold pannalam nu decide panna RAM puriyanum. Embedded engineer ku intha lesson literally daily use aagum.',
      },
      {
        kind: 'explain',
        heading: 'Four pillars',
        body: 'CPU (Central Processing Unit) = computer oda brain. Ellaa calculations, decisions ithu dhaan pannum. Speed GHz la solluvaanga.\n\nRAM (Random Access Memory) = temporary working memory. Program run aagum bodhu data ithu la irukkum. Power off → RAM full empty. "Volatile" memory.\n\nROM (Read Only Memory) = startup instructions permanently written. Power off pannalum erase aagadhu. "Non-volatile".\n\nStorage (Hard disk/SSD/SD card) = files, apps, photos ellam long-term store pannura cupboard.',
      },
      {
        kind: 'analogy',
        heading: 'Student study analogy',
        body: 'Nee exam prepare panum bodhu:\n- Brain = CPU (solve pannudhu)\n- Table = RAM (ippo study panra pages mattum table la irukkum; table clean pannaa poidum)\n- Memorised rules = ROM (eppovum wipe aagadhu)\n- Book shelf = storage (ellaa books long-term irukkum)\n\nTable (RAM) small-a irundha, books (storage) la irundhu thirumba thirumba eduthu venum → slow! Phone hang kum idhu dhaan reason.',
      },
      {
        kind: 'visual',
        heading: 'Memory hierarchy flow',
        code: ' [STORAGE]        [RAM]          [CPU]\n long-term  -->  working copy --> calculates\n files,apps      while running    + decides\n     ^                                |\n     |         power OFF             |\n     +-- storage keeps    +--> RAM gone\n         data (non-vol)       (volatile)',
      },
      {
        kind: 'technical',
        heading: 'Technical detail',
        list: [
          'CPU speed: GHz (gigahertz) = billions of cycles per second. Cores = parallel workers count.',
          'RAM is volatile: power pona content erase. Size in GB. Microcontrollers la KB la dhaan (Arduino UNO = 2 KB RAM!).',
          'ROM family: PROM, EPROM, EEPROM, Flash. Modern chips la Flash memory use pannuvaanga (Arduino ulla 32 KB flash).',
          'Storage is also non-volatile, but ROM usually stores code that the chip itself runs.',
          'Embedded la "memory" nu sonna, usually RAM + Flash dhaan. Appropriate use pannanum.',
        ],
      },
      {
        kind: 'example',
        heading: 'Game open panum bodhu enna nadakudhu?',
        body: '1. Nee game icon click panra → OS request pannudhu\n2. Game files STORAGE (SSD) la irundhu RAM ku load aagum\n3. CPU RAM la irundhu instructions eduthu execute pannudhu\n4. Screen la graphics output\n\nPower off → RAM erase → adhaan next time thirumba load pannanum. Storage la game files still irukku.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'RAM storage maari nenaikiradhu — RAM temporary, storage permanent.',
          '"8GB RAM = 8GB storage" nu confuse panradhu — completely different roles.',
          'ROM la programs "run" aagum nu nenaikiradhu generally — ROM mainly stores startup/boot code.',
          'Microcontroller la RAM "sufficient-a irukkum" nu assume panradhu — UNO la 2 KB dhaan! Variable sizes matter.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Spec detective',
      steps: [
        'Un phone/laptop la Settings → About la RAM size and storage size paaru.',
        'CPU model + core count um note pannunga (laptop la Task Manager → Performance).',
        'Arduino UNO oda specs um kandupidi: 2 KB RAM, 32 KB Flash. Rendaium compare panni, why UNO RAM small nu oru line la justify pannunga.',
      ],
    },
    quiz: [
      {
        q: 'Power off pannum bodhu yedhu erase aagum?',
        options: ['ROM', 'RAM', 'SSD storage', 'Flash memory'],
        answer: 1,
        explain: 'RAM volatile — power pona erase. ROM/Flash/SSD non-volatile.',
      },
      {
        q: 'CPU role enna?',
        options: [
          'Files store panradhu',
          'Calculations + decisions (brain)',
          'Screen display',
          'Internet connection',
        ],
        answer: 1,
        explain: 'CPU = processing brain. Storage is a different component.',
      },
      {
        q: 'Arduino UNO la yethana RAM?',
        options: ['2 KB', '2 MB', '2 GB', '256 bytes'],
        answer: 0,
        explain: 'UNO la 2 KB SRAM dhaan. Embedded chips memory very small — efficient code venum!',
      },
      {
        q: 'Game files yeng irukum?',
        options: ['RAM la', 'CPU la', 'Storage la (SSD/HDD)', 'ROM la'],
        answer: 2,
        explain: 'Long-term files storage la. Run aagum bodhu RAM ku copy aagum.',
      },
    ],
  },

  // ---------------------------------------------------------- w1l4
  {
    id: 'w1l4',
    worldId: 'w1',
    title: 'Input and Output Devices',
    minutes: 8,
    sections: [
      {
        kind: 'intro',
        heading: 'Enna use?',
        body: 'Computer kita naama epdi pesuvom? Epdi avanga reply pannuvanga? Sensors and motors ellam input/output family dhaan. World 6, 8 la sensor interfacing paakum bodhu intha base venum.',
      },
      {
        kind: 'explain',
        heading: 'I/O basics',
        body: 'Input device = data-a computer ulla kootitu varudhu. Keyboard, mouse, mic, camera, touchscreen, sensor.\n\nOutput device = computer oda result-a velila kaatudhu. Monitor, speaker, printer, LED, motor, buzzer.\n\nThumb rule: data computer ulla pore → INPUT. Data computer la irundhu velila varum → OUTPUT.',
      },
      {
        kind: 'analogy',
        heading: 'Post office analogy',
        body: 'Post office: letters ulla varudhu (incoming) and velila povudhu (outgoing). Computer um same — input devices letters anupura postman, output devices reply anupura postman.',
      },
      {
        kind: 'visual',
        heading: 'I/O map',
        code: '           INPUT              OUTPUT\n        keyboard/mouse  -->  monitor\n        mic/camera      -->  speaker\n        touch panel     -->  printer\n        TEMPERATURE SENSOR -> LED/buzzer\n        IR sensor       -->  MOTOR\n     (sensors = inputs, actuators = outputs)',
      },
      {
        kind: 'technical',
        heading: 'Technical terms',
        list: [
          'Peripheral: CPU/RAM ku appuram irukkura attached devices (I/O devices + storage).',
          'Bidirectional device: both ways work pannum. Touchscreen = display (output) + touch sensing (input).',
          'Sensor: physical quantity (heat, light, distance) → electrical signal → data. Input.',
          'Actuator: electrical signal → physical action (motor, LED, relay). Output.',
          'Embedded systems la keyboard/monitor illa — sensors = inputs, LEDs/relays/motors = outputs.',
        ],
      },
      {
        kind: 'example',
        heading: 'Real project mapping',
        body: 'Automatic night lamp (World 12 project 2):\n- Input: LDR sensor (light level kudukum)\n- Process: microcontroller decides "dark-a?" (LDR value < threshold)\n- Output: LED ON\n\nIppo nee oru full embedded system oda I/O design understand pannitta!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Monitor input device nu nenaikiradhu — adhu output. (Touchscreen la display output + touch input.)',
          'Speaker input nu confuse panradhu — sound velila varum, so output.',
          'Sensor and actuator same nu nenaikiradhu — sensor senses (in), actuator acts (out).',
        ],
      },
    ],
    task: {
      title: 'Mini task: I/O safari',
      steps: [
        'Veetla irundhu 3 input devices + 3 output devices list pannunga.',
        'Un phone la touchscreen why bidirectional nu oru line la ezhudhunga.',
        'Future project idea: "smart dustbin" ku input/process/output 3 lines la plan pannunga.',
      ],
    },
    quiz: [
      {
        q: 'Yedhu input device?',
        options: ['Monitor', 'Keyboard', 'Speaker', 'Printer'],
        answer: 1,
        explain: 'Keyboard data ulla kootum = input. Monitor/speaker/printer output.',
      },
      {
        q: 'Sensor yentha side?',
        options: ['Output', 'Input', 'Storage', 'Processing'],
        answer: 1,
        explain: 'Sensor environment data vaangitu system kitta kudukum = input.',
      },
      {
        q: 'Touchscreen epdi work pannudhu?',
        options: [
          'Only output',
          'Only input',
          'Bidirectional: display out + touch in',
          'Neither',
        ],
        answer: 2,
        explain: 'Touchscreen display (output) and touch sensor (input) — both.',
      },
      {
        q: 'LED embedded system la yenna?',
        options: ['Input device', 'Output device (indicator)', 'Storage', 'CPU'],
        answer: 1,
        explain: 'LED output indicator. Microcontroller "sollura" LED on/off aagum.',
      },
    ],
  },

  // ---------------------------------------------------------- w1l5
  {
    id: 'w1l5',
    worldId: 'w1',
    title: 'Operating Systems',
    minutes: 9,
    sections: [
      {
        kind: 'intro',
        heading: 'Why care about OS?',
        body: 'Laptop on pannum bodhu desktop screen varudhu — adhu OS. ESP32 la adhu usually illa (bare metal / FreeRTOS). Difference purinjuka, OS na ennanu clear-a theriyanum.',
      },
      {
        kind: 'explain',
        heading: 'OS = manager',
        body: 'Operating System na oru big software that manages everything:\n1. Hardware-a control (CPU time, memory, devices)\n2. Programs-a run pannudhu (app open = OS loads it into RAM)\n3. Files organize pannudhu\n4. User interface kudukkum (desktop, touch UI)\n\nOS illa na, computer oru dead body. Windows, macOS, Linux, Android, iOS ellam OS.',
      },
      {
        kind: 'analogy',
        heading: 'Hotel manager analogy',
        body: 'Hotel la manager irupaanga: rooms allot pannuvaanga (memory), chef ku order solvaanga (CPU), customers ku service (user interface), complaints handle (errors). Chefs (apps) separate-a irupaanga, aana ellathukum manager dhaan coordinator. OS = that manager.',
      },
      {
        kind: 'visual',
        heading: 'Layer cake',
        code: ' +-------------------------+\n |  APPS (WhatsApp, games) |  <- top layer\n +-------------------------+\n |  OPERATING SYSTEM (OS)  |  <- manager\n +-------------------------+\n |  HARDWARE (CPU,RAM,I/O) |  <- bottom\n +-------------------------+',
      },
      {
        kind: 'technical',
        heading: 'Technical terms',
        list: [
          'Kernel: OS oda core part — hardware control direct-a ithu dhaan.',
          'Process: running program instance. OS oru process ku CPU time slices kudukkum (multitasking!).',
          'Embedded OS: microcontrollers la full OS heavy — adhanaala FreeRTOS maari small Real-Time OS use pannuvom (World 9).',
          'Linux: servers, Raspberry Pi la run aagum; embedded industry la romba important.',
        ],
      },
      {
        kind: 'example',
        heading: 'App open = enna nadakudhu?',
        body: '1. Icon tap → OS ku request\n2. OS app files-a storage la irundhu RAM ku load pannudhu\n3. OS oru process create pannudhu, CPU time allot pannudhu\n4. App windows/drawings screen la render aagudhu (OS help)\n5. Close → OS RAM clear, CPU time release\n\nMultitasking = OS romba fast-a apps vitte switch pannudhu, so ellam parallel-a irukku nu feel aagum.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          '"OS = desktop wallpaper/screen" nu nenaikiradhu — screen is just the UI; OS is the manager behind it.',
          'App and OS confuse panradhu — WhatsApp is an app that runs ON the OS.',
          'Microcontroller la Windows run pannalam nu nenaikiradhu — too heavy; small RTOS or no OS used.',
        ],
      },
    ],
    task: {
      title: 'Mini task: OS scout',
      steps: [
        'Un phone OS + version (Settings → About). Laptop OS + version.',
        'Linux distro rendu peru google pannunga (Ubuntu, Raspbian) — embedded/industry use ku.',
        'FreeRTOS name-a note pannunga: World 9 la naama ithu la task schedule pannaporoam.',
      ],
    },
    quiz: [
      {
        q: 'OS main role?',
        options: [
          'Games play pannradhu',
          'Hardware + programs manage panradhu',
          'Photos edit pannradhu',
          'Virus create panradhu',
        ],
        answer: 1,
        explain: 'OS = manager: hardware, memory, programs, files, UI ellam ithu dhaan.',
      },
      {
        q: 'Yedhu OS?',
        options: ['WhatsApp', 'Android', 'MS Word', 'Chrome'],
        answer: 1,
        explain: 'Android OS. Mathellam apps that run on an OS.',
      },
      {
        q: 'App open panum bodhu enna nadakudhu?',
        options: [
          'App storage la irundhu RAM ku load aagum',
          'App CPU ulla permanent-a irukum',
          'App ROM la replace aagum',
          'App monitor ulla save aagum',
        ],
        answer: 0,
        explain: 'OS loads app into RAM, gives CPU time. Run = in RAM.',
      },
      {
        q: 'Microcontroller la yenna use pannuvaanga, full Windows maari OS ku badhila?',
        options: ['Windows IoT', 'Small RTOS like FreeRTOS or no OS', 'macOS', 'Android'],
        answer: 1,
        explain: 'MCU resources small — full OS heavy. FreeRTOS (World 9) or bare-metal code.',
      },
    ],
  },

  // ---------------------------------------------------------- w1l6
  {
    id: 'w1l6',
    worldId: 'w1',
    title: 'How Programs Work',
    minutes: 9,
    sections: [
      {
        kind: 'intro',
        heading: 'The magic reveal',
        body: 'Nee WhatsApp tap pannum bodhu ulla enna nadakudhu? Program = instruction list, CPU = adha execute panra worker. Indha lesson purinjaa, "programming" fear 50% poidum.',
      },
      {
        kind: 'explain',
        heading: 'Instructions in order',
        body: 'Program na CPU execute pannura instruction list. Points:\n1. Instructions TOP to BOTTOM order la run aagum (one at a time!).\n2. CPU step: FETCH instruction → DECODE (enna nu purinjukum) → EXECUTE (panrudhu). Repeat millions of times per second.\n3. Branching (if/loops) na instruction order-a change pannum — "jump to step 5" maari.\n4. CPU ulla "Program Counter" (PC) register la current instruction address track aagum.\n\nImportant: CPU English puriyanum illa — binary machine instructions mattum dhaan puriyum (World 2 la binary deep dive!).',
      },
      {
        kind: 'analogy',
        heading: 'Recipe analogy',
        body: 'Cook ku step-by-step recipe kuduthirukalaam: "1. Heat oil. 2. Add onion. 3. IF onion golden THEN add tomato. 4. Repeat stirring 10 times." Cook oru step mattum pannum, then next. Computer um exactly same — very obedient cook.',
      },
      {
        kind: 'visual',
        heading: 'Fetch-Decode-Execute loop',
        code: '      +--------------------+\n      v                    |\n  [FETCH] instruction      |\n      |                    |\n  [DECODE] understand it   |\n      |                    |\n  [EXECUTE] do it ---------+\n\n  (millions of times per second!)',
      },
      {
        kind: 'technical',
        heading: 'Technical detail',
        list: [
          'Machine instruction: small binary operation (add two numbers, move data, jump).',
          'Instruction cycle: fetch-decode-execute loop, controlled by Program Counter.',
          'Branch instructions change the Program Counter → that is how if/else and loops work.',
          'Speed: CPU clock (GHz) sets how many cycles per second.',
        ],
      },
      {
        kind: 'example',
        heading: 'Trace a mini program',
        body: 'Pseudo program:\n1. sum = 0\n2. sum = sum + 5\n3. IF sum > 3 THEN print "big" ELSE print "small"\n\nExecution trace:\n- Step 1: sum = 0\n- Step 2: sum = 5\n- Step 3: 5 > 3 TRUE → print "big"\n\nComputer did exactly 3 steps, in order, one at a time. Conditional changed what ran at step 3.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'CPU ellaa steps same time la pannum nu nenaikiradhu — one instruction at a time (per core).',
          'CPU English/pseudo code purinjukum nu nenaikiradhu — only binary machine code.',
          'Order matter illa nu nenaikiradhu — order is EVERYTHING in programming.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Robot chef',
      steps: [
        'Oru robot ku tea podha instructions 6 steps la ezhudhunga — ambiguous step illama, exact-a.',
        'Oru IF condition add pannunga (example: IF sugar illa THEN ask user).',
        'Oru loop add pannunga (stir 5 times = repeat stir 5 times).',
        'Nee ezhudha steps la "computer puriyaadhu" nu oru step irukka nu check pannunga.',
      ],
    },
    quiz: [
      {
        q: 'CPU cycle order?',
        options: [
          'Execute-Fetch-Decode',
          'Fetch-Decode-Execute',
          'Decode-Execute-Fetch',
          'Store-Fetch-Run',
        ],
        answer: 1,
        explain: 'Fetch (edukkal) → Decode (purinjukkal) → Execute (seyyal). Repeat.',
      },
      {
        q: 'IF/loop CPU la epdi implement aagudhu?',
        options: [
          'CPU thinks and decides magically',
          'Branch instructions jump the Program Counter',
          'RAM rearranges instructions',
          'Compiler removes them',
        ],
        answer: 1,
        explain: 'Branch/jump instructions PC-a change pannum — adhu dhaan logic flow.',
      },
      {
        q: 'Program la instruction execution order?',
        options: ['Random', 'All at once', 'Top to bottom (unless branching)', 'Bottom to top'],
        answer: 2,
        explain: 'Sequential execution, branching jumps the flow. Order matters!',
      },
      {
        q: 'CPU yedhu puriyum?',
        options: ['English', 'Tamil', 'Binary machine instructions', 'Comments'],
        answer: 2,
        explain: 'CPU speaks only machine code (binary). Compilers translate for it.',
      },
    ],
  },

  // ---------------------------------------------------------- w1l7
  {
    id: 'w1l7',
    worldId: 'w1',
    title: 'What is Programming?',
    minutes: 9,
    sections: [
      {
        kind: 'intro',
        heading: 'From user to creator',
        body: 'App use panra bodhu nee user. Program ezhudha learn panna — nee creator. Embedded systems la naama C la hardware-a direct-a control panrom. Indha lesson C ku "why C" answer kudukkum.',
      },
      {
        kind: 'explain',
        heading: 'Programming = writing instructions',
        body: 'Programming na, computer ku follow panna instructions human-readable language la ezhudhuradhu. Indha language la "programming language" solluvaanga: C, C++, Python, JavaScript...\n\nYen C embedded ku special?\n1. Fast — compiled directly to machine code, minimal overhead\n2. Close to hardware — registers, memory direct access\n3. Small footprint — 2 KB RAM ulla kooda fit aagum\n4. Industry standard — Arduino, STM32, drivers, kernels la C everywhere\n\nProgramming skills = logic building. Syntax la adhu pinnadi varum.',
      },
      {
        kind: 'analogy',
        heading: 'Literal robot analogy',
        body: 'Oru robot ku "cups-a arrange pannu" nu sonna, robot confused: which cups? where? what arrangement? Programming la same — nee oru step um assume pannave mudiyadhu. "Cup-a pick pannu, table mela vaai, left side la vatchu" nu exact-a sollanum. Computer = zero common sense robot with infinite patience.',
      },
      {
        kind: 'visual',
        heading: 'Code journey',
        code: ' YOU (logic)     EDITOR           COMPILER\n write C   -->  hello.c   -->  machine code\n (algorithm)  (source code)  (CPU runs this)\n\n Problem -> Algorithm -> Code -> Test ->\n -> Fix (repeat!)',
      },
      {
        kind: 'technical',
        heading: 'Key terms',
        list: [
          'Algorithm: problem solve pannura step-by-step plan (language illama).',
          'Program: algorithm written in a programming language.',
          'Syntax: language oda grammar rules. Semicolon, braces etc.',
          'Bug: program la mistake. Debugging: bug-a find+fix pannradhu.',
          'High-level language: human-friendly (Python). Low-level: machine-friendly (assembly, C is mid-level).',
        ],
      },
      {
        kind: 'example',
        heading: 'Same task: English vs C',
        body: 'English: "LED on pannu, 1 second wait, LED off, 1 second wait" (repeat)\n\nC version:\n\n  while (1) {\n      digitalWrite(LED_PIN, HIGH);\n      delay(1000);\n      digitalWrite(LED_PIN, LOW);\n      delay(1000);\n  }\n\nSame logic, different language. World 6 la ithu real-a Arduino la run pannaporoam!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Syntax memorize panni, logic practice pannadhu — logic dhaan king.',
          '"Strong maths venum" nu bayapadradhu — 8th std maths + logic pothum (electronics la some maths needed later, slowly build).',
          'Copy-paste learning — AI tools use pannalaam, aana step-by-step understand pannama copy pannadhu.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Algorithm first',
      steps: [
        '"Phone charge pannradhu" algorithm-a 5 steps la ezhudhunga (exact steps).',
        'Ooru condition add pannunga: IF battery 100% THEN stop.',
        'World 1 poora "algorithm thinking" practice — syntax ellam World 3 la start aagum.',
      ],
    },
    quiz: [
      {
        q: 'Embedded systems ku yean C popular?',
        options: [
          'Games la use aagudhu',
          'Fast, hardware-close, small memory footprint',
          'English la ezhudha easy',
          'Free dhaan',
        ],
        answer: 1,
        explain: 'C = compiled, efficient, direct hardware access, tiny memory needs. Embedded perfect match.',
      },
      {
        q: 'Algorithm na?',
        options: [
          'Programming language',
          'Step-by-step problem solving plan',
          'Computer part',
          'Error message',
        ],
        answer: 1,
        explain: 'Algorithm = logic plan, language independent. Then we write it in code.',
      },
      {
        q: 'Computer oda nature?',
        options: [
          'Common sense irukku',
          'Very literal, follows exact instructions',
          'Lazy',
          'Emotional',
        ],
        answer: 1,
        explain: 'Literal robot mind. Exact instructions = exact behavior.',
      },
      {
        q: 'Syntax na?',
        options: [
          'Language grammar rules',
          'Hardware part',
          'Algorithm name',
          'Memory type',
        ],
        answer: 0,
        explain: 'Syntax = grammar of the programming language. Logic first, syntax alongside.',
      },
    ],
  },

  // ---------------------------------------------------------- w1l8
  {
    id: 'w1l8',
    worldId: 'w1',
    title: 'Compiler, Interpreter, Source & Machine Code',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'The translator story',
        body: 'CPU binary mattum puriyum, aana naama English-maari C la ezhudhom. Yaaru translate pannudhu? Compiler and interpreter. Embedded la compiler epdi work pannudhu nu purinja, Arduino/ESP32 upload puriyum.',
      },
      {
        kind: 'explain',
        heading: 'Four terms',
        body: 'Source code = nee ezhudha human-readable program (hello.c).\nMachine code = CPU puriya binary instructions (0101...).\nCompiler = whole program-a ONCE translate pannudhu, machine code file create pannudhu (C, C++, Rust).\nInterpreter = line by line, run aagum bodhu translate pannudhu (Python, JavaScript).\n\nC = compiled language. So: hello.c → compiler → hello.exe (PC) or .hex/.elf file (microcontroller).',
      },
      {
        kind: 'analogy',
        heading: 'Translator analogy',
        body: 'Speech la Tamil orator, English audience:\n- Compiler = full speech munnadiye full-a translate panni paper la kodukura translator (fast execution later).\n- Interpreter = speaker pesum bodhu line-by-line live translate panra translator (slower, flexible).\n\nCompiled programs fast; interpreted flexible but slower.',
      },
      {
        kind: 'visual',
        heading: 'Compilation flow',
        code: ' hello.c --> [COMPILER] --> hello.hex\n     ^                        |\n     |                        v\n  you edit              CPU runs it\n\n Python: script.py --> [INTERPRETER]\n                       (line by line)',
      },
      {
        kind: 'technical',
        heading: 'Technical detail',
        list: [
          'Compilation stages in C: Preprocess → Compile → Assemble → Link. Final = executable or hex file.',
          'Linker: multiple code files + libraries-a oru single program-a combine pannudhu.',
          'Cross-compiler: PC la run aagura compiler, aana output microcontroller ku target pannudhu (avr-gcc for Arduino).',
          'Compile-time error: compiler catch pannudhu (syntax). Runtime error: run aagum bodhu crash (logic).',
        ],
      },
      {
        kind: 'example',
        heading: 'C vs Python flow',
        body: 'C:\n1. hello.c ezhudhu\n2. gcc hello.c -o hello\n3. ./hello run\n(machine code ready — fast!)\n\nPython:\n1. hello.py ezhudhu\n2. python hello.py\n(interpreter reads + runs each line — slower, easier to start)\n\nArduino: sketch.c++ → avr-gcc cross-compile → .hex file → USB upload → chip ulla flash → reset la CPU ithu run pannum.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          '.c file-a chip ulla direct upload pannalam nu nenaikiradhu — first compile to hex, then upload.',
          'Compiler error and runtime error confuse panradhu — compile error = build bodhu, runtime = run bodhu.',
          '"Python compiler" nu solradhu — Python mainly interpreted.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Translation mapper',
      steps: [
        'Paper la draw pannunga: hello.c → [COMPILER] → hello.hex → [ARDUINO UNO] → LED blink.',
        'Ovvonru arrow ku label: "source code", "machine code", "upload".',
        'Yean C chip ulla direct ezhudha mudiyadhu nu oru line la reason.',
      ],
    },
    quiz: [
      {
        q: 'Compiler enna pannum?',
        options: [
          'Runs code line by line',
          'Translates whole source code to machine code at once',
          'Deletes bugs',
          'Stores files',
        ],
        answer: 1,
        explain: 'Compiler = full translation first, then the machine code file runs.',
      },
      {
        q: 'Interpreter maari work panra language?',
        options: ['C', 'C++', 'Python', 'Assembly'],
        answer: 2,
        explain: 'Python is interpreted line-by-line. C/C++ are compiled.',
      },
      {
        q: 'Arduino upload pannura file format?',
        options: ['.docx', '.hex', '.py', '.txt'],
        answer: 1,
        explain: 'Cross-compiled machine code = .hex file uploaded to flash.',
      },
      {
        q: 'Missing semicolon error yenna type?',
        options: ['Runtime error', 'Compile-time error', 'Logic bug', 'No error'],
        answer: 1,
        explain: 'Syntax issues are caught at compile time by the compiler.',
      },
      {
        q: 'Cross-compiler na?',
        options: [
          'Runs code on two machines',
          'Compiles on PC but targets another chip',
          'A debugger',
          'An interpreter',
        ],
        answer: 1,
        explain: 'PC la run, output MCU ulla run aagum — embedded workflow base.',
      },
    ],
  },
];

export const world1Boss: QuizQuestion[] = [
  {
    q: 'BOSS: "My phone froze with 15 apps open" — root cause most likely?',
    options: [
      'ROM full',
      'RAM/CPU overloaded',
      'Storage full',
      'OS deleted',
    ],
    answer: 1,
    explain: 'Too many apps = RAM pressure + CPU time slicing overload → freeze.',
  },
  {
    q: 'BOSS: Correct flow for embedded program?',
    options: [
      'Write C → compile to hex → upload to chip',
      'Write C → upload .c to chip',
      'Type binary directly on chip',
      'Write Python → chip runs it',
    ],
    answer: 0,
    explain: 'Source → cross-compile → machine code (hex) → flash → run.',
  },
  {
    q: 'BOSS: Washing machine "program" is best described as?',
    options: [
      'Hardware',
      'Firmware (software stored in the machine)',
      'Operating system',
      'Storage device',
    ],
    answer: 1,
    explain: 'Embedded firmware inside the controller runs the wash cycles.',
  },
  {
    q: 'BOSS: Yedhu volatile?',
    options: ['Flash', 'EEPROM', 'SRAM', 'SSD'],
    answer: 2,
    explain: 'RAM (SRAM/DRAM) loses data on power off. Flash/EEPROM/SSD keep it.',
  },
  {
    q: 'BOSS: Ultrasonic sensor + buzzer system: sensor is ___, buzzer is ___?',
    options: [
      'output / input',
      'input / output',
      'storage / process',
      'process / storage',
    ],
    answer: 1,
    explain: 'Sensor gives data in (input); buzzer makes sound out (output).',
  },
  {
    q: 'BOSS: Which statement is TRUE?',
    options: [
      'CPU understands Tamil',
      'Programs run in random order',
      'CPU executes fetched instructions one by one',
      'RAM keeps data forever',
    ],
    answer: 2,
    explain: 'Fetch→Decode→Execute, sequential (per core), PC tracked. RAM is volatile.',
  },
];

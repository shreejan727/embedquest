// ============================================================
// EMBEDQUEST — WORLD 9: RTOS & FreeRTOS
// RTOS basics, tasks & scheduling, task states, semaphores &
// mutexes, queues, FreeRTOS hands-on (ESP32).
// ============================================================
import type { Lesson, QuizQuestion } from '../lib/types';

export const world9Lessons: Lesson[] = [
  // ---------------------------------------------------------- w9l1
  {
    id: 'w9l1',
    worldId: 'w9',
    title: 'RTOS — Why Do We Need It?',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Superloop oda breaking point',
        body: 'Illa nu nenaikura varaikkam superloop (while(1) loop) super. Aana project big aagum bodhu: LED blink, button read, sensor read, WiFi — ellaam ore loop la delay() pottu manage panna mudiyuma? Indha lesson la adha paakalam.',
      },
      {
        kind: 'explain',
        heading: 'Superloop problem',
        body: 'Superloop structure:\nwhile (1) {\n  readButton();\n  delay(500);      // blocking!\n  readSensor();\n  delay(500);      // blocking again!\n}\n\nProblems:\n1. Blocking delays: delay(500) time la CPU sleep — button press 500ms miss aagum.\n2. No priorities: emergency stop button = temperature read = same importance.\n3. Timing drift: loop iteration time varies → periodic tasks drift.\n4. Scalability: 10th feature add pannum bodhu whole timing collapse.\n\nRTOS (Real-Time Operating System) solution: multiple tasks (small independent functions), scheduler CPU time slice pannum, priorities support, timing accurate.',
      },
      {
        kind: 'analogy',
        heading: 'One cook vs restaurant manager',
        body: 'Superloop = one cook doing everything sequentially: rice vachutu 20 min wait (delay), then curry, then dessert. Orders backlog aagum.\nRTOS = restaurant manager: 4 cooks (tasks), cook 1 rice (priority 1), cook 2 curry (priority 2)... Manager (scheduler) assigns stoves, tracks who ready. Blocking illa — waiting task stove release pannum, other cook use pannuva. Parallel-ish work, better throughput.',
      },
      {
        kind: 'visual',
        heading: 'Superloop vs RTOS timeline',
        code: 'SUPERLOOP (sequential):\n [btn][delay 500][sensor][delay 500]\n -> button press during delay = MISSED\n\nRTOS (scheduler):\n |t1|t2|t3|t1|t1|t2|t3|  (time slices)\n t1=LED task  t2=btn task\n t3=sensor task, switch every 1ms',
      },
      {
        kind: 'technical',
        heading: 'Real-time meaning',
        list: [
          'Real-time ≠ fast. Real-time = predictable/deterministic deadline guarantee.',
          'Hard real-time: deadline miss = disaster. Example: airbag fire within 10ms, pacemaker.',
          'Soft real-time: deadline miss = quality drop, no disaster. Example: video stream occasional frame drop.',
          'RTOS key: worst-case response time bounded and known — not just average.',
          'Examples: FreeRTOS (MCU), Zephyr, VxWorks, QNX (critical systems).',
        ],
      },
      {
        kind: 'example',
        heading: 'Three-LED problem',
        body: 'Task: LED1 blink 100ms, LED2 blink 500ms, LED3 blink 1000ms, button monitor.\n\nSuperloop: delay math nightmare — common divisor loop, button response inconsistent, adding LED4 = recalculate everything.\n\nFreeRTOS:\nxTaskCreate(led1Task, ...);  // 100ms\nxTaskCreate(led2Task, ...);  // 500ms\nxTaskCreate(led3Task, ...);  // 1000ms\nxTaskCreate(btnTask, ...);\n\nOvvonru task independent. LED4 add na — one line. Idhu dhaan RTOS power.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          '"RTOS = speed" nu nenaikiradhu — RTOS = predictability. Sometimes slower raw throughput!',
          'Ella project um RTOS vachuradhu — small superloop project ku RTOS overhead waste.',
          'delay() RTOS tasks la use pannuradhu — vTaskDelay() use pannanum (next lessons).',
          'Deadline requirements document pannadhaama design — real-time = deadlines first!',
        ],
      },
    ],
    task: {
      title: 'Mini task: RT vs fast',
      steps: [
        'Hard real-time 3 examples (safety critical) + soft real-time 3 examples list pannunga.',
        '"Restaurant manager" analogy use panni RTOS explanation 3 lines ezhudhunga.',
        'Un current mini-project (LED+button) la superloop oda 2 limitations identify pannunga.',
      ],
    },
    quiz: [
      {
        q: 'Real-time system meaning?',
        options: [
          'Always super fast',
          'Predictable/deterministic deadline guarantee',
          'Internet connected',
          'Wireless',
        ],
        answer: 1,
        explain: 'Real-time = worst-case response time bounded/known. Speed secondary, predictability primary.',
      },
      {
        q: 'Airbag controller oda real-time type?',
        options: ['Soft real-time', 'Hard real-time', 'No real-time', 'Batch processing'],
        answer: 1,
        explain: 'Airbag = hard real-time. Deadline miss (10ms scale) = life-threatening. No tolerance.',
      },
      {
        q: 'Superloop delay() oda problem?',
        options: [
          'CPU block — other events miss',
          'Memory leak',
          'Voltage drop',
          'Code unreadable',
        ],
        answer: 0,
        explain: 'delay() = blocking wait. During it, button press/sensor events missed. RTOS vTaskDelay releases CPU.',
      },
      {
        q: 'RTOS scheduler job?',
        options: [
          'Decide which task runs now',
          'Compile code',
          'Flash firmware',
          'Generate clock',
        ],
        answer: 0,
        explain: 'Scheduler = task-ready list manage panni CPU time assign pannudhu. Priorities + timing based.',
      },
    ],
  },

  // ---------------------------------------------------------- w9l2
  {
    id: 'w9l2',
    worldId: 'w9',
    title: 'Tasks & Scheduling',
    minutes: 11,
    sections: [
      {
        kind: 'intro',
        heading: 'Task = function with superpowers',
        body: 'RTOS la "task" = normal function maari irukum, aana scheduler adha independent-a run pannum. Indha lesson la task create panni, scheduler epdi manage pannudhu nu paakalam.',
      },
      {
        kind: 'explain',
        heading: 'Task anatomy',
        body: 'Every task:\n1. Task function: infinite loop structure (task never returns!)\nvoid myTask(void *param) {\n  for (;;) {\n    // work\n    vTaskDelay(pdMS_TO_TICKS(100));\n  }\n}\n2. Stack: task oda own memory area (local variables, call history). ESP32 la bytes la size; classic FreeRTOS words la.\n3. Priority: number, higher = more important.\n4. Name: debug purposes string.\n\nxTaskCreate(myTask, "sensor", 2048, NULL, 2, NULL);\n//          fn      name   stack   param prio handle',
      },
      {
        kind: 'analogy',
        heading: 'Employee with own desk analogy',
        body: 'Task = employee. Priority = seniority. Stack = andha employee oda own desk (own notes, own space). Scheduler = manager deciding "ippo yaar work pannuva". Priority high employee emergency (higher priority task ready) na current work pause pannitu first handle pannuva — idhu dhaan preemption.',
      },
      {
        kind: 'visual',
        heading: 'Preemptive priority scheduling',
        code: 'Priority 3: [EMERGENCY task]\nPriority 2: [sensor task]  [runs]\nPriority 1: [LED task]\nPriority 0: [idle task]\n\nRule: highest-priority READY runs now.\nSame priority -> round-robin slices.\nLow runs only when high are blocked.',
      },
      {
        kind: 'technical',
        heading: 'Scheduling rules',
        list: [
          'Preemptive: higher priority task ready aana bodhu, running task paused immediately — context switch.',
          'Round-robin: same priority tasks share CPU in time slices (FreeRTOS default 1 tick).',
          'Idle task: priority 0, always exists — nothing ready na idle task runs (low power hooks here).',
          'Priority numbers: FreeRTOS la higher number = higher priority. (Some RTOS reversed — check docs!)',
          'Task never returns: for(;;) loop mandatory. Task function return pannina crash/hang.',
        ],
      },
      {
        kind: 'example',
        heading: 'Priority in action',
        body: 'Tasks:\n- btnTask priority 3 (emergency stop)\n- displayTask priority 1\n- logTask priority 1\n\nScenario: display running → button press → btnTask READY → display instantly paused → btnTask runs → done → display resumes exactly where paused.\n\nPreemption = user never feels button lag. Superloop la idhu impossible (button wait 500ms+).',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Ella task um priority 5 (max) — priorities meaningless, scheduling broken.',
          'Stack size too small — variables overflow into other task memory, random crash. 2048+ bytes safe start.',
          'Task function la return — undefined behavior. for(;;) wrapper MUST.',
          'Priority inversion awareness miss (next lessons la mutex fix paakaporoam).',
        ],
      },
    ],
    task: {
      title: 'Mini task: Priority design',
      steps: [
        'Smart home controller tasks list pannunga (gas leak detect, display, WiFi upload, LED) — ovvonrukum priority number assign + reason.',
        'xTaskCreate call for "ledTask" ezhudhunga: name "led", stack 2048, priority 1.',
        'Preemptive vs round-robin difference 2 lines la ezhudhunga.',
      ],
    },
    quiz: [
      {
        q: 'Higher priority number in FreeRTOS means?',
        options: ['Lower importance', 'Higher importance', 'Faster clock', 'More memory'],
        answer: 1,
        explain: 'FreeRTOS la higher number = higher priority. Priority 3 > priority 1.',
      },
      {
        q: 'Task function structure?',
        options: [
          'return after one run',
          'for(;;) infinite loop',
          'while with counter exit',
          'No loop needed',
        ],
        answer: 1,
        explain: 'Task = never-ending service. for(;;) loop + vTaskDelay standard pattern.',
      },
      {
        q: 'Preemption na enna?',
        options: [
          'High priority task pauses running low priority task immediately',
          'Task deletion',
          'Memory allocation',
          'Clock setup',
        ],
        answer: 0,
        explain: 'Preemption = scheduler high-priority ready task-a force-a run panna vaikum. Current task paused, later resumes.',
      },
      {
        q: 'Stack size unit in ESP32 Arduino xTaskCreate?',
        options: ['Bits', 'Bytes', 'Words', 'KB'],
        answer: 1,
        explain: 'ESP32/ESP-IDF port la stack size = bytes. Classic FreeRTOS docs la words (4 bytes each) — port difference note!',
      },
    ],
  },

  // ---------------------------------------------------------- w9l3
  {
    id: 'w9l3',
    worldId: 'w9',
    title: 'Task States & Context Switch',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Task "irukku" — aana enna state?',
        body: 'Task always CPU la irukadhu — waiting, ready, running, suspended states la rotate aagum. Indha states purincha, RTOS behaviour predict panna mudiyum. Plus context switch = RTOS oda backstage magic.',
      },
      {
        kind: 'explain',
        heading: 'Four states',
        body: '1. RUNNING: ippo CPU la irukku. Ore time la ore running task (single core).\n2. READY: run panna ready, CPU wait. Scheduler next turn kudukum bodhu run aagum.\n3. BLOCKED: waiting for event — vTaskDelay timeout, queue data, semaphore. Event varum varai CPU use pannadhu.\n4. SUSPENDED: manually paused (vTaskSuspend). Scheduler ignore pannum until resume.\n\nKey insight: BLOCKED task CPU konsum pannadhu! vTaskDelay(1000) la task 1 second full CPU free — other tasks use. Idhu dhaan delay() vs vTaskDelay() mega difference.',
      },
      {
        kind: 'analogy',
        heading: 'Restaurant table analogy',
        body: 'RUNNING = ippo sapidura person. READY = table ku wait panra person (enter ready, seat venum). BLOCKED = "friend varum bodhu dhaan order poren" nu waiting — vaai illa CPU illa waste illa. SUSPENDED = "naan 30 min late varren, table venaam" — reservation paused.',
      },
      {
        kind: 'visual',
        heading: 'State transitions',
        code: '          event arrives\n  READY -------------> RUNNING\n   ^  preempted          |\n   |                     | wait event/delay\n   |                     v\n   +------------------ BLOCKED\n            event done\n\n  SUSPENDED <-> (vTaskSuspend / Resume)',
      },
      {
        kind: 'technical',
        heading: 'Context switch',
        list: [
          'Context = task oda CPU registers snapshot (program counter, stack pointer, general registers).',
          'Context switch: current task context save → next task context restore → jump. Microseconds la nadakkum.',
          'Trigger: tick interrupt (every 1ms default), higher priority task becomes ready, task blocks itself.',
          'Tick = RTOS heartbeat (configTICK_RATE_HZ). All vTaskDelay counts in ticks.',
          'pdMS_TO_TICKS(ms) macro: milliseconds → ticks convert. Tick rate different boards different!',
        ],
      },
      {
        kind: 'example',
        heading: 'delay() vs vTaskDelay() proof',
        body: 'Two tasks on ESP32:\nTask A: for(;;){ work(); delay(1000); }   // Arduino delay\nTask B: for(;;){ work(); vTaskDelay(pdMS_TO_TICKS(1000)); }\n\nTask A delay la: CPU busy-wait (spin) — Task B ready aana kooda A delay mudikkum varaikkam preemption block... actually delay() blocking loop la scheduler run aagave mudiyadhu (loopTask busy). B starves.\n\nTask B vTaskDelay: B goes BLOCKED, CPU free, A um run aagum. Idhu dhaan cooperative vs RTOS difference. Rule: RTOS code la delay() NEVER inside tasks.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Tasks kulla Arduino delay() use pannuradhu — CPU spin, other tasks starve.',
          'pdMS_TO_TICKS miss pannuradhu — vTaskDelay(1000) na 1000 TICKS (not ms)! Tick rate dependent bug.',
          'Blocked = suspended nu confuse pannuradhu — blocked = event wait (auto), suspended = manual pause.',
          'Busy-wait loops (while(!ready);) tasks la — CPU 100% waste. Event-based (queue/semaphore) use pannunga.',
        ],
      },
    ],
    task: {
      title: 'Mini task: State tracker',
      steps: [
        'Scenario draw: task running → delay call → state? → delay over → state? → schedule → state? Trace pannunga.',
        'delay() vs vTaskDelay() table ezhudhunga (CPU usage, other tasks impact).',
        'Context switch na enna nu un words la 2 lines ezhudhunga.',
      ],
    },
    quiz: [
      {
        q: 'vTaskDelay(1000) la task state?',
        options: ['RUNNING', 'READY', 'BLOCKED', 'DELETED'],
        answer: 2,
        explain: 'vTaskDelay = BLOCKED state. CPU free — other tasks run. Idhu dhaan RTOS advantage.',
      },
      {
        q: 'Ore time la evlo tasks RUNNING (single core)?',
        options: ['Many', 'Exactly one', 'Zero', 'Depends on RAM'],
        answer: 1,
        explain: 'Single core = one running task at a time. Others READY/BLOCKED. Dual core (ESP32) = two.',
      },
      {
        q: 'Context switch na?',
        options: [
          'Save current task registers, restore next task registers',
          'Delete task',
          'Change priority',
          'Stack overflow',
        ],
        answer: 0,
        explain: 'Context = CPU register snapshot. Switch = save current + restore next. Microsecond scale.',
      },
      {
        q: 'pdMS_TO_TICKS(500) tick rate 1000Hz la → ticks?',
        options: ['5', '50', '500', '5000'],
        answer: 2,
        explain: '1000Hz = 1ms per tick → 500ms = 500 ticks. Tick rate different na value different — macro always use.',
      },
      {
        q: 'SUSPENDED vs BLOCKED difference?',
        options: [
          'Same thing',
          'Suspended = manual pause (vTaskSuspend), blocked = event wait (auto)',
          'Suspended uses more CPU',
          'Blocked only for ISRs',
        ],
        answer: 1,
        explain: 'Suspended = explicit manual pause until vTaskResume. Blocked = waiting for delay/queue/semaphore event.',
      },
    ],
  },

  // ---------------------------------------------------------- w9l4
  {
    id: 'w9l4',
    worldId: 'w9',
    title: 'Semaphores & Mutexes',
    minutes: 11,
    sections: [
      {
        kind: 'intro',
        heading: 'Tasks eppadi safely pesuvanga?',
        body: 'Rendu tasks ore printer use pannum bodhu pages mix aagum. Ore variable rendu task update pannina data corrupt aagum. Indha lesson la synchronization tools — semaphores and mutexes.',
      },
      {
        kind: 'explain',
        heading: 'Semaphore = signal flag',
        body: 'Binary semaphore = "event happened!" flag. Two operations:\n- xSemaphoreGive: flag raise (ISR or producer task)\n- xSemaphoreTake: flag wait + lower (consumer task)\n\nClassic use: ISR → task signaling. ISR la heavy work panna mudiyadhu, so ISR just "give" semaphore, task wake up full work pannum.\n\nCounting semaphore = flag with count. Multiple events queue-up (example: 3 items produced). Resource pool counting (5 buffers available).\n\nMutex = lock for shared resource. One task owns lock, others wait. Unlock = release. Guarantees exclusive access.',
      },
      {
        kind: 'analogy',
        heading: 'Doorbell vs bathroom key',
        body: 'Semaphore = doorbell. Visitor press (give), you open and attend (take), doorbell reset. Multiple doorbells presses count = counting semaphore.\nMutex = bathroom single key. One person key eduthukitu ullle (lock). Others key wait. Out aana key return (unlock). Ore time la ore person dhaan inside — resource protected.',
      },
      {
        kind: 'visual',
        heading: 'ISR → task semaphore flow',
        code: 'ISR (button press):\n   xSemaphoreGiveFromISR(flag, ...)\n        |\n        v\nTask (was BLOCKED):\n   xSemaphoreTake(flag, portMAX_DELAY)\n   -> wakes up!\n   -> full processing (slow OK here)',
      },
      {
        kind: 'technical',
        heading: 'Semaphore vs mutex — when which',
        list: [
          'Binary semaphore: ISR-to-task signaling, event notification. No ownership concept.',
          'Counting semaphore: multiple similar events, resource pool count.',
          'Mutex: protect shared resource (I2C bus, file, global struct) between tasks. Ownership + priority inheritance.',
          'Priority inheritance: low-priority task holds mutex, high-priority waits → low task temporarily boosted — priority inversion fix!',
          'Rule: mutex TASKS kulla mattum. ISR la mutex take/give NEVER. ISR signaling = semaphore FromISR variants dhaan.',
        ],
      },
      {
        kind: 'example',
        heading: 'I2C bus mutex',
        body: 'SemaphoreHandle_t i2cLock;\n\nsetup: i2cLock = xSemaphoreCreateMutex();\n\ntaskA: xSemaphoreTake(i2cLock, portMAX_DELAY);\n       readSensor();  // full transaction\n       xSemaphoreGive(i2cLock);\n\ntaskB: same pattern\n\nWithout mutex: taskA mid-transaction la taskB interrupts → I2C messages mixed → sensor garbage data. With mutex: transactions atomic. portMAX_DELAY = wait forever (careful — deadlock design check!).',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Mutex ISR la use pannuradhu — crash risk. ISR = FromISR semaphore only.',
          'Semaphore vs mutex confusion — signaling na semaphore, resource protection na mutex.',
          'portMAX_DELAY everywhere — one bug na whole system stuck. Realistic timeouts better.',
          'Give without Take pairing miss — semaphore count drifts, logic breaks.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Sync selector',
      steps: [
        'Scenarios classify: (1) ISR button → task process, (2) two tasks share LCD, (3) 3 ADC buffers pool. Semaphore/mutex/counting nu answer + reason.',
        'Doorbell vs bathroom key analogy 3 lines ezhudhunga.',
        'Priority inheritance problem fix eppadi nu 2 lines.',
      ],
    },
    quiz: [
      {
        q: 'ISR → task signaling best tool?',
        options: ['Mutex', 'Binary semaphore (FromISR)', 'Global int', 'delay'],
        answer: 1,
        explain: 'Binary semaphore = event flag. FromISR variants ISR-safe. Task blocks on take, wakes on give.',
      },
      {
        q: 'Shared I2C bus protection tool?',
        options: ['Mutex', 'Binary semaphore', 'Queue', 'volatile'],
        answer: 0,
        explain: 'Mutex = resource lock with ownership + priority inheritance. Exclusive access guarantee.',
      },
      {
        q: 'Priority inheritance fixes?',
        options: ['Stack overflow', 'Priority inversion', 'Memory leak', 'Deadlock'],
        answer: 1,
        explain: 'Priority inversion: low task holds lock, high task waits, medium tasks preempt low → high waits longer than needed. Inheritance boosts low task temporarily.',
      },
      {
        q: 'ISR la mutex use pannalama?',
        options: ['Yes always', 'NO — never', 'Only short', 'Only dual core'],
        answer: 1,
        explain: 'Mutex = blocking wait possible — ISR la block = disaster. ISR la FromISR semaphore/give only.',
      },
      {
        q: 'Counting semaphore use case?',
        options: [
          'Single event flag',
          'Multiple events count / resource pool',
          'Data transfer',
          'Timing',
        ],
        answer: 1,
        explain: 'Counting semaphore = count track (5 buffers, 3 events pending). Binary = just flag.',
      },
    ],
  },

  // ---------------------------------------------------------- w9l5
  {
    id: 'w9l5',
    worldId: 'w9',
    title: 'Queues — Task Data Highways',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Data pass panna safe way',
        body: 'Semaphore "event" sollum, aana data anupadhu illa. Sensor value, button count, message — data transfer ku FreeRTOS Queue. Thread-safe, ISR-safe, FIFO. Indha lesson la paakalam.',
      },
      {
        kind: 'explain',
        heading: 'Queue basics',
        body: 'Queue = FIFO (first-in-first-out) buffer, RTOS manage pannum.\n\n- xQueueCreate(length, itemSize): length = max items, itemSize = bytes per item.\n- xQueueSend(q, &value, timeout): enqueue (copy by value!).\n- xQueueReceive(q, &buffer, timeout): dequeue into buffer.\n- Copy semantics: pointer anupave mudiyadhu direct — struct copies. Idhu safety feature (two tasks same memory touch pannadhu).\n- Timeout: 0 = non-blocking, portMAX_DELAY = wait forever, ticks = specific wait.\n\nISR variants: xQueueSendFromISR, xQueueReceiveFromISR — ISR-safe.',
      },
      {
        kind: 'analogy',
        heading: 'Post office pigeonholes',
        body: 'Queue = fixed-size letter rack. Sender letter drop (send), receiver oldest letter take (receive). Full rack na sender wait/leave (timeout). Empty na receiver wait. Rack = RTOS protects — no two people same letter grab (thread-safe).',
      },
      {
        kind: 'visual',
        heading: 'Producer-consumer with queue',
        code: ' ISR/producer            consumer task\n  xQueueSend --> [Q:3] --> xQueueReceive\n  (sensor val)   |FIFO|    (process+show)\n\nFull   -> send blocks/timeout\nEmpty  -> receive blocks/timeout',
      },
      {
        kind: 'technical',
        heading: 'Queue design patterns',
        list: [
          'ISR sends small data → task processes: xQueueSendFromISR in ISR, xQueueReceive in task. Golden pattern!',
          'Multiple producers one consumer: sensor tasks ellaam same queue send — natural merge point.',
          'Queue of struct: {type, value, timestamp} packets — message passing architecture.',
          'Queue length = burst tolerance. Sensor 100Hz, display 10Hz → queue absorbs difference.',
          'Peek: xQueuePeek = read without remove (inspect).',
        ],
      },
      {
        kind: 'example',
        heading: 'Button ISR → counter task',
        body: 'QueueHandle_t btnQueue;\n\nstruct BtnEvent { int pin; uint32_t ms; };\n\nISR:\nvoid IRAM_ATTR btnISR() {\n  BtnEvent e = {2, millis()};\n  xQueueSendFromISR(btnQueue, &e, NULL);\n}\n\nsetup:\nbtnQueue = xQueueCreate(10, sizeof(BtnEvent));\nattachInterrupt(2, btnISR, FALLING);\n\ntask:\nBtnEvent e;\nif (xQueueReceive(btnQueue, &e, portMAX_DELAY)) {\n  // process event safely, full time\n}\n\nISR tiny (enqueue), task does everything else. Textbook pattern.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Queue full + timeout 0 na send fails silently — return value check MUST.',
          'ISR la normal xQueueSend — FromISR variant use pannunga, illa crash.',
          'Pointer anupuradhu (struct* send) — pointera task kulla reuse/overwrite, data corrupt. Value copy use.',
          'Queue length too small — burst data drop. Producer/consumer rate difference calculate pannunga.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Queue design',
      steps: [
        'Temp sensor 100ms rate, display 1s rate — queue length minimum? (rate difference think pannunga)',
        'BtnEvent struct pattern notebook la redraw panni, ovvo line role note pannunga.',
        'Queue vs global variable sharing — safety difference 3 lines ezhudhunga.',
      ],
    },
    quiz: [
      {
        q: 'Queue ordering?',
        options: ['LIFO', 'FIFO', 'Priority', 'Random'],
        answer: 1,
        explain: 'Queue = First In First Out. Oldest item first out. Stack = LIFO, queue = FIFO.',
      },
      {
        q: 'xQueueSend item handling?',
        options: ['Pointer store', 'Value copy', 'Reference link', 'Move'],
        answer: 1,
        explain: 'Queue copies the value (bytes). Sender can modify original after — receiver unaffected. Safe!',
      },
      {
        q: 'ISR la correct queue send?',
        options: [
          'xQueueSend',
          'xQueueSendFromISR',
          'xQueueSend ISR flag with',
          'Direct memory write',
        ],
        answer: 1,
        explain: 'FromISR variants = interrupt-safe internals (yield handling, no blocking). Standard send ISR la dangerous.',
      },
      {
        q: 'Queue full state + non-blocking send (timeout 0) → result?',
        options: [
          'Waits forever',
          'Send fails, returns error',
          'Overwrites oldest',
          'Crash',
        ],
        answer: 1,
        explain: 'Timeout 0 = try once, fail = return pdFAIL. Caller must check return value.',
      },
    ],
  },

  // ---------------------------------------------------------- w9l6
  {
    id: 'w9l6',
    worldId: 'w9',
    title: 'FreeRTOS Hands-On (ESP32)',
    minutes: 12,
    sections: [
      {
        kind: 'intro',
        heading: 'Real RTOS code — ESP32 la',
        body: 'ESP32 = FreeRTOS already built-in! Arduino code eppovum FreeRTOS mela run aagudhu (loop() = oru task!). Ippo naama own tasks create pannuvom. Note: educational simulation — Arduino IDE ESP32 board support install panni real board la run pannunga.',
      },
      {
        kind: 'explain',
        heading: 'Two-task blink',
        body: 'Goal: LED1 (pin 2) 500ms rate, LED2 (pin 4) 1000ms rate, independent. Serial logs add.\n\nConcept: ovvonru task = own function + own delay. Scheduler parallel-a manage pannum (ESP32 dual core — tasks cores distribute aagum!).\n\nFull code next section. Key API:\n- xTaskCreate(fn, name, stack, param, priority, handle)\n- vTaskDelay(pdMS_TO_TICKS(ms)) — task sleep\n- Serial from multiple tasks = print mixing possible — mutex or single-task prints (design note!).',
      },
      {
        kind: 'analogy',
        heading: 'Two students study analogy',
        body: 'Task A = student 1: 30 min study, 10 min break repeat. Task B = student 2: 15 study, 5 break. Rendu per own pace (vTaskDelay), same room (CPU). Manager (scheduler) oru student ku attention venum na other student pause (preemption) — work none loses. Superloop la rendu students ore time la alternate-a dhaan.',
      },
      {
        kind: 'visual',
        heading: 'Full code',
        code: 'void ledTask1(void *p) {\n  pinMode(2, OUTPUT);\n  for (;;) {\n    digitalWrite(2, !digitalRead(2));\n    Serial.println("LED1");\n    vTaskDelay(pdMS_TO_TICKS(500));\n  }\n}\n\nvoid ledTask2(void *p) {\n  pinMode(4, OUTPUT);\n  for (;;) {\n    digitalWrite(4, !digitalRead(4));\n    Serial.println("LED2");\n    vTaskDelay(pdMS_TO_TICKS(1000));\n  }\n}',
      },
      {
        kind: 'technical',
        heading: 'Setup + loop integration',
        list: [
          'void setup() { Serial.begin(115200); xTaskCreate(ledTask1, "led1", 2048, NULL, 1, NULL); xTaskCreate(ledTask2, "led2", 2048, NULL, 1, NULL); }',
          'loop() = empty — FreeRTOS handles everything. (loop() itself = "loopTask" priority 1!)',
          'ESP32 dual core: core 0 = WiFi/system tasks, core 1 = Arduino loopTask. xTaskCreatePinnedToCore(fn, name, stack, NULL, prio, NULL, core) = specific core pin.',
          'Same priority + same core = time slice (1 tick). Different cores = true parallel.',
          'Serial print from 2 tasks = interleaved lines — real projects la print mutex or queue-to-logger pattern use.',
        ],
      },
      {
        kind: 'example',
        heading: 'Expected output',
        body: 'Serial monitor (115200):\nLED1\nLED2\nLED1\nLED1\nLED2\nLED1\n...\n\nPattern: LED1 2x per LED2 period (500 vs 1000). Timing exact — delay drift illa.\n\nExperiment ideas:\n1. LED2 priority 3 → preemption watch (Serial print order change).\n2. vTaskDelay(1) = 1 tick = sleep detect.\n3. xTaskGetTickCount() print panni tick verify.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Stack 512 bytes vachuradhu — Serial.println kulla stack overflow, random reboot. 2048 safe start.',
          'Both tasks ore Serial pin use + no sync — garbled lines. Design-level fix (single logger task).',
          'pinMode setup() la mattum pannuradhu, task kulla repeat — double init usually harmless but wasteful.',
          'Infinite loop vTaskDelay illama — watchdog reset! ESP32 idle task starvation detect panni reboot pannum.',
        ],
      },
    ],
    task: {
      title: 'Mini task: RTOS lab',
      steps: [
        'Two-task blink code Arduino IDE (ESP32 board) la run panni, Serial output pattern note pannunga.',
        'LED2 priority 3 ku maathi — output order change observe pannunga.',
        'Third task (button monitor, priority 2) add panni — press log pannunga.',
        '"delay vs vTaskDelay" un words la 2 line difference ezhudhunga.',
      ],
    },
    quiz: [
      {
        q: 'ESP32 Arduino la RTOS?',
        options: ['Install venum separate', 'FreeRTOS built-in already', 'Illa', 'Only paid version'],
        answer: 1,
        explain: 'ESP32 Arduino core = FreeRTOS based. loop() itself = FreeRTOS task. No extra install.',
      },
      {
        q: 'Task sleep correct API?',
        options: ['delay()', 'vTaskDelay(pdMS_TO_TICKS(ms))', 'sleep(ms)', 'wait(ms)'],
        answer: 1,
        explain: 'vTaskDelay = task BLOCKED, CPU free for others. delay() = busy wait. pdMS_TO_TICKS converts units.',
      },
      {
        q: 'ESP32 dual core benefit for tasks?',
        options: [
          'True parallel execution (2 tasks simultaneously)',
          'More RAM only',
          'Faster clock only',
          'No benefit',
        ],
        answer: 0,
        explain: 'Dual core = 2 running tasks truly simultaneous. Single core = time-sliced only.',
      },
      {
        q: 'Task kulla vTaskDelay call pannadha → risk?',
        options: [
          'Watchdog reset (idle starvation)',
          'Faster execution',
          'Better battery',
          'Nothing',
        ],
        answer: 0,
        explain: 'Task never blocks = lower priority tasks + idle never run → watchdog detect panni reboot pannum.',
      },
      {
        q: 'Two tasks same priority, same core → ?',
        options: [
          'Round-robin time slices',
          'Only first runs forever',
          'Crash',
          'Automatic priority raise',
        ],
        answer: 0,
        explain: 'Equal priority = round-robin. Each gets CPU time slices (default 1 tick).',
      },
    ],
  },
];

export const world9Boss: QuizQuestion[] = [
  {
    q: 'BOSS: RTOS vs superloop — core advantage?',
    options: [
      'Faster clock speed',
      'Predictable scheduling with priorities + non-blocking waits',
      'More RAM',
      'No code needed',
    ],
    answer: 1,
    explain: 'RTOS = deterministic deadlines, priority preemption, blocking waits release CPU. Superloop = sequential + blocking.',
  },
  {
    q: 'BOSS: Priority 3 task READY, priority 1 task RUNNING → what happens?',
    options: [
      'Priority 1 continues',
      'Priority 3 preempts immediately',
      'Both share 50/50',
      'Priority 3 waits until P1 blocks',
    ],
    answer: 1,
    explain: 'Preemptive scheduler: highest priority READY task always runs. P1 paused, context saved, P3 runs.',
  },
  {
    q: 'BOSS: Task state after vTaskDelay(100)?',
    options: ['RUNNING', 'READY', 'BLOCKED', 'SUSPENDED'],
    answer: 2,
    explain: 'Delay = BLOCKED until timeout. CPU released for other tasks. Auto-ready after.',
  },
  {
    q: 'BOSS: Two tasks share one sensor — correct protection?',
    options: [
      'Both read anytime (race ok)',
      'Mutex lock around read transaction',
      'Higher priority always wins',
      'volatile keyword enough',
    ],
    answer: 1,
    explain: 'Shared resource = mutex. Transaction atomic guarantee. volatile = visibility only, not exclusivity.',
  },
  {
    q: 'BOSS: Button ISR data → processing task — best pattern?',
    options: [
      'Global variable + polling',
      'Queue: ISR xQueueSendFromISR, task xQueueReceive',
      'ISR does all processing',
      'delay(100) in ISR then process',
    ],
    answer: 1,
    explain: 'Queue = thread-safe data transfer. ISR tiny enqueue, task processes full data safely. Textbook embedded pattern.',
  },
  {
    q: 'BOSS: pdMS_TO_TICKS(200) @ 1000Hz tick → value?',
    options: ['20', '200', '2000', '2'],
    answer: 1,
    explain: '1000Hz = 1ms/tick → 200ms = 200 ticks. Macro use = tick-rate independent code.',
  },
  {
    q: 'BOSS: FreeRTOS task stack too small → symptom?',
    options: [
      'Faster execution',
      'Stack overflow → memory corruption / random crashes',
      'Compiler error at build',
      'WiFi disconnects only',
    ],
    answer: 1,
    explain: 'Small stack = local variables overflow into adjacent memory. Random hangs/crashes, hard to debug. 2048+ start.',
  },
];

// ============================================================
// EMBEDQUEST — WORLD 3: C PROGRAMMING FROM ZERO
// 17 lessons, compact but complete. Tanglish tone.
// ============================================================
import type { Lesson, QuizQuestion } from '../lib/types';

export const world3Lessons: Lesson[] = [
  // ---------------------------------------------------------- w3l1
  {
    id: 'w3l1',
    worldId: 'w3',
    title: 'What is C? + Setting Up a Compiler',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Embedded oda mother tongue',
        body: 'Arduino, STM32, drivers, Linux kernel — ellaam C! 1972 la Dennis Ritchie create pannirukaanga. Embedded engineer ku C = breathing. Start pannuvom!',
      },
      {
        kind: 'explain',
        heading: 'Why C rules embedded',
        body: 'C features:\n1. Fast — direct machine code, no interpreter overhead\n2. Close to hardware — memory addresses, registers direct access\n3. Small — 2 KB RAM ulla kooda run aagum\n4. Portable — same logic, different chips\n\nSetup: PC la GCC compiler install pannunga (Windows: MinGW-w64/MSYS2, or use onlinegdb.com browser la — zero install!). Verify: terminal la gcc --version nu type pannunga, version print aanaa ready!',
      },
      {
        kind: 'analogy',
        heading: 'Swiss knife analogy',
        body: 'Python = automatic car (easy, but engine details hidden). C = manual gearbox bike — full control, yedhu pannuranu nee dhaan sollanum. Embedded la control DHAAN venum!',
      },
      {
        kind: 'technical',
        heading: 'Ecosystem terms',
        list: [
          'GCC: GNU Compiler Collection — the standard C compiler.',
          'IDE: editor + compiler + debugger in one (Code::Blocks, VS Code + extensions, Arduino IDE).',
          'Online compilers: onlinegdb.com, programiz.com — zero setup practice.',
          'Arduino IDE: avr-gcc ulla use pannudhu — already C compiler! You will use it in World 6.',
        ],
      },
      {
        kind: 'example',
        heading: 'Compile & run first file',
        body: 'hello.c create pannunga, terminal la:\n\n  gcc hello.c -o hello    (compile)\n  ./hello                 (run, Windows: hello.exe)\n\nCompile error vanthaa → code fix. "No such file" → file name check. Appuram World 2 compilation flow match aagum!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Compiler install pannama "run pannalaam" nu nenaikiradhu — compiler dhaan translator!',
          'File extension .c illama .txt save panradhu.',
          'gcc command terminal la illama IDE button mattum use panradhu — terminal basics learn pannunga.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Environment check',
      steps: [
        'GCC install pannunga (illama onlinegdb.com open pannunga).',
        'gcc --version run panni version note pannunga (online la compile button use pannunga).',
        'hello.c file create panni "setup ready" confirm pannunga.',
      ],
    },
    quiz: [
      {
        q: 'C yean embedded ku best?',
        options: [
          'Games la use aagudhu',
          'Fast + hardware close + tiny memory needs',
          'Newest language',
          'Free dhaan',
        ],
        answer: 1,
        explain: 'Speed, direct hardware access, small footprint — embedded perfect match.',
      },
      {
        q: 'GCC na?',
        options: ['A text editor', 'The C compiler', 'An operating system', 'A website'],
        answer: 1,
        explain: 'GNU Compiler Collection — C source-a machine code ku translate pannudhu.',
      },
      {
        q: 'gcc hello.c -o hello command la "-o hello" mean?',
        options: ['Optimize', 'Output file name hello', 'Order', 'Open'],
        answer: 1,
        explain: '-o flag sets the output executable name.',
      },
    ],
  },

  // ---------------------------------------------------------- w3l2
  {
    id: 'w3l2',
    worldId: 'w3',
    title: 'First Program: Hello World Anatomy',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Tradition + learning',
        body: 'Programming world la first program = "Hello World" — 1978 la irundhu tradition! But naama just copy pannama, ovvoru line enna nu DECODE pannuvom.',
      },
      {
        kind: 'explain',
        heading: 'Line-by-line decode',
        body: '#include <stdio.h> → "Standard Input Output header file attach pannu" — printf function ithu ulla dhaan irukku.\nint main() → program oda entry point. OS ithu la irundhu dhaan start pannum. int = return type.\n{ } → code block (function body).\nprintf("...") → screen la text print. \\n = new line.\nreturn 0; → "success" nu OS ku signal. 0 = no error!',
      },
      {
        kind: 'analogy',
        heading: 'Restaurant analogy',
        body: '#include = kitchen la salt/oil ready pannradu (tools). main() = kitchen entry. { } = cooking area. printf = waiter customer ku food serve. return 0 = "order complete, customer happy"!',
      },
      {
        kind: 'visual',
        heading: 'Program skeleton',
        code: '#include <stdio.h>   <- 1. tools\n\nint main() {         <- 2. entry\n                     <- 3. body {\n    printf("Hi\\n"); <- 4. action\n    return 0;        <- 5. success\n}                    <- 6. body }\n\nSemicolon ; = statement end marker!',
      },
      {
        kind: 'technical',
        heading: 'Syntax rules',
        list: [
          'C is case-sensitive: printf OK, Printf ERROR.',
          'Statements end with ; — missing = compile error (most common beginner error!).',
          'Comments: // single line, /* multi line */ — compiler ignore pannum, humans ku notes.',
          'main() is mandatory — compiler looks for it exactly.',
          'Whitespace/indentation compiler ku matter illa, humans ku readability dhaan.',
        ],
      },
      {
        kind: 'example',
        heading: 'Variations',
        body: '#include <stdio.h>\n\n/* My first program */\nint main() {\n    printf("Line 1\\n");\n    printf("Line 2\\n");\n    printf("No newline here");\n    return 0;\n}\n\nOutput:\nLine 1\nLine 2\nNo newline here   <- \\n illa na same line!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Semicolon miss — "expected ;" error. 90% beginner errors idhu dhaan!',
          'printf nu Printf ezhudhuradhu — case sensitive!',
          'Braces mismatch: { open pannitu } close pannama irukradhu.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Hello + trace',
      steps: [
        'Hello World program type panni compile+run pannunga (copy illama TYPE — muscle memory!).',
        'Un name ulla add pannunga: printf("Hello, <name>!\\n");',
        '\\n remove panni run pannunga — output difference observe pannunga.',
      ],
    },
    quiz: [
      {
        q: 'Program execution yeng la start aagum?',
        options: ['printf', '#include', 'main() function', 'return 0'],
        answer: 2,
        explain: 'main() = entry point. Compiler looks for it.',
      },
      {
        q: 'printf yendha header file ulla irukku?',
        options: ['conio.h', 'stdio.h', 'stdlib.h', 'math.h'],
        answer: 1,
        explain: 'stdio.h = standard input/output → printf, scanf.',
      },
      {
        q: 'return 0 mean?',
        options: ['Return value zero only', 'Program success signal', 'Print zero', 'Restart program'],
        answer: 1,
        explain: '0 = success to the OS. Non-zero = error code.',
      },
    ],
  },

  // ---------------------------------------------------------- w3l3
  {
    id: 'w3l3',
    worldId: 'w3',
    title: 'Variables and Data Types',
    minutes: 11,
    sections: [
      {
        kind: 'intro',
        heading: 'Memory boxes',
        body: 'Sensor reading, LED state, name — data store pannanum! Variable = labelled memory box. Box size = data type. Embedded la size CRITICAL (2 KB RAM!).',
      },
      {
        kind: 'explain',
        heading: 'Types',
        body: 'int → whole numbers (age, count). Arduino UNO: 2 bytes, ESP32: 4 bytes.\nfloat → decimals 6-7 digits precision (temperature 27.5).\ndouble → bigger decimals 15 digits.\nchar → single character \'A\' (1 byte, ASCII).\n\nDeclaration: int age; → box create. Initialization: int age = 20; → box create + fill. Naming rules: letters/digits/underscore, digit start panna mudiyadhu, keywords (int, return) use panna mudiyadhu.',
      },
      {
        kind: 'analogy',
        heading: 'Container sizes analogy',
        body: 'Tea shop: glass (char = small), tumbler (int), jug (float), drum (double). Content ku correct size container! 2KB RAM la double waste = murder 😅',
      },
      {
        kind: 'visual',
        heading: 'Memory boxes',
        code: ' int count = 5;      [ 5 ]  2B (UNO)\n float temp = 27.5;  [27.5] 4B\n char grade = \'A\';   [ A ]  1B (ASCII 65)\n\n Same name different types =\n different box sizes!',
      },
      {
        kind: 'technical',
        heading: 'Technical detail',
        list: [
          'Type sizes vary by platform: use sizeof() operator to check.',
          'Fixed types embedded la best: uint8_t, int16_t, uint32_t (stdint.h).',
          'ASCII: char \'A\' = 65, \'a\' = 97, \'0\' = 48 — numeric values!',
          'const int led = 13; → value change panna mudiyadhu (read-only).',
          'Overflow: unsigned char 255 + 1 = 0 (wrap!).',
        ],
      },
      {
        kind: 'example',
        heading: 'Working example',
        body: '#include <stdio.h>\n\nint main() {\n    int count = 5;\n    float temp = 27.5;\n    char grade = \'A\';\n    printf("%d %.1f %c\\n", count, temp, grade);\n    printf("int size: %zu bytes\\n", sizeof(int));\n    return 0;\n}\n\nOutput: 5 27.5 A\\nint size: (2 or 4) bytes',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          "char la double quotes: char x = \"A\" ERROR — single quotes 'A' dhaan!",
          'Uninitialized variable use panradhu — garbage value!',
          'int la decimal store panradhu: int x = 3.7 → 3 dhaan (truncation!).',
        ],
      },
    ],
    task: {
      title: 'Mini task: Box builder',
      steps: [
        'Program ezhudhunga: int pin = 13; float volt = 3.3; char state = \'H\'; print all.',
        'sizeof(char), sizeof(int), sizeof(float) print panni sizes note pannunga.',
      ],
    },
    quiz: [
      {
        q: '27.5 store panna best type?',
        options: ['int', 'char', 'float', 'bool'],
        answer: 2,
        explain: 'Decimal → float (int truncates!).',
      },
      {
        q: "char grade = 'A' la 'A' oda numeric value (ASCII)?",
        options: ['1', '26', '65', '97'],
        answer: 2,
        explain: 'A = 65. (a = 97, 0 = 48).',
      },
      {
        q: 'int x = 3.7; → x value?',
        options: ['3.7', '4', '3', 'Error'],
        answer: 2,
        explain: 'int stores whole part only: 3 (truncation, not rounding).',
      },
    ],
  },

  // ---------------------------------------------------------- w3l4
  {
    id: 'w3l4',
    worldId: 'w3',
    title: 'printf and scanf',
    minutes: 11,
    sections: [
      {
        kind: 'intro',
        heading: 'Talk to user',
        body: 'printf = output (screen ku), scanf = input (user la irundhu). Embedded la Serial.print = printf cousin. Format specifiers = intha functions oda superpower!',
      },
      {
        kind: 'explain',
        heading: 'Format specifiers',
        body: '%d → int\n%f → float (printf la), %lf → double (scanf la!)\n%c → char\n%s → string\n%% → literal %\n\\n → newline, \\t → tab\n\nprintf("Temp = %.1f C\\n", 27.56) → "Temp = 27.6 C" (.1 = 1 decimal round).\n\nscanf la VARIABLE ADDRESS venum: scanf("%d", &age); — & = address-of operator! scanf memory location ku direct-a ezhudhum.',
      },
      {
        kind: 'analogy',
        heading: 'Form filling analogy',
        body: 'printf = notice board la announcement (formatted output). scanf = form la blank space ("name inga podunga") — form field ADDRESS venum dhaan, illa ezhudha yeng? & operator = field address!',
      },
      {
        kind: 'visual',
        heading: 'printf parts',
        code: 'printf("Age: %d Years\\n", 20);\n        |    |          |\n      text  placeholder  value\n\n%s string  %d int  %f float\n%.2f → 2 decimals (3.14)',
      },
      {
        kind: 'technical',
        heading: 'Rules & gotchas',
        list: [
          'Specifier mismatch = garbage output: %d with float → wrong!',
          'scanf double: scanf("%lf", &d); — %f wrong for double input!',
          'Missing & in scanf = crash (writes to random address).',
          'Multiple inputs: scanf("%d %d", &a, &b); space-separated.',
          'Embedded: printf heavy → memory cost. Serial prints slim versions used.',
        ],
      },
      {
        kind: 'example',
        heading: 'Input program',
        body: '#include <stdio.h>\n\nint main() {\n    int age;\n    float height;\n    printf("Age & height: ");\n    scanf("%d %f", &age, &height);\n    printf("You are %d years, %.1f m\\n", age, height);\n    return 0;\n}\n\nInput: 20 1.7 → Output: You are 20 years, 1.7 m',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'scanf la & miss — the #1 crash cause for beginners!',
          '%f use panradhu double scanf la — %lf dhaan!',
          'Specifier variable type match illama pass panradhu — garbage output.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Calculator input',
      steps: [
        'Rendu numbers scanf la eduthu, sum + product printf la print pannunga.',
        '& miss panni run pannunga (crash/garbage observe), appuram fix pannunga — lesson learned!',
      ],
    },
    quiz: [
      {
        q: 'float print specifier?',
        options: ['%d', '%c', '%f', '%s'],
        answer: 2,
        explain: '%f for float. %.1f = 1 decimal precision.',
      },
      {
        q: 'scanf("%d", age); — problem?',
        options: [
          'Nothing wrong',
          'Missing & — needs address',
          'Specifier wrong',
          'Semicolon missing',
        ],
        answer: 1,
        explain: 'scanf writes to memory → needs & (address of) age.',
      },
      {
        q: 'double input specifier in scanf?',
        options: ['%f', '%lf', '%d', '%e'],
        answer: 1,
        explain: 'double input = %lf in scanf (printf la %f OK).',
      },
    ],
  },

  // ---------------------------------------------------------- w3l5
  {
    id: 'w3l5',
    worldId: 'w3',
    title: 'Arithmetic + Increment/Decrement',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Math machinery',
        body: 'Sensor averaging, distance calculation, counter — ellaam arithmetic. CPU la ALU (Arithmetic Logic Unit) idhu dhaan pannum. Operators master pannunga!',
      },
      {
        kind: 'explain',
        heading: 'The operators',
        body: '+ - * / % (modulus = remainder)\n\nInteger division WARNING: 7/2 = 3.5 illa, 3 dhaan! int/int = int (decimal part thrown). float la 7.0/2 = 3.5.\n% modulus: 7%2 = 1 (even/odd check, cycle logic).\n\n++ and --: increment/decrement by 1. count++ = count = count + 1.',
      },
      {
        kind: 'analogy',
        heading: 'Pizza slices analogy',
        body: '8 slices, 3 friends: 8/3 = 2 slices each (int division — full slices mattum!). Remainder 8%3 = 2 slices left over. Modulus = leftover counter!',
      },
      {
        kind: 'visual',
        heading: 'Pre vs Post increment',
        code: 'int x = 5;\nint a = x++;  // post: a=5, then x=6\nint b = ++x;  // pre: x=7 first, b=7\n\nPost (x++): USE old value, then inc\nPre (++x): inc FIRST, then use',
      },
      {
        kind: 'technical',
        heading: 'Precedence (BODMAS maari)',
        list: [
          '(), then * / %, then + - — left to right within same level.',
          'int a = 2 + 3 * 4; → 14 (not 20!). Brackets force: (2+3)*4 = 20.',
          'Compound shortcuts: a += 5 (a = a+5), a *= 2, a %= 3.',
          'Embedded: counter++ in loops, timer counts, averages (sum/count).',
        ],
      },
      {
        kind: 'example',
        heading: 'Worked example',
        body: '#include <stdio.h>\n\nint main() {\n    int a = 7, b = 2;\n    printf("div: %d\\n", a / b);     // 3 (int!)\n    printf("mod: %d\\n", a % b);     // 1\n    printf("fdiv: %.1f\\n", 7.0 / b); // 3.5\n    int c = 5;\n    int old = c++;\n    printf("old %d, now %d\\n", old, c); // 5, 6\n    return 0;\n}',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          '7/2 = 3.5 expect panradhu — int la 3! Need 7.0/2.',
          '% and / confuse — / quotient, % remainder.',
          'x++ vs ++x in expressions — subtle bug source!',
        ],
      },
    ],
    task: {
      title: 'Mini task: Math lab',
      steps: [
        '17, 4 values la /, %, float division ellam try pannunga.',
        'Even/odd check program: n % 2 == 0 nu print "even".',
      ],
    },
    quiz: [
      {
        q: '9 / 2 (int) = ?',
        options: ['4.5', '4', '5', 'Error'],
        answer: 1,
        explain: 'int division truncates: 4.',
      },
      {
        q: '9 % 2 = ?',
        options: ['4', '4.5', '1', '0'],
        answer: 2,
        explain: 'Modulus = remainder: 9 = 2×4+1 → 1.',
      },
      {
        q: 'int x = 5; int y = x++; → y and x?',
        options: ['y=6, x=6', 'y=5, x=6', 'y=6, x=5', 'y=5, x=5'],
        answer: 1,
        explain: 'Post-increment: y gets OLD value 5, then x becomes 6.',
      },
    ],
  },

  // ---------------------------------------------------------- w3l6
  {
    id: 'w3l6',
    worldId: 'w3',
    title: 'Relational and Logical Operators',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Decision making base',
        body: '"Temperature > 30? Alarm!" — decisions need comparisons. Relational operators compare, logical operators combine. if/else ku base lesson idhu!',
      },
      {
        kind: 'explain',
        heading: 'Operators',
        body: 'Relational (compare): == equal, != not equal, > < >= <=\nResult = int: TRUE = 1, FALSE = 0!\n\nLogical (combine): && AND (both true), || OR (any true), ! NOT (flip)\n\n5 > 3 → 1\n(5 > 3) && (2 < 1) → 1 && 0 → 0\n!(5 > 3) → 0',
      },
      {
        kind: 'analogy',
        heading: 'Security guard analogy',
        body: '&& = rendu ID um venum (AND gate). || = yedhachum oru ID pothum (OR gate). ! = opposite day — ID irundha refuse! Gates World 4 la kooda same concept!',
      },
      {
        kind: 'visual',
        heading: 'Truth quick table',
        code: 'A   B   |  A&&B  A||B\n1   1   |   1     1\n1   0   |   0     1\n0   0   |   0     0\n\n!1 = 0,  !0 = 1',
      },
      {
        kind: 'technical',
        heading: 'CRITICAL: == vs =',
        list: [
          '== comparison (check equality). = assignment (store value).',
          'if (x = 5) BUG! — assigns 5 (true always). if (x == 5) correct.',
          'Short-circuit: && la first false → second evaluate pannave maadu (speed + safety).',
          'Floating point equality: 0.1+0.2 == 0.3 FALSE (precision!). Use difference < tiny value.',
          'Embedded: sensor checks if(temp > 30 && humidity > 70) → heat alert.',
        ],
      },
      {
        kind: 'example',
        heading: 'Range check pattern',
        body: '#include <stdio.h>\n\nint main() {\n    int temp = 27;\n    int isHot = (temp > 30);\n    printf("isHot = %d\\n", isHot);  // 0\n    // Range check: 20 to 30\n    if (temp >= 20 && temp <= 30) {\n        printf("Comfortable\\n");\n    }\n    return 0;\n}\n\nOutput: isHot = 0\\nComfortable',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          '= vs == mix — compiler warning paathu fix pannunga (some warn, some allow!).',
          '0 < x < 10 maari math style — C la (0 < x) && (x < 10) nu split pannanum!',
          '&& / || single la irundhu double maranthu — single & is BITWISE (next lesson)!',
        ],
      },
    ],
    task: {
      title: 'Mini task: Truth tester',
      steps: [
        'Program: two numbers input, "both positive?" (a>0 && b>0) print result.',
        'x = 5 bug demo: if (x = 0) and if (x == 0) difference observe pannunga.',
      ],
    },
    quiz: [
      {
        q: '5 == 5 result?',
        options: ['5', '0', '1', 'true (text)'],
        answer: 2,
        explain: 'True = 1, False = 0 in C.',
      },
      {
        q: '(3 > 2) && (1 > 2) = ?',
        options: ['1', '0', '3', 'Error'],
        answer: 1,
        explain: '1 && 0 = 0. AND needs BOTH true.',
      },
      {
        q: 'if (x = 5) — yenna problem?',
        options: [
          'Syntax error always',
          'Assigns 5 (always true) instead of comparing',
          'Nothing',
          'x becomes 0',
        ],
        answer: 1,
        explain: '= is assignment! x becomes 5, condition truthy. Use ==.',
      },
    ],
  },

  // ---------------------------------------------------------- w3l7
  {
    id: 'w3l7',
    worldId: 'w3',
    title: 'Bitwise Operators (Embedded Superpower)',
    minutes: 12,
    sections: [
      {
        kind: 'intro',
        heading: 'Hardware level control',
        body: 'LED on/off, register config, sensor flags — embedded la bits-level control daily job! Bitwise operators = C la embedded ku most important operators. World 7 la full use aagum!',
      },
      {
        kind: 'explain',
        heading: 'Six operators',
        body: '& AND → both 1 na 1 (mask!)\n| OR → yedhulavadhu 1 na 1 (set bit!)\n^ XOR → different na 1 (toggle!)\n~ NOT → flip ella bits\n<< left shift → ×2 (bits left move)\n>> right shift → ÷2 (bits right move)\n\nExample (8-bit): 0b1100 & 0b1010 = 0b1000',
      },
      {
        kind: 'analogy',
        heading: 'Light switch bank analogy',
        body: '8 switches row: & = "rendu rows la um ON-a irukura switches mattum check" (mask). | = "extra switch ON pannu". ^ = "invert the switch state". << = "ella switches oru step left slide".',
      },
      {
        kind: 'visual',
        heading: 'Bit patterns',
        code: '  1100   (12)\n& 1010   (10)\n------\n  1000   (8)   AND\n\n  1100\n| 1010\n------\n  1110   (14)  OR\n\n 1 << 3  = 8  (0001→1000)\n16 >> 2  = 4  (1 0000→100)',
      },
      {
        kind: 'technical',
        heading: 'The embedded patterns (MEMORIZE!)',
        list: [
          'SET bit n: reg |= (1 << n);',
          'CLEAR bit n: reg &= ~(1 << n);',
          'TOGGLE bit n: reg ^= (1 << n);',
          'CHECK bit n: if (reg & (1 << n))',
          '1 << n = 2^n. n=5 → 32.',
          'Mask example: x & 0x0F = low nibble only.',
          'Shifts fast division/multiplication by powers of 2.',
        ],
      },
      {
        kind: 'example',
        heading: 'Real bit work',
        body: '#include <stdio.h>\n\nint main() {\n    unsigned char reg = 0b00000000;\n    reg |= (1 << 3);    // set bit 3\n    printf("%d\\n", reg);        // 8\n    reg &= ~(1 << 3);   // clear bit 3\n    printf("%d\\n", reg);        // 0\n    reg ^= (1 << 5);    // toggle bit 5\n    printf("%d\\n", reg);        // 32\n    if (reg & (1 << 5)) printf("bit5 ON\\n");\n    return 0;\n}',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          '&& vs & confuse — && logical (1/0), & bitwise (per-bit)!',
          '1 << n la n > width — undefined behavior (8-bit la 1<<8 no!).',
          'Signed number shift left — sign bit mess! Shifts on unsigned types dhaan.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Bit hacker',
      steps: [
        'reg = 0; bit 2 SET, bit 5 SET, print (expect 36).',
        'Bit 2 CLEAR panni print (expect 32).',
        'CHECK pattern use panni bit 5 status print pannunga.',
      ],
    },
    quiz: [
      {
        q: '1100 & 1010 = ?',
        options: ['1110', '1000', '0110', '1111'],
        answer: 1,
        explain: 'AND: both-1 positions only → 1000.',
      },
      {
        q: 'Bit 3 SET panna operation?',
        options: [
          'reg &= (1<<3)',
          'reg |= (1<<3)',
          'reg ^= (1<<3)',
          'reg = ~reg',
        ],
        answer: 1,
        explain: 'OR sets the bit (without touching others).',
      },
      {
        q: '1 << 4 = ?',
        options: ['4', '8', '16', '32'],
        answer: 2,
        explain: '1<<4 = 2^4 = 16.',
      },
      {
        q: 'CHECK if bit 2 is ON?',
        options: [
          'if (reg | (1<<2))',
          'if (reg & (1<<2))',
          'if (reg == (1<<2))',
          'if (reg ^ (1<<2))',
        ],
        answer: 1,
        explain: 'AND mask: result non-zero → bit was ON.',
      },
    ],
  },

  // ---------------------------------------------------------- w3l8
  {
    id: 'w3l8',
    worldId: 'w3',
    title: 'if, else, nested if',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Decisions!',
        body: '"Temp > 30 na alarm, illa normal" — program la decisions idhu dhaan. if/else = code la logic branching start!',
      },
      {
        kind: 'explain',
        heading: 'Structure',
        body: 'if (condition) { ... } → condition TRUE (non-zero) na block run.\nelse { ... } → false na run.\nelse if (cond2) → multiple checks chain.\nNested: if ulla if — "IF alarm mode IF temp high THEN sound".\n\nCondition la 0 = false, non-zero = true. if(1) always runs!',
      },
      {
        kind: 'analogy',
        heading: 'Traffic signal analogy',
        body: 'if (green) go; else stop. else if = "green illa, yellow-a? slow panu". Nested = "green-a? AND left turn signal-a? then left go".',
      },
      {
        kind: 'visual',
        heading: 'Flow',
        code: '     [condition]\n      /        \\\n   TRUE      FALSE\n     |           |\n  {block A}  [else?]\n                 /    \\\n             TRUE    FALSE\n              {B}     skip',
      },
      {
        kind: 'technical',
        heading: 'Rules',
        list: [
          'Braces optional for single statement, aana ALWAYS use braces (bug prevention!).',
          'else belongs to nearest if — indentation misleading aagalam, braces clear-a irukum.',
          'Chain order matters: specific checks first, general last.',
          'Embedded: if/else polling loops, threshold alarms, mode selection.',
        ],
      },
      {
        kind: 'example',
        heading: 'Grade + alarm example',
        body: '#include <stdio.h>\n\nint main() {\n    int temp = 35;\n    if (temp > 40) {\n        printf("CRITICAL!\\n");\n    } else if (temp > 30) {\n        printf("Warning: hot\\n");\n    } else {\n        printf("Normal\\n");\n    }\n    // Nested\n    int mode = 1;\n    if (mode == 1) {\n        if (temp > 30) printf("Alarm ON!\\n");\n    }\n    return 0;\n}\n\nOutput: Warning: hot\\nAlarm ON!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'if (x = 5) assignment bug — == dhaan!',
          'Braces miss panni two statements if ulla puttutu nenaikiradhu — only first statement inside!',
          'Semicolon if (cond); ← thappu! Empty body aagum, block always runs.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Decision machine',
      steps: [
        'Number input → positive/negative/zero classify program.',
        'Nested example: age >= 18 AND hasID → "entry allowed".',
      ],
    },
    quiz: [
      {
        q: 'if (0) { printf("Hi"); } — output?',
        options: ['Hi', 'Nothing', 'Error', '0'],
        answer: 1,
        explain: '0 = false → block skipped.',
      },
      {
        q: 'if (temp = 30) — bug yenna?',
        options: [
          'Assignment instead of comparison — always true',
          'Nothing',
          'temp becomes 0',
          'Syntax error',
        ],
        answer: 0,
        explain: '= assigns 30 (non-zero = true). == dhaan comparison!',
      },
      {
        q: 'else if chain la order matter?',
        options: ['No', 'Yes — specific first, general last', 'Random', 'Reverse only'],
        answer: 1,
        explain: 'First matching condition runs, rest skipped — order is logic!',
      },
    ],
  },

  // ---------------------------------------------------------- w3l9
  {
    id: 'w3l9',
    worldId: 'w3',
    title: 'Ternary Operator & switch-case',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Compact decisions',
        body: 'Small if-else ku shortcut, menu selection ku switch — code clean-a irukum. Embedded la state machines switch la dhaan!',
      },
      {
        kind: 'explain',
        heading: 'Ternary (?:)',
        body: 'condition ? valueIfTrue : valueIfFalse\n\nint max = (a > b) ? a : b;\n= "a > b na a, illa b".\n\nSingle-line if-else replacement — value RETURN pannudhu, so assignment ulla use pannalam.',
      },
      {
        kind: 'analogy',
        heading: 'Instant answer analogy',
        body: 'Ternary = "veetla saapada? YES → sameela, NO → hotel" — oru question, rendu answer options, oru decision line la!',
      },
      {
        kind: 'visual',
        heading: 'switch structure',
        code: 'switch (choice) {\n case 1: printf("One\\n");\n         break;\n case 2: printf("Two\\n");\n         break;\n default: printf("Other\\n");\n}\n\nbreak ILLA NA fall-through:\ncase 2 match → case 3 um runs!!',
      },
      {
        kind: 'technical',
        heading: 'switch rules',
        list: [
          'switch works on int/char (NOT float, NOT string).',
          'case values must be CONSTANTS (1, \'A\') — variables illa.',
          'break mandatory (or deliberate fall-through) — miss = next case runs!',
          'default = yedhu match illa na (optional but recommended).',
          'Embedded: mode machines, command parsers, keypads.',
        ],
      },
      {
        kind: 'example',
        heading: 'Both in action',
        body: '#include <stdio.h>\n\nint main() {\n    int button = 2;\n    switch (button) {\n        case 1: printf("LED A\\n"); break;\n        case 2: printf("LED B\\n"); break;\n        default: printf("No LED\\n");\n    }\n    int t = 35;\n    char s = (t > 30) ? \'H\' : \'N\';  // \'H\'\n    printf("State: %c\\n", s);\n    return 0;\n}\n\nOutput: LED B\\nState: H',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'break miss — fall-through bug (cases leak into next!).',
          'switch la float/string use panradhu — int/char only!',
          'Ternary la statement chain panradhu — simple value choice ku mattum (readability).',
        ],
      },
    ],
    task: {
      title: 'Mini task: Menu machine',
      steps: [
        'switch program: press 1 → "Light ON", 2 → "Fan ON", 3 → "AC ON", default → "Invalid".',
        'Ternary: even/odd check single line (n%2==0 ? "even" : "odd").',
      ],
    },
    quiz: [
      {
        q: '(5 > 3) ? 10 : 20 = ?',
        options: ['5', '10', '20', '3'],
        answer: 1,
        explain: 'Condition true → first value: 10.',
      },
      {
        q: 'switch la break miss pannaa?',
        options: [
          'Compile error',
          'Next case um run aagum (fall-through)',
          'Nothing',
          'Loop exits',
        ],
        answer: 1,
        explain: 'Fall-through: matching case la irundhu continue aagum.',
      },
      {
        q: 'switch yenna work pannadhu?',
        options: ['int', 'char', 'float', 'both int & char'],
        answer: 2,
        explain: 'float not allowed — int/char only.',
      },
    ],
  },

  // ---------------------------------------------------------- w3l10
  {
    id: 'w3l10',
    worldId: 'w3',
    title: 'Loops: for, while, do-while',
    minutes: 12,
    sections: [
      {
        kind: 'intro',
        heading: 'Repetition engine',
        body: '"10 times blink", "sensor poll forever", "sum 1 to 100" — repetition = loops! Embedded la while(1) = main loop — program LA LIFETIME!',
      },
      {
        kind: 'explain',
        heading: 'Three loops',
        body: 'for (init; condition; update) { } → count known na (10 times).\nwhile (condition) { } → condition check FIRST, count unknown na.\ndo { } while (condition); → body FIRST, check later (minimum 1 run!).\n\nLoop anatomy: init → condition check → body → update → repeat... condition false aana exit.',
      },
      {
        kind: 'analogy',
        heading: 'Gym reps analogy',
        body: 'for = "15 push-ups" (count known). while = "tired aagum varaikkam" (condition). do-while = "at least ONCE eat, appuram hungry-a nu paaru" (taste first!).',
      },
      {
        kind: 'visual',
        heading: 'Loop flow',
        code: '   [init]\n     ↓\n  [condition]──false──→ exit\n     ↓ true\n  [body]\n     ↓\n  [update]\n     └─→ back to condition\n\ndo-while: body FIRST, then check',
      },
      {
        kind: 'technical',
        heading: 'Loop patterns',
        list: [
          'Counting: for (int i = 0; i < 10; i++) — i = 0..9 (10 times!).',
          'Infinite: while (1) { } — embedded main loop. Escape: ctrl+c (PC) / reset (chip).',
          'Off-by-one: i <= 10 = 11 times (0..10)! Careful.',
          'Nested loops: matrix work, patterns. Inner loop full cycle per outer step.',
          'Embedded: sensor averaging loops, delay loops (bad practice — use timer!), LCD scans.',
        ],
      },
      {
        kind: 'example',
        heading: 'All three',
        body: '#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++)\n        printf("for %d\\n", i);\n\n    int j = 0;\n    while (j < 3) {\n        printf("while %d\\n", j);\n        j++;\n    }\n\n    int k = 10;\n    do {\n        printf("do runs even though 10>5!\\n");\n    } while (k < 5);  // false, but ran once!\n    return 0;\n}',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Update miss → infinite loop! (j++ maranthu poachu).',
          'Semicolon bug: for (i=0; i<5; i++); ← empty body, block outside!',
          'Off-by-one: < vs <= confusion.',
          'while(1) ulla delay() heavy use — embedded la timer/RTOS methods better (World 9!).',
        ],
      },
    ],
    task: {
      title: 'Mini task: Loop lab',
      steps: [
        '1-10 numbers sum for loop la print (expect 55).',
        'Multiplication table of 7 (1x7 to 10x7).',
        'do-while demo: condition false-a irundhum one run observe pannunga.',
      ],
    },
    quiz: [
      {
        q: 'for (int i = 0; i < 5; i++) — yethana times?',
        options: ['4', '5', '6', 'Infinite'],
        answer: 1,
        explain: 'i = 0,1,2,3,4 → 5 iterations.',
      },
      {
        q: 'do-while minimum runs?',
        options: ['0', '1', 'Depends on condition', 'Infinite'],
        answer: 1,
        explain: 'Body first, check later → at least once.',
      },
      {
        q: 'Embedded main loop pattern?',
        options: ['for(;;) only', 'while(1) { }', 'do-while(false)', 'No loops'],
        answer: 1,
        explain: 'while(1) = forever loop — firmware standard.',
      },
    ],
  },

  // ---------------------------------------------------------- w3l11
  {
    id: 'w3l11',
    worldId: 'w3',
    title: 'break and continue',
    minutes: 9,
    sections: [
      {
        kind: 'intro',
        heading: 'Loop remote control',
        body: 'Loop ulla early exit or skip — break and continue. Search patterns, filtering data — clean code tools!',
      },
      {
        kind: 'explain',
        heading: 'Two keywords',
        body: 'break → loop IMMEDIATELY EXIT. Nearest loop/switch mattum exit (nested la inner loop only!).\n\ncontinue → CURRENT iteration skip, next iteration jump (condition/update still runs).\n\nbreak = "pothum, velila po". continue = "indha one skip, next one paaru".',
      },
      {
        kind: 'analogy',
        heading: 'Assembly line analogy',
        body: 'Items inspect panra conveyor: defect item = continue (skip, next item). Machine broken = break (whole line STOP).',
      },
      {
        kind: 'visual',
        heading: 'Flow difference',
        code: 'for i in 1..5:\n   if i==3: continue → skip 3\n   if i==5: break → exit at 5\n\ncontinue: 1 2 4 ...\nbreak:    1 2 3 4 (stop before 5)\n\nNormal:   1 2 3 4 5',
      },
      {
        kind: 'technical',
        heading: 'Usage patterns',
        list: [
          'Search: for loop ulla if (found) break; → efficient early exit.',
          'Filter: continue skip invalid items (negative values skip, errors skip).',
          'Nested loops: break inner loop only — outer ku flag variable (or goto, rare) venum.',
          'Embedded: timeout loops (while with break on success), error handling in parsing.',
        ],
      },
      {
        kind: 'example',
        heading: 'Search + filter',
        body: '#include <stdio.h>\n\nint main() {\n    // find first number divisible by 7\n    for (int i = 1; i <= 50; i++) {\n        if (i % 7 == 0) {\n            printf("Found: %d\\n", i);  // 7\n            break;  // stop searching!\n        }\n    }\n    // skip odd numbers\n    for (int i = 1; i <= 6; i++) {\n        if (i % 2 != 0) continue;\n        printf("even: %d\\n", i);  // 2,4,6\n    }\n    return 0;\n}',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'break pannaa "continue action" expect panradhu — break = full exit!',
          'Nested la break outer loop end pannum nu nenaikiradhu — inner mattum!',
          'continue la update skip aagum nu nenaikiradhu — for la update runs (increment safety), while la CAREFUL (manual update before continue!).',
        ],
      },
    ],
    task: {
      title: 'Mini task: Break lab',
      steps: [
        '1-100 la first 5 divisible by 3 kandupidika break use pannunga.',
        '1-10 la multiples of 4 continue skip panni others print pannunga.',
      ],
    },
    quiz: [
      {
        q: 'break in loop = ?',
        options: [
          'Skip current iteration',
          'Exit loop immediately',
          'Restart loop',
          'Pause loop',
        ],
        answer: 1,
        explain: 'Full exit from the (nearest) loop.',
      },
      {
        q: 'continue = ?',
        options: [
          'Exit loop',
          'Skip to next iteration',
          'Restart loop from i=0',
          'Nothing',
        ],
        answer: 1,
        explain: 'Current iteration body stops, loop continues with next value.',
      },
      {
        q: 'Nested loops la inner break — outer loop?',
        options: ['Exits too', 'Continues', 'Restarts', 'Error'],
        answer: 1,
        explain: 'break only exits the nearest (inner) loop.',
      },
    ],
  },

  // ---------------------------------------------------------- w3l12
  {
    id: 'w3l12',
    worldId: 'w3',
    title: 'Functions',
    minutes: 11,
    sections: [
      {
        kind: 'intro',
        heading: 'Reusable machinery',
        body: 'Same logic 10 places la copy pannradha? NEVER! Function = named code block, reusable, testable. Embedded la sensor read, motor control — ellaam functions dhaan!',
      },
      {
        kind: 'explain',
        heading: 'Anatomy',
        body: 'returnType name(parameters) { body; return value; }\n\nint add(int a, int b) { return a + b; }\n\n- returnType: function output type (void = nothing returns).\n- parameters: inputs (copies!).\n- return: output value back.\n\nDeclaration (prototype) top la, definition anywhere, call = name(args).',
      },
      {
        kind: 'analogy',
        heading: 'Juice shop analogy',
        body: 'makeJuice(fruit) machine: input mango → output mango juice. Machine built ONCE, use million times. Recipe change → machine ulla mattum fix — ellaam customer ku automatic!',
      },
      {
        kind: 'visual',
        heading: 'Function flow',
        code: ' main: x = add(3, 4);\n              |  |\n              v  v\n        [add: a=3, b=4]\n              | return a+b\n              v\n        x = 7 (back in main)\n\n Arguments = COPIES of values',
      },
      {
        kind: 'technical',
        heading: 'Rules & patterns',
        list: [
          'Prototype: int add(int, int); — compiler ku advance info (definition below main na REQUIRED).',
          'void function: action only, no return value (printSomething()).',
          'Arguments passed by VALUE — function ulla change pannaa original unaffected (pointers lesson la "by reference" kathupom!).',
          'Function name = verb style: readSensor(), setLed(), calcAverage().',
          'Embedded: ISR functions special (interrupt service routines — World 7).',
        ],
      },
      {
        kind: 'example',
        heading: 'Real example',
        body: '#include <stdio.h>\n\n// prototype\nfloat toCelsius(float f);\n\nint main() {\n    printf("%.1f C\\n", toCelsius(98.6)); // 37.0\n    return 0;\n}\n\n// definition\nfloat toCelsius(float f) {\n    return (f - 32) * 5.0 / 9.0;\n}\n\nReusable math = function superpower!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Prototype miss pannu — "implicit declaration" warning/errors.',
          'Return type mismatch: int function la float return — truncated!',
          'void function la return value use panradhu — error.',
          'Function name = variable name conflict avoid.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Function factory',
      steps: [
        'int square(int n) function ezhudhu, 3 values ku test.',
        'float avg(int a, int b) ezhudhu — average of two.',
        'main ulla rendayum call panni output verify.',
      ],
    },
    quiz: [
      {
        q: 'Function no return value type?',
        options: ['int', 'null', 'void', 'empty'],
        answer: 2,
        explain: 'void = "nothing returned".',
      },
      {
        q: 'Arguments passed by value mean?',
        options: [
          'Original variable changes',
          'Function gets a COPY',
          'Reference passed',
          'Error',
        ],
        answer: 1,
        explain: 'Copies! Original unaffected (until pointers!).',
      },
      {
        q: 'Prototype (declaration) purpose?',
        options: [
          'Documentation only',
          'Tell compiler function signature in advance',
          'Memory allocation',
          'Faster execution',
        ],
        answer: 1,
        explain: 'Compiler knows types before the call — checking possible.',
      },
    ],
  },

  // ---------------------------------------------------------- w3l13
  {
    id: 'w3l13',
    worldId: 'w3',
    title: 'Arrays and Strings',
    minutes: 12,
    sections: [
      {
        kind: 'intro',
        heading: 'Bulk data storage',
        body: '10 sensor readings, LCD text, lookup tables — single variables pothadhu! Array = same-type variables row. Strings = char arrays. Embedded la lookup tables = ROM ulla store aagum!',
      },
      {
        kind: 'explain',
        heading: 'Arrays',
        body: 'int a[5] = {10, 20, 30, 40, 50};\nIndex 0 LA START: a[0]=10, a[1]=20... a[4]=50.\n\nIndex range: 0 to size-1. a[5] = OUT OF BOUNDS — garbage/crash (compiler check illa!).\n\nLoops + arrays = best friends: for (i=0; i<5; i++) sum += a[i];',
      },
      {
        kind: 'analogy',
        heading: 'Apartment analogy',
        body: 'Array = apartment row: Flat 0, Flat 1... (programmers 0 la count pannuvanga!). Same building (type), ovvoru flat same size. Address = index!',
      },
      {
        kind: 'visual',
        heading: 'Array in memory',
        code: ' int a[5] = {10,20,30,40,50};\n index:  0   1   2   3   4\n value: 10  20  30  40  50\n\n Contiguous memory (side by side)!\n a[i] address = base + i*4 (int=4B)',
      },
      {
        kind: 'technical',
        heading: 'Strings',
        list: [
          'C string = char array + NULL terminator \'\\0\'.\nchar name[] = "RAM"; → \'R\',\'A\',\'M\',\'\\0\' (4 bytes!).',
          '\\0 = end marker — functions find string end from it.',
          'Library funcs (string.h): strlen() length (without \\0), strcpy() copy, strcmp() compare (0 = equal), strcat() join.',
          'scanf("%s") reads one word only (space stop).',
          'Embedded: LCD messages, command parsing, EEPROM strings.',
        ],
      },
      {
        kind: 'example',
        heading: 'Working example',
        body: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    int readings[5] = {100, 250, 180, 300, 220};\n    int sum = 0;\n    for (int i = 0; i < 5; i++) sum += readings[i];\n    printf("avg: %.1f\\n", sum / 5.0);  // 210.0\n\n    char msg[] = "EMBED";\n    printf("%s len=%zu\\n", msg, strlen(msg)); // 5\n    return 0;\n}',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Index 1 la start nu nenaikiradhu — 0 dhaan!',
          'Out of bounds access: a[5] in size-5 array — undefined behavior!',
          '\\0 space miss pannradhu: char s[3] = "RAM" → needs 4 (incl \\0)!',
          'strcmp == compare panradhu — strcmp(a,b) == 0 dhaan equal!',
        ],
      },
    ],
    task: {
      title: 'Mini task: Array lab',
      steps: [
        '5 sensor values array la max + min find program.',
        'Un name char array la, reverse print pannunga (loop backward).',
      ],
    },
    quiz: [
      {
        q: 'Array index start?',
        options: ['1', '0', '-1', 'Depends'],
        answer: 1,
        explain: '0-based indexing in C!',
      },
      {
        q: '"RAM" string memory bytes?',
        options: ['3', '4 (incl \\0)', '5', '8'],
        answer: 1,
        explain: '3 chars + NULL terminator = 4 bytes.',
      },
      {
        q: 'Equal strings check?',
        options: ['s1 == s2', 'strcmp(s1, s2) == 0', 's1.equals(s2)', 'compare(s1, s2)'],
        answer: 1,
        explain: 'strcmp returns 0 when equal. == compares addresses!',
      },
    ],
  },

  // ---------------------------------------------------------- w3l14
  {
    id: 'w3l14',
    worldId: 'w3',
    title: 'Pointers (Demystified!)',
    minutes: 13,
    sections: [
      {
        kind: 'intro',
        heading: 'The feared topic (unfairly!)',
        body: '"Pointers = C la kastam" nu myth! Actual la SIMPLE concept: address store panra variable. House address maari — house illa, address dhaan store pannrom. Embedded la MANDATORY (registers = addresses!).',
      },
      {
        kind: 'explain',
        heading: 'Two operators',
        body: '& → address-of: &x = x variable oda memory address.\n* → dereference: *p = p address ulla irukura VALUE.\n\nint x = 10;\nint *p = &x;   // p stores x address\n*p = 20;       // x becomes 20 (via address!)\n\n*p = "p ulla irukura address la POINT pannura value".',
      },
      {
        kind: 'analogy',
        heading: 'House address analogy',
        body: 'x = house (value 10 ulla irukku). &x = house oda address (No. 42, MG Road). p = address paper (address ulla store). *p = "intha address la irukura house ku po" → value access! Address paper la address change pannina, different house point.',
      },
      {
        kind: 'visual',
        heading: 'Memory picture',
        code: ' Address   Value\n  0x1000    10   ← x\n  0x2000   0x1000 ← p (stores address)\n\n &x = 0x1000\n *p = value AT 0x1000 = 10\n *p = 20 → x also 20!',
      },
      {
        kind: 'technical',
        heading: 'Why pointers matter',
        list: [
          'Function la original modify: swap(&a, &b) — pass address!',
          'Arrays/strings pass: array name = pointer to first element.',
          'Dynamic memory: malloc/free (heap).',
          'Embedded: registers = fixed addresses! volatile uint8_t *port = (uint8_t*)0x25;',
          'NULL pointer: points nowhere — dereference = CRASH. Always check!',
        ],
      },
      {
        kind: 'example',
        heading: 'Swap via pointers',
        body: '#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int t = *a;\n    *a = *b;\n    *b = t;\n}\n\nint main() {\n    int x = 1, y = 2;\n    swap(&x, &y);       // pass ADDRESSES\n    printf("%d %d\\n", x, y); // 2 1\n    return 0;\n}\n\nValue copies maari illa — real modification!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Uninitialized pointer dereference: int *p; *p = 5 → random address write = crash!',
          '& and * confuse — & = address GET, * = value AT address.',
          'NULL check miss pannradhu — embedded la dangerous!',
          'Pointer type mismatch: int* la char address store panradhu.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Pointer lab',
      steps: [
        'x = 5 create panni, &x print (address), pointer store panni *p print.',
        '*p = 99 set panni, x print — original change observe!',
        'swap function type panni run pannunga.',
      ],
    },
    quiz: [
      {
        q: '& operator = ?',
        options: ['Value at address', 'Address of variable', 'Multiply', 'AND'],
        answer: 1,
        explain: '& = address-of operator.',
      },
      {
        q: 'int *p = &x; — *p = ?',
        options: ['x address', 'x value', 'p address', 'Error'],
        answer: 1,
        explain: '*p dereferences → value stored at that address (x value).',
      },
      {
        q: 'Function la original variable modify panna?',
        options: [
          'Normal argument',
          'Pass address (pointer)',
          'Impossible',
          'Global only',
        ],
        answer: 1,
        explain: 'Pass &var, function parameter = pointer — real modification!',
      },
    ],
  },

  // ---------------------------------------------------------- w3l15
  {
    id: 'w3l15',
    worldId: 'w3',
    title: 'Structures and Unions',
    minutes: 11,
    sections: [
      {
        kind: 'intro',
        heading: 'Custom data bundles',
        body: 'Sensor data = value + unit + timestamp — different types, one package! struct = custom data type (bundle). union = SAME memory, different views (register access trick!).',
      },
      {
        kind: 'explain',
        heading: 'struct',
        body: 'struct Sensor {\n    float value;\n    char unit[5];\n    int pin;\n};\n\nAccess: s.value, s.unit, s.pin (dot operator).\n\nRelated data bundle → clean code. Array of structs = sensor logs, student records!',
      },
      {
        kind: 'analogy',
        heading: 'Student ID card analogy',
        body: 'ID card: name + roll + dept — different types, ONE card. struct = card design. struct variable = actual card. Dot = "card la name enna?".',
      },
      {
        kind: 'visual',
        heading: 'struct vs union memory',
        code: ' struct:  [float][char x5][int] = 12B all\n\n union:   [float/char/int SHARE 4B]\n          write float → read char = garbage\n          (same memory, diff interpretation)',
      },
      {
        kind: 'technical',
        heading: 'union power + notes',
        list: [
          'union size = largest member (memory shared!).',
          'Embedded trick: union la 32-bit register → 4 individual bytes access (byte swap checks!).',
          'typedef: typedef struct { ... } Sensor; → "struct" keyword skip.',
          'struct pass by value copies ENTIRE struct — big struct na pointer pass better.',
          'Padding: compiler adds gaps for alignment — sizeof surprise aagalam.',
        ],
      },
      {
        kind: 'example',
        heading: 'Working example',
        body: '#include <stdio.h>\n\ntypedef struct {\n    float temp;\n    int pin;\n} Reading;\n\nint main() {\n    Reading r = {27.5, 2};\n    printf("pin %d: %.1f C\\n", r.pin, r.temp);\n\n    union Reg {\n        unsigned int all;\n        unsigned char bytes[4];\n    } u = {0xAABBCCDD};\n    printf("byte0: %X\\n", u.bytes[0]); // DD\n    return 0;\n}',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Dot (.) vs arrow (->): pointer to struct → arrow. Direct struct → dot.',
          'Union la ella members um use pannaa expect panradhu — LAST WRITE WINS (shared memory)!',
          'struct definition semicolon miss: }; dhaan!',
        ],
      },
    ],
    task: {
      title: 'Mini task: Data architect',
      steps: [
        'struct Student { name, roll, marks } ezhudhu, 2 students array la print.',
        'union demo: int + char[4] union, value 0x11223344 podungga bytes print pannunga.',
      ],
    },
    quiz: [
      {
        q: 'struct member access?',
        options: ['s->x', 's.x', 's:x', 's::x'],
        answer: 1,
        explain: 'Dot for direct struct variables. (Arrow for pointers.)',
      },
      {
        q: 'union size = ?',
        options: [
          'Sum of all members',
          'Largest member size',
          'Smallest member',
          'Always 4 bytes',
        ],
        answer: 1,
        explain: 'Members SHARE memory → size = biggest member.',
      },
      {
        q: 'Union embedded use case?',
        options: [
          'Store many values together',
          'Same register as 32-bit AND 4 bytes view',
          'String storage',
          'Faster loops',
        ],
        answer: 1,
        explain: 'Register byte-level inspection — classic embedded trick!',
      },
    ],
  },

  // ---------------------------------------------------------- w3l16
  {
    id: 'w3l16',
    worldId: 'w3',
    title: 'Scope, Storage Classes, Headers & Memory',
    minutes: 11,
    sections: [
      {
        kind: 'intro',
        heading: 'Code organization',
        body: 'Variable yeng irukku? yevlo duration? Header files eppdi work aagudhu? — professional code basics! Embedded la memory sections knowledge MUST.',
      },
      {
        kind: 'explain',
        heading: 'Scope = visibility area',
        body: 'Local (inside { }): block ulla mattum visible, block exit → gone (stack!).\nGlobal (outside functions): whole file visible, program end varaikkam lives.\n\nStorage classes (lifetime):\nauto (default local) → stack, auto create/destroy.\nstatic → value RETAIN between calls (function counter!), global static = file-only private.\nextern → "this variable another file la irukku" — link promise.\nconst → read-only.',
      },
      {
        kind: 'analogy',
        heading: 'House vs hotel analogy',
        body: 'Local = hotel room (check-out → gone). Global = own house (always there). static = hotel room but same room every visit (value remembers!). extern = "room next building la" nu direction board.',
      },
      {
        kind: 'visual',
        heading: 'Memory layout',
        code: ' HIGH  [ Stack ]  locals, grows down\n       [   ↓   ]\n       [   ↑   ]\n       [ Heap  ]  malloc, grows up\n       [-------]\n       [ BSS   ]  uninitialized globals\n       [ Data  ]  initialized globals\n LOW   [ Text  ]  code itself\n\n (embedded la flash=Text+Data, RAM=rest)',
      },
      {
        kind: 'technical',
        heading: 'Header files',
        list: [
          '#include <stdio.h> = system headers (angle brackets).\n#include "mylib.h" = your headers (quotes) — same folder.',
          'Header = declarations (prototypes), .c file = definitions.',
          '#include guards: #ifndef X #define X ... #endif — double include protection!',
          'Embedded: register maps = headers (avr/io.h!).',
          'extern in header, definition in one .c file only.',
        ],
      },
      {
        kind: 'example',
        heading: 'static counter demo',
        body: '#include <stdio.h>\n\nvoid count() {\n    static int c = 0;  // retains value!\n    c++;\n    printf("calls: %d\\n", c);\n}\n\nint main() {\n    count(); count(); count();\n    // calls: 1, 2, 3 — static remembers!\n    return 0;\n}',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Local variable return panradhu (stack gone!) — dangling pointer.',
          'Global overuse — "spaghetti state", debugging nightmare. Minimal globals!',
          'Header la definition vachuradhu → multiple definition link error. Declarations in headers!',
          'static counter "reset expect panradhu" — static = remembers (feature, not bug!).',
        ],
      },
    ],
    task: {
      title: 'Mini task: Scope explorer',
      steps: [
        'static counter function ezhudhu 5 times call pannunga.',
        'Global + local same name program → shadowing observe pannunga.',
        'mylib.h + mylib.c mini split try pannunga (prototype in .h).',
      ],
    },
    quiz: [
      {
        q: 'Local variable lifetime?',
        options: [
          'Program lifetime',
          'Block execution only',
          'Until deleted',
          'Forever',
        ],
        answer: 1,
        explain: 'Stack allocated, block exit → destroyed.',
      },
      {
        q: 'static local variable special power?',
        options: [
          'Faster',
          'Retains value between calls',
          'Auto-zero always',
          'Global visibility',
        ],
        answer: 1,
        explain: 'Initialized once, remembers across calls!',
      },
      {
        q: '#include "file.h" vs <file.h>?',
        options: [
          'Same',
          'Quotes = your files, angle = system',
          'Angle = your files',
          'Random',
        ],
        answer: 1,
        explain: 'Quotes search current folder first; angle = system include paths.',
      },
    ],
  },

  // ---------------------------------------------------------- w3l17
  {
    id: 'w3l17',
    worldId: 'w3',
    title: 'File Handling + Mini Challenge',
    minutes: 11,
    sections: [
      {
        kind: 'intro',
        heading: 'World 3 finale!',
        body: 'Data persistent-a save panna file handling (PC programs la). Appuram mini challenge — World 3 skills full test! Embedded la file system kammi (SD cards via FATFS), aana PC tools la use aagum.',
      },
      {
        kind: 'explain',
        heading: 'File basics',
        body: 'FILE *fp = fopen("data.txt", "w"); → open (w=write, r=read, a=append).\nfprintf(fp, "text"); → write to file.\nfscanf(fp, "%d", &x); → read from file.\nfgets(buf, size, fp); → read line.\nfclose(fp); → ALWAYS close! (data flush + resource free).\n\nPattern: open → work → close. fopen NULL return = file error (check pannunga!).',
      },
      {
        kind: 'analogy',
        heading: 'Notebook analogy',
        body: 'fopen = notebook open. fprintf = ezhudhu. fscanf = odhu. fclose = notebook close & shelf la vatchu (open-a vachurundha, others use panna mudiyadhu + data loss risk!).',
      },
      {
        kind: 'visual',
        heading: 'File mode flags',
        code: ' "w" write    (overwrite! old data gone)\n "a" append   (end la add)\n "r" read     (file ulla data venum)\n "w+"/"r+"    read+write\n\n fopen fails → returns NULL:\n if (fp == NULL) { error handling! }',
      },
      {
        kind: 'technical',
        heading: 'Full example',
        list: [
          'Write: fopen("log.txt","w") → fprintf(fp, "temp=%d\\n", 27) → fclose.',
          'Read back: fopen("log.txt","r") → fgets buffer → print.',
          'Check every fopen for NULL — missing file, no permission!',
          'Embedded mapping: SD card logging (data logger project!), config files.',
        ],
      },
      {
        kind: 'example',
        heading: 'MINI CHALLENGE (do it yourself!)',
        body: 'Build a complete program: "Sensor Log System"\n\n1. struct Reading { int id; float value; }\n2. Function addReading(FILE*, Reading) — file la append.\n3. Function showAll(FILE*) — read + print all.\n4. main: 3 readings add, then show all.\n\nSkills used: structs, functions, files, loops, scanf. Try pannunga — solution template PlaygroundTool ulla! Clues: fopen "a" for add, "r" for show.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'fclose miss — data buffered ulla irundhu lost + file locked!',
          'NULL check miss: crash on missing file!',
          '"w" mode old data overwrite nu maranthu poachu!',
        ],
      },
    ],
    task: {
      title: 'Mini task: Data logger',
      steps: [
        '3 sensor readings file la write pannunga (fprintf loop).',
        'Read back panni printf la display pannunga (fgets/fscanf).',
        'Challenge program build pannunga — World 3 complete! 🏆',
      ],
    },
    quiz: [
      {
        q: 'fopen fails (missing file) returns?',
        options: ['0', 'NULL', '-1', 'Empty FILE'],
        answer: 1,
        explain: 'NULL → always check: if (fp == NULL)!',
      },
      {
        q: 'File end la add panna mode?',
        options: ['"w"', '"a"', '"r"', '"x"'],
        answer: 1,
        explain: 'Append mode "a" — existing data preserved.',
      },
      {
        q: 'fclose important yean?',
        options: [
          'Speed',
          'Flushes data + frees resource',
          'Deletes file',
          'Compiles code',
        ],
        answer: 1,
        explain: 'Buffered data written to disk + file handle released.',
      },
    ],
  },
];

export const world3Boss: QuizQuestion[] = [
  {
    q: 'BOSS: int x = 5; printf("%d", x++ + ++x); output? (careful!)',
    options: ['11', '12', '13', 'undefined behavior (sequence points!)'],
    answer: 3,
    explain: 'Multiple modifications in one expression = undefined behavior! Real compilers vary. Interview trap — avoid such code!',
  },
  {
    q: 'BOSS: char s[10] = "HELLO"; strlen(s) and sizeof(s)?',
    options: ['5, 10', '6, 6', '5, 6', '6, 10'],
    answer: 0,
    explain: 'strlen = chars until \\0 = 5. sizeof = array allocated size = 10.',
  },
  {
    q: 'BOSS: reg = 0b1000; reg |= (1 << 1); reg now?',
    options: ['1000', '1010', '1100', '1001'],
    answer: 1,
    explain: 'Bit 1 set: 1000 | 0010 = 1010.',
  },
  {
    q: 'BOSS: What does this print?\nint a[3] = {1,2,3}; int *p = a; printf("%d", *(p+2));',
    options: ['1', '2', '3', 'Garbage'],
    answer: 2,
    explain: 'p+2 = third element address, * dereference = 3. Pointer arithmetic!',
  },
  {
    q: 'BOSS: Value copies maari illa real modification for struct in function?',
    options: [
      'Pass struct normally',
      'Pass pointer to struct',
      'Impossible',
      'Use global only',
    ],
    answer: 1,
    explain: 'struct pointer pass → function modifies original (dot becomes arrow!).',
  },
  {
    q: 'BOSS: for (int i = 0; i < 3; i++) for (int j = 0; j < 3; j++) count++; — count final?',
    options: ['3', '6', '9', '12'],
    answer: 2,
    explain: '3×3 = 9. Inner loop completes fully per outer iteration.',
  },
  {
    q: 'BOSS: while (1) loop embedded la main purpose?',
    options: [
      'Infinite bug',
      'Main loop — firmware runs forever',
      'Delay generation only',
      'Error handling',
    ],
    answer: 1,
    explain: 'Firmware never "exits" — while(1) is the standard main loop pattern.',
  },
  {
    q: 'BOSS: unsigned char c = 250; c = c + 10; c = ?',
    options: ['260', '4 (wrap!)', '0', '255 (saturate)'],
    answer: 1,
    explain: '260 % 256 = 4. Unsigned overflow wraps — classic embedded gotcha!',
  },
];

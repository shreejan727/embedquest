// ============================================================
// EMBEDQUEST — WORLD 11: AGENTIC AI
// AI/ML/LLM basics, prompt engineering, agent vs chatbot,
// tools/memory/multi-agent, APIs, build a simple agent.
// ============================================================
import type { Lesson, QuizQuestion } from '../lib/types';

export const world11Lessons: Lesson[] = [
  // ---------------------------------------------------------- w11l1
  {
    id: 'w11l1',
    worldId: 'w11',
    title: 'AI, ML & LLMs — Foundation',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'AI nu ellam enna?',
        body: 'ChatGPT, Claude, Gemini — ellaam AI nu solluvanga. Aana AI, Machine Learning, Deep Learning, LLM — indha terms different! Indha lesson la map clear pannuvom. Embedded engineer-a nee AI agents build panna start pannuvom — adhu ku foundation venu.',
      },
      {
        kind: 'explain',
        heading: 'The nested circles',
        body: 'AI (Artificial Intelligence) = machines doing "intelligent" tasks — biggest circle. Rule-based systems (World AI oda teacher nu nenaikkala, aana simple if-else bots um AI category la varaanga — narrow AI).\n\nML (Machine Learning) = AI subset: rules hand-write pannadhu, DATA irundhu patterns learn pannum. Example: spam filter — millions of emails paathu "idhu spam pattern" nu learn.\n\nDL (Deep Learning) = ML subset: neural networks (many layers). Image recognition, speech, translation.\n\nLLM (Large Language Model) = DL subset: HUGE neural network trained on massive text to predict the NEXT TOKEN (word-piece). ChatGPT, Claude, Gemini, Llama — ellaam LLMs.\n\nKey insight: LLM = probability machine. "Oru veyil la" nu ketta next word "naneethu" nu high probability. Magic illa — pattern prediction!',
      },
      {
        kind: 'analogy',
        heading: 'Auto driver analogy',
        body: 'Rule-based = new driver: rule book follow ("signal red na stop"). ML = experienced driver: 10 years roads paathu pattern learn — "indha area la 5pm ku traffic" nu predict, rule book la illa. LLM = oru person who read the whole city library: next word / next turn guess pannum both fluently. Training = experience, inference = drive time.',
      },
      {
        kind: 'visual',
        heading: 'AI ⊃ ML ⊃ DL ⊃ LLM',
        code: '+----------------------------------+\n|  AI (intelligent behaviour)      |\n|  +----------------------------+  |\n|  | ML (learn from data)       |  |\n|  |  +----------------------+  |  |\n|  |  | DL (neural networks) |  |  |\n|  |  |  +----------------+  |  |  |\n|  |  |  | LLM (language) |  |  |  |\n|  |  |  +----------------+  |  |  |\n|  |  +----------------------+  |  |\n|  +----------------------------+  |\n+----------------------------------+',
      },
      {
        kind: 'technical',
        heading: 'Key terms',
        list: [
          'Token: LLM oda text unit (~word piece). "Vanakkam" maybe 2-3 tokens. Context window = max tokens model can see at once.',
          'Training: huge compute + data → model weights (billions of numbers) fix. Months, crores of rupees.',
          'Inference: trained model use panni answer generate. Milliseconds/seconds. Un app idhu dhaan use pannum.',
          'Hallucination: model confident-a wrong information generate pannuradhu. LLM fundamental weakness — verify important facts!',
          'Parameters: model oda learned weights count. 7B = 7 billion parameters. More ≠ always better, but usually capable.',
        ],
      },
      {
        kind: 'example',
        heading: 'Next-token prediction demo',
        body: 'Prompt: "Indha sentence complete pannu: Un veetu ___"\n\nLLM thinks: training data la "un veetu" apram common continuations:\n- "pakkathula" — 30% probability\n- "munnadi" — 20%\n- "vaasal" — 15%\n...\nOne token picks, then AGAIN next token — token by token generate aagum. Idhu dhaan generation loop.\n\nTemperature concept: low temp = always most probable (boring, safe). High temp = more random picks (creative, risky). Code la temperature = creativity knob.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'LLM = database / Google search nu nenaikiradhu — illa, adhu pattern predictor. Facts verify pannunga.',
          'Hallucination trust pannuradhu — medical/legal/critical info LLM output la blind trust = dangerous.',
          'AI = one thing nu nenaikiradhu — AI umbrella, kulla ML/DL/LLM different tools.',
          'Training vs inference confuse pannuradhu — un app inference mattum use pannum (API calls).',
        ],
      },
    ],
    task: {
      title: 'Mini task: AI map',
      steps: [
        'AI ⊃ ML ⊃ DL ⊃ LLM nested diagram notebook la draw panni, ovvonru ku oru real example ezhudhunga.',
        'Any AI chatbot la oru question kelunga — adhu hallucinate pannuradha illaya nu test (specific niche fact kettu, verify pannunga).',
        'Token concept: "Embedded systems rock!" nu oru LLM la token count check pannunga (tokenizers websites irukku).',
      ],
    },
    quiz: [
      {
        q: 'LLM oda core task?',
        options: [
          'Next token predict pannuradhu',
          'Database search',
          'Image editing',
          'Voltage measure',
        ],
        answer: 0,
        explain: 'LLM = trained to predict next token. Generation = repeat this token by token. Idhu dhaan foundation.',
      },
      {
        q: 'ML vs traditional programming difference?',
        options: [
          'Rules hand-written illa — data irundhu patterns learn',
          'ML always faster',
          'ML needs no computer',
          'No difference',
        ],
        answer: 0,
        explain: 'Traditional = programmer rules ezhudhura. ML = data + algorithm → model learns rules itself.',
      },
      {
        q: 'Hallucination na?',
        options: [
          'Model confident-a wrong info generate pannuradhu',
          'Screen glitch',
          'Too slow response',
          'Memory overflow',
        ],
        answer: 0,
        explain: 'LLM sometimes fluent-a wrong facts sollum. Critical decisions la verify MUST. Idhu known limitation.',
      },
      {
        q: 'Inference vs training?',
        options: [
          'Inference = using trained model; training = learning from data',
          'Same thing',
          'Inference = training part 2',
          'Training = user side, inference = company side',
        ],
        answer: 0,
        explain: 'Training = massive compute, one time. Inference = model use panni answer generate — un app daily idhu dhaan.',
      },
      {
        q: 'Low temperature setting effect?',
        options: [
          'More predictable, deterministic output',
          'More creative output',
          'Faster inference',
          'Cheaper API',
        ],
        answer: 0,
        explain: 'Low temperature = high-probability tokens pick = consistent/boring. High = random/creative/risky.',
      },
    ],
  },

  // ---------------------------------------------------------- w11l2
  {
    id: 'w11l2',
    worldId: 'w11',
    title: 'Prompt Engineering',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Prompt = un program',
        body: 'LLM kitta pesuradhu = programming a new way. Prompt clear-a illa na output garbage. Indha lesson la professional prompts eppadi ezhudhuradhu — agents build panna daily skill.',
      },
      {
        kind: 'explain',
        heading: 'Prompt anatomy',
        body: 'Good prompt = 5 parts:\n1. ROLE: "Nee embedded C expert-a act pannu"\n2. TASK: "indha bug fix pannu"\n3. CONTEXT: "ATmega328P, 16MHz, code idhan..." \n4. CONSTRAINTS: "Tanglish la explain, 100 words kulla, volatile use pannu"\n5. FORMAT: "bullet points la output, code block la fix"\n\nMore specific = better output. Vague prompt ("idha fix pannu") = vague answer.\n\nFew-shot prompting: examples kuduthu pattern teach ("Input: 2 → Output: 4. Input: 5 → Output: 10. Input: 7 → ?") — model pattern follow pannum.\n\nChain of thought: "step by step think pannu" — reasoning tasks la accuracy improve aagum.',
      },
      {
        kind: 'analogy',
        heading: 'New intern instruction analogy',
        body: 'Vague instruction: "idha fix pannu" — intern confused, random fix.\nClear instruction: role + task + context + constraints + format = intern exactly know what, how, output format. LLM = super-fast intern — clear instructions = great work, vague = confident nonsense.',
      },
      {
        kind: 'visual',
        heading: 'Bad vs good prompt',
        code: 'BAD:\n "C code la bug irukku, fix pannu"\n\nGOOD:\n ROLE: embedded C expert\n TASK: find + fix this bug\n CONTEXT: ATmega328P, LED pin13\n   blink illa. CODE: (paste)\n CONSTRAINTS: register-level,\n   Tanglish explain, safe\n FORMAT: bug + fixed code block',
      },
      {
        kind: 'technical',
        heading: 'Advanced techniques',
        list: [
          'System prompt: model oda persistent instructions (app level). User prompt = per message.',
          'Few-shot: 2-3 input/output examples = pattern learning. Format enforcement ku super.',
          'Chain-of-thought (CoT): "step by step" — math/logic tasks accuracy jump.',
          'Negative constraints: "X use pannadha" — explicit avoid list.',
          'Iteration: first output 70% nu expect pannunga — refine prompt, ask follow-up. Prompt = conversation, one-shot lottery illa.',
        ],
      },
      {
        kind: 'example',
        heading: 'Prompt iteration demo',
        body: 'Try 1: "embedded C la delay eppadi?"\n→ Generic answer, PC style sleep() suggest pannum (wrong for MCU).\n\nTry 2 (role + context): "Nee embedded C expert. ATmega328P 16MHz, Arduino framework. Blocking delay alternatives sollu."\n→ millis() pattern, timers, interrupt answers — relevant!\n\nTry 3 (format add): "...millis() pattern oru code block la, comment lines Tanglish la, 15 lines kulla."\n→ Perfect targeted answer.\n\nIdhu dhaan prompt engineering loop: ask → evaluate → refine.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Vague prompts + high expectations — "AI romba mosam" nu blame. Prompt clear-ah illa nu first check.',
          'Context illama code snippet paste pannuradhu — board, clock, framework specify pannunga.',
          'One prompt, one shot nu nenaikiradhu — iterate pannunga.',
          'Constraints miss: output format, length, style specify pannadha — random formatting.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Prompt gym',
      steps: [
        'Any AI chatbot la vague prompt 1 time kettu, output note pannunga. Apram 5-part prompt maathi kettu — difference compare pannunga.',
        'Un dream AI app ku system prompt ezhudhunga (role, rules, format, constraints).',
        'Few-shot example set (3 pairs) design panni pattern teach test pannunga.',
      ],
    },
    quiz: [
      {
        q: 'Good prompt 5 parts?',
        options: [
          'Role, task, context, constraints, format',
          'Question, answer',
          'Long text only',
          'English only',
        ],
        answer: 0,
        explain: 'Role (who), task (what), context (background), constraints (limits), format (output shape) — professional prompt skeleton.',
      },
      {
        q: 'Few-shot prompting meaning?',
        options: [
          'Examples kuduthu pattern teach pannuradhu',
          'Short prompt',
          'Few tokens use',
          'Cheap API plan',
        ],
        answer: 0,
        explain: 'Few-shot = 2-3 example pairs prompt la kuduthu, model adha pattern follow pannum. Format consistency ku powerful.',
      },
      {
        q: 'Chain-of-thought effect?',
        options: [
          'Step-by-step reasoning → better accuracy on logic/math',
          'Faster response',
          'Shorter output',
          'Lower cost',
        ],
        answer: 0,
        explain: 'CoT = model intermediate steps write pannum → complex reasoning accuracy improve. "Step by step" trigger.',
      },
      {
        q: 'Prompt iteration approach?',
        options: [
          'Ask → evaluate output → refine prompt → repeat',
          'One shot, give up if wrong',
          'Longer prompt = always better',
          'Random changes',
        ],
        answer: 0,
        explain: 'Prompting = conversation craft. Evaluate + refine loop — first output rarely final.',
      },
    ],
  },

  // ---------------------------------------------------------- w11l3
  {
    id: 'w11l3',
    worldId: 'w11',
    title: 'Agent vs Chatbot',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'Chatbot pesum. Agent seiyum.',
        body: 'Chatbot = question → answer. Agent = goal kuduthu, adha achieve pannum — tools use pannitu, plan pannitu, self-correct pannitu. Idhu dhaan agentic AI revolution. Indha lesson la difference deep-a.',
      },
      {
        kind: 'explain',
        heading: 'The agent loop',
        body: 'Chatbot: single turn. "Weather eppadi irukku?" → "27°C maari irukkum" (guess!). No actions, no verification.\n\nAgent: goal-driven loop:\n1. GOAL: "Chennai la nalaiku weather paathu oru trip plan pannu"\n2. PLAN: LLM steps think pannum — "weather check → places → itinerary"\n3. ACT: tool call! Weather API fetch → real data\n4. OBSERVE: result paaru — "38°C, too hot"\n5. THINK: plan adjust — "indoor places focus pannalam"\n6. REPEAT until goal done\n7. FINAL: verified plan with real data\n\nKey: agent LLM = brain (reasoning) + tools = hands (action) + memory = notebook. Chatbot ku brain mattum.',
      },
      {
        kind: 'analogy',
        heading: 'Assistant vs intern analogy',
        body: 'Chatbot = phone assistant: kelvi kettu, answer sollum, done. Verification illa.\nAgent = intern with access: nee "nalaiku Chennai trip plan pannu" nu solra. Adhu weather check pannum (browser), tickets paakum (API), budget calculate pannum (calculator), final plan document pannum. Self-correct pannum — "bus illa, train paakalam". Goal → autonomous work.',
      },
      {
        kind: 'visual',
        heading: 'Agent perceive-think-act loop',
        code: '        +----------+\n  +---->|  THINK   |<----------------+\n  |     | (LLM)    |                 |\n  |     +----+-----+                 |\n  |          | plan/next action      |\n  |          v                       |\n  |     +----------+                 |\n  |     |   ACT    |  tool call      |\n  |     | (API/code)|----------------+\n  |     +----+-----+  (observe result)\n  |          | result\n  |          v\n  +----- goal done? -> FINAL ANSWER',
      },
      {
        kind: 'technical',
        heading: 'Agent characteristics',
        list: [
          'Autonomy: minimal human input, multi-step self-directed work.',
          'Tool use: APIs, code execution, file access, web search — real actions.',
          'Planning: goal → sub-goals decomposition. ReAct pattern (Reason + Act interleaved).',
          'Observation: tool results feed back → next decision informed. Closed loop!',
          'Self-correction: error notice → strategy change. Chatbot idhu pannave mudiyadhu (no memory of trying).',
        ],
      },
      {
        kind: 'example',
        heading: 'Embedded debugging agent',
        body: 'Goal: "indha sensor code bug fix pannu"\n\nAgent loop:\n1. THINK: "code read pannanum" → ACT: file read tool → OBSERVE: 200 lines\n2. THINK: "syntax check" → ACT: compile tool → OBSERVE: error line 42\n3. THINK: "line 42: DDRB miss" → ACT: edit tool fix → OBSERVE: patched\n4. THINK: "verify" → ACT: compile again → OBSERVE: success\n5. FINAL: "DDRB |= (1<<5) line 40 la add pannen. Direction set illa — adhu dhaan bug."\n\nChatbot same request: guess-based advice only, verify pannave mudiyadhu. Agent = executes + verifies. Idhu dhaan difference.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Chatbot = agent nu treat pannuradhu — actions + verification illama chatbot output trust pannuradhu.',
          'Agent ku goal vagueness: "project improve pannu" — measurable goal venu ("build success + tests pass").',
          'Guardrails illama agent-a free-a odura — dangerous actions (delete, pay, send) confirm panna system venu.',
          'LLM hallucination + agent autonomy = confident wrong actions. Verification steps (compile/test) MUST design la.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Agent design',
      steps: [
        'Chatbot vs agent table ezhudhunga (memory, tools, verification, autonomy rows).',
        'Un daily task oru agent design pannunga: goal, 3 tools adhu use pannum, success condition.',
        'Agent loop diagram notebook la redraw panni, ovvo step ku oru example note pannunga.',
      ],
    },
    quiz: [
      {
        q: 'Agent loop core steps?',
        options: [
          'Think → Act (tool) → Observe → repeat',
          'Ask → answer → done',
          'Train → deploy',
          'Login → logout',
        ],
        answer: 0,
        explain: 'Agent = closed loop: reason, act via tools, observe results, iterate until goal. Chatbot = single turn.',
      },
      {
        q: 'Chatbot ku illa, agent ku irukura thing?',
        options: [
          'Language ability',
          'Tool use + action + verification',
          'Token limit',
          'Internet',
        ],
        answer: 1,
        explain: 'Agent = LLM brain + hands (tools) + loop. Actions execute + results verify. Chatbot = text generation only.',
      },
      {
        q: 'ReAct pattern = ?',
        options: [
          'Reasoning + Acting interleaved',
          'Reaction time',
          'Read + Act',
          'Retry + Act',
        ],
        answer: 0,
        explain: 'ReAct = model reasons ("think") and acts (tool call) alternating — informed steps. Agent design standard pattern.',
      },
      {
        q: 'Agent design la guardrails why?',
        options: [
          'Autonomy + hallucination = dangerous unverified actions',
          'Speed up',
          'Cost reduce',
          'UI beauty',
        ],
        answer: 0,
        explain: 'Agent acts autonomously. LLM can hallucinate → wrong actions possible. Confirmation gates + verification steps = safety.',
      },
    ],
  },

  // ---------------------------------------------------------- w11l4
  {
    id: 'w11l4',
    worldId: 'w11',
    title: 'Tools, Memory & Multi-Agent',
    minutes: 11,
    sections: [
      {
        kind: 'intro',
        heading: 'Agent oda superpowers',
        body: 'Agent = LLM + tools + memory + (sometimes) teammates. Indha lesson la moonu superpowers um detail-a paakaporoam. Idhu dhaan "agentic AI" oda engineering core.',
      },
      {
        kind: 'explain',
        heading: 'Tool calling (function calling)',
        body: 'Tool = agent ku kodura ability. Implementation:\n1. Nee tools describe pannuva (name, purpose, parameters, JSON schema).\n2. LLM decides: "idha task ku get_weather tool venu, city=Chennai".\n3. YOUR CODE runs the actual tool (API call, database query).\n4. Result LLM ku return → adhu continue.\n\nImportant: LLM tool EXECUTE pannadhu — tool REQUEST generate pannum dhaan. Execution = un code. Idhu security boundary.\n\nExample tools: get_weather(city), read_file(path), run_tests(), send_email(to).\n\nMemory two types:\n1. SHORT-TERM: conversation context (context window kulla). Session end = gone.\n2. LONG-TERM: external storage — vector database (RAG), files, database. Sessions cross-a persist.',
      },
      {
        kind: 'analogy',
        heading: 'Office worker analogy',
        body: 'Tools = employee oda access: computer, phone, files, printer. Memory short-term = andha meeting la sollura vishayam (session). Long-term = employee oda personal notebook + company files (persists). Multi-agent = team: manager plan pannum, developers code, tester verify — ella roles coordination.',
      },
      {
        kind: 'visual',
        heading: 'Multi-agent team pattern',
        code: '        [PLANNER agent]\n         |   task breakdown\n    +----+----+----------+\n    v         v          v\n[CODER]   [RESEARCHER] [TESTER]\n    |         |          |\n    +----+----+----------+\n         v\n    [REVIEWER/Critic]\n         |\n      final output\n (messages passed between agents)',
      },
      {
        kind: 'technical',
        heading: 'Core concepts detail',
        list: [
          'Tool schema: JSON description — {"name":"get_weather","parameters":{"city":"string"}}. LLM adha paathu correct calls generate.',
          'RAG (Retrieval Augmented Generation): question → vector DB search relevant docs → docs context la add → LLM answer. Long-term knowledge pattern.',
          'Vector DB: text → embeddings (numbers) → semantic similarity search. "temperature sensor" query = "thermal sensor" doc match (keyword illa, meaning match!).',
          'Multi-agent patterns: planner-executor, debate (2 agents argue → best answer), critic loop (writer + reviewer).',
          'Agent communication: structured messages (JSON) — role, content, tool results.',
        ],
      },
      {
        kind: 'example',
        heading: 'Tool call flow',
        body: 'User: "Chennai temperature sollu"\n\n1. LLM: tool_needed = get_weather, args = {city: "Chennai"}\n2. Code: actual API call → {"temp": 34, "humidity": 60}\n3. Result LLM ku pass\n4. LLM final: "Chennai la ippo 34°C, humidity 60%. Romba hot — nallathu water edukalam!"\n\nNote step 2: LLM guess pannala — REAL data. Idhu dhaan agent value. Step 4: LLM data-a natural language-a convert (strength!).\n\nRAG flow: "world3 la pointers na enna?" → search notes DB → relevant lesson text → LLM answer with YOUR content (not generic internet knowledge).',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'LLM tool execute pannum nu nenaikiradhu — adhu request mattum generate. Execution = your code = your responsibility.',
          'Context window overflow: long conversation = old messages drop. Summarization/checkpointing design.',
          'RAG illama agent ku company docs kelvi — hallucinate. Knowledge base + retrieval design.',
          'Multi-agent overkill: simple task ku 5 agents = cost + complexity + failure points. Start single agent.',
        ],
      },
    ],
    task: {
      title: 'Mini task: Superpower inventory',
      steps: [
        'Un study-buddy agent ku 3 tools design pannunga (name + parameters + purpose).',
        'Short-term vs long-term memory table ezhudhunga + examples.',
        'Multi-agent pattern oru project ku sketch pannunga (roles + message flow).',
      ],
    },
    quiz: [
      {
        q: 'Tool calling la LLM role?',
        options: [
          'Tool request generate; YOUR code executes',
          'Directly executes tools',
          'Nothing — tools independent',
          'Compiles tools',
        ],
        answer: 0,
        explain: 'LLM = brain that decides + formats request. Execution = developer code. Security boundary important!',
      },
      {
        q: 'RAG = ?',
        options: [
          'Retrieve relevant docs + add to context + generate answer',
          'Random answer generation',
          'Robot assisted grading',
          'Rapid API gateway',
        ],
        answer: 0,
        explain: 'RAG = Retrieval Augmented Generation: external knowledge (vector DB) search → context add → grounded answer. Hallucination reduce.',
      },
      {
        q: 'Vector DB search advantage?',
        options: [
          'Semantic (meaning) match, not just keywords',
          'Faster than RAM',
          'Free storage',
          'Automatic encryption',
        ],
        answer: 0,
        explain: 'Embeddings = meaning numbers. "temp sensor" query finds "thermal sensor" content. Keyword search miss pannum, semantic match pannum.',
      },
      {
        q: 'Multi-agent critic loop benefit?',
        options: [
          'Output quality review + improvement before final',
          'Faster single response',
          'Cheaper API',
          'No benefit',
        ],
        answer: 0,
        explain: 'Critic/reviewer agent output check pannum → feedback loop → quality improve. Writer + reviewer pattern.',
      },
    ],
  },

  // ---------------------------------------------------------- w11l5
  {
    id: 'w11l5',
    worldId: 'w11',
    title: 'APIs — Agent oda Hands',
    minutes: 10,
    sections: [
      {
        kind: 'intro',
        heading: 'World 10 la MQTT kathom, ippo API',
        body: 'World 10 la HTTP request-response pattern paathom. Ippo agent perspective la APIs — agent tools mostly = API calls. REST, JSON, auth — agent developer oda daily bread.',
      },
      {
        kind: 'explain',
        heading: 'REST API basics',
        body: 'API (Application Programming Interface) = software-to-software contract. "Idha request panna, idha response varum" nu documented promise.\n\nREST style:\n- Resources + HTTP verbs:\n  GET /users → list users\n  GET /users/5 → user 5 details\n  POST /users → create new user\n  PUT /users/5 → update user 5\n  DELETE /users/5 → delete user 5\n- Stateless: every request carries full info (auth + data).\n- JSON request/response standard.\n\nAgent perspective: tool = API wrapper. read_weather() = weather API GET call. run_tests() = local command. Agent tools = API calls dhaan!',
      },
      {
        kind: 'analogy',
        heading: 'Restaurant menu analogy',
        body: 'API = restaurant menu + ordering rules. Menu = documentation (edhu order pannalam). Order = request (dish + table number = endpoint + auth). Kitchen cook = server processing. Waiter deliver = response. Wrong menu item order = 404. Payment illama order = 401!',
      },
      {
        kind: 'visual',
        heading: 'Agent tool = API call',
        code: 'Agent: "weather tool venum city=Chennai"\n        |\n        v  (your tool code runs)\nGET api.weather.com/v1/current\n    ?city=Chennai\nHeader: Authorization: Bearer KEY123\n        |\n        v\nResponse 200:\n{"temp": 34, "humidity": 60}\n        |\n        v  (result back to agent)\nAgent: "Chennai 34°C..."',
      },
      {
        kind: 'technical',
        heading: 'Working with APIs',
        list: [
          'Auth: API key (header/query), Bearer token, OAuth (user permission flows). Keys = secrets — env variables, never hardcode.',
          'Status codes: 2xx success, 4xx your mistake (400 bad request, 401 auth, 404 not found, 429 rate limit), 5xx server problem.',
          'Rate limits: free tiers = X calls/hour. 429 response = wait + retry with backoff.',
          'Timeouts + retries: network fail = normal. Timeout set + retry logic = robust tools.',
          'Error responses: API error JSON format read panni learn — debugging key skill.',
        ],
      },
      {
        kind: 'example',
        heading: 'Tool with error handling',
        body: 'String getWeatherTool(String city) {\n  HTTPClient http;\n  http.begin("http://api.weather.com/v1?city=" + city);\n  http.setTimeout(5000);           // 5s max wait\n  int code = http.GET();\n\n  if (code == 200) {\n    return http.getString();       // JSON data\n  } else if (code == 429) {\n    return "RATE_LIMITED";         // agent: wait & retry\n  } else if (code == 401) {\n    return "AUTH_ERROR";           // agent: key check\n  }\n  return "NETWORK_ERROR";          // agent: retry\n}\n\nPattern: status check → structured error → agent makes informed next decision. Idhu dhaan robust tool design.',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'API key code la hardcode + commit — leak! Environment variables / config files.',
          'Rate limit ignore — 429 spam = ban. Backoff retry design.',
          'Timeout illama — API hang = agent hang forever.',
          'Error responses ignore pannuradhu — 200 assume pannitu JSON parse crash.',
        ],
      },
    ],
    task: {
      title: 'Mini task: API explorer',
      steps: [
        'OpenWeatherMap free API key eduthu, browser la GET URL test panni JSON response paakunga.',
        '5 status codes (200/400/401/404/429) meanings notebook la ezhudhunga + oru example ovvonrukum.',
        'Un agent ku 2 API tools full request design pannunga (endpoint + method + auth + response).',
      ],
    },
    quiz: [
      {
        q: 'GET vs POST?',
        options: [
          'GET = fetch data; POST = send/create data',
          'Same thing',
          'GET = faster only',
          'POST = read only',
        ],
        answer: 0,
        explain: 'GET = read (params in URL). POST = submit/create (data in body). REST verb semantics.',
      },
      {
        q: 'Status 429 = ?',
        options: ['Rate limit exceeded', 'Not found', 'Server error', 'Success'],
        answer: 0,
        explain: '429 = Too Many Requests. Rate limit hit. Retry with backoff (wait + retry).',
      },
      {
        q: 'API key security rule?',
        options: [
          'Never hardcode/commit — env variables',
          'Public-a share fine',
          'URL la always',
          'No security needed',
        ],
        answer: 0,
        explain: 'Keys in code + Git = leak. Environment variables / .env (gitignored) = standard practice.',
      },
      {
        q: 'Agent tool = typically?',
        options: [
          'API call wrapper with error handling',
          'Random function',
          'UI button',
          'Database itself',
        ],
        answer: 0,
        explain: 'Tool = code that wraps API/service call, returns structured result (data or error). Agent decides based on result.',
      },
    ],
  },

  // ---------------------------------------------------------- w11l6
  {
    id: 'w11l6',
    worldId: 'w11',
    title: 'Build a Simple Agent',
    minutes: 12,
    sections: [
      {
        kind: 'intro',
        heading: 'Capstone: agent design blueprint',
        body: 'Ippo ella pieces irukku: LLM brain (l1), prompts (l2), agent loop (l3), tools+memory (l4), APIs (l5). Final lesson la ellaam combine panni oru simple agent blueprint design pannuvom. Note: idhu educational simulation — real implementation pseudocode level dhaan, aana design = real!',
      },
      {
        kind: 'explain',
        heading: 'Agent blueprint: Study Buddy',
        body: 'GOAL: student ku EMBEDQUEST lessons study help pannura agent.\n\nComponents:\n- BRAIN: LLM API (any provider) — reasoning + language.\n- SYSTEM PROMPT: "Nee embedded systems tutor. Tanglish la explain. Quiz answers direct-a solladha — hints kudu. One concept per response."\n- TOOLS: (1) search_lessons(query) — our lesson data search, (2) get_quiz(topic) — practice questions fetch, (3) log_progress(note) — save study notes.\n- MEMORY: short-term = conversation. Long-term = student progress file (JSON: completed lessons, weak topics).\n- LOOP: max 10 iterations guard.\n\nFlow: student: "interrupt puriyala" → agent searches lessons → relevant lesson content context → explains with analogy → offers quiz → logs weak topic.',
      },
      {
        kind: 'analogy',
        heading: 'Personal trainer analogy',
        body: 'Study Buddy = gym personal trainer: un history paakum (memory), un level ku workout plan kudukum (planning), equipment use pannum (tools), progress track pannum (observation), next session adjust pannum (self-correction). Coach = LLM brain, gym equipment = tools, un file = memory.',
      },
      {
        kind: 'visual',
        heading: 'Pseudocode: agent main loop',
        code: 'agent = Agent(\n  brain = LLM_API(system_prompt=TUTOR),\n  tools = [search_lessons, get_quiz,\n           log_progress],\n  memory = load_progress_file(),\n  max_steps = 10\n)\n\nwhile not goal_done:\n  action = agent.think(user_msg, memory)\n  result = run_tool(action)   # real code\n  agent.observe(result)\n  memory.update(result)\n\nsave_progress(memory)',
      },
      {
        kind: 'technical',
        heading: 'Engineering the loop safely',
        list: [
          'Max iterations: infinite loops block — hard cap (10 steps) + "helpless" exit path.',
          'Tool permission tiers: safe tools (read, search) = auto. Risky tools (write, delete, send) = confirm gate.',
          'Verification: answer generate → check step (did tool succeed? is answer grounded in retrieved data?).',
          'Hallucination guard: RAG for facts — agent ku OUR lesson data retrieve pannitu adha base pannitu answer panna sollu ("vanga data la dhaan base pannu").',
          'Cost awareness: LLM API calls = money. Cache responses, batch when possible, small model for simple steps.',
        ],
      },
      {
        kind: 'example',
        heading: 'Sample session trace',
        body: 'Student: "I2C pull-up edhuku?"\n\n1. Agent THINK: technical question → tool: search_lessons("I2C pull-up")\n2. OBSERVE: w8l4 content retrieved\n3. Agent: grounded answer — "Open-drain bus la devices LOW dhaan pull pannum... HIGH ku external pull-ups (4.7k) venu. Illa na lines floating, random errors. (w8l4 la detail irukku!)"\n4. Agent THINK: weak topic? → tool: log_progress("I2C")\n5. Agent: "Quiz try pannaveengala? I2C questions irukku."\n\nTrace pattern: think → act → observe → grounded respond → log. Full agent loop in action!',
      },
      {
        kind: 'mistakes',
        heading: 'Common mistakes',
        list: [
          'Max iteration guard illama — agent loop infinite, API bill explosion.',
          'Ella tools um auto-execute — risky actions confirmation gate venu.',
          'RAG illama general LLM knowledge rely — course-specific answers generic/wrong. Retrieve own data!',
          'Memory design miss: every session from zero — progress file design first.',
          'Error handling miss: API fail na agent crash instead of graceful "network issue, retry".',
        ],
      },
    ],
    task: {
      title: 'Mini task: Agent blueprint (capstone)',
      steps: [
        'Un own agent design document ezhudhunga: goal, system prompt draft, 3 tools (name + params), memory schema, max steps.',
        'Sample conversation 6 turns trace pannunga (user msg → agent think → tool → observe → reply).',
        'Guardrails list: edhu auto, edhu confirm-gate, edhu forbidden — 3 column table.',
        'Bonus: pseudocode un words la rewrite pannunga (copy paste illa!).',
      ],
    },
    quiz: [
      {
        q: 'Agent loop la tool result enna role?',
        options: [
          'Observation — next decision ku input',
          'Ignore pannalam',
          'Final answer automatically',
          'Delete pannanum',
        ],
        answer: 0,
        explain: 'Tool result = observation. Agent adha paathu next step decide — closed loop idhu dhaan intelligence.',
      },
      {
        q: 'Max iterations guard why?',
        options: [
          'Infinite loop + cost explosion prevention',
          'Speed',
          'Memory',
          'UI design',
        ],
        answer: 0,
        explain: 'Loop stuck na = API calls forever = money + hang. Hard cap + graceful exit = production MUST.',
      },
      {
        q: 'Risky tool (delete/send) handling?',
        options: [
          'Confirmation gate before execute',
          'Auto-execute fast',
          'Never implement',
          'LLM decides alone',
        ],
        answer: 0,
        explain: 'Human-in-the-loop for risky actions. Read-only = auto, write/delete = confirm. Safety tier design.',
      },
      {
        q: 'Hallucination guard for course-specific answers?',
        options: [
          'RAG: retrieve own lesson data, ground the answer',
          'Longer prompts only',
          'Higher temperature',
          'More tokens',
        ],
        answer: 0,
        explain: 'Course facts = own database + retrieval → context → grounded answer. Generic LLM memory = hallucination risk.',
      },
      {
        q: 'Memory.update(result) purpose?',
        options: [
          'Agent context stays current — informed future decisions',
          'Storage only, no effect',
          'Delete old data',
          'UI refresh',
        ],
        answer: 0,
        explain: 'Memory update = agent learns session progress. Next think step uses it — self-correction foundation.',
      },
    ],
  },
];

export const world11Boss: QuizQuestion[] = [
  {
    q: 'BOSS: AI ⊃ ML ⊃ DL ⊃ LLM — correct nesting?',
    options: [
      'LLM ⊂ DL ⊂ ML ⊂ AI',
      'AI ⊂ ML ⊂ LLM ⊂ DL',
      'ML ⊂ AI ⊂ LLM ⊂ DL',
      'All equal',
    ],
    answer: 0,
    explain: 'AI = biggest umbrella. ML = subset (learn from data). DL = subset (neural nets). LLM = DL subset (language).',
  },
  {
    q: 'BOSS: Prompt 5-part skeleton?',
    options: [
      'Role, task, context, constraints, format',
      'Question + answer',
      'Title + body',
      'Greeting + request',
    ],
    answer: 0,
    explain: 'Professional prompt = role (who), task (what), context (background), constraints (limits), format (output shape).',
  },
  {
    q: 'BOSS: Agent vs chatbot — defining difference?',
    options: [
      'Agent uses tools + acts + verifies in a loop',
      'Agent is always faster',
      'Chatbot has memory, agent does not',
      'No real difference',
    ],
    answer: 0,
    explain: 'Agent = brain + tools + observe loop → real actions with verification. Chatbot = single-turn text generation.',
  },
  {
    q: 'BOSS: Function calling la LLM generates...?',
    options: [
      'Tool request (name + args); your code executes it',
      'The actual API call itself',
      'Database rows',
      'Compiled binary',
    ],
    answer: 0,
    explain: 'LLM = decision + formatting. Execution = developer code = security boundary. Never assume LLM executes.',
  },
  {
    q: 'BOSS: RAG flow order?',
    options: [
      'Query → retrieve relevant docs → add to context → generate grounded answer',
      'Generate → then search',
      'Search → delete → generate',
      'Train → infer → retrieve',
    ],
    answer: 0,
    explain: 'RAG = Retrieval Augmented Generation: fetch relevant knowledge FIRST, then answer grounded in it. Hallucination ↓.',
  },
  {
    q: 'BOSS: API status 429 → correct agent behaviour?',
    options: [
      'Wait + retry with backoff',
      'Retry instantly in tight loop',
      'Ignore and continue',
      'Crash the agent',
    ],
    answer: 0,
    explain: '429 = rate limit. Instant retry = more 429s. Backoff (wait longer each time) = correct pattern.',
  },
  {
    q: 'BOSS: Agent production guardrails — pick the TRUE set?',
    options: [
      'Max iterations + risky action confirmation + grounded retrieval',
      'Unlimited loops + auto-delete tools + raw LLM facts',
      'Only system prompt, nothing else',
      'No error handling needed',
    ],
    answer: 0,
    explain: 'Loop cap (cost/hang), confirmation gates (safety), RAG grounding (hallucination) = minimal production guardrail set.',
  },
];

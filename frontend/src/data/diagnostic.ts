// ============================================================
// EMBEDQUEST — beginner diagnostic (catch-up mode)
// 12 quick questions sampling all worlds. Wrong answers mark
// that world weak and shape the personalized catch-up plan.
// ============================================================
import type { DiagnosticQuestion } from '../lib/types';

export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    q: 'Computer oda main functions enna?',
    options: ['Input, Process, Output, Storage', 'Type, Click, Scroll, Print', 'RAM, ROM, CPU, GPU', 'Web, Game, Music, Video'],
    answer: 0,
    worldId: 'w1',
    topic: 'Computer basics',
  },
  {
    q: 'RAM oda special quality yedhu?',
    options: ['Permanent storage', 'Power off pannalum irukkum', 'Volatile — power pona erase', 'CPU la irukku'],
    answer: 2,
    worldId: 'w1',
    topic: 'Memory',
  },
  {
    q: 'Binary la yethana digits irukkum?',
    options: ['2 (0 and 1)', '8', '10', '16'],
    answer: 0,
    worldId: 'w2',
    topic: 'Binary basics',
  },
  {
    q: '1101 (binary) decimal la yevvalo?',
    options: ['11', '13', '14', '15'],
    answer: 1,
    worldId: 'w2',
    topic: 'Binary conversion',
  },
  {
    q: 'C program la oru statement end la yedhu venum?',
    options: ['.', ':', ';', 'Ah, no marks'],
    answer: 2,
    worldId: 'w3',
    topic: 'C syntax',
  },
  {
    q: 'printf("%d", 5); yenna print pannum?',
    options: ['%d', '5', 'd', 'Error'],
    answer: 1,
    worldId: 'w3',
    topic: 'printf basics',
  },
  {
    q: 'LED-a protect pannura component yedhu?',
    options: ['Capacitor', 'Resistor (current limiter)', 'Inductor', 'Relay'],
    answer: 1,
    worldId: 'w5',
    topic: 'LED + resistor',
  },
  {
    q: 'AND gate output 1 aagum bodhu?',
    options: ['Rendu inputs 1', 'Rendu inputs 0', 'Oru input 1', 'Yedhula 1'],
    answer: 0,
    worldId: 'w4',
    topic: 'Logic gates',
  },
  {
    q: 'Arduino UNO la LED blink panna yedha use panrom?',
    options: ['analogRead()', 'digitalWrite()', 'scanf()', 'Serial.begin()'],
    answer: 1,
    worldId: 'w6',
    topic: 'GPIO basics',
  },
  {
    q: 'volatile keyword yean use pannuvom embedded la?',
    options: [
      'Speed korakanum',
      'Compiler optimization-a thadukka (hardware changes variable)',
      'Memory save panna',
      'Error fix panna',
    ],
    answer: 1,
    worldId: 'w7',
    topic: 'Embedded C',
  },
  {
    q: 'IoT la sensor data cloud ku pora vazhi?',
    options: ['WiFi/MQTT maari connectivity', 'USB fan', 'LED', 'Breadboard'],
    answer: 0,
    worldId: 'w10',
    topic: 'IoT basics',
  },
  {
    q: 'AI agent normal chatbot la irundhu different yepdi?',
    options: [
      'Speed dhaan matter',
      'Agent plans panni tools use panni actions edukum',
      'Agent ku internet illa',
      'Same dhaan',
    ],
    answer: 1,
    worldId: 'w11',
    topic: 'AI agents',
  },
];

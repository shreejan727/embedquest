// ============================================================
// EMBEDQUEST — world definitions (RPG world map meta)
// Boss quizzes live with their world's lessons file.
// ============================================================
import type { World } from '../lib/types';
import { world1Boss } from './lessons-w1';
import { world2Boss } from './lessons-w2';
import { world3Boss } from './lessons-w3';
import { world4Boss } from './lessons-w4';
import { world5Boss } from './lessons-w5';
import { world6Boss } from './lessons-w6';
import { world7Boss } from './lessons-w7';
import { world8Boss } from './lessons-w8';
import { world9Boss } from './lessons-w9';
import { world10Boss } from './lessons-w10';
import { world11Boss } from './lessons-w11';

export const worlds: World[] = [
  {
    id: 'w1',
    num: 1,
    title: 'Computer Fundamentals',
    subtitle: 'Computer na ennu theriyama start pannu',
    icon: 'cpu',
    color: 'from-sky-500 to-blue-600',
    boss: world1Boss,
  },
  {
    id: 'w2',
    num: 2,
    title: 'Number Systems',
    subtitle: 'Binary, Hex — machine oda language',
    icon: 'binary',
    color: 'from-violet-500 to-purple-600',
    boss: world2Boss,
  },
  {
    id: 'w3',
    num: 3,
    title: 'C Programming from Zero',
    subtitle: 'Embedded oda mother language',
    icon: 'code',
    color: 'from-emerald-500 to-teal-600',
    boss: world3Boss,
  },
  {
    id: 'w4',
    num: 4,
    title: 'Digital Electronics',
    subtitle: 'Gates, truth tables, adders',
    icon: 'circuit',
    color: 'from-amber-500 to-orange-600',
    boss: world4Boss,
  },
  {
    id: 'w5',
    num: 5,
    title: 'Basic Electronics',
    subtitle: 'Ohm law, resistors, LEDs',
    icon: 'zap',
    color: 'from-yellow-400 to-amber-500',
    boss: world5Boss,
  },
  {
    id: 'w6',
    num: 6,
    title: 'Microcontrollers',
    subtitle: 'Arduino & ESP32 oda ul andam',
    icon: 'chip',
    color: 'from-cyan-500 to-sky-600',
    boss: world6Boss,
  },
  {
    id: 'w7',
    num: 7,
    title: 'Embedded C',
    subtitle: 'Registers, bits, interrupts',
    icon: 'terminal',
    color: 'from-indigo-500 to-blue-700',
    boss: world7Boss,
  },
  {
    id: 'w8',
    num: 8,
    title: 'Sensors & Protocols',
    subtitle: 'UART, I2C, SPI, real sensors',
    icon: 'radio',
    color: 'from-rose-500 to-pink-600',
    boss: world8Boss,
  },
  {
    id: 'w9',
    num: 9,
    title: 'RTOS & FreeRTOS',
    subtitle: 'Multi-tasking real-time magic',
    icon: 'layers',
    color: 'from-fuchsia-500 to-purple-700',
    boss: world9Boss,
  },
  {
    id: 'w10',
    num: 10,
    title: 'Internet of Things',
    subtitle: 'Sensor data cloud ku porakudhu',
    icon: 'wifi',
    color: 'from-teal-500 to-emerald-600',
    boss: world10Boss,
  },
  {
    id: 'w11',
    num: 11,
    title: 'Agentic AI',
    subtitle: 'AI agents tools uda operate',
    icon: 'bot',
    color: 'from-blue-500 to-indigo-700',
    boss: world11Boss,
  },
  {
    id: 'w12',
    num: 12,
    title: 'Final Projects',
    subtitle: 'Build pannu — Minecraft style quests',
    icon: 'rocket',
    color: 'from-orange-500 to-red-600',
    boss: [],
  },
];

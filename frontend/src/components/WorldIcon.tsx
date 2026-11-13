// Maps world icon keys (in worlds.ts) to lucide-react components.
import {
  Binary,
  Bot,
  CircuitBoard,
  Cpu,
  Code2,
  Layers,
  Microchip,
  Radio,
  Rocket,
  Terminal,
  Wifi,
  Zap,
  type LucideIcon,
} from 'lucide-react';

const MAP: Record<string, LucideIcon> = {
  cpu: Cpu,
  binary: Binary,
  code: Code2,
  circuit: CircuitBoard,
  zap: Zap,
  chip: Microchip,
  terminal: Terminal,
  radio: Radio,
  layers: Layers,
  wifi: Wifi,
  bot: Bot,
  rocket: Rocket,
};

export function WorldIcon({ icon, className = 'h-6 w-6' }: { icon: string; className?: string }) {
  const Icon = MAP[icon] ?? Cpu;
  return <Icon className={className} />;
}

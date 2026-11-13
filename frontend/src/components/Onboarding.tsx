// ============================================================
// EMBEDQUEST — first experience: welcome + setup
// Flow: welcome → name & daily goal → diagnostic → catch-up
// plan → World 1 Lesson 1 unlocked. Tanglish tone throughout.
// ============================================================
import { useState } from 'react';
import { ChevronRight, Gamepad2, Map, Sparkles, Target, Wrench } from 'lucide-react';
import { Btn, Card } from './common';
import { navigate } from '../lib/router';
import { setOnboarding, useProgress } from '../lib/progress';
import { t } from '../lib/i18n';

const GOALS = [
  { minutes: 10, label: '10 min/day', desc: 'Fast catch-up illa, but steady' },
  { minutes: 20, label: '20 min/day', desc: 'Recommended — solid progress' },
  { minutes: 30, label: '30 min/day', desc: 'Serious grind mode' },
  { minutes: 45, label: '45 min/day', desc: 'Full-time warrior 🔥' },
];

export function Onboarding() {
  const progress = useProgress();
  const [step, setStep] = useState(progress.onboarding.done ? 0 : 0);
  const [name, setName] = useState('');
  const [minutes, setMinutes] = useState(20);

  // Diagnostic already done? Show the plan screen.
  if (progress.diagnostic.done) return <PlanScreen />;

  if (step === 0) {
    return (
      <div className="mx-auto max-w-2xl space-y-5">
        <Card className="eq-grid-bg overflow-hidden p-8 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 font-mono text-2xl font-black text-white eq-glow">
            &gt;_
          </div>
          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            {t('ob_welcome')}
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
            {t('ob_welcome_msg')}
          </p>
        </Card>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: <Map className="h-6 w-6" />,
              title: t('ob_f1_title'),
              desc: t('ob_f1_desc'),
            },
            {
              icon: <Gamepad2 className="h-6 w-6" />,
              title: t('ob_f2_title'),
              desc: t('ob_f2_desc'),
            },
            {
              icon: <Wrench className="h-6 w-6" />,
              title: t('ob_f3_title'),
              desc: t('ob_f3_desc'),
            },
          ].map((f) => (
            <Card key={f.title} className="p-4">
              <div className="text-indigo-500">{f.icon}</div>
              <div className="mt-2 font-bold">{f.title}</div>
              <div className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{f.desc}</div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Btn className="px-8 py-3 text-base" onClick={() => setStep(1)}>
            {t('ob_start')} <ChevronRight className="inline h-4 w-4" />
          </Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <Card className="p-6">
        <div className="flex items-center gap-2 text-indigo-500">
          <Sparkles className="h-5 w-5" />
          <span className="text-sm font-bold uppercase tracking-wide">Step 1 of 2</span>
        </div>
        <h2 className="mt-2 text-2xl font-black">{t('ob_info_h')}</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {t('ob_privacy')}
        </p>

        <label className="mt-5 block text-sm font-bold">{t('ob_name_label')}</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('ob_name_ph')}
          maxLength={20}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
        />

        <label className="mt-5 block text-sm font-bold">{t('ob_time_label')}</label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {GOALS.map((g) => (
            <button
              key={g.minutes}
              onClick={() => setMinutes(g.minutes)}
              className={`rounded-xl border p-3 text-left transition-colors ${
                minutes === g.minutes
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'
                  : 'border-slate-200 bg-white hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-900'
              }`}
            >
              <div className="font-bold">{g.label}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{g.desc}</div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Btn variant="ghost" onClick={() => setStep(0)}>
            {t('ob_back')}
          </Btn>
          <Btn
            onClick={() => {
              setOnboarding(name.trim() || 'Champ', minutes);
              navigate('/diagnostic');
            }}
          >
            <Target className="mr-1 inline h-4 w-4" /> {t('ob_next_diag')}
          </Btn>
        </div>
      </Card>
    </div>
  );
}

/** Catch-up plan summary shown after the diagnostic. */
export function PlanScreen() {
  const progress = useProgress();
  const plan = progress.diagnostic.plan;
  const totalLessons = Object.keys(progress.lessons).length;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Card className="p-6 text-center">
        <div className="text-4xl">🗺️</div>
        <h2 className="mt-2 text-2xl font-black">{t('plan_ready')}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {t('plan_msg', { name: progress.onboarding.name })}
        </p>
      </Card>

      <Card className="p-5">
        <h3 className="font-bold">{t('plan_order')}</h3>
        <ol className="mt-3 space-y-2">
          {plan.map((worldId, i) => (
            <li key={worldId} className="flex items-center gap-3 text-sm">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 font-mono text-xs font-bold text-white">
                {i + 1}
              </span>
              World {worldId.replace('w', '')} —{' '}
              {['Computer', 'Binary', 'C', 'Digital', 'Basic Elec', 'MCU', 'EmbC', 'Sensors', 'RTOS', 'IoT', 'AI'][
                Number(worldId.replace('w', '')) - 1
              ]}{' '}
              focus
            </li>
          ))}
        </ol>
        <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
          {t('plan_stats', { n: totalLessons, min: progress.onboarding.dailyMinutes })}
        </div>
      </Card>

      <div className="text-center">
        <Btn
          className="px-8 py-3 text-base"
          onClick={() => navigate(plan[0] ? `/world/${plan[0]}` : '/world/w1')}
        >
          {t('plan_start')}
        </Btn>
      </div>
    </div>
  );
}

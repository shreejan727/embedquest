// ============================================================
// EMBEDQUEST — app shell: top bar, desktop sidebar, mobile
// bottom navigation. Everything navigates via hash router.
// ============================================================
import type { ReactNode } from 'react';
import {
  BookOpen,
  Flame,
  Home,
  Hammer,
  Layers,
  Moon,
  Settings,
  Sun,
  Wrench,
  Zap,
} from 'lucide-react';
import { Link, useRoute } from '../lib/router';
import { currentStreak, levelProgress, rankFromXp, setLanguage, setTheme, useProgress } from '../lib/progress';
import { t } from '../lib/i18n';

function NavItem({
  to,
  icon,
  label,
  active,
  compact,
}: {
  to: string;
  icon: ReactNode;
  label: string;
  active: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
        active
          ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300'
          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70'
      } ${compact ? 'flex-col gap-1 px-2 py-1.5 text-[10px]' : ''}`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const progress = useProgress();
  const path = useRoute();
  const lp = levelProgress(progress.xp);
  const streak = currentStreak(progress.activeDays);
  const dark = progress.theme === 'dark';

  const nav = [
    { to: '/', icon: <Home className="h-5 w-5" />, label: t('nav_home') },
    { to: '/worlds', icon: <Layers className="h-5 w-5" />, label: t('nav_worlds') },
    { to: '/tools', icon: <Wrench className="h-5 w-5" />, label: t('nav_tools') },
    { to: '/projects', icon: <Hammer className="h-5 w-5" />, label: t('nav_projects') },
    { to: '/teacher', icon: <BookOpen className="h-5 w-5" />, label: t('nav_teacher') },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 font-mono text-lg font-bold text-white eq-glow">
              &gt;_
            </span>
            <span className="hidden font-mono text-lg font-black tracking-tight sm:block">
              EMBED<span className="text-indigo-500">QUEST</span>
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            {/* Level + XP */}
            <Link
              to="/profile"
              className="hidden min-w-40 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-800 dark:bg-slate-900 sm:flex"
            >
              <Zap className="h-4 w-4 text-amber-500" />
              <div className="flex-1">
                <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Lv {lp.level} · {rankFromXp(progress.xp)}
                </div>
                <div className="mt-0.5 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 eq-glow"
                    style={{ width: `${lp.pct}%` }}
                  />
                </div>
              </div>
            </Link>
            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 sm:hidden">
              Lv {lp.level}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-600 dark:bg-orange-500/15 dark:text-orange-400">
              <Flame className="h-3.5 w-3.5" /> {streak}
            </span>
            <button
              onClick={() => setLanguage(progress.language === 'tanglish' ? 'english' : 'tanglish')}
              className="rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs font-black text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              title={t('lang_toggle_title')}
            >
              {progress.language === 'tanglish' ? 'EN' : 'த'}
            </button>
            <button
              onClick={() => setTheme(dark ? 'light' : 'dark')}
              className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              title={dark ? 'Light theme' : 'Dark theme'}
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl">
        {/* Desktop sidebar */}
        <aside className="sticky top-[61px] hidden h-[calc(100vh-61px)] w-52 shrink-0 flex-col gap-1 border-r border-slate-200 p-3 dark:border-slate-800 lg:flex">
          {nav.map((n) => (
            <NavItem key={n.to} {...n} active={path === n.to || (n.to !== '/' && path.startsWith(n.to))} />
          ))}
          <NavItem
            to="/profile"
            icon={<Settings className="h-5 w-5" />}
            label={t('nav_profile')}
            active={path.startsWith('/profile')}
          />
          <div className="mt-auto rounded-xl bg-slate-100 p-3 text-[11px] leading-relaxed text-slate-500 dark:bg-slate-900 dark:text-slate-400">
            {t('sidebar_tip')}
          </div>
        </aside>

        {/* Page content */}
        <main className="min-h-[calc(100vh-64px)] w-full px-4 pb-24 pt-5 sm:px-6 lg:pb-10">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 lg:hidden">
        <div className="mx-auto flex max-w-lg items-stretch justify-around px-1 py-1.5">
          {nav.map((n) => (
            <NavItem
              key={n.to}
              {...n}
              compact
              active={path === n.to || (n.to !== '/' && path.startsWith(n.to))}
            />
          ))}
        </div>
      </nav>
    </div>
  );
}

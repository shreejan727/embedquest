// ============================================================
// EMBEDQUEST — profile: stats, badges, streak calendar, account
// (cloud sync status, display name, password, sign out, reset)
// ============================================================
import { useState } from 'react';
import {
  Award,
  CalendarDays,
  Cloud,
  CloudOff,
  Flame,
  KeyRound,
  Loader2,
  LogOut,
  Pencil,
  RotateCcw,
  Settings,
  Trash2,
  UserPlus,
  Zap,
} from 'lucide-react';
import { Btn, Card, ProgressBar } from '../components/common';
import {
  BADGES,
  currentStreak,
  levelProgress,
  rankFromXp,
  resetProgress,
  setDisplayName,
  setLanguage,
  useProgress,
} from '../lib/progress';
import { getSyncError } from '../lib/cloudSync';
import { useAuth } from '../lib/auth';
import { t, timeAgoLocalized } from '../lib/i18n';
import { ALL_LESSONS } from '../lib/curriculum';

function lastNDays(n: number): string[] {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
  }
  return days;
}

function timeAgo(iso: string | undefined): string {
  return timeAgoLocalized(iso);
}

export function ProfileView() {
  const progress = useProgress();
  const auth = useAuth();
  const lp = levelProgress(progress.xp);
  const streak = currentStreak(progress.activeDays);
  const [confirming, setConfirming] = useState(false);
  const activeSet = new Set(progress.activeDays);
  const days = lastNDays(14);
  const lessonsDone = Object.keys(progress.lessons).length;
  const tasksDone = Object.keys(progress.tasks).length;

  const signedIn = Boolean(auth.cloudEnabled && auth.session);
  const name = signedIn ? auth.displayName || progress.onboarding.name : progress.onboarding.name;
  const syncErr = signedIn ? getSyncError() : { message: '', at: '' };

  // ---- display name editing ----
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState('');
  const [nameBusy, setNameBusy] = useState(false);
  const [nameMsg, setNameMsg] = useState('');

  // ---- change password ----
  const [showPass, setShowPass] = useState(false);
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [passBusy, setPassBusy] = useState(false);
  const [passMsg, setPassMsg] = useState('');

  async function saveName() {
    const trimmed = nameDraft.trim();
    if (trimmed.length < 2) {
      setNameMsg(t('name_short'));
      return;
    }
    setNameBusy(true);
    setNameMsg('');
    const { error } = await auth.updateDisplayName(trimmed);
    if (!error) setDisplayName(trimmed);
    setNameBusy(false);
    if (error) setNameMsg(error);
    else {
      setEditingName(false);
      setNameMsg('');
    }
  }

  async function changePassword() {
    if (pass.length < 6) {
      setPassMsg(t('err_pass'));
      return;
    }
    if (pass !== pass2) {
      setPassMsg('Rendu password um match aagala.');
      return;
    }
    setPassBusy(true);
    setPassMsg('');
    const { error } = await auth.changePassword(pass);
    setPassBusy(false);
    if (error) setPassMsg(error);
    else {
      setPassMsg(t('pass_ok'));
      setPass('');
      setPass2('');
      setTimeout(() => setShowPass(false), 1200);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div>
        <h1 className="text-2xl font-black sm:text-3xl">Profile 👤</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {signedIn ? t('profile_sub_cloud') : t('profile_sub_local')}
        </p>
      </div>

      {/* Identity card */}
      <Card className="eq-grid-bg p-5">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-2xl font-black text-white eq-glow">
            {name.slice(0, 1).toUpperCase()}
          </span>
          <div className="min-w-0 flex-1">
            {editingName ? (
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  value={nameDraft}
                  onChange={(e) => setNameDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') void saveName();
                  }}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                  placeholder="Unga name"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Btn onClick={() => void saveName()} disabled={nameBusy}>
                    {nameBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : t('save')}
                  </Btn>
                  <Btn variant="ghost" onClick={() => setEditingName(false)}>
                    {t('cancel')}
                  </Btn>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="truncate text-xl font-black">{name}</div>
                <button
                  title={t('name_edit')}
                  onClick={() => {
                    setNameDraft(name);
                    setEditingName(true);
                  }}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-indigo-500 dark:hover:bg-slate-800"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
            )}
            {signedIn && (
              <div className="truncate text-xs text-slate-500 dark:text-slate-400">{auth.user?.email}</div>
            )}
            <div className="text-sm text-slate-600 dark:text-slate-400">
              <Zap className="mr-1 inline h-4 w-4 text-amber-500" />
              Level {lp.level} · Rank: <b className="text-indigo-500">{rankFromXp(progress.xp)}</b>
            </div>
            <div className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-400">{progress.xp} XP total</div>
          </div>
        </div>
        {nameMsg && <p className="mt-3 text-xs font-semibold text-rose-500">{nameMsg}</p>}
        <ProgressBar pct={lp.pct} className="mt-4" />
        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {lp.into}/{lp.need} XP to Level {lp.level + 1}
        </div>
      </Card>

      {/* Account & cloud sync */}
      <Card className="p-5">
        <h2 className="flex items-center gap-2 text-lg font-black">
          {signedIn ? <Cloud className="h-5 w-5 text-sky-500" /> : <CloudOff className="h-5 w-5 text-slate-400" />}
          {t('account_cloud')}
        </h2>

        {!auth.cloudEnabled ? (
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {t('profile_local_p')}
          </p>
        ) : signedIn ? (
          <div className="mt-3 space-y-3 text-sm">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-600 dark:text-slate-400">
              <span>
                {t('last_sync')} <b className="text-slate-800 dark:text-slate-200">{timeAgo(progress.lastSyncedAt)}</b>
              </span>
              <span>
                {syncErr.message ? (
                  <span className="font-semibold text-rose-500">⚠️ {t('sync_err', { msg: syncErr.message })}</span>
                ) : progress.lastSyncedAt ? (
                  <span className="text-emerald-600 dark:text-emerald-400">{t('sync_ok')}</span>
                ) : (
                  <span>{t('sync_pending')}</span>
                )}
              </span>
            </div>

            {/* change password */}
            <div className="border-t border-slate-200 pt-3 dark:border-slate-800">
              {!showPass ? (
                <Btn variant="ghost" onClick={() => setShowPass(true)}>
                  <KeyRound className="mr-1 inline h-4 w-4" /> {t('change_password')}
                </Btn>
              ) : (
                <div className="space-y-2">
                  <input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder={t('new_pass_ph')}
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                  />
                  <input
                    type="password"
                    value={pass2}
                    onChange={(e) => setPass2(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') void changePassword();
                    }}
                    placeholder={t('new_pass2_ph')}
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                  />
                  <div className="flex gap-2">
                    <Btn onClick={() => void changePassword()} disabled={passBusy}>
                      {passBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : t('update_password')}
                    </Btn>
                    <Btn variant="ghost" onClick={() => setShowPass(false)}>
                      {t('cancel')}
                    </Btn>
                  </div>
                </div>
              )}
              {passMsg && <p className="mt-2 text-xs font-semibold text-indigo-500">{passMsg}</p>}
            </div>

            {/* sign out */}
            <div className="border-t border-slate-200 pt-3 dark:border-slate-800">
              <Btn variant="ghost" onClick={() => void auth.signOut()}>
                <LogOut className="mr-1 inline h-4 w-4" /> {t('sign_out')}
              </Btn>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {t('signout_hint')}
              </p>
            </div>
          </div>
        ) : (
          /* guest mode (cloud configured) */
          <div className="mt-3 space-y-3 text-sm">
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              {t('guest_p')}
            </p>
            <Btn
              onClick={() => {
                void auth.signOut(); // clears guest flag → AuthView shows
              }}
            >
              <UserPlus className="mr-1 inline h-4 w-4" /> {t('guest_btn')}
            </Btn>
          </div>
        )}
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: t('lessons_done'), value: `${lessonsDone}/${ALL_LESSONS.length}` },
          { label: t('tasks_done'), value: `${tasksDone}` },
          { label: t('badges_label'), value: `${progress.badges.length}/${BADGES.length + 12}` },
          { label: t('streak_label'), value: `${streak}🔥` },
        ].map((s) => (
          <Card key={s.label} className="p-4 text-center">
            <div className="text-2xl font-black">{s.value}</div>
            <div className="mt-1 text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {s.label}
            </div>
          </Card>
        ))}
      </div>

      {/* Streak calendar */}
      <Card className="p-5">
        <h2 className="flex items-center gap-2 text-lg font-black">
          <CalendarDays className="h-5 w-5 text-orange-500" /> {t('streak_cal')}
        </h2>
        <div className="mt-3 flex gap-1.5">
          {days.map((d) => (
            <div key={d} className="flex flex-1 flex-col items-center gap-1">
              <span
                title={d}
                className={`h-7 w-full max-w-7 rounded-md ${
                  activeSet.has(d)
                    ? 'bg-gradient-to-b from-orange-400 to-orange-500'
                    : 'bg-slate-200 dark:bg-slate-800'
                }`}
              />
              <span className="text-[9px] text-slate-400">{d.slice(8)}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Flame className="h-3.5 w-3.5 text-orange-500" />
          {t('streak_tip')}
        </p>
      </Card>

      {/* Badges */}
      <Card className="p-5">
        <h2 className="flex items-center gap-2 text-lg font-black">
          <Award className="h-5 w-5 text-amber-500" /> {t('badges_label')}
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {BADGES.map((b) => {
            const earned = progress.badges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`rounded-xl border p-3 text-center ${
                  earned
                    ? 'border-amber-300 bg-amber-50 dark:border-amber-500/40 dark:bg-amber-500/10'
                    : 'border-slate-200 opacity-50 dark:border-slate-800'
                }`}
              >
                <div className="text-2xl">{earned ? '🏅' : '🔒'}</div>
                <div className="mt-1 text-xs font-bold">{b.name}</div>
                <div className="mt-0.5 text-[10px] leading-snug text-slate-500 dark:text-slate-400">{b.desc}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Settings */}
      <Card className="p-5">
        <h2 className="flex items-center gap-2 text-lg font-black">
          <Settings className="h-5 w-5 text-slate-400" /> {t('settings_h')}
        </h2>
        <div className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          {t('daily_goal')} <b>{progress.onboarding.dailyMinutes} min</b> · {t('theme_label')}{' '}
          <b>{progress.theme === 'dark' ? t('theme_dark') : t('theme_light')}</b> {t('toggle_hint')}
        </div>

        {/* Language switcher */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
          <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{t('lang_label')}</span>
          {(['tanglish', 'english'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`rounded-xl border px-4 py-2 text-sm font-bold transition-colors ${
                progress.language === lang
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-600 dark:border-indigo-500 dark:bg-indigo-500/15 dark:text-indigo-300'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              {lang === 'tanglish' ? t('lang_tanglish') : t('lang_english')}
            </button>
          ))}
        </div>
        <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
          {confirming ? (
            <div className="rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-500/40 dark:bg-rose-500/10">
              <p className="text-sm font-bold text-rose-600 dark:text-rose-400">
                {t('reset_confirm', { cloud: signedIn ? t('reset_cloud_too') : '' })}
              </p>
              <div className="mt-3 flex gap-2">
                <Btn
                  variant="danger"
                  onClick={() => {
                    resetProgress();
                    setConfirming(false);
                    window.location.hash = '/';
                    window.location.reload();
                  }}
                >
                  <Trash2 className="mr-1 inline h-4 w-4" /> {t('reset_yes')}
                </Btn>
                <Btn variant="ghost" onClick={() => setConfirming(false)}>
                  {t('cancel')}
                </Btn>
              </div>
            </div>
          ) : (
            <Btn variant="ghost" onClick={() => setConfirming(true)}>
              <RotateCcw className="mr-1 inline h-4 w-4" /> {t('reset_title')}
            </Btn>
          )}
        </div>
      </Card>
    </div>
  );
}

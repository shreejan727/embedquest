// ============================================================
// EMBEDQUEST — visitor landing + authentication screen
// Modes: signin | signup | forgot | check-email
// Honest behavior: when Supabase credentials are NOT configured
// this screen clearly says the app is in local mode and offers
// guest play — it never fakes a login.
// ============================================================
import { useState } from 'react';
import { ArrowRight, AtSign, KeyRound, Loader2, Lock, Mail, Rocket, Send, User } from 'lucide-react';
import { Btn, Card } from './common';
import { useAuth } from '../lib/auth';
import { t } from '../lib/i18n';

type Mode = 'signin' | 'signup' | 'forgot' | 'check-email';

export function AuthView() {
  const auth = useAuth();
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const passOk = password.length >= 6;

  function validate(): string {
    if (!emailOk) return t('err_email');
    if ((mode === 'signin' || mode === 'signup') && !passOk) return t('err_pass');
    if (mode === 'signup' && name.trim().length < 2) return t('err_name');
    return '';
  }

  async function submit() {
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError('');
    setBusy(true);
    try {
      if (mode === 'signin') {
        const { error: e } = await auth.signIn(email, password);
        if (e) setError(e);
      } else if (mode === 'signup') {
        const { error: e, needsConfirm } = await auth.signUp(email, password, name);
        if (e) setError(e);
        else if (needsConfirm) setMode('check-email');
      } else if (mode === 'forgot') {
        const { error: e, sent } = await auth.sendResetEmail(email);
        if (e) setError(e);
        else if (sent) setMode('check-email');
      }
    } finally {
      setBusy(false);
    }
  }

  const title = {
    signin: t('auth_welcome'),
    signup: t('auth_signup_t'),
    forgot: t('auth_forgot_t'),
    'check-email': t('auth_check_t'),
  }[mode];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-4 text-white">
      <div className="mx-auto grid w-full max-w-4xl gap-8 md:grid-cols-2 md:items-center">
        {/* ---- brand / hero ---- */}
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-bold">
            <Rocket className="h-4 w-4 text-indigo-400" />
            EMBEDQUEST
          </div>
          <h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
            {t('auth_hero_h')}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            {t('auth_hero_p')}
          </p>
          <ul className="mt-4 space-y-1.5 text-sm text-slate-300">
            <li>{t('auth_hero_l1')}</li>
            <li>{t('auth_hero_l2')}</li>
            <li>{t('auth_hero_l3')}</li>
          </ul>
        </div>

        {/* ---- auth card ---- */}
        <Card className="w-full border-slate-800 bg-slate-900/80 p-6 text-slate-100 sm:p-8">
          {auth.cloudEnabled ? (
            <>
              <h2 className="text-xl font-black">{title}</h2>
              {mode !== 'check-email' ? (
                <>
                  {mode === 'forgot' && (
                    <p className="mt-1 text-sm text-slate-400">
                      {t('auth_forgot_p')}
                    </p>
                  )}
                  <div className="mt-4 space-y-3">
                    {mode === 'signup' && (
                      <label className="block">
                        <span className="mb-1 block text-xs font-semibold text-slate-400">{t('auth_name')}</span>
                        <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus-within:border-indigo-500">
                          <User className="h-4 w-4 shrink-0 text-slate-500" />
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Arjun"
                            autoComplete="name"
                            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-600"
                          />
                        </div>
                      </label>
                    )}
                    <label className="block">
                      <span className="mb-1 block text-xs font-semibold text-slate-400">{t('auth_email')}</span>
                      <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus-within:border-indigo-500">
                        <AtSign className="h-4 w-4 shrink-0 text-slate-500" />
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder="you@mail.com"
                          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-600"
                        />
                      </div>
                    </label>
                    {mode !== 'forgot' && (
                      <label className="block">
                        <span className="mb-1 block text-xs font-semibold text-slate-400">{t('auth_password')}</span>
                        <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus-within:border-indigo-500">
                          <Lock className="h-4 w-4 shrink-0 text-slate-500" />
                          <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') void submit();
                            }}
                            placeholder="min 6 characters"
                            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-600"
                          />
                        </div>
                      </label>
                    )}
                  </div>

                  {error && (
                    <p className="mt-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
                      {error}
                    </p>
                  )}

                  <Btn onClick={() => void submit()} disabled={busy} className="mt-4 w-full">
                    {busy ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t('auth_wait')}
                      </span>
                    ) : mode === 'signin' ? (
                      t('auth_login')
                    ) : mode === 'signup' ? (
                      t('auth_create')
                    ) : (
                      t('auth_send_reset')
                    )}
                  </Btn>

                  <div className="mt-4 flex flex-col items-center gap-1.5 text-sm">
                    {mode === 'signin' ? (
                      <>
                        <button className="text-indigo-400 hover:underline" onClick={() => setMode('signup')}>
                          {t('auth_no_account')}
                        </button>
                        <button className="text-slate-400 hover:underline" onClick={() => setMode('forgot')}>
                          {t('auth_forgot_link')}
                        </button>
                      </>
                    ) : (
                      <button className="text-indigo-400 hover:underline" onClick={() => setMode('signin')}>
                        {t('auth_back_login')}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="py-4 text-center">
                  <Send className="mx-auto h-10 w-10 text-indigo-400" />
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    {t('auth_check_p', { email })}
                  </p>
                  <Btn variant="ghost" className="mt-5" onClick={() => setMode('signin')}>
                    {t('auth_back_login')}
                  </Btn>
                </div>
              )}
            </>
          ) : (
            /* ---- local mode: honest notice ---- */
            <>
              <h2 className="text-xl font-black">{t('auth_local_t')}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {t('auth_local_p')}
              </p>
              <p className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs leading-relaxed text-amber-300">
                {t('auth_local_dev')}
              </p>
              <Btn onClick={auth.continueAsGuest} className="mt-4 w-full">
                {t('auth_guest')} <ArrowRight className="inline h-4 w-4" />
              </Btn>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

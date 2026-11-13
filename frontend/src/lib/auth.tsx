// ============================================================
// EMBEDQUEST — authentication context (Supabase Auth)
// Session state, sign-up/in/out, password reset + change,
// display-name profile sync. Cloud is OPTIONAL: when Supabase
// credentials are missing the app runs in local mode.
// ============================================================
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { friendlyAuthError, isCloudEnabled, supabase } from './supabase';

const GUEST_KEY = 'embedquest-guest';

export interface AuthState {
  /** Cloud mode active (credentials configured). */
  cloudEnabled: boolean;
  /** Loading initial session / profile. */
  loading: boolean;
  session: Session | null;
  user: User | null;
  /** Display name: profile row → user metadata → email prefix. */
  displayName: string;
  /** True when the user explicitly chose local-only guest mode. */
  isGuest: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string; needsConfirm?: boolean }>;
  signOut: () => Promise<void>;
  sendResetEmail: (email: string) => Promise<{ error?: string; sent?: boolean }>;
  changePassword: (newPassword: string) => Promise<{ error?: string; ok?: boolean }>;
  updateDisplayName: (name: string) => Promise<{ error?: string; ok?: boolean }>;
  continueAsGuest: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

function nameFromUser(user: User | null, profileName?: string | null): string {
  return (
    profileName ||
    (user?.user_metadata?.full_name as string | undefined) ||
    user?.email?.split('@')[0] ||
    'Learner'
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(isCloudEnabled);
  const [session, setSession] = useState<Session | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [isGuest, setIsGuest] = useState(() => {
    try {
      return localStorage.getItem(GUEST_KEY) === '1';
    } catch {
      return false;
    }
  });

  // Initial session + auth state changes
  useEffect(() => {
    if (!isCloudEnabled || !supabase) return;
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (s) {
        try {
          localStorage.removeItem(GUEST_KEY);
        } catch {
          /* ignore */
        }
        setIsGuest(false);
      }
      setLoading(false);
    });

    return () => {
      active = false;
      sub?.subscription?.unsubscribe();
    };
  }, []);

  // Load display name whenever a session exists
  useEffect(() => {
    if (!session?.user || !supabase) return;
    let active = true;
    (async () => {
      const { data } = await supabase!
        .from('profiles')
        .select('display_name')
        .eq('id', session.user!.id)
        .maybeSingle();
      if (active) setDisplayName(nameFromUser(session.user, data?.display_name ?? null));
    })();
    return () => {
      active = false;
    };
  }, [session]);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) return { error: 'Cloud sync set up aagala — local mode la irukku.' };
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) return { error: friendlyAuthError(error.message) };
    return {};
  }, []);

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    if (!supabase) return { error: 'Cloud sync set up aagala — local mode la irukku.' };
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { full_name: name.trim() } },
    });
    if (error) return { error: friendlyAuthError(error.message) };
    // Email confirmation required → no session yet.
    if (!data.session) return { needsConfirm: true };
    return {};
  }, []);

  const signOut = useCallback(async () => {
    try {
      localStorage.removeItem(GUEST_KEY);
    } catch {
      /* ignore */
    }
    setIsGuest(false);
    if (supabase) await supabase.auth.signOut();
  }, []);

  const sendResetEmail = useCallback(async (email: string) => {
    if (!supabase) return { error: 'Cloud sync set up aagala — local mode la irukku.' };
    const redirectTo = `${window.location.origin}${window.location.pathname}`;
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo });
    if (error) return { error: friendlyAuthError(error.message) };
    return { sent: true };
  }, []);

  const changePassword = useCallback(async (newPassword: string) => {
    if (!supabase) return { error: 'Cloud sync set up aagala.' };
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) return { error: friendlyAuthError(error.message) };
    return { ok: true };
  }, []);

  const updateDisplayName = useCallback(async (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return { error: 'Name empty-a irukku.' };
    if (supabase && session?.user) {
      const { error } = await supabase
        .from('profiles')
        .update({ display_name: trimmed })
        .eq('id', session.user.id);
      if (error) return { error: friendlyAuthError(error.message) };
    }
    setDisplayName(trimmed);
    return { ok: true };
  }, [session]);

  const continueAsGuest = useCallback(() => {
    try {
      localStorage.setItem(GUEST_KEY, '1');
    } catch {
      /* ignore */
    }
    setIsGuest(true);
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      cloudEnabled: isCloudEnabled,
      loading,
      session,
      user: session?.user ?? null,
      displayName,
      isGuest: isCloudEnabled ? isGuest && !session : true,
      signIn,
      signUp,
      signOut,
      sendResetEmail,
      changePassword,
      updateDisplayName,
      continueAsGuest,
    }),
    [loading, session, displayName, isGuest, signIn, signUp, signOut, sendResetEmail, changePassword, updateDisplayName, continueAsGuest],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

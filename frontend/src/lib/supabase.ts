// ============================================================
// EMBEDQUEST — Supabase client (auth + PostgreSQL cloud sync)
//
// Only the PUBLIC anon key is used in frontend code. The
// service-role key must NEVER appear here — it lives only in
// the Supabase dashboard (and any future server proxy).
//
// If credentials are missing the app stays in LOCAL MODE and
// clearly says so — it never pretends the cloud is connected.
// ============================================================
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim();

/** True only when BOTH public credentials are present. */
export const isCloudEnabled = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isCloudEnabled
  ? createClient(url!, anonKey!, {
      auth: {
        persistSession: true, // session survives refresh via localStorage
        autoRefreshToken: true,
        detectSessionInUrl: true, // handles email-confirm / recovery links
      },
    })
  : null;

/** Friendly Tanglish error mapping for auth failures. */
export function friendlyAuthError(message: string): string {
  const m = (message || '').toLowerCase();
  if (m.includes('invalid login credentials')) return 'Email illa password thappu. Melliyaa try pannunga.';
  if (m.includes('email not confirmed')) return 'Email-a confirm pannanum — inbox la verification link irukku (spam folder um paaru).';
  if (m.includes('user already registered') || m.includes('already been registered'))
    return 'Indha email ku account already irukku. Sign in pannunga, illa "Forgot password" use pannunga.';
  if (m.includes('password should be at least')) return 'Password romba short — minimum 6 characters venum.';
  if (m.includes('rate limit') || m.includes('too many requests')) return 'Konjam jasthi attempts! Oru nimisham wait pannitu try pannunga.';
  if (m.includes('failed to fetch') || m.includes('network')) return 'Internet connection issue. WiFi/data check pannitu retry pannunga.';
  if (m.includes('invalid email')) return 'Email format sari illa — check pannunga.';
  if (m.includes('unable to validate email')) return 'Email sari illa — vera email try pannunga.';
  return message || 'Edho problem — melliyaa try pannunga.';
}

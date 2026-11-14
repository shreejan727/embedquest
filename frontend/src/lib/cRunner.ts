// ============================================================
// EMBEDQUEST — C program runner (browser, no server needed)
//
// Pipeline: sanitizeCSource (JSCPP comma bug workaround) →
// Web Worker running the JSCPP interpreter → streamed stdout +
// friendly error/timeout reporting.
//
// HONEST MODE: this is a teaching-grade C interpreter (JSCPP),
// NOT a real gcc compiler. The UI says so, and offers OnlineGDB
// for the full-compiler experience.
// ============================================================
import { sanitizeCSource } from './cSanitize';

export interface CRunResult {
  output: string;
  /** Program exit code, or null when it never finished. */
  exitCode: number | null;
  /** Raw interpreter/syntax error message, if any. */
  error: string | null;
  /** True when the run was killed by the wall-clock guard. */
  timedOut: boolean;
}

interface WorkerMsg {
  id: number;
  type: 'out' | 'done' | 'error';
  chunk?: string;
  exitCode?: number;
  message?: string;
}

const DEFAULT_MAX_TIMEOUT = 5000; // JSCPP cooperative limit (ms)
const HARD_TIMEOUT_EXTRA = 2500; // wall-clock guard beyond the above

export interface CRunHandle {
  done: Promise<CRunResult>;
  /** Hard-kill the running program (worker terminated). */
  stop: () => void;
}

export function startCRun(opts: {
  code: string;
  input?: string;
  /** Cooperative JSCPP limit; also drives the hard worker kill. */
  timeoutMs?: number;
  /** Called with stdout chunks as they are produced. */
  onOutput?: (chunk: string) => void;
}): CRunHandle {
  const maxTimeout = Math.max(500, opts.timeoutMs ?? DEFAULT_MAX_TIMEOUT);
  const sanitized = sanitizeCSource(opts.code);

  let worker: Worker | null = null;
  try {
    worker = new Worker(new URL('./crun.worker.ts', import.meta.url), { type: 'module' });
  } catch {
    // Extremely old browser without module workers — honest fallback.
    return {
      done: Promise.resolve({
        output: '',
        exitCode: null,
        error: 'Browser does not support running C here (Web Worker missing).',
        timedOut: false,
      }),
      stop: () => {},
    };
  }

  const output: string[] = [];
  let settled = false;
  let hardTimer: ReturnType<typeof setTimeout> | null = null;

  const finish = (result: CRunResult) => {
    if (settled) return;
    settled = true;
    if (hardTimer) clearTimeout(hardTimer);
    worker?.terminate();
    worker = null;
  };

  const done = new Promise<CRunResult>((resolve) => {
    if (!worker) return;
    hardTimer = setTimeout(() => {
      finish({
        output: output.join(''),
        exitCode: null,
        error: 'Time limit exceeded.',
        timedOut: true,
      });
      resolve({
        output: output.join(''),
        exitCode: null,
        error: 'Time limit exceeded.',
        timedOut: true,
      });
    }, maxTimeout + HARD_TIMEOUT_EXTRA);

    worker.onmessage = (e: MessageEvent<WorkerMsg>) => {
      const m = e.data;
      if (m.type === 'out' && typeof m.chunk === 'string') {
        output.push(m.chunk);
        opts.onOutput?.(m.chunk);
      } else if (m.type === 'done') {
        const r = { output: output.join(''), exitCode: m.exitCode ?? 0, error: null, timedOut: false };
        finish(r);
        resolve(r);
      } else if (m.type === 'error') {
        const msg = m.message ?? 'Unknown interpreter error';
        const r = {
          output: output.join(''),
          exitCode: null,
          error: msg,
          timedOut: /time limit/i.test(msg),
        };
        finish(r);
        resolve(r);
      }
    };

    worker.onerror = (ev) => {
      const r = {
        output: output.join(''),
        exitCode: null,
        error: ev.message || 'Worker failed to start (interpreter could not load).',
        timedOut: false,
      };
      finish(r);
      resolve(r);
    };

    worker.postMessage({ id: 1, code: sanitized, input: opts.input ?? '', maxTimeout });
  });

  return {
    done,
    stop() {
      if (!settled) {
        finish({
          output: output.join(''),
          exitCode: null,
          error: 'Stopped by student.',
          timedOut: true,
        });
      }
    },
  };
}

export async function runCProgram(opts: {
  code: string;
  input?: string;
  timeoutMs?: number;
  onOutput?: (chunk: string) => void;
}): Promise<CRunResult> {
  return startCRun(opts).done;
}

/** Map raw interpreter errors to short, friendly Tanglish hints. */
export function friendlyRunError(raw: string): string | null {
  const s = raw.toLowerCase();
  if (s.includes('time limit')) return 'Infinite loop aaiduchu! 🌀 Loop condition update aagama irukka? (for/while condition check pannu)';
  if (s.includes('parsing failure')) return 'Syntax error! 😅 Semicolon, brace {}, quotes " " — ellam check pannu.';
  if (s.includes('uninitialized')) return 'Variable ku value assign pannama use panniyaa? 🤔 int x; pannitu x print panna idhu dhaan varum.';
  if (s.includes('overflow')) return 'Number limit thandiduchu! 💥 int ku romba perusa value podadha (int max ≈ 2,147,483,647).';
  if (s.includes('insufficient arguments')) return 'printf format specifier & arguments count match aaganum! %d irundha, adhuku oru value kudukanum.';
  if (s.includes('format must be a string')) return 'printf first argument string literal aaganum — printf("...") maari.';
  if (s.includes('does not seem to be implemented')) return 'Function declare pannitu implement pannala? Definition (body {}) check pannu.';
  if (s.includes('segmentation') || s.includes('invalid pointer') || s.includes('memory')) return 'Pointer problem! 😬 &var / *ptr use pannumbodhu valid address-a irukku nu paarunga.';
  if (s.includes('include')) return '#include file name thappu? #include <stdio.h> exact-a irukanum.';
  return null;
}

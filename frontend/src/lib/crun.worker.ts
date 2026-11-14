// ============================================================
// EMBEDQUEST — C run worker (Web Worker, Vite module worker)
//
// Runs the JSCPP interpreter OFF the main thread so a buggy or
// infinite-loop student program can never freeze the UI. The
// runner on the main thread hard-terminates this worker when the
// run exceeds its budget.
//
// JSCPP has a built-in cooperative time limit (verified):
//   config.maxTimeout (ms) → throws "Time limit exceeded."
// We still terminate from outside as a belt-and-braces guard.
// ============================================================
/// <reference lib="webworker" />
import JSCPP from 'JSCPP';

interface RunRequest {
  id: number;
  code: string; // already sanitized by cSanitize on the main thread
  input: string;
  maxTimeout: number;
}

const ctx = self as unknown as {
  postMessage: (m: unknown) => void;
  onmessage: ((e: MessageEvent<RunRequest>) => void) | null;
};

ctx.onmessage = (e) => {
  const { id, code, input, maxTimeout } = e.data;
  try {
    const exitCode = JSCPP.run(code, input, {
      stdio: {
        write: (s: string) => {
          ctx.postMessage({ id, type: 'out', chunk: s });
        },
      },
      maxTimeout,
    });
    ctx.postMessage({ id, type: 'done', exitCode });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    ctx.postMessage({ id, type: 'error', message });
  }
};

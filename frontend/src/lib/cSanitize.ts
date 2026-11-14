// ============================================================
// EMBEDQUEST — C source sanitizer for the JSCPP interpreter
//
// WHY THIS EXISTS (verified against JSCPP 2.0.9):
// JSCPP's preprocessor re-serializes every function call's
// argument list and rejoins it with a bare "," (lib/preprocessor.js
// line ~243), which eats whitespace after commas INSIDE string
// literals when the literal is a direct function argument:
//     printf("Hello, World!\n")  →  prints "Hello,World!"
// Passing the format via a variable is unaffected, and JSCPP
// concatenates adjacent string literals correctly (verified):
//     printf("Hello," " World!\n")  →  prints "Hello, World!"
//
// So this transform rewrites `,` + spaces/tabs inside string
// literals only, into adjacent-literal form:
//     "a, b"   →   "a," " b"
//     "a,  b"  →   "a," "  b"
// Comments, char literals and comma-without-space are untouched.
// ============================================================

export function sanitizeCSource(code: string): string {
  if (!code || code.indexOf(',') === -1) return code;
  let out = '';
  let i = 0;
  const n = code.length;
  let state: 'code' | 'line' | 'block' | 'str' | 'chr' = 'code';

  while (i < n) {
    const c = code[i];
    const next = i + 1 < n ? code[i + 1] : '';

    if (state === 'code') {
      if (c === '/' && next === '/') { state = 'line'; out += c; i += 1; continue; }
      if (c === '/' && next === '*') { state = 'block'; out += c; i += 1; continue; }
      if (c === '"') { state = 'str'; out += c; i += 1; continue; }
      if (c === "'") { state = 'chr'; out += c; i += 1; continue; }
      out += c; i += 1; continue;
    }

    if (state === 'line') {
      if (c === '\n') state = 'code';
      out += c; i += 1; continue;
    }

    if (state === 'block') {
      if (c === '*' && next === '/') { out += c + next; i += 2; state = 'code'; continue; }
      out += c; i += 1; continue;
    }

    if (state === 'chr') {
      if (c === '\\') { out += c + next; i += 2; continue; }
      if (c === "'") state = 'code';
      out += c; i += 1; continue;
    }

    // state === 'str'
    if (c === '\\') { out += c + next; i += 2; continue; }
    if (c === '"') { state = 'code'; out += c; i += 1; continue; }
    if (c === ',') {
      // peek: comma followed by spaces/tabs → close + reopen the literal
      let j = i + 1;
      let hasWs = false;
      while (j < n && (code[j] === ' ' || code[j] === '\t')) { j += 1; hasWs = true; }
      if (hasWs) {
        out += ',"'; // close literal after the comma …
        out += ' "'; // … separator space, then reopen; whitespace follows as content
        i += 1; // consume only the comma; whitespace emitted naturally
        continue;
      }
    }
    out += c; i += 1;
  }
  return out;
}

declare module 'JSCPP' {
  // Untyped library (CommonJS). We only use `run`.
  const JSCPP: {
    run: (code: string, input: string, config?: Record<string, unknown>) => number;
  };
  export default JSCPP;
}

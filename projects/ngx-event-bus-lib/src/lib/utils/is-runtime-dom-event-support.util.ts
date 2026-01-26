/**
 * Runtime-safe - Determines whether the **current runtime** supports
 * global DOM-style event dispatching (`dispatchEvent` / `addEventListener`).
 *
 * Prevents execution in SSR (Node.js), Web Workers, or other runtimes
 * without a global DOM event system.
 *
 * @returns `true` if runtime supports global DOM events, otherwise `false`.
 */
export function isRuntimeDomEventSupport(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined' &&
    typeof globalThis === 'object' &&
    'addEventListener' in globalThis &&
    'dispatchEvent' in globalThis;
}

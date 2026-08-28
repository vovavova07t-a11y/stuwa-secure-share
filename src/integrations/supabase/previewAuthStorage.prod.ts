// Production build storage adapter: plain localStorage, no editor bridge.
export function brokeredPreviewStorage() {
  if (typeof window === 'undefined') return undefined;
  return localStorage;
}

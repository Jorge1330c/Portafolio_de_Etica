const KEY = 'effects';
export type EffectsPref = 'auto' | 'on' | 'off';

export function readPref(): EffectsPref {
  try { const v = localStorage.getItem(KEY); return v === 'on' || v === 'off' ? v : 'auto'; } catch { return 'auto'; }
}
export function resolve(pref: EffectsPref): 'on' | 'off' {
  if (pref !== 'auto') return pref;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'off' : 'on';
}
export function motionAllowed(): boolean { return document.documentElement.getAttribute('data-effects') !== 'off'; }
export function finePointer(): boolean { return window.matchMedia('(pointer: fine)').matches; }
export function applyPref(pref: EffectsPref): void {
  try { if (pref === 'auto') localStorage.removeItem(KEY); else localStorage.setItem(KEY, pref); } catch {}
  document.documentElement.setAttribute('data-effects', resolve(pref));
  document.dispatchEvent(new CustomEvent('effects:change'));
}
export function initEffectsToggle(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-effects-toggle]');
  const sync = () => {
    const on = motionAllowed();
    buttons.forEach((b) => {
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.title = on ? 'Efectos activados' : 'Efectos desactivados';
    });
  };
  buttons.forEach((btn) => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => { applyPref(motionAllowed() ? 'off' : 'on'); sync(); });
  });
  sync();
}

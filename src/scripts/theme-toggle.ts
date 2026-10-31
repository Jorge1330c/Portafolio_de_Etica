import { motionAllowed } from './motion';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const TRANSITION_CLASS = 'is-theme-transitioning';
const TRANSITION_HOLD_MS = 420;

function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
}

function persist(theme: Theme): void {
  try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
}

let releaseTimer: ReturnType<typeof setTimeout> | undefined;
let busy = false;

function swapWithFallback(next: Theme): void {
  const root = document.documentElement;
  if (releaseTimer) clearTimeout(releaseTimer);
  root.classList.add(TRANSITION_CLASS);
  void root.offsetWidth;
  applyTheme(next);
  releaseTimer = setTimeout(() => {
    root.classList.remove(TRANSITION_CLASS);
    releaseTimer = undefined;
  }, TRANSITION_HOLD_MS);
}

function swap(next: Theme): void {
  const root = document.documentElement;
  const doc = document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };

  if (!motionAllowed() || !doc.startViewTransition) {
    if (motionAllowed()) swapWithFallback(next);
    else applyTheme(next);
    return;
  }

  busy = true;
  root.setAttribute('data-theme-switching', '');
  const vt = doc.startViewTransition(() => applyTheme(next));
  vt.finished.finally(() => {
    root.removeAttribute('data-theme-switching');
    busy = false;
  });
}

export function initThemeToggle(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');
  buttons.forEach((btn) => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      if (busy) return;
      const current = (document.documentElement.getAttribute('data-theme') as Theme | null) || 'dark';
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      persist(next);
      swap(next);
    });
  });
}

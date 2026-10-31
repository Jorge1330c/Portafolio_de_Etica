import { motionAllowed, finePointer } from './motion';

const reduce = () => !motionAllowed();
const fine = () => finePointer();

let progressBound = false;
export function initReadingProgress(): void {
  const bar = document.querySelector<HTMLElement>('[data-progress]');
  if (!bar || progressBound) return;
  progressBound = true;
  let ticking = false;
  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    bar.style.transform = `scaleX(${p})`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }, { passive: true });
  document.addEventListener('astro:page-load', () => window.requestAnimationFrame(update));
  update();
}

export function initCounters(): void {
  const els = document.querySelectorAll<HTMLElement>('[data-count]');
  if (els.length === 0) return;
  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.count ?? '0');
    if (reduce() || !Number.isFinite(target)) { el.textContent = String(target); return; }
    const duration = 900; const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) window.requestAnimationFrame(tick);
    };
    window.requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (en.isIntersecting) {
        const el = en.target as HTMLElement;
        if (!el.dataset.counted) { el.dataset.counted = '1'; run(el); }
        io.unobserve(el);
      }
    }
  }, { threshold: 0.4 });
  els.forEach((el) => { if (el.dataset.counted) return; el.textContent = '0'; io.observe(el); });
  window.setTimeout(() => {
    els.forEach((el) => {
      if (!el.dataset.counted) { el.dataset.counted = '1'; el.textContent = el.dataset.count ?? ''; io.unobserve(el); }
    });
  }, 2500);
}

export function initMagnetic(): void {
  if (!fine()) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    if (el.dataset.magBound) return;
    el.dataset.magBound = '1';
    const strength = 0.28;
    let rect: DOMRect | null = null;
    el.addEventListener('pointerenter', () => { rect = el.getBoundingClientRect(); });
    el.addEventListener('pointermove', (e) => {
      if (reduce()) return;
      if (!rect) rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${(dx * strength).toFixed(1)}px, ${(dy * strength).toFixed(1)}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; rect = null; });
  });
}

let lanternBound = false;
export function initLantern(): void {
  const el = document.querySelector<HTMLElement>('[data-lantern]');
  if (!el || lanternBound || !fine()) return;
  lanternBound = true;
  let x = window.innerWidth / 2; let y = window.innerHeight / 2;
  let tx = x; let ty = y; let raf = 0;
  const frame = () => {
    x += (tx - x) * 0.12; y += (ty - y) * 0.12;
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    if (Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3) raf = window.requestAnimationFrame(frame);
    else raf = 0;
  };
  window.addEventListener('pointermove', (e) => {
    if (reduce()) { el.classList.remove('is-on'); return; }
    tx = e.clientX; ty = e.clientY; el.classList.add('is-on');
    if (!raf) raf = window.requestAnimationFrame(frame);
  }, { passive: true });
  document.addEventListener('pointerleave', () => el.classList.remove('is-on'));
}

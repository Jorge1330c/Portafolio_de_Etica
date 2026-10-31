import { motionAllowed, finePointer } from './motion';
const MAX_TILT = 5;

export function initTilt(): void {
  if (!finePointer()) return;
  const cards = document.querySelectorAll<HTMLElement>('[data-tilt]');
  cards.forEach((card) => {
    if (card.dataset.tiltBound) return;
    card.dataset.tiltBound = '1';
    let raf = 0;
    let rect: DOMRect | null = null;

    const update = (x: number, y: number) => {
      if (!rect) rect = card.getBoundingClientRect();
      const px = (x - rect.left) / rect.width;
      const py = (y - rect.top) / rect.height;
      const rx = (0.5 - py) * MAX_TILT * 2;
      const ry = (px - 0.5) * MAX_TILT * 2;
      card.style.setProperty('--tilt-x', `${rx.toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${ry.toFixed(2)}deg`);
      card.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    };

    card.addEventListener('pointerenter', () => {
      if (!motionAllowed()) return;
      rect = card.getBoundingClientRect();
      card.classList.add('is-tilting');
    });

    card.addEventListener('pointermove', (e) => {
      if (raf || !card.classList.contains('is-tilting')) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        update(e.clientX, e.clientY);
      });
    });

    card.addEventListener('pointerleave', () => {
      card.classList.remove('is-tilting');
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      rect = null;
    });
  });
}

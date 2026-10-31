import { motionAllowed, finePointer } from './motion';

interface Star { x: number; y: number; depth: number; size: number; base: number; phase: number; speed: number; vx: number; vy: number; warm: boolean; }
interface Meteor { x: number; y: number; vx: number; vy: number; life: number; max: number; }

const LINK_RADIUS = 140; const PARALLAX_MOUSE = 20; const PARALLAX_SCROLL = 0.05; const FRAME_MS = 33; const MAX_STARS = 170;
type Theme = 'dark' | 'light';

export function initStarfield(): void {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-starfield]');
  if (!canvas || canvas.dataset.ready) return;
  canvas.dataset.ready = '1';
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const reduce = () => !motionAllowed();
  const fine = finePointer();
  const theme = (): Theme => document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

  let stars: Star[] = []; let meteors: Meteor[] = []; let width = 0; let height = 0; let dpr = 1; let raf = 0; let last = 0; let nextMeteor = 6000 + Math.random() * 6000;
  let targetPx = 0; let targetPy = 0; let px = 0; let py = 0; let mouseX = -9999; let mouseY = -9999; let scrollY = window.scrollY;

  const SIZES = [1.1, 1.8, 2.8];
  const sprites: Record<Theme, HTMLCanvasElement[][]> = { dark: [], light: [] };

  function makeSprite(r: number, rgb: string, glow: boolean): HTMLCanvasElement {
    const pad = glow ? r * 6 : r * 2; const c = document.createElement('canvas'); const size = Math.ceil(pad * 2);
    c.width = size; c.height = size; const g = c.getContext('2d')!; const cx = size / 2;
    if (glow) { const grad = g.createRadialGradient(cx, cx, 0, cx, cx, pad); grad.addColorStop(0, `rgba(${rgb}, 0.45)`); grad.addColorStop(0.35, `rgba(${rgb}, 0.12)`); grad.addColorStop(1, `rgba(${rgb}, 0)`); g.fillStyle = grad; g.beginPath(); g.arc(cx, cx, pad, 0, Math.PI * 2); g.fill(); }
    g.fillStyle = `rgba(${rgb}, 1)`; g.beginPath(); g.arc(cx, cx, r, 0, Math.PI * 2); g.fill(); return c;
  }

  function buildSprites(): void {
    const tones: Record<Theme, [string, string]> = { dark: ['238, 236, 246', '240, 213, 154'], light: ['47, 63, 122', '140, 106, 31'] };
    (['dark', 'light'] as Theme[]).forEach((t) => { const bump = t === 'light' ? 0.35 : 0; sprites[t] = SIZES.map((r, i) => [makeSprite(r + bump, tones[t][0], i === 2), makeSprite(r + bump, tones[t][1], i === 2)]); });
  }

  function resize(): void {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5); width = window.innerWidth; height = window.innerHeight;
    canvas.width = Math.floor(width * dpr); canvas.height = Math.floor(height * dpr); canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0); seed(); draw(performance.now());
  }

  function seed(): void {
    const count = Math.min(MAX_STARS, Math.round((width * height) / 11000));
    stars = Array.from({ length: count }, () => { const depth = Math.pow(Math.random(), 1.6); const ang = Math.random() * Math.PI * 2; const sp = 0.012 + depth * 0.045; return { x: Math.random() * width, y: Math.random() * height, depth, size: depth > 0.8 ? 2 : depth > 0.4 ? 1 : 0, base: 0.22 + depth * 0.6, phase: Math.random() * Math.PI * 2, speed: 0.4 + Math.random() * 1.1, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, warm: Math.random() < 0.28 }; });
  }

  function spawnMeteor(): void {
    const fromLeft = Math.random() < 0.5; const speed = 9 + Math.random() * 5;
    meteors.push({ x: fromLeft ? Math.random() * width * 0.4 : width * 0.6 + Math.random() * width * 0.4, y: Math.random() * height * 0.35, vx: fromLeft ? speed : -speed, vy: speed * 0.45, life: 0, max: 38 + Math.random() * 20 });
  }

  function draw(now: number): void {
    ctx!.clearRect(0, 0, width, height); const t = theme(); const set = sprites[t]; if (!set || set.length === 0) return;
    const alphaScale = t === 'light' ? 0.85 : 1; const lineRgb = t === 'light' ? '47, 63, 122' : '230, 192, 121'; const dotRgb = t === 'light' ? '47, 63, 122' : '246, 241, 230';
    const time = now / 1000; const animated = !reduce(); const near: [number, number, number][] = []; const hasMouse = fine && animated && mouseX > -1000;

    for (const s of stars) {
      const tw = animated ? 0.65 + 0.35 * Math.sin(time * s.speed + s.phase) : 1; const k = 0.25 + s.depth * 0.75;
      let x = s.x + px * PARALLAX_MOUSE * k; let y = s.y + py * PARALLAX_MOUSE * k - scrollY * PARALLAX_SCROLL * k;
      x = ((x % width) + width) % width; y = ((y % height) + height) % height;
      const sp = set[s.size][s.warm ? 1 : 0]; ctx!.globalAlpha = s.base * tw * alphaScale; ctx!.drawImage(sp, x - sp.width / 2, y - sp.height / 2);
      if (hasMouse) { const dx = x - mouseX; const dy = y - mouseY; const d2 = dx * dx + dy * dy; if (d2 < LINK_RADIUS * LINK_RADIUS) near.push([x, y, 1 - Math.sqrt(d2) / LINK_RADIUS]); }
    }
    ctx!.globalAlpha = 1;
    if (near.length > 1) {
      ctx!.lineWidth = 0.7; const n = Math.min(near.length, 14);
      for (let i = 0; i < n; i++) {
        const [ax, ay, aa] = near[i]; ctx!.strokeStyle = `rgba(${lineRgb}, ${(0.26 * aa + 0.04).toFixed(3)})`; ctx!.beginPath(); ctx!.moveTo(ax, ay); ctx!.lineTo(mouseX, mouseY); ctx!.stroke();
        for (let j = i + 1; j < n; j++) { const [bx, by, ba] = near[j]; const dx = ax - bx; const dy = ay - by; if (dx * dx + dy * dy < 110 * 110) { ctx!.strokeStyle = `rgba(${lineRgb}, ${(0.4 * Math.min(aa, ba)).toFixed(3)})`; ctx!.beginPath(); ctx!.moveTo(ax, ay); ctx!.lineTo(bx, by); ctx!.stroke(); } }
      }
      ctx!.fillStyle = `rgba(${dotRgb}, 0.28)`; ctx!.beginPath(); ctx!.arc(mouseX, mouseY, 3, 0, Math.PI * 2); ctx!.fill();
    }
    if (!animated) return;
    const meteorRgb = t === 'light' ? '47, 63, 122' : '246, 241, 230';
    for (const m of meteors) { const p = m.life / m.max; const alpha = p < 0.2 ? p / 0.2 : 1 - (p - 0.2) / 0.8; const tailX = m.x - m.vx * 9; const tailY = m.y - m.vy * 9; const g = ctx!.createLinearGradient(m.x, m.y, tailX, tailY); g.addColorStop(0, `rgba(${meteorRgb}, ${(0.85 * alpha).toFixed(3)})`); g.addColorStop(1, `rgba(${meteorRgb}, 0)`); ctx!.strokeStyle = g; ctx!.lineWidth = 1.2; ctx!.beginPath(); ctx!.moveTo(m.x, m.y); ctx!.lineTo(tailX, tailY); ctx!.stroke(); m.x += m.vx; m.y += m.vy; m.life += 1; }
    if (meteors.length) meteors = meteors.filter((m) => m.life < m.max);
  }

  function step(dt: number): void {
    for (const s of stars) { s.x += s.vx * dt; s.y += s.vy * dt; if (s.x < -4) s.x = width + 4; else if (s.x > width + 4) s.x = -4; if (s.y < -4) s.y = height + 4; else if (s.y > height + 4) s.y = -4; }
    px += (targetPx - px) * 0.08; py += (targetPy - py) * 0.08;
  }

  function loop(now: number): void {
    if (!reduce() && document.visibilityState === 'visible') {
      const dt = Math.min(now - last, 80);
      if (dt >= FRAME_MS) { last = now; step(dt / 16.7); nextMeteor -= dt; if (nextMeteor <= 0) { spawnMeteor(); nextMeteor = 9000 + Math.random() * 9000; } draw(now); }
    }
    raf = window.requestAnimationFrame(loop);
  }

  buildSprites(); resize(); window.addEventListener('resize', resize, { passive: true }); window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });
  if (fine) { window.addEventListener('pointermove', (e) => { mouseX = e.clientX; mouseY = e.clientY; targetPx = (e.clientX / width) * 2 - 1; targetPy = (e.clientY / height) * 2 - 1; }, { passive: true }); document.addEventListener('pointerleave', () => { mouseX = -9999; mouseY = -9999; }); }
  const observer = new MutationObserver(() => draw(performance.now())); observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-effects'] });
  raf = window.requestAnimationFrame(loop); window.addEventListener('beforeunload', () => window.cancelAnimationFrame(raf));
}

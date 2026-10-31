const ATTR = 'data-sidebar-open';
let globalsBound = false;

const root = () => document.documentElement;

function close(): void {
  root().removeAttribute(ATTR);
  document.querySelector('[data-sidebar-trigger]')?.setAttribute('aria-expanded', 'false');
}

function open(): void {
  root().setAttribute(ATTR, '');
  document.querySelector('[data-sidebar-trigger]')?.setAttribute('aria-expanded', 'true');
}

export function initSidebarDrawer(): void {
  const trigger = document.querySelector<HTMLButtonElement>('[data-sidebar-trigger]');
  const scrim = document.querySelector<HTMLElement>('[data-scrim]');
  const sidebar = document.getElementById('sidebar');

  if (trigger && !trigger.dataset.bound) {
    trigger.dataset.bound = '1';
    trigger.addEventListener('click', () => {
      if (root().hasAttribute(ATTR)) close();
      else open();
    });
  }

  if (scrim && !scrim.dataset.bound) {
    scrim.dataset.bound = '1';
    scrim.addEventListener('click', close);
  }

  if (sidebar && !sidebar.dataset.bound) {
    sidebar.dataset.bound = '1';
    sidebar.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('a[href]')) close();
    });
  }

  if (globalsBound) return;
  globalsBound = true;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  const mq = window.matchMedia('(min-width: 1024px)');
  mq.addEventListener('change', (e) => {
    if (e.matches) close();
  });

  document.addEventListener('astro:before-swap', close);
}

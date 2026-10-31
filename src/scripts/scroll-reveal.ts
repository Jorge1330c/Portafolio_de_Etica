export function initScrollReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>('.reveal, .reveal-stagger');
  if (targets.length === 0) return;

  if (typeof IntersectionObserver === 'undefined' || document.documentElement.getAttribute('data-effects') === 'off') {
    targets.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  targets.forEach((el) => observer.observe(el));
}

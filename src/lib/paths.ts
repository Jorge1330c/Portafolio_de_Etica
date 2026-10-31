const COMBINING_DIACRITICS = /[̀-ͯ]/g;

export function slugify(value: string): string {
  return value.toLowerCase().normalize('NFD').replace(COMBINING_DIACRITICS, '').replace(/&/g, '-y-').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function withBase(base: string, path: string): string {
  const trimmed = base.endsWith('/') ? base.slice(0, -1) : base;
  if (!path || path === '/') return `${trimmed}/`;
  return `${trimmed}/${path.replace(/^\//, '')}`;
}

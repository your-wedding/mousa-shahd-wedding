const BASE = import.meta.env.BASE_URL;

export function asset(path: string): string {
  return `${BASE}${path.startsWith('/') ? path.slice(1) : path}`;
}

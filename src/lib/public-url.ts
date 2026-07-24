/** Resolve a path under `public/` against Vite's base (GitHub Pages subpath safe). */
export function publicUrl(relativePath: string): string {
  const base = import.meta.env.BASE_URL;
  const cleaned = relativePath.replace(/^\/+/, '');
  return `${base}${cleaned}`;
}

/**
 * Public origin used for absolute site URLs (sitemap, robots, metadata, JSON-LD).
 *
 * Override with NEXT_PUBLIC_SITE_URL for a different host. The default is the
 * canonical www property so a build does not emit the *.vercel.app hostname.
 */
const DEFAULT_SITE_URL = 'https://www.zejzl.net';

function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const raw = fromEnv ? fromEnv : DEFAULT_SITE_URL;
  return raw.replace(/\/+$/, '');
}

export const SITE_URL = resolveSiteUrl();

/** Absolute URL on the public site. `path` may be empty, `/`, or a pathname. */
export function siteUrl(path = ''): string {
  if (!path || path === '/') return SITE_URL;
  const pathname = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${pathname}`;
}

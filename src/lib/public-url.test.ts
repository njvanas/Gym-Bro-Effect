import { afterEach, describe, expect, it, vi } from 'vitest';

describe('publicUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('prefixes Vite BASE_URL and strips a leading slash', async () => {
    vi.stubEnv('BASE_URL', '/Gym-Bro-Effect/');
    const { publicUrl } = await import('./public-url');
    expect(publicUrl('products/foo.jpg')).toBe('/Gym-Bro-Effect/products/foo.jpg');
    expect(publicUrl('/products/foo.jpg')).toBe('/Gym-Bro-Effect/products/foo.jpg');
  });
});

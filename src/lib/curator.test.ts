import { describe, expect, it } from 'vitest';
import { styles } from './db';
import { curatorGradient, curatorGradientIds, curatorInitials } from './curator';

describe('curator avatars', () => {
  it('builds two-letter initials', () => {
    expect(curatorInitials('Dorian Yates')).toBe('DY');
    expect(curatorInitials('Chris Bumstead')).toBe('CB');
  });

  it('gives every methodology a non-fallback avatar gradient', () => {
    const mapped = new Set(curatorGradientIds());
    const fallback = 'linear-gradient(135deg, #c45c26, #7a3418)';
    for (const style of styles) {
      expect(mapped.has(style.id), `missing gradient for ${style.id}`).toBe(true);
      expect(curatorGradient(style.id), style.id).not.toBe(fallback);
    }
  });

  it('keeps avatar gradients unique across the roster', () => {
    const seen = new Map<string, string>();
    for (const style of styles) {
      const g = curatorGradient(style.id);
      const prior = seen.get(g);
      expect(prior, `duplicate gradient ${style.id} vs ${prior}`).toBeUndefined();
      seen.set(g, style.id);
    }
  });
});

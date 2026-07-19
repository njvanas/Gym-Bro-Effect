import { describe, it, expect, beforeEach } from 'vitest';
import {
  THEME_STORAGE_KEY,
  getStoredTheme,
  setStoredTheme,
} from './theme';

describe('theme', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to dark when nothing stored', () => {
    expect(getStoredTheme()).toBe('dark');
  });

  it('persists light mode', () => {
    setStoredTheme('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    expect(getStoredTheme()).toBe('light');
  });

  it('falls back to dark for invalid values', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'neon');
    expect(getStoredTheme()).toBe('dark');
  });
});

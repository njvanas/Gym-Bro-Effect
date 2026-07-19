import { useState } from 'react';
import {
  applyTheme,
  getStoredTheme,
  setStoredTheme,
  type ThemeMode,
} from '../lib/theme';

function nextTheme(mode: ThemeMode): ThemeMode {
  return mode === 'dark' ? 'light' : 'dark';
}

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>(() => getStoredTheme());

  function handleToggle() {
    const next = nextTheme(mode);
    setMode(next);
    setStoredTheme(next);
    applyTheme(next);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      {mode === 'dark' ? 'Light mode' : 'Dark mode'}
    </button>
  );
}

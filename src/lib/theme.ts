export type ThemeMode = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'gym-bro-effect-theme';

function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'dark' || value === 'light';
}

export function getStoredTheme(): ThemeMode {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return isThemeMode(stored) ? stored : 'dark';
}

export function setStoredTheme(mode: ThemeMode): void {
  localStorage.setItem(THEME_STORAGE_KEY, mode);
}

export function applyTheme(mode: ThemeMode): void {
  document.documentElement.dataset.theme = mode;
}

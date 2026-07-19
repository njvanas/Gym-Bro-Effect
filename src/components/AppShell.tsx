import { useState, type ReactNode } from 'react';

import { pillarLabel, type Pillar } from '../lib/nav';
import { IconBackdrop } from './IconBackdrop';
import { ThemeToggle } from './ThemeToggle';

type AppShellProps = {
  pillar: Pillar;
  onNavigate: (pillar: Pillar) => void;
  children: ReactNode;
};

const pillars: Pillar[] = ['home', 'training', 'fuel', 'tools', 'who'];

export function AppShell({ pillar, onNavigate, children }: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  function navigate(next: Pillar) {
    onNavigate(next);
    setMenuOpen(false);
  }

  return (
    <div className="app-shell">
      <IconBackdrop />
      <header className="app-header">
        <button className="brand" type="button" onClick={() => navigate('home')}>
          Gym Bro Effect
        </button>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu
        </button>
        <nav
          id="primary-nav"
          className={menuOpen ? 'pillar-nav open' : 'pillar-nav'}
          aria-label="Primary navigation"
        >
          {pillars.map((item) => (
            <button
              className={item === pillar ? 'nav-link active' : 'nav-link'}
              type="button"
              aria-current={item === pillar ? 'page' : undefined}
              onClick={() => navigate(item)}
              key={item}
            >
              {pillarLabel(item)}
            </button>
          ))}
        </nav>
        <ThemeToggle />
      </header>
      <main className="app-main">{children}</main>
      <nav className="bottom-nav" aria-label="Mobile navigation">
        {pillars.map((item) => (
          <button
            className={item === pillar ? 'nav-link active' : 'nav-link'}
            type="button"
            aria-current={item === pillar ? 'page' : undefined}
            onClick={() => navigate(item)}
            key={item}
          >
            {pillarLabel(item)}
          </button>
        ))}
      </nav>
    </div>
  );
}

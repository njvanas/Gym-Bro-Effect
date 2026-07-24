import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { pillarLabel, type Pillar } from '../lib/nav';
import { paths, pillarFromPathname } from '../lib/routes';
import { BackgroundBros } from './BackgroundBros';
import { IconBackdrop } from './IconBackdrop';
import { ThemeToggle } from './ThemeToggle';

const pillars: Pillar[] = ['home', 'training', 'fuel', 'tools', 'who'];

function pillarPath(pillar: Pillar): string {
  switch (pillar) {
    case 'home':
      return paths.home;
    case 'training':
      return paths.training;
    case 'fuel':
      return paths.fuel;
    case 'tools':
      return paths.tools;
    case 'who':
      return paths.who;
    default: {
      const _exhaustive: never = pillar;
      return _exhaustive;
    }
  }
}

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const pillar = pillarFromPathname(pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app-shell">
      <IconBackdrop />
      <BackgroundBros />
      <header className="app-header">
        <Link className="brand" to={paths.home} onClick={() => setMenuOpen(false)}>
          Gym Bro Effect
        </Link>
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
            <Link
              className={item === pillar ? 'nav-link active' : 'nav-link'}
              to={pillarPath(item)}
              aria-current={item === pillar ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
              key={item}
            >
              {pillarLabel(item)}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <nav className="bottom-nav" aria-label="Mobile navigation">
        {pillars.map((item) => (
          <Link
            className={item === pillar ? 'nav-link active' : 'nav-link'}
            to={pillarPath(item)}
            aria-current={item === pillar ? 'page' : undefined}
            key={item}
          >
            {pillarLabel(item)}
          </Link>
        ))}
      </nav>
    </div>
  );
}

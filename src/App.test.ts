import { createElement } from 'react';
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';

import { App } from './App';

const roots: Root[] = [];

function renderAt(pathname: string): HTMLElement {
  const container = document.createElement('div');
  document.body.append(container);

  flushSync(() => {
    const root = createRoot(container);
    roots.push(root);
    root.render(
      createElement(
        MemoryRouter,
        {
          initialEntries: [pathname],
          future: { v7_relativeSplatPath: true, v7_startTransition: true },
        },
        createElement(App),
      ),
    );
  });

  return container;
}

afterEach(() => {
  flushSync(() => {
    roots.splice(0).forEach((root) => root.unmount());
  });
  document.body.replaceChildren();
});

describe('App pillar routes', () => {
  it('renders home journey cards as pillar links', () => {
    const container = renderAt('/');
    const destinations = Array.from(
      container.querySelectorAll<HTMLAnchorElement>('a.journey-card'),
      (link) => link.getAttribute('href'),
    );

    expect(destinations).toEqual(['/training', '/fuel', '/tools', '/who']);
  });

  it('renders the requested pillar and marks its navigation link active', () => {
    const container = renderAt('/tools');
    const activeLink = container.querySelector<HTMLAnchorElement>(
      'a.nav-link.active[aria-current="page"]',
    );

    expect(container.textContent).toContain('Bro Tools');
    expect(activeLink?.getAttribute('href')).toBe('/tools');
  });

  it('renders the catch-all page for unknown URLs', () => {
    const container = renderAt('/missing');
    const homeLink = container.querySelector<HTMLAnchorElement>('a.back');

    expect(container.textContent).toContain('Page not found');
    expect(homeLink?.getAttribute('href')).toBe('/');
  });
});

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

describe('Bro Training routes', () => {
  it('renders hub cards as links to legends, personal, and exercises', () => {
    const container = renderAt('/training');
    const destinations = Array.from(
      container.querySelectorAll<HTMLAnchorElement>('a.training-hub-card'),
      (link) => link.getAttribute('href'),
    );

    expect(destinations).toEqual([
      '/training/legends',
      '/training/personal',
      '/training/exercises',
    ]);
  });

  it('renders the personal collection at its direct URL', () => {
    const container = renderAt('/training/personal');

    expect(container.textContent).toContain('My Personal collection');
    expect(container.querySelector<HTMLAnchorElement>('a.back')?.getAttribute('href')).toBe(
      '/training',
    );
  });

  it('renders exercises at its direct URL with a parent back link', () => {
    const container = renderAt('/training/exercises');

    expect(container.textContent).toContain('Bro Exercises');
    expect(container.querySelector('.sub-nav')).toBeNull();
    expect(container.querySelector<HTMLAnchorElement>('a.back')?.getAttribute('href')).toBe(
      '/training',
    );
  });

  it('renders the legends browse route with links to legend detail pages', () => {
    const container = renderAt('/training/legends');

    expect(container.textContent).toContain('bodybuilders');
    expect(container.textContent).not.toContain('Page not found');

    const cardLink = container.querySelector<HTMLAnchorElement>('a.legend-card');
    expect(cardLink?.getAttribute('href')).toMatch(/^\/training\/legends\//);
  });

  it('renders a legend detail page with a link to a workout', () => {
    const container = renderAt('/training/legends/arnold-golden-era');

    expect(container.textContent).toContain('Arnold Schwarzenegger');
    expect(container.textContent).not.toContain('Page not found');

    const workoutLink = container.querySelector<HTMLAnchorElement>(
      'a.legend-workout-card',
    );
    expect(workoutLink?.getAttribute('href')).toMatch(
      /^\/training\/legends\/arnold-golden-era\/workout\//,
    );
  });

  it('shows a not-found page for an unknown legend', () => {
    const container = renderAt('/training/legends/nobody');

    expect(container.textContent).toContain('Legend not found');
    expect(
      container.querySelector<HTMLAnchorElement>('a.back')?.getAttribute('href'),
    ).toBe('/training/legends');
  });

  it('renders a workout detail page at its direct URL', () => {
    const container = renderAt(
      '/training/legends/arnold-golden-era/workout/arnold-golden-six',
    );

    expect(container.textContent).toContain('Golden Six');
    expect(
      container.querySelector<HTMLAnchorElement>('a.back')?.getAttribute('href'),
    ).toBe('/training/legends/arnold-golden-era');
  });

  it('shows a not-found page when the workout does not belong to the style', () => {
    const container = renderAt(
      '/training/legends/arnold-golden-era/workout/does-not-exist',
    );

    expect(container.textContent).toContain('Workout not found');
    expect(
      container.querySelector<HTMLAnchorElement>('a.back')?.getAttribute('href'),
    ).toBe('/training/legends/arnold-golden-era');
  });
});

describe('Bro Fuel routes', () => {
  it('renders the cutting phase at its direct URL', () => {
    const container = renderAt('/fuel/phases/cutting');

    expect(container.textContent).toContain('Cutting');
    expect(container.textContent).toContain('Lose fat while protecting hard-earned muscle.');
    expect(container.textContent).not.toContain('Page not found');
    expect(container.querySelector<HTMLAnchorElement>('a.back')?.getAttribute('href')).toBe(
      '/fuel',
    );
  });

  it('renders the foods catalog at its direct URL', () => {
    const container = renderAt('/fuel/foods');

    expect(container.textContent).toContain('Bro Foods');
    expect(container.textContent).not.toContain('Page not found');
    expect(container.querySelector<HTMLAnchorElement>('a.back')?.getAttribute('href')).toBe(
      '/fuel',
    );
  });

  it('shows a not-found page for an unknown phase id', () => {
    const container = renderAt('/fuel/phases/not-a-phase');

    expect(container.textContent).toContain('Phase not found');
    expect(container.querySelector<HTMLAnchorElement>('a.back')?.getAttribute('href')).toBe(
      '/fuel',
    );
  });
});

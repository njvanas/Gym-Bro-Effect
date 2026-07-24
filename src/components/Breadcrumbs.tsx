import { Link } from 'react-router-dom';

import type { Crumb } from '../lib/crumbs';

type BreadcrumbsProps = { items: Crumb[] };

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li className="breadcrumbs-item" key={`${item.label}-${index}`}>
              {index > 0 ? (
                <span className="breadcrumbs-sep" aria-hidden="true">
                  ›
                </span>
              ) : null}
              {item.to && !isLast ? (
                <Link className="breadcrumbs-link" to={item.to}>
                  {item.label}
                </Link>
              ) : (
                <span
                  className="breadcrumbs-current"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

import { Link } from 'react-router-dom';

import { Breadcrumbs } from './Breadcrumbs';

type NotFoundViewProps = {
  title?: string;
  parentLabel: string;
  parentTo: string;
  crumbs?: { label: string; to?: string }[];
};

export function NotFoundView({
  title = 'Not found',
  parentLabel,
  parentTo,
  crumbs,
}: NotFoundViewProps) {
  return (
    <section className="stack">
      {crumbs && crumbs.length > 0 ? <Breadcrumbs items={crumbs} /> : null}
      <Link className="back" to={parentTo}>
        ← {parentLabel}
      </Link>
      <header className="section-masthead">
        <p className="section-kicker">Missing page</p>
        <h2 className="section-display-title">{title}</h2>
        <p className="section-lede">
          That link does not match anything in the catalog. Head back and try another path.
        </p>
      </header>
    </section>
  );
}

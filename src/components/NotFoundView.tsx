import { parentCrumb, type Crumb } from '../lib/crumbs';
import { BackLink } from './BackLink';
import { Breadcrumbs } from './Breadcrumbs';

type NotFoundViewProps = {
  title?: string;
  parentLabel: string;
  parentTo: string;
  crumbs?: Crumb[];
};

export function NotFoundView({
  title = 'Not found',
  parentLabel,
  parentTo,
  crumbs,
}: NotFoundViewProps) {
  const fromCrumbs = crumbs ? parentCrumb(crumbs) : null;
  const parent = fromCrumbs?.to ? fromCrumbs : { label: parentLabel, to: parentTo };

  return (
    <section className="stack">
      {crumbs && crumbs.length > 0 ? <Breadcrumbs items={crumbs} /> : null}
      <BackLink parent={parent} />
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

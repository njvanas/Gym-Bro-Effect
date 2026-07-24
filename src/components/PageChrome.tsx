import { parentCrumb, type Crumb } from '../lib/crumbs';
import { BackLink } from './BackLink';
import { Breadcrumbs } from './Breadcrumbs';

type PageChromeProps = {
  crumbs: Crumb[];
  /** When false, only breadcrumbs (e.g. pillar hubs). Default true. */
  showBack?: boolean;
};

export function PageChrome({ crumbs, showBack = true }: PageChromeProps) {
  return (
    <div className="page-chrome">
      {showBack ? <BackLink parent={parentCrumb(crumbs)} /> : null}
      <Breadcrumbs items={crumbs} />
    </div>
  );
}

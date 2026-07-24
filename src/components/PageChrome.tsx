import { parentCrumb, type Crumb } from '../lib/crumbs';
import { BackLink } from './BackLink';
import { Breadcrumbs } from './Breadcrumbs';

type PageChromeProps = {
  crumbs: Crumb[];
  /** When false, hide hierarchy back (rare). Default true — hubs back to Home. */
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

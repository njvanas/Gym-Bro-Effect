import { Link } from 'react-router-dom';

import type { Crumb } from '../lib/crumbs';

type BackLinkProps = {
  parent: Crumb | null;
};

export function BackLink({ parent }: BackLinkProps) {
  if (!parent?.to) return null;

  return (
    <Link className="back" to={parent.to}>
      ← {parent.label}
    </Link>
  );
}

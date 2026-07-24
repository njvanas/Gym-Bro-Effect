import { Link } from 'react-router-dom';

import { pillarLabel, type Pillar } from '../lib/nav';
import { paths } from '../lib/routes';

type ExplorePillar = Exclude<Pillar, 'home' | 'who'>;

const EXPLORE_ORDER: ExplorePillar[] = ['training', 'fuel', 'tools'];

function pillarPath(pillar: ExplorePillar): string {
  switch (pillar) {
    case 'training':
      return paths.training;
    case 'fuel':
      return paths.fuel;
    case 'tools':
      return paths.tools;
    default: {
      const _exhaustive: never = pillar;
      return _exhaustive;
    }
  }
}

type PillarExploreProps = {
  current: ExplorePillar;
};

export function PillarExplore({ current }: PillarExploreProps) {
  const siblings = EXPLORE_ORDER.filter((pillar) => pillar !== current);

  return (
    <p className="pillar-explore">
      <span className="pillar-explore-label">Also explore:</span>{' '}
      {siblings.map((pillar, index) => (
        <span key={pillar}>
          {index > 0 ? <span className="pillar-explore-sep"> · </span> : null}
          <Link className="pillar-explore-link" to={pillarPath(pillar)}>
            {pillarLabel(pillar)}
          </Link>
        </span>
      ))}
    </p>
  );
}

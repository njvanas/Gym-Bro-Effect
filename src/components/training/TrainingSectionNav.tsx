import { NavLink } from 'react-router-dom';

import { paths } from '../../lib/routes';

const sections = [
  { label: 'Overview', to: paths.training },
  { label: 'Bro Exercises', to: paths.trainingExercises },
] as const;

export function TrainingSectionNav() {
  return (
    <nav className="sub-nav" aria-label="Bro Training sections">
      {sections.map((section) => (
        <NavLink
          key={section.to}
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          end
          to={section.to}
        >
          {section.label}
        </NavLink>
      ))}
    </nav>
  );
}

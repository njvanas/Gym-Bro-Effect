import type { PhaseId } from '../schema';

export function phaseLabel(id: PhaseId): string {
  switch (id) {
    case 'maintaining':
      return 'Maintaining';
    case 'cutting':
      return 'Cutting';
    case 'bulking':
      return 'Bulking';
    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
}

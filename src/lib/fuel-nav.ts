import type { PhaseId, ProductCategory } from '../schema';

export function phaseLabel(id: PhaseId): string {
  switch (id) {
    case 'maintaining':
      return 'Maintaining';
    case 'cutting':
      return 'Cutting';
    case 'bulking':
      return 'Bulking';
    case 'recomposition':
      return 'Recomposition';
    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
}

export function productCategoryLabel(category: ProductCategory): string {
  switch (category) {
    case 'protein':
      return 'Protein';
    case 'carbs':
      return 'Carbs';
    case 'ready-meals':
      return 'Ready meals';
    case 'dairy-snacks':
      return 'Dairy & snacks';
    case 'drinks':
      return 'Drinks';
    case 'supplements':
      return 'Supplements';
    case 'pantry':
      return 'Pantry';
    default: {
      const _exhaustive: never = category;
      return _exhaustive;
    }
  }
}

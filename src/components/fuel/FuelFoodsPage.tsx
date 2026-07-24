import { fuelFoodsCrumbs, parentCrumb } from '../../lib/crumbs';
import { BackLink } from '../BackLink';
import { Breadcrumbs } from '../Breadcrumbs';
import { FoodsCatalog } from './FoodsCatalog';

export function FuelFoodsPage() {
  const crumbs = fuelFoodsCrumbs();

  return (
    <section className="stack fuel-section">
      <Breadcrumbs items={crumbs} />
      <BackLink parent={parentCrumb(crumbs)} />
      <FoodsCatalog />
    </section>
  );
}

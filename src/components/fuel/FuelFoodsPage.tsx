import { fuelFoodsCrumbs } from '../../lib/crumbs';
import { PageChrome } from '../PageChrome';
import { FoodsCatalog } from './FoodsCatalog';

export function FuelFoodsPage() {
  return (
    <section className="stack fuel-section">
      <PageChrome crumbs={fuelFoodsCrumbs()} />
      <FoodsCatalog />
    </section>
  );
}

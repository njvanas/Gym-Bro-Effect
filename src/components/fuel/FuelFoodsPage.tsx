import { Link } from 'react-router-dom';

import { fuelFoodsCrumbs } from '../../lib/crumbs';
import { paths } from '../../lib/routes';
import { Breadcrumbs } from '../Breadcrumbs';
import { FoodsCatalog } from './FoodsCatalog';

export function FuelFoodsPage() {
  return (
    <section className="stack fuel-section">
      <Breadcrumbs items={fuelFoodsCrumbs()} />
      <Link className="back" to={paths.fuel}>
        ← Bro Fuel
      </Link>
      <FoodsCatalog />
    </section>
  );
}

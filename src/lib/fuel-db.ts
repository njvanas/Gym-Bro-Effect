import phasesData from '../data/phases.json';
import productsData from '../data/products.json';
import {
  phasesFileSchema,
  productsFileSchema,
  type Phase,
  type PhaseId,
  type Product,
} from '../schema';

export const phases: Phase[] = phasesFileSchema.parse(phasesData);
export const products: Product[] = productsFileSchema.parse(productsData);

const phasesById = new Map(phases.map((phase) => [phase.id, phase]));
const productsById = new Map(products.map((product) => [product.id, product]));

export function getPhase(id: PhaseId): Phase | undefined {
  return phasesById.get(id);
}

export function getProduct(id: string): Product | undefined {
  return productsById.get(id);
}

export function getFeaturedProducts(id: PhaseId): Product[] {
  const phase = phasesById.get(id);
  if (!phase) return [];
  return phase.featuredProductIds
    .map((productId) => productsById.get(productId))
    .filter((product): product is Product => product !== undefined);
}

export function validateFuelIntegrity(): string[] {
  const problems: string[] = [];
  if (phases.length !== 4) {
    problems.push(`Expected exactly 4 phases, found ${phases.length}`);
  }
  const ids = new Set(phases.map((p) => p.id));
  for (const required of [
    'maintaining',
    'cutting',
    'bulking',
    'recomposition',
  ] as const) {
    if (!ids.has(required)) problems.push(`Missing phase: ${required}`);
  }

  const productIds = new Set<string>();
  for (const product of products) {
    if (productIds.has(product.id)) {
      problems.push(`Duplicate product id: ${product.id}`);
    }
    productIds.add(product.id);
  }

  for (const phase of phases) {
    for (const productId of phase.featuredProductIds) {
      if (!productsById.has(productId)) {
        problems.push(
          `Phase "${phase.id}" features unknown product "${productId}"`,
        );
      }
    }
  }

  return problems;
}

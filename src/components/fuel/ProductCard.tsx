import { ExternalLink } from '../ExternalLink';
import { productCategoryLabel } from '../../lib/fuel-nav';
import type { Product } from '../../schema';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      {product.imageSrc ? (
        <img
          className="product-card-image"
          src={product.imageSrc}
          alt=""
          loading="lazy"
        />
      ) : (
        <div className="product-card-image product-card-image--placeholder" aria-hidden />
      )}
      <div className="product-card-body">
        <p className="product-card-category">{productCategoryLabel(product.category)}</p>
        <h4 className="product-card-title">{product.name}</h4>
        {product.brand ? <p className="muted">{product.brand}</p> : null}
        <p className="product-card-serving">{product.servingLabel}</p>
        <div className="recipe-macro-row" aria-label="Macros">
          <span className="recipe-macro">
            <em>{product.calories}</em> cal
          </span>
          <span className="recipe-macro">
            <em>{product.proteinG}g</em> P
          </span>
          <span className="recipe-macro">
            <em>{product.carbsG}g</em> C
          </span>
          <span className="recipe-macro">
            <em>{product.fatG}g</em> F
          </span>
        </div>
        {product.notes ? <p className="product-card-notes">{product.notes}</p> : null}
        {product.url ? (
          <ExternalLink href={product.url} className="text-link">
            View product →
          </ExternalLink>
        ) : null}
      </div>
    </article>
  );
}

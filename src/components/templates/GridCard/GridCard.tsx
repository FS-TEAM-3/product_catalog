import { ProductCard } from '@/components/organisms/ProductCard';
import { GeneralProduct } from '@/types/GeneralProduct';
import styles from './_styles.module.scss';

type Props = {
  products: GeneralProduct[];
};

export const GridCard: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.catalog__grid}>
      {products.map(product => (
        <div className={styles.catalog__productCard}>
          <ProductCard
            key={product.id}
            product={product}
            path={`/${product.category}/${product.itemId}`}
          />
        </div>
      ))}
    </div>
  );
};

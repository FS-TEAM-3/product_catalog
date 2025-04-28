import { BreadCrumbs } from '../BreadCrumbs';
import styles from './_styles.module.scss';

type Props = {
  trueNameCategory: string;
  totalProducts: number;
};

export const PageHeader: React.FC<Props> = ({
  trueNameCategory,
  totalProducts,
}) => {
  return (
    <div className={styles.catalog__header}>
      <div className={styles.catalog__breadcrumbs}>
        <BreadCrumbs />
      </div>
      <div>
        <h1 className={styles.catalog__title}>{trueNameCategory}</h1>
        {trueNameCategory === 'Tablets' ? (
          <label className={styles.catalog__label}>
            {totalProducts} models
          </label>
        ) : (
          <label className={styles.catalog__label}>{totalProducts} items</label>
        )}
      </div>
    </div>
  );
};

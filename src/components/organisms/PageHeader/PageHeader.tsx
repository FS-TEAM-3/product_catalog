import { BreadCrumbs } from '../BreadCrumbs';
import styles from './_styles.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  trueNameCategory: string;
  totalProducts: number;
};

export const PageHeader: React.FC<Props> = ({
  trueNameCategory,
  totalProducts,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.catalog__header}>
      <div className={styles.catalog__breadcrumbs}>
        <BreadCrumbs />
      </div>
      <div>
        <h1 className={styles.catalog__title}>{trueNameCategory}</h1>
        {trueNameCategory === 'Tablets' ? (
          <label className={styles.catalog__label}>
            {totalProducts} {t('catalog.models')}
          </label>
        ) : (
          <label className={styles.catalog__label}>
            {totalProducts} {t('catalog.items')}
          </label>
        )}
      </div>
    </div>
  );
};

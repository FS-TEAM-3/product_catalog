import styles from './_styles.module.scss';
import { ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const EmptyCart: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.emptyCart}>
      <ShoppingCart className={styles.emptyCart__icon} />
      <p className={styles.emptyCart__title}>{t('cart.empty')}</p>
    </div>
  );
};

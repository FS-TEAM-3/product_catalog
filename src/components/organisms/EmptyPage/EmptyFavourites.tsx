import styles from './_styles.module.scss';
import { HeartCrack } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const EmptyFavourites: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.emptyCart}>
      <HeartCrack className={styles.emptyCart__icon} />
      <p className={styles.emptyCart__title}>{t('favourites.empty')}</p>
    </div>
  );
};

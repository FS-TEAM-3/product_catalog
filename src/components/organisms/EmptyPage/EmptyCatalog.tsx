import styles from './_styles.module.scss';
import { Frown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const EmptyCatalog: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.emptyCart}>
      <Frown className={styles.emptyCart__icon} />
      <p className={styles.emptyCart__title}>{t('catalog.empty')}</p>
    </div>
  );
};

import styles from './_styles.module.scss';
import { HeartCrack } from 'lucide-react';

export const EmptyFavourites: React.FC = () => {
  return (
    <div className={styles.emptyCart}>
      <HeartCrack className={styles.emptyCart__icon} />
      <p className={styles.emptyCart__title}> You haven't liked anything yet</p>
    </div>
  );
};

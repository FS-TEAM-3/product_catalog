import styles from './_styles.module.scss';
import { ShoppingCart } from 'lucide-react';

export const EmptyCart: React.FC = () => {
  return (
    <div className={styles.emptyCart}>
      <ShoppingCart className={styles.emptyCart__icon} />
      <p className={styles.emptyCart__title}> Your cart is empty</p>
    </div>
  );
};

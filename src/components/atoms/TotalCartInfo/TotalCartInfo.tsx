import styles from './_styles.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  count: number | 0;
  totalPrice: number | 0;
  discount?: number;
};
export const TotalCartInfo: React.FC<Props> = ({
  count,
  totalPrice,
  discount,
}) => {
  const { t } = useTranslation();
  return (
    <>
      {discount && (
        <p className={styles.discount}>
          {t('cart.save')} {'\u0024'} {discount}
        </p>
      )}
      <p className={styles.totalPrice}>
        {'\u0024'} {totalPrice}
      </p>
      <p className={styles.totalAmount}>
        {t('cart.total')} {count} {count > 1 ? t('cart.items') : t('cart.item')}
      </p>
    </>
  );
};

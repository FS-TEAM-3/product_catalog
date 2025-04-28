import styles from './_styles.module.scss';

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
  return (
    <>
      {discount && (
        <p className={styles.discount}>
          You save {'\u0024'} {discount}
        </p>
      )}
      <p className={styles.totalPrice}>
        {'\u0024'} {totalPrice}
      </p>
      <p className={styles.totalAmount}>
        Total for {count} {count > 1 ? 'items' : 'item'}
      </p>
    </>
  );
};

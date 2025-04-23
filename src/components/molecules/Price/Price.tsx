import React from 'react';
import styles from './_styles.module.scss';

type Props = {
  currentPrice: number;
  fullPrice?: number;
  size?: 'default' | 'big';
};

export const Price: React.FC<Props> = ({
  currentPrice,
  fullPrice,
  size = 'default',
}) => {
  const priceClass =
    size === 'big' ? `${styles.price} ${styles.big}` : styles.price;

  const fullPriceClass =
    size === 'big' ? `${styles.fullPrice} ${styles.big}` : styles.fullPrice;

  return (
    <div className={styles.priceContainer}>
      <span className={priceClass}>${currentPrice}</span>
      {fullPrice && <span className={fullPriceClass}>${fullPrice}</span>}
    </div>
  );
};

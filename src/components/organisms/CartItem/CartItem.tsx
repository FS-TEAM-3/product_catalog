import styles from './_styles.module.scss';

import { SquareButton } from '@/components/atoms/SquareButton';
import { Minus, Plus, X } from 'lucide-react';

import { Price } from '@/components/molecules/Price';
import { GeneralProduct } from '@/types/GeneralProduct';

type Props = {
  product: GeneralProduct;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.cart__item} key={product.id}>
      <div className={styles.cart__itemHolder}>
        <button
          className={styles.cart__delete}
          onClick={event => {
            event.preventDefault();
            console.log('delete item');
          }}
        >
          <X className={styles.cart__icon} />
        </button>
        <a className={styles.cart__link} href={`/${product.itemId}`}>
          <img
            className={styles.cart__img}
            src={product.image}
            alt={product.name}
          />
        </a>
        <a href={`/${product.itemId}`} className={styles.cart__titleLink}>
          <h3 className={styles.cart__title}>{product.name}</h3>
        </a>
      </div>
      <div className={styles.cart__itemHolder}>
        <div className={styles.cart__countHolder}>
          <SquareButton disabled={true}>
            <Minus />
          </SquareButton>
          <span className={styles.cart__count}>{1}</span>
          <SquareButton>
            <Plus />
          </SquareButton>
        </div>
        <div className={styles.cart__price}>
          <Price currentPrice={product.price} fullPrice={product.fullPrice} />
        </div>
      </div>
    </div>
  );
};

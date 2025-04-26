import styles from './_styles.module.scss';

import { SquareButton } from '@/components/atoms/SquareButton';
import { Minus, Plus, X } from 'lucide-react';

import { Price } from '@/components/molecules/Price';
import { GeneralProduct } from '@/types/GeneralProduct';
import { useStore } from '@/store/store';

type Props = {
  product: GeneralProduct & { count: number };
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const removeFromCart = useStore(state => state.removeFromCart);
  const cart = useStore(state => state.cart);
  const incCart = useStore(state => state.incCart);
  const decCart = useStore(state => state.decCart);

  const quantity = cart.find(item => item.id === product.name)?.count || 1;

  return (
    <div className={styles.cart__item} key={product.id}>
      <div className={styles.cart__itemHolder}>
        <button
          className={styles.cart__delete}
          onClick={event => {
            event.preventDefault();
            removeFromCart(product.name);
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
          <SquareButton
            onClick={() => decCart(product.name)}
            disabled={quantity === 1}
          >
            <Minus />
          </SquareButton>
          <span className={styles.cart__count}>{quantity}</span>
          <SquareButton
            onClick={() => {
              console.log(cart);
              incCart(product.name);
            }}
          >
            <Plus />
          </SquareButton>
        </div>
        <div className={styles.cart__price}>
          <Price
            currentPrice={product.price * quantity}
            fullPrice={product.fullPrice * quantity}
          />
        </div>
      </div>
    </div>
  );
};

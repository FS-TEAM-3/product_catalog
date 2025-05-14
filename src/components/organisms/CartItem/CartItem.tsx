import styles from './_styles.module.scss';

import { SquareButton } from '@/components/atoms/SquareButton';
import { Minus, Plus, X } from 'lucide-react';

import { Price } from '@/components/molecules/Price';
import { GeneralProduct } from '@/types/GeneralProduct';
import { useStore } from '@/store/store';
import { useAuthStore } from '@/store/useAuthStore';
import operations from '@/utils/userOperations';
import { useState } from 'react';

type Props = {
  product: GeneralProduct & { count: number };
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const removeFromCart = useStore(state => state.removeFromCart);
  const incCart = useStore(state => state.incCart);
  const decCart = useStore(state => state.decCart);
  const isAuth = !!useAuthStore(s => s.user);
  const cart = useStore(state => (isAuth ? state.user.cart : state.guest.cart));
  const [loading, setLoading] = useState(false);

  const quantity = cart?.find(item => item.id === product.itemId)?.count || 1;

  const handleChange = async (action: string) => {
    if (loading) return;
    setLoading(true);
    try {
      switch (action) {
        case '+':
          if (isAuth) {
            await operations.addToCart({
              id: product.itemId,
              count: product.count + 1,
            });
          }
          incCart(isAuth, product.itemId);
          break;

        case '-':
          if (quantity > 1) {
            if (isAuth) {
              await operations.addToCart({
                id: product.itemId,
                count: product.count - 1,
              });
            }
            decCart(isAuth, product.itemId);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (isAuth) {
      try {
        operations.removeFromCard(product.itemId);
        removeFromCart(isAuth, product.itemId);
      } catch (err) {
        console.log(err);
      }
    } else {
      removeFromCart(isAuth, product.itemId);
    }
  };

  return (
    <div className={styles.cart__item} key={product.itemId}>
      <div className={styles.cart__itemHolder}>
        <button className={styles.cart__delete} onClick={handleRemove}>
          <X className={styles.cart__icon} />
        </button>
        <a
          className={styles.cart__link}
          href={`/${product.category}/${product.itemId}`}
        >
          <img
            className={styles.cart__img}
            src={product.image}
            alt={product.name}
          />
        </a>
        <a
          href={`/${product.category}/${product.itemId}`}
          className={styles.cart__titleLink}
        >
          <h3 className={styles.cart__title}>{product.name}</h3>
        </a>
      </div>

      <div className={styles.cart__itemHolder}>
        <div className={styles.cart__countHolder}>
          <SquareButton
            disabled={loading || quantity === 1} // Отключаем кнопку, если количество <= 1
            onClick={() => handleChange('-')}
          >
            <Minus />
          </SquareButton>
          <span className={styles.cart__count}>{quantity}</span>
          <SquareButton disabled={loading} onClick={() => handleChange('+')}>
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

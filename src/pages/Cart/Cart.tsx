import styles from './_styles.module.scss';
import { Container } from '@/components/templates/Container';
import { TotalCartInfo } from '@/components/atoms/TotalCartInfo/TotalCartInfo';
import { AlertDialogCheckout } from '@/components/organisms/AlertDialogCheckout/AlertDialogCheckout';
import { EmptyCart } from '@/components/organisms/EmptyCart';

import products from '../../../public/api/products.json';
import { CartItem } from '@/components/organisms/CartItem/CartItem';
import { useStore } from '@/store/store';
import { CartElement } from '@/types/Store';
import { GeneralProduct } from '@/types/GeneralProduct';

export const Cart = () => {
  const cart: CartElement[] = useStore(state => state.cart);
  const clearCart: () => void = useStore(state => state.clearCart);

  const cartItems = cart
    .map(cartItem => {
      const product = products.find(p => p.name === cartItem.id);
      return product ? { ...product, count: cartItem.count } : null;
    })
    .filter(
      (item): item is GeneralProduct & { count: number } => item !== null,
    );

  const isEmpty = !cartItems.length;

  const totalCount = cartItems.reduce((acc, item) => acc + item.count, 0);

  const totalFullPrice = cartItems.reduce(
    (acc, item) => acc + item.fullPrice * item.count,
    0,
  );

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.count,
    0,
  );

  const discount = totalFullPrice - totalPrice;

  return (
    <Container className={styles.absolute}>
      {isEmpty ? (
        <EmptyCart />
      ) : (
        <>
          <h1 className="h1">Cart page</h1>

          <div className="main-grid">
            <section className={styles.cart__itemsBlock}>
              {cartItems.map(product => (
                <CartItem product={product} />
              ))}
            </section>
            <div className={`${styles.cart__priceBlock}`}>
              <div className={`${styles.cart__innerPriceBlock}`}>
                <TotalCartInfo
                  count={totalCount}
                  totalPrice={totalPrice}
                  discount={discount}
                />

                <AlertDialogCheckout
                  onCancel={() => console.log('Your cart is not empty')}
                  onAction={() => clearCart()}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

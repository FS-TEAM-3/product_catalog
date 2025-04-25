import styles from './_styles.module.scss';
import { Container } from '@/components/templates/Container';
import { TotalCartInfo } from '@/components/atoms/TotalCartInfo/TotalCartInfo';
import { AlertDialogCheckout } from '@/components/organisms/AlertDialogCheckout/AlertDialogCheckout';
import { EmptyCart } from '@/components/organisms/EmptyCart';

import products from '../../../public/api/products.json';
import { CartItem } from '@/components/organisms/CartItem/CartItem';

const productsInCart = products.slice(0, 3);

export const Cart = () => {
  const isEmpty = false;

  return (
    <Container>
      {isEmpty ? (
        <EmptyCart />
      ) : (
        <>
          <h1 className="h1">Cart page</h1>

          <div className="main-grid">
            <section className={styles.cart__itemsBlock}>
              {productsInCart.map(product => (
                <CartItem product={product} />
              ))}
            </section>
            <div className={`${styles.cart__priceBlock}`}>
              <div className={`${styles.cart__innerPriceBlock}`}>
                <TotalCartInfo count={3} totalPrice={2657} discount={34} />

                <AlertDialogCheckout
                  onCancel={() => console.log('Your cart is not empty')}
                  onAction={() => console.log('Your cart is empty')}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

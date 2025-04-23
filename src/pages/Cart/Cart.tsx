import styles from './_styles.module.scss';
import { Container } from '@/components/templates/Container';
import { TotalCartInfo } from '@/components/atoms/TotalCartInfo/TotalCartInfo';
import { AlertDialogCheckout } from '@/components/organisms/AlertDialogCheckout/AlertDialogCheckout';

export const Cart = () => {
  return (
    <div className={styles.container}>
      <Container>
        <h1 className="h1">Cart page</h1>
        <div className="main-grid">
          <div className={styles.cart__itemsBlock}>
            <p>this area is for items in cart</p>
          </div>
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
      </Container>
    </div>
  );
};

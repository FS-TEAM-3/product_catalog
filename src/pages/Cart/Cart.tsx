import { useEffect, useMemo, useState } from 'react';
import styles from './_styles.module.scss';
import { Container } from '@/components/templates/Container';
import { TotalCartInfo } from '@/components/atoms/TotalCartInfo/TotalCartInfo';
import { AlertDialogCheckout } from '@/components/organisms/AlertDialogCheckout/AlertDialogCheckout';
import { EmptyCart } from '@/components/organisms/EmptyPage';
import { CartItem } from '@/components/organisms/CartItem/CartItem';
import { useStore } from '@/store/store';
import { CartElement } from '@/types/Store';
import { GeneralProduct } from '@/types/GeneralProduct';
import { GoBackButton } from '@/components/molecules/GoBackButton';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { LoadingOverlay } from '@/components/organisms/LoadingOverlay';
import { getCatalogProducts } from '../../../public/api/products';
import operations from '@/utils/userOperations';

export const Cart = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<GeneralProduct[]>([]);
  const isAuth = !!useAuthStore(s => s.user);
  const cart: CartElement[] = useStore(state =>
    isAuth ? state.user.cart : state.guest.cart,
  );
  const clearCart = useStore(state => state.clearCart);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await getCatalogProducts();
        setProducts(response);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = async () => {
    if (isAuth) {
      setLoading(true);
      try {
        await operations.clearCart();
        clearCart(isAuth);
      } catch (error) {
        console.error('clear error:', error);
        return;
      } finally {
        setLoading(false);
      }
    } else {
      clearCart(isAuth);
    }
  };
  const cartItems = useMemo(() => {
    return cart
      ?.map(cartItem => {
        const product = products?.find(p => p.itemId === cartItem.id);
        return product ? { ...product, count: cartItem.count } : null;
      })
      .filter(
        (item): item is GeneralProduct & { count: number } => item !== null,
      );
  }, [cart, products]);

  const isEmpty = !cartItems?.length;

  const totalCount = useMemo(
    () => cartItems?.reduce((acc, item) => acc + item.count, 0),
    [cartItems],
  );

  const totalFullPrice = useMemo(
    () =>
      cartItems?.reduce((acc, item) => acc + item.fullPrice * item.count, 0),
    [cartItems],
  );

  const totalPrice = useMemo(
    () => cartItems?.reduce((acc, item) => acc + item.price * item.count, 0),
    [cartItems],
  );

  const discount = totalFullPrice - totalPrice;

  return (
    <>
      <LoadingOverlay isLoading={loading} />
      {!loading && (
        <>
          <Container>
            <div className={styles.cart__BackBtn}>
              <GoBackButton />
            </div>
          </Container>
          <Container className={`${isEmpty ? styles.contentHolder : ''}`}>
            {isEmpty ? (
              <EmptyCart />
            ) : (
              <>
                <h1 className="h1">{t('cart.cart')}</h1>
                <div className="main-grid">
                  <section className={styles.cart__itemsBlock}>
                    {cartItems.map(product => (
                      <CartItem key={product.itemId} product={product} />
                    ))}
                  </section>
                  <div className={styles.cart__priceBlock}>
                    <div className={styles.cart__innerPriceBlock}>
                      <TotalCartInfo
                        count={totalCount}
                        totalPrice={totalPrice}
                        discount={discount}
                      />
                      <AlertDialogCheckout
                        onCancel={() => {
                          navigate('/order');
                          console.log('Your cart is not empty');
                        }}
                        onAction={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </Container>
        </>
      )}
    </>
  );
};

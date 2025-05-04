import { useEffect, useMemo, useState } from 'react';
import operations from '@/utils/orderOperations';
import { Container } from '@/components/templates/Container';
import { GoBackButton } from '@/components/molecules/GoBackButton';
import baseStyles from './_styles.module.scss';
import s from './_styles.module.scss';
import styles from '../Registration/_styles.module.scss';
import { useStore } from '@/store/store';
import { CartElement } from '@/types/Store';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/useAuthStore';
import { RectangleButton } from '@/components/atoms/RectangleButton';
import { useNavigate } from 'react-router-dom';
import { CustomSeparator } from '@/components/atoms/CustomSeparator';
import products from '../../../public/api/products.json';
import { Price } from '@/components/molecules/Price';

type ModalData =
  | {
      orderId: string;
      owner: {
        name: string;
        email: string;
        phone: string;
      };
      order: CartElement[];
      error?: false;
      message?: string;
    }
  | {
      error: true;
      message: string;
    };

export const OrderPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    adress: '',
  });

  const { t } = useTranslation();

  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const clearCart = useStore(state => state.clearCart);
  const isAuth = !!useAuthStore(s => s.user);
  const cart: CartElement[] = useStore(state =>
    isAuth ? state.user.cart : state.guest.cart,
  );

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await operations.createOrder({
        isAuth: false,
        order: cart,
        user: formData,
      });

      setModalData(response);
      setShowModal(true);
    } catch (error) {
      console.log(error);

      setModalData({
        error: true,
        message: 'Something went wrong!',
      });
      setShowModal(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, cartItem) => {
      const prod = products.find(p => p.itemId === cartItem.id);
      if (!prod) return sum;
      return sum + prod.price * cartItem.count;
    }, 0);
  }, [cart]);

  console.log(products[0]);
  console.log(cart);

  return (
    <>
      {showModal && modalData ? (
        <div className={s.modalOverlay}>
          <div className={s.modal}>
            {modalData.error ? (
              <p>{modalData.message}</p>
            ) : (
              <>
                <h2>{t('order.created')}</h2>
                <p>
                  <strong>{t('order.id')}: </strong> {modalData.orderId}
                </p>
                <p>
                  <strong>{t('auth.name')}: </strong> {modalData.owner.name}
                </p>
                <p>
                  <strong>{t('auth.email')}: </strong> {modalData.owner.email}
                </p>
                <p>
                  <strong>{t('order.phone')}: </strong> {modalData.owner.phone}
                </p>
                <CustomSeparator />
                <h4>{t('order.items')}:</h4>
                <ul>
                  {modalData.order.map(
                    (item: { id: string; count: number }, index: number) => (
                      <li key={index}>
                        {item.id} — {item.count} pcs
                      </li>
                    ),
                  )}
                </ul>
              </>
            )}
            <button
              className={s.closeButton}
              onClick={() => {
                setShowModal(false);
                navigate('/');
                clearCart(isAuth);
              }}
            >
              {t('order.home')}
            </button>
          </div>
        </div>
      ) : (
        <>
          <Container>
            <div className={baseStyles.BackBtn}>
              <GoBackButton />
            </div>
          </Container>
          <Container>
            <div>
              <h1 className={`${s.title}`}>{t('order.title')}</h1>
              <span className={`${s.titleMini}`}>{t('order.info')}</span>
            </div>
            <div className={s.auth}>
              <form onSubmit={onFormSubmit} className={styles.authForm}>
                <input
                  className={s.formInput}
                  type="text"
                  name="name"
                  placeholder={t('auth.name')}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  className={s.formInput}
                  type="phone"
                  name="phone"
                  placeholder={t('order.phone')}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <input
                  className={s.formInput}
                  type="email"
                  name="email"
                  placeholder={t('auth.email')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  className={s.formInput}
                  type="adress"
                  name="adress"
                  placeholder={t('order.adress')}
                  value={formData.adress}
                  onChange={handleChange}
                  required
                />
                <RectangleButton type="submit">
                  {t('order.order')}
                </RectangleButton>
              </form>
              <div className={styles.authForm}>
                {cart?.map(item => {
                  const itemName = item.id
                    .split('-')
                    .map(
                      word =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase(),
                    )
                    .join(' ');

                  return (
                    <span key={item.id}>
                      {item.count} x {itemName}
                    </span>
                  );
                })}
                <CustomSeparator />
                <Price currentPrice={totalPrice} />
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

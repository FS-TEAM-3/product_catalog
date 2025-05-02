import { useState } from 'react';
import operations from '@/utils/orderOperations';
import { Container } from '@/components/templates/Container';
import { GoBackButton } from '@/components/molecules/GoBackButton';
import baseStyles from './_styles.module.scss';
import s from './_styles.module.scss';
import styles from '../Registration/_styles.module.scss';
import { useStore } from '@/store/store';
import { CartElement } from '@/types/Store';
import { useTranslation } from 'react-i18next';
import { RectangleButton } from '@/components/atoms/RectangleButton';

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
  const [showPopup, setShowPopup] = useState(true);

  const cart: CartElement[] = useStore(state => state.cart);

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

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className={s.popupContainer}>
          <div className={s.popup}>
            <p>{t('order.info')}</p>
            <button onClick={closePopup} className={s.closeButton}>
              {t('order.close')}
            </button>
          </div>
        </div>
      )}

      <Container>
        <div className={baseStyles.BackBtn}>
          <GoBackButton />
        </div>
      </Container>
      <Container>
        <h1 className={`${s.title}`}>{t('order.title')}</h1>
        <div className={s.auth}>
          <form onSubmit={onFormSubmit} className={styles.authForm}>
            <input
              type="text"
              name="name"
              placeholder={t('auth.name')}
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder={t('order.phone')}
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="email"
              placeholder={t('auth.email')}
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="adress"
              placeholder={t('order.adress')}
              value={formData.adress}
              onChange={handleChange}
            />
            <RectangleButton type="submit">{t('order.order')}</RectangleButton>
          </form>
        </div>
      </Container>

      {showModal && modalData && (
        <div className={s.modal}>
          {modalData.error ? (
            <p>{modalData.message}</p>
          ) : (
            <>
              <h3>Order Created</h3>
              <p>
                <strong>Order ID:</strong> {modalData.orderId}
              </p>
              <p>
                <strong>Name:</strong> {modalData.owner.name}
              </p>
              <p>
                <strong>Email:</strong> {modalData.owner.email}
              </p>
              <p>
                <strong>Phone:</strong> {modalData.owner.phone}
              </p>
              <h4>Items:</h4>
              <ul>
                {modalData.order.map(
                  (item: { id: string; count: number }, index: number) => (
                    <li key={index}>
                      {item.id} — {item.count} pcs
                    </li>
                  ),
                )}
              </ul>
              <button
                className={s.closeButton}
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

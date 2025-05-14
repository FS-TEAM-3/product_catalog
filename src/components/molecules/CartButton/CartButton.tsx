import React, { useState } from 'react';
import { RectangleButton } from '@/components/atoms/RectangleButton';
import { useStore } from '@/store/store';
import { useTranslation } from 'react-i18next';
import operations from '@/utils/userOperations';
import { useAuthStore } from '@/store/useAuthStore';

type CartButtonProps = {
  productId: string;
};

export const CartButton: React.FC<CartButtonProps> = ({ productId }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const addToCart = useStore(state => state.addToCart);
  const removeFromCart = useStore(state => state.removeFromCart);
  const isAuth = !!useAuthStore(s => s.user);
  const state = useStore(state => state);
  const collection = isAuth ? state.user.cart : state.guest.cart;
  const isInCart = collection?.some(elem => elem.id === productId);

  const handleClick = async () => {
    if (isInCart) {
      if (isAuth) {
        setLoading(true);
        try {
          await operations.removeFromCard(productId);
          removeFromCart(true, productId);
          return;
        } catch (error) {
          console.error(error);
          return;
        } finally {
          setLoading(false);
        }
      }
      removeFromCart(false, productId);
    } else {
      if (isAuth) {
        setLoading(true);
        try {
          await operations.addToCart({ id: productId, count: 1 });
          addToCart(true, productId);
          return;
        } catch (error) {
          console.error(error);
          return;
        } finally {
          setLoading(false);
        }
      }
      addToCart(false, productId);
    }
  };

  return (
    <RectangleButton
      onClick={handleClick}
      isLoading={loading}
      isActive={isInCart}
    >
      {isInCart ? t('cartButton.added') : t('cartButton.add')}
    </RectangleButton>
  );
};

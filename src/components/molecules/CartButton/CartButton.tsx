import React from 'react';
import { RectangleButton } from '@/components/atoms/RectangleButton';
import { useStore } from '@/store/store';

type CartButtonProps = {
  productId: string;
};

export const CartButton: React.FC<CartButtonProps> = ({ productId }) => {
  const cart = useStore(state => state.cart);
  const addToCart = useStore(state => state.addToCart);
  const removeFromCart = useStore(state => state.removeFromCart);

  const isInCart = cart.some(item => item.id === productId);

  const handleClick = () => {
    if (isInCart) removeFromCart(productId);
    else addToCart(productId);
  };

  return (
    <RectangleButton onClick={handleClick} isActive={isInCart}>
      {isInCart ? 'In cart' : 'Add to cart'}
    </RectangleButton>
  );
};

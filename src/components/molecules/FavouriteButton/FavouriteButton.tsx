import React, { useState } from 'react';
import { LikeCheckBox } from '@/components/atoms/LikeCheckBox';
import { useStore } from '@/store/store';
import operations from '@/utils/userOperations';
import { useAuthStore } from '@/store/useAuthStore';

type FavouriteButtonProps = {
  productId: string;
};

export const FavouriteButton: React.FC<FavouriteButtonProps> = ({
  productId,
}) => {
  const state = useStore(state => state);
  const addToFavourites = useStore(state => state.addToFavourites);
  const removeFromFavourites = useStore(state => state.removeFromFavourites);
  const isAuth = !!useAuthStore(s => s.user);
  const collection = isAuth ? state.user.favourites : state.guest.favourites;
  const isInFavorite = collection?.some(product => product === productId);
  const [loading, setLoading] = useState(false);

  const handleChange = async () => {
    if (isInFavorite) {
      if (isAuth) {
        setLoading(true);
        try {
          await operations.removeFromFavourites(productId);
          removeFromFavourites(isAuth, productId);
        } catch (error) {
          console.log(error);
          return;
        } finally {
          setLoading(false);
        }
        removeFromFavourites(isAuth, productId);
        return;
      }
      removeFromFavourites(isAuth, productId);
    } else {
      if (isAuth) {
        setLoading(true);
        try {
          await operations.addToFavourites(productId);
          addToFavourites(isAuth, productId);
        } catch (error) {
          console.log(error);
          return;
        } finally {
          setLoading(false);
        }
      }
      addToFavourites(isAuth, productId);
    }
  };

  return (
    <LikeCheckBox
      liked={isInFavorite}
      onCheckedChange={() => handleChange()}
      isLoading={loading}
    />
  );
};

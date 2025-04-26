import React from 'react';
import { LikeCheckBox } from '@/components/atoms/LikeCheckBox';
import { useStore } from '@/store/store';

type FavouriteButtonProps = {
  productId: string;
};

export const FavouriteButton: React.FC<FavouriteButtonProps> = ({
  productId,
}) => {
  const favourites = useStore(state => state.favourites);
  const addToFavourites = useStore(state => state.addToFavourites);
  const removeFromFavourites = useStore(state => state.removeFromFavourites);

  const isFavourite = favourites.includes(productId);

  const handleChange = (checked: boolean) => {
    if (checked) addToFavourites(productId);
    else removeFromFavourites(productId);
  };

  return (
    <LikeCheckBox
      liked={isFavourite}
      onCheckedChange={() => handleChange(!isFavourite)}
    />
  );
};

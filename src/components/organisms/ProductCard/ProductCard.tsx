import styles from './_styles.module.scss';
import { Price } from '@/components/molecules/Price';
import { RectangleButton } from '@/components/atoms/RectangleButton';
import { LikeCheckBox } from '@/components/atoms/LikeCheckBox';
import { Description } from '@/components/molecules/Description';
import { NavLink } from 'react-router-dom';
import { GeneralProduct } from '@/types/GeneralProduct';
import { CartElement, Favourites } from '@/types/Store';
import { useStore } from '@/store/store';

type Props = {
  product: GeneralProduct;
  path: string;
};

export const ProductCard: React.FC<Props> = ({ product, path }) => {
  const { image, name, fullPrice, price, screen, ram, capacity } = product;
  const specs = { screen: screen, ram: ram, capacity: capacity };

  const cart: CartElement[] = useStore(state => state.cart);
  const favourites: Favourites[] = useStore(state => state.favourites);
  const addToCart = useStore(state => state.addToCart);
  const removeFromCart = useStore(state => state.removeFromCart);
  const addToFavourites = useStore(state => state.addToFavourites);
  const removeFromFavourites = useStore(state => state.removeFromFavourites);

  const isInCart = !!cart.find(item => item.id === name) || false;
  const isInFavourites = favourites.includes(name);

  const handleCartAction = () => {
    if (isInCart) {
      removeFromCart(name);
    } else {
      addToCart(name);
    }
  };

  const handleFavouritesAction = () => {
    if (isInFavourites) {
      removeFromFavourites(name);
    } else {
      addToFavourites(name);
    }
  };

  return (
    <div className={styles.card}>
      <NavLink to={path} className={styles.cardImageContainer}>
        <img src={'/' + image} alt={name} className={styles.cardImage}></img>
      </NavLink>

      <NavLink to={path} className={styles.cardTitleContainer}>
        <div className={styles.cardTitle}>{name}</div>
      </NavLink>

      <Price currentPrice={price} fullPrice={fullPrice} />

      <div className={styles.separator} />

      <div className={styles.cardDescription}>
        <Description product={specs} isSmall={true} />
      </div>

      <div className={styles.cardButtons}>
        <div className={styles.cardButtonsContainer}>
          <RectangleButton onClick={handleCartAction} isActive={isInCart}>
            {isInCart ? 'Added to cart' : 'Add to cart'}
          </RectangleButton>
        </div>
        <LikeCheckBox
          onCheckedChange={handleFavouritesAction}
          liked={isInFavourites}
        />
      </div>
    </div>
  );
};

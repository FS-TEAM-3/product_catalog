import styles from './_styles.module.scss';
import { Price } from '@/components/molecules/Price';
import { Description } from '@/components/molecules/Description';
import { NavLink } from 'react-router-dom';
import { GeneralProduct } from '@/types/GeneralProduct';
import { CartButton } from '@/components/molecules/CartButton';
import { FavouriteButton } from '@/components/molecules/FavouriteButton';

type Props = {
  product: GeneralProduct;
  path: string;
};

export const ProductCard: React.FC<Props> = ({ product, path }) => {
  const { image, name, fullPrice, price, screen, ram, capacity } = product;
  const specs = { screen: screen, ram: ram, capacity: capacity };
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
          <CartButton productId={product.itemId} />
        </div>
        <FavouriteButton productId={product.itemId} />
      </div>
    </div>
  );
};

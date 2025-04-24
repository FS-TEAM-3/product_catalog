import styles from './_styles.module.scss';
import { Price } from '@/components/molecules/Price';
import { RectangleButton } from '@/components/atoms/RectangleButton';
import { LikeCheckBox } from '@/components/atoms/LikeCheckBox';
import { Description } from '@/components/molecules/Description';
import { NavLink } from 'react-router-dom';
import { GeneralProduct } from '@/types/GeneralProduct';

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
        <Description product={specs} isSmall={true} fieldsCount={3} />
      </div>

      <div className={styles.cardButtons}>
        <div className={styles.cardButtonsContainer}>
          <RectangleButton>Add to cart</RectangleButton>
        </div>
        <LikeCheckBox />
      </div>
    </div>
  );
};

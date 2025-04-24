import styles from './_styles.module.scss';
import { Price } from '@/components/molecules/Price';
import { RectangleButton } from '@/components/atoms/RectangleButton';
import { LikeCheckBox } from '@/components/atoms/LikeCheckBox';
import { Description } from '@/components/molecules/Description';
import { Product } from '@/types/Product';
import { NavLink } from 'react-router-dom';

type Props = {
  product: Product;
  path: string;
};

export const ProductCard: React.FC<Props> = ({ product, path }) => {
  const { images, name, priceRegular, priceDiscount } = product;

  return (
    <div className={styles.card}>
      <NavLink to={path} className={styles.cardImageContainer}>
        <img src={images[0]} alt={name} className={styles.cardImage}></img>
      </NavLink>

      <NavLink to={path} className={styles.cardTitleContainer}>
        <div className={styles.cardTitle}>{name}</div>
      </NavLink>

      <Price currentPrice={priceDiscount} fullPrice={priceRegular} />

      <div className={styles.separator} />

      <div className={styles.cardDescription}>
        <Description product={product} isSmall={true} fieldsCount={3} />
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

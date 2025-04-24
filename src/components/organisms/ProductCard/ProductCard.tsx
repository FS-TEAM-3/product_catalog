import styles from './_styles.module.scss';
import { Price } from '@/components/molecules/Price';
import { RectangleButton } from '@/components/atoms/RectangleButton';
import { LikeCheckBox } from '@/components/atoms/LikeCheckBox';
import { Description } from '@/components/molecules/Description';
import { Product } from '@/types/Product';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { images, name, priceRegular, priceDiscount } = product;

  return (
    <div className={styles.card}>
      <div className={styles.cardImageContainer}>
        <img src={images[0]} alt={name} className={styles.cardImage}></img>
      </div>

      <div className={styles.cardTitleContainer}>
        <div className={styles.cardTitle}>{name}</div>
      </div>

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

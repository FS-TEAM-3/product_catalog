import styles from './_styles.module.scss';
import products from '../../../public/api/products.json';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { PicturePicker } from '@/components/organisms/PicturePicker/PicturePicker';
import { Description } from '@/components/molecules/Description';
import { useParams } from 'react-router-dom';
import { Container } from '@/components/templates/Container';
import { GoBackButton } from '@/components/molecules/GoBackButton';
import { EmptyCart } from '@/components/organisms/EmptyCart';
import { CustomSeparator } from '@/components/atoms/CustomSeparator';
import { Price } from '@/components/molecules/Price';
import { CardSlider } from '@/components/molecules/CardSlider/CardSlider';
import { CartButton } from '@/components/molecules/CartButton';
import { FavouriteButton } from '@/components/molecules/FavouriteButton';
import { ColorSelector } from '@/components/molecules/ColorSelector';
import { CapacitySelector } from '@/components/molecules/CapacitySelector';
import { getRandom } from '@/utils/productsOptions';
import { useEffect } from 'react';
import { parseSlug } from '@/utils/parseSlug';
import { BreadCrumbs } from '@/components/organisms/BreadCrumbs';

export const ItemCard = () => {
  const { slug } = useParams<{ slug?: string }>();
  const { itemId } = parseSlug(slug ?? '');

  useEffect(() => {
    if (itemId) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [itemId]);

  const product = products.find(prod => prod.itemId === slug);
  const randomProducts = getRandom(products);

  let item;

  switch (product?.category) {
    case 'phones':
      item = phones.find(item => item.id === slug);
      break;
    case 'tablets':
      item = tablets.find(item => item.id === slug);
      break;
    case 'accessories':
      item = accessories.find(item => item.id === slug);
      break;
    default:
      item = null;
      break;
  }

  return (
    <Container>
      {!item || !product ? (
        <EmptyCart />
      ) : (
        <div className="main-grid">
          <div className={styles.url}>
            <BreadCrumbs />
          </div>
          <div className={styles.button}>
            <GoBackButton category={product.category} />
          </div>

          <h2 className={styles.itemName}>{item.name}</h2>

          <div className={styles.itemPicker}>
            <PicturePicker images={item.images} />
          </div>

          <div className={styles.itemParams}>
            <div className={styles.itemIdMini}>
              <ColorSelector colors={item.colorsAvailable} />
              <div className={styles.itemIdSmall}>ID: {product.id}</div>
            </div>
            <CustomSeparator marginTop={24} marginBottom={24} />
            <CapacitySelector capacities={item.capacityAvailable} />
            <CustomSeparator marginTop={24} marginBottom={24} />
            <Price
              currentPrice={item.priceDiscount}
              fullPrice={item.priceRegular}
              size="big"
            />
            <div className={styles.itemButtons}>
              <div className={styles.itemButtonsContainer}>
                <CartButton productId={product.name} />
              </div>
              <FavouriteButton productId={product.name} />
            </div>
            <Description product={item} fieldsCount={4} />
          </div>
          <div className={styles.itemId}>
            <div className={styles.itemIdDescktop}>ID: {product.id}</div>
          </div>

          <div className={styles.description}>
            <div className={styles.descriptionMain}>About</div>
            <CustomSeparator marginTop={16} />
            {item.description.map(item => {
              return (
                <>
                  <div className={styles.itemDescriptionTitle}>
                    {item.title}
                  </div>
                  <div className={styles.itemDescriptionText}>{item.text}</div>
                </>
              );
            })}
          </div>

          <div className={styles.specs}>
            <div className={`${styles.descriptionMain} ${styles.specsTitle}`}>
              Tech specs
            </div>
            <Description product={item} />
          </div>

          <div className={styles.slider}>
            <CardSlider
              products={randomProducts}
              id={2}
              title="You may also like"
            />
          </div>
        </div>
      )}
    </Container>
  );
};

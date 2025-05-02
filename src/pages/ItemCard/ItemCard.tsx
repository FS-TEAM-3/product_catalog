import styles from './_styles.module.scss';
import products from '../../../public/api/products.json';
import { PicturePicker } from '@/components/organisms/PicturePicker/PicturePicker';
import { Description } from '@/components/molecules/Description';
import { useLocation, useParams } from 'react-router-dom';
import { Container } from '@/components/templates/Container';
import { GoBackButton } from '@/components/molecules/GoBackButton';
import { CustomSeparator } from '@/components/atoms/CustomSeparator';
import { Price } from '@/components/molecules/Price';
import { CardSlider } from '@/components/molecules/CardSlider/CardSlider';
import { CartButton } from '@/components/molecules/CartButton';
import { FavouriteButton } from '@/components/molecules/FavouriteButton';
import { ColorSelector } from '@/components/molecules/ColorSelector';
import { CapacitySelector } from '@/components/molecules/CapacitySelector';
import { getRandom } from '@/utils/productsOptions';
import { useEffect, useState } from 'react';
import { parseSlug } from '@/utils/parseSlug';
import { BreadCrumbs } from '@/components/organisms/BreadCrumbs';
import { getProduct } from '../../../public/api/products';
import { NotFound } from '@/pages/NotFound/NotFound';
import { Product } from '@/types/Product';
import { useApi } from '@/hooks/useApi';
import { LoadingOverlay } from '@/components/organisms/LoadingOverlay';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useTranslation } from 'react-i18next';

export const ItemCard = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const langKey = i18n.language === 'uk' ? 'ukr' : 'eng';
  const [item, setProduct] = useState<Product>();
  const [productID, setProductID] = useState<number>();
  const location = useLocation();
  const { slug } = useParams<{ slug?: string }>();
  const { itemId } = parseSlug(slug ?? '');

  useScrollToTop(itemId, { delay: 300, behavior: 'smooth' });

  const { data, loading, error } = useApi(
    () => getProduct(location.pathname),
    [location.pathname],
  );

  useEffect(() => {
    if (data) {
      const { product, productId } = data;
      setProduct(product);
      setProductID(productId);
    }
  });

  const randomProducts = getRandom(products);

  if (error && !loading) {
    return (
      <Container>
        <NotFound />
      </Container>
    );
  }

  console.log(item);

  return (
    <Container>
      <LoadingOverlay isLoading={loading} />
      {item && (
        <div className="main-grid">
          <div className={styles.url}>
            <BreadCrumbs />
          </div>
          <div className={styles.button}>
            <GoBackButton />
          </div>

          <h2 className={styles.itemName}>{item.name}</h2>

          <div className={styles.itemPicker}>
            <PicturePicker images={item.images} />
          </div>

          <div className={styles.itemParams}>
            <div className={styles.itemIdMini}>
              <ColorSelector colors={item.colorsAvailable} />
              <div className={styles.itemIdSmall}>ID: {productID}</div>
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
                <CartButton productId={item.name} />
              </div>
              <FavouriteButton productId={item.name} />
            </div>
            <Description product={item} fieldsCount={4} isSmall={true} />
          </div>
          <div className={styles.itemId}>
            <div className={styles.itemIdDescktop}>ID: {productID}</div>
          </div>

          <div className={styles.description}>
            <div className={styles.descriptionMain}>{t('itemCard.about')}</div>
            <CustomSeparator marginTop={16} />
            {item.description.map(item => {
              const { title, text } = item[langKey];
              return (
                <>
                  <div className={styles.itemDescriptionTitle}>{title}</div>
                  <div className={styles.itemDescriptionText}>{text}</div>
                </>
              );
            })}
          </div>

          <div className={styles.specs}>
            <div className={`${styles.descriptionMain} ${styles.specsTitle}`}>
              {t('itemCard.specs')}
            </div>
            <Description product={item} />
          </div>

          <div className={styles.slider}>
            <CardSlider
              products={randomProducts}
              id={2}
              title={t('itemCard.sliderLike')}
            />
          </div>
        </div>
      )}
    </Container>
  );
};

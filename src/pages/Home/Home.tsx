import { Slider } from '@/components/molecules/HeroSlider/HeroSlider';
import { Container } from '@/components/templates/Container';
import { CardSlider } from '@/components/molecules/CardSlider/CardSlider';
import { useEffect, useState } from 'react';
import { CategoryCard } from '@/components/molecules/CategoryCard/CategoryCard';
import { GeneralProduct } from '@/types/GeneralProduct';
import { SectionTitle } from '@/components/atoms/SectionTitle/SectionTitle';
import { getHotPrice, getNewModels } from '@/utils/productsOptions';
import sliderLinks from './sliderData.json';
import s from './_styles.module.scss';
import products from '../../../public/api/products.json';
import { useTranslation } from 'react-i18next';

type CategoryData = {
  [key: string]: {
    title: string;
    length: number;
  };
};

type data = {
  categoryItems: CategoryData;
  hotPrice: GeneralProduct[];
  newModel: GeneralProduct[];
};

export const Home = () => {
  const { t } = useTranslation();
  //const [products, setProducts] = useState<GeneralProduct[]>([]);

  const [pageData, setPageData] = useState<data>({
    categoryItems: {},
    hotPrice: [],
    newModel: [],
  });

  useEffect(() => {
    const categoryItems: CategoryData = {
      phones: { title: t('categories.mobPhones'), length: 0 },
      tablets: { title: t('categories.tablets'), length: 0 },
      accessories: { title: t('categories.accessories'), length: 0 },
    };

    const getCategoryData = (items: GeneralProduct[]) => {
      items.forEach(product => {
        console.log(categoryItems);
        categoryItems[product.category].length++;
      });
    };

    getCategoryData(products);

    const hotPriceList = getHotPrice(products);
    const newModels = getNewModels(products);

    setPageData({
      categoryItems: categoryItems,
      hotPrice: hotPriceList,
      newModel: newModels,
    });
  }, [t]);

  return (
    <Container>
      {/* <LoadingOverlay isLoading={true} /> */}
      <div className={s.label}>{t('home.welcome')}</div>
      <section className={s.section}>
        <Slider links={sliderLinks} />
      </section>
      <section className={s.section}>
        <CardSlider
          products={pageData.newModel}
          id={1}
          title={t('home.sliderNew')}
        />
      </section>

      <section className={s.section}>
        <SectionTitle title={t('home.categories')} />
        <div className={s.category}>
          {Object.keys(pageData.categoryItems).map(category => {
            return (
              <CategoryCard
                path={`/img/category-${category}.png`}
                length={pageData.categoryItems[category].length}
                category={category}
                title={pageData.categoryItems[category].title}
              />
            );
          })}
        </div>
      </section>

      <section className={s.section}>
        <CardSlider
          products={pageData.hotPrice}
          id={2}
          title={t('home.sliderHot')}
        />
      </section>
    </Container>
  );
};

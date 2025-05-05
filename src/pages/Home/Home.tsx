import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Slider } from '@/components/molecules/HeroSlider/HeroSlider';
import { Container } from '@/components/templates/Container';
import { CardSlider } from '@/components/molecules/CardSlider/CardSlider';
import { CategoryCard } from '@/components/molecules/CategoryCard/CategoryCard';
import { SectionTitle } from '@/components/atoms/SectionTitle/SectionTitle';
import { LoadingOverlay } from '@/components/organisms/LoadingOverlay';
import { useApi } from '@/hooks/useApi';
import { getSliderProducts } from '../../../public/api/products';
import products from '../../../public/api/products.json';
import sliderLinks from './sliderData.json';
import s from './_styles.module.scss';
import { NotFound } from '../NotFound';

interface CategoryData {
  [key: string]: { title: string; length: number };
}

export const Home: React.FC = () => {
  const [categoryItems, setCategoryItems] = useState<CategoryData>({});
  const { t } = useTranslation();

  const {
    data: newModels,
    loading: newestLoading,
    error: newestError,
  } = useApi(() => getSliderProducts('newest'), []);

  const {
    data: hotPriceList,
    loading: hotPriceLoading,
    error: hotPriceError,
  } = useApi(() => getSliderProducts('sales'), []);

  const isLoading = newestLoading || hotPriceLoading;
  const error = newestError || hotPriceError;

  useEffect(() => {
    const counts: CategoryData = {
      phones: { title: t('categories.mobPhones'), length: 0 },
      tablets: { title: t('categories.tablets'), length: 0 },
      accessories: { title: t('categories.accessories'), length: 0 },
    };
    products.forEach(p => {
      if (counts[p.category]) counts[p.category].length++;
    });
    setCategoryItems(counts);
  }, [t]);

  if (isLoading) return <LoadingOverlay isLoading />;
  if (error) return <NotFound />;

  return (
    <Container>
      <div className={s.label}>{t('home.welcome')}</div>
      <section className={s.section}>
        <Slider links={sliderLinks} />
      </section>

      <section className={s.section}>
        <CardSlider products={newModels!} id={1} title={t('home.sliderNew')} />
      </section>

      <section className={s.section}>
        <SectionTitle title={t('home.categories')} />
        <div className={s.category}>
          {Object.keys(categoryItems).map(key => (
            <CategoryCard
              key={key}
              path={`/img/category-${key}.png`}
              length={categoryItems[key].length}
              category={key}
              title={categoryItems[key].title}
            />
          ))}
        </div>
      </section>

      <section className={s.section}>
        <CardSlider
          products={hotPriceList!}
          id={2}
          title={t('home.sliderHot')}
        />
      </section>
    </Container>
  );
};

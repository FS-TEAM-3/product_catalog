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
//import { LoadingOverlay } from '@/components/organisms/LoadingOverlay';

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
  //const [products, setProducts] = useState<GeneralProduct[]>([]);

  const [pageData, setPageData] = useState<data>({
    categoryItems: {},
    hotPrice: [],
    newModel: [],
  });

  useEffect(() => {
    const categoryItems: CategoryData = {
      phones: { title: 'Mobile phones', length: 0 },
      tablets: { title: 'Tablets', length: 0 },
      accessories: { title: 'Accessories', length: 0 },
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
  }, []);

  return (
    <Container>
      {/* <LoadingOverlay isLoading={true} /> */}
      <div className={s.label}>Welcome to Nice Gadgets store!</div>
      <section className={s.section}>
        <Slider links={sliderLinks} />
      </section>
      <section className={s.section}>
        <CardSlider
          products={pageData.newModel}
          id={1}
          title="Brand new models"
        />
      </section>

      <section className={s.section}>
        <SectionTitle title="Categories" />
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
        <CardSlider products={pageData.hotPrice} id={2} title="Hot prices" />
      </section>
    </Container>
  );
};

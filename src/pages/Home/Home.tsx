import { Slider } from '@/components/molecules/HeroSlider/HeroSlider';
import { Container } from '@/components/templates/Container';
import products from '../../../public/api/products.json';
import { CardSlider } from '@/components/molecules/CardSlider/CardSlider';
import { useEffect, useState } from 'react';
import { CategoryCard } from '@/components/molecules/CategoryCard/CategoryCard';
import { GeneralProduct } from '@/types/GeneralProduct';
import { SectionTitle } from '@/components/atoms/SectionTitle/SectionTitle';
import { getHotPrice, getNewModels } from '@/utils/productsOptions';
import s from './_styles.module.scss';

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
  const [pageData, setPageData] = useState<data>({
    categoryItems: {},
    hotPrice: [],
    newModel: [],
  });
  const sliderLinks = {
    desktop: [
      'https://www.apple.com/105/media/ww/iphone/family/2025/e7ff365a-cb59-4ce9-9cdf-4cb965455b69/anim/welcome3/large.mp4',
      'https://www.apple.com/assets-www/en_WW/ipad/welcome/04854789d_large.mp4',
      'https://www.apple.com/105/media/ww/watch/2024/f0b51c31-e8a5-44d7-b23d-51bd2858454a/anim/hero/large.mp4',
    ],
    tablet: [
      'https://www.apple.com/105/media/ww/iphone/family/2025/e7ff365a-cb59-4ce9-9cdf-4cb965455b69/anim/welcome3/medium.mp4',
      'https://www.apple.com/assets-www/en_WW/ipad/welcome/c09534af6_medium.mp4',
      'https://www.apple.com/105/media/ww/watch/2024/f0b51c31-e8a5-44d7-b23d-51bd2858454a/anim/hero/medium.mp4',
    ],
    mobile: [
      'https://www.apple.com/105/media/ww/iphone/family/2025/e7ff365a-cb59-4ce9-9cdf-4cb965455b69/anim/welcome3/small.mp4',
      'https://www.apple.com/assets-www/en_WW/ipad/welcome/66b39244b_small.mp4',
      'https://www.apple.com/105/media/ww/watch/2024/f0b51c31-e8a5-44d7-b23d-51bd2858454a/anim/hero/small.mp4',
    ],
  };

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

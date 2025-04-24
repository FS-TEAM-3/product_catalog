import { RectangleButton } from '@/components/atoms/RectangleButton';
import { LinkButton } from '@/components/atoms/LinkButton';
import styles from './_styles.module.scss';
import { ShoppingBag, Plus, Minus } from 'lucide-react';
import { ColorsCheckBox } from '@/components/atoms/ColorsCheckBox';
import { LikeCheckBox } from '@/components/atoms/LikeCheckBox';
import { PropertiesCheckBox } from '@/components/atoms/PropertiesCheckBox';
import { SquareButton } from '@/components/atoms/SquareButton';
import { GoBackButton } from '@/components/molecules/GoBackButton';
import {
  ColorsSelector,
  PropertiesSelector,
} from '@/components/molecules/SelectorWrapper';
import { Price } from '@/components/molecules/Price';
import { Slider } from '@/components/molecules/HeroSlider/HeroSlider';
import { Container } from '@/components/templates/Container';
import { ProductCard } from '@/components/organisms/ProductCard/ProductCard';

import { Product } from '@/types/Product';
import products from '../../../public/api/phones.json';
import { CardSlider } from '@/components/molecules/CardSlider/CardSlider';

export const Home = () => {
  const product: Product = products[0];

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

  return (
    <Container>
      <div>
        <Slider links={sliderLinks} />
      </div>

      <p></p>
      <ProductCard product={product} path="/phones" />
      <p></p>
      <Price currentPrice={400} fullPrice={422} />
      <p></p>
      <Price currentPrice={400} fullPrice={422} size="big" />
      <p></p>
      <ColorsSelector colors={['green', 'pink', 'blue']} />
      <p></p>
      <PropertiesSelector
        label={'Prop'}
        properties={['125GB', '65GB', '254GB']}
      />
      <p></p>
      <GoBackButton />
      <p></p>
      <RectangleButton isActive={true}>Add to cart</RectangleButton>
      <p></p>
      <RectangleButton isLoading={true} size="big">
        Added
      </RectangleButton>
      <div className={styles.container}>
        <RectangleButton
          size="big"
          onClick={() => console.log('Added to cart')}
        >
          Add to cart
        </RectangleButton>
      </div>
      <p>Not Active</p>
      <LinkButton path="/phones">1</LinkButton>
      <p></p>
      <LinkButton path="/phones">
        <ShoppingBag />
      </LinkButton>
      <p>Active</p>
      <LinkButton path="/" disabled={true}>
        <ShoppingBag />
      </LinkButton>
      <p>big: </p>
      <LinkButton path="/" size="big">
        1
      </LinkButton>
      <p>Capacity</p>
      <PropertiesCheckBox property="125GB" />
      <p></p>
      <PropertiesCheckBox property="64GB" />
      <p>ColorChanges</p>
      <ColorsCheckBox innerColor="green" />
      <p></p>
      <ColorsCheckBox innerColor="pink" />
      <p>Like</p>
      <LikeCheckBox liked={false} />
      <p></p>
      <LikeCheckBox liked={true} />
      <p></p>
      <SquareButton>
        <Plus />
      </SquareButton>
      <p></p>
      <SquareButton disabled={true}>
        <Minus />
      </SquareButton>

      <CardSlider
        products={products.slice(10)}
        id={1}
        title="Brand new models"
      />
      <CardSlider products={products.slice(-10)} id={2} title="Hot prices" />
      <div>Home page</div>
    </Container>
  );
};

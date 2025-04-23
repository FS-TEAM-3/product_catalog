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

export const Home = () => {
  return (
    <>
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

      <div>Home page</div>
    </>
  );
};

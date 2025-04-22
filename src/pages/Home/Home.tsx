import { RectangleButton } from '@/components/atoms/RectangleButton';
import { LinkButton } from '@/components/atoms/LinkButton';
import styles from './_styles.module.scss';
import { ShoppingBag } from 'lucide-react';
import { ColorsLinkCheckBox } from '@/components/atoms/ColorsLinkCheckBox';
import { LikeCheckBox } from '@/components/atoms/LikeCheckBox';

export const Home = () => {
  return (
    <>
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
      <LinkButton path="/phones" size="rectangle">
        65 GB
      </LinkButton>
      <p></p>
      <LinkButton path="/" size="rectangle">
        125 GB
      </LinkButton>
      <p>ColorChanges</p>
      <ColorsLinkCheckBox path="/" color="green" />
      <p></p>
      <ColorsLinkCheckBox path="/phones" color="pink" />
      <p></p>
      <LikeCheckBox liked={false} />
      <p></p>
      <LikeCheckBox liked={true} />
      <p></p>

      <div>Home page</div>
    </>
  );
};

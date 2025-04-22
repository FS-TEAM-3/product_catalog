import { RectangleButton } from '@/components/atoms/RectangleButton';
import styles from './_styles.module.scss';

export const Home = () => {
  return (
    <>
      <RectangleButton isActive={true}>Add to cart</RectangleButton>
      <p></p>
      <RectangleButton isLoading={true} size="big">
        Added
      </RectangleButton>
      <div className={styles.container}>
        <RectangleButton onClick={() => console.log('Added to cart')}>
          Add to cart
        </RectangleButton>
      </div>
      <div>Home page</div>
    </>
  );
};

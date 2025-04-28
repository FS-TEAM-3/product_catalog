import { useStore } from '../../store/store';
import products from '../../../public/api/products.json';
import { GridCard } from '@/components/templates/GridCard';
import { PageHeader } from '@/components/organisms/PageHeader';
import { Container } from '@/components/templates/Container';
import styles from './_styles.module.scss';
import { EmptyFavourites } from '@/components/organisms/EmptyPage';
import { GoBackButton } from '@/components/molecules/GoBackButton';

export const Favourites = () => {
  const favouritesFromStore = useStore(store => store.favourites);
  const favouritesToPage = products.filter(product =>
    favouritesFromStore.includes(product.name),
  );

  return (
    <>
      {favouritesFromStore.length > 0 ? (
        <Container>
          <div className="main-grid">
            <PageHeader
              totalProducts={favouritesFromStore.length}
              trueNameCategory={'Favourites'}
            />
            <GridCard products={favouritesToPage} />
          </div>
        </Container>
      ) : (
        <>
          <Container>
            <div className={styles.empty}>
              <GoBackButton />
            </div>
          </Container>
          <Container className={styles.contentHolder}>
            <EmptyFavourites />
          </Container>
        </>
      )}
    </>
  );
};

import { useStore } from '../../store/store';
import products from '../../../public/api/products.json';
import { GridCard } from '@/components/templates/GridCard';
import { PageHeader } from '@/components/organisms/PageHeader';
import { Container } from '@/components/templates/Container';
import styles from './_styles.module.scss';
import { EmptyFavourites } from '@/components/organisms/EmptyPage';
import { GoBackButton } from '@/components/molecules/GoBackButton';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/useAuthStore';

export const Favourites = () => {
  const { t } = useTranslation();
  const isAuth = !!useAuthStore(s => s.user);

  const favouritesFromStore = useStore(state =>
    isAuth ? state.user.favourites : state.guest.favourites,
  );
  const favouritesToPage = products.filter(product =>
    favouritesFromStore?.includes(product.itemId),
  );

  return (
    <>
      {favouritesFromStore?.length > 0 ? (
        <Container>
          <div className="main-grid">
            <PageHeader
              totalProducts={favouritesFromStore?.length}
              trueNameCategory={t('categories.favourites')}
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

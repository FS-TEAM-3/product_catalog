import { useStore } from '../../store/store';
import products from '../../../public/api/products.json';
import { HeartCrack } from 'lucide-react';
import { GridCard } from '@/components/templates/GridCard';
import { PageHeader } from '@/components/organisms/PageHeader';
import { Container } from '@/components/templates/Container';

export const Favourites = () => {
  const favouritesFromStore = useStore(store => store.favourites);
  const favouritesToPage = products.filter(product =>
    favouritesFromStore.includes(product.name),
  );

  return (
    <Container>
      <div className="main-grid">
        {favouritesFromStore.length > 0 ? (
          <>
            <PageHeader
              totalProducts={favouritesFromStore.length}
              trueNameCategory={'Favourites'}
            />
            <GridCard products={favouritesToPage} />
          </>
        ) : (
          <div>
            <HeartCrack size={45} />
            You haven't liked anything yet
          </div>
        )}
      </div>
    </Container>
  );
};

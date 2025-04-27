import { useStore } from '../../store/store';
import { ProductCard } from '@/components/organisms/ProductCard';
import products from '../../../public/api/products.json';
import { HeartCrack } from 'lucide-react';
import s from '../Catalog/style.module.scss';
import { BreadCrumbs } from '@/components/organisms/BreadCrumbs';

export const Favourites = () => {
  const favouritesFromStore = useStore(store => store.favourites);
  const favouritesToPage = products.filter(product =>
    favouritesFromStore.includes(product.name),
  );

  return (
    <div className={s.catalog}>
      {favouritesFromStore.length > 0 ? (
        <>
          <div className={s.catalog__breadcrumbs}>
            <BreadCrumbs />
          </div>
          <div className={s.catalog__header}>
            <h2 className={s.catalog__title}>Favourites</h2>
            <label className={s.catalog__label}>
              {favouritesFromStore.length}
              {favouritesFromStore.length === 1 ? ' item' : ' items'}
            </label>
          </div>
          <div className={s.catalog__grid}>
            {favouritesToPage.map(item => (
              <ProductCard
                path={`/${item.category}/${item.itemId}`}
                product={item}
              />
            ))}
          </div>
        </>
      ) : (
        <div>
          <HeartCrack size={45} />
          You haven't liked anything yet
        </div>
      )}
    </div>
  );
};

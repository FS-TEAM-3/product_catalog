import { useStore } from '../../store/store';
import { Container } from '@/components/templates/Container';
import { ProductCard } from '@/components/organisms/ProductCard';
import products from '../../../public/api/products.json';
import s from '../Catalog/style.module.scss';
import { Link } from 'react-router-dom';
import { ChevronRight, House } from 'lucide-react';

export const Favourites = () => {
  const favouritesFromStore = useStore(store => store.favourites);
  const favouritesToPage = products.filter(product =>
    favouritesFromStore.includes(product.name),
  );

  return (
    <Container className={s.catalog}>
      <div className={s.catalog__breadcrumbs}>
        <Link to={'/'} className={s.catalog__homeLink}>
          <House className={s.catalog__homeIcon} />
        </Link>
        <ChevronRight className={s.catalog__chevronIcon} />
        <span className={s.catalog__breadcrumbText}>Favourites</span>
      </div>
      <div className={s.catalog__header}>
        <h2 className={s.catalog__title}>Favourites</h2>
        <label className={s.catalog__label}>
          {favouritesFromStore.length} items
        </label>
      </div>
      <div className={s.catalog__grid}>
        {favouritesToPage.map(item => (
          <ProductCard path={`${item.category}/${item.name}`} product={item} />
        ))}
      </div>
    </Container>
  );
};

import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Dropdown } from '@/components/molecules/Dropdown';
import productsData from '../../../public/api/products.json';
import './style.module.scss';
import styles from './style.module.scss';
import { ProductCard } from '@/components/organisms/ProductCard';
import { House, ChevronRight } from 'lucide-react';

const sortOptions = [
  { label: 'Newest', value: 'age' },
  { label: 'Alphabetically', value: 'title' },
  { label: 'Cheapest', value: 'price' },
];

const perPageOptions = [
  { label: '8', value: '8' },
  { label: '16', value: '16' },
  { label: '32', value: '32' },
];

export const Catalog: React.FC<{ category: string }> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const perPage = parseInt(searchParams.get('perPage') || '8', 10);
  const page = parseInt(searchParams.get('page') || '1', 10);

  const handleParamChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    if (key !== 'page') {
      params.set('page', '1');
    }
    setSearchParams(params);
  };

  const filteredProducts = useMemo(() => {
    return productsData.filter(product => product.category === category);
  }, [category]);

  const trueNameCategory = useMemo(() => {
    switch (category) {
      case 'phones':
        return 'Mobile phones';
      case 'tablets':
        return 'Tablets';
      case 'accessories':
        return 'Accessories';
      default:
        return 'Unknown Category';
    }
  }, [category]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sort === 'age') {
        return b.year - a.year;
      } else if (sort === 'title') {
        return a.name.localeCompare(b.name);
      } else if (sort === 'price') {
        return a.price - b.price;
      }
      return 0;
    });
  }, [filteredProducts, sort]);

  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / perPage);
  const paginatedProducts = sortedProducts.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  return (
    <div className={styles.catalog}>
      <div className={styles.catalog__breadcrumbs}>
        <Link to={'/'} className={styles.catalog__homeLink}>
          <House className={styles.catalog__homeIcon} />
        </Link>
        <ChevronRight className={styles.catalog__chevronIcon} />
        <span className={styles.catalog__breadcrumbText}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>
      <div className={styles.catalog__header}>
        <h1 className={styles.catalog__title}>{trueNameCategory}</h1>
        <label className={styles.catalog__label}>{totalProducts} models</label>

        <div className={styles.catalog__controls}>
          <Dropdown
            label="Sort by"
            value={sort}
            onChange={val => handleParamChange('sort', val)}
            options={sortOptions}
          />
          <Dropdown
            label="Items on page"
            value={perPage.toString()}
            onChange={val => handleParamChange('perPage', val)}
            options={perPageOptions}
          />
        </div>
      </div>

      <div className={styles.catalog__grid}>
        {paginatedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            path={`/${product.category}/${product.itemId}`}
          />
        ))}
      </div>

      <div className={styles.catalog__pagination}>
        <button
          className={`${styles.pageButton} ${styles.arrowButtonLeft}`}
          onClick={() => {
            if (page > 1) {
              handleParamChange('page', (page - 1).toString());
            }
          }}
        >
          {'<'}
        </button>

        {Array.from({ length: 4 }).map((_, index) => {
          const startPage = Math.floor((page - 1) / 4) * 4 + 1;
          const pageNumber = startPage + index;

          if (pageNumber > totalPages) return null;

          const isActive = pageNumber === page;

          return (
            <button
              key={pageNumber}
              className={`${styles.pageButton} ${isActive ? styles.active : ''}`}
              onClick={() => handleParamChange('page', pageNumber.toString())}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          className={`${styles.pageButton} ${styles.arrowButtonRight}`}
          onClick={() => {
            if (page < totalPages) {
              handleParamChange('page', (page + 1).toString());
            }
          }}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

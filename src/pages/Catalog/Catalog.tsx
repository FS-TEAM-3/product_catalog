import './style.module.scss';
import styles from './style.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from '@/components/molecules/Dropdown';
import { Container } from '@/components/templates/Container';
import { GridCard } from '@/components/templates/GridCard';
import { PageHeader } from '@/components/organisms/PageHeader';
import { getCatalogProducts } from '../../../public/api/products';
import { GeneralProduct } from '@/types/GeneralProduct';
import { useApi } from '@/hooks/useApi';
import { LoadingOverlay } from '@/components/organisms/LoadingOverlay';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const sortOptions = [
  { label: 'Newest', value: 'age' },
  { label: 'Alphabetically', value: 'title' },
  { label: 'Cheapest', value: 'fullPrice' },
];

const perPageOptions = [
  { label: '8', value: '8' },
  { label: '16', value: '16' },
  { label: '32', value: '32' },
];

export const Catalog: React.FC<{ category: string }> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalProducts, setTotalProducts] = useState(0);

  const sort = searchParams.get('sort') || 'age';
  const perPage = parseInt(searchParams.get('perPage') || '8', 10);
  const page = parseInt(searchParams.get('page') || '1', 10);

  const totalPages = Math.ceil(totalProducts / perPage);
  const [paginatedProducts, setPaginatedProducts] = useState<GeneralProduct[]>(
    [],
  );

  const handleParamChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    if (key !== 'page') {
      params.set('page', '1');
    }
    setSearchParams(params);
  };

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

  const { data, loading } = useApi(
    () => getCatalogProducts(category, page, searchParams.toString()),
    [category, page, searchParams.toString()],
  );

  useEffect(() => {
    if (data) {
      setPaginatedProducts(data.collection);
      setTotalProducts(data.count);
    }
  }, [data]);

  useScrollToTop(searchParams, { delay: 200, behavior: 'smooth' });

  return (
    <Container>
      <LoadingOverlay isLoading={loading} />
      <div className="main-grid">
        <PageHeader
          trueNameCategory={trueNameCategory}
          totalProducts={totalProducts}
        />

        <div className={styles.catalog__controls}>
          <Dropdown
            isBig={true}
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

        <GridCard products={paginatedProducts} />

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
    </Container>
  );
};

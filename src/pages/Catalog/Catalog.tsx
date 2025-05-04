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
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useTranslation } from 'react-i18next';
import { SearchField } from '@/components/molecules/SearchField';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from 'lucide-react';
import { EmptyCatalog } from '@/components/organisms/EmptyPage';

const perPageOptions = [
  { label: '8', value: '8' },
  { label: '16', value: '16' },
  { label: '32', value: '32' },
];

export const Catalog: React.FC<{ category: string }> = ({ category }) => {
  const { t } = useTranslation();

  const sortOptions = [
    { label: t('catalog.newest'), value: 'age', api: 'year' },
    { label: t('catalog.alphabetically'), value: 'title', api: 'itemId' },
    { label: t('catalog.cheapest'), value: 'fullPrice', api: 'price' },
  ];

  const [apiParams, setApiParams] = useState(new URLSearchParams());
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalProducts, setTotalProducts] = useState(0);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebouncedCallback((val: string) => {
    handleParamChange('search', val);
  }, 400);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    debouncedSearch(val);
  };

  const sort = searchParams.get('sort') || 'age';
  const perPage = parseInt(searchParams.get('perPage') || '8', 10);
  const page = parseInt(searchParams.get('page') || '1', 10);

  const totalPages = Math.ceil(totalProducts / perPage);
  const [paginatedProducts, setPaginatedProducts] = useState<GeneralProduct[]>(
    [],
  );

  const handleParamChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const apiParamsString = new URLSearchParams(apiParams);
    params.set(key, value);
    if (key !== 'page') {
      params.set('page', '1');
    }
    apiParamsString.set(key, value);
    if (key === 'sort') {
      const apiSwitchParams = sortOptions.find(
        item => item.value === value,
      )?.api;
      apiParamsString.set('sort', apiSwitchParams || value);
    }
    setSearchParams(params);
    setApiParams(apiParamsString);
  };

  const trueNameCategory = useMemo(() => {
    switch (category) {
      case 'phones':
        return t('categories.mobPhones');
      case 'tablets':
        return t('categories.tablets');
      case 'accessories':
        return t('categories.accessories');
      default:
        return 'Unknown Category';
    }
  }, [category, t]);

  const { data, loading } = useApi(
    () => getCatalogProducts(category, page, apiParams.toString()),
    [category, page, apiParams],
  );

  useEffect(() => {
    if (data) {
      setPaginatedProducts(data.collection);
      setTotalProducts(data.count);
    }
  }, [data]);

  useScrollToTop(category, { delay: 200, behavior: 'smooth' });

  return (
    <Container>
      <div className="main-grid">
        <PageHeader
          trueNameCategory={trueNameCategory}
          totalProducts={totalProducts}
        />

        <div className={styles.catalog__controls}>
          <Dropdown
            isBig={true}
            label={t('catalog.sortBy')}
            value={sort}
            onChange={val => handleParamChange('sort', val)}
            options={sortOptions}
          />
          <Dropdown
            label={t('catalog.perPage')}
            value={perPage.toString()}
            onChange={val => handleParamChange('perPage', val)}
            options={perPageOptions}
          />
          <SearchField
            category={category}
            value={search}
            onChange={handleSearchChange}
          />
          <a
            className={styles.reset}
            onClick={() => {
              handleParamChange('search', '');
              setSearch('');
            }}
          >
            Reset filters
          </a>
        </div>

        {paginatedProducts.length > 0 ? (
          <>
            <div className={styles.catalog__gridWrapper}>
              {loading ? (
                <div className={styles.catalog__localOverlay}>
                  <Loader className={styles.spinner} />
                </div>
              ) : (
                <GridCard products={paginatedProducts} />
              )}
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
                    onClick={() =>
                      handleParamChange('page', pageNumber.toString())
                    }
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
          </>
        ) : (
          <div className={styles.catalog__gridWrapper}>
            <div className={styles.catalog__localOverlay}>
              <EmptyCatalog />
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

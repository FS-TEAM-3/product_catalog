import styles from './_styles.module.scss';
import products from '../../../../public/api/products.json';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, House } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const BreadCrumbs = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);
  let accumPath = '';

  return (
    <nav className={styles.breadCrumbs}>
      {segments.length > 0 && (
        <Link to="/" className={styles.link}>
          <House className={`${styles.iconHome} ${styles.icon}`} />
        </Link>
      )}
      {segments.map((seg, i) => {
        accumPath += `/${seg}`;
        const isLast = i === segments.length - 1;
        const display =
          products.find(p => p.itemId === seg)?.name ||
          (seg === 'phones'
            ? t('categories.phon')
            : seg === 'tablets'
              ? t('categories.tablets')
              : seg === 'accessories'
                ? t('categories.accessories')
                : seg === 'favourites'
                  ? t('categories.favourites')
                  : seg);
        return (
          <span key={accumPath} className={styles.step}>
            <ChevronRight className={styles.icon} />
            {isLast ? (
              <span className={styles.current}>
                {display.replace(/(^\w)/, (_, c) => c.toUpperCase())}
              </span>
            ) : (
              <Link to={accumPath} className={styles.link}>
                {display}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

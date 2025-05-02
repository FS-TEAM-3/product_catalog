import { useTranslation } from 'react-i18next';
import { ProductSpecs } from '@/types/ProductSpecs';
import React from 'react';
import styles from './_styles.module.scss';

type TechSpecsProps = {
  product: Partial<ProductSpecs>;
  isSmall?: boolean;
  fieldsCount?: number;
};

export const Description: React.FC<TechSpecsProps> = ({
  product,
  isSmall = false,
  fieldsCount,
}) => {
  const { t } = useTranslation();
  const { screen, resolution, processor, ram, capacity, camera, zoom, cell } =
    product;

  const allSpecs = [
    { key: 'screen', value: screen },
    { key: 'resolution', value: resolution },
    { key: 'processor', value: processor },
    { key: 'ram', value: ram },
    { key: 'capacity', value: capacity },
    { key: 'camera', value: camera },
    { key: 'zoom', value: zoom },
    { key: 'cell', value: Array.isArray(cell) ? cell.join(', ') : cell },
  ];

  const smallSpecs = [
    { key: 'screen', value: screen },
    { key: 'capacity', value: capacity },
    { key: 'ram', value: ram },
  ];

  const specsToShow = isSmall ? smallSpecs : allSpecs.slice(0, fieldsCount);

  return (
    <section className={`${isSmall ? styles.techspecs__inside : ''} techspecs`}>
      {!isSmall ||
        (fieldsCount && (
          <h3 className={styles.techspecs__title}>
            {t('techspecs.title', 'Tech specs')}
          </h3>
        ))}
      <ul className={styles.techspecs__list}>
        {specsToShow.map(({ key, value }) => (
          <li className={styles.techspecs__row} key={key}>
            <p className={styles.techspecs__key}>
              {`${isSmall}`}
              {t(
                `techspecs.${key}`,
                key.charAt(0).toUpperCase() + key.slice(1),
              )}
            </p>
            <p className={styles.techspecs__value}>{value ?? '-'}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

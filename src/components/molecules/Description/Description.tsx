import { ProductSpecs } from '@/types/ProductSpecs';
import React from 'react';

import styles from './_styles.module.scss';

type TechSpecsProps = {
  product: Partial<ProductSpecs>;
  isSmall?: boolean;
  fieldsCount?: number;
};

const FIELD_LABELS_DEFAULT: Record<string, string> = {
  screen: 'Screen',
  resolution: 'Resolution',
  processor: 'Processor',
  ram: 'RAM',
  capacity: 'Built in memory',
  camera: 'Camera',
  zoom: 'Zoom',
  cell: 'Cell',
};

const FIELD_LABELS_SMALL: Record<string, string> = {
  screen: 'Screen',
  capacity: 'Capacity',
  ram: 'RAM',
};

export const Description: React.FC<TechSpecsProps> = ({
  product,
  isSmall = false,
  fieldsCount,
}) => {
  const { screen, resolution, processor, ram, capacity, camera, zoom, cell } =
    product;

  const FIELD_LABELS = isSmall ? FIELD_LABELS_SMALL : FIELD_LABELS_DEFAULT;

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
        (!fieldsCount && (
          <h3 className={styles.techspecs__title}>Tech specs</h3>
        ))}
      <ul className={styles.techspecs__list}>
        {specsToShow.map(({ key, value }) => (
          <li className={styles.techspecs__row} key={key}>
            <p className={styles.techspecs__key}>{FIELD_LABELS[key] || key}</p>
            <p className={styles.techspecs__value}>{value ?? '-'}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

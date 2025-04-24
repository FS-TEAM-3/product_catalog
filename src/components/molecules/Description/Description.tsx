import { ProductSpecs } from '@/types/ProductSpecs';
import React from 'react';

import styles from './_styles.module.scss';

type TechSpecsProps = {
  product: ProductSpecs;
  hasTitle: boolean;
  fieldsCount?: number;
};

const FIELD_LABELS: Record<string, string> = {
  screen: 'Screen',
  resolution: 'Resolution',
  processor: 'Processor',
  ram: 'RAM',
  capacity: 'Built in memory',
  camera: 'Camera',
  zoom: 'Zoom',
  cell: 'Cell',
};

export const Description: React.FC<TechSpecsProps> = ({
  product,
  hasTitle,
  fieldsCount,
}) => {
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

  let specsToShow = allSpecs;

  if (fieldsCount) {
    specsToShow = specsToShow.slice(0, fieldsCount);
  }

  return (
    <section className={styles.techspecs}>
      {hasTitle && <h3 className={styles.techspecs__title}>Tech specs</h3>}
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

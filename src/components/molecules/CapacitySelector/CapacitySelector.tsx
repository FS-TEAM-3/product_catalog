// src/components/molecules/CapacitySelector/CapacitySelector.tsx
import React from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './_styles.module.scss';
import { parseSlug } from '@/utils/parseSlug';

type Params = {
  slug: string;
};

type Props = {
  capacities: string[];
};

export const CapacitySelector: React.FC<Props> = ({ capacities }) => {
  const { pathname } = useLocation();
  const category = pathname.split('/')[1];
  const { slug = '' } = useParams<Params>();
  const navigate = useNavigate();

  const lowerCaps = capacities.map(c => c.toLowerCase());

  const { itemId: baseId, capacity: capacityFromUrl, color } = parseSlug(slug);

  const selected = lowerCaps.includes(capacityFromUrl.toLowerCase())
    ? capacityFromUrl.toLowerCase()
    : lowerCaps[0];

  const handleValueChange = (value: string) => {
    if (!value) return;
    navigate(`/${category}/${baseId}-${value}-${color}`, { replace: true });
  };

  return (
    <div className={styles.selectorContainer}>
      <span className={styles.label}>Select capacity</span>
      <ToggleGroup.Root
        type="single"
        className={styles.featureContainer}
        value={selected}
        onValueChange={handleValueChange}
      >
        {lowerCaps.map(c => (
          <ToggleGroup.Item
            key={c}
            value={c}
            className={`${styles.checkbox} ${
              selected === c ? styles.active : ''
            }`}
          >
            {c}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  );
};

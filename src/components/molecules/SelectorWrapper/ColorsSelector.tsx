import React from 'react';
import { ColorsCheckBox } from '@/components/atoms/ColorsCheckBox';
import styles from './_styles.module.scss';

type Props = {
  colors: string[];
};

const ColorsSelector: React.FC<Props> = ({ colors }) => {
  return (
    <div className={styles.selectorContainer}>
      <span className={styles.label}>Available colors</span>{' '}
      <div className={styles.featureContainer}>
        {colors.map(color => (
          <ColorsCheckBox key={color} innerColor={color} />
        ))}
      </div>
    </div>
  );
};

export default ColorsSelector;

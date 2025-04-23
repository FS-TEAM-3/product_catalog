import React from 'react';
import { PropertiesCheckBox } from '@/components/atoms/PropertiesCheckBox';
import styles from './_styles.module.scss';

type Props = {
  label: string;
  properties: string[];
};

const PropertiesSelector: React.FC<Props> = ({ label, properties }) => {
  return (
    <div className={styles.selectorContainer}>
      <span className={styles.label}>{label}</span>{' '}
      <div className={styles.featureContainer}>
        {properties.map(property => (
          <PropertiesCheckBox key={property} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertiesSelector;

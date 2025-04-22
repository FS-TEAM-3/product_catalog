import React from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { useSearchParams } from 'react-router-dom';
import styles from './_styles.module.scss';
import { updateSearchParam } from '../../../utils/updateSearchParam';

type Props = {
  property: string;
};

export const PropertiesCheckBox: React.FC<Props> = ({ property }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentProperty = searchParams.get('property');
  const isChecked = currentProperty === property;

  const handleCheckedChange = (checked: boolean) => {
    updateSearchParam(
      'property',
      property,
      checked,
      setSearchParams,
      searchParams,
    );
  };

  return (
    <RadixCheckbox.Root
      className={`${styles.checkbox} ${isChecked ? styles.active : ''}`}
      checked={isChecked}
      onCheckedChange={handleCheckedChange}
    >
      {property}
    </RadixCheckbox.Root>
  );
};

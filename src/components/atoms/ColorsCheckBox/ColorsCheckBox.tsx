import React from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { useSearchParams } from 'react-router-dom';
import styles from './_styles.module.scss';
import { updateSearchParam } from '../../../utils/updateSearchParam';

type Props = {
  innerColor: string;
};

export const ColorsCheckBox: React.FC<Props> = ({ innerColor }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentColor = searchParams.get('color');
  const isChecked = currentColor === innerColor;

  const handleCheckedChange = (checked: boolean) => {
    updateSearchParam(
      'color',
      innerColor,
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
      <div
        className={styles.colorCircle}
        style={{ backgroundColor: innerColor }}
      />
    </RadixCheckbox.Root>
  );
};

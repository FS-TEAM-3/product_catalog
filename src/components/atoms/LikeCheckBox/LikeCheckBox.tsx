import React from 'react';
import styles from './_styles.module.scss';
import * as Radix from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import { Heart, Loader } from 'lucide-react';

type Props = {
  liked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  isLoading: boolean;
};

export const LikeCheckBox: React.FC<Props> = ({
  liked,
  onCheckedChange,
  isLoading = false,
}) => {
  return (
    <Radix.Checkbox
      className={clsx(styles.checkbox, liked && styles.liked)}
      checked={!!liked}
      disabled={isLoading}
      onCheckedChange={onCheckedChange}
    >
      {isLoading ? <Loader className={styles.spinner} /> : <Heart />}
    </Radix.Checkbox>
  );
};

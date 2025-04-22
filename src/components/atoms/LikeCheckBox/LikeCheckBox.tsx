import React from 'react';
import styles from './_styles.module.scss';
import * as Radix from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import { Heart } from 'lucide-react';

type Props = {
  liked: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export const LikeCheckBox: React.FC<Props> = ({ liked, onCheckedChange }) => {
  return (
    <Radix.Checkbox
      className={clsx(styles.checkbox, liked && styles.liked)}
      checked={liked}
      onCheckedChange={onCheckedChange}
    >
      <Heart />
    </Radix.Checkbox>
  );
};

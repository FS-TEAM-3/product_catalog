import React from 'react';
import { Button } from '@radix-ui/themes';
import clsx from 'clsx';
import { Loader } from 'lucide-react';
import styles from './_styles.module.scss';

type Props = {
  children: React.ReactNode;
  isActive?: boolean;
  isLoading?: boolean;
  size?: 'defauld' | 'big';
  onClick?: () => void;
};

export const RectangleButton: React.FC<Props> = ({
  children,
  isActive = false,
  isLoading = false,
  size = 'default',
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className={clsx(
        styles.button,
        isActive && styles.active,
        size === 'big' && styles.big,
      )}
    >
      {isLoading ? <Loader className={styles.spinner} /> : children}
    </Button>
  );
};

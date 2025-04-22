import React from 'react';
import { Button } from '@radix-ui/themes';
import clsx from 'clsx';
import styles from './_styles.module.scss';

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export const SquareButton: React.FC<Props> = ({
  children,
  disabled = false,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      className={clsx(styles.button, disabled && styles.disabled)}
    >
      {children}
    </Button>
  );
};

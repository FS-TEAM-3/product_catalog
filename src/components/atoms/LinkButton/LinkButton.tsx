import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './_styles.module.scss';

type Props = {
  children: React.ReactNode;
  classNames?: string;
  path: string;
  disabled?: boolean;
  size?: 'default' | 'big';
};

export const LinkButton: React.FC<Props> = ({
  children,
  classNames = '',
  path,
  disabled = false,
  size = 'default',
}) => {
  const getClassName = (isActive: boolean): string => {
    return [
      styles.button,
      isActive && styles.active,
      disabled && styles.disabled,
      size === 'big' && styles.big,
      classNames,
    ]
      .filter(Boolean)
      .join(' ');
  };

  return (
    <NavLink to={path} className={({ isActive }) => getClassName(isActive)}>
      {children}
    </NavLink>
  );
};

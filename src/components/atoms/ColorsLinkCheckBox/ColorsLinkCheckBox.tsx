import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './_styles.module.scss';

type Props = {
  path: string;
  color: string;
};

export const ColorsLinkCheckBox: React.FC<Props> = ({ path, color }) => {
  const getClassName = (isActive: boolean): string => {
    return [styles.checkbox, isActive && styles.active]
      .filter(Boolean)
      .join(' ');
  };

  return (
    <NavLink to={path} className={({ isActive }) => getClassName(isActive)}>
      <div className={styles.colorCircle} style={{ backgroundColor: color }} />
    </NavLink>
  );
};

import React from 'react';
import styles from './сontainer.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Container: React.FC<Props> = ({ children, className = '' }) => (
  <div className={`${styles.container} ${className}`}>{children}</div>
);

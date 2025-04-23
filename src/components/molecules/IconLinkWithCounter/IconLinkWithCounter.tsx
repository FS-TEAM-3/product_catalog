import React from 'react';
import { IconCounter } from '@/components/atoms/IconsCounter/IconsCouter';
import s from './IconLinkWithCounter.module.scss';

type Props = {
  count?: number;
  children: React.ReactNode;
  type?: string;
};

export const IconLinkWithCounter: React.FC<Props> = ({
  count = 0,
  children,
  type,
}) => {
  return (
    <div className={s.iconLink}>
      {children}
      {(count > 0 || type === 'menu') && <IconCounter count={count} />}
    </div>
  );
};

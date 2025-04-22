import React from 'react';
import { LinkButton } from '@/components/atoms/LinkButton';
import { IconCounter } from '@/components/atoms/IconsCounter/IconsCouter';
import s from './IconLinkWithCounter.module.scss';

type Props = {
  count?: number;
  path: string;
  children: React.ReactNode;
};

export const IconLinkWithCounter: React.FC<Props> = ({
  count = 0,
  path,
  children,
}) => {
  return (
    <LinkButton path={path} classNames={s.iconLink}>
      {children}
      {count > 0 && <IconCounter count={count} />}
    </LinkButton>
  );
};

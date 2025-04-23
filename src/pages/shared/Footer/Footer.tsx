import { Link, NavLink } from 'react-router-dom';
import { useCallback } from 'react';
import { ChevronUp } from 'lucide-react';

import { Container } from '@/components/templates/Container';
import { SquareButton } from '@/components/atoms/SquareButton';

import clsx from 'clsx';
import s from './footer.module.scss';

export const Footer = () => {
  const linkList = [
    { name: 'github', path: 'https://github.com/FS-TEAM-3' },
    { name: 'contacts', path: 'https://github.com/FS-TEAM-3' },
    { name: 'rights', path: '/rights' },
  ];

  const scrollToTop = useCallback(() => {
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  return (
    <footer className={s.box}>
      <Container className={s.content}>
        <div className={clsx(s.logo, s.section)}>
          <NavLink to={'/'}>
            <img className={s.logoImage} src="/img/Logo.png" alt="Logo" />
          </NavLink>
        </div>
        <div className={clsx(s.linkList, s.section)}>
          {linkList.map(item => (
            <Link className={s.linkItem} to={`${item.path}`} key={item.name}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className={clsx(s.toTopContainer, s.section)}>
          <p className={s.toTopText}>Back to top</p>
          <SquareButton onClick={scrollToTop}>
            <ChevronUp />
          </SquareButton>
        </div>
      </Container>
    </footer>
  );
};

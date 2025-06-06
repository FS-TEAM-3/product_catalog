import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCallback } from 'react';
import { ChevronUp } from 'lucide-react';
import { Container } from '@/components/templates/Container';
import { SquareButton } from '@/components/atoms/SquareButton';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import s from './footer.module.scss';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useThemeStore } from '@/store/useThemeStore';

export const Footer = () => {
  const { t } = useTranslation();
  const theme = useThemeStore(state => state.theme);
  const linkList = [
    { name: 'github', path: 'https://github.com/FS-TEAM-3' },
    { name: t('footer.contacts'), path: '/contacts' },
    { name: t('footer.rights'), path: '/rights' },
  ];
  const location = useLocation();

  const scrollToTop = useCallback(() => {
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  useScrollToTop(location.pathname, { delay: 300, behavior: 'smooth' });

  return (
    <footer className={s.box}>
      <Container className={s.content}>
        <div className={clsx(s.logo, s.section)}>
          <NavLink to={'/'}>
            <img
              className={s.logoImage}
              src={theme === 'light-theme' ? '/img/Logo.png' : '/img/Logo.svg'}
              alt="Logo"
            />
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
          <p className={s.toTopText}>{t('footer.toTop')}</p>
          <SquareButton onClick={scrollToTop}>
            <ChevronUp />
          </SquareButton>
        </div>
      </Container>
    </footer>
  );
};

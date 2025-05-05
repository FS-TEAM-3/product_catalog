import { NavLink } from 'react-router';
import './style.module.scss';
import s from './style.module.scss';
import { Heart, ShoppingBag, Menu, X, UserCog } from 'lucide-react';
import { IconLinkWithCounter } from '@/components/molecules/IconLinkWithCounter/IconLinkWithCounter';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useStore } from '@/store/store';
import { LanguageSwitcher, UserIcon } from '@/components/organisms/Switchers';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '@/components/molecules/ThemeToggle';
import { useThemeStore } from '@/store/useThemeStore';
import { useAuthStore } from '@/store/useAuthStore';
import { ContactForm } from '@/components/organisms/ContactForm/ContactForm';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const langKey = i18n.language;
  const isUa = langKey === 'uk' ? true : false;

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isNavRightVisible, setIsNavRightVisible] = useState(false);
  const isAuth = !!useAuthStore(s => s.user);

  const state = useStore(state => (isAuth ? state.user : state.guest));
  const theme = useThemeStore(state => state.theme);

  const getRealClassName = (isActive: boolean) => {
    return isActive ? `${s.link} ${s.active}` : s.link;
  };

  // Була проблема що коли припустимо юзер заходив з телефона, відкривав меню, а потім перевертав телефон через що ставало більше пікселів в довжину і починало показуватись як планшет, але при цьому меню залишалось true тому під хедером були компоненти з меню. Юзефект все вирішив.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 649 && isMenuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Юзефект щоб не можна було гортати сторінку коли увімкнене меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const realLinkList = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.phones'), path: 'phones' },
    { name: t('navbar.tablets'), path: 'tablets' },
    { name: t('navbar.accessories'), path: 'accessories' },
  ];

  return (
    <>
      <header className={s.header}>
        <div className={s.navLeft}>
          <NavLink to={'/'} className={s.logo}>
            <img
              src={theme === 'light-theme' ? '/img/Logo.png' : '/img/Logo.svg'}
              alt="Logo"
              onClick={() => setMenuOpen(false)}
            />
          </NavLink>
          <nav className={s.navLinks}>
            {realLinkList.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => getRealClassName(isActive)}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* right user menu start */}
        <button
          className={s.navToggleButton}
          onClick={() => setIsNavRightVisible(prev => !prev)}
        >
          {isNavRightVisible ? <X /> : <UserCog />}
        </button>
        <div
          className={classNames(s.navRight, {
            [s.navRightVisible]: isNavRightVisible,
          })}
        >
          {/* <div className={st.languageHolder}>
            <button
            >
              <UserRoundCheck />
            </button>
          </div> */}
          <UserIcon />
          <LanguageSwitcher isUa={isUa} />
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              `${s.iconWrapper} ${isActive ? s.active : ''}`
            }
          >
            <IconLinkWithCounter count={state.favourites?.length}>
              <Heart className={s.icon} />
            </IconLinkWithCounter>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${s.iconWrapper} ${isActive ? s.active : ''}`
            }
          >
            <IconLinkWithCounter count={state.cart?.length}>
              <ShoppingBag className={s.icon} />
            </IconLinkWithCounter>
          </NavLink>

          <div
            className={s.menuButton}
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <IconLinkWithCounter
              count={0}
              type={
                (state.favourites?.length > 0 || state.cart?.length > 0) &&
                !isMenuOpen
                  ? 'menu'
                  : undefined
              }
            >
              {!isMenuOpen ? (
                <Menu className={s.icon} />
              ) : (
                <X className={s.icon} />
              )}
            </IconLinkWithCounter>
          </div>
        </div>

        {/* right user menu end */}
      </header>
      <ThemeToggle />
      <ContactForm />

      <div className={`${s.mobileMenu} ${isMenuOpen ? s.active : ''}`}>
        <div className={s.mobileMenuLinks}>
          {realLinkList.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => getRealClassName(isActive)}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className={s.mobileMenuFooter}>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              `${s.footerButton} ${isActive ? s.active : ''}`
            }
            onClick={() => setMenuOpen(false)}
          >
            <IconLinkWithCounter count={state.favourites?.length}>
              <Heart className={s.icon} />
            </IconLinkWithCounter>
          </NavLink>

          <div className={s.divider} />

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${s.footerButton} ${isActive ? s.active : ''}`
            }
            onClick={() => setMenuOpen(false)}
          >
            <IconLinkWithCounter count={state.cart?.length}>
              <ShoppingBag className={s.icon} />
            </IconLinkWithCounter>
          </NavLink>
        </div>
      </div>
    </>
  );
};

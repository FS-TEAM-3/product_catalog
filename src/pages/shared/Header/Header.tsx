import { NavLink } from 'react-router';
import './style.module.scss';
import s from './style.module.scss';
import { Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { IconLinkWithCounter } from '@/components/molecules/IconLinkWithCounter/IconLinkWithCounter';
import { CartElement, Favourites } from '@/types/Store';
import { useEffect, useState } from 'react';
import { useStore } from '@/store/store';
import { LanguageSwitcher } from '@/components/organisms/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const cart: CartElement[] = useStore(state => state.cart);
  const favourites: Favourites[] = useStore(state => state.favourites);

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
              src="/img/Logo.png"
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

        <div className={s.navRight}>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              `${s.iconWrapper} ${isActive ? s.active : ''}`
            }
          >
            <IconLinkWithCounter count={favourites.length}>
              <Heart className={s.icon} />
            </IconLinkWithCounter>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${s.iconWrapper} ${isActive ? s.active : ''}`
            }
          >
            <IconLinkWithCounter count={cart.length}>
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
                (favourites.length > 0 || cart.length > 0) && !isMenuOpen
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
      </header>

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
            <IconLinkWithCounter count={favourites.length}>
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
            <IconLinkWithCounter count={cart.length}>
              <ShoppingBag className={s.icon} />
            </IconLinkWithCounter>
          </NavLink>
        </div>
      </div>
      <LanguageSwitcher />
    </>
  );
};

import { Link, NavLink } from 'react-router';
import './style.module.scss';
import s from './style.module.scss';
import { Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { IconLinkWithCounter } from '@/components/molecules/IconLinkWithCounter/IconLinkWithCounter';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [favoritesCounter] = useState(0);
  const [cartCounter] = useState(0);

  const getClassName = (isActive: boolean) => {
    return isActive ? `${s.firstVariantLink} ${s.active}` : s.firstVariantLink;
  };

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

  const linksList = [
    { name: 'Home', path: '/' },
    { name: 'Phones', path: 'phones' },
    { name: 'Tablets', path: 'tablets' },
    { name: 'Accessories', path: 'accessories' },
    { name: 'Item Card', path: 'phones/default-test-item' },
    { name: 'Favourites', path: 'favourites' },
    { name: 'Cart', path: 'cart' },
    { name: 'Not Found', path: 'random' },
  ];

  const realLinkList = [
    { name: 'HOME', path: '/' },
    { name: 'PHONES', path: 'phones' },
    { name: 'TABLETS', path: 'tablets' },
    { name: 'ACCESSORIES', path: 'accessories' },
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
          <Link to="/favourites">
            <div className={s.iconWrapper}>
              <NavLink
                to="/favourites"
                className={({ isActive }) => (isActive ? s.active : '')}
              >
                <IconLinkWithCounter count={favoritesCounter}>
                  <Heart className={s.icon} />
                </IconLinkWithCounter>
              </NavLink>
            </div>
          </Link>
          <Link to="/cart">
            <div className={s.iconWrapper}>
              <NavLink
                to="/cart"
                className={({ isActive }) => (isActive ? s.active : '')}
              >
                <IconLinkWithCounter count={cartCounter}>
                  <ShoppingBag className={s.icon} />
                </IconLinkWithCounter>
              </NavLink>
            </div>
          </Link>
          <div
            className={s.menuButton}
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <IconLinkWithCounter
              count={0}
              type={
                (favoritesCounter > 0 || cartCounter > 0) && !isMenuOpen
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
            <IconLinkWithCounter count={favoritesCounter}>
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
            <IconLinkWithCounter count={cartCounter}>
              <ShoppingBag className={s.icon} />
            </IconLinkWithCounter>
          </NavLink>
        </div>
      </div>

      <br></br>

      {linksList.map(item => {
        return (
          <NavLink
            className={({ isActive }) => getClassName(isActive)}
            to={`${item.path}`}
          >
            {item.name}
          </NavLink>
        );
      })}
    </>
  );
};

import { NavLink } from 'react-router';
import './style.module.scss';
import s from './style.module.scss';
import { Heart, ShoppingBag } from 'lucide-react';
import { IconLinkWithCounter } from '@/components/molecules/IconLinkWithCounter/IconLinkWithCounter';

export const Header = () => {
  const getClassName = (isActive: boolean) => {
    return isActive ? `${s.firstVariantLink} ${s.active}` : s.firstVariantLink;
  };

  const getRealClassName = (isActive: boolean) => {
    return isActive ? `${s.link} ${s.active}` : s.link;
  };

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
            <img src="/img/Logo.png" alt="Logo" />
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
          <div className={s.iconWrapper}>
            <NavLink
              to="/favourites"
              className={({ isActive }) => (isActive ? s.active : '')}
            >
              <IconLinkWithCounter count={0}>
                <Heart className={s.icon} />
              </IconLinkWithCounter>
            </NavLink>
          </div>
          <div className={s.iconWrapper}>
            <NavLink
              to="/cart"
              className={({ isActive }) => (isActive ? s.active : '')}
            >
              <IconLinkWithCounter count={0}>
                <ShoppingBag className={s.icon} />
              </IconLinkWithCounter>
            </NavLink>
          </div>
        </div>
      </header>

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

import { NavLink } from 'react-router';
import './style.module.scss';
import s from './style.module.scss';

export const Header = () => {
  const getClassName = (isActive: boolean) => {
    return isActive ? `${s.link} ${s.active}` : s.link;
  };

  const linksList = [
    { name: 'Home', path: '/' },
    { name: 'Cart', path: 'cart' },
    { name: 'Catalog', path: 'catalog' },
    { name: 'Favourites', path: 'favourites' },
    { name: 'Item Card', path: 'phones' },
    { name: 'Not Found', path: 'random' },
  ];

  return (
    <>
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

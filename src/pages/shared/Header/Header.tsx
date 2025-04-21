import { NavLink } from 'react-router';
import s from './style.module.scss';

export const Header = () => {
  return (
    <>
      <NavLink className={s.link} to="/">
        Home
      </NavLink>
      <NavLink className={s.link} to="cart">
        Cart
      </NavLink>
      <NavLink className={s.link} to="catalog">
        Catalog
      </NavLink>
      <NavLink className={s.link} to="favourites">
        Favourites
      </NavLink>
      <NavLink className={s.link} to="phones">
        ItemCard
      </NavLink>
      <NavLink className={s.link} to="random">
        Not Found
      </NavLink>
    </>
  );
};

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartElement, Favourites } from '@/types/Store';

type Store = {
  guest: {
    cart: CartElement[];
    favourites: Favourites[];
  };
  user: {
    cart: CartElement[];
    favourites: Favourites[];
  };
  addUserCollection: (collection: {
    cart: CartElement[];
    favourites: Favourites[];
  }) => void;
  clearCollection: () => void;
  addToCart: (isAuth: boolean, item: CartElement | CartElement['id']) => void;
  removeFromCart: (isAuth: boolean, id: CartElement['id']) => void;
  incCart: (isAuth: boolean, id: CartElement['id']) => void;
  decCart: (isAuth: boolean, id: CartElement['id']) => void;
  clearCart: (isAuth: boolean) => void;
  addToFavourites: (isAuth: boolean, id: Favourites) => void;
  removeFromFavourites: (isAuth: boolean, id: Favourites) => void;
};

export const useStore = create<Store>()(
  persist(
    set => ({
      guest: { cart: [], favourites: [] },
      user: { cart: [], favourites: [] },
      addUserCollection: collection =>
        set(() => {
          return {
            user: collection,
          };
        }),
      clearCollection: () =>
        set(() => {
          return {
            user: { cart: [], favourites: [] },
          };
        }),
      addToCart: (isAuth, item) =>
        set(state => {
          const key = isAuth ? 'user' : 'guest';
          const id = typeof item === 'string' ? item : item.id;
          const count = typeof item === 'object' && item.count ? item.count : 1;

          return {
            [key]: {
              ...state[key],
              cart: [...state[key].cart, { id, count }],
            },
          };
        }),

      removeFromCart: (isAuth, id) =>
        set(state => {
          const key = isAuth ? 'user' : 'guest';
          return {
            [key]: {
              ...state[key],
              cart: state[key].cart.filter(item => item.id !== id),
            },
          };
        }),

      incCart: (isAuth, id) =>
        set(state => {
          const key = isAuth ? 'user' : 'guest';
          return {
            [key]: {
              ...state[key],
              cart: state[key].cart.map(item =>
                item.id === id ? { ...item, count: item.count + 1 } : item,
              ),
            },
          };
        }),

      decCart: (isAuth, id) =>
        set(state => {
          const key = isAuth ? 'user' : 'guest';
          return {
            [key]: {
              ...state[key],
              cart: state[key].cart.map(item =>
                item.id === id && item.count > 1
                  ? { ...item, count: item.count - 1 }
                  : item,
              ),
            },
          };
        }),

      clearCart: isAuth =>
        set(state => {
          const key = isAuth ? 'user' : 'guest';
          return {
            [key]: {
              ...state[key],
              cart: [],
            },
          };
        }),

      addToFavourites: (isAuth, id) =>
        set(state => {
          const key = isAuth ? 'user' : 'guest';
          return {
            [key]: {
              ...state[key],
              favourites: Array.from(new Set([...state[key].favourites, id])),
            },
          };
        }),

      removeFromFavourites: (isAuth, id) =>
        set(state => {
          const key = isAuth ? 'user' : 'guest';
          return {
            [key]: {
              ...state[key],
              favourites: state[key].favourites.filter(fav => fav !== id),
            },
          };
        }),
    }),
    { name: 'CustomerStore' },
  ),
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartElement, Favourites } from '@/types/Store';

type Store = {
  cart: CartElement[];
  favourites: Favourites[];
  addToCart: (item: CartElement | CartElement['id']) => void;
  removeFromCart: (item: CartElement['id']) => void;
  incCart: (item: CartElement['id']) => void;
  decCart: (item: CartElement['id']) => void;
  clearCart: () => void;
  addToFavourites: (id: Favourites) => void;
  removeFromFavourites: (id: Favourites) => void;
};

export const useStore = create<Store>()(
  persist(
    set => ({
      cart: [],
      favourites: [],
      addToCart: item =>
        set(state => {
          const id = typeof item === 'string' ? item : item.id;
          const count = typeof item === 'object' && item.count ? item.count : 1;
          return {
            cart: [...state.cart, { id, count }],
          };
        }),
      removeFromCart: item =>
        set(state => ({
          cart: state.cart.filter(product => product.id !== item),
        })),
      incCart: item =>
        set(state => ({
          cart: state.cart.map(product =>
            product.id === item
              ? { id: product.id, count: product.count + 1 }
              : product,
          ),
        })),
      decCart: item =>
        set(state => ({
          cart: state.cart.map(product =>
            product.id === item
              ? { id: product.id, count: product.count - 1 }
              : product,
          ),
        })),
      clearCart: () => set(() => ({ cart: [] })),
      addToFavourites: id =>
        set(state => ({ favourites: [...state.favourites, id] })),
      removeFromFavourites: id =>
        set(state => ({
          favourites: state.favourites.filter(item => item !== id),
        })),
    }),
    { name: 'CustomerStore' },
  ),
);

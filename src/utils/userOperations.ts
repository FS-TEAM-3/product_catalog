import axios from 'axios';
import { Favourites, CartElement } from '@/types/Store';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const getUserCollection = async () => {
  const { data } = await axios.get('/user/collection');
  return data;
};

const getFavourites = async () => {
  const { data } = await axios.get('/user/favourites');
  return data;
};

const addToFavourites = async (itemId: Favourites) => {
  const { data } = await axios.post(`/user/favourites/${itemId}`);
  return data;
};

const removeFromFavourites = async (itemId: Favourites) => {
  const { data } = await axios.delete(`/user/favourites/${itemId}`);
  return data;
};

const getCard = async () => {
  const { data } = await axios.get('/user/card');
  return data;
};

const addToCart = async (item: CartElement) => {
  const { data } = await axios.post(`/user/card`, {
    itemId: item.id,
    count: item.count,
  });
  return data;
};

const removeFromCard = async (itemId: string) => {
  const { data } = await axios.delete(`/user/card`, { data: { itemId } });
  return data;
};

const clearCart = async () => {
  const { data } = await axios.delete(`/user/card/clear`);
  return data;
};

const operations = {
  getUserCollection,
  getFavourites,
  addToFavourites,
  removeFromFavourites,
  getCard,
  addToCart,
  removeFromCard,
  clearCart,
};
export default operations;

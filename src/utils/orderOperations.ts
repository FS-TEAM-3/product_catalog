import axios from 'axios';
import { CartElement } from '@/types/Store';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const getOrder = async (id: string) => {
  const { data } = await axios.get(`/order/${id}`);
  return data;
};

const createOrder = async (orderData: {
  isAuth: boolean;
  user: { name: string; email: string; phone: string; adress: string };
  order: CartElement[];
}) => {
  if (orderData.isAuth) {
    const { data } = await axios.post(`/order/user`, {
      order: orderData.order,
    });
    return data;
  }

  const { data } = await axios.post(`/order/`, {
    owner: orderData.user,
    order: orderData.order,
  });
  return data;
};

const operations = {
  getOrder,
  createOrder,
};
export default operations;

import axios from 'axios';
import { useStore } from '@/store/store';
import { CartElement, Favourites } from '@/types/Store';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const signUpUser = async (firebaseToken: string) => {
  token.set(firebaseToken);
  const { data } = await axios.post('/auth/signup');
  const addUserCollection = useStore.getState().addUserCollection;
  const userCollection = (await axios.get('/user/collection')) as {
    cart: CartElement[];
    favourites: Favourites[];
  };
  addUserCollection(userCollection);
  window.location.reload();
  return data;
};

const logInUser = async (firebaseToken: string) => {
  token.set(firebaseToken);
  const { data } = await axios.post('/auth/login');
  const addUserCollection = useStore.getState().addUserCollection;
  const userCollection = await axios.get('/user/collection');
  console.log(userCollection);
  addUserCollection(userCollection.data);
  return data;
};

const logOut = async () => {
  await axios.get('/auth/logout');
  token.unset();
  const clearUserCullection = useStore.getState().clearCollection;
  clearUserCullection();
};

const fetchCurrentUser = async (firebaseToken: string) => {
  if (firebaseToken) {
    token.set(firebaseToken);
  }
  const { data } = await axios.get('/auth/current');
  const addUserCullection = useStore.getState().addUserCollection;
  const userCollection = (await axios.get('/user/collection')) as {
    cart: CartElement[];
    favourites: Favourites[];
  };
  const { cart, favourites } = userCollection;
  const userCart = cart.map(item => ({ id: item.id, count: item.count }));
  addUserCullection({ cart: userCart, favourites });
  return data;
};

const authWithGoogle = async (firebaseToken: string) => {
  token.set(firebaseToken);
  const { data } = await axios.post('/auth/google');
  const addUserCollection = useStore.getState().addUserCollection;
  const userCollection = await axios.get('/user/collection');
  console.log(userCollection);
  addUserCollection(userCollection.data);
  return data;
};

const deleteAccount = async () => {
  const status = await axios.delete(`/auth/delete`);
  return status;
};

const operations = {
  signUpUser,
  logOut,
  logInUser,
  fetchCurrentUser,
  deleteAccount,
  authWithGoogle,
};
export default operations;

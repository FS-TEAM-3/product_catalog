import { Regisrtation, LogIn } from '../types/Auth';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const signUpUser = async (userData: Regisrtation) => {
  const { data } = await axios.post('/auth/signup', userData);

  verifyNotification(userData.email, data.user.linkToVerify);

  return data;
};

const logInUser = async (
  userData: LogIn,
  // setUser: ({ status }: { status: string }) => void,
  // setIsLoggedIn: (status: boolean) => void,
) => {
  const { data } = await axios.post('/auth/login', userData);
  token.set(data.token);
  // setUser(data.user);
  localStorage.setItem('token', data.token);
  // setIsLoggedIn(true);

  return data;
};

const logOut = async () =>
  // setUser: ({ status }: { status: string }) => void,
  // setIsLoggedIn: (status: boolean) => void,
  {
    await axios.get('/auth/logout');
    token.unset();
    // setUser({ status: 'unauthorise' });
    // setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

const fetchCurrentUser = async () =>
  // setUser: (data: string) => void,
  // setIsLoggedIn: (status: boolean) => void,
  {
    const usertoken = localStorage.getItem('token');
    if (usertoken) {
      token.set(usertoken);
    }
    const { data } = await axios.get('/auth/current');
    const newToken = data.data.token;
    // setUser(data.data.user);
    // setIsLoggedIn(true);
    localStorage.setItem('token', newToken);
    token.set(newToken);
    return data;
  };

const emailVerify = async (VerificationToken: string) => {
  const { data } = await axios.get(`/auth/verify/${VerificationToken}`);

  return data;
};

const verifyNotification = async (email: string, linkToVerify: string) => {
  const verify = await fetch(linkToVerify);
  window.open(linkToVerify, '_self');
  return { verify, email };
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
  emailVerify,
  deleteAccount,
};
export default operations;

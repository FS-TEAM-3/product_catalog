import '@radix-ui/themes/styles.css';
import { Outlet } from 'react-router-dom';
import { Header } from './pages/shared/Header/Header';
import { Footer } from './pages/shared/Footer/Footer';
import { useAuthStore } from '@/store/useAuthStore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import operations from './utils/authOperations';
import userOperation from './utils/userOperations';
import { useStore } from '@/store/store';
import { useEffect } from 'react';

export const App = () => {
  const addUserCollection = useStore(store => store.addUserCollection);
  const initAuth = useAuthStore(state => state.init);
  useEffect(() => {
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        try {
          const token = await user.getIdToken(true);
          await operations.logInUser(token);
          const userCollection = await userOperation.getUserCollection();
          addUserCollection(userCollection);
        } catch (e) {
          console.error('Authorization error:', e);
        }
      }
    });

    return () => unsubscribe();
  }, [initAuth, addUserCollection]);

  return (
    <div data-cy="app" className="page-content">
      <Header />
      <main className="section main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;

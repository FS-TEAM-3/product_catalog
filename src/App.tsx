import '@radix-ui/themes/styles.css';
import { Outlet } from 'react-router-dom';
import { Header } from './pages/shared/Header/Header';
import { Footer } from './pages/shared/Footer/Footer';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';

export const App = () => {
  const initAuth = useAuthStore(state => state.init);
  useEffect(() => {
    initAuth();
  }, [initAuth]);

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

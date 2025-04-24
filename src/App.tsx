import '@radix-ui/themes/styles.css';
import { Outlet } from 'react-router-dom';
import { Header } from './pages/shared/Header/Header';
import { Footer } from './pages/shared/Footer/Footer';

export const App = () => (
  <div data-cy="app">
    <Header />
    <main className="section">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default App;

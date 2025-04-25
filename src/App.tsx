import '@radix-ui/themes/styles.css';
import { Outlet } from 'react-router-dom';
import { Header } from './pages/shared/Header/Header';
import { Footer } from './pages/shared/Footer/Footer';

export const App = () => (
  <div data-cy="app" className="page-content">
    <Header />
    <main className="section main-content">
      <div className="container">
        <Outlet />
      </div>
    </main>
    <Footer />
  </div>
);

export default App;

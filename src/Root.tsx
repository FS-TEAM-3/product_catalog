import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { Home } from './pages/Home';
import { ItemCard } from './pages/ItemCard';
import { Cart } from './pages/Cart';
import { Catalog } from './pages/Catalog';
import { Favourites } from './pages/Favourites';
import { NotFound } from './pages/NotFound';
import { AuthPage } from './pages/Registration';
import { Contacts } from './pages/Contacts';
import { Rights } from './pages/Rights';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/home" element={<Navigate to="/" replace={true} />} />
          <Route index element={<Home />} />
          <Route path="phones">
            <Route index element={<Catalog category="phones" />} />
            <Route path="/phones/:slug" element={<ItemCard />} />
          </Route>

          <Route path="tablets">
            <Route index element={<Catalog category="tablets" />} />
            <Route path="/tablets/:slug" element={<ItemCard />} />
          </Route>

          <Route path="accessories">
            <Route index element={<Catalog category="accessories" />} />
            <Route path="/accessories/:slug" element={<ItemCard />} />
          </Route>
          <Route path="auth" element={<AuthPage />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="cart" element={<Cart />} />
          <Route path="rights" element={<Rights />} />
          <Route path="favourites" element={<Favourites />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

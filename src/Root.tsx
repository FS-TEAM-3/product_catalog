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

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/home" element={<Navigate to="/" replace={true} />} />
          <Route index element={<Home />} />
          <Route path="phones">
            <Route index element={<Catalog category="phones" />} />
            <Route path="/phones/:itemId" element={<ItemCard />} />
          </Route>

          <Route path="tablets">
            <Route index element={<Catalog category="tablets" />} />
            <Route path="/tablets/:itemId" element={<ItemCard />} />
          </Route>

          <Route path="accessories">
            <Route index element={<Catalog category="accessories" />} />
            <Route path="/accessories/:itemId" element={<ItemCard />} />
          </Route>
          <Route path="cart" element={<Cart />} />
          <Route path="favourites" element={<Favourites />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

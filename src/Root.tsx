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
          <Route path="phones" element={<ItemCard />}>
            <Route path=":slug?" element={<ItemCard />} />
          </Route>
          <Route path="cart" element={<Cart />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="favourites" element={<Favourites />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

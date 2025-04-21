import '@radix-ui/themes/styles.css';
import './styles/variables.scss';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Favourites } from './pages/Favourites';
import { Cart } from './pages/Cart';
import { ItemCard } from './pages/ItemCard';

function App() {
  return (
    <div>
      <Home />
      <Catalog />
      <Favourites />
      <Cart />
      <ItemCard />
    </div>
  );
}

export default App;

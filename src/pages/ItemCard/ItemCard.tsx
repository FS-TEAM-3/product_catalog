import { Description } from '@/components/molecules/Description';

// it's temporary import
import products from '../../../public/api/phones.json';
///

export const ItemCard = ({ category }: { category: string }) => {
  const product = products[3];
  return (
    <div>
      <h4>{category}</h4>
      <p>ItemCard page</p>
      <Description product={product} hasTitle={true} />
    </div>
  );
};

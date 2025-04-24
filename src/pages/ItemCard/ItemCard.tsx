import { Description } from '@/components/molecules/Description';

// it's temporary import
import products from '../../../public/api/phones.json';
import { PicturePicker } from '@/components/organisms/PicturePicker/PicturePicker';
///

// Для тесту
const images = [
  '../../../public/img/phones/apple-iphone-11/black/00.webp',
  '../../../public/img/phones/apple-iphone-11/black/01.webp',
  '../../../public/img/phones/apple-iphone-11/black/02.webp',
  '../../../public/img/phones/apple-iphone-11/black/03.webp',
  '../../../public/img/phones/apple-iphone-11/black/04.webp',
];

export const ItemCard = ({ category }: { category: string }) => {
  const product = products[3];
  return (
    <>
      <div>
        <h4>{category}</h4>
        <p>ItemCard page</p>
        <Description product={product} isSmall={false} />
      </div>
      <div>
        <PicturePicker images={images} />
      </div>
    </>
  );
};

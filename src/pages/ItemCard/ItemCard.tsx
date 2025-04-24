import { Description } from '@/components/molecules/Description';

// it's temporary import
import products from '../../../public/api/phones.json';
import { PicturePicker } from '@/components/organisms/PicturePicker/PicturePicker';
///

import images from '../../../public/api/phones.json';
console.log(images[0].images);

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
        <PicturePicker images={images[0].images} />
      </div>
    </>
  );
};

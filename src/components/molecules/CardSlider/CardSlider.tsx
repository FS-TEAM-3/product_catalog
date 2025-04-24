import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Controller } from 'swiper/modules';
import { ProductCard } from '@/components/organisms/ProductCard/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/types/Product';
import { SquareButton } from '@/components/atoms/SquareButton';
import s from './cardSlider.module.scss';
import 'swiper/css';

type Props = {
  id: number;
  products: Product[];
  title: string;
};

export const CardSlider: React.FC<Props> = ({
  products,
  id,
  title = 'Some Category',
}) => {
  const [idxSwiper, setIdxSwiper] = useState(null);

  return (
    <div className={`slider-container slider-${id}`}>
      <div className={s.headBox}>
        <h2 className={s.title}>{title}</h2>
        <div className={s.buttonBox}>
          <SquareButton>
            <div
              className={` ${s.button} swiper-catalog-button-prev swiper-catalog-button-prev-${id}`}
            >
              <ChevronLeft />
            </div>
          </SquareButton>
          <SquareButton>
            <div
              className={` ${s.button} swiper-catalog-button-next swiper-catalog-button-next-${id}`}
            >
              <ChevronRight />
            </div>
          </SquareButton>
        </div>
      </div>
      <div className="slider-wraper">
        <Swiper
          slidesPerView={2}
          initialSlide={0}
          spaceBetween={16}
          modules={[Navigation, Autoplay, Controller]}
          loop
          navigation={{
            nextEl: `.swiper-catalog-button-next-${id}`,
            prevEl: `.swiper-catalog-button-prev-${id}`,
          }}
          autoplay={{ delay: 5000 }}
          onSwiper={() => setIdxSwiper}
          controller={{ control: idxSwiper }}
          onSlideChange={() => console.log('slide change')}
          breakpoints={{
            // when window width is >= 480px
            640: {
              slidesPerView: 3,
            },
            // when window width is >= 640px
            1200: {
              slidesPerView: 4,
            },
          }}
        >
          {products.map((item, idx) => (
            <SwiperSlide key={(item.id, idx)}>
              <ProductCard product={item} path={`/phone/${item.namespaceId}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Controller } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroCard } from '../../atoms/HeroCard/HeroCard';
import { Link } from 'react-router-dom';
import 'swiper/css';

import './slider.scss';

type Props = {
  links: {
    desktop: string[];
    tablet: string[];
    mobile: string[];
  };
};

enum windowWidth {
  desktop = 'desktop',
  tablet = 'tablet',
  mobile = 'mobile',
}

enum ProductType {
  phones = 0,
  tablets = 1,
  accessories = 2,
}

export const Slider: React.FC<Props> = ({ links }) => {
  const [controlledSwiper] = useState(null);
  const [breakpoint, setBreakpoint] = useState<windowWidth>(
    windowWidth.desktop,
  );

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<div class="pagination  ${className} key=${index}"></div>`;
    },
  };

  useEffect(() => {
    const handleResize = () => {
      //video for desktop not fit to hero size. maby i find better video so save this query

      // if (window.matchMedia('(min-width: 1200px)').matches) {
      //   setBreakpoint(windowWidth.desktop);
      // }

      if (window.matchMedia('(min-width: 640px)').matches) {
        setBreakpoint(windowWidth.tablet);
      } else {
        setBreakpoint(windowWidth.mobile);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={'box'} data-slide-index="1">
      <div className="swiper-button-prev">
        <ChevronLeft />
      </div>
      <div className="slider-wraper">
        <Swiper
          slidesPerView={1}
          initialSlide={0}
          modules={[Navigation, Pagination, Autoplay, Controller]}
          pagination={pagination}
          loop
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          autoplay={{ delay: 5000 }}
          controller={{ control: controlledSwiper }}
        >
          {links[breakpoint].map((item, idx) => {
            return (
              <SwiperSlide key={item}>
                <div className="videoBox">
                  <HeroCard path={ProductType[idx]} />
                  <Link to={ProductType[idx]} className="videoLink">
                    <video autoPlay muted loop playsInline className="video">
                      <source src={item} type="video/mp4" />
                    </video>
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="swiper-button-next">
        <ChevronRight />
      </div>
    </div>
  );
};

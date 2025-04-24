import React from 'react';
import s from './heroCard.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  path: string;
};

export const HeroCard: React.FC<Props> = ({ path }) => {
  return (
    <div className={s.card}>
      <div>
        <div className={s.cardText}>
          <h2 className={s.cardTitle}>
            Now available
            <br />
            in our store!
          </h2>
        </div>
        <p className={s.text}>Be the first!</p>
      </div>
      <Link to={path} className={s.button}>
        Order Now
      </Link>
    </div>
  );
};

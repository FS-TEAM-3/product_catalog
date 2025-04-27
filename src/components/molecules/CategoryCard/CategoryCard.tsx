import React from 'react';
import s from './categoryCard.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  path: string;
  category: string;
  length: number;
  title: string;
};

export const CategoryCard: React.FC<Props> = ({
  path,
  category,
  length,
  title,
}) => {
  return (
    <div className={s.card}>
      <Link to={category} className={`${s.imageBox} ${s[category]}`}>
        <img
          src={path}
          alt={`${category}`}
          className={`${s.image} ${s[category]}`}
        />
      </Link>
      <div className={s.thumb}>
        <h4 className={s.title}>{title}</h4>
        <p className={s.text}>{`${length} models`}</p>
      </div>
    </div>
  );
};

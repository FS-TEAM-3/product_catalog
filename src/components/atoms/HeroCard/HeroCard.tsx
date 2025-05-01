import React from 'react';
import s from './heroCard.module.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type Props = {
  path: string;
};

export const HeroCard: React.FC<Props> = ({ path }) => {
  const { t } = useTranslation();
  return (
    <div className={s.card}>
      <div>
        <div className={s.cardText}>
          <h2 className={s.cardTitle}>
            {t('heroCard.available')}
            <br />
            {t('heroCard.inStore')}
          </h2>
        </div>
        <p className={s.text}>{t('heroCard.beFirst')}</p>
      </div>
      <Link to={path} className={s.button}>
        {t('heroCard.orderNow')}
      </Link>
    </div>
  );
};

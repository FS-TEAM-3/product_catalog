import React from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import styles from './_styles.module.scss';
import { parseSlug } from '@/utils/parseSlug';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SLUG_TO_CSS_COLOR } from '@/constants/colors';
import { useTranslation } from 'react-i18next';

type Params = { slug: string };
type Props = { colors: string[] };

export const ColorSelector: React.FC<Props> = ({ colors }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const category = pathname.split('/')[1];
  const { slug = '' } = useParams<Params>();
  const navigate = useNavigate();

  const formattedColors = colors.map(c =>
    c.trim().toLowerCase().replace(/\s+/g, '-'),
  );

  const { itemId: baseId, capacity, color: colorFromUrl } = parseSlug(slug);

  const slugColorFromUrl = colorFromUrl?.trim().toLowerCase() || '';

  const selected = formattedColors.includes(slugColorFromUrl)
    ? slugColorFromUrl
    : formattedColors[0];

  const handleValueChange = (value: string) => {
    navigate(`/${category}/${baseId}-${capacity}-${value}`, {
      replace: true,
    });
  };

  return (
    <div className={styles.selectorContainer}>
      <span className={styles.label}>{t('itemCard.colors')}</span>
      <ToggleGroup.Root
        type="single"
        className={styles.featureContainer}
        value={selected}
        onValueChange={handleValueChange}
      >
        {formattedColors.map(c => (
          <ToggleGroup.Item
            key={c}
            value={c}
            className={`${styles.colorToggle} ${selected === c ? styles.active : ''}`}
          >
            <div
              className={styles.colorCircle}
              style={{ backgroundColor: SLUG_TO_CSS_COLOR[c] }}
            />
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  );
};

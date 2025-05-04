import styles from './_styles.module.scss';
import { TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

type Props = {
  category: string;
  value: string;
  onChange: (value: string) => void;
};

export const SearchField: React.FC<Props> = ({ category, value, onChange }) => {
  const { t } = useTranslation();

  const trueNameCategory = useMemo(() => {
    switch (category) {
      case 'phones':
        return t('navbar.phones');
      case 'tablets':
        return t('navbar.tablets');
      case 'accessories':
        return t('navbar.accessories');
      default:
        return 'Unknown Category';
    }
  }, [category, t]);

  return (
    <div className={styles.search}>
      <label className={styles.search__label}>
        {t('search.label')} {trueNameCategory.toLocaleLowerCase()}
      </label>
      <TextField.Root
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={t('search.search')}
        className={styles.search__field}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
    </div>
  );
};

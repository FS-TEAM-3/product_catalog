// components/GenericSelect.tsx
import * as Select from '@radix-ui/react-select';

import styles from './_styles.module.scss';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  isBig?: boolean;
};

export const Dropdown: React.FC<Props> = ({
  label,
  options,
  value,
  onChange,
  isBig,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${isBig ? styles.dropdown__big : ''} ${styles.dropdown}`}>
      <label className={styles.dropdown__label}>{label}</label>
      <Select.Root
        value={value}
        onValueChange={onChange}
        onOpenChange={setOpen}
      >
        <Select.Trigger className={styles.selectTrigger}>
          <Select.Value />
          <Select.Icon>
            {open ? (
              <ChevronUp size={16} color="hsla(206, 12%, 74%, 1)" />
            ) : (
              <ChevronDown size={16} color="hsla(206, 12%, 74%, 1)" />
            )}
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={4}
            className={styles.selectContent}
          >
            <Select.Viewport>
              {options.map(({ label, value }) => (
                <Select.Item
                  className={styles.selectItem}
                  key={value}
                  value={value}
                >
                  <Select.ItemText>{label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

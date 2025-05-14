import { useThemeStore } from '@/store/useThemeStore';
import { Moon, Sun } from 'lucide-react';
import styles from './_styles.module.scss';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className={styles.themeBtn}
      aria-label="Toggle Theme"
    >
      {theme === 'light-theme' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

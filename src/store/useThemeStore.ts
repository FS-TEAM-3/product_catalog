import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light-theme' | 'dark-theme';

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: (localStorage.getItem('theme') as Theme) || 'dark-theme',
      toggleTheme: () => {
        const newTheme: Theme =
          get().theme === 'dark-theme' ? 'light-theme' : 'dark-theme';
        set({ theme: newTheme });
        document.documentElement.className = newTheme;
        localStorage.setItem('theme', newTheme);
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => state => {
        if (state) {
          document.documentElement.className = state.theme;
        }
      },
    },
  ),
);

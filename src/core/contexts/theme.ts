import { createContext } from 'react';
import configuration from '~/configuration';

type Theme = 'light' | 'dark';

export const ThemeContext = createContext<{
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
}>({
  theme: configuration.theme,
  setTheme: (_) => _,
});

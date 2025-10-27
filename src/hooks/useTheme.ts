import { useState, useEffect } from 'react';
import { getThemePreference, saveThemePreference } from '../utils/storage';

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => getThemePreference());

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    saveThemePreference(isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return { isDark, toggleTheme };
}


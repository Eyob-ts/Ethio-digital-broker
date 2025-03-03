import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ThemeProvider = ({ children }) => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return children;
};

export default ThemeProvider;

import { useDispatch, useSelector } from 'react-redux';
import { FaSun, FaMoon } from 'react-icons/fa';
import { toggleDarkMode } from '../redux/themeSlice';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <FaSun className="w-5 h-5 text-yellow-400" />
      ) : (
        <FaMoon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
};

export default ThemeToggle;

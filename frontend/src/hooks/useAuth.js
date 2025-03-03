import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice'; // Import your logout action

const useAuth = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    isAuthenticated: isLoggedIn,
    isAdmin: user?.role === "admin",
    user,
    logout: handleLogout, // Add the logout function
  };
};

export default useAuth;

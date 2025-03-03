import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Clean up local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Dispatch logout action
    dispatch(logout());
    
    // Show logout success toast
    toast.success("You have successfully logged out!");
    
    // Navigate to login page
    navigate('/login');
  }, [dispatch, navigate]);

  return null; // This component doesn't render anything
};

export default Logout;

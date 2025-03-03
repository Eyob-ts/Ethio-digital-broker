import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Input } from "@material-tailwind/react";
import axios from 'axios';
import { login as loginAction } from '../../redux/authSlice';
import { spiral } from 'ldrs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Register the spiral loader
spiral.register();

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors on submit attempt
    if (!validateEmail(formData.email)) {
      setErrors({ email: 'Please enter a valid email address.' });
      return; // Stop submission if email is invalid
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', formData);

      if (response.data.success) {
        dispatch(loginAction({ ...response.data.user, token: response.data.token }));

        toast.success("Login successful! Redirecting...");

        setTimeout(() => {
          if (response.data.user.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
        }, 1500);
      } else {
        toast.error(response.data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-400 via-indigo-50 to-indigo-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-lg flex items-center justify-center">
      <form
        className="p-8 bg-white dark:bg-gray-800 shadow-xl shadow-blue-600 dark:shadow-blue-900 rounded-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700 dark:text-white text-center font-robotoSlab">Login</h2>

        {/* Email Input */}
        <div className="mb-4">
          <Input
            variant="standard"
            label="Email"
            placeholder="Enter your Email"
            type="text"
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required
            className="dark:text-gray-200"
            labelProps={{ className: "dark:text-gray-200" }}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <Input
            variant="standard"
            label="Password"
            placeholder="Enter your password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="dark:text-gray-200"
            labelProps={{ className: "dark:text-gray-200" }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-br from-blue-900 to-blue-700 hover:scale-105 text-white py-2 rounded-md hover:brightness-110 flex items-center justify-center transition-all duration-200"
          disabled={loading}
        >
          {loading ? (
            <l-spiral size="20" speed="0.9" color="white"></l-spiral>
          ) : (
            'Login'
          )}
        </button>

        {/* Register Link */}
        <Link to='/register'>
          <label className='flex justify-end mt-3 text-blue-500 dark:text-blue-400 cursor-pointer hover:text-blue-800 dark:hover:text-blue-300 transition-all'>
            I don't have an account
          </label>
        </Link>
      </form>
    </div>
  );
};

export default Login;


// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux";
// import { Input } from "@material-tailwind/react";
// import axios from 'axios';
// import { login as loginAction } from '../../redux/authSlice';
// import { spiral } from 'ldrs';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Register the spiral loader
// spiral.register();

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.post('http://localhost:3000/api/auth/login', formData);

//       if (response.data.success) {
//         dispatch(loginAction({ ...response.data.user, token: response.data.token }));

//         toast.success("Login successful! Redirecting...");

//         setTimeout(() => {
//           if (response.data.user.role === 'admin') {
//             navigate('/admin/dashboard');
//           } else {
//             navigate('/');
//           }
//         }, 1500);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-indigo-400 via-indigo-50 to-indigo-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-lg flex items-center justify-center">
//       <form
//         className="p-8 bg-white dark:bg-gray-800 shadow-xl shadow-blue-600 dark:shadow-blue-900 rounded-md w-full max-w-md"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-2xl font-bold mb-6 text-gray-700 dark:text-white text-center font-robotoSlab">Login</h2>

//         <div className="mb-4">
//           <Input
//             variant="standard"
//             label="Email"
//             placeholder="Enter your Email"
//             type="text"
//             name="email" 
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="dark:text-gray-200"
//             labelProps={{ className: "dark:text-gray-200" }}
//           />
//         </div>

//         <div className="mb-4">
//           <Input
//             variant="standard"
//             label="Password"
//             placeholder="Enter your password"
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="dark:text-gray-200"
//             labelProps={{ className: "dark:text-gray-200" }}
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-gradient-to-br from-blue-900 to-blue-700 hover:scale-105 text-white py-2 rounded-md hover:brightness-110 flex items-center justify-center transition-all duration-200"
//           disabled={loading}
//         >
//           {loading ? (
//             <l-spiral size="20" speed="0.9" color="white"></l-spiral>
//           ) : (
//             'Login'
//           )}
//         </button>

//         <Link to='/register'>
//           <label className='flex justify-end mt-3 text-blue-500 dark:text-blue-400 cursor-pointer hover:text-blue-800 dark:hover:text-blue-300 transition-all'>
//             I don't have an account
//           </label>
//         </Link>
//       </form>
//     </div>
//   );
// };

// export default Login;

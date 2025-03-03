import { useState } from "react";
import { Input } from "@material-tailwind/react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [message, setMessage] = useState(""); 
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation (must be a valid Gmail address)
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email must be a valid Gmail address.";
    }

    // Phone validation (must start with 09, 07, +2519, or +2517)
    const phoneRegex = /^(09|07|\+2519|\+2517)\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must start with 09, 07, +2519, or +2517 and be followed by 7 digits.";
    }

    // Password validation (minimum 6 characters)
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If there are no errors, return true
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Prevent form submission if there are validation errors
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", formData);

      setMessage(response.data.message); 
      setFormData({ name: "", email: "", phone: "", password: "" }); 

      if (response.data.success) {
        toast.success("Registration successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
      setMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-400 via-indigo-50 to-indigo-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
      <form
        className="p-8 rounded-lg bg-white dark:bg-gray-800 shadow-2xl shadow-blue-600 dark:shadow-blue-900 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl text-center mb-6 text-gray-500 dark:text-gray-300 font-robotoSlab">Register</h2>
        
        {message && (
          <div
            className={`mb-4 p-2 text-center text-white rounded ${
              message.includes("successfully") ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}
        
        <div className="mb-4">
          <Input
            variant="standard"
            label="Full Name"
            placeholder="Enter your full name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="dark:text-gray-200"
            labelProps={{ className: "dark:text-gray-200" }}
          />
        </div>

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

        <div className="mb-4">
          <Input
            variant="standard"
            label="Phone Number"
            placeholder="Enter your phone number"
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="dark:text-gray-200"
            labelProps={{ className: "dark:text-gray-200" }}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

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
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-br from-blue-900 to-blue-700 hover:scale-105 text-white font-robotoMono py-2 rounded-md hover:bg-blue-400"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;


// import { useState } from "react";
// import { Input } from "@material-tailwind/react";
// import axios from "axios"; 
// import { useNavigate } from "react-router-dom"; 
// import { toast } from "react-toastify"; // Importing toast
// import "react-toastify/dist/ReactToastify.css"; // Importing the CSS for the toast

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const [message, setMessage] = useState(""); 
//   const navigate = useNavigate(); 

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:3000/api/auth/signup", formData);

//       setMessage(response.data.message); 
//       setFormData({ name: "", email: "", phone: "", password: "" }); // Clear form

//       // Show success toast if registration is successful
//       if (response.data.success) {
//         toast.success("Registration successful! Redirecting...");
//         setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
//       }
//     } catch (error) {
//       // Show error toast in case of an error
//       toast.error(error.response?.data?.message || "An error occurred. Please try again.");
//       setMessage(error.response?.data?.message || "An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-indigo-400 via-indigo-50 to-indigo-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
//       <form
//         className="p-8 rounded-lg bg-white dark:bg-gray-800 shadow-2xl shadow-blue-600 dark:shadow-blue-900 w-full max-w-md"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-3xl text-center mb-6 text-gray-500 dark:text-gray-300 font-robotoSlab">Register</h2>
        
//         {/* Display message */}
//         {message && (
//           <div
//             className={`mb-4 p-2 text-center text-white rounded ${
//               message.includes("successfully") ? "bg-green-500" : "bg-red-500"
//             }`}
//           >
//             {message}
//           </div>
//         )}
        
//         {/* Full Name */}
//         <div className="mb-4">
//           <Input
//             variant="standard"
//             label="Full Name"
//             placeholder="Enter your full name"
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="dark:text-gray-200"
//             labelProps={{
//               className: "dark:text-gray-200"
//             }}
//           />
//         </div>

//         {/* Email */}
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
//             labelProps={{
//               className: "dark:text-gray-200"
//             }}
//           />
//         </div>

//         {/* Phone */}
//         <div className="mb-4">
//           <Input
//             variant="standard"
//             label="Phone Number"
//             placeholder="Enter your phone number"
//             type="number"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//             className="dark:text-gray-200"
//             labelProps={{
//               className: "dark:text-gray-200"
//             }}
//           />
//         </div>

//         {/* Password */}
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
//             labelProps={{
//               className: "dark:text-gray-200"
//             }}
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-gradient-to-br from-blue-900 to-blue-700 hover:scale-105 text-white font-robotoMono py-2 rounded-md hover:bg-blue-400"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;

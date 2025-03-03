// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import AccessDenied from "../AccessDenied";

// const ProtectedCustomerRoute = ({ children }) => {
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   const user = useSelector((state) => state.auth.user);
//   const isCustomer = user?.role === "customer";
//   const isAdmin = user?.role === "admin";

//   // Redirect to login if not authenticated
//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   // Redirect admins to the admin dashboard if they try to access customer routes
//   if (isAdmin) {
//     return <Navigate to="/access-denied" replace />;
//   }

//   // Show access denied if not a customer (e.g., if it's another role)
//   if (!isCustomer) {
//     return <AccessDenied />;
//   }

//   // Return the protected content if the user is a valid customer
//   return children;
// };

// export default ProtectedCustomerRoute;
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import AccessDenied from "../AccessDenied";

// const ProtectedCustomerRoute = ({ children }) => {
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   const user = useSelector((state) => state.auth.user);
//   const isCustomer = user?.role === "customer";
//   const isAdmin = user?.role === "admin";

//   // Redirect to login if not authenticated
//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   // Show access denied if the user is an admin
//   if (isAdmin) {
//     return <Navigate to="/access-denied" replace />;
//   }

//   // Show access denied if the user is not a customer
//   if (!isCustomer) {
//     return <Navigate to="/access-denied" replace />;
//   }

//   // Return the protected content if the user is a valid customer
//   return children;
// };

// export default ProtectedCustomerRoute;

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AccessDenied from "../AccessDenied";

const ProtectedCustomerRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const isCustomer = user?.role === "customer";
  const isAdmin = user?.role === "admin";

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Redirect admins to access denied if they try to access customer routes
  if (isAdmin) {
    return <Navigate to="/access-denied" replace />;
  }

  // Redirect non-customers to access denied
  if (!isCustomer) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default ProtectedCustomerRoute;
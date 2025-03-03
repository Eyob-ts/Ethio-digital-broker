// import { Navigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import AccessDenied from "../AccessDenied";

// const ProtectedRoute = ({ children, adminOnly = false }) => {
//   const { user } = useSelector((state) => state.auth);
//   const location = useLocation();

//   // If no user is logged in, redirect to login
//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   // Redirect admins to admin dashboard if they try to access the home page
//   if (user.role === "admin" && location.pathname === "/") {
//     return <Navigate to="/admin/dashboard" replace />;
//   }

//   // For admin routes, check if user is admin
//   if (adminOnly && user.role !== "admin") {
//     return <AccessDenied />;
//   }

//   return children;
// };

// export default ProtectedRoute;
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AccessDenied from "../AccessDenied";

const ProtectedRoute = ({ children, adminOnly }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === "admin";

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Redirect admins to access denied if they try to access the home page
  if (isAdmin && window.location.pathname === "/") {
    return <Navigate to="/access-denied" replace />;
  }

  // Redirect customers to access denied if they try to access admin routes
  if (adminOnly && !isAdmin) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default ProtectedRoute;
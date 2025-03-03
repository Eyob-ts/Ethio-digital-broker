import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from "./components/navbar"

import Home from "./pages/home"
import Login from "./api/auth/login"
import Register from "./api/auth/register"
import Logout from "./api/auth/logout"
import AddListing from "./pages/AddListings"
import EditUser from "./pages/Admin/EditUsers"
import EditListing from "./pages/Admin/EditListing"
import ListingDetailsPage from "./pages/ListingDetailsPage"
import Messages from "./pages/DashboardHome.jsx/Messages"
import AccessDenied from "./components/AccessDenied"
import CustomerProfile from "./pages/CustomerProfile"
import ThemeProvider from './components/ThemeProvider'
import wsService from './services/websocket'
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute"
import ProtectedCustomerRoute from "./components/ProtectedRoute/ProtectedCustomerRoute"
//import CustomerDashboard from "./pages/CustomerDashboard"
import AdminLayout from './components/admin/adminLayout';
//import AdminUsers from './components/admin/AdminUsers';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './pages/Admin/UserManagement';
import DashboardLayout from './components/customerDashboard/DashboardLayout';
import Listings from './pages/Admin/Listing';
import AdminReport from './pages/Admin/AdminReport';
import MyListings from './pages/DashboardHome.jsx/MyListings';
import EditCustomerList from './components/Listing/EditCustomerList';
import Review from './pages/DashboardHome.jsx/Review';
import PaymentCallback from './components/Payment/PaymentCallback';
import VerifyOwner from './components/verifyOwner';
import AdminUsers from './pages/Admin/AdminUser';
import VerifyOwnerPage from './pages/Admin/VerifyOwnerPage';
import ListingDetails from './pages/Admin/ListingDetails';
import NotFound from './components/NotFound';
import About from './components/About';
//import Contact from './components/Contact';

// Route guard component
const AuthRedirect = () => {
  const { user } = useSelector((state) => state.auth);
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user?.role === "admin") {
    return <Navigate to="/admin" />;
  } else {
    return <Navigate to="/customer/dashboard" />;
  }
};

function App() {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Connect WebSocket when user is logged in
    if (user) {
      wsService.connect();
    } else {
      wsService.disconnect();
    }

    // Cleanup on unmount
    return () => {
      wsService.disconnect();
    };
  }, [user]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Router>
          <Navbar />
          
          
          <ToastContainer />
          <Routes>
          
            
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/about" element={<About />} /> 
            {/* <Route path="/contact" element={<Contact/>}/> */}
            <Route path="/login" element={<Login/>}/>
            <Route path="/listings/getbyid/:id" element={<ListingDetailsPage/>}/>
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="/logout" element={<Logout />} />
            
            {/* Protected Routes */}
            <Route
              path="/addlisting"
              element={
                <ProtectedCustomerRoute>
                  <AddListing />
                </ProtectedCustomerRoute>
              }
            />
            
            <Route path="/verify-owner" element={

              <ProtectedCustomerRoute>
              <VerifyOwner/>
              </ProtectedCustomerRoute>
            }
            />

            {/* Protected Customer Routes */}
           

<Route
  path="/customer/*"
  element={
    <ProtectedCustomerRoute>
      <DashboardLayout /> {/* DashboardLayout must include an <Outlet /> */}
    </ProtectedCustomerRoute>
  }
>
  {/* Nested Routes */}
  <Route path="verify-owner" element={<VerifyOwner />} />
  <Route path="dashboard" element={<div>Your Dashboard Content Here</div>} />
  <Route path="profile" element={<CustomerProfile />} />
  <Route path="users/edit/:userId" element={<EditUser />} />
  <Route path="messages" element={<Messages />} />
  <Route path="my-listings/:userId" element={<MyListings />} />
  <Route path="review" element={<Review />} />
  <Route path="updatelist/:listingId" element={<EditCustomerList />} />
  <Route path="payment-callback" element={<PaymentCallback />} />
  <Route path="addlisting" element={<AddListing />} />
  <Route path="*" element={<NotFound/>} />
</Route>


            {/* Protected Admin Routes */}
            <Route path="/admin/*" element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <Routes>
                    <Route index element={<Navigate to="dashboard" />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="user-management" element={<UserManagement />} />
                    <Route path="users/edit/:userId" element={<EditUser />} />
                    <Route path="listings" element={<Listings />} />
                    <Route Path="getbyid/:listingId" element={ListingDetails}/>
                    <Route path="listings/:listingId" element={<ListingDetails />} />
                    <Route path="listings/edit/:listingId" element={<EditListing/>} />
                    <Route path="verify-owner/:listingId" element={<VerifyOwnerPage />} />
                    <Route path="reports" element={<AdminReport />} />
                    <Route path="*" element={<NotFound/>} />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            } />

            {/* Auth Redirect */}
            <Route path="/auth-redirect" element={<AuthRedirect />} />

            {/* Catch all */}
            <Route path="*" element={<NotFound/>} />
          </Routes>
          
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;

import { Link, Navigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Button, Typography, Container, Box } from '@mui/material';

const AccessDenied = () => {
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === 'admin';

  if (isAdmin) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return (
    <Container
      component="main"
      maxWidth="sm"
      className="min-h-screen flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <FaLock className="text-6xl text-red-500" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Typography variant="h3" className="text-3xl font-bold text-gray-800 mb-4">
            Access Denied
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Typography variant="body1" className="text-gray-600 mb-6">
            Sorry, you don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="space-x-4"
        >
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            className="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Go Home
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="secondary"
            className="inline-block px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Login
          </Button>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default AccessDenied;
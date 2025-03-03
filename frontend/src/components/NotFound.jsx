import React from 'react';
import { motion } from 'framer-motion';
import { Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container
      className="flex flex-col justify-center items-center h-screen"
      maxWidth="sm"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h1" className="text-4xl font-bold mb-4">
          404 - Page Not Found
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Typography variant="body1" className="mt-4">
          The page you are looking for does not exist.
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          className="mt-6"
        >
          Go back to Home
        </Button>
      </motion.div>
    </Container>
  );
};

export default NotFound;
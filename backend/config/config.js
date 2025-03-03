import dotenv from 'dotenv';
dotenv.config();

export default {
  jwt: {
    secret: process.env.JWT_SECRET || 'your-jwt-secret'
  },
  server: {
    port: process.env.PORT || 5000
  },
  mongodb: {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/ethio_digital_broker'
  }
};
 
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col items-center justify-center px-6">
      {/* Hero Section */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400">
          About Ethio Digital Broker
        </h1>
        <p className="mt-4 text-lg max-w-2xl">
          We are a leading digital platform for house selling, renting, car sales, construction services, and more. Our goal is to connect buyers and sellers in Ethiopia with ease.
        </p>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="mt-12 grid md:grid-cols-3 gap-6 w-full max-w-5xl"
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1, delay: 0.5 }}
      >
        {[
          { title: "Buy & Sell", description: "Easily buy or sell houses and cars with verified owners." },
          { title: "Verified Listings", description: "We ensure that all property listings are checked for authenticity." },
          { title: "Easy Communication", description: "Our platform provides direct messaging between buyers and sellers." }
        ].map((feature, index) => (
          <motion.div 
            key={index} 
            className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{feature.title}</h3>
            <p className="mt-2">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.div 
        className="mt-12"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 1 }}
      >
        <Link to="/register">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300">
            Get Started
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default About;

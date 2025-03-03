import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Contact = () => {
  const [name, setName] = useState(""); // State to store the user's name
  const [email, setEmail] = useState(""); // State to store the user's email
  const [message, setMessage] = useState(""); // State to store the contact message
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(""); // State for error messages

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setError("Please fill out all fields.");
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/api/contact/submit`,
        { name, email, message },
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Your message has been sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
      setError("");
    } catch (err) {
      setError("Failed to send message. Please try again.");
      toast.error("Failed to send message. Please try again.");
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen"
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white font-robotoSlab">
        Contact Us
      </h1>

      {/* Error Message */}
      {error && <p className="text-red-500 dark:text-red-400 mb-4 font-oxygen">{error}</p>}

      {/* Contact Form */}
      <motion.form
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <label htmlFor="name" className="text-lg font-semibold text-gray-900 dark:text-white font-robotoSlab">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border dark:border-gray-600 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-oxygen"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="text-lg font-semibold text-gray-900 dark:text-white font-robotoSlab">
            Your Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border dark:border-gray-600 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-oxygen"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="text-lg font-semibold text-gray-900 dark:text-white font-robotoSlab">
            Your Message
          </label>
          <textarea
            id="message"
            rows="4"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-2 border dark:border-gray-600 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-oxygen"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-br from-blue-900 to-blue-700 text-white px-6 py-2 rounded hover:brightness-110 transition-all duration-200 font-oxygen"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </motion.form>
    </motion.div>
  );
};

export default Contact;

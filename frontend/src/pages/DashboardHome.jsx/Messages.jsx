import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux"; // Import useSelector from Redux
import { motion } from "framer-motion"; // Import Framer Motion
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Messages = () => {
  const user = useSelector((state) => state.user); // Get the logged-in user from Redux
  const [messages, setMessages] = useState([]); // State to store messages
  const [newMessage, setNewMessage] = useState(""); // State for the new message input
  const [receiverId, setReceiverId] = useState(""); // State for the selected receiver's ID
  const [users, setUsers] = useState([]); // State to store the list of users
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(""); // State for error messages

  // Fetch messages and users when the component mounts
  useEffect(() => {
    fetchMessages();
    fetchUsers();
  }, []);

  // Function to fetch messages
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/messages/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      setMessages(response.data.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch messages. Please try again.");
      toast.error("Failed to fetch messages. Please try again.");
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch the list of users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/auth/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      setUsers(response.data.data);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
      toast.error("Failed to fetch users. Please try again.");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to send a new message
  const handleSendMessage = async () => {
    if (!newMessage || !receiverId) {
      setError("Please select a recipient and enter a message.");
      toast.error("Please select a recipient and enter a message.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/api/messages/send`,
        { receiver: receiverId, message: newMessage },
        { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
      );
      setMessages([response.data.data, ...messages]); // Add the new message to the list
      setNewMessage(""); // Clear the input field
      setReceiverId(""); // Clear the receiver selection
      setError("");
      toast.success("Message sent successfully!");
    } catch (err) {
      setError("Failed to send message. Please try again.");
      toast.error("Failed to send message. Please try again.");
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to mark a message as read
  const handleMarkAsRead = async (messageId) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/messages/${messageId}/read`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
      );
      console.log("Message marked as read:", response.data);
      // Update the message in the state
      const updatedMessages = messages.map((msg) =>
        msg._id === messageId ? { ...msg, read: true } : msg
      );
      setMessages(updatedMessages);
      toast.success("Message marked as read.");
    } catch (err) {
      setError("Failed to mark message as read. Please try again.");
      toast.error("Failed to mark message as read. Please try again.");
      console.error("Error marking message as read:", err);
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
        Messages
      </h1>

      {/* Error Message */}
      {error && <p className="text-red-500 dark:text-red-400 mb-4 font-oxygen">{error}</p>}

      {/* New Message Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white font-robotoSlab">
          Send a New Message
        </h2>
        <div className="flex space-x-4">
          {/* Dropdown to select receiver */}
          <select
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            className="p-2 border dark:border-gray-600 rounded w-1/3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-oxygen"
          >
            <option value="">Select a recipient</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="p-2 border dark:border-gray-600 rounded w-2/3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-oxygen"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className="bg-gradient-to-br from-blue-900 to-blue-700 text-white px-4 py-2 rounded hover:brightness-110 transition-all duration-200 font-oxygen"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </motion.div>

      {/* Messages List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white font-robotoSlab">
          Your Messages
        </h2>
        {loading ? (
          <p className="text-gray-700 dark:text-gray-300 font-oxygen">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300 font-oxygen">No messages found.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`p-4 border dark:border-gray-600 rounded ${
                  msg.read
                    ? "bg-white dark:bg-gray-800"
                    : "bg-blue-50 dark:bg-blue-900"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 font-oxygen">
                      <span className="font-semibold">
                        {msg.sender === user?.id ? "You" : "Sender"}
                      </span>
                      : {msg.message}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-oxygen">
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {!msg.read && msg.receiver === user?.id && (
                    <button
                      onClick={() => handleMarkAsRead(msg._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors font-oxygen"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Messages;
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux"; // Import useSelector from Redux

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// const Messages = () => {
//   const user = useSelector((state) => state.user); // Get the logged-in user from Redux
//   const [messages, setMessages] = useState([]); // State to store messages
//   const [newMessage, setNewMessage] = useState(""); // State for the new message input
//   const [receiverId, setReceiverId] = useState(""); // State for the selected receiver's ID
//   const [users, setUsers] = useState([]); // State to store the list of users
//   const [loading, setLoading] = useState(false); // State for loading indicator
//   const [error, setError] = useState(""); // State for error messages

//   // Fetch messages and users when the component mounts
//   useEffect(() => {
//     fetchMessages();
//     fetchUsers();
//   }, []);

//   // Function to fetch messages
//   const fetchMessages = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${API_URL}/api/messages/all`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
//       });
//       setMessages(response.data.data);
//       setError("");
//     } catch (err) {
//       setError("Failed to fetch messages. Please try again.");
//       console.error("Error fetching messages:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to fetch the list of users
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${API_URL}/api/auth/users`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
//       });
//       setUsers(response.data.data);
//     } catch (err) {
//       setError("Failed to fetch users. Please try again.");
//       console.error("Error fetching users:", err);
//     } finally {
//       setLoading(false);
//     }
//   };
//  // console.log("Auth token:", localStorage.getItem("authToken"));
//   // Function to send a new message
//   const handleSendMessage = async () => {
//     if (!newMessage || !receiverId) {
//       setError("Please select a recipient and enter a message.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.post(
//         `${API_URL}/api/messages/send`,
//         { receiver: receiverId, message: newMessage },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
//       );
//       setMessages([response.data.data, ...messages]); // Add the new message to the list
//       setNewMessage(""); // Clear the input field
//       setReceiverId(""); // Clear the receiver selection
//       setError("");
//     } catch (err) {
//       setError("Failed to send message. Please try again.");
//       console.error("Error sending message:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to mark a message as read
//   const handleMarkAsRead = async (messageId) => {
//     try {
//       const response = await axios.patch(
//         `${API_URL}/api/messages/${messageId}/read`,
//         {},
//         { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
//       );
//       console.log("Message marked as read:", response.data);
//       // Update the message in the state
//       const updatedMessages = messages.map((msg) =>
//         msg._id === messageId ? { ...msg, read: true } : msg
//       );
//       setMessages(updatedMessages);
//     } catch (err) {
//       setError("Failed to mark message as read. Please try again.");
//       console.error("Error marking message as read:", err);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Messages</h1>

//       {/* Error Message */}
//       {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}

//       {/* New Message Form */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Send a New Message</h2>
//         <div className="flex space-x-4">
//           {/* Dropdown to select receiver */}
//           <select
//             value={receiverId}
//             onChange={(e) => setReceiverId(e.target.value)}
//             className="p-2 border dark:border-gray-600 rounded w-1/3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//           >
//             <option value="">Select a recipient</option>
//             {users.map((user) => (
//               <option key={user._id} value={user._id}>
//                 {user.name} ({user.role})
//               </option>
//             ))}
//           </select>
//           <input
//             type="text"
//             placeholder="Type your message..."
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             className="p-2 border dark:border-gray-600 rounded w-2/3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
//           />
//           <button
//             onClick={handleSendMessage}
//             disabled={loading}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
//           >
//             {loading ? "Sending..." : "Send"}
//           </button>
//         </div>
//       </div>

//       {/* Messages List */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Your Messages</h2>
//         {loading ? (
//           <p className="text-gray-700 dark:text-gray-300">Loading messages...</p>
//         ) : messages.length === 0 ? (
//           <p className="text-gray-700 dark:text-gray-300">No messages found.</p>
//         ) : (
//           <div className="space-y-4">
//             {messages.map((msg) => (
//               <div
//                 key={msg._id}
//                 className={`p-4 border dark:border-gray-600 rounded ${
//                   msg.read 
//                     ? "bg-white dark:bg-gray-800" 
//                     : "bg-blue-50 dark:bg-blue-900"
//                 }`}
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <p className="text-gray-700 dark:text-gray-300">
//                       <span className="font-semibold">
//                         {msg.sender === user?.id ? "You" : "Sender"}
//                       </span>
//                       : {msg.message}
//                     </p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       {new Date(msg.createdAt).toLocaleString()}
//                     </p>
//                   </div>
//                   {!msg.read && msg.receiver === user?.id && (
//                     <button
//                       onClick={() => handleMarkAsRead(msg._id)}
//                       className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                     >
//                       Mark as Read
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Messages;
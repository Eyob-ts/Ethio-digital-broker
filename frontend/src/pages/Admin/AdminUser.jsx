import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddUserModal from "./AddUserModal";
import { spiral } from 'ldrs';
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchUsers = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    try {
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
      const response = await axios.get("http://localhost:3000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (err) {
      setError(err.message);
      setError("Failed to fetch users.");
      toast.error("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (userId, newRole) => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.put(
        `http://localhost:3000/api/admin/${userId}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(users.map(user => (user._id === userId ? { ...user, role: newRole } : user)));
      toast.success("User role updated successfully!");
    } catch (error) {
      console.error("Error updating role", error);
      toast.error("Failed to update user role. Please try again.");
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen  ">
        {/* Replace the existing spinner with l-spiral */}
        <l-spiral
          size="40"
          speed="0.9"
          color="blue"
        ></l-spiral>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  const handleBanToggle = async (userId, isBanned) => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.put(
        `http://localhost:3000/api/admin/${userId}/ban`,
        { isBanned: !isBanned },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(users.map(user => (user._id === userId ? { ...user, isBanned: !isBanned } : user)));
      toast.success(`User ${!isBanned ? "banned" : "unbanned"} successfully!`);
    } catch (error) {
      console.error("Error updating ban status", error);
      toast.error("Failed to update ban status. Please try again.");
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-900">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="flex justify-between mb-2">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 font-robotoSlab">User Management</h1>

      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-400"
      >
        Add User
      </button>
      </div>

      {showModal && <AddUserModal setShowModal={setShowModal} fetchUsers={fetchUsers} />}

      <input
        type="text"
        placeholder="Search users..."
        className="p-2 border rounded mb-4 w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 font-oxygen"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading && <p className="text-gray-900 dark:text-gray-100 font-robotoMono">Loading users...</p>}
      {error && <p className="text-red-500 font-robotoMono">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-800">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left text-gray-900 dark:text-gray-100 font-robotoSlab">Name</th>
                <th className="p-3 text-left text-gray-900 dark:text-gray-100 font-robotoSlab">Email</th>
                <th className="p-3 text-left text-gray-900 dark:text-gray-100 font-robotoSlab">Role</th>
                <th className="p-3 text-left text-gray-900 dark:text-gray-100 font-robotoSlab">Status</th>
                <th className="p-3 text-left text-gray-900 dark:text-gray-100 font-robotoSlab">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-b dark:border-gray-700">
                  <td className="p-3 text-gray-900 dark:text-gray-100 font-oxygen">{user.name}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100 font-oxygen">{user.email}</td>
                  <td className="p-3">
                    <select
                      className="border p-1 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 font-oxygen"
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      
                    </select>
                  </td>
                  <td className="p-3 text-gray-900 dark:text-gray-100 font-oxygen">{user.isBanned ? "Banned" : "Active"}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleBanToggle(user._id, user.isBanned)}
                      className={`px-3 py-1 rounded text-white font-oxygen ${user.isBanned ? "bg-green-500" : "bg-red-500"}`}
                    >
                      {user.isBanned ? "Unban" : "Ban"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;


// todo import { useState, useEffect } from "react";
// import axios from "axios";

// const AdminUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState("");
//   useEffect(() => {
//     const fetchUsers = async () => {  
//         const token = localStorage.getItem("authToken");
//       try {
//         if (!token) {
//           throw new Error("No token found. Please log in.");
//         }
//         const response = await axios.get("http://localhost:3000/api/admin/users", {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Include the token in the request headers
//               },
//         });
//         setUsers(response.data);
//       } catch (err) {
//         setError(err.message);
//         setError("Failed to fetch users.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleRoleChange = async (userId, newRole) => {
//     try {
//       await axios.put(
//         `http://localhost:3000/api/admin/${userId}/role`,
//         { role: newRole },
//         { headers: {
//             Authorization: `Bearer ${token}`, // Include the token in the request headers
//           }, }
//       );
//       setUsers(users.map(user => (user._id === userId ? { ...user, role: newRole } : user)));
//     } catch (error) {
//       console.error("Error updating role", error);
//     }
//   };

//   const handleBanToggle = async (userId, isBanned) => {
//     try {
//       await axios.put(
//         `http://localhost:3000/api/admin/${userId}/ban`,
//         { isBanned: !isBanned },
//         { headers: {
//             Authorization: `Bearer ${token}`, // Include the token in the request headers
//           }, }
//       );
//       setUsers(users.map(user => (user._id === userId ? { ...user, isBanned: !isBanned } : user)));
//     } catch (error) {
//       console.error("Error updating ban status", error);
//     }
//   };

//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(search.toLowerCase()) ||
//     user.email.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">User Management</h1>
//       <input
//         type="text"
//         placeholder="Search users..."
//         className="p-2 border rounded mb-4 w-full"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       {loading && <p>Loading users...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {!loading && !error && (
//         <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Email</th>
//               <th className="p-3 text-left">Role</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user) => (
//               <tr key={user._id} className="border-b">
//                 <td className="p-3">{user.name}</td>
//                 <td className="p-3">{user.email}</td>
//                 <td className="p-3">
//                   <select
//                     className="border p-1 rounded"
//                     value={user.role}
//                     onChange={(e) => handleRoleChange(user._id, e.target.value)}
//                   >
//                     <option value="user">User</option>
//                     <option value="admin">Admin</option>
//                     <option value="moderator">Moderator</option>
//                   </select>
//                 </td>
//                 <td className="p-3">{user.isBanned ? "Banned" : "Active"}</td>
//                 <td className="p-3">
//                   <button
//                     onClick={() => handleBanToggle(user._id, user.isBanned)}
//                     className={`px-3 py-1 rounded ${user.isBanned ? "bg-green-500" : "bg-red-500"} text-white`}
//                   >
//                     {user.isBanned ? "Unban" : "Ban"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

//export default AdminUsers;

//  import { useState, useEffect } from "react";
// import axios from "axios";
// const AdminUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//         const token = localStorage.getItem("authToken");
//       try {
//         const response = await axios.get("http://localhost:3000/api/admin/users", {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Include the token in the request headers
//               },
//         });
        
//         setUsers(response.data);
//       } catch (err) {
//         setError(err.message);
//         setError("Failed to fetch users.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">User Management</h1>
//       {loading && <p>Loading users...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {!loading && !error && (
//         <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Email</th>
//               <th className="p-3 text-left">Role</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id} className="border-b">
//                 <td className="p-3">{user.name}</td>
//                 <td className="p-3">{user.email}</td>
//                 <td className="p-3">{user.role}</td>
//                 <td className="p-3">{user.isBanned ? "Banned" : "Active"}</td>
//                 <td className="p-3">
//                   <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
//                   <button className={`px-3 py-1 rounded ${user.isBanned ? "bg-green-500" : "bg-red-500"} text-white`}>
//                     {user.isBanned ? "Unban" : "Ban"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// !export default AdminUsers;

// ! import { useState, useEffect } from "react";
// import axios from "axios";

// const AdminUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//         const token = localStorage.getItem("authToken");
//       try {
//         const response = await axios.get("http://localhost:3000/api/admin/users", {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Include the token in the request headers
//               },
//         });
//         setUsers(response.data);
//       } catch (err) {
//         setError(err.message);
//         setError("Failed to fetch users.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleRoleChange = async (userId, newRole) => {
//     const token = localStorage.getItem("authToken");
//     try {
//       await axios.put(
//         `http://localhost:3000/api/admin/${userId}/role`,
//         { role: newRole },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the token in the request headers
//           },
//         }
//       );
//       setUsers(users.map(user => (user._id === userId ? { ...user, role: newRole } : user)));
//     } catch (error) {
//       console.error("Error updating role", error);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">User Management</h1>
//       {loading && <p>Loading users...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {!loading && !error && (
//         <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Email</th>
//               <th className="p-3 text-left">Role</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id} className="border-b">
//                 <td className="p-3">{user.name}</td>
//                 <td className="p-3">{user.email}</td>
//                 <td className="p-3">
//                   <select
//                     className="border p-1 rounded"
//                     value={user.role}
//                     onChange={(e) => handleRoleChange(user._id, e.target.value)}
//                   >
//                     <option value="user">User</option>
//                     <option value="admin">Admin</option>
                    
//                   </select>
//                 </td>
//                 <td className="p-3">{user.isBanned ? "Banned" : "Active"}</td>
//                 <td className="p-3">
//                   <button className={`px-3 py-1 rounded ${user.isBanned ? "bg-green-500" : "bg-red-500"} text-white`}>
//                     {user.isBanned ? "Unban" : "Ban"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminUsers;


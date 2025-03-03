import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // Import Framer Motion
import Card from "../../components/admin/Card";
import LineChartComponent from "../../components/admin/LineChart";
import RecentActivities from "../../components/admin/RecentActivities";
import { spiral } from "ldrs";
spiral.register();

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalListings: 0,
    pendingApprovals: 0,
  });
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve the token from local storage

        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        // Fetch metrics
        const metricsResponse = await axios.get("http://localhost:3000/api/admin/metrics", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });
        setMetrics(metricsResponse.data);

        // Fetch user growth data
        const userGrowthResponse = await axios.get("http://localhost:3000/api/admin/user-growth", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });
        setUserGrowthData(userGrowthResponse.data || []);

        // Fetch recent activities
        const activitiesResponse = await axios.get("http://localhost:3000/api/admin/recent-activities", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });
        setRecentActivities(activitiesResponse.data || []);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message || "Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <l-spiral size="40" speed="0.9" color="gray"></l-spiral>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500 font-oxygen">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-50 min-h-screen"
    >
      <h1 className="text-3xl font-bold mb-8 font-robotoSlab text-gray-800">
        Dashboard
      </h1>

      {/* Metric Cards */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <Card
          title="Total Users"
          value={metrics.totalUsers}
          icon="👤"
          className="hover:shadow-lg transition-shadow"
        />
        <Card
          title="Total Listings"
          value={metrics.totalListings}
          icon="🏠"
          className="hover:shadow-lg transition-shadow"
        />
        <Card
          title="Pending Approvals"
          value={metrics.pendingApprovals}
          icon="⏳"
          className="hover:shadow-lg transition-shadow"
        />
      </motion.div>

      {/* User Growth Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <h2 className="text-xl font-semibold mb-4 font-oxygen text-gray-800">
          User Growth
        </h2>
        <LineChartComponent data={userGrowthData} />
      </motion.div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4 font-oxygen text-gray-800">
          Recent Activities
        </h2>
        <RecentActivities data={recentActivities} />
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Card from "../../components/admin/Card";
// import LineChartComponent from "../../components/admin/LineChart";
// import RecentActivities from "../../components/admin/RecentActivities";
// //import { Card, LineChart, RecentActivities } from "../../components/admin"; 
// import { spiral } from 'ldrs';
// spiral.register();
// const Dashboard = () => {
//   const [metrics, setMetrics] = useState({
//     totalUsers: 0,
//     totalListings: 0,
//     pendingApprovals: 0,
//   });
//   const [userGrowthData, setUserGrowthData] = useState([]);
//   const [recentActivities, setRecentActivities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("authToken"); // Retrieve the token from local storage
    
//         if (!token) {
//           throw new Error("No token found. Please log in.");
//         }
    
//         // Fetch metrics
//         const metricsResponse = await axios.get("http://localhost:3000/api/admin/metrics", {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the token in the request headers
//           },
//         });
//         setMetrics(metricsResponse.data);
    
//         // Fetch user growth data
//         const userGrowthResponse = await axios.get("http://localhost:3000/api/admin/user-growth", {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the token in the request headers
//           },
//         });
//         setUserGrowthData(userGrowthResponse.data || []);
    
//         // Fetch recent activities
//         const activitiesResponse = await axios.get("http://localhost:3000/api/admin/recent-activities", {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the token in the request headers
//           },
//         });
//         setRecentActivities(activitiesResponse.data || []);
//       } catch (error) {
//         console.error("Fetch error:", error);
//         setError(error.message || "Failed to fetch data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen  ">
//         {/* Replace the existing spinner with l-spiral */}
//         <l-spiral
//           size="40"
//           speed="0.9"
//           color="gray"
//         ></l-spiral>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="p-6 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

//       {/* Metric Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <Card title="Total Users" value={metrics.totalUsers} icon="👤" />
//         <Card title="Total Listings" value={metrics.totalListings} icon="🏠" />
//         <Card title="Pending Approvals" value={metrics.pendingApprovals} icon="⏳" />
//       </div>

//       {/* Charts */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-xl font-semibold mb-4">User Growth</h2>
//         <LineChartComponent data={userGrowthData} />
//       </div>

//       {/* Recent Activities */}
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
//         <RecentActivities data={recentActivities} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

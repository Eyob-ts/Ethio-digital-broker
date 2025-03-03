import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/admin/Card";
import LineChartComponent from "../../components/admin/LineChart";
import RecentActivities from "../../components/admin/RecentActivities";
//import { Card, LineChart, RecentActivities } from "../../components/admin"; 
import { spiral } from 'ldrs';
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
        // Fetch metrics
        const metricsResponse = await axios.get("http://localhost:3000/api/admin/metrics");
        setMetrics(metricsResponse.data);

        // Fetch user growth data
        const userGrowthResponse = await axios.get("http://localhost:3000/api/admin/user-growth");
        setUserGrowthData(userGrowthResponse.data || []);

        // Fetch recent activities
        const activitiesResponse = await axios.get("http://localhost:3000/api/admin/recent-activities");
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
      <div className="flex justify-center items-center h-screen  ">
        {/* Replace the existing spinner with l-spiral */}
        <l-spiral
          size="40"
          speed="0.9"
          color="gray"
        ></l-spiral>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Total Users" value={metrics.totalUsers} icon="👤" />
        <Card title="Total Listings" value={metrics.totalListings} icon="🏠" />
        <Card title="Pending Approvals" value={metrics.pendingApprovals} icon="⏳" />
      </div>

      {/* Charts */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">User Growth</h2>
        <LineChartComponent data={userGrowthData} />
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <RecentActivities data={recentActivities} />
      </div>
    </div>
  );
};

export default Dashboard;

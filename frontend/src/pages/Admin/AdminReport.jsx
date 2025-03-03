import  { useEffect, useState } from "react";
import { FaUsers, FaHome, FaExclamationCircle } from "react-icons/fa"; // Example icons
import Card from "../../components/admin/Card"; // Your custom card component
import { spiral } from 'ldrs';
spiral.register();
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const AdminReport = () => {
  const [reportData, setReportData] = useState(null);
const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/report`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        if (data.success) setReportData(data.data);
      } catch (error) {
        
        setError(error.message);
        setError("Error fetching report:");
      } finally {
        setLoading(false);
      }
      }
    
    fetchReport(); 
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
    return (
      <div className="p-6 text-red-500 text-center">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }
//   if (!reportData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Admin Reports</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Users" value={reportData.totalUsers} icon={<FaUsers />}>
          <p className="text-sm">Detailed info about users...</p>
        </Card>
        <Card title="Total Listings" value={reportData.totalListings} icon={<FaHome />}>
          <p className="text-sm">Detailed info about listings...</p>
        </Card>
        <Card title="Total Reports" value={reportData.totalReports} icon={<FaExclamationCircle />}>
          <p className="text-sm">Detailed info about reports...</p>
        </Card>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-bold mb-4">Overview</h3>
        {/* Chart will go here */}
      </div>
    </div>
  );
};

export default AdminReport;

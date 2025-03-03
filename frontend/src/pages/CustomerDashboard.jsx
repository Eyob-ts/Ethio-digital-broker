
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Welcome back, {user?.name || 'Customer'}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Messages Card */}
          <Link to="/customer/messages" className="block">
            <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">Messages</h3>
              <p className="text-gray-600 dark:text-gray-300">View and manage your conversations</p>
            </div>
          </Link>

          {/* Profile Card */}
          <Link to="/customer/profile" className="block">
            <div className="bg-green-50 dark:bg-gray-700 p-6 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-green-600 dark:text-green-400">Profile</h3>
              <p className="text-gray-600 dark:text-gray-300">Update your personal information</p>
            </div>
          </Link>

          {/* My Listings Card */}
          <Link to="/customer/my-listings" className="block">
            <div className="bg-purple-50 dark:bg-gray-700 p-6 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-purple-600 dark:text-purple-400">My Listings</h3>
              <p className="text-gray-600 dark:text-gray-300">Manage your property listings</p>
            </div>
          </Link>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Activity</h2>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-300">No recent activity to display.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

const RecentActivities = ({ data }) => {
    // If data is not an array, default to an empty array
    const activities = Array.isArray(data) ? data : [];
  
    return (
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Activity</th>
            <th className="text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td>{activity.description}</td>
              <td>{activity.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default RecentActivities;
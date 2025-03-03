const Card = ({ title, value, icon }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <span className="text-2xl">{icon}</span>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Card;
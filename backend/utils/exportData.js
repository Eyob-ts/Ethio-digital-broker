import { Parser } from "json2csv";

// Function to convert user data to CSV
const toCSV = (data) => {
  const fields = [
    "_id",
    "name",
    "email",
    "role",
    "status",
    "createdAt",
  ];

  const opts = { fields };

  try {
    const parser = new Parser(opts);
    const csv = parser.parse(data);
    return csv;
  } catch (error) {
    throw new Error("Failed to convert data to CSV.");
  }
};

// Default export
export default toCSV;
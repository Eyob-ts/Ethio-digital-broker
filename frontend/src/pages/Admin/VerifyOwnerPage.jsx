import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const VerifyOwnerPage = () => {
  const { listingId } = useParams();  // Get listingId from URL
  const [verificationDocuments, setVerificationDocuments] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Fetch the verification documents when the page loads
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/listings/${listingId}/verify-owner`);
        setVerificationDocuments(response.data.data);
        setStatus(response.data.status || "pending");
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch verification documents.");
        setLoading(false);
      }
    };
    fetchDocuments();
  }, [listingId]);

  // Handle status change when admin clicks a button
  const handleStatusChange = async (newStatus) => {
    try {
      await axios.put(`${API_URL}/api/admin/listings/${listingId}/verify-owner/status`, { status: newStatus });
      setStatus(newStatus);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update verification status.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Verification Documents</h2>
      {verificationDocuments.length === 0 ? (
        <p>No verification documents available for this listing.</p>
      ) : (
        <div className="my-4">
          {verificationDocuments.map((doc, index) => (
            <div key={index} className="mb-4">
              {doc.url.endsWith(".pdf") ? (
                <embed src={doc.url} type="application/pdf" width="100%" height="500px" />
              ) : (
                <img src={doc.url} alt={`Verification Document ${index + 1}`} className="max-w-full max-h-96" />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="my-4">
        <h3>Status: <span className={`text-${status === 'approved' ? 'green' : status === 'rejected' ? 'red' : 'yellow'}-500`}>{status}</span></h3>
      </div>

      <div className="space-x-4">
        <button
          onClick={() => handleStatusChange("approved")}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Approve
        </button>
        <button
          onClick={() => handleStatusChange("rejected")}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Reject
        </button>
        <button
          onClick={() => handleStatusChange("pending")}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md"
        >
          Set to Pending
        </button>
      </div>
    </div>
  );
};

export default VerifyOwnerPage;

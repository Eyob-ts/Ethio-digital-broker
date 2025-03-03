import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // To get the listingId from the URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const VerifyOwner = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { listingId } = useParams(); // Get the listingId from the URL

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setError("");
  };

  // Handle file upload
  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select at least one file to upload.");
      return;
    }

    if (!listingId) {
      setError("Listing ID is missing. Please try again.");
      return;
    }

    setIsUploading(true);
    setError("");
    setSuccessMessage("");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post(
        `${API_URL}/api/listings/verifyOwner/${listingId}`, // Correct endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add authorization token
          },
        }
      );

      setUploadedFiles(response.data.data);
      setFiles([]);
      setSuccessMessage("Files uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        err.response?.data?.error || "Failed to upload files. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Owner Verification</h1>

        {/* File Upload Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Files (JPEG, PNG, or PDF)
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-sm mt-2">{successMessage}</p>
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={isUploading || files.length === 0}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isUploading ? "Uploading..." : "Upload Files"}
        </button>

        {/* Uploaded Files Section */}
        {uploadedFiles.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Uploaded Files</h2>
            <div className="space-y-4">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                >
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Public ID:</span> {file.public_id}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">URL:</span>{" "}
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {file.url}
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyOwner;
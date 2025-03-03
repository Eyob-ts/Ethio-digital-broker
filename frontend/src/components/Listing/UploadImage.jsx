import { useState } from "react";
import { storage } from "../../Firebase/firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UploadImage = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!image) return;

    const storageRef = ref(storage, `listings/${Date.now()}-${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at:", downloadURL);
        onImageUpload(downloadURL); // Pass the URL to the parent component
        setImage(null);
        setProgress(0);
      }
    );
  };

  return (
    <div className="upload-container">
      <input type="file" onChange={handleFileChange} />
      {progress > 0 && <p>Uploading: {progress.toFixed(2)}%</p>}
      <button onClick={handleUpload} disabled={!image}>
        Upload Image
      </button>
    </div>
  );
};

export default UploadImage;

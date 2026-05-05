import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import axiosClient from "@/Utils/axiosClient";
import { useState,useEffect } from "react";
import axios from "axios";
import MainLayout from "./MainLayout";

export default function AdminUpload() {
  const { problemId } = useParams();

  const { register, handleSubmit, reset, setValue } = useForm();

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
  register("video");
}, [register]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setUploadProgress(0);

      const videoFile = data.video?.[0];

      if (!videoFile) {
        alert("Please select a video file");
        return;
      }

      //  Step 1: Get signature from backend
      const signatureRes = await axiosClient.get(`/video/create/${problemId}`);

      const {
        timestamp,
        signature,
        api_key,
        cloud_name,
        upload_url,
        public_id,
      } = signatureRes.data;

      //  Step 2: Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", videoFile);
      formData.append("api_key", api_key);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("public_id", public_id);


      // upload directly to cloudinary
      // axios :- axios client 3000 wale pr data bhejta hai + header uska json hota hai isliye use axios here
      const uploadRes = await axios.post(upload_url,formData , {
        headers:{
            'Content-Type':'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
            const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
            );

            setUploadProgress(percent);
        }
      });

      const uploadData = uploadRes.data;

      if (!uploadData.secure_url) {
        throw new Error("Upload failed");
      }

      // Step 4: Save metadata to backend
      const metaData = await axiosClient.post("/video/save", {
        problemId,
        cloudinaryPublicId: uploadData.public_id,
        secureURL: uploadData.secure_url,
        duration: uploadData.duration,

        editorial: {
          intuition: data.intuition,
          approach: data.approach,
          algorithm: data.algorithm,
          timeComplexity: data.timeComplexity,
          spaceComplexity: data.spaceComplexity,
        },
      });

      alert("Video uploaded successfully ");
      reset();
    } 
    catch (err) {
      console.error(err);

      const message =
        err.response?.data?.error ||   // backend custom error
        err.response?.data?.message || // fallback
        err.message ||                 // axios error
        "Something went wrong";

      alert(message);
    } 
    finally {
          setLoading(false);
      }
  };

  return (
    <MainLayout showFooter={false}>
        <div className="min-h-screen text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold text-center">
          Upload Video Solution
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Video File */}
            <div className="space-y-2">

            {/* Hidden Input */}
            <input
                type="file"
                accept="video/*"
                id="videoUpload"
                className="hidden"
                disabled={loading}
                onChange={(e) => {
                    const file = e.target.files[0];

                    if (!file) return;

                    if (file.size > 100 * 1024 * 1024) {
                    alert("Max file size is 100MB");
                    e.target.value = "";
                    setSelectedFile(null);
                    setValue("video", null);
                    return;
                    }

                    setSelectedFile(file);

                    // important: give file to react-hook-form
                    setValue("video", e.target.files);
                }}
                />

            {/* Custom Button */}
            <label
                htmlFor="videoUpload"
                className="block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl cursor-pointer hover:bg-white/20 transition text-gray-300"
            >
                {selectedFile ? "Change Video" : "Choose Video File"}
            </label>

            {/* File Info */}
            {selectedFile ? (
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-gray-300">
                <p>
                    <span className="text-gray-400">Name:</span> {selectedFile.name}
                </p>
                <p>
                    <span className="text-gray-400">Size:</span>{" "}
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                </div>
            ) : (
                <p className="text-xs text-gray-500">
                Max file size: 100MB
                </p>
            )}
            </div>

          {/* Editorial Fields */}

          <textarea
            placeholder="Intuition"
            {...register("intuition")}
            className="w-full p-3 bg-white/10 border border-white/20 rounded"
          />

          <textarea
            placeholder="Approach"
            {...register("approach")}
            className="w-full p-3 bg-white/10 border border-white/20 rounded"
          />

          <textarea
            placeholder="Algorithm"
            {...register("algorithm")}
            className="w-full p-3 bg-white/10 border border-white/20 rounded"
          />

          <input
            placeholder="Time Complexity (e.g. O(n))"
            {...register("timeComplexity")}
            className="w-full p-3 bg-white/10 border border-white/20 rounded"
          />

          <input
            placeholder="Space Complexity (e.g. O(1))"
            {...register("spaceComplexity")}
            className="w-full p-3 bg-white/10 border border-white/20 rounded"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                {/* Spinner */}
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                {/* Text */}
                <span>{uploadProgress}% Uploading...</span>
              </>
            ) : (
              "Upload Video"
            )}
          </button>

        </form>
      </div>
    </div>
    </MainLayout>
  );
}
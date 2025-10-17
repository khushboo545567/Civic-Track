import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ReportIssue() {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    address: "",
    postImage: null,
    postVideo: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      const response = await axios.post(
        "https://civic-track-260d.onrender.com/api/v1/post/report-issue",
        data,
        { withCredentials: true }
      );

      if (
        response.data.statusCode === 200 ||
        response.data.statusCode === 201
      ) {
        toast.success("Issue reported successfully!");
        setFormData({
          category: "",
          title: "",
          description: "",
          address: "",
          postImage: null,
          postVideo: null,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while reporting the issue.");
    }
  };

  return (
    <div className="flex justify-center py-16 px-4 bg-gray-50 min-h-screen">
      <div className="bg-white border border-gray-200 shadow-lg rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Report an Issue 🧾
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          encType="multipart/form-data"
        >
          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 focus:ring-2 focus:ring-amber-400 px-4 py-3 rounded-xl outline-none text-gray-700"
          >
            <option value="">Select Category</option>
            <option value="streetlight">Streetlight</option>
            <option value="road">Road</option>
          </select>

          {/* Title */}
          <input
            type="text"
            placeholder="Enter issue title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 focus:ring-2 focus:ring-amber-400 px-4 py-3 rounded-xl outline-none text-gray-700"
          />

          {/* Description */}
          <textarea
            placeholder="Describe the issue..."
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="border border-gray-300 focus:ring-2 focus:ring-amber-400 px-4 py-3 rounded-xl outline-none text-gray-700 resize-none"
          />

          {/* Address */}
          <textarea
            placeholder="Enter the address or location"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="border border-gray-300 focus:ring-2 focus:ring-amber-400 px-4 py-3 rounded-xl outline-none text-gray-700 resize-none"
          />

          {/* File Upload */}
          <div className="flex flex-col gap-3">
            {/* Image Upload */}
            <label className="cursor-pointer bg-amber-50 border border-dashed border-amber-300 px-4 py-3 rounded-xl text-gray-600 hover:bg-amber-100 transition text-center">
              Upload Image
              <input
                type="file"
                name="postImage"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {formData.postImage && (
              <p className="text-sm text-green-600 text-center">
                📸 {formData.postImage.name}
              </p>
            )}

            {/* Video Upload */}
            <label className="cursor-pointer bg-amber-50 border border-dashed border-amber-300 px-4 py-3 rounded-xl text-gray-600 hover:bg-amber-100 transition text-center">
              Upload Video
              <input
                type="file"
                name="postVideo"
                accept="video/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {formData.postVideo && (
              <p className="text-sm text-blue-600 text-center">
                🎥 {formData.postVideo.name}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-orange-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl mt-2 transition-all shadow-md hover:shadow-lg"
          >
            Report Issue
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportIssue;

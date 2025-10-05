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
      data.append("category", formData.category);
      data.append("title", formData.title);
      data.append("address", formData.address);
      data.append("description", formData.description);
      if (formData.postImage) data.append("postImage", formData.postImage);
      if (formData.postVideo) data.append("postVideo", formData.postVideo);

      console.log(data);
      const response = await axios.post(
        "http://localhost:3000/api/v1/post/report-issue",
        data,
        { withCredentials: true }
      );
      console.log(response?.data);
      if (response.data.statusCode == 200 || response.data.statusCode == 201) {
        toast.success("issue is reported sussfully");
      }
      return;
    } catch (error) {
      console.error(error);
      toast.error("something went wrong while reporting the issue");
      return;
    }
  };
  return (
    <div className="w-full flex justify-center pt-10">
      <div className="flex flex-col gap-6 w-[400px] border border-gray-400 rounded-2xl px-8 py-14">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3"
          encType="multipart/form-data"
        >
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="outline-none border px-6 py-2 rounded-2xl"
          >
            <option value="">Select Category</option>
            <option value="streetlight">Streetlight</option>
            <option value="road">Road</option>
          </select>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="outline-none border px-6 py-2 rounded-2xl"
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="outline-none border px-6 py-2 rounded-2xl"
          />
          <textarea
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="4"
            className="outline-none border px-6 py-3 rounded-2xl resize-none"
          />
          {/* file upload */}
          <label className="cursor-pointer bg-gray-100 border px-6 py-3 rounded-2xl text-gray-600 hover:bg-gray-200">
            Upload Image
            <input
              type="file"
              name="postImage"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <label className="cursor-pointer bg-gray-100 border px-6 py-3 rounded-2xl text-gray-600 hover:bg-gray-200">
            Upload Video
            <input
              type="file"
              name="postVideo"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <button
            type="submit"
            className="bg-black text-white py-2 rounded-2xl mt-4"
          >
            Report Issue
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportIssue;

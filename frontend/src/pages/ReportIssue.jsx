import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ReportIssue() {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    address: "",
    postImage: "",
    postVedio: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (error) {}
  };
  return (
    <div className="w-full flex justify-center mt-10 pt-15">
      <div className="flex flex-col gap-6 w-[400px] border border-gray-400 rounded-2xl px-8 py-14">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <select>
            <option value="">Street Light</option>
            <option value="">Road</option>
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
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="outline-none border px-6 py-2 rounded-2xl"
          />
          <input type="file" placeholder="Image" />
          <input type="file" placeholder="Vedio" />
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

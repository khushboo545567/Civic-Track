import React from "react";

function Filter({ filter, setFilter }) {
  const handlechange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-full flex justify-center mt-3">
      <div className="flex gap-6 bg-white shadow-md rounded-xl p-4 border border-gray-200">
        {/* Category Filter */}
        <div className="flex flex-col">
          <select
            name="category"
            value={filter.category}
            onChange={handlechange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          >
            <option value="">Catogery</option>
            <option value="streetlight">Street Light</option>
            <option value="road">Road</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col">
          <select
            name="status"
            value={filter.status}
            onChange={handlechange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          >
            <option value="">Status</option>
            <option value="reported">Reported</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filter;

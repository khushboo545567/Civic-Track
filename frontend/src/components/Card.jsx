import React from "react";
import { useNavigate } from "react-router-dom";

function Card({
  _id,
  title,
  address,
  category,
  status,
  description,
  postImage,
  createdAt,
}) {
  const navigate = useNavigate();
  const formattedDate = new Date(createdAt).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      onClick={() => navigate(`/card/${_id}`)}
      className="border border-gray-300 rounded-2xl p-6 w-[350px] flex gap-4 flex-col cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
    >
      <img
        src={postImage}
        alt="Image of civic issue"
        className="w-[350px] h-[120px] object-cover rounded-t-lg"
      />

      {/* Category - Status - Date Row */}
      <div className="flex justify-between items-center">
        <span className="bg-amber-300 px-3 py-1 rounded-full text-sm font-medium text-gray-800">
          {category}
        </span>

        {/* ✅ Styled Status Badge */}
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            status === "resolved"
              ? "bg-green-100 text-green-700"
              : status === "in progress"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>

        <span className="text-sm text-gray-600">{formattedDate}</span>
      </div>

      {/* Title and Description */}
      <div>
        <div className="flex items-center gap-2 text-xl font-semibold">
          <span className="w-[13px] h-[13px] bg-amber-400 rounded-full"></span>
          <span>{title}</span>
        </div>
        <p className="text-gray-700 text-sm truncate">{description}</p>
      </div>

      {/* Address */}
      <div>
        <p className="text-end text-gray-500 text-sm italic">{address}</p>
      </div>
    </div>
  );
}

export default Card;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CardDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [Loading, setIsLoading] = useState(true);

  async function fetchCard() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/post/card-details/${id}`,
        {
          withCredentials: true,
        }
      );

      setPost(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch card details:", error.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCard();
  }, [id]);

  if (Loading) {
    return (
      <div className="min-h-screen flex justify-center items-center font-bold text-2xl">
        Loading Details.....
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Post not found !
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Image & Video Section */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={post.postImage}
            alt={post.title}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* Video (only if available) */}
        {post.postVideo && (
          <div className="w-full lg:w-1/2">
            <video
              src={post.postVideo}
              controls
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-md"
            ></video>
          </div>
        )}
      </div>

      {/* Status, Date, and Address */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-3 text-gray-700">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">Status:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              post.status === "resolved"
                ? "bg-green-100 text-green-700"
                : post.status === "in progress"
                ? "bg-blue-100 text-blue-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {post.status}
          </span>
        </div>

        <div className="text-sm sm:text-base text-gray-600">
          <strong>Date:</strong> {formattedDate}
        </div>

        <div className="text-sm sm:text-base text-gray-600">
          <strong>Address:</strong> {post.address}
        </div>
      </div>

      {/* Title & Description */}
      <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          {post.title}
        </h1>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          {post.description}
        </p>
      </div>
    </div>
  );
}
export default CardDetails;

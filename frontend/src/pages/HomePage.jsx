import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import Filter from "../components/Filter";

function HomePage() {
  const [posts, setPost] = useState([]);
  const [filter, setFilter] = useState({ category: "", status: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchedPost = async () => {
      try {
        const query = new URLSearchParams(filter).toString();
        const url = query
          ? `https://civic-track-e6hx.onrender.com/api/v1/post/filtered-posts?${query}`
          : "https://civic-track-e6hx.onrender.com/api/v1/post/get-allPosts";
        const response = await axios.get(url);
        setPost(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPost([]);
        setIsLoading(false);
      }
    };
    fetchedPost();
  }, [filter]);

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading ? (
        <div className="min-h-screen flex justify-center items-center text-2xl font-bold">
          Loading...
        </div>
      ) : (
        <>
          {/* Filter Section */}
          <div className="w-full flex justify-center fixed z-10 bg-gray-50">
            <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
              <Filter filter={filter} setFilter={setFilter} />
            </div>
          </div>

          {/* Posts Section */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-32">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 sm:mb-8 text-center">
              Latest Reported Issues 🚧
            </h2>

            {posts.length === 0 ? (
              <div className="flex justify-center items-center text-gray-500 py-20">
                <p className="text-base sm:text-lg">
                  No issues reported yet 🕊️
                </p>
              </div>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center">
                {posts.map((post) => (
                  <li key={post._id} className="flex justify-center w-full">
                    <Card
                      _id={post._id}
                      title={post.title}
                      address={post.address}
                      category={post.category}
                      status={post.status}
                      description={post.description}
                      postImage={post.postImage}
                      createdAt={post.createdAt}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;

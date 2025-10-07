import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/card";
import Filter from "../components/Filter";

function HomePage() {
  const [posts, setPost] = useState([]);
  const [filter, setFilter] = useState({ category: "", status: "" });
  useEffect(() => {
    const fetchedPost = async () => {
      try {
        // get teh query param
        const query = new URLSearchParams(filter).toString();
        const url = query
          ? `http://localhost:3000/api/v1/post/filtered-posts?${query}`
          : "http://localhost:3000/api/v1/post/get-allPosts";
        const response = await axios.get(url);
        setPost(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPost([]);
      }
    };
    fetchedPost();
  }, [filter]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Filter Section */}
      <div className="w-full   flex justify-center fixed z-10">
        <div className="max-w-6xl w-full px-6">
          <Filter filter={filter} setFilter={setFilter} />
        </div>
      </div>

      {/* Posts Section */}
      <div className="max-w-6xl mx-auto px-6 py-26">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Latest Reported Issues 🚧
        </h2>

        {posts.length === 0 ? (
          <div className="flex justify-center items-center text-gray-500 py-20">
            <p className="text-lg">No issues reported yet 🕊️</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {posts.map((post) => (
              <li
                key={post._id}
                className="transition-transform duration-300 hover:-translate-y-2"
              >
                <Card
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
    </div>
  );
}

export default HomePage;

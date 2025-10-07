import React, { useEffect, useState } from "react";
import axios from "axios";

function CardProfile({ title, status, postImage }) {
  return (
    <div className="border rounded-lg p-4 shadow-md w-64">
      <img
        src={postImage}
        alt={title}
        className="w-full h-40 object-cover rounded-md"
      />
      <p className="font-semibold mt-2">Title: {title}</p>
      <p>Status: {status}</p>
    </div>
  );
}

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/profile",
          { withCredentials: true }
        );
        setProfile(response.data.data.user);
        setPosts(response.data.data.posts || []); // assuming profile has posts
      } catch (error) {
        console.error("Cannot fetch user profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile)
    return (
      <p className="min-h-screen text-2xl font-bold flex justify-center items-center ">
        Loading profile...
      </p>
    );

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 py-10">
      <div className="mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold mb-2">User Details</h1>
        <div>
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Contact Number:</strong> {profile.phoneNo}
          </p>
          <p>
            <strong>Role:</strong> {profile.roles}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-8">
          Number of Posts: {posts.length}
        </h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {posts.map((post) => (
            <CardProfile
              key={post._id}
              title={post.title}
              status={post.status}
              postImage={post.postImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

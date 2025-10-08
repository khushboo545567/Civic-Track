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
      console.log(response.data.data);
      setPost(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log("error occur when data is fetching for card", error);
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

  return <div></div>;
}
export default CardDetails;

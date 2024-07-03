import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    api
      .get(`blogs/${id}/`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-4">
        {new Date(blog.date_created).toLocaleDateString()}
      </p>
      {blog.image && (
        <img
          src={`${blog.image}`}
          alt={blog.title}
          className="w-full h-64 object-cover mb-4"
        />
      )}
      {blog.video && (
        <video
          controls
          src={`http://localhost:8000${blog.video}`}
          className="w-full mb-4"
        />
      )}
      <p>{blog.content}</p>
    </div>
  );
}

export default BlogDetail;

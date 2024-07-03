import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import api from "../services/api";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    api
      .get("blogs/")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const blogSpring = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Blog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <animated.div
            key={blog.id}
            className="border p-4 rounded-lg shadow-lg"
            style={blogSpring}
          >
            <Link to={`/blog/${blog.id}`}>
              <h2 className="text-xl mb-2">{blog.title}</h2>
              {blog.image && (
                <img
                  src={`${blog.image}`}
                  alt={blog.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              )}
              <p className="text-gray-600 mt-2">
                {new Date(blog.date_created).toLocaleDateString()}
              </p>
            </Link>
          </animated.div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;

import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

const UserBlog = () => {
  const [blog, setBlog] = useState([]);

  const getUserBlog = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlog(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserBlog();
  }, []);
  return (
    <div>
      {blog && blog.length > 0 ? (
        blog.map((item) => (
          <BlogCard
            id={item._id}
            isUser={true}
            title={item.title}
            description={item.description}
            image={item.image}
            username={item.user.username}
            time={item.createdAt}
          />
        ))
      ) : (
        <h1>you Haven't Created blog yet</h1>
      )}
    </div>
  );
};

export default UserBlog;

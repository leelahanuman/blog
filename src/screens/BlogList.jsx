import React, { useEffect, useState } from "react";
// import './styles.css';
import BlogItem from "../components/BlogItem";
// import { blogList as blogs } from "../config/data";
import { useLocation, useNavigate } from "react-router-dom";

const BlogList = ({ blogs, setBlogs }) => {
  const navigate = useNavigate();
  const location = useLocation().pathname.slice(1);
  const [blog, setBlog] = useState(blogs);

  useEffect(() => {
    if (!localStorage.getItem("role")) {
      navigate("/auth/login");
    }
    if (location === "") {
      setBlog(blogs);
    } else {
      setBlog(
        blogs.filter((li) => li.category.toLowerCase().includes(location))
      );
    }
    // eslint-disable-next-line
  }, [location]);

  return (
    <>
      <div className="blogList-wrap">
        {blog &&
          blog.length > 0 &&
          blog.map((blo) => <BlogItem key={blo.id} blog={blo} blogs={blogs} setBlogs={setBlogs} />)}
      </div>
      {!blog ||
        (blog.length === 0 && (
          <p className="text-center mt-5">Trouble finding blogs</p>
        ))}
    </>
  );
};

export default BlogList;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
// import { blogList } from '../config/blogs';
import EmptyList from "../components/EmptyList";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Blog = ({ blogs, setBlogs }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    let blog = blogs.find((blog) => blog.id === parseInt(id));
    if (blog) {
      setBlog(blog);
    }
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate()
  const handleDelete=()=>{
    setBlogs(blogs.filter(blo=>blo.id !== blog.id))
    navigate('/');
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <Link className="blog-goBack" to="/">
          <span> &#8592;</span> <span>Go Back</span>
        </Link>
        {localStorage.getItem("role") &&
          localStorage.getItem("role") === "Moderator" && (
            <Button color="error" variant="outlined" sx={{ width: "auto" }} onClick={()=>handleDelete()}>
              Delete Blog
            </Button>
          )}
      </div>
      {blog ? (
        <div className="blog-wrap">
          <header>
            <p className="blog-date">
              Published by <b>{blog.authorName}</b> on {blog.createdAt}
            </p>
            <h1>{blog.title}</h1>
          </header>
          <img src={blog.cover} alt="cover" />
          <p className="blog-desc">{blog.description}</p>
        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default Blog;

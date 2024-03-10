import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Blog from "./screens/Blog";
import Header from "./components/Header";
import BlogList from "./screens/BlogList";
import Register from "./screens/Register";
import Login from "./screens/Login";
import { blogList } from "./config/blogs";
import PageNotFound from "./screens/PageNotFound";

const sections = [
  { title: "Academic", url: "academic" },
  { title: "Career", url: "career" },
  { title: "Campus", url: "campus" },
  { title: "Culture", url: "culture" },
  { title: "Local Community", url: "local" },
  { title: "Social", url: "social" },
  { title: "Sports", url: "sports" },
  { title: "Health and Wellness", url: "health" },
  { title: "Technology", url: "technology" },
  { title: "Travel", url: "travel" },
  { title: "Alumni", url: "alumni" },
];

const App = () => {
  const [blogs, setBlogs] = useState(blogList);
  const [disabledAccts,setDisabledAccts] = useState([]);
  return (
    <div className="app">
      <BrowserRouter>
        <Header
          title="WisdomNest"
          sections={sections}
          blogs={blogs}
          setBlogs={setBlogs}
          setDisabledAccts={setDisabledAccts}
        />
        <Routes>
          <Route path="/" exact element={<BlogList blogs={blogs} setBlogs={setBlogs} />} />
          <Route path="/academic" exact element={<BlogList blogs={blogs} setBlogs={setBlogs} />} />
          <Route path="/career" exact element={<BlogList blogs={blogs} setBlogs={setBlogs} />} />
          <Route path="/campus" exact element={<BlogList blogs={blogs} setBlogs={setBlogs} />} />
          <Route path="/culture" exact element={<BlogList blogs={blogs} setBlogs={setBlogs} />} />
          <Route path="/local" exact element={<BlogList blogs={blogs} setBlogs={setBlogs} />} />
          <Route path="/social" exact element={<BlogList blogs={blogs} setBlogs={setBlogs} />} />
          <Route path="/sports" exact element={<BlogList blogs={blogs} setBlogs={setBlogs} />} />
          <Route path="/health" exact element={<BlogList blogs={blogs} setBlogs={setBlogs} />} />
          <Route
            path="/technology"
            exact
            element={<BlogList blogs={blogs} setBlogs={setBlogs} />}
          />
          <Route path="/travel" exact element={<BlogList blogs={blogs} setBlogs={setBlogs} />} />
          <Route path="/alumni" exact element={<BlogList blogs={blogs} setBlogs={setBlogs} />} />
          <Route
            path="/blog/:id"
            element={<Blog blogs={blogs} setBlogs={setBlogs} />}
          />
          <Route path="/auth/login" element={<Login disabledAccts={disabledAccts} />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

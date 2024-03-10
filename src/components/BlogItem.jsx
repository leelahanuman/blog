import React, { useState } from "react";
import { Link } from "react-router-dom";
import Chip from "../components/Chip";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { login } from "../config/login";

const BlogItem = ({
  blog: {
    description,
    title,
    createdAt,
    authorName,
    authorAvatar,
    cover,
    category,
    id,
    likes,
    comments,
  },
  setBlogs,
  blogs,
}) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [comment, setComment] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const okay = {
      description,
      title,
      createdAt,
      authorName,
      authorAvatar,
      cover,
      category,
      id,
      likes,
      comments: [...comments, { user: id, comment }],
    };
    console.log(okay);
    const old = blogs.filter((blo) => blo.id !== id);
    setBlogs([...old, { okay }]);
    setComment("");
    console.log(blogs);
  };

  return (
    <div className="blogItem-wrap">
      <img className="blogItem-cover" src={cover} alt="cover" />
      <Chip label={category} />
      <h3>{title}</h3>
      <p className="blogItem-desc">{description}</p>
      <div className="d-flex justify-content-between mx-2">
        <p style={{ marginBottom: 0 }}>🩶 {likes}</p>
        <p
          style={{ marginBottom: 0, cursor: "pointer" }}
          onClick={handleClickOpen}
        >
          💬 {comments.length}
        </p>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          fullWidth
        >
          <DialogTitle id="responsive-dialog-title">
            Comments section
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div className="comments">
                {comments.length > 0 &&
                  comments.map((comment, index) => (
                    // <div key={index}>{comment.user} {comment.comment}</div>
                    <div key={index} className="d-flex">
                      <img
                        src={require("../assets/author.jpg")}
                        alt="author"
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          marginRight: 10,
                          marginBottom: 10,
                        }}
                      />
                      <div className="text-black">
                        <b>
                          {login.length > 0 &&
                            login.filter((user) => user.id === comment.user)[0]
                              .name}
                        </b>
                        <br />
                        {comment.comment}
                      </div>
                    </div>
                  ))}
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <input
                    placeholder="Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="comment-input"
                  />
                  <button
                    className="btn btn-primary my-2 w-auto position-absolute"
                    style={{right:'2%',top:'-3%'}}
                    type="submit"
                  >
                    Post
                  </button>
                </form>
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
      <footer>
        <div className="blogItem-author">
          <p style={{ fontSize: 13, color: "black" }}>
            Created by <b>{authorName}</b> on {createdAt}
          </p>
        </div>
        <Link className="blogItem-link" to={`/blog/${id}`}>
          ➝
        </Link>
      </footer>
    </div>
  );
};

export default BlogItem;

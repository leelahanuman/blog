import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { deepOrange } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { login } from "../config/login";

function Header(props) {
  const { sections, title, blogs, setBlogs, setDisabledAccts } = props;

  const [hide, setHide] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (!localStorage.getItem("role")) {
      setHide(true);
    } else {
      setHide(false);
    }
  }, [location]);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("role");
    navigate("/auth/login");
    location.reload();
  };

  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAddPost({
      id: Math.floor(Math.random() * 1000000),
      title: "",
      description: "",
      cover: "",
      authorName: "",
      createdAt: "",
      category: "",
      authorAvatar: require("../assets/author.jpg"),
      likes: 0,
      comments: [],
    });
  };

  const [addPost, setAddPost] = useState({
    id: Math.floor(Math.random() * 1000000),
    title: "",
    description: "",
    cover: "",
    authorName: "",
    createdAt: "",
    category: "",
    authorAvatar: require("../assets/author.jpg"),
    likes: 0,
    comments: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddPost({ ...addPost, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBlogs([...blogs, addPost]);
    setAddPost({
      id: Math.floor(Math.random() * 1000000),
      title: "",
      description: "",
      cover: "",
      authorName: "",
      createdAt: "Academic",
      category: "",
      authorAvatar: require("../assets/author.jpg"),
      likes: 0,
      comments: [],
    });
    handleClose();
    const path = addPost.category.toLowerCase();
    navigate(`/${path}`);
  };

  const [selectedSwitches, setSelectedSwitches] = useState([]);

  // Function to toggle the selected state of a switch
  const handleSwitchToggle = (id) => {
    setSelectedSwitches((prevSelectedSwitches) => {
      if (prevSelectedSwitches.includes(id)) {
        return prevSelectedSwitches.filter((switchId) => switchId !== id);
      } else {
        return [...prevSelectedSwitches, id];
      }
    });
  };

  const handleUpdate = () => {
    setShow(false);
    localStorage.setItem("selectedIds", selectedSwitches);
    setDisabledAccts(selectedSwitches);
  };

  const selectedIds = localStorage.getItem("selectedIds");
  const ids = selectedIds ? selectedIds.split(",") : [];

  return (
    <>
      {!hide && (
        <>
          <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Button size="small">Subscribe</Button>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              sx={{ flex: 1 }}
            >
              <Link to={"/"} style={{ color: "black", textDecoration: "none" }}>
                {title}
              </Link>
            </Typography>
            <Button
              sx={{ width: "auto" }}
              // color="secondary"
              className="mx-2"
              variant="outlined"
              size="small"
              onClick={handleClickOpen}
            >
              Create Post
            </Button>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Add a Blog"}
              </DialogTitle>
              <form onSubmit={handleSubmit}>
                <DialogContent>
                  <TextField
                    className={"my-2"}
                    fullWidth
                    label="Title"
                    variant="outlined"
                    value={addPost.title}
                    name="title"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <TextField
                    className={"my-2"}
                    fullWidth
                    label="Description"
                    variant="outlined"
                    value={addPost.description}
                    name="description"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <TextField
                    className={"my-2"}
                    fullWidth
                    // label="Date Published"
                    variant="outlined"
                    value={addPost.createdAt}
                    name="createdAt"
                    onChange={(e) => handleChange(e)}
                    required
                    type="date"
                  />
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Category"
                      name="category"
                      value={addPost.category}
                      onChange={(e) => handleChange(e)}
                    >
                      <MenuItem value="Academic">Academic</MenuItem>
                      <MenuItem value="Career">Career</MenuItem>
                      <MenuItem value="Campus">Campus</MenuItem>
                      <MenuItem value="Culture">Culture</MenuItem>
                      <MenuItem value="Local Community">
                        Local Community
                      </MenuItem>
                      <MenuItem value="Social">Social</MenuItem>
                      <MenuItem value="Sports">Sports</MenuItem>
                      <MenuItem value="Health and Wellness">
                        Health and Wellness
                      </MenuItem>
                      <MenuItem value="Technology">Technology</MenuItem>
                      <MenuItem value="Travel">Travel</MenuItem>
                      <MenuItem value="Alumni">Alumni</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    className={"my-2"}
                    fullWidth
                    label="Author Name"
                    variant="outlined"
                    value={addPost.authorName}
                    name="authorName"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <TextField
                    className={"my-2"}
                    fullWidth
                    label="Image link (https)"
                    variant="outlined"
                    value={addPost.cover}
                    name="cover"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    color="error"
                    sx={{ width: "auto" }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button color="success" sx={{ width: "auto" }} type="submit">
                    Confirm
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
            <a
              className="nav-link dropdown-toggle"
              href="/"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Avatar sx={{ bgcolor: deepOrange[500] }}>
                {localStorage.getItem("name") &&
                  localStorage.getItem("name").slice(0, 1).toUpperCase()}
              </Avatar>
            </a>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item">
                  {localStorage.getItem("name")}
                </Link>
              </li>
              <li>
                <Link className="dropdown-item">
                  {localStorage.getItem("email")}
                </Link>
              </li>
              <li>
                <Link className="dropdown-item">
                  {localStorage.getItem("role")}
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              {localStorage.getItem("role") &&
                localStorage.getItem("role") === "Administrator" && (
                  <>
                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={() => setShow(true)}
                      >
                        Manage Login Accounts
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                  </>
                )}
              <li>
                <Link
                  className="dropdown-item"
                  style={{ color: "red" }}
                  onClick={() => handleLogout()}
                >
                  Log Out
                </Link>
              </li>
            </ul>
          </Toolbar>
          <Toolbar
            component="nav"
            variant="dense"
            sx={{ justifyContent: "space-between", overflowX: "auto" }}
          >
            {sections.map((section) => (
              <div
                // color="inherit"
                // noWrap
                // variant="body2"
                // // href={section.url}
                // sx={{ p: 1, flexShrink: 0 }}
                key={section.title}
              >
                <Link to={section.url} style={{ color: "black" }}>
                  {section.title}
                </Link>
              </div>
            ))}
          </Toolbar>
        </>
      )}
      {show && (
        <Dialog open={show} onClose={() => setShow(false)} fullWidth>
          <DialogTitle>Manage Login Accounts</DialogTitle>
          <DialogContent>
            {login &&
              login.length > 0 &&
              login
                .filter((user) => user.role !== "Administrator")
                .map((user) => (
                  <Box
                  key={user.id}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>{user.name}</Typography>
                    <Switch
                      defaultChecked={
                        ids.length > 0 &&
                        ids.filter((acct) => acct === user.id.toString())
                          .length > 0
                          ? false
                          : true
                      }
                      onChange={() => handleSwitchToggle(user.id)}
                    />
                  </Box>
                ))}
          </DialogContent>
          <DialogActions>
            <Button
              color="error"
              sx={{ width: "auto" }}
              onClick={() => setShow(false)}
            >
              Close
            </Button>
            <Button sx={{ width: "auto" }} onClick={() => handleUpdate()}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default Header;

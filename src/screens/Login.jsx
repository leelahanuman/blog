import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../config/login";

const Login = ({ disabledAccts }) => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = login.filter((user) => user.email === details.email);
    if (data.length > 0 && data[0].password === details.password) {
      const selectedIds = localStorage.getItem("selectedIds");
      const ids = selectedIds ? selectedIds.split(",") : [];
      // console.log(ids,data[0].id.toString());
      if (
        ids.length > 0 &&
        ids.filter((acct) => acct === data[0].id.toString()).length > 0
      ) {
        alert("Invalid login credentials");
        return;
      }
      localStorage.setItem("name", data[0].name);
      localStorage.setItem("email", data[0].email);
      localStorage.setItem("password", data[0].password);
      localStorage.setItem("role", data[0].role);
      navigate("/");
    } else {
      alert("Invalid login credentials!");
    }
  };

  return (
    <div className="login">
      <div className="login-left"></div>
      <div className="log-sign-right">
        <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <h1 className="mb-4">Login to your account</h1>
          <Form.Group className="mb-4" style={{ textAlign: "left" }}>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              value={details.email}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-4" style={{ textAlign: "left" }}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              value={details.password}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Button type="submit">Login</Button>
          </Form.Group>
          <p>
            Don't have an account?{" "}
            <Link to="/auth/register">Create account</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;

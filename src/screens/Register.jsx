import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../config/login";

const Register = () => {
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (details.password === details.confirmPassword) {
      const data = login.filter((user) => user.email === details.email);
      if (data.length > 0) {
        alert("User with this email already exists!");
      } else {
        localStorage.setItem("name", details.username);
        localStorage.setItem("email", details.email);
        localStorage.setItem("password", details.password);
        localStorage.setItem("role", "Student");
        navigate("/");
      }
    } else {
      alert("passwords doesnot match");
    }
  };

  return (
    <div className="register">
      <div className="signin-left"></div>
      <div className="log-sign-right">
        <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <h1 className="mb-4">Create an account</h1>
          <Form.Group className="mb-4" style={{ textAlign: "left" }}>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              name="username"
              value={details.username}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
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

          <Form.Group className="mb-4" style={{ textAlign: "left" }}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              value={details.confirmPassword}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Button type="submit">Register</Button>
          </Form.Group>
          <p>
            Already have an account? <Link to="/auth/login">Login</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Register;

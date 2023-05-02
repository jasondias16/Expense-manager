import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useContext } from "react";
import userIdContext from "../context/userId/UserIdContex";

const Login = () => {
  const url = "http://localhost:3001/login";
  const [values, setvalues] = useState({
    email: "",
    password: "",
  });

  const id = useContext(userIdContext);

  const onChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handlelogin = (e) => {
    e.preventDefault();
    console.log("login btn was clicked");
    // console.log("login credentials", values);

    Axios.post(url, {
      email: values.email,
      password: values.password,
    })
      .then((res) => res.data)
      .then((response) => {
        if (response !== 0) {
          console.log(response);
          //   setUserId(response);
          id.setUserId(response);

          navigate("/expense-manager");
        } else {
          console.log(response);
          console.log("invalid credetials");

          document.getElementById("info").innerHTML =
            "Invalid Credetials. Please Check your Email-id and Password";
          document.getElementById("message").style.visibility = "visible";
        }
      });
  };

  const handlealert = () => {
    document.getElementById("message").style.visibility = "hidden";
  };
  return (
    <div>
      <div className="alert" id="message">
        <span className="closebtn" onClick={handlealert}>
          &times;
        </span>
        <span id="info"> this is a message from the server </span>
      </div>
      <form className="mt-3" method="POST" onSubmit={handlelogin}>
        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <input
            required
            type="email"
            id="form3Example3"
            value={values.email}
            name="email"
            onChange={onChange}
            className="form-control form-control-lg"
            placeholder="Enter a valid email address"
          />
          <label className="form-label" htmlFor="form3Example3">
            Email address
          </label>
        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-3">
          <input
            required
            type="password"
            id="form3Example4"
            name="password"
            value={values.password}
            onChange={onChange}
            className="form-control form-control-lg"
            placeholder="Enter password"
          />
          <label className="form-label" htmlFor="form3Example4">
            Password
          </label>
        </div>

        <div className="text-center text-lg-start mt-4 pt-2">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

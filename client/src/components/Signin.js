import React, { useState } from "react";
import "../styles/Signin.css";
import Axios from "axios";

function Signin() {
  const url = "http://localhost:3001/signup";

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(values);
    Axios.post(url, {
      fname: values.fname,
      lname: values.lname,
      email: values.email,
      password: values.password,
    }).then((res) => {
      console.log("res.data: " + res.data);
    });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  return (
    <div>
      <form method="POST" onSubmit={handleSubmit} className="mt-5">
        {/* <!-- 2 column grid layout with text inputs htmlFor the first and last names --> */}
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="form-outline">
              <input
                type="text"
                id="fname"
                name="fname"
                className="form-control"
                value={values.fname}
                onChange={onChange}
                autoFocus
              />
              <label className="form-label">First name</label>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="form-outline">
              <input
                type="text"
                id="lname"
                name="lname"
                value={values.lname}
                className="form-control"
                onChange={onChange}
              />
              <label className="form-label">Last name</label>
            </div>
          </div>
        </div>

        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <input
            type="email"
            id="email"
            className="form-control"
            name="email"
            value={values.email}
            onChange={onChange}
          />
          <label className="form-label">Email address</label>
        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
          <input
            type="password"
            id="password"
            className="form-control"
            name="password"
            value={values.password}
            onChange={onChange}
          />
          <label className="form-label">Password</label>
        </div>

        {/* <!-- Submit button --> */}
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default Signin;

import React, { useState } from "react";
import "../styles/Signin.css";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      // Notify the user the user
      if (res.data === 1) {
        toast.success("signed in successfully", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (res.data === 0) {
        //email already in use
        toast.warn("email already in use", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
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
      <form method="POST" onSubmit={handleSubmit} className="mt-3">
        {/* <!-- 2 column grid layout with text inputs htmlFor the first and last names --> */}
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="form-outline">
              <label className="form-label">First name</label>
              <input
                type="text"
                id="fname"
                name="fname"
                className="form-control"
                value={values.fname}
                onChange={onChange}
                autoFocus
                required
              />
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="form-outline">
              <label className="form-label">Last name</label>
              <input
                type="text"
                id="lname"
                name="lname"
                value={values.lname}
                className="form-control"
                onChange={onChange}
                required
              />
            </div>
          </div>
        </div>

        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <label className="form-label">Email address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            name="email"
            required
            value={values.email}
            onChange={onChange}
          />
        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            required
            id="password"
            className="form-control"
            name="password"
            value={values.password}
            onChange={onChange}
          />
        </div>

        {/* <!-- Submit button --> */}
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign up
        </button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Signin;

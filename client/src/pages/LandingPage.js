import React, { useState } from "react";
import "../styles/LandingPage.css";
import Login from "../components/Login";
import Signin from "../components/Signin";
function LandingPage() {
  const [login, setLogin] = useState(<Login />);

  const displayLogin = () => {
    document.getElementById("login").style.backgroundColor = "skyblue";
    document.getElementById("signin").style.backgroundColor = "white";
    document.getElementById("login").style.fontSize = "25px";

    document.getElementById("signin").style.fontSize = "16px";

    setLogin(<Login />);
  };
  const displaySignin = () => {
    document.getElementById("signin").style.backgroundColor = "skyblue";
    document.getElementById("login").style.backgroundColor = "white";
    document.getElementById("login").style.fontSize = "16px";

    document.getElementById("signin").style.fontSize = "25px";
    setLogin(<Signin />);
  };

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            {/* Log in Component or sign in component */}
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <nav className="nav nav-pills nav-justified">
                <button
                  style={{
                    fontSize: "20px",
                    backgroundColor: "skyblue",
                  }}
                  className="btn nav-link"
                  id="login"
                  onClick={displayLogin}
                >
                  Log In
                </button>
                <button
                  className="btn nav-link"
                  id="signin"
                  onClick={displaySignin}
                >
                  Sign In
                </button>
              </nav>
              {login}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;

import { useState, useEffect } from "react";
import useAuth from "../contexts/Auth";
import logo from "../assets/imgs/SWICO-LOGO.png";
import { Link, Redirect } from "react-router-dom";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";

import "../assets/styles/login.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  let [isLogin, setLogin] = useState(false);

  let { setCurrentUser } = useAuth();

  const auth = getAuth();

  useEffect(() => {
    const loggedIn = Number(localStorage.getItem("loggedIn"));
    if (loggedIn === 1 || loggedIn === 2 || loggedIn === 3 || loggedIn === 4) {
      setCurrentUser(loggedIn);
      setLogin(loggedIn);
    }
    document.title = "Welcome to Statewide Insurance";
  });

  const handleResetPassword = (event) => {
    event.preventDefault();
    sendPasswordResetEmail(auth, event.target.email.value)
      .then(() => {
        toast.success(
          `Password reset email sent to ${event.target.email.value}`,
          { position: "top-center" }
        );
      })
      .catch((error) => {
        error.code === "auth/user-not-found"
          ? toast.error(
              `User with email ${event.target.email.value} not found`,
              { position: "top-center" }
            )
          : toast.error("Failed to send email", { position: "top-center" });
      });
  };

  // if (isLogin) return <Redirect to={{ pathname: "/supervisor-dashboard" }} />;

  return (
    <div className="auth-wrapper">
      <ToastContainer />
      <img src={logo} width={150} alt="SWICO" />
      <form onSubmit={handleResetPassword} className="tw-text-gray-500">
        <h2 className="tw-mb-2 tw-text-lg">Forgot Password?</h2>
        <p id="enter">Enter your e-mail address to reset your password</p>
        <div className="login-inputs">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            name=""
            id="email"
            required
          />
        </div>

        <input
          type="submit"
          id="forgotSubmit"
          className="btn cta"
          value="Submit"
        />

        <Link to="/login">
          <p
            id="forgotRemember"
            className="tw-text-xs tw-font-light tw-text-black tw-underline mt-4 tw-text-center"
          >
            Remember password? Login
          </p>
        </Link>
      </form>
    </div>
  );
}

export default ForgotPassword;

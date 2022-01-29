import { useState, useEffect } from "react";
import useAuth from "../contexts/Auth";
import logo from "../assets/imgs/britam-logo.png";
import { Link, Redirect } from "react-router-dom";
import { sendPasswordResetEmail, getAuth } from 'firebase/auth'

import "../assets/styles/login.css";

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ForgotPassword() {
  let [isLogin, setLogin] = useState(false);

  let { setCurrentUser } = useAuth();

  const auth = getAuth()

  useEffect(() => {
    const loggedIn = Number(localStorage.getItem("loggedIn"));
    if (loggedIn === 1 || loggedIn === 2 || loggedIn === 3 || loggedIn === 4) {
      setCurrentUser(loggedIn);
      setLogin(loggedIn);
    }
    document.title = "Britam - With you every step of the way";
  });

  const handleResetPassword = (event) => {
    event.preventDefault()
    sendPasswordResetEmail(auth, event.target.email.value)
      .then(() => {
        toast.success(`Password reset email sent to ${event.target.email.value}`, {position: "top-center"});
      })
      .catch((error) => {
        error.code === 'auth/user-not-found' ? toast.error(`User with email ${event.target.email.value} not found`, {position: "top-center"}) : toast.error('Failed to send email', {position: "top-center"});
      })
  }

  if (isLogin) return <Redirect to={{ pathname: "/supervisor-dashboard" }} />;

  return (
    <div className="auth-wrapper">
      <ToastContainer />
      <img src={logo} alt="Britam" />
      <form onSubmit={handleResetPassword}>
        <p>Forgot Password?</p>
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
          className="btn btn-primary cta"
          value="Submit"
        />

        <Link to="/login" id="forgotLink">
          <p id="forgotRemember">Remember password? Login</p>
        </Link>
      </form>
    </div>
  );
}

export default ForgotPassword;

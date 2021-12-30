import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../contexts/Auth";
import { useHistory, Redirect } from "react-router-dom";
import logo from "../assets/imgs/britam-logo.png";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { authentication, onAuthStateChange } from "../helpers/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import "../assets/styles/login.css";
import Loader from "../parts/Loader";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [password, setPassword] = useState("password");
  const [isVisible, setIsVisible] = useState(false);

  const { currentUser, setCurrentUser, setAuthClaims } = useAuth();
  const { error, setError } = useState(null);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // const unsubscribe = onAuthStateChange(setCurrentUser)
    document.title = "Britam - With you every step of the way";
    onAuthStateChange(setCurrentUser, setAuthClaims, setLoading);
    console.log(currentUser);
    // return () => { unsubscribe() }
  }, []);

  const handleSignIn = async (event) => {
    event.preventDefault();
    const { email, password } = user;
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(
        authentication,
        email,
        password
      );
      if (result) {
        setLoading(false);
        onAuthStateChange(setCurrentUser, setAuthClaims);
        history.push("admin/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <Loader />;

  if (currentUser?.loggedIn)
    return <Redirect to={{ pathname: "/admin/dashboard" }} />;

  return (
    <div className="logout">
      <img src={logo} alt="Britam" />
      <form action="" onSubmit={handleSignIn}>
        <p>Enter Email and Password to sign in</p>
        <div className="login-inputs">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            id="email"
            onChange={(event) =>
              setUser({ ...user, email: event.target.value })
            }
            required
          />
        </div>
        <div className="login-inputs">
          <label htmlFor="password_input">Password</label>
          <div id="password">
            <input
              type={password}
              placeholder="Enter password"
              name=""
              id="password_input"
              onChange={(event) =>
                setUser({ ...user, password: event.target.value })
              }
              required
            />
            <span>
              {isVisible ? (
                <MdVisibility
                  className="visibilityIcon"
                  onClick={() => {
                    setPassword("password");
                    setIsVisible(false);
                  }}
                />
              ) : (
                <MdVisibilityOff
                  className="visibilityIcon"
                  onClick={() => {
                    setPassword("text");
                    setIsVisible(true);
                  }}
                />
              )}
            </span>
          </div>
        </div>
        <div>
          <input type="checkbox" name="signedIn" id="checkbox" />
          <label htmlFor="signedIn">Keep me signed in</label>
        </div>
        <div id="submit_login">
          <input
            type="submit"
            className="btn btn-primary cta"
            value="Sign in"
            value="Login"
          />
          <Link to="/forgot-password">
            <p>Forgot Password?</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;

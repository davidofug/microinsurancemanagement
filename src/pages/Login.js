import { useState, useEffect } from "react";
import useAuth from "../contexts/Auth";
import { useHistory, Redirect, Link, useLocation } from "react-router-dom";
import logo from "../assets/imgs/britam-logo2.png";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { authentication, onAuthStateChange } from "../helpers/firebase";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Alert } from "react-bootstrap";

import "../assets/styles/login.css";
import Loader from "../components/Loader";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [password, setPassword] = useState("password");
  const [isVisible, setIsVisible] = useState(false);

  const { currentUser, setCurrentUser, authClaims, setAuthClaims } = useAuth();
  const [ error, setError ] = useState('');
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const from = location?.pathname || "/admin/dashboard";

  const pageOnRefreshSuperAdmin = localStorage.getItem('onRefresh') || "/superadmin/dashboard"
  const pageOnRefreshAdmin = localStorage.getItem('onRefresh') || "/admin/dashboard"
  const pageOnRefreshSupervisor = localStorage.getItem('onRefresh') || "/supervisor/dashboard"
  const pageOnRefreshAgent = localStorage.getItem('onRefresh') || "/agent/dashboard"




  useEffect(() => {
    // const unsubscribe = onAuthStateChange(setCurrentUser)
    document.title = "Britam - With you every step of the way";
    onAuthStateChange(setCurrentUser, setAuthClaims, setLoading);
    // return () => { unsubscribe() }
    // currentUser?.loggedIn && history.push(from);
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
        history.push(from); // had removed claim from the route.
      }
    } catch(err) {
      console.log(err.code)
      setLoading(false)
      const errors = {
        "auth/user-not-found": "User with email is not found",
        "auth/wrong-password": "Password does not match the email",
        "auth/network-request-failed": "something is wrong, check your network connection"
      }
      setError(errors[err.code])
  };
}

  if (isLoading) return <Loader />;

  if (currentUser?.loggedIn){
    if(authClaims.admin){
      return <Redirect to={{ pathname: pageOnRefreshAdmin }} />;
    }
    if(authClaims.agent){
      return <Redirect to={{ pathname: pageOnRefreshAgent }} />;
    }
    if(authClaims.supervisor){
      return <Redirect to={{ pathname: pageOnRefreshSupervisor }} />;
    }
    if(authClaims.superadmin){
      return <Redirect to={{ pathname: pageOnRefreshSuperAdmin }} />;
    }
    return <Redirect to={{ pathname: from }} />;
  }

  return (
    <div className="auth-wrapper">
      <img src={logo} width={150} alt="Britam" />
      <form action="" onSubmit={handleSignIn}>
        <p>Enter Email and Password to sign in</p>
        {error && <Alert variant="danger">{error}</Alert>}
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
              autoComplete="off"
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

export default Login
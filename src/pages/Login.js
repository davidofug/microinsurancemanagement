import { useState, useEffect } from "react";
import useAuth from "../contexts/Auth";
<<<<<<< HEAD
import { Navigate, Link, useNavigate, redirect } from "react-router-dom";
import logo from "../assets/imgs/SWICO-LOGO.png";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { authentication, onAuthStateChange } from "../helpers/firebase";
import { signInWithEmailAndPassword, setPersistence } from "firebase/auth";
=======
import { Navigate, Link } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { authentication, onAuthStateChange } from "../helpers/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
>>>>>>> 0d47b77138df1e594b214bd566a6ff6edf9cfe4a
import { Alert } from "react-bootstrap";
import "../assets/styles/login.css";
import Loader from "../components/Loader";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [password, setPassword] = useState("password");
  const [isVisible, setIsVisible] = useState(false);
<<<<<<< HEAD

  const navigate = useNavigate();

  const { currentUser, setCurrentUser, authClaims, setAuthClaims } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const pageOnRefreshSuperAdmin =
    localStorage.getItem("onRefresh") || "/superadmin/dashboard";
  const pageOnRefreshAdmin =
    localStorage.getItem("onRefresh") || "/admin/dashboard";
  const pageOnRefreshSupervisor =
    localStorage.getItem("onRefresh") || "/supervisor/dashboard";
  const pageOnRefreshAgent =
    localStorage.getItem("onRefresh") || "/agent/dashboard";

  useEffect(() => {
    // const unsubscribe = onAuthStateChange(setCurrentUser)
    document.title = "Welcome to Statewide Insurance";
    onAuthStateChange(setCurrentUser, setAuthClaims, setLoading);
    // return () => { unsubscribe() }
    // currentUser?.loggedIn && history.push(from);
  }, []);

=======
  const { currentUser, setCurrentUser, authClaims, setAuthClaims, logo } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);
  const pageOnRefreshSuperAdmin =
    localStorage.getItem("onRefresh") || "/superadmin/dashboard";
  const pageOnRefreshAdmin =
    localStorage.getItem("onRefresh") || "/admin/dashboard";
  const pageOnRefreshSupervisor =
    localStorage.getItem("onRefresh") || "/supervisor/dashboard";
  const pageOnRefreshAgent =
    localStorage.getItem("onRefresh") || "/agent/dashboard";

  useEffect(() => {
    // const unsubscribe = onAuthStateChange(setCurrentUser)
    document.title = "Welcome to Statewide Insurance";
    onAuthStateChange(setCurrentUser, setAuthClaims, setLoading);
    // return () => { unsubscribe() }
    // currentUser?.loggedIn && history.push(from);
  }, []);

>>>>>>> 0d47b77138df1e594b214bd566a6ff6edf9cfe4a
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
      }
    } catch (err) {
      setLoading(false);
      const errors = {
        "auth/user-not-found": `User with ${email} is not found`,
        "auth/wrong-password": "Password does not match the email",
        "auth/network-request-failed":
          "something is wrong, check your network connection",
      };
      setError(errors[err.code]);
    }
  };

<<<<<<< HEAD
  if (isLoading) return <Loader />;
=======
  console.log(isLoading)
>>>>>>> 0d47b77138df1e594b214bd566a6ff6edf9cfe4a

  if (currentUser?.loggedIn) {
    if (authClaims.admin) {
      return <Navigate to={{ pathname: pageOnRefreshAdmin }} />;
    }
    if (authClaims.agent) {
      return <Navigate to={{ pathname: pageOnRefreshAgent }} />;
    }
    if (authClaims.supervisor) {
      return <Navigate to={{ pathname: pageOnRefreshSupervisor }} />;
    }
    if (authClaims.superadmin) {
      return <Navigate to={{ pathname: pageOnRefreshSuperAdmin }} />;
    }
  }

  return (
<<<<<<< HEAD
    <div className="auth-wrapper">
      <img src={logo} width={150} alt="SWICO" />
=======
    isLoading ? 
    <Loader />
    :
    <div className="auth-wrapper">
      {
        logo && <img src={logo} width={150} alt="SWICO" />
      }
>>>>>>> 0d47b77138df1e594b214bd566a6ff6edf9cfe4a
      <form onSubmit={handleSignIn} className="tw-text-gray-500">
        <p className="mb-3">Enter Email and Password to sign in</p>
        {error && <Alert variant="danger">{error}</Alert>}
        <div className="login-inputs">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            id="email"
            className="px-2 py-2"
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
              className="px-2 py-2"
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
          <input
            type="checkbox"
            name="signedIn"
            id="checkbox"
            className="tw-accent-gray-800 tw-cursor-pointer"
          />
          <label htmlFor="checkbox">Keep me signed in</label>
        </div>
        <div
          id="submit_login"
          className="tw-flex tw-justify-between tw-mt-5 tw-items-end"
        >
          <input
            type="submit"
            className="tw-px-3 md:tw-px-5 tw-py-2 tw-bg-gray-900 tw-text-white tw-rounded hover:tw-bg-gray-800"
            value="Login"
          />
          <Link to="/forgot-password">
            <p className="tw-text-xs tw-font-light tw-text-black tw-underline">
              Forgot Password?
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;

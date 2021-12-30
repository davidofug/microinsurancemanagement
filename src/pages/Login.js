import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../contexts/Auth";
import { useHistory, Redirect } from "react-router-dom";
import logo from "../assets/imgs/britam-logo.png";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import { authentication } from "../helpers/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import "../assets/styles/login.css";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [password, setPassword] = useState("password");
  const [isLogin, setLogin] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { setCurrentUser, setAuthClaims } = useAuth();
  const { error, setError } = useState(null);
  const history = useHistory();
  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("currentUser"));

    if (loggedIn === 1 || loggedIn === 2 || loggedIn === 3 || loggedIn === 4) {
      setCurrentUser(loggedIn);
      setLogin(loggedIn);
    }
    console.log(authentication.currentUser);

    document.title = "Britam - With you every step of the way";
  }, []);

  const handleSignIn = async (event) => {
    event.preventDefault();
    const { email, password } = user;
    try {
      const result = await signInWithEmailAndPassword(
        authentication,
        email,
        password
      );
      if (result) {
        // console.log(result)

        authentication.currentUser
          .getIdTokenResult()
          .then((idTokenResult) => {
            // Confirm the user is an Admin.
            console.log(idTokenResult.claims);
            setAuthClaims(idTokenResult.claims);
            setCurrentUser(authentication.currentUser);
            localStorage.setItem(
              "currentUser",
              JSON.stringify(authentication.currentUser)
            );
            history.push("dashboard");
            // localStorage.setItem('loggedIn', 1)
            /*
                    if (!!idTokenResult.claims.superadmin) {
                        history.push('admin/dashboard')
                    } else if (!!idTokenResult.claims.admin) {
                        // Show admin UI.
                        // showAdminUI();
                        history.push('superadmin/dashboard')

                    } else if (!!idTokenResult.claims.supervisor) {
                        // Show supervisor UI.
                        // showSupervisorUI();
                        history.push('supervisor/dashboard')
                    } else if (!!idTokenResult.claims.agent) {
                        history.push('agent/dashboard')
                    } else {
                        // Show regular user UI.
                        // showRegularUI();
                        setError('You are not authorized to access this page.')
                        console.log('UI customers')
                    } */
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // if (isLogin)
  //     return <Redirect to={{ pathname: '/admin/dashboard' }} />

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

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { authentication } from "../helpers/firebase";
import Loader from "../components/Loader";
import "../assets/styles/login.css";

function Logout() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const LogOutSign = async () => {
      signOut(authentication);
      setLoading(false);
      navigate("/");
    };

    localStorage.removeItem("onRefresh");
    sessionStorage.setItem("session1", 1);
    LogOutSign();
  });

  if (isLoading) return <Loader />;

  return (
    <div className="logout">
      <h1>You've logged out</h1>
      <Link to="/login">
        <button className="btn cta">Login</button>
      </Link>
    </div>
  );
}

export default Logout;

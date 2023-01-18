import { useState, useEffect } from "react";
import { AuthContext } from "../contexts/Auth";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Helmet from 'react-helmet'

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authClaims, setAuthClaims] = useState(null);
  const [favicon, setFavicon] = useState(null)
  const [logo, setLogo] = useState(null)
  const [logoSm, setLogoSm] = useState(null)

  const downloadFavicon = () =>  {
    const storage = getStorage()
    getDownloadURL(ref(storage, 'icons/favicon.ico'))
      .then((url) => {
        setFavicon(() => url)
      })
      .catch((error) => {
        console.log(error)
      })

    getDownloadURL(ref(storage, 'icons/logo.png'))
      .then((url) => {
        setLogo(() => url)
      })
      .catch((error) => {
        console.log(error)
      })

    getDownloadURL(ref(storage, 'icons/logoSm.png'))
      .then((url) =>  {
        setLogoSm(() => url)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    downloadFavicon()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setUser(user);
      // console.log('user status changed: ', user);
    });
    return unsubscribe;
  }, []);

  const auth = getAuth();
  const logout = () => {
    localStorage.removeItem("onRefresh");
    signOut(auth);
  };

  const value = {
    loading,
    currentUser,
    authClaims,
    user,
    logo,
    favicon,
    logoSm,
    setUser,
    logout,
    setAuthClaims,
    setCurrentUser,
    setLoading,
    setLogo,
    setFavicon,
    setLogoSm
  };

  return (
    <>
      <Helmet>
        <link rel="icon" href={favicon}/>
      </Helmet>
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    </>
  );
}

export default AuthProvider;

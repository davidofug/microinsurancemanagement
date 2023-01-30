import { useState, useEffect } from "react";
import { AuthContext } from "../contexts/Auth";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
<<<<<<< HEAD
=======
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Helmet from 'react-helmet'
>>>>>>> 0d47b77138df1e594b214bd566a6ff6edf9cfe4a

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authClaims, setAuthClaims] = useState(null);
<<<<<<< HEAD

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setUser(user);
      //   console.log('user status changed: ', user);
=======
  const [favicon, setFavicon] = useState(null)
  const [logo, setLogo] = useState(null)
  const [logoSm, setLogoSm] = useState(null)

  const downloadFavicon = async () =>  {

    try {
      const storage = getStorage()
      const favicon = await getDownloadURL(ref(storage, 'icons/favicon.ico'))
      if ( favicon ) setFavicon(() => favicon)
      const logo = await getDownloadURL(ref(storage, 'icons/logo.png'))
      if ( logo ) setLogo(() => logo)
      const logoSm = await getDownloadURL(ref(storage, 'icons/logoSm.png'))
      if ( logoSm ) setLogoSm(() => logoSm)
      setLoading(false)
    } catch ( error ) {
      console.log( error )
      setLoading(false)
    }   
  }

  useEffect(() => {
    downloadFavicon()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setUser(user);
      // console.log('user status changed: ', user);
>>>>>>> 0d47b77138df1e594b214bd566a6ff6edf9cfe4a
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
<<<<<<< HEAD
=======
    logo,
    favicon,
    logoSm,
>>>>>>> 0d47b77138df1e594b214bd566a6ff6edf9cfe4a
    setUser,
    logout,
    setAuthClaims,
    setCurrentUser,
    setLoading,
<<<<<<< HEAD
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
=======
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
>>>>>>> 0d47b77138df1e594b214bd566a6ff6edf9cfe4a
}

export default AuthProvider;

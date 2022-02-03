import { useState, useEffect } from 'react'
import { AuthContext } from '../contexts/Auth'
import { signOut, getAuth, onAuthStateChanged } from 'firebase/auth'




function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [authClaims, setAuthClaims] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
        //   console.log('user status changed: ', user);
        });
        return unsubscribe;
      }, []);


    const auth = getAuth()
    const logout = () => {
        localStorage.removeItem('onRefresh')
        signOut(auth)
    }

    const value = {
        loading,
        currentUser,
        authClaims,
        logout,
        setAuthClaims,
        setCurrentUser,
        setLoading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
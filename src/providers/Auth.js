import { useEffect, useState } from 'react'
import { AuthContext } from '../contexts/Auth'

function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [authClaims, setAuthClaims] = useState(null)
/*     useEffect(() => {
        const loggedIn = parseInt(localStorage.getItem('loggedIn'))
        if(loggedIn === 1 || loggedIn === 2 || loggedIn === 3 || loggedIn === 4) {
            setCurrentUser(loggedIn)
        }
    },[]) */


    const value = {
        loading,
        currentUser,
        authClaims,
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
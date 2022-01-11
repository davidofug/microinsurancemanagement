import { useState } from 'react'
import { AuthContext } from '../contexts/Auth'

function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [authClaims, setAuthClaims] = useState(null)


        // //try persisting the log in on refresh
        // useEffect(() => {
        //     const loggedIn = JSON.parse(localStorage.getItem('currentUser'))
        //     if(loggedIn !== null){
        //         setCurrentUser(loggedIn.authentication.currentUser)
        //         setAuthClaims()
        //     }
        // })


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
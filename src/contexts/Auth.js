import {
    createContext,
    useState,
    useEffect,
    useContext
} from 'react'

const AuthContext = createContext()

export function useAuth() {
    return useContext( AuthContext )
}

function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loggedIn = parseInt(localStorage.getItem('loggedIn'))
        if (loggedIn === 1) {
            setCurrentUser(loggedIn)
            // console.log(currentUser)
        }
    },[])

    const value = {
        loading,
        currentUser,
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

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

function Logout() {

    const { setCurrentUser } = useAuth()
    useEffect(() => {
        localStorage.setItem('loggedIn', null)
        localStorage.setItem('user', null)
        setCurrentUser(null)
    })

    return (
        <div>
            <h1>
                You've logged out
            </h1>
            <p><Link to="/login">Login</Link></p>
        </div>
    )
}

export default Logout

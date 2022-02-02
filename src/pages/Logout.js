import { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { authentication } from '../helpers/firebase'
import Loader from '../components/Loader'
import '../assets/styles/login.css'

function Logout() {
    const history = useHistory()
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {

        const LogOutSign = async () => {
            signOut(authentication)
            setLoading(false)
            history.push('/')
        }

        
        localStorage.removeItem('onRefresh')
        sessionStorage.setItem('session1', 1)
        LogOutSign()
    })

    if (isLoading)
        return <Loader />

    return (
        <div className='logout'>
            <h1>
                You've logged out
            </h1>
            <Link to="/login">
                <button className='btn btn-primary cta'>Login</button>
            </Link>
        </div>
    )
}

export default Logout

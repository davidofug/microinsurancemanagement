import {useState,useEffect} from 'react'
import { useAuth } from '../contexts/Auth'
import { useHistory, Redirect} from 'react-router-dom'

function Login() {
    let [isLogin, setLogin] = useState(false)
    let { setCurrentUser } = useAuth()
    const history = useHistory()
    useEffect(() => {
        const loggedIn = Number(localStorage.getItem('loggedIn'))
        if (loggedIn === 1) {
            setCurrentUser(loggedIn)
            setLogin(loggedIn)
        }
        if (loggedIn === 2) {
            setCurrentUser(loggedIn)
            setLogin(loggedIn)
        }
        document.title = 'Britam - With you every step of the way'
    })

    if (isLogin)
        return <Redirect to={{ pathname: '/dashboard' }} />

    return (
        <div>
            <button onClick={() => {
                setCurrentUser(1)
                localStorage.setItem('loggedIn', 1)
                history.push('/dashboard')
            }}
            >Login Admin</button>
            <button onClick={() => {
                setCurrentUser(2)
                localStorage.setItem('loggedIn', 2)
                history.push('/dashboard')
            }}
            >Login Supervisor</button>
        </div>
    )
}

export default Login

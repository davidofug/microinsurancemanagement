import {useState,useEffect} from 'react'
import { useAuth } from '../contexts/Auth'
import { useHistory, Redirect} from 'react-router-dom'

function Login() {
    let [isLogin, setLogin] = useState(false)
    let { setCurrentUser } = useAuth()
    const history = useHistory()
    useEffect(() => {
        const loggedIn = Number(localStorage.getItem('loggedIn'))

        if(loggedIn === 1 || loggedIn === 2 || loggedIn === 3|| loggedIn === 4){
            setCurrentUser(loggedIn)
            setLogin(loggedIn)
        }

        document.title = 'Britam - With you every step of the way'
    })
        

    if (isLogin)
        return <Redirect to={{ pathname: '/supervisor-dashboard' }} />

    return (
        <div className='components login-container'>
            <div className="login">
                <h3>Enter Email and Password to sign in</h3>
                <label htmlFor="">Email</label>
                <input type="email" name="" id="" />
                <label htmlFor="">Password</label>
                <input type="password" name="" id="" />
                <div>
                    <input type="checkbox" name="signedIn" id="" />
                    <label htmlFor="signedIn">Keep me signed in</label>
                </div>
                <div>
                    <button className='btn btn-primary cta' onClick={() => {
                        setCurrentUser(1)
                        localStorage.setItem('loggedIn', 1)
                        history.push('admin-dashboard')
                    }}
                    >Login Admin</button>
                    <button className='btn btn-primary cta' onClick={() => {
                        setCurrentUser(2)
                        localStorage.setItem('loggedIn', 2)
                        history.push('supervisor-dashboard')
                    }}
                    >Login Supervisor</button>
                    <button className='btn btn-primary cta' onClick={() => {
                        setCurrentUser(3)
                        localStorage.setItem('loggedIn', 3)
                        history.push('agent-dashboard')
                    }}
                    >Login Agent</button>
                    <button className='btn btn-primary cta' onClick={() => {
                        setCurrentUser(4)
                        localStorage.setItem('loggedIn', 4)
                        history.push('super-admin-dashboard')
                    }}
                    >Login Super Admin</button>
                </div>
            </div>
        </div>
    )
}

export default Login

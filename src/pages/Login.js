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
        <div className='logout'>
                <form action="">
                    <p>Enter Email and Password to sign in</p>
                    <div className='login-inputs'>
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder='Enter email ...' name="" id="" />
                    </div>
                    <div className='login-inputs'>
                        <label htmlFor="">Password</label>
                        <input type="password" name="" id="" />
                    </div>
                    <div>
                        <input style={{"margin-right": "5px"}} type="checkbox" name="signedIn" id="" />
                        <label htmlFor="signedIn">Keep me signed in</label>
                    </div>
                    <div>
                        <input style={{"margin-top": "10px"}} type="submit" className='btn btn-primary cta' onClick={() => {
                            setCurrentUser(1)
                            localStorage.setItem('loggedIn', 1)
                            history.push('admin-dashboard')
                        }}
                         value="Login"/>
                    </div>
                </form>
        </div>
    )
}

export default Login

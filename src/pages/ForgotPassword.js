import {useState,useEffect} from 'react'
import { useAuth } from '../contexts/Auth'
import { useHistory, Redirect} from 'react-router-dom'
import logo from '../assets/imgs/britam-logo.png'
import { Link } from 'react-router-dom'

import '../assets/styles/login.css'

function ForgotPassword() {
    const [ password, setPassword ] = useState("password")
    let [isLogin, setLogin] = useState(false)
    const [ isVisible, setIsVisible ] = useState(false)

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
        
    

    // if (isLogin)
    //     return <Redirect to={{ pathname: '/supervisor-dashboard' }} />

    return (
        <div className='logout'>
                <img src={logo} alt='Britam'style={{"margin-bottom": "40px"}}/>
                <form action="" >
                    <p style={{"font-size": "1.1rem"}}>Forgot Password?</p>
                    <p style={{"font-size": ".9rem"}}>Enter your e-mail address to reset your password</p>
                    <div className='login-inputs'>
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder='Enter email' name="" id="" />
                    </div>
                    
                    <div id="submit_login">
                        <Link to="/login"><p>Remember password?Login</p></Link>

                        <input  type="submit" style={{"margin-left": "10px"}} className='btn btn-primary cta' onClick={() => {
                            setCurrentUser(1)
                            localStorage.setItem('loggedIn', 1)
                            history.push('admin-dashboard')
                        }}
                         value="Submit"/>
                    </div>
                </form>
        </div>
    )
}

export default ForgotPassword

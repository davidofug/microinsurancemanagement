import { Link } from 'react-router-dom'
import {useState,useEffect} from 'react'
import useAuth from '../contexts/Auth'
import { useHistory, Redirect} from 'react-router-dom'
import logo from '../assets/imgs/britam-logo.png'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

import '../assets/styles/login.css'

function Login() {
    const [ password, setPassword ] = useState("password")
    const [isLogin, setLogin] = useState(false)
    const [ isVisible, setIsVisible ] = useState(false)

    const { setCurrentUser } = useAuth()

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
        return <Redirect to={{ pathname: '/admin/dashboard' }} />

    return (
        <div className='logout'>
                <img src={logo} alt='Britam'style={{"margin-bottom": "40px"}}/>
                <form action="" >
                    <p style={{"font-size": "1.1rem"}}>Enter Email and Password to sign in</p>
                    <div className='login-inputs'>
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder='Enter email' name="" id="" />
                    </div>
                    <div className='login-inputs'>
                        <label  htmlFor="">Password</label>
                        <div style={{"display": "flex", "align-items": "center", "justify-content": "space-between"}} id="password">
                            <input style={{"border": "none"}}  type={password} placeholder='Enter password' name="" id="password_input" />
                            <span>
                                { isVisible ? (
                                    <MdVisibility style={{"color": "black", "float": "right", "margin-right": "5px", "margin-top": "auto", "position": "relative", "z-index": "2"}} onClick={() => {
                                        setPassword("password")
                                        setIsVisible(false)
                                    }}/>
                                ): (
                                    <MdVisibilityOff style={{"color": "black", "float": "right", "margin-right": "5px", "margin-top": "auto", "position": "relative", "z-index": "2"}}  onClick={() => {
                                        setPassword("text")
                                        setIsVisible(true)
                                    }}/>
                                )

                                }

                            </span>
                        </div>
                    </div>
                    <div>
                        <input style={{"margin-right": "5px"}} type="checkbox" name="signedIn" id="" />
                        <label htmlFor="signedIn">Keep me signed in</label>
                    </div>
                    <div id="submit_login">
                        <input  type="submit" className='btn btn-primary cta' onClick={() => {
                            setCurrentUser(1)
                            localStorage.setItem('loggedIn', 1)
                            history.push('/admin/dashboard')
                        }}
                         value="Login"/>
                         <Link to="/forgot-password"><p>Forgot Password?</p></Link>
                    </div>
                </form>
        </div>
    )
}

export default Login

import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'
import useAuth from '../contexts/Auth'
import { useHistory, Redirect} from 'react-router-dom'
import logo from '../assets/imgs/britam-logo.png'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { authentication, onAuthStateChange } from '../helpers/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'

import '../assets/styles/login.css'
import Loader from '../parts/Loader'

function Login() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const [ password, setPassword ] = useState("password")
    const [ isVisible, setIsVisible ] = useState(false)

    const { currentUser, setCurrentUser, setAuthClaims } = useAuth()
    const { error, setError } = useState(null)
    const [isLoading, setLoading] = useState(false)
    const history = useHistory()

    useEffect(() => {
        // const unsubscribe = onAuthStateChange(setCurrentUser)
        document.title = 'Britam - With you every step of the way'
        onAuthStateChange(setCurrentUser, setAuthClaims, setLoading)
        console.log(currentUser)
        // return () => { unsubscribe() }
    }, []);

    const handleSignIn = async (event) => {
        event.preventDefault()
        const { email, password } = user
        setLoading(true)
		try {
			const result = await signInWithEmailAndPassword(authentication, email, password)
            if (result) {
                setLoading(false)
                onAuthStateChange(setCurrentUser, setAuthClaims)
                history.push('admin/dashboard')
            }
		} catch (error) {
			console.error(error)
		}
    }

    if (isLoading)
        return <Loader />
    
    if (currentUser?.loggedIn)
        return <Redirect to={{ pathname: '/admin/dashboard' }} />

    return (
        <div className='logout'>
                <img src={logo} alt='Britam' style={{"marginBottom": "40px"}}/>
                <form action="" >
                    <p style={{"fontSize": "1.1rem"}}>Enter Email and Password to sign in</p>
                    <div className='login-inputs'>
                        <label htmlFor="">Email</label>
                        <input
                            type="email"
                            placeholder='Enter email' name="" id=""
                            onChange={ event => setUser({...user, email: event.target.value} )}
                        />
                    </div>
                    <div className='login-inputs'>
                        <label htmlFor="">Password</label>
                        <div style={{"display": "flex", "alignItems": "center", "justifyContent": "space-between"}} id="password">
                        <input
                            style={{ "border": "none" }}
                            type={password}
                            placeholder='Enter password'
                            name=""
                            id="password_input"
                            onChange={ event => setUser({...user, password: event.target.value} )}
                        />
                            <span>
                                { isVisible ? (
                                <MdVisibility
                                    style={{ "color": "black", "float": "right", "marginRight": "5px", "marginTop": "auto", "position": "relative", "z-index": "2" }} onClick={() => {
                                        setPassword("password")
                                        setIsVisible(false)
                                    }}/>
                                ): (
                                    <MdVisibilityOff
                                        style={{ "color": "black", "float": "right", "marginRight": "5px", "marginTop": "auto", "position": "relative", "zIndex": "2" }}
                                        onClick={() => {
                                            setPassword("text")
                                            setIsVisible(true)
                                    }}/>
                                )

                                }

                            </span>
                        </div>
                    </div>
                    <div>
                        <input style={{"marginRight": "5px"}} type="checkbox" name="signedIn" id="" />
                        <label htmlFor="signedIn">Keep me signed in</label>
                    </div>
                    <div id="submit_login">
                        <input  type="submit" className='btn btn-primary cta' onClick={handleSignIn} value="Sign in" value="Login"/>
                         <Link to="/forgot-password"><p>Forgot Password?</p></Link>
                    </div>
                </form>
        </div>
    )
}

export default Login

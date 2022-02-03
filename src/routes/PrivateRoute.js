import {
    Route,
    Redirect
} from 'react-router-dom'
import { useEffect, useState } from 'react'

import useAuth from '../contexts/Auth'
import { authentication } from '../helpers/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Loader from '../components/Loader'

function PrivateRoute({ children, ...rest }) {
    const [user, setUser] = useState(null)
    const [isLoading, setLoading] = useState(true)
    // const { currentUser } = useAuth()
    useEffect(() => {
       const unsubscribe = onAuthStateChanged(authentication, user => {
           setUser(user)
           setLoading(false)
       })

        return () => unsubscribe()
    }, []);

    // return user ? <Route {...rest}>{children}</Route> : <Redirect to="/login" />

    return user ? <Route {...rest} render={
        props => {
            localStorage.setItem('onRefresh', props.location.pathname, { path: '/' }) 
            return children
        }
    } /> : <Redirect to='/login' />
}


export default PrivateRoute;
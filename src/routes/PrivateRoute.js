import {
    Route,
    Redirect
} from 'react-router-dom'

import useAuth from '../contexts/Auth'

function PrivateRoute({ children, ...rest }) {
    const { currentUser } = useAuth()

    return currentUser ? <Route {...rest} render={
        props => {
            localStorage.setItem('onRefresh', props.location.pathname, { path: '/' }) 
            return children
        }
    } /> : <Redirect to='/login' />
}


export default PrivateRoute;
import {
    Route,
    Redirect
} from 'react-router-dom'
import { useEffect } from 'react'

import useAuth from '../contexts/Auth'
import { onAuthStateChange } from '../helpers/firebase'

function PrivateRoute({ children, ...rest }) {
    const { currentUser} = useAuth()

    return (
        <Route
            {...rest}
            render={({location}) => currentUser?.loggedIn
                    ? (children)
                : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state:{from:location}
                        }}
                    />
                )
            }
        />
    )
}

export default PrivateRoute

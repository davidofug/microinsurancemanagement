import {
    Route,
    Redirect
} from 'react-router-dom'
import { useEffect } from 'react'

import useAuth from '../contexts/Auth'
import { onAuthStateChanged } from 'firebase/auth'
import { authentication } from '../helpers/firebase'

function PrivateRoute({ children, ...rest }) {
    const { currentUser, setCurrentUser} = useAuth()
    function onAuthStateChange(callback) {
        return onAuthStateChanged(authentication, user => {
          if (user) {
              callback({ loggedIn: true, ...user });
          } else {
            callback({ loggedIn: false });
          }
        });
      }

    useEffect(() => {
        const unsubscribe = onAuthStateChange(setCurrentUser)
        return () => unsubscribe()
     },[]);

    return (
        <Route
            {...rest}
            render={({location}) => currentUser
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

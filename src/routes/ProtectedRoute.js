/* import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../../contexts/Auth/AuthState'
import { isAuthenticated, setLoading } from '../../../contexts/Auth/AuthAction'
import { setCookie } from '../../../services/Cookie'

const ProtectedRouteOthers = ({ component: Component, ...rest }) => {
  const [authState, authDispatch] = useAuth()
  const { authenticated, loading } = authState

  // check if user is authenticated
  useEffect(() => {
    (async() => {
      await isAuthenticated(authDispatch)
      setLoading(authDispatch, false)
    })();
  }, [])

  return (
    <Route 
      {...rest} render={
        props => {
          if(loading) return <div className="lds-hourglass"></div>
          if(authenticated) {
            // save last page seen address (url)
            setCookie('onRefresh', props.location.pathname, { path: '/' }) 
            return <Component {...props} />
          }
          else return <Redirect to={
            {
              pathname: "/pfv4-admin",
              state: { from: props.location }
            }
          } />
        }
      } 
    />
  )
}

export default ProtectedRouteOthers
 */

// * Better comments

/**  
 * TODO: finished 
 * ! danger: don't touch
 * ? should I push this
 * */

// TODO: this and that
// ! danger: don't touch

// ! ⚠️ warning
import PrivateRoute  from './PrivateRoute'
import NotLoggedIn from '../pages/NotLoggedIn'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Organisations from '../pages/Organisations'
import Help from '../pages/Help'
import Dashboard from '../pages/Dashboard'
import NotAuthorized from '../pages/NotAuthorized'
import NotFound from '../pages/NotFound'
import { useAuth } from '../contexts/Auth'
import Menu from '../parts/Menu'
import Clients from '../pages/Clients'

import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom'

function MyRouter() {

    const date = new Date()
    const { currentUser } = useAuth()

    return (
        <Router>
            <div className='container'>
                <Menu />
                <Switch>
                    <Route path="/" exact>
                        <Login />
                    </Route>
                    <Route path="/organisations" exact>
                        <Organisations />
                    </Route>
                    <Route path="/clients" exact>
                        <Clients />
                    </Route>
                    <Route path="/not-logged-in" >
                        <NotLoggedIn />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/help">
                        <Help />
                    </Route>
                    <Route path="/logout">
                        <Logout />
                    </Route>
                    <PrivateRoute path="/dashboard">
                        <Dashboard />
                    </PrivateRoute>
                    <PrivateRoute path="/menu">
                        <Menu />
                    </PrivateRoute>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default MyRouter

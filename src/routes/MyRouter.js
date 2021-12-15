import PrivateRoute  from './PrivateRoute'
import NotLoggedIn from '../pages/NotLoggedIn'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Organisations from '../pages/Organisations'
import Users from '../pages/Users'
import Dashboard from '../pages/Dashboard'
import NotAuthorized from '../pages/NotAuthorized'
import NotFound from '../pages/NotFound'
import { useAuth } from '../contexts/Auth'
import Menu from '../parts/Menu'
import Clients from '../pages/Clients'
import Claims from '../pages/Claims'
import Policies from '../pages/Policies'
import Reports from '../pages/Reports'
import Settings from '../pages/Settings'

import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom'

function MyRouter() {

    const { currentUser } = useAuth()

    return (
        <Router>
            <div className='container'>
                <Menu  />

                <div className="displayContainer">
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
                        <Route path="/user">
                            <Users />
                        </Route>
                        <Route path="/policies">
                            <Policies />
                        </Route>
                        <Route path="/claims">
                            <Claims />
                        </Route>
                        <Route path="/reports">
                            <Reports />
                        </Route>
                        <Route path="/settings">
                            <Settings />
                        </Route>
                        <Route path="/logout">
                            <Logout />
                        </Route>
                        <PrivateRoute path="/dashboard">
                            <Dashboard />
                        </PrivateRoute>
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default MyRouter

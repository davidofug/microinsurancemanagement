import PrivateRoute  from './PrivateRoute'
import NotLoggedIn from '../pages/NotLoggedIn'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Home from '../pages/Home'
import Help from '../pages/Help'
import Dashboard from '../pages/Dashboard'
import NotAuthorized from '../pages/NotAuthorized'
import NotFound from '../pages/NotFound'
import Menu from '../parts/Menu'
import { useAuth } from '../contexts/Auth'

import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom'

function MyRouter() {

    const date = new Date()
    const { currentUser } = useAuth()

    return (
        <Router>
                {/* <header className="header">
                    <h1>
                        <Link to="/"></Link>
                    </h1>
                    <nav>
                        <ul>
                            {currentUser &&
                                <>
                                    <li>
                                        <Link to="/">Shop</Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="/account">My Account</Link>
                                    </li>

                                </>
                        }
                            <li>
                                <Link to="/help">Help</Link>
                            </li>
                            <li>
                                {currentUser ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
                            </li>
                        </ul>
                    </nav>
                </header> */}

            <Switch>
                <Route path="/" exact>
                    <Login />
                </Route>
                <Route path="/home" exact>
                    <Home />
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
            {/* <footer>
                <p>&copy; Copyright {date.getFullYear() }</p>
            </footer> */}
        </Router>
    )
}

export default MyRouter

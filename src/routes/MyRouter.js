import Mtp from '../pages/Mtp'
import Menu from '../parts/Menu'
import Users from '../pages/Users'
import Login from '../pages/Login'
import Claims from '../pages/Claims'
import Logout from '../pages/Logout'
import Reports from '../pages/Reports'
import Clients from '../pages/Clients'
import NotFound from '../pages/NotFound'
import Policies from '../pages/Policies'
import Settings from '../pages/Settings'
import { useAuth } from '../contexts/Auth'
import PrivateRoute  from './PrivateRoute'
import Dashboard from '../pages/Dashboard'
import AddClients from '../pages/AddClients'
import Windscreen from '../pages/Windscreen'
import NotLoggedIn from '../pages/NotLoggedIn'
import Comprehensive from '../pages/Comprehensive'
import Organisations from '../pages/Organisations'
import NotAuthorized from '../pages/NotAuthorized'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Logs from '../pages/Logs.js'
import Supervisors from '../pages/Supervisors'
import Agents from '../pages/Agents'
import AddAgents from '../pages/AddAgents'
import AddSupervisors from '../pages/AddSupervisors'

function MyRouter() {

    const { currentUser } = useAuth()

    return (
        <Router>
            <div className='top-container' >
                {currentUser && (
                    <div className='menuSide'>
                        <Menu />
                    </div>
                    )
                }
                <div className="displayContainer">
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <Route path="/not-logged-in" component={NotLoggedIn} />
                        <Route path="/login" component={Login} />
                        <PrivateRoute path="/organisations" >
                            <Organisations />
                        </PrivateRoute>
                        <PrivateRoute path="/view-log-trail" >
                            <Logs />
                        </PrivateRoute>
                        <PrivateRoute path="/supervisor" >
                            <Supervisors />
                        </PrivateRoute>
                        <PrivateRoute path="/add-supervisors" >
                            <AddSupervisors />
                        </PrivateRoute>
                        <PrivateRoute path="/agents" >
                            <Agents />
                        </PrivateRoute>
                        <PrivateRoute path="/add-agents" >
                            <AddAgents />
                        </PrivateRoute>
                        <PrivateRoute path="/clients" >
                            <Clients />
                        </PrivateRoute>
                        <PrivateRoute path="/user" >
                            <Users />
                        </PrivateRoute>
                        <PrivateRoute path="/policies" >
                            <Policies />
                        </PrivateRoute>
                        <PrivateRoute path="/claims" >
                            <Claims />
                        </PrivateRoute>
                        <PrivateRoute path="/reports" >
                            <Reports />
                        </PrivateRoute>
                        <PrivateRoute path="/settings" >
                            <Settings />
                        </PrivateRoute>
                        <PrivateRoute path="/logout" >
                            <Logout />
                        </PrivateRoute>
                        <PrivateRoute path="/motor-third-party" >
                            <Mtp />
                        </PrivateRoute>
                        <PrivateRoute path="/windscreen" >
                            <Windscreen />
                        </PrivateRoute>
                        <PrivateRoute path="/comprehensive" >
                            <Comprehensive />
                        </PrivateRoute>
                        <PrivateRoute path="/add-clients" >
                            <AddClients />
                        </PrivateRoute>
                        <PrivateRoute path="/dashboard" >
                            <Dashboard />
                        </PrivateRoute>
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default MyRouter

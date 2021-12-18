import Mtp from '../pages/Mtp'
import Menu from '../parts/Menu'
import Users from '../pages/Users'
import Claims from '../pages/Claims'
import Reports from '../pages/Reports'
import Clients from '../pages/Clients'
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
import Logout from '../pages/Logout'


function AdminRoutes() {
    return (
        <>
            <PrivateRoute path="/dashboard" >
                <Dashboard />
            </PrivateRoute>
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
        </>
        
    )
}

export default AdminRoutes

import Mtp from '../pages/Mtp'
import Users from '../pages/Users'
import Logs from '../pages/Logs.js'
import Claims from '../pages/Claims'
import Logout from '../pages/Logout'
import Reports from '../pages/Reports'
import Clients from '../pages/Clients'
import Policies from '../pages/Policies'
import PrivateRoute  from './PrivateRoute'
import Dashboard from '../pages/Dashboard'
import Windscreen from '../pages/Windscreen'
import AddClients from '../pages/AddClients'
import Settings from '../pages/agent/Settings'
import Comprehensive from '../pages/Comprehensive'
import { Route } from 'react-router-dom'
import AddUsers from '../pages/AddUsers'


function AgentsRoutes() {
    return (
        <>
            <PrivateRoute path="/dashboard" >
                <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/agent/view-log-trail" >
                <Logs />
            </PrivateRoute>
            <PrivateRoute path="/agent/clients" >
                <Clients />
            </PrivateRoute>
            <PrivateRoute path="/add-user" >
                <AddUsers />
            </PrivateRoute>
            <PrivateRoute path="/agent/user" >
                <Users />
            </PrivateRoute>
            <PrivateRoute path="/agent/policies" >
                <Policies />
            </PrivateRoute>
            <PrivateRoute path="/agent/claims" >
                <Claims />
            </PrivateRoute>
            <PrivateRoute path="/agent/reports" >
                <Reports />
            </PrivateRoute>
            <PrivateRoute path="/agent/settings" >
                <Settings />
            </PrivateRoute>
            <PrivateRoute path="/logout" >
                <Logout />
            </PrivateRoute>
            <PrivateRoute path="/agent/motor-third-party" >
                <Mtp />
            </PrivateRoute>
            <PrivateRoute path="/agent/windscreen" >
                <Windscreen />
            </PrivateRoute>
            <PrivateRoute path="/agent/comprehensive" >
                <Comprehensive />
            </PrivateRoute>
            <PrivateRoute path="/agent/add-clients" >
                <AddClients />
            </PrivateRoute>
            <Route path="/logout" component={Logout} />
        </>
        
    )
}

export default AgentsRoutes

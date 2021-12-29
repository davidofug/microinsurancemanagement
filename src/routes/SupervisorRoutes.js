import Mtp from '../pages/Mtp'
import Users from '../pages/Users'
import Claims from '../pages/Claims'
import Reports from '../pages/Reports'
import Clients from '../pages/Clients'
import Policies from '../pages/Policies'
import Settings from '../pages/supervisor/Settings'
import PrivateRoute  from './PrivateRoute'
import { Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import AddClients from '../pages/AddClients'
import Windscreen from '../pages/Windscreen'
import Comprehensive from '../pages/Comprehensive'
import Logs from '../pages/Logs.js'
import Agents from '../pages/Agents'
import AddAgents from '../pages/AddAgents'
import Logout from '../pages/Logout'
import AddClaims from '../pages/AddClaims'
import AddUsers from '../pages/AddUsers'


function SupervisorRoutes() {
    return (
        <>
            <PrivateRoute path="/supervisor-dashboard" >
                <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/supervisor-view-log-trail" >
                <Logs />
            </PrivateRoute>
            <PrivateRoute path="/supervisor-agents" >
                <Agents />
            </PrivateRoute>
            <PrivateRoute path="/add-user" >
                <AddUsers />
            </PrivateRoute>
            <PrivateRoute path="/supervisor-clients" >
                <Clients />
            </PrivateRoute>
            <PrivateRoute path="/supervisor-user-management" >
                <Users />
            </PrivateRoute>
            <PrivateRoute path="/supervisor-policies" >
                <Policies />
            </PrivateRoute>
            <PrivateRoute path="/supervisor-claims" >
                <Claims />
            </PrivateRoute>
            <PrivateRoute path="/supervisor-add-claims" >
                <AddClaims />
            </PrivateRoute>
            <PrivateRoute path="/supervisor-reports" >
                <Reports />
            </PrivateRoute>
            <PrivateRoute path="/supervisor-settings" >
                <Settings />
            </PrivateRoute>
            <PrivateRoute path="/supervisor-motor-third-party" >
                <Mtp />
            </PrivateRoute>
            <PrivateRoute path="/supervisor-windscreen" >
                <Windscreen />
            </PrivateRoute>
            <PrivateRoute path="/supervisor-comprehensive" >
                <Comprehensive />
            </PrivateRoute>
            <PrivateRoute path="/add-clients" >
                <AddClients />
            </PrivateRoute>
            <Route path="/logout" component={Logout} />
        </>
        
    )
}

export default SupervisorRoutes

import Mtp from '../pages/Mtp'
import Users from '../pages/Users'
import Claims from '../pages/Claims'
import Reports from '../pages/Reports'
import Clients from '../pages/agent/Clients'
import Policies from '../pages/Policies'
import Settings from '../pages/agent/Settings'
import PrivateRoute  from './PrivateRoute'
import Dashboard from '../pages/Dashboard'
import AddClients from '../pages/AddClients'
import Windscreen from '../pages/Windscreen'
import Comprehensive from '../pages/Comprehensive'
import {Route} from 'react-router-dom'
import Logs from '../pages/Logs.js'
import Logout from '../pages/Logout'


function AdminRoutes() {
    return (
        <>
            <PrivateRoute path="/agent-dashboard" >
                <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/agent-view-log-trail" >
                <Logs />
            </PrivateRoute>
            <PrivateRoute path="/agent-clients" >
                <Clients />
            </PrivateRoute>
            <PrivateRoute path="/agent-user" >
                <Users />
            </PrivateRoute>
            <PrivateRoute path="/agent-policies" >
                <Policies />
            </PrivateRoute>
            <PrivateRoute path="/agent-claims" >
                <Claims />
            </PrivateRoute>
            <PrivateRoute path="/agent-reports" >
                <Reports />
            </PrivateRoute>
            <PrivateRoute path="/agent-settings" >
                <Settings />
            </PrivateRoute>
            <PrivateRoute path="/logout" >
                <Logout />
            </PrivateRoute>
            <PrivateRoute path="agent-/motor-third-party" >
                <Mtp />
            </PrivateRoute>
            <PrivateRoute path="agent-/windscreen" >
                <Windscreen />
            </PrivateRoute>
            <PrivateRoute path="/agent-comprehensive" >
                <Comprehensive />
            </PrivateRoute>
            <PrivateRoute path="/agent-add-clients" >
                <AddClients />
            </PrivateRoute>
        </>
        
    )
}

export default AdminRoutes

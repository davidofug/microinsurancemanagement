import Mtp from '../pages/Mtp'
import Users from '../pages/Users'
import Claims from '../pages/Claims'
import Reports from '../pages/Reports'
import Clients from '../pages/Clients'
import Policies from '../pages/Policies'
import Settings from '../pages/admin/Settings'
import PrivateRoute  from './PrivateRoute'
import { Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import AddClients from '../pages/AddClients'
import Windscreen from '../pages/Windscreen'
import Comprehensive from '../pages/Comprehensive'
import Organisations from '../pages/admin/Organisations'
import Logs from '../pages/Logs.js'
import Supervisors from '../pages/admin/Supervisors'
import Agents from '../pages/Agents'
import AddAgents from '../pages/AddAgents'
import AddSupervisors from '../pages/admin/AddSupervisors'
import Logout from '../pages/Logout'


function SuperAdminRoutes() {
    return (
        <>
            <PrivateRoute path="/super-admin-dashboard" >
                <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/super-admin-organisations" >
                <Organisations />
            </PrivateRoute>
            <PrivateRoute path="/super-admin-view-log-trail" >
                <Logs />
            </PrivateRoute>
            <PrivateRoute path="/super-admin-supervisor" >
                <Supervisors />
            </PrivateRoute>
            <PrivateRoute path="/super-add-supervisors" >
                <AddSupervisors />
            </PrivateRoute>
            <PrivateRoute path="/super-admin-agents" >
                <Agents />
            </PrivateRoute>
            <PrivateRoute path="/super-add-agents" >
                <AddAgents />
            </PrivateRoute>
            <PrivateRoute path="/super-admin-clients" >
                <Clients />
            </PrivateRoute>
            <PrivateRoute path="/super-admin-user-management" >
                <Users />
            </PrivateRoute>
            <PrivateRoute path="/super-admin-policies" >
                <Policies />
            </PrivateRoute>
            <PrivateRoute path="/super-admin-claims" >
                <Claims />
            </PrivateRoute>
            <PrivateRoute path="/super-admin-reports" >
                <Reports />
            </PrivateRoute>
            <PrivateRoute path="/super-admin-settings" >
                <Settings />
            </PrivateRoute>
            <PrivateRoute path="/super-admin-motor-third-party" >
                <Mtp />
            </PrivateRoute>
            <PrivateRoute path="/super-admin-windscreen" >
                <Windscreen />
            </PrivateRoute>
            <PrivateRoute path="/super-admin-comprehensive" >
                <Comprehensive />
            </PrivateRoute>
            <PrivateRoute path="/super-add-clients" >
                <AddClients />
            </PrivateRoute>
            <Route path="/logout" component={Logout} />
        </>
        
    )
}

export default SuperAdminRoutes

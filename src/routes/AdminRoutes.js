import Mtp from '../pages/Mtp'
import Users from '../pages/Users'
import Claims from '../pages/Claims'
import Reports from '../pages/Reports'
import Clients from '../pages/Clients'
import Policies from '../pages/Policies'
import Settings from '../pages/admin/Settings'
import PrivateRoute  from './PrivateRoute'
import { Route, Redirect } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import AddClients from '../pages/AddClients'
import Windscreen from '../pages/Windscreen'
import Comprehensive from '../pages/Comprehensive'
import Organisations from '../pages/admin/Organisations'
import Logs from '../pages/Logs.js'
import Supervisors from '../pages/admin/Supervisors'
import Agents from '../pages/Agents'
import AddAgents from '../pages/AddAgents'
import Logout from '../pages/Logout'
import AddClaims from '../pages/AddClaims'
import AddOrganisation from '../pages/admin/AddOrganisation'
import AddSupervisors from '../pages/admin/AddSupervisors'


function AdminRoutes() {
    return (
        <>
            <PrivateRoute path="/admin/dashboard" >
                <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/admin/organisations" >
                <Organisations />
            </PrivateRoute>
            <PrivateRoute path="/admin/add-organisations" >
                <AddOrganisation />
            </PrivateRoute>
            <PrivateRoute path="/admin/view-log-trail" >
                <Logs />
            </PrivateRoute>
            <PrivateRoute path="/admin/supervisor" >
                <Supervisors />
            </PrivateRoute>
            <PrivateRoute path="/add/supervisors" >
                <AddSupervisors />
            </PrivateRoute>
            <PrivateRoute path="/admin/agents" >
                <Agents />
            </PrivateRoute>
            <PrivateRoute path="/add-agents" >
                <AddAgents />
            </PrivateRoute>
            <PrivateRoute path="/admin/clients" >
                <Clients />
            </PrivateRoute>
            <PrivateRoute path="/admin/user-management" >
                <Users />
            </PrivateRoute>
            <PrivateRoute path="/admin/policies" >
                <Policies />
            </PrivateRoute>
            <PrivateRoute path="/admin/claims" >
                <Claims />
            </PrivateRoute>
            <PrivateRoute path="/admin/reports" >
                <Reports />
            </PrivateRoute>
            <PrivateRoute path="/admin/settings" >
                <Settings />
            </PrivateRoute>
            <PrivateRoute path="/admin/motor-third-party" >
                <Mtp />
            </PrivateRoute>
            <PrivateRoute path="/admin/windscreen" >
                <Windscreen />
            </PrivateRoute>
            <PrivateRoute path="/admin/comprehensive" >
                <Comprehensive />
            </PrivateRoute>
            <PrivateRoute path="/add-clients" >
                <AddClients />
            </PrivateRoute>
            <PrivateRoute path="/add-claim" >
                <AddClaims />
            </PrivateRoute>
            <Route path="/logout" component={Logout} />
        </>
        
    )
}

export default AdminRoutes

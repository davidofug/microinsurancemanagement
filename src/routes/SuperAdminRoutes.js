import Mtp from '../pages/Mtp'
import Users from '../pages/Users'
import Claims from '../pages/Claims'
import Reports from '../pages/superAdmin/Reports'
import Clients from '../pages/Clients'
import Policies from '../pages/Policies'
import Settings from '../pages/Settings'
import PrivateRoute  from './PrivateRoute'
import Dashboard from '../pages/Dashboard'
import Windscreen from '../pages/Windscreen'
import Comprehensive from '../pages/Comprehensive'
import Organisations from '../pages/admin/Organisations'
import Logs from '../pages/Logs.js'
import Supervisors from '../pages/admin/Supervisors'
import Agents from '../pages/Agents'
import AddUsers from '../pages/AddUsers'
import Admins from '../pages/superAdmin/Admins'
import NewImport from '../pages/NewImport'
import Transit from '../pages/Transit'
import SystemLogs from '../pages/superAdmin/SystemLogs'


function SuperAdminRoutes() {
    return (
        <>
            <PrivateRoute path="/superadmin/dashboard" >
                <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/superadmin/organisations" >
                <Organisations />
            </PrivateRoute>
            <PrivateRoute path="/superadmin/view-log-trail" >
                <Logs />
            </PrivateRoute>
            <PrivateRoute path="/superadmin/admins" >
                <Admins />
            </PrivateRoute>
            <PrivateRoute path="/superadmin/supervisors" >
                <Supervisors />
            </PrivateRoute>
            <PrivateRoute path="/superadmin/agents" >
                <Agents />
            </PrivateRoute>
            <PrivateRoute path="/superadmin/add-admin" >
                <AddUsers role="admin" />
            </PrivateRoute>
            <PrivateRoute path="/superadmin/clients" >
                <Clients />
            </PrivateRoute>
            <PrivateRoute path="/superadmin/user-management" >
                <Users />
            </PrivateRoute>
            <PrivateRoute path="/superadmin/policies" >
                <Policies />
            </PrivateRoute>
            <PrivateRoute path="/superadmin/claims" >
                <Claims />
            </PrivateRoute>
            <PrivateRoute path="/superadmin/reports" >
                <Reports />
            </PrivateRoute>
            <PrivateRoute path="/superadmin/settings" >
                <Settings />
            </PrivateRoute>
            <PrivateRoute path="/superadmin/system-logs" >
                <SystemLogs />
            </PrivateRoute>
            <PrivateRoute path="/superadmin/motor-third-party" >
                <Mtp />
            </PrivateRoute>
            <PrivateRoute path="/superadmin/windscreen" >
                <Windscreen />
            </PrivateRoute>
            <PrivateRoute path="/superadmin/comprehensive" >
                <Comprehensive />
            </PrivateRoute>
            <PrivateRoute path="/superadmin/new-import" >
                <NewImport />
            </PrivateRoute>
            <PrivateRoute path="/superadmin/transit" >
                <Transit />
            </PrivateRoute>
        </>
        
    )
}

export default SuperAdminRoutes

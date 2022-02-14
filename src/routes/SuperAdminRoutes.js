import Mtp from '../pages/Mtp'
import Claims from '../pages/Claims'
import Transit from '../pages/Transit'
import Settings from '../pages/Settings'
import AddUsers from '../pages/AddUsers'
import Dashboard from '../pages/Dashboard'
import NewImport from '../pages/NewImport'
import PrivateRoute  from './PrivateRoute'
import Windscreen from '../pages/Windscreen'
import Admins from '../pages/superAdmin/Admins'
import Comprehensive from '../pages/Comprehensive'
import SystemLogs from '../pages/superAdmin/SystemLogs'

function SuperAdminRoutes() {
    return (
        <>
            <PrivateRoute path="/superadmin/dashboard" >
                <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/superadmin/admins" >
                <Admins />
            </PrivateRoute>
            <PrivateRoute path="/superadmin/add-admin" >
                <AddUsers role="admin" />
            </PrivateRoute>
            <PrivateRoute path="/superadmin/claims" >
                <Claims />
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

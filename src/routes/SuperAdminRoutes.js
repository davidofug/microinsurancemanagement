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

function SuperAdminRoutes({largeContentClass}) {
    return (
        <>
            <PrivateRoute path="/superadmin/dashboard" >
                <Dashboard parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/superadmin/admins" >
                <Admins parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/superadmin/add-admin" >
                <AddUsers role="admin" parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/superadmin/claims" >
                <Claims parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/superadmin/settings" >
                <Settings parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/superadmin/system-logs" >
                <SystemLogs parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/superadmin/motor-third-party" >
                <Mtp parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/superadmin/windscreen" >
                <Windscreen parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/superadmin/comprehensive" >
                <Comprehensive parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/superadmin/new-import" >
                <NewImport parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/superadmin/transit" >
                <Transit parent_container={largeContentClass}/>
            </PrivateRoute>
        </>
        
    )
}

export default SuperAdminRoutes

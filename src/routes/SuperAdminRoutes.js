import PrivateRoute  from './PrivateRoute'
import Admins from '../pages/superAdmin/Admins'
import SystemLogs from '../pages/superAdmin/SystemLogs'
import { Mtp, AddUsers, Claims, Dashboard, Settings } from '../pages'

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
                <Mtp parent_container={largeContentClass} policyCategory="mtp"/>
            </PrivateRoute>
            <PrivateRoute path="/superadmin/windscreen" >
                <Mtp parent_container={largeContentClass} policyCategory="windscreen"/>
            </PrivateRoute>
            <PrivateRoute path="/superadmin/comprehensive" >
                <Mtp parent_container={largeContentClass} policyCategory="comprehensive"/>
            </PrivateRoute>
            <PrivateRoute path="/superadmin/new-import" >
                <Mtp parent_container={largeContentClass} policyCategory="newImport"/>
            </PrivateRoute>
            <PrivateRoute path="/superadmin/transit" >
                <Mtp parent_container={largeContentClass} policyCategory="transit"/>
            </PrivateRoute>
        </>
        
    )
}

export default SuperAdminRoutes

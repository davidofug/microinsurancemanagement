import Mtp from '../pages/Mtp'
import Claims from '../pages/Claims'
import Reports from '../pages/Reports'
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
import AddClaims from '../pages/AddClaims'
import AddOrganisation from '../pages/admin/AddOrganisation'
import StickerMgt from '../pages/admin/StickerMgt'
import AddUsers from '../pages/AddUsers'
import NewImport from '../pages/NewImport'
import Transit from '../pages/Transit'
import AddStickerRange from '../pages/admin/AddStickerRange'
import PolicyDetails from '../pages/PolicyDetails/PolicyDetails'
import PolicyRenew from '../pages/PolicyDetails/PolicyRenew'


function AdminRoutes({largeContentClass}) {
    return (
        <>
            <PrivateRoute path="/admin/dashboard" >
                <Dashboard parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/admin/organisations" >
                <Organisations parent_contianer={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/admin/add-organisations" >
                <AddOrganisation parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/admin/view-log-trail" >
                <Logs parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/admin/supervisor" >
                <Supervisors parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/admin/agents" >
                <Agents parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/admin/clients" >
                <Clients parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/admin/sticker-management" >
                <StickerMgt parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/admin/sticker-number" >
                <AddStickerRange parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/admin/user-management" >
                <Supervisors parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/admin/policies" >
                <Policies parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/admin/claims" >
                <Claims parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/admin/reports" >
                <Reports parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/admin/settings" >
                <Settings parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path={`/admin/policy-details/:id`} >
                <PolicyDetails parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path={`/admin/policy-renew/:id`} >
                <PolicyRenew parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/admin/motor-third-party" >
                <Mtp parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/admin/windscreen" >
                <Windscreen parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/admin/comprehensive" >
                <Comprehensive parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/admin/new-import" >
                <NewImport parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/admin/transit" >
                <Transit parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/add-claim" >
                <AddClaims parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/admin/add-agent" >
                <AddUsers role="agent" parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/admin/add-supervisor" >
                <AddUsers role="supervisor" parent_container={largeContentClass}/>
            </PrivateRoute>
        </>
        
    )
}

export default AdminRoutes

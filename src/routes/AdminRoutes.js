import PrivateRoute  from './PrivateRoute'
import Organisations from '../pages/admin/Organisations'
import Supervisors from '../pages/admin/Supervisors'
import AddOrganisation from '../pages/admin/AddOrganisation'
import StickerMgt from '../pages/admin/StickerMgt'
import AddStickerRange from '../pages/admin/AddStickerRange'
import PolicyRenew from '../pages/PolicyDetails/PolicyRenew'
import { Mtp, Policies, AddClaims, AddUsers, Agents, Clients, Claims, Reports, Dashboard, Settings, Logs, PolicyDetails } from '../pages'


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
            <PrivateRoute path="/admin/supervisors" >
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
                <Mtp parent_container={largeContentClass} policyCategory="mtp"/>
            </PrivateRoute>
            <PrivateRoute path="/admin/windscreen" >
                <Mtp parent_container={largeContentClass} policyCategory="windscreen"/>
            </PrivateRoute>
            <PrivateRoute path="/admin/comprehensive" >
                <Mtp parent_container={largeContentClass} policyCategory="comprehensive"/>
            </PrivateRoute>
            <PrivateRoute path="/admin/new-import" >
                <Mtp parent_container={largeContentClass} policyCategory="newImport"/>
            </PrivateRoute>
            <PrivateRoute path="/admin/transit" >
                <Mtp parent_container={largeContentClass} policyCategory="transit"/>
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

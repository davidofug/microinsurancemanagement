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
import Logs from '../pages/Logs.js'
import Agents from '../pages/Agents'
import AddClaims from '../pages/AddClaims'
import AddUsers from '../pages/AddUsers'
import PolicyDetails from '../pages/PolicyDetails/PolicyDetails'
import NewImport from '../pages/NewImport'
import Transit from '../pages/Transit'


function SupervisorRoutes({largeContentClass}) {
    return (
        <>
            <PrivateRoute path="/supervisor/dashboard" >
                <Dashboard parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/view-log-trail" >
                <Logs parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/agents" >
                <Agents parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/clients" >
                <Clients parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/user-management" >
                <Agents parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/policies" >
                <Policies parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/claims" >
                <Claims parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/add-claim" >
                <AddClaims parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/reports" >
                <Reports parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/policy-details" >
                <PolicyDetails parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/settings" >
                <Settings parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/add-comprehensive" >
                <Policies parent_container={largeContentClass} cat="comprehensive" btn_txt="Process Comprehensive" pol="comprehensive"/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/add-windscreen" >
                <Policies parent_container={largeContentClass} cat="windscreen" btn_txt="Process Windscreen" pol="windscreen"/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/add-mtp" >
                <Policies parent_container={largeContentClass} cat="mtp" btn_txt="Process 3rd Party" pol="motor third party"/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/add-new-import" >
                <Policies parent_container={largeContentClass} cat="newImport" btn_txt="Process New import" pol="new import"/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/add-transit" >
                <Policies parent_container={largeContentClass} cat="transit" btn_txt="Process Transit" pol="transit"/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/motor-third-party" >
                <Mtp parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/windscreen" >
                <Windscreen parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/comprehensive" >
                <Comprehensive parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/new-import" >
                <NewImport parent_container={largeContentClass} />
            </PrivateRoute>
            <PrivateRoute path="/supervisor/transit" >
                <Transit parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/add-clients" >
                <AddUsers parent_container={largeContentClass} role="client" />
            </PrivateRoute>
            <PrivateRoute path="/supervisor/add-agents" >
                <AddUsers parent_container={largeContentClass} role="agent" />
            </PrivateRoute>
        </>
        
    )
}

export default SupervisorRoutes

import Mtp from '../pages/Mtp'
import Claims from '../pages/Claims'
import Reports from '../pages/supervisor/Reports'
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


function SupervisorRoutes() {
    return (
        <>
            <PrivateRoute path="/supervisor/dashboard" >
                <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/supervisor/view-log-trail" >
                <Logs />
            </PrivateRoute>
            <PrivateRoute path="/supervisor/agents" >
                <Agents />
            </PrivateRoute>
            <PrivateRoute path="/supervisor/clients" >
                <Clients />
            </PrivateRoute>
            <PrivateRoute path="/supervisor/user-management" >
                <Agents />
            </PrivateRoute>
            <PrivateRoute path="/supervisor/policies" >
                <Policies />
            </PrivateRoute>
            <PrivateRoute path="/supervisor/claims" >
                <Claims />
            </PrivateRoute>
            <PrivateRoute path="/supervisor/add-claim" >
                <AddClaims />
            </PrivateRoute>
            <PrivateRoute path="/supervisor/reports" >
                <Reports />
            </PrivateRoute>
            <PrivateRoute path="/supervisor/policy-details" >
                <PolicyDetails />
            </PrivateRoute>
            <PrivateRoute path="/supervisor/settings" >
                <Settings />
            </PrivateRoute>
            <PrivateRoute path="/supervisor/add-comprehensive" >
                <Policies cat="comprehensive" btn_txt="Process Comprehensive" pol="comprehensive"/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/add-windscreen" >
                <Policies cat="windscreen" btn_txt="Process Windscreen" pol="windscreen"/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/add-mtp" >
                <Policies cat="mtp" btn_txt="Process 3rd Party" pol="motor third party"/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/add-new-import" >
                <Policies cat="mtp" btn_txt="Process 3rd Party" pol="new import"/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/add-transit" >
                <Policies cat="mtp" btn_txt="Process 3rd Party" pol="transit"/>
            </PrivateRoute>
            <PrivateRoute path="/supervisor/motor-third-party" >
                <Mtp />
            </PrivateRoute>
            <PrivateRoute path="/supervisor/windscreen" >
                <Windscreen />
            </PrivateRoute>
            <PrivateRoute path="/supervisor/comprehensive" >
                <Comprehensive />
            </PrivateRoute>
            <PrivateRoute path="/supervisor/new-import" >
                <NewImport />
            </PrivateRoute>
            <PrivateRoute path="/supervisor/transit" >
                <Transit />
            </PrivateRoute>
            <PrivateRoute path="/supervisor/add-clients" >
                <AddUsers role="client" />
            </PrivateRoute>
            <PrivateRoute path="/supervisor/add-agents" >
                <AddUsers role="agent" />
            </PrivateRoute>
        </>
        
    )
}

export default SupervisorRoutes

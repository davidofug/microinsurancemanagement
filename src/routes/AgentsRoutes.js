import MTP from '../pages/Mtp'
import Users from '../pages/Users'
import Logs from '../pages/Logs.js'
import Claims from '../pages/Claims'
import Reports from '../pages/agent/Reports'
import Clients from '../pages/Clients'
import Policies from '../pages/Policies'
import PrivateRoute  from './PrivateRoute'
import Dashboard from '../pages/Dashboard'
import Windscreen from '../pages/Windscreen'
import Settings from '../pages/agent/Settings'
import Comprehensive from '../pages/Comprehensive'
import AddUsers from '../pages/agent/AddUsers'
import NewImport from '../pages/NewImport'
import Transit from '../pages/Transit'
import AddClaims from '../pages/AddClaims'

function AgentsRoutes() {
    return (
        <>
            <PrivateRoute path="/agent/dashboard" >
                <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/agent/view-log-trail" >
                <Logs />
            </PrivateRoute>
            <PrivateRoute path="/agent/clients" >
                <Clients />
            </PrivateRoute>
            <PrivateRoute path="/agent/add-user" >
                <AddUsers />
            </PrivateRoute>
            <PrivateRoute path="/agent/user" >
                <Users />
            </PrivateRoute>
            <PrivateRoute path="/agent/policies" >
                <Policies />
            </PrivateRoute>
            <PrivateRoute path="/agent/claims" >
                <Claims />
            </PrivateRoute>
            <PrivateRoute path="/agent/add-claim" >
                <AddClaims />
            </PrivateRoute>
            <PrivateRoute path="/agent/reports" >
                <Reports />
            </PrivateRoute>
            <PrivateRoute path="/agent/settings" >
                <Settings />
            </PrivateRoute>
            <PrivateRoute path="/agent/motor-third-party" >
                <MTP />
            </PrivateRoute>
            <PrivateRoute path="/agent/windscreen" >
                <Windscreen />
            </PrivateRoute>
            <PrivateRoute path="/agent/comprehensive" >
                <Comprehensive />
            </PrivateRoute>
            <PrivateRoute path="/agent/new-import" >
                <NewImport />
            </PrivateRoute>
            <PrivateRoute path="/agent/transit" >
                <Transit />
            </PrivateRoute>
            <PrivateRoute path="/agent/add-comprehensive" >
                <Policies cat="comprehensive" btn_txt="Process Comprehensive" pol="comprehensive"/>
            </PrivateRoute>
            <PrivateRoute path="/agent/add-windscreen" >
                <Policies cat="windscreen" btn_txt="Process Windscreen" pol="windscreen"/>
            </PrivateRoute>
            <PrivateRoute path="/agent/add-mtp" >
                <Policies cat="mtp" btn_txt="Process 3rd Party" pol="motor third party"/>
            </PrivateRoute>
            <PrivateRoute path="/agent/add-new-import" >
                <Policies cat="mtp" btn_txt="Process 3rd Party" pol="new import"/>
            </PrivateRoute>
            <PrivateRoute path="/agent/add-transit" >
                <Policies cat="mtp" btn_txt="Process 3rd Party" pol="transit"/>
            </PrivateRoute>
        </>

    )
}

export default AgentsRoutes

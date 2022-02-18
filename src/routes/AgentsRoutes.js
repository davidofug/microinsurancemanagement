import MTP from '../pages/Mtp'
import Logs from '../pages/Logs.js'
import Claims from '../pages/Claims'
import Reports from '../pages/Reports'
import Clients from '../pages/Clients'
import Policies from '../pages/Policies'
import PrivateRoute  from './PrivateRoute'
import Dashboard from '../pages/Dashboard'
import Windscreen from '../pages/Windscreen'
import Settings from '../pages/Settings'
import Comprehensive from '../pages/Comprehensive'
import AddUsers from '../pages/AddUsers'
import NewImport from '../pages/NewImport'
import Transit from '../pages/Transit'
import AddClaims from '../pages/AddClaims'

function AgentsRoutes({largeContentClass}) {
    return (
        <>
            {console.log(largeContentClass)}
            <PrivateRoute path="/agent/dashboard" >
                <Dashboard parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/agent/view-log-trail" >
                <Logs parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute  path="/agent/clients" >
                <Clients parent_container={largeContentClass} />
            </PrivateRoute>
            <PrivateRoute path="/agent/add-clients" >
                <AddUsers parent_container={largeContentClass} role="client" />
            </PrivateRoute>
            <PrivateRoute path="/agent/policies" >
                <Policies parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/agent/claims" >
                <Claims parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute  path="/agent/add-claim" >
                <AddClaims parent_container={largeContentClass} />
            </PrivateRoute>
            <PrivateRoute path="/agent/reports" >
                <Reports parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/agent/settings" >
                <Settings parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/agent/motor-third-party" >
                <MTP parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/agent/windscreen" >
                <Windscreen parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/agent/comprehensive" >
                <Comprehensive parent_container={largeContentClass} />
            </PrivateRoute>
            <PrivateRoute path="/agent/new-import" >
                <NewImport parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/agent/transit" >
                <Transit parent_container={largeContentClass}/>
            </PrivateRoute>
            <PrivateRoute path="/agent/add-comprehensive" >
                <Policies parent_container={largeContentClass} cat="comprehensive" btn_txt="Process Comprehensive" pol="comprehensive"/>
            </PrivateRoute>
            <PrivateRoute path="/agent/add-windscreen" >
                <Policies parent_container={largeContentClass} cat="windscreen" btn_txt="Process Windscreen" pol="windscreen"/>
            </PrivateRoute>
            <PrivateRoute path="/agent/add-mtp" >
                <Policies parent_container={largeContentClass} cat="mtp" btn_txt="Process 3rd Party" pol="motor third party"/>
            </PrivateRoute>
            <PrivateRoute path="/agent/add-new-import" >
                <Policies parent_container={largeContentClass} cat="newImport" btn_txt="Process New Import" pol="new import"/>
            </PrivateRoute>
            <PrivateRoute path="/agent/add-transit" >
                <Policies parent_container={largeContentClass} cat="transit" btn_txt="Process Transit" pol="transit"/>
            </PrivateRoute>
        </>

    )
}

export default AgentsRoutes

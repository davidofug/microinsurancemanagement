import PrivateRoute  from './PrivateRoute'
import { Mtp, Policies, AddClaims, AddUsers, Clients, Claims, Reports, Dashboard, Settings, Logs, PolicyDetails } from '../pages'

function AgentsRoutes({largeContentClass}) {
    return (
        <>
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
                <Mtp parent_container={largeContentClass} policyCategory="mtp"/>
            </PrivateRoute>
            <PrivateRoute path="/agent/windscreen" >
                <Mtp parent_container={largeContentClass} policyCategory="windscreen"/>
            </PrivateRoute>
            <PrivateRoute path="/agent/comprehensive" >
                <Mtp parent_container={largeContentClass} policyCategory="comprehensive"/>
            </PrivateRoute>
            <PrivateRoute path="/agent/new-import" >
                <Mtp parent_container={largeContentClass} policyCategory="newImport"/>
            </PrivateRoute>
            <PrivateRoute path="/agent/transit" >
                <Mtp parent_container={largeContentClass} policyCategory="transit"/>
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

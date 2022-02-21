import { useState } from 'react'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import useAuth from '../contexts/Auth'
import ForgotPassword from '../pages/ForgotPassword'

import AdminRoutes from './AdminRoutes'
import AgentsRoutes from './AgentsRoutes'
import SupervisorRoutes from './SupervisorRoutes'
import SuperAdminRoutes from './SuperAdminRoutes'

import AdminMenu from '../pages/admin/AdminMenu'
import SupervisorMenu from '../pages/supervisor/SupervisorMenu'

import AgentMtpMenu from '../pages/agent/AgentMtpMenu'
import AgentCompMenu from '../pages/agent/AgentCompMenu'
import AgentMtpCompMenu from '../pages/agent/AgentMtpCompMenu'
import AgentMtpCompWindMenu from '../pages/agent/AgentMtpCompWindMenu'
import SuperAdminMenu from '../pages/superAdmin/SuperAdminMenu'

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function MyRouter() {
    const { currentUser, authClaims } = useAuth()
    const [ largeContentClass, setLargeContentClass ] = useState(localStorage.getItem('preferredToggleMenu') ? !JSON.parse(localStorage.getItem('preferredToggleMenu')) : false)

    return (
        <Router>
            <Switch >
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={Login} />     
                <Route path="/login" exact component={Login} />
            </Switch>
            <div className={largeContentClass ? 'top-container-large': `top-container` }>
                {currentUser?.loggedIn && 
                <div className='MenuSide'>
                    {authClaims?.admin && <AdminMenu setLargeContentClass={setLargeContentClass} largeContentClass={largeContentClass} />}
                    {authClaims?.supervisor && <SupervisorMenu setLargeContentClass={setLargeContentClass} largeContentClass={largeContentClass} />}
                    {authClaims?.superadmin && <SuperAdminMenu setLargeContentClass={setLargeContentClass} largeContentClass={largeContentClass} />}

                    {/* mtp agents */}
                    {authClaims?.agent && authClaims?.mtp && !authClaims?.comprehensive && !authClaims.windscreen &&  <AgentMtpMenu setLargeContentClass={setLargeContentClass} largeContentClass={largeContentClass} />}
                    {/* comprehensive agents */}
                    {authClaims?.agent && !authClaims?.mtp && authClaims?.comprehensive &&  <AgentCompMenu setLargeContentClass={setLargeContentClass} largeContentClass={largeContentClass} />}
                    {/* windscreen agents */}
                    {authClaims?.agent && authClaims?.windscreen && !authClaims?.mtp && !authClaims?.comprehensive &&  <AgentCompMenu setLargeContentClass={setLargeContentClass} largeContentClass={largeContentClass} />}
                    {/* mtp and comprehensive agents */}
                    {authClaims?.agent && authClaims?.mtp && authClaims?.comprehensive && !authClaims?.windscreen &&  <AgentMtpCompMenu setLargeContentClass={setLargeContentClass} largeContentClass={largeContentClass} />}
                    {/* mtp and comprehensive and windscreen agents */}
                    {authClaims?.agent && authClaims?.mtp && authClaims?.comprehensive && authClaims?.windscreen &&  <AgentMtpCompWindMenu setLargeContentClass={setLargeContentClass} largeContentClass={largeContentClass} />}
                </div>
                }
                <div>
                    <AdminRoutes largeContentClass={largeContentClass}/>
                    <SupervisorRoutes largeContentClass={largeContentClass}/>
                    <AgentsRoutes largeContentClass={largeContentClass} />
                    <SuperAdminRoutes largeContentClass={largeContentClass}/>
                </div>
            </div>  
        </Router>
    )
}

export default MyRouter

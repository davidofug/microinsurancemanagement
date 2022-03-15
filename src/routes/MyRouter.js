import useAuth from '../contexts/Auth'
import { useToggleMenu } from '../hooks'
import { Login, Logout, ForgotPassword } from '../pages'
import { SuperAdminRoutes, AdminRoutes, SupervisorRoutes, AgentsRoutes } from '.'
import { AdminMenu, AgentMtpMenu, SuperAdminMenu, SupervisorMenu, 
    AgentCompMenu, AgentMtpCompMenu, AgentMtpCompWindMenu } from '../pages'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function MyRouter() {
    const { currentUser, authClaims } = useAuth()
    const [ largeContentClass, minimiseMenu, maximiseMenu ] = useToggleMenu()

    return (
        <Router>
            <Switch >
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/logout" component={Logout} />
                <Route path="/login" exact component={Login} />
                <Route path="/" exact component={Login} />     
            
                <div className={largeContentClass ? 'top-container-large': `top-container` }>
                    {currentUser?.loggedIn && 
                    <div className='MenuSide'>
                        {authClaims?.admin && <AdminMenu largeContentClass={largeContentClass} minimiseMenu={minimiseMenu} maximiseMenu={maximiseMenu} />}
                        {authClaims?.supervisor && <SupervisorMenu largeContentClass={largeContentClass} minimiseMenu={minimiseMenu} maximiseMenu={maximiseMenu} />}
                        {authClaims?.superadmin && <SuperAdminMenu largeContentClass={largeContentClass} minimiseMenu={minimiseMenu} maximiseMenu={maximiseMenu} />}

                        {/* mtp agents */}
                        {authClaims?.agent && authClaims?.mtp && !authClaims?.comprehensive && !authClaims.windscreen &&  <AgentMtpMenu minimiseMenu={minimiseMenu} maximiseMenu={maximiseMenu} largeContentClass={largeContentClass} />}
                        {/* comprehensive agents */}
                        {authClaims?.agent && !authClaims?.mtp && authClaims?.comprehensive &&  <AgentCompMenu largeContentClass={largeContentClass} minimiseMenu={minimiseMenu} maximiseMenu={maximiseMenu} />}
                        {/* windscreen agents */}
                        {authClaims?.agent && authClaims?.windscreen && !authClaims?.mtp && !authClaims?.comprehensive &&  <AgentCompMenu largeContentClass={largeContentClass} minimiseMenu={minimiseMenu} maximiseMenu={maximiseMenu} />}
                        {/* mtp and comprehensive agents */}
                        {authClaims?.agent && authClaims?.mtp && authClaims?.comprehensive && !authClaims?.windscreen &&  <AgentMtpCompMenu largeContentClass={largeContentClass} minimiseMenu={minimiseMenu} maximiseMenu={maximiseMenu} />}
                        {/* mtp and comprehensive and windscreen agents */}
                        {authClaims?.agent && authClaims?.mtp && authClaims?.comprehensive && authClaims?.windscreen &&  <AgentMtpCompWindMenu largeContentClass={largeContentClass} minimiseMenu={minimiseMenu} maximiseMenu={maximiseMenu} />}
                    </div>
                    }
                    <div>
                        <AdminRoutes largeContentClass={largeContentClass}/>
                        <SupervisorRoutes largeContentClass={largeContentClass}/>
                        <AgentsRoutes largeContentClass={largeContentClass} />
                        <SuperAdminRoutes largeContentClass={largeContentClass}/>
                    </div>
                </div>  
            </Switch>
        </Router>
    )
}

export default MyRouter
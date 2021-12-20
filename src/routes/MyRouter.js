import { useAuth } from '../contexts/Auth'
import NotLoggedIn from '../pages/NotLoggedIn'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import ForgotPassword from '../pages/ForgotPassword'

//different user roles routes
import SuperAdminRoutes from './SuperAdminRoutes'
import AdminRoutes from './AdminRoutes'
import SupervisorRoutes from './SupervisorRoutes'
import AgentsRoutes from './AgentsRoutes'

//different menus for different roles
import AdminMenu from '../pages/admin/AdminMenu'
import SupervisorMenu from '../pages/supervisor/SupervisorMenu'
import AgentMenu from '../pages/agent/AgentMenu'
import SuperAdminMenu from '../pages/superAdmin/SuperAdminMenu'


import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function MyRouter() {

    const { currentUser } = useAuth()

    return (
        <Router>
            {!currentUser ? (
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/login" component={Login} />
                    <Route path="/forgot-password" component={ForgotPassword} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/not-logged-in" component={NotLoggedIn} />
                </Switch>
            ): (
                <div className='top-container'>
                <div className='MenuSide'>
                    {currentUser === 1 && (
                            <AdminMenu />
                            )
                    }

                    {currentUser === 2 && (
                            <SupervisorMenu />
                        )
                    }
                    
                    {currentUser === 3 && (
                            <AgentMenu />
                        )
                    }
                    
                    {currentUser === 4 && (
                            <SuperAdminMenu />
                        )
                    }
                </div>

                <main>
                    <Switch>
                        {currentUser === 1 && (
                                <AdminRoutes />
                            )
                        }
                        {currentUser === 2 && (
                                <SupervisorRoutes />
                            )
                        }
                        {currentUser === 3 && (
                                <AgentsRoutes />
                            )
                        }
                        {currentUser === 4 && (
                                <SuperAdminRoutes />
                            )
                        }
                        
                    </Switch>
                </main>
            </div>
            )}
                
            
        </Router>
    )
}

export default MyRouter

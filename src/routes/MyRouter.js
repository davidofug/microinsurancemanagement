import NotFound from '../pages/NotFound'
import { useAuth } from '../contexts/Auth'
import NotLoggedIn from '../pages/NotLoggedIn'
import Login from '../pages/Login'
import Logout from '../pages/Logout'

//different user roles routes
import SuperAdminRoutes from './SuperAdminRoutes'
import AdminRoutes from './AdminRoutes'
import SupervisorRoutes from './SupervisorRoutes'
import AgentsRoutes from './AgentsRoutes'

//different menus for different roles
import AdminMenu from '../parts/AdminMenu'
import SupervisorMenu from '../parts/SupervisorMenu'
import AgentMenu from '../parts/AgentMenu'
import SuperAdminMenu from '../parts/SuperAdminMenu'


import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function MyRouter() {

    const { currentUser } = useAuth()

    return (
        <Router>
            <div className='top-container' >
                {currentUser === 2 && (
                    <div className='menuSide'>
                        <SupervisorMenu />
                    </div>
                    )
                }
                {currentUser === 1 && (
                    <div className='menuSide'>
                        <AdminMenu />
                    </div>
                    )
                }


                {currentUser === 3 && (
                    <div className='menuSide'>
                        <AgentMenu />
                    </div>
                    )
                }
                {currentUser === 4 && (
                    <div className='menuSide'>
                        <SuperAdminMenu />
                    </div>
                    )
                }

                <div className="displayContainer">
                    <Switch>
                        {currentUser === 2 && (
                                <SupervisorRoutes />
                            )
                        }
                        {currentUser === 1 && (
                            <AdminRoutes />
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
                        <Route path="/" exact component={Login} />
                        <Route path="/not-logged-in" component={NotLoggedIn} />
                        <Route path="/login" component={Login} />
                        <Route path="/logout" component={Logout} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default MyRouter

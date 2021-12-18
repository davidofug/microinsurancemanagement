import NotFound from '../pages/NotFound'
import { useAuth } from '../contexts/Auth'
import NotLoggedIn from '../pages/NotLoggedIn'
import Login from '../pages/Login'
import Logout from '../pages/Logout'

//different user roles routes
import SuperAdminRoutes from './AdminRoutes'
import AdminRoutes from './AdminRoutes'
import SupervisorRoutes from './AdminRoutes'
import AgentsRoutes from './AdminRoutes'


import Menu from '../parts/Menu'
import SupervisorMenu from '../parts/SupervisorMenu'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function MyRouter() {

    const { currentUser } = useAuth()

    return (
        <Router>
            <div className='top-container' >
                {currentUser === 1 && (
                    <div className='menuSide'>
                        <Menu />
                    </div>
                    )
                }

                {currentUser === 2 && (
                    <div className='menuSide'>
                        <SupervisorMenu />
                    </div>
                    )
                }

                <div className="displayContainer">
                    <Switch>
                        {currentUser === 1 && (
                                <AgentsRoutes />
                            )
                        }
                        {currentUser === 2 && (
                                <SupervisorRoutes />
                            )
                        }
                        {currentUser === 2 && (
                                <AdminRoutes />
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

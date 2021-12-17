import Mtp from '../pages/Mtp'
import Menu from '../parts/Menu'
import Users from '../pages/Users'
import Login from '../pages/Login'
import Claims from '../pages/Claims'
import Logout from '../pages/Logout'
import Reports from '../pages/Reports'
import Clients from '../pages/Clients'
import NotFound from '../pages/NotFound'
import Policies from '../pages/Policies'
import Settings from '../pages/Settings'
import { useAuth } from '../contexts/Auth'
import PrivateRoute  from './PrivateRoute'
import Dashboard from '../pages/Dashboard'
import AddClients from '../pages/AddClients'
import Windscreen from '../pages/Windscreen'
import NotLoggedIn from '../pages/NotLoggedIn'
import Comprehensive from '../pages/Comprehensive'
import Organisations from '../pages/Organisations'
import NotAuthorized from '../pages/NotAuthorized'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function MyRouter() {

    const { currentUser } = useAuth()

    return (
        <Router>
            <div className='top-container' >
                {currentUser && (
                    <div className='menuSide'>
                        <Menu />
                    </div>
                    )
                }
                <div className="displayContainer">
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <Route path="/organisations" exact component={Organisations} />
                        <Route path="/clients" exact component={Clients} />
                        <Route path="/not-logged-in" component={NotLoggedIn} />
                        <Route path="/login" component={Login} />
                        <Route path="/user" component={Users} />
                        <Route path="/policies" component={Policies} />
                        <Route path="/claims" component={Claims} />
                        <Route path="/reports" component={Reports} />
                        <Route path="/settings" component={Settings} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/motor-third-party" component={Mtp} />
                        <Route path="/windscreen" component={Windscreen} />
                        <Route path="/comprehensive" component={Comprehensive} />
                        <Route path="/add-clients" component={AddClients} />
                        <PrivateRoute path="/dashboard" >
                            <Dashboard />
                        </PrivateRoute>
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default MyRouter

import MyRouter from './routes/MyRouter'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Login, Logout, ForgotPassword } from './pages'

export default function App() {
  return ( 
    <Router>
            <Switch >
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/logout" component={Logout} />
                <Route path="/login" exact component={Login} />
                <Route path="/" exact component={Login} />  
                <MyRouter /> 
            </Switch>
    </Router>
  );
}

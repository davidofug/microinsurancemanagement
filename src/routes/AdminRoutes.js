import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";
import Organisations from "../pages/Organisations";


function AdminRoutes() {
    return (
        <>
            <PrivateRoute path="/dashboard" >
                <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/organisations" >
                <Organisations />
            </PrivateRoute>
        </>
        
    )
}

export default AdminRoutes

// Auth
import Login from "./Login";
import Logout from "./Logout";
import ForgotPassword from "./ForgotPassword";

import Reports from "./Reports";
import AddClaims from './AddClaims'
import AddUsers from "./AddUsers";
import Agents from "./Agents";
import Claims from "./Claims";
import Clients from "./Clients";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import Logs from "./Logs";

//menus
import AdminMenu from './admin/AdminMenu'
import AgentMtpMenu from "./agent/AgentMtpMenu";
import AgentCompMenu from './agent/AgentCompMenu'
import AgentMtpCompMenu from './agent/AgentMtpCompMenu'
import AgentMtpCompWindMenu from './agent/AgentMtpCompWindMenu'
import SupervisorMenu from './supervisor/SupervisorMenu'
import SuperAdminMenu from './superAdmin/SuperAdminMenu'

// Policies
import Mtp from "./Mtp";
import PolicyDetails from "./PolicyDetails/PolicyDetails";
import Policies from './Policies'

export {
    AdminMenu, AgentMtpMenu, SuperAdminMenu, SupervisorMenu,
    AgentCompMenu, AgentMtpCompMenu, AgentMtpCompWindMenu,
    Login, Logout, ForgotPassword, Reports,
    AddClaims, AddUsers, Clients, Claims,
    Agents, Mtp, Dashboard, Settings,
    Logs, PolicyDetails, Policies
}
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Login,
  Logout,
  ForgotPassword,
  Dashboard,
  Clients,
  Agents,
  Logs,
  Reports,
  Policies,
  PolicyDetails,
  AddClaims,
} from "./pages";
import PrivateRoute from "./routes/PrivateRoute";
import { SuperAdminRoutes } from "routes";
import Organisations from "./pages/admin/Organisations";
import AddOrganisation from "pages/admin/AddOrganisation";
import Admins from "pages/superAdmin/Admins";
import { Mtp, AddUsers, Claims, Settings } from "./pages";
import SystemLogs from "./pages/superAdmin/SystemLogs";
import Windscreen from "components/forms/Windscreen";
import StickerMgt from "pages/admin/StickerMgt";
import Supervisors from "pages/admin/Supervisors";
import { useToggleMenu } from "hooks";
import PolicyRenew from "pages/PolicyDetails/PolicyRenew";
import AddStickerRange from "pages/admin/AddStickerRange";
import AccountSettings from "pages/superAdmin/AccountSettings";

export default function App() {
  const [largeContentClass] = useToggleMenu();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/logout" element={<Logout />} />

        {/* <SuperAdminRoutes /> */}
        <Route path="/superadmin" element={<SuperAdminRoutes />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="organisations"
            element={
              <PrivateRoute>
                <Organisations />
              </PrivateRoute>
            }
          />
          <Route
            path="add-organisations"
            element={
              <PrivateRoute>
                <AddOrganisation />
              </PrivateRoute>
            }
          />
          <Route
            path="admins"
            element={
              <PrivateRoute>
                <Admins />
              </PrivateRoute>
            }
          />
          <Route
            path="supervisors"
            element={
              <PrivateRoute>
                <Supervisors />
              </PrivateRoute>
            }
          />
          <Route
            path="add-admin"
            element={
              <PrivateRoute>
                <AddUsers role="admin" />
              </PrivateRoute>
            }
          />
          <Route
            path="add-superadmin"
            element={
              <PrivateRoute>
                <AddUsers role="superadmin" />
              </PrivateRoute>
            }
          />
          <Route
            path="claims"
            element={
              <PrivateRoute>
                <Claims />
              </PrivateRoute>
            }
          />
          <Route
            path="system-logs"
            element={
              <PrivateRoute>
                <SystemLogs />
              </PrivateRoute>
            }
          />
          <Route
            path="settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="account-settings"
            element={
              <PrivateRoute>
                <AccountSettings />
              </PrivateRoute>
            }
          />
          <Route
            path="motor-third-party"
            element={
              <PrivateRoute>
                <Mtp policyCategory="mtp" />
              </PrivateRoute>
            }
          />
          <Route
            path="windscreen"
            element={
              <PrivateRoute>
                <Windscreen policyCategory="windscreen" />
              </PrivateRoute>
            }
          />
          <Route
            path="comprehensive"
            element={
              <PrivateRoute>
                <Mtp policyCategory="comprehensive" />
              </PrivateRoute>
            }
          />
          <Route
            path="new-import"
            element={
              <PrivateRoute>
                <Mtp policyCategory="newImport" />
              </PrivateRoute>
            }
          />
          <Route
            path="transit"
            element={
              <PrivateRoute>
                <Mtp policyCategory="transit" />
              </PrivateRoute>
            }
          />
        </Route>
        {/* Admin Routes */}
        <Route path="/admin">
          <Route
            index
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="organisations"
            element={
              <PrivateRoute>
                <Organisations />
              </PrivateRoute>
            }
          />
          <Route
            path="add-organisations"
            element={
              <PrivateRoute>
                <AddOrganisation />
              </PrivateRoute>
            }
          />
          <Route
            path="clients"
            element={
              <PrivateRoute>
                <Clients />
              </PrivateRoute>
            }
          />
          <Route
            path="agents"
            element={
              <PrivateRoute>
                <Agents />
              </PrivateRoute>
            }
          />
          <Route
            path="add-agent"
            element={
              <PrivateRoute>
                <AddUsers role="agent" />
              </PrivateRoute>
            }
          />
          <Route
            path="add-supervisor"
            element={
              <PrivateRoute>
                <AddUsers role="supervisor" />
              </PrivateRoute>
            }
          />
          <Route
            path="supervisors"
            element={
              <PrivateRoute>
                <Supervisors />
              </PrivateRoute>
            }
          />
          <Route
            path="user-management"
            element={
              <PrivateRoute>
                <Supervisors />
              </PrivateRoute>
            }
          />
          <Route
            path="claims"
            element={
              <PrivateRoute>
                <Claims />
              </PrivateRoute>
            }
          />
          <Route
            path="sticker-management"
            element={
              <PrivateRoute>
                <StickerMgt />
              </PrivateRoute>
            }
          />
          <Route
            path="sticker-number"
            element={
              <PrivateRoute>
                <AddStickerRange />
              </PrivateRoute>
            }
          />
          <Route
            path="settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="motor-third-party"
            element={
              <PrivateRoute>
                <Mtp policyCategory="mtp" />
              </PrivateRoute>
            }
          />
          <Route
            path="windscreen"
            element={
              <PrivateRoute>
                <Windscreen policyCategory="windscreen" />
              </PrivateRoute>
            }
          />
          <Route
            path="comprehensive"
            element={
              <PrivateRoute>
                <Mtp policyCategory="comprehensive" />
              </PrivateRoute>
            }
          />
          <Route
            path="new-import"
            element={
              <PrivateRoute>
                <Mtp policyCategory="newImport" />
              </PrivateRoute>
            }
          />
          <Route
            path="transit"
            element={
              <PrivateRoute>
                <Mtp policyCategory="transit" />
              </PrivateRoute>
            }
          />
          <Route
            path="view-log-trail"
            element={
              <PrivateRoute>
                <Logs />
              </PrivateRoute>
            }
          />
          <Route
            path="reports"
            element={
              <PrivateRoute>
                <Reports />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Supervisors  */}
        <Route path="/supervisor">
          <Route
            index
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="add-agent"
            element={
              <PrivateRoute>
                <AddUsers role="agent" />
              </PrivateRoute>
            }
          />
          <Route
            path="add-clients"
            element={
              <PrivateRoute>
                <AddUsers role="Customer" />
              </PrivateRoute>
            }
          />
          <Route
            path="clients"
            element={
              <PrivateRoute>
                <Clients />
              </PrivateRoute>
            }
          />
          <Route
            path="agents"
            element={
              <PrivateRoute>
                <Agents />
              </PrivateRoute>
            }
          />
          <Route
            path="add-agents"
            element={
              <PrivateRoute>
                <AddUsers role="agent" />
              </PrivateRoute>
            }
          />
          <Route
            path="view-log-trail"
            element={
              <PrivateRoute>
                <Logs />
              </PrivateRoute>
            }
          />
          <Route
            path="reports"
            element={
              <PrivateRoute>
                <Reports />
              </PrivateRoute>
            }
          />
          <Route
            path="settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="claims"
            element={
              <PrivateRoute>
                <Claims />
              </PrivateRoute>
            }
          />
          <Route
            path="add-claim"
            element={
              <PrivateRoute>
                <AddClaims />
              </PrivateRoute>
            }
          />
          <Route
            path="motor-third-party"
            element={
              <PrivateRoute>
                <Mtp policyCategory="mtp" />
              </PrivateRoute>
            }
          />
          <Route
            path="add-mtp"
            element={
              <PrivateRoute>
                <Policies
                  cat="mtp"
                  btn_txt="Process 3rd Party"
                  pol="motor third party"
                />
              </PrivateRoute>
            }
          />
          <Route
            path="add-comprehensive"
            element={
              <PrivateRoute>
                <Policies
                  cat="comprehensive"
                  btn_txt="Process Comprehensive"
                  pol="comprehensive"
                />
              </PrivateRoute>
            }
          />
          <Route
            path="add-newImport"
            element={
              <PrivateRoute>
                <Policies
                  cat="newImport"
                  btn_txt="Process New import"
                  pol="new import"
                />
              </PrivateRoute>
            }
          />
          <Route
            path="add-transit"
            element={
              <PrivateRoute>
                <Policies
                  cat="transit"
                  btn_txt="Process Transit"
                  pol="transit"
                />
              </PrivateRoute>
            }
          />
          <Route
            path="add-windscreen"
            element={
              <PrivateRoute>
                <Policies
                  cat="windscreen"
                  btn_txt="Process Windscreen"
                  pol="windscreen"
                />
              </PrivateRoute>
            }
          />
          <Route
            path="policy-details/:id"
            element={
              <PrivateRoute>
                <PolicyDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="policy-renew/:id"
            element={
              <PrivateRoute>
                <PolicyRenew />
              </PrivateRoute>
            }
          />
          <Route
            path="windscreen"
            element={
              <PrivateRoute>
                <Mtp policyCategory="windscreen" />
              </PrivateRoute>
            }
          />
          <Route
            path="comprehensive"
            element={
              <PrivateRoute>
                <Mtp policyCategory="comprehensive" />
              </PrivateRoute>
            }
          />
          <Route
            path="new-import"
            element={
              <PrivateRoute>
                <Mtp policyCategory="newImport" />
              </PrivateRoute>
            }
          />
          <Route
            path="transit"
            element={
              <PrivateRoute>
                <Mtp policyCategory="transit" />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Agents  */}
        <Route path="/agent">
          <Route
            index
            element={
              <PrivateRoute>
                <Dashboard largeContentClass={largeContentClass} />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="add-agent"
            element={
              <PrivateRoute>
                <AddUsers role="agent" />
              </PrivateRoute>
            }
          />
          <Route
            path="add-clients"
            element={
              <PrivateRoute>
                <AddUsers role="Customer" />
              </PrivateRoute>
            }
          />
          <Route
            path="clients"
            element={
              <PrivateRoute>
                <Clients />
              </PrivateRoute>
            }
          />
          <Route
            path="agents"
            element={
              <PrivateRoute>
                <Agents />
              </PrivateRoute>
            }
          />
          <Route
            path="add-agents"
            element={
              <PrivateRoute>
                <AddUsers role="agent" />
              </PrivateRoute>
            }
          />
          <Route
            path="view-log-trail"
            element={
              <PrivateRoute>
                <Logs />
              </PrivateRoute>
            }
          />
          <Route
            path="reports"
            element={
              <PrivateRoute>
                <Reports />
              </PrivateRoute>
            }
          />
          <Route
            path="settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="claims"
            element={
              <PrivateRoute>
                <Claims />
              </PrivateRoute>
            }
          />
          <Route
            path="add-claim"
            element={
              <PrivateRoute>
                <AddClaims />
              </PrivateRoute>
            }
          />
          <Route
            path="motor-third-party"
            element={
              <PrivateRoute>
                <Mtp policyCategory="mtp" />
              </PrivateRoute>
            }
          />
          <Route
            path="windscreen"
            element={
              <PrivateRoute>
                <Mtp policyCategory="windscreen" />
              </PrivateRoute>
            }
          />
          <Route
            path="comprehensive"
            element={
              <PrivateRoute>
                <Mtp policyCategory="comprehensive" />
              </PrivateRoute>
            }
          />
          <Route
            path="new-import"
            element={
              <PrivateRoute>
                <Mtp policyCategory="newImport" />
              </PrivateRoute>
            }
          />
          <Route
            path="transit"
            element={
              <PrivateRoute>
                <Mtp policyCategory="transit" />
              </PrivateRoute>
            }
          />
          <Route
            path="add-mtp"
            element={
              <PrivateRoute>
                <Policies
                  cat="mtp"
                  btn_txt="Process 3rd Party"
                  pol="motor third party"
                />
              </PrivateRoute>
            }
          />
          <Route
            path="add-comprehensive"
            element={
              <PrivateRoute>
                <Policies
                  cat="comprehensive"
                  btn_txt="Process Comprehensive"
                  pol="comprehensive"
                />
              </PrivateRoute>
            }
          />
          <Route
            path="add-newImport"
            element={
              <PrivateRoute>
                <Policies
                  cat="newImport"
                  btn_txt="Process New import"
                  pol="new import"
                />
              </PrivateRoute>
            }
          />
          <Route
            path="add-transit"
            element={
              <PrivateRoute>
                <Policies
                  cat="transit"
                  btn_txt="Process Transit"
                  pol="transit"
                />
              </PrivateRoute>
            }
          />
          <Route
            path="add-windscreen"
            element={
              <PrivateRoute>
                <Policies
                  cat="windscreen"
                  btn_txt="Process Windscreen"
                  pol="windscreen"
                />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

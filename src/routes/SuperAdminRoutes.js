import PrivateRoute from "./PrivateRoute";
import Admins from "../pages/superAdmin/Admins";
import SystemLogs from "../pages/superAdmin/SystemLogs";
import Organisations from "../pages/admin/Organisations";
import AddOrganisation from "../pages/admin/AddOrganisation";
import { Mtp, AddUsers, Claims, Dashboard, Settings } from "../pages";
import { Route } from "react-router-dom";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

function SuperAdminRoutes() {
  return (
    <Fragment>
      <Outlet />
      {/* 
      <PrivateRoute path="/superadmin/settings">
        <Settings parent_container={largeContentClass} />
      </PrivateRoute>
      <PrivateRoute path="/superadmin/system-logs">
        <SystemLogs parent_container={largeContentClass} />
      </PrivateRoute>
      <PrivateRoute path="/superadmin/motor-third-party">
        <Mtp parent_container={largeContentClass} policyCategory="mtp" />
      </PrivateRoute>
      <PrivateRoute path="/superadmin/windscreen">
        <Mtp parent_container={largeContentClass} policyCategory="windscreen" />
      </PrivateRoute>
      <PrivateRoute path="/superadmin/comprehensive">
        <Mtp
          parent_container={largeContentClass}
          policyCategory="comprehensive"
        />
      </PrivateRoute>
      <PrivateRoute path="/superadmin/new-import">
        <Mtp parent_container={largeContentClass} policyCategory="newImport" />
      </PrivateRoute>
      <PrivateRoute path="/superadmin/transit">
        <Mtp parent_container={largeContentClass} policyCategory="transit" />
      </PrivateRoute> */}
    </Fragment>
  );
}

export default SuperAdminRoutes;

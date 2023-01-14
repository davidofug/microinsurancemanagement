import useAuth from "contexts/Auth";
import { useToggleMenu } from "hooks";
import { SuperAdminMenu } from "pages";
import { SupervisorMenu } from "pages";
import { AdminMenu } from "pages";
import AgentMenus from "./AgentMenus";

function Container({ children }) {
  const { currentUser, authClaims } = useAuth();
  const [largeContentClass, minimiseMenu, maximiseMenu] = useToggleMenu();
  return (
    <div
      className={largeContentClass ? "top-container-large" : `top-container`}
    >
      <div className="MenuSide tw-z-10">
        {authClaims?.superadmin && (
          <SuperAdminMenu
            largeContentClass={largeContentClass}
            minimiseMenu={minimiseMenu}
            maximiseMenu={maximiseMenu}
          />
        )}
        {authClaims?.admin && (
          <AdminMenu
            largeContentClass={largeContentClass}
            minimiseMenu={minimiseMenu}
            maximiseMenu={maximiseMenu}
          />
        )}
        {authClaims?.supervisor && (
          <SupervisorMenu
            largeContentClass={largeContentClass}
            minimiseMenu={minimiseMenu}
            maximiseMenu={maximiseMenu}
          />
        )}
        {authClaims?.agent && <AgentMenus />}
      </div>
      <main className="lg:px-10">{children}</main>
    </div>
  );
}

export default Container;

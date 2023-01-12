import useAuth from "contexts/Auth";
import { useToggleMenu } from "hooks";
import { SuperAdminMenu } from "pages";
import { SupervisorMenu } from "pages";
import { AdminMenu } from "pages";

function Container({ children }) {
  const { currentUser, authClaims } = useAuth();
  const [largeContentClass, minimiseMenu, maximiseMenu] = useToggleMenu();
  return (
    <div
      className={largeContentClass ? "top-container-large" : `top-container`}
    >
      <div className="MenuSide">
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
      </div>
      <main>{children}</main>
    </div>
  );
}

export default Container;

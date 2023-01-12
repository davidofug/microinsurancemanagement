import useAuth from "contexts/Auth";
import { useToggleMenu } from "hooks";
import AgentMtpMenu from "pages/agent/AgentMenu";
import { AgentCompMenu, AgentMtpCompMenu, AgentMtpCompWindMenu } from "pages";

function AgentMenus() {
  const { currentUser, authClaims } = useAuth();
  const [largeContentClass, minimiseMenu, maximiseMenu] = useToggleMenu();
  return (
    <>
      {/* mtp agents */}
      {authClaims?.mtp &&
        !authClaims?.comprehensive &&
        !authClaims.windscreen && (
          <AgentMtpMenu
            minimiseMenu={minimiseMenu}
            maximiseMenu={maximiseMenu}
            largeContentClass={largeContentClass}
          />
        )}
      {/* comprehensive agents */}
      {!authClaims?.mtp && authClaims?.comprehensive && (
        <AgentCompMenu
          largeContentClass={largeContentClass}
          minimiseMenu={minimiseMenu}
          maximiseMenu={maximiseMenu}
        />
      )}
      {/* windscreen agents */}
      {authClaims?.windscreen &&
        !authClaims?.mtp &&
        !authClaims?.comprehensive && (
          <AgentCompMenu
            largeContentClass={largeContentClass}
            minimiseMenu={minimiseMenu}
            maximiseMenu={maximiseMenu}
          />
        )}
      {/* mtp and comprehensive agents */}
      {authClaims?.mtp &&
        authClaims?.comprehensive &&
        !authClaims?.windscreen && (
          <AgentMtpCompMenu
            largeContentClass={largeContentClass}
            minimiseMenu={minimiseMenu}
            maximiseMenu={maximiseMenu}
          />
        )}
      {/* mtp and comprehensive and windscreen agents */}
      {authClaims?.mtp &&
        authClaims?.comprehensive &&
        authClaims?.windscreen && (
          <AgentMtpCompWindMenu
            largeContentClass={largeContentClass}
            minimiseMenu={minimiseMenu}
            maximiseMenu={maximiseMenu}
          />
        )}
    </>
  );
}

export default AgentMenus;

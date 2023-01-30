import menuData from "../../components/menuData";
import "../../assets/styles/menu.css";
import { Link } from "react-router-dom";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import MobileNav from "../../components/menu/MobileNav";
import SideBar from "../../components/menu/SideBar";
import MinimisedSideBar from "../../components/menu/MinimisedSideBar";
import { authentication } from "../../helpers/firebase";
import { MdLogout } from "react-icons/md";
import DefaultAvatar from "../../components/DefaultAvatar";
import { ImProfile } from "react-icons/im";
import useDialog from "../../hooks/useDialog";
import useAuth from "../../contexts/Auth";
import { MdSettings } from "react-icons/md";

function AgentMtpMenu({ minimiseMenu, maximiseMenu }) {
  const preferredToggleMenu =
    localStorage.getItem("preferredToggleMenu") || true;
  const { Agent } = menuData;
  const [toggleMenu, showToggleMenu, hideToggleMenu] = useDialog(
    JSON.parse(preferredToggleMenu)
  );
  const [show, handleShow, handleClose] = useDialog();

  const { logout, logo, logoSm } = useAuth();
  const handleLogout = async () => {
    try {
      window.location = "/";
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  // actions context
  if (show) {
    window.onclick = (event) =>
      !event.target.matches(".footerContext") ? handleClose() : null;
  }

  return (
    <div className="menuSide">
      <MobileNav
        role={Agent}
        user="agent"
        displayName={authentication?.currentUser?.displayName}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      {toggleMenu === true ? (
        <nav className="sidebar">
          <div id="brand">
            <img width={150} src={logo} alt="SWICO" />
            <div
              id="arrowCircle"
              onClick={() => {
                hideToggleMenu();
                minimiseMenu();
              }}
            >
              <HiOutlineChevronLeft
                style={{ color: "#c6c7c8", fontSize: "15px" }}
              />
            </div>
          </div>
          <SideBar
            role={Agent}
            user="agent"
            displayName={authentication?.currentUser?.displayName}
          />

          <footer
            className="footerContext"
            onClick={(event) => {
              show ? handleClose() : handleShow();
              event.stopPropagation();
            }}
          >
            <div className="footerContext tw-w-full tw-h-full tw-flex tw-px-3 tw-py-2 tw-gap-3 tw-items-center">
              {authentication?.currentUser.photoURL !==
                "https://firebasestorage.googleapis.com/v0/b/car-insurance-app.appspot.com/o/default-user-image.png?alt=media&token=f9f8f8e9-f8f8-4f8f-8f8f-f8f8f8f8f8f8" &&
              authentication?.currentUser.photoURL !==
                "https://example.com/jane-doe/photo.jpg" ? (
                <img
                  src={authentication?.currentUser.photoURL}
                  alt={authentication?.currentUser.displayName}
                  width={50}
                  height={50}
                  className="tw-rounded-full tw-overflow-hidden"
                />
              ) : (
                <DefaultAvatar />
              )}
              <div className="">
                <p className="tw-font-medium tw-text-lg tw-m-0">
                  <span>
                    {(authentication?.currentUser?.displayName).split(" ")[0]}{" "}
                  </span>
                  <span>
                    {(authentication?.currentUser?.displayName).split(" ")[1]}
                  </span>
                </p>
                <span className="tw-text-gray-400 tw-text-sm">Agent</span>
              </div>
            </div>
            <ul
              className={
                show
                  ? "tw-flex tw-flex-col tw-bg-white tw-border tw-border-gray-300 tw-rounded-lg tw-text-sm tw-py-4 tw-px-2 tw-text-gray-500 tw-shadow-lg tw-absolute tw-bottom-20"
                  : "tw-hidden"
              }
              id="contextUl"
            >
              <Link
                to="/agent/settings"
                className="tw-flex tw-hover:bg-gray-100 tw-gap-2 tw-cursor-pointer tw-items-center tw-py-3 tw-text-gray-500 hover:tw-text-gray-500 hover:tw-bg-gray-100 tw-px-5 tw-rounded"
                onClick={() =>
                  localStorage.setItem("onRefresh", "/agent/settings")
                }
              >
                <ImProfile /> My Profile
              </Link>
              <div className="tw-flex tw-hover:bg-gray-100 tw-gap-2 tw-cursor-pointer tw-items-center tw-py-3 tw-text-gray-500 hover:tw-text-gray-500 hover:tw-bg-gray-100 tw-px-5 tw-rounded">
                <MdSettings /> Account Settings
              </div>

              <hr className="tw-my-3 tw-border-gray-600" />

              <li
                onClick={handleLogout}
                className="tw-flex tw-hover:bg-gray-100 tw-gap-2 tw-cursor-pointer tw-items-center tw-py-3 tw-text-gray-500 hover:tw-text-gray-500 hover:tw-bg-gray-100 tw-px-5 tw-rounded"
              >
                <MdLogout /> Logout
              </li>
            </ul>
          </footer>
        </nav>
      ) : (
        <nav className="sidebar-m">
          <section id="brand_m">
            <img width={35} src={logoSm} alt="SWICO" />
            <div
              id="arrowOutCircle"
              onClick={() => {
                showToggleMenu();
                maximiseMenu();
              }}
            >
              <HiOutlineChevronRight
                style={{ color: "#c6c7c8", fontSize: "15px" }}
              />
            </div>
          </section>
          <MinimisedSideBar role={Agent} />
          <footer
            onClick={(event) => {
              show ? handleClose() : handleShow();
              event.stopPropagation();
            }}
            className="tw-relative"
          >
            <div className="tw-flex tw-justify-center tw-items-center tw-w-full tw-h-full tw-px-3 tw-py-2 tw-gap-3">
              <DefaultAvatar />
            </div>
            <ul
              className={
                show
                  ? "tw-flex tw-flex-col tw-bg-white tw-border tw-border-gray-300 tw-w-52 tw-rounded-lg tw-text-sm tw-py-4 tw-px-2 tw-text-gray-500 tw-shadow-lg tw-absolute tw-bottom-5 tw-left-16"
                  : "tw-hidden"
              }
              id="contextUl"
            >
              <Link
                to="/agent/settings"
                className="tw-flex tw-hover:bg-gray-100 tw-gap-2 tw-cursor-pointer tw-items-center tw-py-3 tw-text-gray-500 hover:tw-text-gray-500 hover:tw-bg-gray-100 tw-px-5 tw-rounded"
                onClick={() =>
                  localStorage.setItem("onRefresh", "/agent/settings")
                }
              >
                <ImProfile /> My Profile
              </Link>
              <div className="tw-flex tw-hover:bg-gray-100 tw-gap-2 tw-cursor-pointer tw-items-center tw-py-3 tw-text-gray-500 hover:tw-text-gray-500 hover:tw-bg-gray-100 tw-px-5 tw-rounded">
                <MdSettings /> Account Settings
              </div>

              <hr className="tw-my-3 tw-border-gray-600" />

              <li
                onClick={handleLogout}
                className="tw-flex tw-hover:bg-gray-100 tw-gap-2 tw-cursor-pointer tw-items-center tw-py-3 tw-text-gray-500 hover:tw-text-gray-500 hover:tw-bg-gray-100 tw-px-5 tw-rounded"
              >
                <MdLogout /> Logout
              </li>
            </ul>
          </footer>
        </nav>
      )}
    </div>
  );
}

export default AgentMtpMenu;

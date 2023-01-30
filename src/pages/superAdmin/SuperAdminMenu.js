import menuData from "../../components/menuData";
import "../../assets/styles/menu.css";
import { Link } from "react-router-dom";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import MobileNav from "../../components/menu/MobileNav";
import SideBar from "../../components/menu/SideBar";
import MinimisedSideBar from "../../components/menu/MinimisedSideBar";
import { authentication } from "../../helpers/firebase";
import DefaultAvatar from "../../components/DefaultAvatar";
import { MdLogout, MdSettings } from "react-icons/md";
import useDialog from "../../hooks/useDialog";
import { ImProfile } from "react-icons/im";
import useAuth from "../../contexts/Auth";

function SuperAdminMenu({ minimiseMenu, maximiseMenu }) {
  const preferredToggleMenu =
    localStorage.getItem("preferredToggleMenu") || true;
  const { SuperAdmin } = menuData;
  const [toggleMenu, showToggleMenu, hideToggleMenu] = useDialog(
    JSON.parse(preferredToggleMenu)
  );
  const [show, handleShow, handleClose] = useDialog();

  const { logout, logo, logoSm } = useAuth();
  const handleLogout = async () => {
    try {
      localStorage.removeItem("onRefresh");
      await logout();
      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };

  if (show) {
    window.onclick = (event) =>
      !event.target.matches(".footerContext") ? handleClose() : null;
  }

  return (
    <div className="menuSide">
      <MobileNav
        role={SuperAdmin}
        user="superadmin"
        displayName={authentication?.currentUser?.displayName}
      />
      {toggleMenu === true ? (
        <nav className="sidebar">
          <div id="brand">
            <img width={120} src={logo} alt="SWICO" />
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
          <SideBar role={SuperAdmin} user="superadmin" />
          <footer
            onClick={(event) => {
              show ? handleClose() : handleShow();
              event.stopPropagation();
            }}
            className="tw-relative"
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
                <span className="tw-text-gray-400 tw-text-sm">Super Admin</span>
              </div>
            </div>
            {/* </Link> */}
            <ul
              className={
                show
                  ? "tw-flex tw-flex-col tw-bg-white tw-border tw-border-gray-300 tw-rounded-lg tw-text-sm tw-py-4 tw-px-2 tw-text-gray-500 tw-shadow-lg tw-absolute tw-bottom-20"
                  : "tw-hidden"
              }
              id="contextUl"
            >
              <Link
                to="/superadmin/settings"
                className="tw-flex tw-hover:bg-gray-100 tw-gap-2 tw-cursor-pointer tw-items-center tw-py-3 tw-text-gray-500 hover:tw-text-gray-500 hover:tw-bg-gray-100 tw-px-5 tw-rounded"
                onClick={() =>
                  localStorage.setItem("onRefresh", "/agent/settings")
                }
              >
                <ImProfile /> My Profile
              </Link>
              <Link
                to="/superadmin/account-settings"
                className="tw-flex tw-hover:bg-gray-100 tw-gap-2 tw-cursor-pointer tw-items-center tw-py-3 tw-text-gray-500 hover:tw-text-gray-500 hover:tw-bg-gray-100 tw-px-5 tw-rounded"
                onClick={() =>
                  localStorage.setItem(
                    "onRefresh",
                    "/superadmin/account-settings"
                  )
                }
              >
                <MdSettings /> Account Settings
              </Link>

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
          <MinimisedSideBar role={SuperAdmin} />
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
                to="/superadmin/settings"
                className="tw-flex tw-hover:bg-gray-100 tw-gap-2 tw-cursor-pointer tw-items-center tw-py-3 tw-text-gray-500 hover:tw-text-gray-500 hover:tw-bg-gray-100 tw-px-5 tw-rounded"
                onClick={() =>
                  localStorage.setItem("onRefresh", "/superadmin/settings")
                }
              >
                <ImProfile /> My Profile
              </Link>
              <Link
                to="/superadmin/account-settings"
                className="tw-flex tw-hover:bg-gray-100 tw-gap-2 tw-cursor-pointer tw-items-center tw-py-3 tw-text-gray-500 hover:tw-text-gray-500 hover:tw-bg-gray-100 tw-px-5 tw-rounded"
                onClick={() =>
                  localStorage.setItem(
                    "onRefresh",
                    "/superadmin/account-settings"
                  )
                }
              >
                <MdSettings /> Account Settings
              </Link>

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

export default SuperAdminMenu;

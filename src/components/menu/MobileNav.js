import "../../assets/styles/menu.css";
import { Link, NavLink } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useState, useEffect } from "react";
import { Navbar, Offcanvas, Container, Nav } from "react-bootstrap";
import DefaultAvatar from "../DefaultAvatar";
import { ImProfile } from "react-icons/im";
import { Badge } from "react-bootstrap";
import { authentication } from "../../helpers/firebase";
import useAuth from "../../contexts/Auth";
import useDialog from "../../hooks/useDialog";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
// import './mobilenav.css'

export default function MobileNav({ role, user, displayName }) {
  const [selected, setSelected] = useState({ activeObject: null, role });
  const [show, handleShow, handleClose] = useDialog();
  const [subMenu, setSubMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
 
  

  if (show) {
    window.onclick = (event) =>
      !event.target.matches(".footerContext") ? handleClose() : null;
  }

  useEffect(() => {
    sessionStorage.getItem("session1")
      ? setSelected({
          ...selected,
          activeObject: selected.role[sessionStorage.getItem("session1") - 1],
        })
      : setSelected({ ...selected, activeObject: selected.role[0] });
  }, []);

  const toggleActive = (index) => {
    setSelected({ ...selected, activeObject: selected.role[index] });
    sessionStorage.setItem("session1", selected.role[index]["number"]);
  };

  const { logout, logo } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location = "/";
    } catch (error) {}
  };

  const toggleActiveClassStyle = (index) =>
    selected.role[index] === selected.activeObject
      ? "nav-linked selected"
      : "nav-linked";
  return (
    <div className="mobile-sidebar">
      <Navbar expand={false} className="hideThis">
        <Container fluid>
          <div className="d-flex align-items-center">
            <Navbar.Toggle
              className="m-3 buttonIcon"
              aria-controls="offcanvasNavbar"
              id="menuButton"
            />
            <Navbar.Brand>
              <img width={120} src={logo} alt="SWICO" />
            </Navbar.Brand>
          </div>
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            className="mobileSidebar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            style={{ display: "flex" }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                <img src={logo} width={120} alt="SWICO" />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <ul className="nav flex-column">
                  {selected.role !== null &&
                    selected.role.map((menuItem, index) => (
                      <ul className="nav-item" key={index}>
                        <NavLink
                          to={menuItem.link}
                          className={({ isActive }) =>
                            isActive
                              ? "tw-flex tw-cursor-pointer tw-px-3 tw-py-2 tw-gap-2 tw-items-center tw-bg-[#1f1f1f] tw-rounded mx-3 tw-text-white hover:tw-text-white"
                              : "tw-flex tw-cursor-pointer tw-gap-2 tw-items-center tw-px-3 tw-py-3 tw-rounded mx-3 hover:tw-text-gray-800 hover:tw-bg-gray-100"
                          }
                          onClick={() => {
                            toggleActive(index);
                            setSelectedIndex(index);
                            if (menuItem.subMenu) {
                              setSubMenu(!subMenu);
                            } else {
                              document.getElementById(
                                "offcanvasNavbar"
                              ).style.display = "none";
                              document.getElementsByClassName(
                                "show"
                              )[0].style.display = "none";
                              document
                                .getElementById("menuButton")
                                .classList.add("collapsed");
                              setSubMenu(false);
                            }
                          }}
                        >
                          {/* <div> */}
                          <span>{menuItem.icon}</span>
                          {menuItem.name}

                          {menuItem?.subMenu && (
                            <span>
                              {subMenu === true && selectedIndex === index ? (
                                <BsFillCaretUpFill
                                  style={{ fontSize: "10px" }}
                                />
                              ) : (
                                <BsFillCaretDownFill
                                  style={{ fontSize: "10px" }}
                                />
                              )}
                            </span>
                          )}
                          {/* </div> */}
                        </NavLink>
                        {subMenu === true && selectedIndex === index && (
                          <div
                            className="nav flex-column"
                            style={{
                              padding: "10px",
                              backgroundColor: "#f9fafb",
                              display: `${subMenu ? "hidden" : ""}`,
                              margin: "10px",
                              marginLeft: "20px",
                              borderRadius: "8px",
                            }}
                          >
                            {menuItem.subMenu.map((sub, index) => (
                              <Link
                                to={sub.link}
                                key={index}
                                className="subMenu-links"
                                onClick={() => {
                                  document.getElementById(
                                    "offcanvasNavbar"
                                  ).style.display = "none";
                                  document.getElementsByClassName(
                                    "show"
                                  )[0].style.display = "none";
                                  setSubMenu(false);
                                }}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </ul>
                    ))}
                </ul>
              </Nav>
            </Offcanvas.Body>

            <footer>
              <div
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
                  <div>
                    <p style={{ fontWeight: "500", fontSize: "1.05rem" }}>
                      {displayName}
                    </p>
                    <span className="tw-text-gray-400 tw-text-sm">
                      Super Admin
                    </span>
                  </div>
                </div>
              </div>
              {/* context menu */}
              <ul className={show ? "footerContextShow" : ""} id="contextUl">
                <li>
                  <Link to="/agent/settings">
                    <ImProfile /> My Profile
                  </Link>
                </li>
                <li onClick={handleLogout} id="button1">
                  <Link>
                    <MdLogout /> Logout
                  </Link>
                </li>
              </ul>
            </footer>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

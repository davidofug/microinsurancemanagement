import menuData from "../../parts/menuData";
import "../../assets/styles/menu.css";
import { useState, useEffect } from "react";
import logo from "../../assets/imgs/britam-logo.png";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import MobileNav from "../../parts/menu/MobileNav";
import SideBar from "../../parts/menu/SideBar";
import MinimisedSideBar from "../../parts/menu/MinimisedSideBar";
import { authentication } from "../../helpers/firebase";

export default function AdminMenu({ setLargeContentClass, largeContentClass }) {
  const { Admin } = menuData;
  const [selected, setSelected] = useState({ activeObject: null, Admin });
  const [toggleMenu, setToggeMenu] = useState(true);

  useEffect(() => {
    sessionStorage.getItem("session1")
      ? setSelected({
          ...selected,
          activeObject: selected.Admin[sessionStorage.getItem("session1") - 1],
        })
      : setSelected({ ...selected, activeObject: selected.Admin[0] });
      console.log(authentication.currentUser.displayName)
  }, []);

  const toggleActive = (index) => {
    setSelected({ ...selected, activeObject: selected.Admin[index] });
    sessionStorage.setItem("session1", selected.Admin[index]["number"]);
  };

  const toggleActiveClassStyle = (index) =>
    selected.Admin[index] === selected.activeObject
      ? "nav-linked selected"
      : "nav-linked";

  return (
    <div className="menuSide">
      <MobileNav role={Admin} user="supervisor"/>
      {toggleMenu === true ? (
        <div className="sidebar">
          <nav>
            <div id="brand">
              <img src={logo} alt="Britam" />
              <i
                onClick={() => {
                  setToggeMenu(!toggleMenu);
                  setLargeContentClass(!largeContentClass);
                }}
              >
                <HiOutlineChevronLeft />
              </i>
            </div>
            <SideBar role={Admin} user="admin" />
          </nav>
        </div>
      ) : (
        <nav className="sidebar-m">
          <section id="brand_m">
            <i
              onClick={() => {
                setToggeMenu(!toggleMenu);
                setLargeContentClass(!largeContentClass);
              }}
            >
              <HiOutlineChevronRight />
            </i>
          </section>
          <MinimisedSideBar role={Admin} />
        </nav>
      )}
    </div>
  );
}

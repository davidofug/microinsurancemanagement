import "../../assets/styles/menu.css";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SideBar({ role, user, displayName }) {
  const [selected, setSelected] = useState({ activeObject: null, role });
  // const [ toggleMenu, setToggeMenu ] = useState(true)

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

  const toggleActiveClassStyle = (index) =>
    selected.role[index] === selected.activeObject
      ? "nav-linked selected"
      : "nav-linked";

  return (
    <>
      <section className="position-sticky pt-3" id="menu_section">
        <ul className="nav flex-column tw-relative">
          {selected.role.map((menuItem, index) => (
            <li className="nav-item" key={index}>
              <NavLink
                to={menuItem.link}
                className={({ isActive }) =>
                  isActive
                    ? "tw-flex tw-cursor-pointer tw-px-3 tw-py-2 tw-gap-2 tw-items-center tw-bg-[#1f1f1f] tw-rounded mx-3 tw-text-white hover:tw-text-white"
                    : "tw-flex tw-cursor-pointer tw-gap-2 tw-items-center tw-px-3 tw-py-2 tw-rounded mx-3 hover:tw-text-gray-800 hover:tw-bg-gray-100"
                }
              >
                <span>{menuItem.icon}</span>
                {menuItem.name}
                {menuItem?.subMenu && (
                  <ul className="tw-absolute tw-left-[220px] tw-text-gray-800 hover:tw-text-gray-800">
                    {menuItem.subMenu.map((sub, index) => (
                      <li key={index}>
                        <Link
                          to={sub.link}
                          className="hover:tw-text-gray-800 tw-cursor-pointer"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

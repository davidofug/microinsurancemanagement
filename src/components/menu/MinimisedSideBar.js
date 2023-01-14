import "../../assets/styles/menu.css";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MinimisedSideBar({ role }) {
  const [selected, setSelected] = useState({ activeObject: null, role });

  useEffect(() => {
    sessionStorage.getItem("session1")
      ? setSelected({
          ...selected,
          activeObject: selected.role[sessionStorage.getItem("session1") - 1],
        })
      : setSelected({ ...selected, activeObject: selected.role[0] });
  }, []);

  return (
    <>
      <section className="position-sticky pt-3" id="menu_section">
        <ul className="nav flex-column tw-relative">
          {selected.role.map((object, index) => (
            <li className="nav-item" key={index}>
              <NavLink
                to={object.link}
                className={({ isActive }) =>
                  isActive
                    ? "tw-flex tw-cursor-pointer tw-px-3 tw-py-3 tw-gap-2 tw-items-center tw-bg-[#1f1f1f] tw-rounded mx-3 tw-text-white hover:tw-text-white tw-justify-center"
                    : "tw-flex tw-cursor-pointer tw-gap-2 tw-items-center tw-px-3 tw-py-3 tw-rounded mx-3 hover:tw-text-gray-800 hover:tw-bg-gray-100 tw-justify-center"
                }
              >
                <span>{object.icon}</span>
                {object?.subMenu && (
                  <ul className="tw-absolute tw-left-[60px] tw-text-gray-800 hover:tw-text-gray-800">
                    {object.subMenu.map((sub, index) => (
                      <li key={index}>
                        <Link
                          to={sub.link}
                          key={index}
                          style={{ color: "black" }}
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

import React, { useState } from "react";
import onClickOutside from "react-onclickoutside";
import { FaEllipsisV } from "react-icons/fa";

function ClickOut(props) {
  const [showDropdown, setShowDropdown] = useState(false);

  ClickOut.handleClickOutside = () => {
    setShowDropdown(false);
  };

  return (
    <div>
        <FaEllipsisV className="dropdown"
        onClick={() => {
            setShowDropdown(!showDropdown)
            }}/>
      {showDropdown ? 
        <div class="mydropdown-menu">
            <li className="dropdown-item" href="#">Edit</li>
            <li className="dropdown-item" href="#">Delete</li>
            <hr />
            <li className="dropdown-item" href="#">Close</li>
      </div>
        : null}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => ClickOut.handleClickOutside,
};

export default onClickOutside(ClickOut, clickOutsideConfig);

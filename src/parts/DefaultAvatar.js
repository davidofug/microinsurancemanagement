import React from "react";

function DefaultAvatar() {
  const displayName = "Default Admin";
  const lastName = displayName.split(" ")[1];
  const lastNameInitial = lastName.split("")[0];
  const firstNameInitial = displayName.split("")[0];
  return (
    <div className="avatarBG">
      <span>
        {firstNameInitial}
        {lastNameInitial}
      </span>
    </div>
  );
}

export default DefaultAvatar;
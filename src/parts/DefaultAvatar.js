import React from "react";
import useAuth from "../contexts/Auth";
import { authentication } from "../helpers/firebase";

function DefaultAvatar() {
  const { currentUser } = useAuth;
  //   console.log(authentication.currentUser.displayName)
  let displayName, lastName, firstNameInitial, lastNameInitial;
  if (currentUser !== null) {
    displayName = authentication?.currentUser?.displayName || "No User";
    lastName = displayName.split(" ")[1];
    lastNameInitial = lastName.split("")[0];
    firstNameInitial = displayName.split("")[0];
  }

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

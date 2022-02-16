import React from "react";
import useAuth from "../contexts/Auth";
import { authentication } from "../helpers/firebase";

function DefaultAvatar() {
  const { currentUser } = useAuth;
  //   console.log(authentication.currentUser.displayName)
  let displayName, lastNameInitial, fullNameInitials;
  if (currentUser !== null) {
    displayName = authentication?.currentUser?.displayName || "No User";
    if(displayName.split(" ")?.length > 1) {
      const [firstName, lastName] = displayName.split(" ")
      fullNameInitials = firstName[0].concat(lastName[0])
    } else {
      fullNameInitials = displayName.split("")[0]
    }
  }

  return (
    <div className="avatarBG">
      <span>
        {fullNameInitials}
      </span>
    </div>
  );
}

export default DefaultAvatar;

import useAuth from "../contexts/Auth";
import { authentication } from "../helpers/firebase";

function DefaultAvatar() {
  const { currentUser } = useAuth;
  let displayName, lastNameInitial, fullNameInitials;
  if (currentUser !== null) {
    displayName = authentication?.currentUser?.displayName || "No User";
    if (displayName.split(" ")?.length > 1) {
      const [firstName, lastName] = displayName.split(" ");
      fullNameInitials = firstName[0].concat(lastName[0]);
    } else {
      fullNameInitials = displayName.split("")[0];
    }
  }

  return (
    <div className="tw-h-12 tw-w-12 tw-rounded-full tw-bg-gray-400 tw-text-white tw-flex tw-justify-center tw-items-center tw-font-medium tw-text-lg">
      <span>{fullNameInitials}</span>
    </div>
  );
}

export default DefaultAvatar;

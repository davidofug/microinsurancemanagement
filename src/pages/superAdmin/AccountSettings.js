import { useEffect, useState } from "react";
import "../../styles/Settings.css";
import { Modal, Badge } from "react-bootstrap";
import Header from "../../components/header/Header";
import { db } from "../../helpers/firebase";
import { AiOutlineEdit } from "react-icons/ai";
import useDialog from "../../hooks/useDialog";
import useAuth from "../../contexts/Auth";
import { getAuth } from "firebase/auth";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import UpdateUser from "../../components/UpdateUser";
import { toast } from "react-toastify";
import "../../styles/ctas.css";
import logo from "../../assets/imgs/SWICO-LOGO.png";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../helpers/firebase";
import favicon from "../../assets/imgs/favicon.ico";

function AccountSettings() {
  const [show, handleShow, handleClose] = useDialog();
  const [meta, setMeta] = useState({});
  const { currentUser, setCurrentUser } = getAuth();
  const { authClaims } = useAuth();
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [uploadLogo, setUploadLogo] = useState(null);
  const [favLogo, setFavLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [favPreview, setFavPreview] = useState(null);

  useEffect(() => {
    document.title = "User Profile - SWICO";
    getUserMeta();
    return () => {};
  }, [show]);

  const getUserMeta = async () => {
    const docRef = doc(db, "usermeta", currentUser.uid);
    const docSnap = await getDoc(docRef);
    setMeta(docSnap.data());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const uploadIcons = httpsCallable(functions, "uploadIcons");
    uploadIcons({ logo: uploadLogo, favicon: favLogo })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="components">
      <Header title="System Settings" subtitle="CUSTOMIZE SYSTEM SETTINGS" />

      <div
        id="edit_profile"
        className="componentsData myProfile shadow-sm mb-3 mt-3"
      >
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="tw-overfow-hidden mb-5 tw-flex tw-flex-col">
            <div>
              <h3 className="mb-2">Logo</h3>
              <div className="tw-flex tw-flex-wrap tw-gap-3">
                <div className="tw-h-20 tw-w-20 mb-3 tw-outline tw-outline-1 tw-flex tw-justify-center tw-items-center">
                  <img src={logo} alt="system logo" />
                </div>
                {preview && (
                  <div className="tw-h-20 tw-w-20 mb-3 tw-outline tw-outline-1 tw-flex tw-justify-center tw-items-center">
                    <img
                      src={preview}
                      alt="system logo"
                      className="tw-h-full"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="tw-flex tw-flex-wrap tw-gap-2">
              <label>Change Logo</label>
              <input
                type="file"
                className="appearance-none tw-z-20 "
                onChange={(event) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(event.target.files[0]);

                  reader.onload = () => {
                    setUploadLogo(reader.result);
                  };
                  setPreview(window.URL.createObjectURL(event.target.files[0]));
                  // console.log(event.target.files[0])
                }}
                required
              />
            </div>
            <div>
              <h3 className="mb-2">Favicon</h3>
              <div className="tw-flex tw-flex-wrap tw-gap-3">
                <div className="tw-h-12 tw-w-12 mb-3 tw-outline tw-outline-1 tw-flex tw-justify-center tw-items-center">
                  <img src={favicon} alt="system icon" />
                </div>
                {favPreview && (
                  <div className="tw-h-12 tw-w-12 mb-3 tw-outline tw-outline-1 tw-flex tw-justify-center tw-items-center">
                    <img
                      src={favPreview}
                      alt="system icon"
                      className="tw-h-full"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="tw-flex tw-flex-wrap tw-gap-2">
              <label>Change Favicon</label>
              <input
                type="file"
                className="appearance-none tw-z-20 "
                onChange={(event) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(event.target.files[0]);

                  reader.onload = () => {
                    setFavLogo(reader.result);
                  };
                  setFavPreview(
                    window.URL.createObjectURL(event.target.files[0])
                  );
                  // console.log(event.target.files[0])
                }}
                required
              />
            </div>
          </div>

          <div>
            <h2 className="tw-text-lg tw-font-medium">System Name</h2>
            <h2>SWICO</h2>
          </div>
          <button
            type="submit"
            className="tw-bg-gray-900 tw-text-white tw-px-3 tw-py-2 tw-rounded tw-mt-5"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AccountSettings;

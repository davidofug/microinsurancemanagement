import { Form, Modal } from "react-bootstrap";
import DefaultAvatar from "./DefaultAvatar";
import { MdSave } from "react-icons/md";
import { Formik } from "formik";
import {
  updateProfile,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../helpers/firebase";
import { toast } from "react-toastify";
import useAuth from "../contexts/Auth";
import { useState } from "react";

function UpdateUser({
  currentUser,
  meta,
  handleClose,
  getUserMeta,
  // setCurrentUser,
}) {
  const { loading, setLoading, setUser, user, authClaims } = useAuth();
  const [singleDoc, setSingleDoc] = useState();

  const handleEditFormSubmit = async (event, values) => {
    setLoading(true);
    event.preventDefault();
    const docRef = doc(db, "usermeta", currentUser.uid);

    const credential = EmailAuthProvider.credential(
      currentUser.email,
      values.password
    );

    try {
      await reauthenticateWithCredential(currentUser, credential)
        .then(async () => {
          // update display name
          if (values.name !== "") {
            updateProfile(currentUser, {
              displayName: values.name,
            }).catch((error) => {});
          }

          if (values.email !== "") {
            // update email
            updateEmail(currentUser, values.email)
              .then()
              .catch((error) => {});
          }
          // update phone number and adddress
          if (meta) {
            await updateDoc(docRef, {
              phone: values.phone,
              address: values.address,
            });
          }
          toast.success("Successfully updated", { position: "top-center" });
        })
        .catch((error) => {
          toast.error(`${error.message}`, {
            position: "top-center",
          });
        });

      getUserMeta();
      handleClose();
    } catch (error) {
      toast.error(`Failed to update ${error.code}`, { position: "top-center" });
    }
    setLoading(false);
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Edit {currentUser.displayName}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: currentUser.displayName,
          email: currentUser.email,
          phone: meta?.phone || "",
          address: meta?.address || "",
          password: "",
        }}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          dirty,
          handleChange,
          handleBlur,
        }) => {
          return (
            <form
              id="update_claim"
              onSubmit={(event) => handleEditFormSubmit(event, values)}
            >
              <Modal.Body>
                <DefaultAvatar />
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="newPassword">Change Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    placeholder="Enter full Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="newPassword">Change Email</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    placeholder="Enter new address"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>
                {meta && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="newPassword">
                        Change Phone Number
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        id="phone"
                        placeholder="Enter new phone number"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="newPassword">
                        Change Address
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="address"
                        placeholder="Enter new address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Group>
                  </>
                )}
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="submitPassword">
                    Enter Password to confirm
                  </Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    value={values.password}
                    placeholder="Enter password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <button
                  type="submit"
                  style={{ justifyContent: "center", alignItems: "center" }}
                  className="tw-flex tw-bg-gray-900 tw-text-white tw-px-3 tw-py-2 tw-rounded tw-gap-2"
                >
                  <MdSave /> Save
                </button>
              </Modal.Footer>
            </form>
          );
        }}
      </Formik>
    </>
  );
}

export default UpdateUser;

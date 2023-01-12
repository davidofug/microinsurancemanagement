import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { functions, authentication, db } from "../helpers/firebase";
import { httpsCallable } from "firebase/functions";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

function ClientModal({ singleDoc, handleClose, getUsers }) {
  const [formData, setFormData] = useState(singleDoc);
  console.log("Form Data: ", singleDoc);

  // initialising the logs collection.
  const logCollectionRef = collection(db, "logs");

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const updateUser = httpsCallable(functions, "updateUser");
    updateUser(formData)
      .then(async () => {
        await addDoc(logCollectionRef, {
          timeCreated: `${new Date()
            .toISOString()
            .slice(
              0,
              10
            )} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
          type: "user update",
          status: "successful",
          message: `Successfully updated agent - ${singleDoc.name.toUpperCase()} by ${
            authentication.currentUser.displayName
          }`,
        });
      })
      .then(getUsers)
      .catch(async (error) => {
        toast.error(`Failed to update ${singleDoc.name}`, {
          position: "top-center",
        });
        console.log(error);
        await addDoc(logCollectionRef, {
          timeCreated: `${new Date()
            .toISOString()
            .slice(
              0,
              10
            )} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
          type: " user update",
          status: "failed",
          message: `Failed to update agent - ${singleDoc.name.toUpperCase()} by ${
            authentication.currentUser.displayName
          }`,
        });
      });

    toast.success("Successfully updated", { position: "top-center" });
  };

  // handling user promotion

  return (
    <>
      <ToastContainer />
      <Modal.Header closeButton>
        <Modal.Title>Edit {formData.name}'s Details</Modal.Title>
      </Modal.Header>
      <Form id="update_client" onSubmit={handleEditFormSubmit}>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Form.Label htmlFor="dateReported">Date of birth</Form.Label>
              <Form.Control
                type="date"
                id="date_of_birth"
                defaultValue={formData.meta.date_of_birth}
                onChange={(event) =>
                  setFormData((formData) => ({
                    ...formData,
                    meta: {
                      ...formData.meta,
                      date_of_birth: event.target.value,
                    },
                  }))
                }
              />
            </Form.Group>
            <Form.Group
              as={Col}
              className="addFormGroups"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Form.Label htmlFor="gender" checked="male">
                Gender <span className="required">*</span>
              </Form.Label>
              <div className="gender-options">
                <div>
                  <input
                    type="radio"
                    name="gender"
                    id="gender"
                    value="male"
                    className="addFormRadio"
                    defaultChecked={formData?.meta?.gender === "male"}
                    onChange={(event) =>
                      setFormData((formData) => ({
                        ...formData,
                        meta: { ...formData.meta, gender: event.target.value },
                      }))
                    }
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="gender"
                    id="gender"
                    value="female"
                    className="addFormRadio"
                    defaultChecked={formData?.meta?.gender === "female"}
                    onChange={(event) =>
                      setFormData((formData) => ({
                        ...formData,
                        meta: { ...formData.meta, gender: event.target.value },
                      }))
                    }
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
            </Form.Group>
          </Row>

          <Form.Group
            as={Col}
            className="addFormGroups"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Form.Label htmlFor="NIN">NIN</Form.Label>
            <Form.Control
              type="text"
              id="NIN"
              placeholder="Enter email"
              defaultValue={formData.meta.NIN}
              onChange={(event) =>
                setFormData((formData) => ({
                  ...formData,
                  meta: { ...formData.meta, NIN: event.target.value },
                }))
              }
            />
          </Form.Group>

          <Form.Group
            as={Col}
            className="addFormGroups"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              defaultValue={formData.name}
              onChange={(event) =>
                setFormData((formData) => ({
                  ...formData,
                  name: event.target.value,
                }))
              }
            />
          </Form.Group>

          <Row>
            <Form.Group
              as={Col}
              className="addFormGroups"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Form.Label htmlFor="phone">Phone Number</Form.Label>
              <Form.Control
                type="tel"
                id="phone"
                defaultValue={formData.meta.phone}
                onChange={(event) =>
                  setFormData((formData) => ({
                    ...formData,
                    meta: { ...formData.meta, phone: event.target.value },
                  }))
                }
              />
            </Form.Group>
            <Form.Group
              as={Col}
              className="addFormGroups"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Form.Label htmlFor="licenseNo">LicenseNo</Form.Label>
              <Form.Control
                type="text"
                id="licenseNo"
                defaultValue={formData.meta.licenseNo}
                onChange={(event) =>
                  setFormData((formData) => ({
                    ...formData,
                    meta: { ...formData.meta, licenseNo: event.target.value },
                  }))
                }
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="address">Address</Form.Label>
            <Form.Control
              id="address"
              placeholder="Enter your address"
              defaultValue={formData.meta.address}
              onChange={(event) =>
                setFormData((formData) => ({
                  ...formData,
                  meta: { ...formData.meta, address: event.target.value },
                }))
              }
            />
          </Form.Group>

          {/* <Form.Group className="mb-3" >
                <Form.Label htmlFor='user_role'>Role</Form.Label>
                <Form.Control id="user_role" placeholder="Enter user role" defaultValue={singleDoc.role.agent && 'agent'}/>
              </Form.Group> */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            type="submit"
            onClick={() => {
              handleClose();
            }}
            id="submit"
          >
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
}

export default ClientModal;

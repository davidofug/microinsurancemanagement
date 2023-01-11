import { Modal, Form, Row, Col, Button } from "react-bootstrap";
// import { getAuth  } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { functions, authentication, db } from "../helpers/firebase";
import { httpsCallable } from "firebase/functions";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

function ClientModal({ singleDoc, handleClose, handleFieldChange, getUsers }) {
  // const auth = getAuth();

  // initialising the logs collection.
  const logCollectionRef = collection(db, "logs");

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const updateUser = httpsCallable(functions, "updateUser");
    console.log("update user", updateUser);
    console.log(singleDoc);
    updateUser({
      uid: singleDoc.uid,
      displayName: event.target.name.value,
      // user_role: event.target.user_role.value,
      supervisor: agentPromo,
      agent: !!singleDoc.role.agent,
    })
      .then(async () => {})
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
      .catch(async (error) => {
        console.log(error);
        toast.error(`Failed to update ${singleDoc.name}`, {
          position: "top-center",
        });
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

    // getUsers()
    toast.success("Successfully updated", { position: "top-center" });
  };

  // handling user promotion
  const [agentPromo, setAgentPromo] = useState(false);
  const handleAgentPromotion = () => {
    setAgentPromo(true);
  };
  const handleAgentPromotionDecline = () => {
    setAgentPromo(false);
  };

  return (
    <>
      <ToastContainer />
      <Modal.Header closeButton>
        <Modal.Title>Edit {singleDoc.name}'s Details</Modal.Title>
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
                defaultValue={singleDoc.meta.date_of_birth}
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
                {singleDoc.meta.gender === "male" ? (
                  <>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        id="gender"
                        value="male"
                        className="addFormRadio"
                        defaultChecked
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
                      />
                      <label htmlFor="female">Female</label>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        id="gender"
                        value="male"
                        className="addFormRadio"
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
                        defaultChecked
                      />
                      <label htmlFor="female">Female</label>
                    </div>
                  </>
                )}
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
              defaultValue={singleDoc.meta.NIN}
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
            <Form.Control type="text" id="name" defaultValue={singleDoc.name} />
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
                defaultValue={singleDoc.meta.phone}
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
                defaultValue={singleDoc.meta.licenseNo}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="address">Address</Form.Label>
            <Form.Control
              id="address"
              placeholder="Enter your address"
              defaultValue={singleDoc.meta.address}
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

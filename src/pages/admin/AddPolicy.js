import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "../../assets/styles/addClients.css";
import Header from "../../components/header/Header";
import { authentication, db } from "../../helpers/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useForm } from "../../hooks/useForm";
import Loader from "../../components/Loader";
import PasswordGenerator from "../../components/PasswordGenerator";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Chat from "../../components/messenger/Chat";

// firebase storage..
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../helpers/firebase";
import "../../styles/ctas.css";

export default function AddPolicy({ parent_container }) {
  useEffect(() => {
    document.title = "Add Policy - SWICO";
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  // initialising the logs doc.
  const logCollectionRef = collection(db, "logs");
  const [logo, setLogo] = useState("");

  const organisationsCollectionRef = collection(db, "organisations");
  const [fields, handleFieldChange] = useForm({
    uid: authentication.currentUser.uid,
    category: "",
    name: "",
    org_email: "",
    tel: "",
    address: "",
    logo: "",
    role: "",
    title: "",
    contactName: "",
    contactPhoneNumber: "",
    contact_email: "",
    password: "",
  });

  const [url, setUrl] = useState("");
  //       const [ logo, setLogo ] = useState(null)
  const [progress, setProgress] = useState(0);

  const createOrganisation = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    // fields.logo = url
    fields.password = password;

    if (logo) {
      const storageRef = ref(storage, `images/${logo.name}`);
      console.log(storageRef);
      const uploadTask = uploadBytesResumable(storageRef, logo);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(prog);
        },
        (error) => console.log(error),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadUrl) => {
              fields.logo = downloadUrl;
            })
            .then(async () => {
              await addDoc(organisationsCollectionRef, fields)
                .then(() => {
                  toast.success(`successfully added ${fields.name}`, {
                    position: "top-center",
                  });
                })
                .then(async () => {
                  await addDoc(logCollectionRef, {
                    timeCreated: `${new Date()
                      .toISOString()
                      .slice(
                        0,
                        10
                      )} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
                    type: "organisation creation",
                    status: "successful",
                    message: `Successfully created organisation: ${fields.name} by ${authentication.currentUser.displayName}`,
                  });
                })
                .then(() => {
                  setIsLoading(false);
                  document.form2.reset();
                  setPassword("");
                })
                .catch(async () => {
                  toast.error(`Failed: couldn't added ${fields.name}`, {
                    position: "top-center",
                  });

                  await addDoc(logCollectionRef, {
                    timeCreated: `${new Date()
                      .toISOString()
                      .slice(
                        0,
                        10
                      )} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
                    type: "organisation creation",
                    status: "failed",
                    message: `Failed to create organisation: ${fields.name} by ${authentication.currentUser.displayName}`,
                  });
                  setIsLoading(false);
                  document.form2.reset();
                  setPassword("");
                });
            });
        }
      );
    } else {
      await addDoc(organisationsCollectionRef, fields)
        .then(() => {
          toast.success(`successfully added ${fields.name}`, {
            position: "top-center",
          });
          setIsLoading(false);
          document.form2.reset();
          setPassword("");
        })
        .then(async () => {
          await addDoc(logCollectionRef, {
            timeCreated: `${new Date()
              .toISOString()
              .slice(
                0,
                10
              )} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            type: "organisation creation",
            status: "successful",
            message: `Successfully created organisation: ${fields.name} by ${authentication.currentUser.displayName}`,
          });
        })
        .catch(async () => {
          toast.error(`Failed: couldn't added ${fields.name}`, {
            position: "top-center",
          });
          setIsLoading(false);
          document.form2.reset();
          setPassword("");
          await addDoc(logCollectionRef, {
            timeCreated: `${new Date()
              .toISOString()
              .slice(
                0,
                10
              )} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            type: "organisation creation",
            status: "failed",
            message: `Failed to create organisation: ${fields.name} by ${authentication.currentUser.displayName}`,
          });
        });
    }
  };

  return (
    <div /* className='components' */>
      <Header title="Add Policy" subtitle="ADD A NEW POLICY" />
      <ToastContainer />
      <div className="addComponentsData mb-5 shadow-sm">
        {isLoading && (
          <div className="loader-wrapper">
            <Loader />
          </div>
        )}

        <div id="addPolicyForm">
          <Form name="form2" onSubmit={createOrganisation}>
            <div className="organisation-columns">
              <div
                style={{
                  padding: "1rem",
                }}
              >
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="name">
                    Policy Name <span className="required">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    placeholder="Enter policy"
                    onChange={handleFieldChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="address">Description</Form.Label>
                  <Form.Control
                    as={"textarea"}
                    id="address"
                    placeholder="Enter description"
                    onChange={handleFieldChange}
                  />
                </Form.Group>
              </div>
            </div>
            <div id="submit">
              <input type="submit" value="Add Policy" className="btn cta" />
            </div>
          </Form>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          position: "fixed",
          bottom: "0px",
          display: "flex",
          justifyContent: "flex-end",
        }}
        className={
          parent_container ? "chat-container" : "expanded-menu-chat-container"
        }
      >
        <Chat />
      </div>
    </div>
  );
}

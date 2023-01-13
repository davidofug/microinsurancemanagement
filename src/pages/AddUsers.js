import "../assets/styles/addClients.css";
import { httpsCallable } from "firebase/functions";
import { authentication, db, functions } from "../helpers/firebase";
import { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Upload from "../components/uploader/Upload";
import Header from "../components/header/Header";
import { useForm } from "../hooks/useForm";
import useAuth from "../contexts/Auth";
import Loader from "../components/Loader";
import PasswordGenerator from "../components/PasswordGenerator";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { getDocs } from "firebase/firestore";
import { getUsers } from "../helpers/helpfulUtilities";

// firebase storage..
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../helpers/firebase";

function AddUsers({ role, parent_container }) {
  const { authClaims } = useAuth();
  const addUser = httpsCallable(functions, "addUser");
  useEffect(() => {
    document.title = "Add Users - SWICO";
    if (!authClaims.agent && role !== "Customer") {
      getOrganisations();
      getSupervisors();
    }
  }, []);
  const organisationsCollectionRef = collection(db, "organisations");

  const [comprehensive, setComprehensive] = useState(false);
  const [windscreen, setWindscreen] = useState(false);
  const [mtp, setMTP] = useState(false);
  const [newImport, setNewImport] = useState(false);
  const [transit, setTransit] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");

  // const [showOrganisation, setShowOrganisation] = useState(false)
  const [policyType, setPolicyType] = useState("");
  const [clientType, setClientType] = useState("individual");

  // initialising the logs doc.
  const logCollectionRef = collection(db, "logs");
  const [logo, setLogo] = useState(null);
  const [organisations, setOrganisations] = useState([]);
  const [supervisors, setSupervisors] = useState([]);

  /* const checkedOrganisation = () => {
        if(document.getElementById('supervisorCheck').checked){
            setShowOrganisation(true)
        } else {
            setShowOrganisation(false)
        }
    } */

  const getOrganisations = async () => {
    const data = await getDocs(organisationsCollectionRef);
    const organisationArray = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log("Organisations: ", organisationArray);
    organisationArray.length === 0
      ? setOrganisations(null)
      : setOrganisations(organisationArray);
  };

  const getSupervisors = () => {
    getUsers("supervisor").then((result) => {
      result.length === 0 ? setSupervisors(null) : setSupervisors(result);
    });
  };

  const [fields, handleFieldChange] = useForm({
    user_role: ["client", "customer", "Customer"].includes(role)
      ? "Customer"
      : role,
    organisation: "",
    email: "",
    name: "",
    dob: "",
    gender: "",
    phone: "",
    address: "",
    licenseNo: "",
    NIN: "",
    photo: "",
  });

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();

    if (comprehensive) fields["comprehensive"] = true;
    if (mtp) fields["mtp"] = true;
    if (windscreen) fields["windscreen"] = true;
    if (newImport) fields["newImport"] = true;
    if (transit) fields["transit"] = true;

    fields["added_by_uid"] = authentication.currentUser.uid;
    fields["added_by_name"] = authentication.currentUser.displayName;
    fields["password"] = password;
    fields["addedOn"] = `${new Date()
      .toISOString()
      .slice(
        0,
        10
      )} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    if (role === "agent" && authClaims.admin) {
      fields["supervisor"] = event.target.supervisor.value;
    }

    if (logo) {
      const storageRef = ref(storage, `images/${logo.name}`);
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
              fields.photo = downloadUrl;
            })
            .then(async () => {
              addUser(fields)
                .then(async (results) => {
                  toast.success(`Successfully added ${fields.name}`, {
                    position: "top-center",
                  });
                  setIsLoading(false);
                  document.form3.reset();
                })
                .then(async () => {
                  await addDoc(logCollectionRef, {
                    timeCreated: `${new Date()
                      .toISOString()
                      .slice(
                        0,
                        10
                      )} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
                    type: "user creation",
                    status: "successful",
                    message: `Successfully created ${fields.user_role} - [ ${fields.name} ] by ${authentication.currentUser.displayName}`,
                  });
                  setPassword("");
                  setLogo("");
                })
                .catch(async (error) => {
                  console.log(error);

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
                    type: "user creation",
                    status: "failed",
                    message: `Failed to created ${fields.user_role} - [ ${fields.name} ] by ${authentication.currentUser.displayName}`,
                  });

                  setPassword("");
                  setLogo("");
                });
            });
        }
      );
    } else {
      addUser(fields)
        .then(async (results) => {
          toast.success(`Successfully added ${fields.name}`, {
            position: "top-center",
          });
          setIsLoading(false);
          document.form3.reset();
        })
        .then(async () => {
          await addDoc(logCollectionRef, {
            timeCreated: `${new Date()
              .toISOString()
              .slice(
                0,
                10
              )} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            type: "user creation",
            status: "successful",
            message: `Successfully created ${fields.user_role} - [ ${fields.name} ] by ${authentication.currentUser.displayName}`,
          });
          setPassword("");
        })
        .catch(async (error) => {
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
            type: "user creation",
            status: "failed",
            message: `Failed to created ${fields.user_role} - [ ${fields.name} ] by ${authentication.currentUser.displayName}`,
          });
        });
    }
  };

  const [progress, setProgress] = useState(0);

  return (
    <div className="boom">
      <Header
        title={`Add ${role[0].toUpperCase() + role.slice(1).toLowerCase()}`}
        subtitle={`Add a new ${role}`.toUpperCase()}
      />
      <div className="addComponentsData shadow-sm mb-3">
        {isLoading && (
          <div className="loader-wrapper">
            <Loader />
          </div>
        )}
        <Form name="form3" onSubmit={handleSubmit}>
          {role === "supervisor" && (
            <Row style={{ marginLeft: "0" }}>
              <Form.Group className="my-3 px-0 categories" width="200px">
                <Form.Label htmlFor="organisation">
                  Organisation<span className="required">*</span>
                </Form.Label>
                <Form.Select
                  aria-label="Organisation"
                  id="organisation"
                  onChange={handleFieldChange}
                  required
                >
                  <option value={""}>Organisation</option>
                  {organisations &&
                    organisations.length > 0 &&
                    organisations.map((organisation, index) => (
                      <option key={index}>{organisation?.name}</option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Row>
          )}

          {role === "client" && authClaims.agent && (
            <Row style={{ marginLeft: "0" }}>
              <Form.Group className="my-3 px-0 categories" width="200px">
                <Form.Select
                  aria-label="User role"
                  id="category"
                  onChange={({ target: { value } }) => setPolicyType(value)}
                  required
                >
                  <option value={""}>Policy Type</option>
                  {authClaims.mtp && <option value="mtp">MTP</option>}
                  {authClaims.comprehensive && (
                    <option value="comprehensive">Comprehensive</option>
                  )}
                  {authClaims.windscreen && (
                    <option value="windscreen">Windscreen</option>
                  )}
                  {authClaims.newImports && (
                    <option value="newImport">New Imports</option>
                  )}
                  {authClaims.transit && (
                    <option value="transit">Transit</option>
                  )}
                </Form.Select>
              </Form.Group>
            </Row>
          )}

          {role === "client" && authClaims.supervisor && (
            <Row>
              <Form.Group className="m-3 categories" width="200px">
                <Form.Select
                  aria-label="User role"
                  id="category"
                  onChange={({ target: { value } }) => setPolicyType(value)}
                  required
                >
                  <option value={""}>Policy Type</option>
                  <option value="mtp">MTP</option>
                  <option value="comprehensive">Comprehensive</option>
                  <option value="windscreen">Windscreen</option>
                  <option value="newImport">New Imports</option>
                  <option value="transit">Transit</option>
                </Form.Select>
              </Form.Group>
            </Row>
          )}

          {role === "client" && policyType === "comprehensive" ? (
            <>
              <Form.Group className="m-3 categories" width="200px">
                <Form.Select
                  aria-label="User role"
                  id="category"
                  onChange={({ target: { value } }) => setClientType(value)}
                >
                  <option value={"individual"}>Type of Client</option>
                  <option value="individual">Individual</option>
                  <option value="corporateEntity">Corporate Entity</option>
                </Form.Select>
              </Form.Group>
              {clientType === "individual" && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">
                      Name<span className="required">*</span>
                    </Form.Label>
                    <Form.Control
                      id="name"
                      placeholder="Name"
                      onChange={handleFieldChange}
                      required
                    />
                  </Form.Group>
                  <Row className="mb-3">
                    <Form.Group
                      className="addFormGroups"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                    >
                      <Form.Label htmlFor="email">Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        onChange={handleFieldChange}
                      />
                    </Form.Group>

                    <Form.Group className="addFormGroups">
                      <Form.Label htmlFor="gender">
                        Gender <span className="required">*</span>
                      </Form.Label>
                      <div className="gender-options" required>
                        <div>
                          <input
                            type="radio"
                            name="gender"
                            id="gender"
                            value="male"
                            className="addFormRadio"
                            onChange={handleFieldChange}
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
                            onChange={handleFieldChange}
                          />
                          <label htmlFor="female">Female</label>
                        </div>
                      </div>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group className="addFormGroups">
                      <Form.Label htmlFor="tinNumber">Tin Number</Form.Label>
                      <Form.Control
                        type="text"
                        id="tinNumber"
                        placeholder="Enter TIN"
                        onChange={handleFieldChange}
                      />
                    </Form.Group>
                    <Form.Group className="addFormGroups">
                      <Form.Label htmlFor="phone">
                        Phone Number <span className="required">*</span>
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        id="phone"
                        placeholder="Enter phone number"
                        onChange={handleFieldChange}
                        required
                      />
                    </Form.Group>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="address">Address</Form.Label>
                    <Form.Control
                      id="address"
                      placeholder="Enter your address"
                      onChange={handleFieldChange}
                    />
                  </Form.Group>
                  <Row className="mb-3">
                    <Form.Group className="addFormGroups">
                      <Form.Label htmlFor="driverLicense">
                        Driver's License
                      </Form.Label>
                      <Form.Control
                        id="driverLicense"
                        placeholder="Driver's License"
                        onChange={handleFieldChange}
                      />
                    </Form.Group>
                    <Form.Group className="addFormGroups mb-3">
                      <Form.Label htmlFor="nin">NIN</Form.Label>
                      <Form.Control
                        id="NIN"
                        placeholder="NIN"
                        onChange={handleFieldChange}
                      />
                    </Form.Group>
                  </Row>
                  {/* <Form.Label htmlFor='upload'>Upload Profile photo</Form.Label>
                                        <Upload setLogo={setLogo}/> */}
                </>
              )}
              {clientType === "corporateEntity" && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">
                      Name<span className="required">*</span>
                    </Form.Label>
                    <Form.Control
                      id="name"
                      placeholder="Name"
                      onChange={handleFieldChange}
                      required
                    />
                  </Form.Group>
                  <Row>
                    <Form.Group
                      className="addFormGroups"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                    >
                      <Form.Label htmlFor="email">Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        onChange={handleFieldChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group className="addFormGroups">
                      <Form.Label htmlFor="tinNumber">Tin Number</Form.Label>
                      <Form.Control
                        type="text"
                        id="tinNumber"
                        placeholder="Enter TIN"
                        onChange={handleFieldChange}
                      />
                    </Form.Group>
                    <Form.Group className="addFormGroups">
                      <Form.Label htmlFor="phone">
                        Phone Number <span className="required">*</span>
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        id="phone"
                        placeholder="Enter phone number"
                        onChange={handleFieldChange}
                        required
                      />
                    </Form.Group>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="address">Address</Form.Label>
                    <Form.Control
                      id="address"
                      placeholder="Enter your address"
                      onChange={handleFieldChange}
                    />
                  </Form.Group>
                </>
              )}
            </>
          ) : (
            <>
              {role === "agent" && authClaims.admin && (
                <Form.Group className="my-3 px-0 categories" width="200px">
                  <Form.Label htmlFor="name">Assign Supervisor</Form.Label>
                  <Form.Select
                    aria-label="User role"
                    id="category"
                    onChange={({ target: { value } }) => setPolicyType(value)}
                    required
                  >
                    <option value={""}>Name</option>
                    {supervisors &&
                      supervisors?.length > 0 &&
                      supervisors.map((option, index) => (
                        <option key={index}>{option.name}</option>
                      ))}
                  </Form.Select>
                </Form.Group>
              )}
              <Form.Group className="mb-3">
                <Form.Label htmlFor="name">
                  Name<span className="required">*</span>
                </Form.Label>
                <Form.Control
                  id="name"
                  placeholder="Name"
                  onChange={handleFieldChange}
                  required
                />
              </Form.Group>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  className="addFormGroups"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <Form.Label htmlFor="email">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    onChange={handleFieldChange}
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
                  <Form.Label htmlFor="gender">
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
                        onChange={handleFieldChange}
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
                        onChange={handleFieldChange}
                      />
                      <label htmlFor="female">Female</label>
                    </div>
                  </div>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group className="addFormGroups">
                  <Form.Label htmlFor="tinNumber">Tin Number</Form.Label>
                  <Form.Control
                    type="text"
                    id="tinNumber"
                    placeholder="Enter TIN"
                    onChange={handleFieldChange}
                  />
                </Form.Group>
                <Form.Group className="addFormGroups">
                  <Form.Label htmlFor="phone">
                    Phone Number <span className="required">*</span>
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    id="phone"
                    placeholder="Enter phone number"
                    onChange={handleFieldChange}
                    required
                  />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="address">Address</Form.Label>
                <Form.Control
                  id="address"
                  placeholder="Enter your address"
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <Row className="mb-3">
                <Form.Group className="addFormGroups">
                  <Form.Label htmlFor="license">License No.</Form.Label>
                  <Form.Control
                    id="licenseNo"
                    placeholder="license No."
                    onChange={handleFieldChange}
                  />
                </Form.Group>
                {/* <Form.Group as={Col} className="addFormGroups" >
                                            <Form.Label htmlFor='driverLicense'>Driver's License</Form.Label>
                                            <Form.Control id="driverLicense" placeholder="Driver's License" onChange={handleFieldChange} />
                                        </Form.Group> */}
              </Row>
              <Row>
                <Form.Group className="addFormGroups mb-3">
                  <Form.Label htmlFor="nin">NIN</Form.Label>
                  <Form.Control
                    id="NIN"
                    placeholder="NIN"
                    onChange={handleFieldChange}
                  />
                </Form.Group>
              </Row>

              {role === "agent" && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="agentcan">Agent Can?</Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="comprehensive">
                    <Form.Check
                      type="checkbox"
                      label="Handle Comprehensive"
                      id="handle_comprehensive"
                      value={true}
                      onChange={(event) => setComprehensive(!comprehensive)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="mtp">
                    <Form.Check
                      type="checkbox"
                      label="Handle Motor Third Party"
                      id="handle_mtp"
                      value={true}
                      onChange={() => setMTP(!mtp)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="windscreen">
                    <Form.Check
                      type="checkbox"
                      label="Handle Windscreen"
                      id="handle_windscreen"
                      value={true}
                      onChange={() => setWindscreen(!windscreen)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="newImport">
                    <Form.Check
                      type="checkbox"
                      label="Handle New Imports"
                      id="handle_newImport"
                      value={true}
                      onChange={() => setNewImport(!newImport)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="transit">
                    <Form.Check
                      type="checkbox"
                      label="Handle Transit"
                      id="handle_transit"
                      value={true}
                      onChange={() => setTransit(!transit)}
                    />
                  </Form.Group>
                </>
              )}
              {role !== "client" && (
                <>
                  <Form.Label htmlFor="upload">Upload Profile photo</Form.Label>
                  <Upload setLogo={setLogo} />
                </>
              )}

              {role !== "client" && (
                <PasswordGenerator
                  password={password}
                  setPassword={setPassword}
                />
              )}
            </>
          )}
          {(fields.name !== "") & (fields.email !== "") ? (
            <div id="submit">
              <input
                type="submit"
                value="Submit"
                className="btn btn-dark cta submitcta"
              />
            </div>
          ) : (
            <div id="submit">
              <input
                type="button"
                value="Submit"
                className="btn btn-dark cta submitcta"
                style={{
                  background: "rgba(20, 117, 207, 0.4)",
                  border: "1px solid #a1c8ec",
                }}
              />
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}

export default AddUsers;

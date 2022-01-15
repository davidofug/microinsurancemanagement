import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import data from "../helpers/mock-data.json";
import Pagination from "../helpers/Pagination";
import ClaimTable from "../components/claimTable/ClaimTable";
import SearchBar from "../components/searchBar/SearchBar";
import Header from "../components/header/Header";
import { Table, Alert, Modal, Form, Col, Row, Button } from "react-bootstrap";
import { db } from "../helpers/firebase";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { FaEllipsisV } from "react-icons/fa";
import { useForm } from "../hooks/useForm";
import { authentication } from "../helpers/firebase";
import Loader from "../components/Loader";
import { MdEdit, MdDelete, MdNotifications } from 'react-icons/md'
import { AiFillCloseCircle } from 'react-icons/ai'
import useAuth from "../contexts/Auth";

function Claims() {
  const [claims, setClaims] = useState([]);
  const claimsCollectionRef = collection(db, "claims");
  const [editID, setEditID] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [fields, handleFieldChange] = useForm({
    uid: authentication.currentUser.uid,
    refNumber: "",
    dateReported: "",
    policyType: "",
    numberPlate: "",
    stickerNumber: "",
    claimantName: "",
    claimantEmail: "",
    claimantPhoneNumber: "",
    dateOfIncident: "",
    claimEstimate: "",
    detailsOfIncident: "",
    attachedDocuments: "",
    status: "",
  });


  useEffect(() => {
    document.title = "Britam - Claims";
    getClaims();
  }, []);

  const { authClaims } = useAuth()

  const getClaims = async () => {
    const data = await getDocs(claimsCollectionRef);
    const allClaims = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setClaims(allClaims.filter(userClaim => userClaim.uid === authentication.currentUser.uid))
  };

  const updateClaim = async (id) => {
    const userDoc = doc(db, "claims", id);
    await updateDoc(userDoc, { claimantName: singleClaims.claimantName });
  };

  const handleDelete = async (id) => {
    const claimDoc = doc(db, "claims", id);
    await deleteDoc(claimDoc);
  };

  const [singleDoc, setSingleDoc] = useState(fields);

  const getSingleDoc = async (id) => {
    const docRef = doc(db, "claims", id);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data())
    setSingleDoc(docSnap.data());
  };

  const functionToCall = () => {
    updateClaim(editID);
  };

  const [singleClaims, setSingleClaims] = useState({});

  const modalSubmit = async (event) => {
    event.preventDefault();

    const claimRef = doc(db, "claims", editID);

    const result = await updateDoc(claimRef, {
      dateReported: event.target.dateReported.value,
      policyType: event.target.policyType.value,
      numberPlate: event.target.numberPlate.value,
      stickerNumber: event.target.stickerNumber.value,
      claimantName: event.target.claimantName.value,
      claimantEmail: event.target.claimantEmail.value,
      claimantPhoneNumber: event.target.claimantPhoneNumber.value,
      dateOfIncident: event.target.dateOfIncident.value,
      estimate: event.target.estimate.value,
      detailsOfIncident: "",
      attachedDocuments: "",
      status: "",
    });
    getClaims();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentClaims = claims.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPagesNum = Math.ceil(data.length / employeesPerPage);


  // actions context
  const [showContext, setShowContext] = useState(false)
  window.onclick = function(event) {
      if (!event.target.matches('.sharebtn')) {
          setShowContext(false)
      }
  }
  const [clickedIndex, setClickedIndex] = useState(null)

  console.log(claims)

  return (
    <div className="components">
      <Header title="Claims" subtitle="CLAIMS NOTIFICATION" />

      {authClaims.agent && 
        <div id="add_client_group">
          <div></div>
          <Link to="/agent/add-claim">
            <button className="btn btn-primary cta">Add Claim</button>
          </Link>
        </div>
      }

      {authClaims.supervisor && 
        <div id="add_client_group">
          <div></div>
          <Link to="/supervisor/add-claim">
            <button className="btn btn-primary cta">Add Claim</button>
          </Link>
        </div>
      }

      {claims.length > -1 ?
      <>

      <Modal show={show} onHide={() => {
        handleClose()
        setSingleDoc(fields)
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Claim</Modal.Title>
        </Modal.Header>
        <Form id="update_claim" onSubmit={() => {
            modalSubmit()
          }}>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="dateReported">Date Reported</Form.Label>
                <Form.Control
                  type="date"
                  id="dateReported"
                  defaultValue={singleDoc.dateReported}
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="policyType">Policy</Form.Label>
                <Form.Select
                  aria-label="User role"
                  id="policyType"
                  defaultValue={singleDoc.policyType}
                  onChange={handleFieldChange}
                >
                  <option value="hide">--Select Category--</option>
                  <option value="mtp">MTP</option>
                  <option value="comprehensive">Comprehensive</option>
                  <option value="windscreen">Windscreen</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="numberPlate">Plate No.</Form.Label>
                <Form.Control
                  type="text"
                  name=""
                  id="numberPlate"
                  defaultValue={singleDoc.numberPlate}
                  placeholder="Enter plate No."
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="stickerNumber">Sticker No.</Form.Label>
                <Form.Control
                  type="text"
                  name=""
                  id="stickerNumber"
                  defaultValue={singleDoc.stickerNumber}
                  placeholder="Enter Sticker Number"
                  onChange={handleFieldChange}
                />
              </Form.Group>
            </Row>
            <h5>Claimant Details</h5>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="claimantName">Name</Form.Label>
                <Form.Control
                  type="text"
                  name=""
                  id="claimantName"
                  defaultValue={singleDoc.claimantName}
                  placeholder="Enter Claimant's name"
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="claimantEmail">Email Address</Form.Label>
                <Form.Control
                  type="text"
                  name=""
                  id="claimantEmail"
                  placeholder="Enter claimant's email"
                  defaultValue={singleDoc.claimantEmail}
                  onChange={handleFieldChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="claimantPhoneNumber">
                  Phone Number
                </Form.Label>
                <Form.Control
                  type="text"
                  name=""
                  id="claimantPhoneNumber"
                  defaultValue={singleDoc.claimantPhoneNumber}
                  placeholder="Enter Claimant's phone number"
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="dateOfIncident">
                  Date of Incident
                </Form.Label>
                <Form.Control
                  type="date"
                  name=""
                  id="dateOfIncident"
                  defaultValue={singleDoc.dateOfIncident}
                  onChange={handleFieldChange}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="estimate">Claim Estimate</Form.Label>
                <Form.Control
                  type="text"
                  name=""
                  id="estimate"
                  defaultValue={singleDoc.estimate}
                  placeholder="Enter Claim Estimate"
                  onChange={handleFieldChange}
                />
              </Form.Group>
            </Row>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                handleClose();
              }}
              id="submit"
            >
              Submit
            </Button>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Form>
      </Modal>

      <div className="table-card componentsData">
        <div id="search">
          {/* <SearchBar placeholder={"Search for claim"} value={q} handleSearch={handleSearch}/> */}
          <div></div>
          <div></div>
        </div>


         
            <Table responsive>
            <thead>
              <tr>
                <th>Ref Number</th>
                <th>Claimant Details</th>
                <th>Date of Incident</th>
                <th>Number Plate</th>
                <th>Sticker Number</th>
                <th>Claim Estimate</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim, index) => (
                <tr key={claim.id}>
                  <td>{claim.refNumber}</td>
                  <td>
                    <b>{claim.claimantName}</b>
                    <br />
                    {claim.claimantEmail}
                  </td>
                  <td>{claim.dateOfIncident}</td>
                  <td>{claim.numberPlate}</td>
                  <td>{claim.stickerNumber}</td>
                  <td>{claim.estimate}</td>
                  <td>
                    <Alert
                      style={{
                        backgroundColor: "#1475cf",
                        color: "#fff",
                        padding: "5px",
                        textAlign: "center",
                        border: "none",
                        margin: "0",
                      }}
                    >
                      new
                    </Alert>
                  </td>

                  <td className="started">
                                <button className="sharebtn" onClick={() => {setClickedIndex(index); setShowContext(!showContext)}}>&#8942;</button>

                                <ul  id="mySharedown" className={(showContext && index === clickedIndex) ? 'mydropdown-menu show': 'mydropdown-menu'} onClick={(event) => event.stopPropagation()}>
                                            <li>
                                                  <div className="actionDiv">
                                                    <i><MdNotifications/></i> View Notification
                                                  </div>
                                            </li>

                                            <li onClick={() => setShowContext(false)}
                                                >
                                                  <div className="actionDiv">
                                                    <i><AiFillCloseCircle/></i> Claim Settlement
                                                  </div>
                                            </li>

                                            <li onClick={() => setShowContext(false)}
                                                >
                                                  <div className="actionDiv">
                                                    <i><AiFillCloseCircle/></i> View Settlement
                                                  </div>
                                            </li>

                                            <li onClick={() => setShowContext(false)}
                                                >
                                                  <div className="actionDiv">
                                                    <i><AiFillCloseCircle/></i> Cancel
                                                  </div>
                                            </li>

                                            <li onClick={() => {
                                                    setShowContext(false)
                                                    const confirmBox = window.confirm(
                                                      `Are you sure you want to delete ${claim.claimantName}'s claim`
                                                    );
                                                    if (confirmBox === true) {
                                                      handleDelete(claim.id);
                                                      getClaims();
                                                    }
                                                  }}
                                                >
                                                  <div className="actionDiv">
                                                    <i><MdDelete/></i> Delete
                                                  </div>
                                            </li>

                                            <li onClick={() => {
                                                  setShowContext(false)
                                                  setEditID(claim.id);
                                                  getSingleDoc(claim.id);
                                                  handleShow();
                                                }}
                                                >
                                                  <div className="actionDiv">
                                                    <i><MdEdit/></i> Edit
                                                  </div>
                                            </li>
                                </ul>
                              </td>

                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Ref Number</th>
                <th>Claimant Details</th>
                <th>Date of Incident</th>
                <th>Number Plate</th>
                <th>Sticker Number</th>
                <th>Claim Estimate</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </tfoot>
          </Table>

  

        
      </div>
      </>
      : <Loader />}
    </div>
  );
}

export default Claims;

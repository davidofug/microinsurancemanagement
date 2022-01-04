import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "../../helpers/Pagination";
import SearchBar from "../../parts/searchBar/SearchBar";
import Header from "../../parts/header/Header";
import { Table, Alert, Modal, Form, Col, Row, Button } from "react-bootstrap";
import { db } from '../../helpers/firebase'
import {
  collection,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { FaEllipsisV } from "react-icons/fa";
import { useForm } from "../../hooks/useForm";
import { authentication } from "../../helpers/firebase";
import Loader from "../../parts/Loader";
import ClaimModel from "./ClaimModel";

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

  const getClaims = async () => {
    const data = await getDocs(claimsCollectionRef);
    setClaims(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };


  const handleDelete = async (id) => {
    const claimDoc = doc(db, "claims", id);
    await deleteDoc(claimDoc);
  };

  const [singleDoc, setSingleDoc] = useState(fields);

  const getSingleDoc = async (id) => {
    const docRef = doc(db, "claims", id);
    const docSnap = await getDoc(docRef);
    setSingleDoc(docSnap.data());
  };

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
  const [claimsPerPage] = useState(10);

  const indexOfLastClaim = currentPage * claimsPerPage;
  const indexOfFirstClaim = indexOfLastClaim - claimsPerPage;
  const currentClaims = claims.slice(indexOfFirstClaim, indexOfLastClaim);
  const totalPagesNum = Math.ceil(claims.length / claimsPerPage);

  return (
    <div className="components">
      <Header title="Claims" subtitle="CLAIMS NOTIFICATION" />


      {claims.length > 0 ?
      <>
      <div id="add_client_group">
        <div></div>
        <Link to="/add-claim">
          <button className="btn btn-primary cta">Add Claim</button>
        </Link>
      </div>

      <Modal show={show} onHide={handleClose}>
        <ClaimModel singleDoc={singleDoc} handleFieldChange={handleFieldChange} />
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
                    <FaEllipsisV
                      className={`actions please${index}`}
                      onClick={() => {
                        document
                          .querySelector(`.please${index}`)
                          .classList.add("hello");
                      }}
                    />
                    <ul id="actionsUl" className="actions-ul">
                      <li>
                        <button>View Notification</button>
                      </li>
                      <li>
                        <button>Claim Settlement</button>
                      </li>
                      <li>
                        <button>View Settlement</button>
                      </li>
                      <li>
                        <button>Cancel</button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            document
                              .querySelector(`.please${index}`)
                              .classList.remove("hello");
                            const confirmBox = window.confirm(
                              `Are you sure you want to delete ${claim.claimantName}'s claim`
                            );
                            if (confirmBox === true) {
                              handleDelete(claim.id);
                              getClaims();
                            }
                          }}
                        >
                          Delete
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setEditID(claim.id);
                            getSingleDoc(claim.id);
                            handleShow();
                            document
                              .querySelector(`.please${index}`)
                              .classList.remove("hello");
                          }}
                        >
                          Edit
                        </button>
                      </li>
                      <hr style={{ color: "black" }}></hr>
                      <li>
                        <button
                          onClick={() => {
                            document
                              .querySelector(`.please${index}`)
                              .classList.remove("hello");
                          }}
                        >
                          close
                        </button>
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

          <Pagination 
            pages={totalPagesNum}
            setCurrentPage={setCurrentPage}
            currentClients={currentClaims}
            sortedEmployees={claims}
            entries={'Claims'}
          />

  

        
      </div>
      </>
      : <Loader />}
    </div>
  );
}

export default Claims;

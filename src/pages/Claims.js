import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "../helpers/Pagination";
import ClaimTable from "../components/claimTable/ClaimTable";
import SearchBar from "../components/searchBar/SearchBar";
import Header from "../components/header/Header";
import { Table, Modal, Form, Col, Row, Button } from "react-bootstrap";
import { db } from "../helpers/firebase";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useForm } from "../hooks/useForm";
import { authentication, functions } from "../helpers/firebase";
import Loader from "../components/Loader";
import { MdEdit, MdDelete, MdNotifications } from 'react-icons/md'
import { AiFillCloseCircle } from 'react-icons/ai'
import useAuth from "../contexts/Auth";
import { ImFilesEmpty } from 'react-icons/im'
import { httpsCallable } from 'firebase/functions';
import useDialog from "../hooks/useDialog";
import {ClaimModelNotification, ClaimModel} from '../components/ClaimModel'

export default function Claims() {
  const [claims, setClaims] = useState([]);
  const claimsCollectionRef = collection(db, "claims");
  const [editID, setEditID] = useState(null);
  const [ show, handleShow, handleClose ] = useDialog()
  const [ showNotification, handleShowNotification, handleCloseNotification ] = useDialog()

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
    const listUsers = httpsCallable(functions, 'listUsers')
    const data = await getDocs(claimsCollectionRef);
    const allClaims = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    if(authClaims.agent){
      const agentClaims = allClaims.filter(userClaim => userClaim.uid === authentication.currentUser.uid)
      agentClaims.length === 0 ? setClaims(null) : setClaims(agentClaims)
    } else if( authClaims.supervisor){
      listUsers().then(({data}) => {
        const myAgents = data.filter(user => user.role.agent === true).filter(agent => agent.meta.added_by_uid === authentication.currentUser.uid).map(agentuid => agentuid.uid)

        const usersUnderSupervisor = [ ...myAgents, authentication.currentUser.uid ]

        const supervisorClaims = allClaims.filter(userClaim => usersUnderSupervisor.includes(userClaim.uid))

        supervisorClaims.length === 0 ? setClaims(null) : setClaims(supervisorClaims)
    }).catch()
    } else if( authClaims.admin){
      listUsers().then(({data}) => {
        const myAgents = data.filter(user => user.role.agent === true).filter(agent => agent.meta.added_by_uid === authentication.currentUser.uid).map(agentuid => agentuid.uid)
        
        const mySupervisors = data.filter(user => user.role.supervisor === true).filter(supervisor => supervisor.meta.added_by_uid === authentication.currentUser.uid).map(supervisoruid => supervisoruid.uid)

        const agentsUnderMySupervisors = data.filter(user => user.role.agent === true).filter(agent => mySupervisors.includes(agent.meta.added_by_uid)).map(agentuid => agentuid.uid)

        const usersUnderAdmin = [ ...myAgents, ...mySupervisors, ...agentsUnderMySupervisors, authentication.currentUser.uid ]

        const adminClaims = allClaims.filter(userClaim => usersUnderAdmin.includes(userClaim.uid))
        adminClaims.length === 0 ? setClaims(null) : setClaims(adminClaims)
    }).catch()
    } else if( authClaims.superadmin){
      allClaims.length === 0 ? setClaims(null) : setClaims(allClaims)
    }
  }

  // Confirm Box
  const [ openToggle, setOpenToggle ] = useState(false)
  window.onclick = (event) => {
    if(openToggle === true) {
      if (!event.target.matches('.wack') && !event.target.matches('#myb')) { 
        setOpenToggle(false)
    }
    }
  }

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
  const currentClaims = !claims || claims.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPagesNum = Math.ceil(claims.length / employeesPerPage);


  // actions context
  const [showContext, setShowContext] = useState(false)
  if(showContext === true){
    window.onclick = function(event) {
        if (!event.target.matches('.sharebtn')) {
            setShowContext(false)
        }
    }
  }
  const [clickedIndex, setClickedIndex] = useState(null)

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

      <div className={openToggle ? 'myModal is-active': 'myModal'}>
        <div className="modal__content wack">
          <h1 className='wack'>Confirm</h1>
          <p className='wack'>Are you sure you want to delete</p>
          <div className="buttonContainer wack" >
            <button id="yesButton" onClick={() => {
              setOpenToggle(false)
              handleDelete(editID)
              getClaims()
              }} className='wack'>Yes</button>
            <button id="noButton" onClick={() => setOpenToggle(false)} className='wack'>No</button>
          </div>
        </div>
      </div>

      <Modal show={showNotification} onHide={handleCloseNotification}>
        <ClaimModelNotification singleDoc={singleDoc}/>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <ClaimModel singleDoc={singleDoc} handleClose={handleClose} handleFieldChange={handleFieldChange} modalSubmit={modalSubmit} />
      </Modal>

      {claims !== null && claims.length > 0 ?
      <>

      

      <div className="table-card componentsData">
        <div id="search">
          {/* <SearchBar placeholder={"Search for claim"} value={q} handleSearch={handleSearch}/> */}
          <div></div>
          <div></div>
        </div>


         
            <Table responsive>
            <thead>
              <tr>
                <th>Ref Number</th><th>Claimant Details</th><th>Date of Incident</th><th>Number Plate</th>
                <th>Sticker Number</th><th>Claim Estimate</th><th>Status</th><th>Action</th>
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
                    <span
                      style={{backgroundColor: "#337ab7", padding: ".4em .6em", borderRadius: ".25em", color: "#fff", fontSize: "85%"}}
                    >{claim.status}</span>
                  </td>

                  <td className="started">
                                <button className="sharebtn" onClick={() => {setClickedIndex(index); setEditID(claim.id); setShowContext(!showContext)}}>&#8942;</button>

                                <ul  id="mySharedown" className={(showContext && index === clickedIndex) ? 'mydropdown-menu show': 'mydropdown-menu'} onClick={(event) => event.stopPropagation()}>
                                            <li onClick={() => {
                                                  setShowContext(false)
                                                  setEditID(claim.id);
                                                  getSingleDoc(claim.id);
                                                  handleShowNotification();
                                            }}
                                                >
                                                  <div className="actionDiv">
                                                    <i><MdNotifications /></i> Claim Settlement
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

                                            <li onClick={() => setShowContext(false)}
                                                >
                                                  <div className="actionDiv">
                                                    <i><AiFillCloseCircle/></i> Cancel
                                                  </div>
                                            </li>

                                            <li onClick={() => {
                                                  setOpenToggle(true)
                                                  setEditID(claim.id);
                                                  setShowContext(false)
                                                }}
                                                >
                                                  <div className="actionDiv">
                                                    <i><MdDelete/></i> Delete
                                                  </div>
                                            </li>
                                </ul>
                              </td>

                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr style={{border: "1px solid white", borderTop: "1px solid #000"}}>
                <td colSpan={7}>
                <Pagination 
                pages={totalPagesNum}
                setCurrentPage={setCurrentPage}
                currentClients={currentClaims}
                sortedEmployees={claims}
                entries={'Claims'} />
                </td>
              </tr>
            </tfoot>                                 

            <tfoot>
              <tr>
                <th>Ref Number</th><th>Claimant Details</th><th>Date of Incident</th><th>Number Plate</th>
                <th>Sticker Number</th><th>Claim Estimate</th><th>Status</th><th>Action</th>
              </tr>
            </tfoot>
          </Table>

  

        
      </div>
      </>
      :
        claims === null
        ?
          <div className="no-table-data">
            <i><ImFilesEmpty /></i>
            <h4>No data yet</h4>
            <p>You have not created any Motor Third Party Stickers Yet</p>
          </div>
        :
          <Loader />
      }
    </div>
  );
}
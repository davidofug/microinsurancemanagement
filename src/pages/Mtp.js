import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import data from '../helpers/mock-data.json'
import Header from "../components/header/Header";
import Pagination from '../helpers/Pagination'
import SearchBar from '../components/searchBar/SearchBar'
import { Table } from 'react-bootstrap'
import { getDoc, getDocs, collection, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../helpers/firebase'
import { currencyFormatter } from "../helpers/currency.format";
import { MdInfo, MdAutorenew, MdCancel, MdDelete } from 'react-icons/md'
import useAuth from '../contexts/Auth'
import { authentication } from "../helpers/firebase";
import '../components/modal/ConfirmBox.css'
import Loader from '../components/Loader'
import { ImFilesEmpty } from 'react-icons/im'

export default function Mtp() {
  useEffect(() => {
    document.title = "Britam - Motor Third Party";
    getMTP()
  }, []);


  //authClaim
  const { authClaims } = useAuth()

  // policies
  const [policies, setPolicies] = useState([])
  const policyCollectionRef = collection(db, "policies");
  const [editID, setEditID] = useState(null);


  const getMTP = async () => {
    const data = await getDocs(policyCollectionRef);
    const pole = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    if((pole.filter(policy => policy.category === 'mtp').filter(policy => policy.added_by_uid === authentication.currentUser.uid).length === 0)){
      setPolicies(null)
    } else {
      setPolicies(pole.filter(policy => policy.category === 'mtp').filter(policy => policy.added_by_uid === authentication.currentUser.uid))
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


  // search by Name
  const [searchText, setSearchText] = useState('')
  const handleSearch = ({ target }) => setSearchText(target.value);
  const searchByName = (data) => data.filter(row => row.clientDetails).filter(row => row.clientDetails.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)

  // delete a policy
  const handleDelete = async id => {
    const policyDoc = doc(db, "policies", id);
    await deleteDoc(policyDoc);
  }

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

  const [ deleteName, setDeleteName ] = useState('')
  const getPolicy = async (id) => {
    const policyDoc = doc(db, "policies", id);
    return await getDoc(policyDoc).then(result => setDeleteName(result.data().clientDetails.name))
  }

  // pagination
  const [ currentPage, setCurrentPage ] = useState(1)
  const [policiesPerPage] = useState(10)

  const indexOfLastPolicy = currentPage * policiesPerPage
  const indexOfFirstPolicy = indexOfLastPolicy - policiesPerPage
  const currentPolicies = !policies || searchByName(policies).slice(indexOfFirstPolicy, indexOfLastPolicy)
  const totalPagesNum = !policies || Math.ceil(policies.length / policiesPerPage)

  console.log(policies)

  return (
    <div className="components">
      <Header
        title="Motor Third Party"
        subtitle="MANAGING THIRD PARTY POLICIES"
      />

      {(authClaims.supervisor || authClaims.agent) &&
        <div id="add_client_group">
          <div></div>
          <Link to="/agent/add-mtp">
            <button className="btn btn-primary cta">Add MTP</button>
          </Link>
        </div>
      }

      <div className={openToggle ? 'myModal is-active': 'myModal'}>
        <div className="modal__content wack">
          <h1 className='wack'>Confirm</h1>
          <p className='wack'>Are you sure you want to delete <b>{deleteName}</b></p>
          <div className="buttonContainer wack" >
            <button id="yesButton" onClick={() => {
              setOpenToggle(false)
              handleDelete(editID)
              getMTP()
              }} className='wack'>Yes</button>
            <button id="noButton" onClick={() => setOpenToggle(false)} className='wack'>No</button>
          </div>
        </div>
      </div>


      

                {policies !== null && policies.length > 0 
                ?
                  <>
                  <div className="table-card componentsData" style={{display: "flex",flexDirection: "column", justifyContent: "center", maxWidth: "900px", minWidth: "300px"}}>
                  <div id="search">
                    <SearchBar placeholder={"Search Policy by name"} value={searchText} handleSearch={handleSearch}/>
                    <div></div>
                    <div></div>
                  </div>

                  <Table striped hover responsive>
                    <thead>
                        <tr><th>#</th><th>Client</th><th>Category</th><th>Amount</th><th>Currency</th>
                        {!authClaims.agent && <th>Agent</th>}
                        <th>Status</th><th>CreatedAt</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                        {policies.length > 0 && currentPolicies.map((policy, index) => (
                          <tr key={policy.id}>
                            <td>{indexOfFirstPolicy + index + 1}</td>
                            {policy.clientDetails && <td>{policy.clientDetails.name}</td>}
                            {policy.stickersDetails && <td>{policy.stickersDetails[0].category}</td>}
                            <td><b>{currencyFormatter(policy.stickersDetails[0].totalPremium)}</b></td>
                            <td>{typeof policy.currency == "string" ? policy.currency : ''}</td>
                            {!authClaims.agent && <td>{policy.agentName ? policy.agentName : ''}</td>}
                            <td>
                              <span
                                style={{backgroundColor: "#337ab7", padding: ".4em .6em", borderRadius: ".25em", color: "#fff", fontSize: "85%"}}
                              >{policy.stickersDetails[0].status}</span>
                            </td>
                            <td>{policy.policyStartDate}</td>

                            <td className="started">
                            <button className="sharebtn" onClick={() => {setClickedIndex(index); setShowContext(!showContext); setEditID(policy.id); getPolicy(policy.id)}}>&#8942;</button>

                            <ul  id="mySharedown" className={(showContext && index === clickedIndex) ? 'mydropdown-menu show': 'mydropdown-menu'} onClick={(event) => event.stopPropagation()}>
                              <Link to={`/admin/policy-details/${policy.id}`}>
                                <div className="actionDiv">
                                  <i><MdInfo /></i> Details
                                </div>
                              </Link>
                              <Link to={`/admin/policy-renew/${policy.id}`}>
                                <div className="actionDiv">
                                  <i><MdAutorenew /></i> Renew
                                </div>
                              </Link>
                              <li>
                                <div className="actionDiv">
                                  <i><MdCancel /></i> Cancel
                                </div>
                              </li>
                              <li 
                                    onClick={() => {
                                            setOpenToggle(true)
                                            setEditID(policy.id);
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
                        <tr><td>#</td><th>Client</th><th>Category</th><th>Amount</th><th>Currency</th>
                        {!authClaims.agent && <th>Agent</th>}
                        <th>Status</th><th>CreatedAt</th><th>Action</th></tr>
                    </tfoot>
                  </Table>

                  <Pagination 
                  pages={totalPagesNum}
                  setCurrentPage={setCurrentPage}
                  currentClients={currentPolicies}
                  sortedEmployees={policies}
                  entries={'Motor Third Party'} />

                  </div>
                  </>
                :
                  policies === null
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

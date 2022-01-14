import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import data from '../helpers/mock-data.json'
import Header from '../components/header/Header';
import { Table, Alert } from 'react-bootstrap'
import Pagination from '../helpers/Pagination';
import SearchBar from '../components/searchBar/SearchBar'
import { FaEllipsisV } from "react-icons/fa";
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../helpers/firebase'
import { currencyFormatter } from "../helpers/currency.format";
import { MdInfo, MdAutorenew, MdCancel, MdDelete } from 'react-icons/md'

function Comprehensive() {

    useEffect(() => {
        document.title = 'Britam - Comprehensive'
        getComprehensive()
    }, [])

    // policies
  const [policies, setPolicies] = useState([])
  const policyCollectionRef = collection(db, "policies");

  const getComprehensive = async () => {
    const data = await getDocs(policyCollectionRef);
    const pole = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setPolicies(pole.filter(policy => policy.category === 'comprehensive'))
  }

    // pagination
    const [ currentPage, setCurrentPage ] = useState(1)
    const [policiesPerPage] = useState(10)

    const indexOfLastPolicy = currentPage * policiesPerPage
    const indexOfFirstPolicy = indexOfLastPolicy - policiesPerPage
    const currentPolicies = policies.slice(indexOfFirstPolicy, indexOfLastPolicy)
    const totalPagesNum = Math.ceil(policies.length / policiesPerPage)


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
    const [show, setShow] = useState(false)
    window.onclick = function(event) {
        if (!event.target.matches('.sharebtn')) {
            setShow(false)
        }
    }

    const [clickedIndex, setClickedIndex] = useState(null)

    return (
        <div className='components'>
            <Header title="Comprehensive" subtitle="MANAGING COMPREHENSIVE" />

            <div id="add_client_group">
                <div></div>
                <Link to="/agent/add-comprehensive">
                    <button className="btn btn-primary cta">Add</button>
                </Link>
            </div>

            <div className="shadow-sm table-card componentsData">   
                <div id="search">
                    <SearchBar placeholder={"Search Policy by name"} value={searchText} handleSearch={handleSearch}/>
                    <div></div>
                    <div></div>
                  </div>

                <Table striped hover responsive>
                    <thead>
                        <tr><th>#</th><th>Client</th><th>Category</th><th>Amount</th><th>Currency</th><th>Agent</th><th>Status</th><th>CreatedAt</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                        {policies.length > 0 && searchByName(currentPolicies).map((policy, index) => (
                            <tr key={policy.id}>
                                <td>{index + 1}</td>
                                {policy.clientDetails && <td>{policy.clientDetails.name}</td>}
                                {policy.stickersDetails && <td>{policy.stickersDetails[0].category}</td>}
                                <td><b>{currencyFormatter(policy.stickersDetails[0].totalPremium)}</b></td>
                                <td>{typeof policy.currency == "string" ? policy.currency : ''}</td>
                                <td>{policy.agentName ? policy.agentName : ''}</td>
                                
                                <td>
                              <span
                                style={{backgroundColor: "#337ab7", padding: ".4em .6em", borderRadius: ".25em", color: "#fff", fontSize: "85%"}}
                              >new</span>
                            </td>


                            <td>{policy.policyStartDate}</td>
                            
                            <td className="started">
                            <button className="sharebtn" onClick={() => {setClickedIndex(index); setShow(!show)}}>&#8942;</button>

                            <ul  id="mySharedown" className={(show && index === clickedIndex) ? 'mydropdown-menu show': 'mydropdown-menu'} onClick={(event) => event.stopPropagation()}>
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
                              <li onClick={() => { setShow(false)
                                      const confirmBox = window.confirm(
                                        `Are you sure you want to delete this sticker`
                                      );
                                      if (confirmBox === true) {
                                        handleDelete(policy.id);
                                        getComprehensive()
                                      }
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
                        <tr><th>#</th><th>Client</th><th>Category</th><th>Amount</th><th>Currency</th><th>Agent</th><th>Status</th><th>CreatedAt</th><th>Action</th></tr>
                    </tfoot>
                </Table>

                <Pagination 
                    pages={totalPagesNum}
                    setCurrentPage={setCurrentPage}
                    currentClients={currentPolicies}
                    sortedEmployees={policies}
                    entries={'Comprehensive policies'} />


               
            </div>
        </div>
    )
}

export default Comprehensive

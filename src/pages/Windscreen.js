import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import data from '../helpers/mock-data.json'
import Pagination from '../helpers/Pagination'
import SearchBar from '../components/searchBar/SearchBar'
import { Table, Alert } from 'react-bootstrap'
import Header from '../components/header/Header';
import { FaEllipsisV } from "react-icons/fa";
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../helpers/firebase'
import { currencyFormatter } from "../helpers/currency.format";

function Windscreen() {

    useEffect(() => {
      document.title = 'Britam - Windscreen'
      getWindscreen()
    }, [])

    // policies
  const [policies, setPolicies] = useState([])
  const policyCollectionRef = collection(db, "policies");

  const getWindscreen = async () => {
    const data = await getDocs(policyCollectionRef);
    const pole = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setPolicies(pole.filter(policy => policy.category === 'windscreen'))
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

  const [show, setShow] = useState(false)
    window.onclick = function(event) {
        if (!event.target.matches('.sharebtn')) {
            setShow(false)
        }
    }

  const [clickedIndex, setClickedIndex] = useState(null)

    return (
        <div className='components'>
            <Header title="Windscreen" subtitle="MANAGING WINDSCREEN" />

            <div id="add_client_group">
                <div></div>
                <Link to="/admin/add-windscreen">
                    <button className="btn btn-primary cta">Add Windscreen</button>
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
                        {policies.length > 0 && searchByName(policies).map((policy, index) => 
                          policy.stickersDetails.length > 0
                          ? (
                            <tr key={policy.id}>
                                <td>{index + 1}</td>
                                <td>{policy.clientDetails.name}</td>
                                    <td>{policy.stickersDetails[0].category}</td>
                                <td><td><b>{currencyFormatter(policy.stickersDetails[1].totalPremium)}</b></td></td>
                                <td>{typeof policy.currency == "string" ? policy.currency : ''}</td>
                                <td>{policy.agentName ? policy.agentName : ''}</td>
                                <td>
                                  <span
                                    style={{backgroundColor: "#337ab7", padding: ".4em .6em", borderRadius: ".25em", color: "#fff", fontSize: "85%"}}
                                  >new</span>
                                </td>
                                
                                <td>{policy.policyStartDate}</td>
                                
                                <td className="started">
                            <button
                              className="sharebtn"
                              onClick={() => {
                                  setClickedIndex(index)
                                  setShow(!show)
                              }}
                            >&#8942;</button>
                    <ul  id="mySharedown" className={(show && index === clickedIndex) ? 'mydropdown-menu show': 'mydropdown-menu'} onClick={(event) => event.stopPropagation()}>
                    <li>
                        <Link to="/supervisor/policy-details" >Details</Link>
                      </li>
                      <li>
                        <button>Renew</button>
                      </li>
                      <li>
                        <button>Cancel</button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setShow()
                            const confirmBox = window.confirm(
                              `Are you sure you want to delete this sticker`
                            );
                            if (confirmBox === true) {
                              handleDelete(policy.id);
                              getWindscreen()
                            }
                          }}
                        >
                          Delete
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            
                          }}
                        >
                          Edit
                        </button>
                      </li>
                      <hr style={{ color: "black" }}></hr>
                      <li>
                        <button onClick={() => {setShow(false)}}>close</button>
                      </li>
                    </ul>
                  </td></tr>
                  
                          ): 
                            <tr key={policy.id}>
                                <td>{index + 1}</td>
                                <td>{policy.clientDetails.name}</td>
                                <td>{policy.stickersDetails[0].category}</td>
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
                    <button
                      // className={`actions please${index}`}
                      className="sharebtn" id="ellipse"
                      onClick={() => {
                        // document
                        //   .querySelector(`.please${index}`)
                        //   .classList.add("hello");
                          setShow(!show)
                      }}
                    >action</button>
                    <ul  id="mySharedown" className={show ? 'mydropdown-menu show': 'mydropdown-menu'} onClick={(event) => event.stopPropagation()}>
                      <li>
                        <button>Details</button>
                      </li>
                      <li>
                        <button>Renew</button>
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
                              `Are you sure you want to delete claim`
                            );
                            if (confirmBox === true) {
                              handleDelete(policy.id);
                              getWindscreen()
                            }
                          }}
                        >
                          Delete
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
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
                        
                        )}
                    </tbody>
                    <tfoot>
                        <tr><th>Client</th><th>Category</th><th>Amount</th><th>Payment Method</th><th>Currency</th><th>Agent</th><th>Status</th><th>CreatedAt</th><th>Action</th></tr>
                    </tfoot>
                </Table>

                <Pagination 
                    pages={totalPagesNum}
                    setCurrentPage={setCurrentPage}
                    currentClients={currentPolicies}
                    sortedEmployees={policies}
                    entries={'Windscreen policies'} />

               
            </div>
        </div>
    )
}

export default Windscreen

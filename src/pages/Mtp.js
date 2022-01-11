import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../parts/header/Header";
import { FaEllipsisV } from "react-icons/fa";
import data from '../helpers/mock-data.json'
import Pagination from '../helpers/Pagination'
import SearchBar from '../parts/searchBar/SearchBar'
import { Table, Alert } from 'react-bootstrap'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../helpers/firebase'

export default function Mtp() {
  useEffect(() => {
    document.title = "Britam - Motor Third Party";
    getPolicies()
  }, []);

  // policies
  const [policies, setPolicies] = useState([])
  const policyCollectionRef = collection(db, "policies");

  const getPolicies = async () => {
      const data = await getDocs(policyCollectionRef);
      setPolicies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // pagination
  const [ currentPage, setCurrentPage ] = useState(1)
  const [policiesPerPage] = useState(10)

  const indexOfLastPolicy = currentPage * policiesPerPage
  const indexOfFirstPolicy = indexOfLastPolicy - policiesPerPage
  const currentPolicies = data.slice(indexOfFirstPolicy, indexOfLastPolicy)
  const totalPagesNum = Math.ceil(data.length / policiesPerPage)

  // search by Name
  const [searchText, setSearchText] = useState('')
  const handleSearch = ({ target }) => setSearchText(target.value);
  const searchByName = (data) => data.filter(row => row.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)

  return (
    <div className="components">
      <Header
        title="Motor Third Party"
        subtitle="MANAGING THIRD PARTY POLICIES"
      />

      <div id="add_client_group">
        <div></div>
        <Link to="/admin/add-mtp">
          <button className="btn btn-primary cta">Add MTP</button>
        </Link>
      </div>

      <div className="table-card componentsData">
                <div id="search">
                    <SearchBar placeholder={"Search Policy by name"} value={searchText} handleSearch={handleSearch}/>
                    <div></div>
                    <div></div>
                </div>

                <Table striped hover responsive>
                    <thead>
                        <tr><th>#</th><th>Client</th><th>Category</th><th>Amount</th><th>Payment Method</th><th>Currency</th><th>Agent</th><th>Status</th><th>CreatedAt</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                        {policies.length > 0 && policies.map((policy, index) => (
                          <tr key={policy.id}>
                            <td>{index + 1}</td>
                            {policy.clientDetails && <td>{policy.clientDetails.name}</td>}
                            {policy.stickersDetails && <td>{policy.stickersDetails[0].category}</td>}
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
                            document
                              .querySelector(`.please${index}`)
                              .classList.remove("hello");
                            const confirmBox = window.confirm(
                              `Are you sure you want to delete claim`
                            );
                            if (confirmBox === true) {
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
                        ))}
                        {/* {searchByName(currentPolicies).map((row, index) => (
                            <tr key={row.id}>
                                <td>{row.name}</td>
                                <td>{row.category}</td>
                                <td>{row.amount}</td>
                                <td>{row.paymentMethod}</td>
                                <td>{row.currency}</td>
                                <td>{row.agentName}</td>
                                
                                {row.status === 'Active' 
                                  ? <td>
                                     <Alert
                                        style={{backgroundColor: "#1475cf",color: "#fff",padding: "2px",textAlign: "center",border: "none",margin: "0",
                                        }}
                                      >
                                        {row.status}
                                      </Alert>
                                  </td> 
                                  : <td>
                                      <Alert
                                        style={{backgroundColor: "red",color: "#fff",padding: "2px",textAlign: "center",border: "none",margin: "0",
                                        }}
                                      >
                                        {row.status}
                                      </Alert>
                                  </td> }


                                <td>{row.createdAt}</td>
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
                        ))} */}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                    </tbody>
                    <tfoot>
                        <tr><td>#</td><th>Client</th><th>Category</th><th>Amount</th><th>Payment Method</th><th>Currency</th><th>Agent</th><th>Status</th><th>CreatedAt</th><th>Action</th></tr>
                    </tfoot>
                </Table>


                <Pagination 
                    pages={totalPagesNum}
                    setCurrentPage={setCurrentPage}
                    currentClients={currentPolicies}
                    sortedEmployees={data}
                    entries={'Motor Third Party'} />

        
      </div>
    </div>
  );
}

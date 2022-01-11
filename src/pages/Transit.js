import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Header from "../parts/header/Header";
import { FaEllipsisV } from "react-icons/fa";
import data from '../helpers/mock-data.json'
import Pagination from '../helpers/Pagination'
import SearchBar from '../parts/searchBar/SearchBar'
import { Table, Alert } from 'react-bootstrap'

export default function Transit() {
  useEffect(() => {
    document.title = "Britam - Transit";
  }, []);

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
        title="Transit"
        subtitle="MANAGING TRANSIT POLICIES"
      />

      <div id="add_client_group">
        <div></div>
        <Link to="/admin/add-mtp">
          <button className="btn btn-primary cta">Add Transit</button>
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
                        <tr><th>Client</th><th>Category</th><th>Amount</th><th>Payment Method</th><th>Currency</th><th>Agent</th><th>Status</th><th>CreatedAt</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                        {searchByName(currentPolicies).map((row, index) => (
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
                        ))}
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
                        <tr><th>Client</th><th>Category</th><th>Amount</th><th>Payment Method</th><th>Currency</th><th>Agent</th><th>Status</th><th>CreatedAt</th><th>Action</th></tr>
                    </tfoot>
                </Table>


                <Pagination 
                    pages={totalPagesNum}
                    setCurrentPage={setCurrentPage}
                    currentClients={currentPolicies}
                    sortedEmployees={data}
                    entries={'Transit Policies'} />

        
      </div>
    </div>
  );
}

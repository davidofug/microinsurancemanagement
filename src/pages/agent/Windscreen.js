import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Form, Table, Alert } from 'react-bootstrap'
import Header from '../../parts/header/Header';
import { FaEllipsisV } from "react-icons/fa";

export default function Windscreen() {

    useEffect(() => {document.title = 'Britam - Windscreen'}, [])

    const [q, setQ] = useState('');
    const [windscreens, setWindscreen] = useState([])

    const columns = ["name", "contact", "amount", "paymentMethod", "currency", "agentName", "status", "createdAt"]
    const search = rows => rows.filter(row =>
        columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

    return (
        <div className='components'>
            <Header title="Windscreen" subtitle="MANAGING WINDSCREEN" />

            <div id="add_client_group">
                <div></div>
                <Link to="/agent/add-windscreen">
                    <button className="btn btn-primary cta">Add</button>
                </Link>
                
            </div>

            <div className="table-card componentsData">   
                <div id="search">
                            <div></div>
                            <div></div>
                            <Form.Control type="text" className='mb-3' placeholder="Search for policy"
                              value={q} onChange={({target}) => setQ(target.value)} 
                            />
                      </div>

                      <Table striped hover bordered responsive>
            <thead>
                <tr><th>Client</th><th>Category</th><th>Amount</th><th>Payment Method</th><th>Currency</th><th>Status</th><th>Created At</th><th>Action</th></tr>
            </thead>
            <tbody>
                {windscreens
    .length > 0 ?
                    <>
                        {windscreens
            .map((windscreen, index) => (
                        <tr>
                            <td>{windscreen.client}</td>
                            <td>{windscreen.category}</td>
                            <td>{windscreen.amount}</td>
                            <td>{windscreen.paymentMethod}</td>
                            <td>{windscreen.currency}</td>
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
                                {windscreen.status}
                                </Alert>
                            </td>
                            <td>{windscreen.createdAT}</td>
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
                        <button>
                          Delete
                        </button>
                      </li>
                      <li>
                        <button>
                          Edit
                        </button>
                      </li>
                      <hr style={{ color: "black" }}></hr>
                      <li>
                        <button>
                          close
                        </button>
                      </li>
                    </ul>
                  </td>
                        </tr>
                    ))}
                    </>
                :
                <tr>
                    <td>hello</td>
                    <td>hello</td>
                    <td>hello</td>
                    <td>hello</td>
                    <td>Noway</td>
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
                  <td>12-09-2019</td>
                  <td className="started">
                    <FaEllipsisV />
                  </td>
                </tr>
                }
            </tbody>
            <tfoot>
              <tr><th>Client</th><th>Category</th><th>Amount</th><th>Payment Method</th><th>Currency</th><th>Status</th><th>Created At</th><th>Action</th></tr>
            </tfoot>
        </Table>
               
            </div>
        </div>
    )
}


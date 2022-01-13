import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Form, Table, Alert } from 'react-bootstrap'
import Header from '../../parts/header/Header';
import { FaEllipsisV } from "react-icons/fa";

function Comprehensive() {

    useEffect(() => {document.title = 'Britam - Comprehensive'}, [])

    const [q, setQ] = useState('');
    const [comprehensives, setComprehensives] = useState([])

    const columns = ["name", "contact", "amount", "paymentMethod", "currency", "agentName", "status", "createdAt"]
    const search = rows => rows.filter(row =>
        columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

    return (
        <div className='components'>
            <Header title="Comprehensive" subtitle="MANAGING COMPREHENSIVE" />

            <div id="add_client_group">
                <div></div>
                <Link to="/agent/add-comprehensive">
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
                {comprehensives.length > 0 ?
                    <>
                        {comprehensives.map((comprehensive) => (
                        <tr>
                            <td>{comprehensive.client}</td>
                            <td>{comprehensive.category}</td>
                            <td>{comprehensive.amount}</td>
                            <td>{comprehensive.paymentMethod}</td>
                            <td>{comprehensive.currency}</td>
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
                                {comprehensive.status}
                                </Alert>
                            </td>
                            <td>{comprehensive.createdAT}</td>
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

export default Comprehensive

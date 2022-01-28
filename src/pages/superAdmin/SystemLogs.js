// import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../helpers/firebase'
import { Table, Form } from 'react-bootstrap'
import Pagination from "../../helpers/Pagination";


function SystemLogs() {
  useEffect(() => {document.title = "Britam - System Logs";}, []);

  const [ currentPage, setCurrentPage ] = useState(1)

  return (
    <div className="components">
      <Header title="System Logs" subtitle="MANAGING LOGS" />

        <div className="componentsData  shadow-sm table-card" style={{ "maxWidth": "80vw", margin: "auto" }}>
            
            <div id="search">
                <Form.Group className="m-3 categories" width="200px">
                    <Form.Label htmlFor='category'>Status</Form.Label>
                    <Form.Select aria-label="User role" id='category'>
                        <option value={null}>Select Log Status</option>
                        <option value="success">Successful</option>
                        <option value="failed">Failed</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="m-3 categories" width="200px">
                    <Form.Label htmlFor='category'>Date</Form.Label>
                    <Form.Control type="date" />
                </Form.Group>
                <Form.Group className="m-3 categories" width="200px">
                    <Form.Label htmlFor='category'>Logs</Form.Label>
                    <Form.Select aria-label="User role" id='category'>
                        <option value={null}>Select Log Type</option>
                        <option value="success">User Creation</option>
                        <option value="failed">User Deletion</option>
                        <option value="failed">Policy Creation</option>
                        <option value="failed">Policy Deletion</option>
                    </Form.Select>
                </Form.Group>
            </div>

                    

                  <Table striped hover responsive>
                      <thead>
                        <tr><th>Time</th><th>Type</th><th>Status</th><th>Message</th></tr>
                      </thead>
                      <tbody>
                        <tr>
                            <td>2022-01-28 07:32:19</td>
                            <td>User Creation</td>
                            <td>
                                <span
                        style={{backgroundColor: "#3EC089", padding: ".4em .6em", borderRadius: ".25em", color: "#fff", fontSize: "85%"}}
                      >Successful</span>
                      </td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc id cursus metus aliquam.</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr><th>Time</th><th>Type</th><th>Status</th><th>Message</th></tr>
                      </tfoot>
                  </Table>

                  <Pagination 
                      pages={1}
                      setCurrentPage={setCurrentPage}
                      currentClients={1}
                      sortedEmployees={1}
                      entries={'System Logs'} />

                  
            </div>
    </div>
  );
}

export default SystemLogs;

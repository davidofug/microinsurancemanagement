// import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../helpers/firebase'
import { Table, Form } from 'react-bootstrap'
import Pagination from "../../helpers/Pagination";
import Loader from "../../components/Loader";


function SystemLogs() {
  useEffect(() => {document.title = "Britam - System Logs"; getLogs()}, []);

  
  const logCollectionRef = collection(db, "logs");
  const [ logs, setLogs ] = useState([])
  const getLogs = async () => {
    const data = await getDocs(logCollectionRef);
    setLogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }
  
  const [ currentPage, setCurrentPage ] = useState(1)

  const [ switchStatus, setSwitchStatus ] = useState(null)

  console.log(switchStatus)

  const shownLogs = !logs || logs.filter(log => !switchStatus || log.status === switchStatus)


  console.log(logs)

  return (
    <div className="components">
      <Header title="System Logs" subtitle="MANAGING LOGS" />

      {shownLogs.length > 0
                        ?
                        <>
        <div className="componentsData  shadow-sm table-card" style={{ "maxWidth": "80vw", margin: "auto" }}>
            <div id="search">
                <Form.Group className="m-3 categories" width="200px">
                    <Form.Label htmlFor='category'>Status</Form.Label>
                    <Form.Select aria-label="User role" id='category' onChange={({target: {value}}) => setSwitchStatus(value)}>
                        <option value="">Select Log Status</option>
                        <option value="successful">Successful</option>
                        <option value="failed">Failed</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="m-3 categories" width="200px">
                    <Form.Label htmlFor='date'>Date</Form.Label>
                    <Form.Control type="date" />
                </Form.Group>
                <Form.Group className="m-3 categories" width="200px">
                    <Form.Label htmlFor='logType'>Logs</Form.Label>
                    <Form.Select aria-label="User role" id='category'>
                        <option value={null}>Select Log Type</option>
                        <option value="userCreation">User Creation</option>
                        <option value="userDeletion">User Deletion</option>
                        <option value="policyCreation">Policy Creation</option>
                        <option value="policyDeletion">Policy Deletion</option>
                    </Form.Select>
                </Form.Group>
            </div>

                    

            
                  <Table striped hover responsive>
                      <thead>
                        <tr><th>Time</th><th>Type</th><th>Status</th><th>Message</th></tr>
                      </thead>
                      <tbody>
                        
                          {shownLogs.map(log => (
                            <tr key={log.id}>
                              <td>
                                {typeof(log.timeCreated) === 'string' && log.timeCreated}
                              </td>
                              <td>{log.type}</td>
                              <td>
                                {log.status === 'successful'
                                  ? <span
                                  style={{backgroundColor: "#3EC089", padding: ".4em .6em", borderRadius: ".25em", color: "#fff", fontSize: "85%"}}
                                >{log.status}</span> 
                                  : <span
                                  style={{backgroundColor: "#dc3545", padding: ".4em .6em", borderRadius: ".25em", color: "#fff", fontSize: "85%"}}
                                >{log.status}</span>}
                              </td>
                              <td>{log.message}</td>
                            </tr>
                          ))}
                      </tbody>
                      <tfoot>
                        <tr><th>Time</th><th>Type</th><th>Status</th><th>Message</th></tr>
                      </tfoot>
                  </Table>

                  <Pagination 
                  pages={1}
                  setCurrentPage={setCurrentPage}
                  currentClients={1}
                  sortedEmployees={logs}
                  entries={'System Logs'} />
                  </div>
                  </>
                  :
                          <Loader />
                        }

            
    </div>
  );
}

export default SystemLogs;

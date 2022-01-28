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


  console.log(logs)

  return (
    <div className="components">
      <Header title="System Logs" subtitle="MANAGING LOGS" />

      {logs.length > 0
                        ?
                        <>
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
                        
                          {logs.map(log => (
                            <tr key={log.id}>
                              <td>
                                {log.timeCreated && `${new Date(log.timeCreated.seconds).toISOString().slice(0, 10)} ${ new Date(log.timeCreated.seconds).getHours()}:${ new Date(log.timeCreated.seconds).getMinutes()}:${ new Date(log.timeCreated.seconds).getSeconds()}`}
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

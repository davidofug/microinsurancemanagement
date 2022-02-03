// import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../helpers/firebase'
import { Table, Form } from 'react-bootstrap'
import Pagination from "../../helpers/Pagination";
import Loader from "../../components/Loader";
import { ImFilesEmpty } from 'react-icons/im'

import Chat from '../../components/messenger/Chat'


function SystemLogs() {
  useEffect(() => {document.title = "Britam - System Logs"; getLogs()}, []);

  
  const logCollectionRef = collection(db, "logs");
  const [ logs, setLogs ] = useState([])
  const getLogs = async () => {
    const data = await getDocs(logCollectionRef);
    const ALL_LOGS = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    ALL_LOGS.length === 0 ? setLogs(null) : setLogs(ALL_LOGS)
  }
  
  // pagination
  const [ currentPage, setCurrentPage ] = useState(1)
  const [logsPerPage] = useState(10)
  const indexOfLastLog = currentPage * logsPerPage
  const indexOfFirstLog = indexOfLastLog - logsPerPage

  const [ switchStatus, setSwitchStatus ] = useState(null)
  const [ logType, setLogType ] = useState(null)
  const [ date, setDate ] = useState(null)


  const convertStringToDate = (stringDate) => {
    return new Date(stringDate)
  }


  const shownLogs = !logs || logs
                                .sort((a, b) => convertStringToDate(b.timeCreated) - convertStringToDate(a.timeCreated))
                                .filter(log => !switchStatus || log.status === switchStatus)
                                .filter(log => !logType || log.type === logType)
                                .filter(log => !date || typeof(log.timeCreated) !== 'string' || log.timeCreated.slice(0, 10) === date)

  const paginatedShownLogs = !logs || shownLogs.slice(indexOfFirstLog, indexOfLastLog)
  const totalPagesNum = !logs || Math.ceil(shownLogs.length / logsPerPage)


  const dt2 = new Date('2022-01-31 10:48:29')
  const dt1 = new Date('2022-01-31 9:47:10')
  var diff =(dt1.getTime() - dt2.getTime()) / 1000;
  diff /= (60 * 60);
  /* console.log(Math.abs(Math.round(diff)));
  console.log(3679000/1000/3600)
  console.log(1440/60) */



  return (
    <div className="components">
      <Header title="System Logs" subtitle="MANAGING LOGS" />

      {logs !== null && logs.length > 0
      ?
                        <>
        <div className="componentsData  shadow-sm table-card" style={{ "maxWidth": "80vw", margin: "auto" }}>
            <div id="search">
                <Form.Group className="m-3 categories" width="200px">
                    <Form.Label htmlFor='category'>Status</Form.Label>
                    <Form.Select id='category' onChange={({target: {value}}) => setSwitchStatus(value)}>
                        <option value="">Select Log Status</option>
                        <option value="successful">Successful</option>
                        <option value="failed">Failed</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="m-3 categories" width="200px">
                    <Form.Label htmlFor='date'>Date</Form.Label>
                    <Form.Control type="date" id="date" onChange={({target: {value}}) => setDate(value)}/>
                </Form.Group>
                <Form.Group className="m-3 categories" width="200px">
                    <Form.Label htmlFor='logType'>Logs</Form.Label>
                    <Form.Select id='logType' onChange={({target: {value}}) => setLogType(value)}>
                        <option value="">Select Log Type</option>
                        <option value="user creation">User Creation</option>
                        <option value="user deletion">User Deletion</option>
                        <option value="sticker creation">Sticker Creation</option>
                        <option value="sticker deletion">Sticker Deletion</option>
                        <option value="claim creation">Claim Creation</option>
                        <option value="claim deletion">Claim Deletion</option>
                    </Form.Select>
                </Form.Group>
            </div>

                    

            {shownLogs.length > 0  
            ?
              <>         
                  <Table striped hover responsive>
                      <thead>
                        <tr><th>Time</th><th>Type</th><th>Status</th><th>Message</th></tr>
                      </thead>
                      <tbody>
                        
                          {paginatedShownLogs.map(log => (
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
                  pages={totalPagesNum}
                  setCurrentPage={setCurrentPage}
                  currentClients={paginatedShownLogs}
                  sortedEmployees={shownLogs}
                  entries={'System Logs'} />
                  </>
                  
          :
            <div className="no-table-data">
              <i><ImFilesEmpty /></i>
              <h4>No data yet</h4>
              <p>There are no Logs Yet</p>
            </div>
          }
          </div>
          </>
      :
        logs === null
        ?
          <div className="no-table-data">
            <i><ImFilesEmpty /></i>
            <h4>No data yet</h4>
            <p>No Logs Yet</p>
          </div>
        :
          <Loader />
      }
      
      <div style={{width:"100%", position:"fixed", bottom:"0px", display:"flex", justifyContent:"flex-end", paddingRight:"140px"}}>
        <Chat />
      </div>

            
    </div>
  );
}

export default SystemLogs;

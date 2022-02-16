import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '../components/header/Header';
import Pagination from '../helpers/Pagination';
import SearchBar from '../components/searchBar/SearchBar';
import { Table, Modal } from 'react-bootstrap';
import { functions, authentication, db } from '../helpers/firebase';
import { httpsCallable } from 'firebase/functions';
import useAuth from '../contexts/Auth';
import ClientModal from '../components/ClientModal'
import { MdEdit, MdDelete } from 'react-icons/md'
import Loader from '../components/Loader'
import { ImFilesEmpty } from 'react-icons/im'
import useDialog from '../hooks/useDialog';
import { addDoc, collection } from 'firebase/firestore';


import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Chat from '../components/messenger/Chat'
import '../styles/clients.css'

import '../styles/ctas.css'


export default function Clients() {

  useEffect(() => {
    document.title = 'Britam - Clients';
    getClients()

    return () => getClients()
  
  }, [])

  const { authClaims } = useAuth()
  const [clients, setClients] = useState([]);
  const [ show, handleShow, handleClose ] = useDialog()

  // initialising the logs collection.
  const logCollectionRef = collection(db, "logs");

// edit client
const [singleDoc, setSingleDoc] = useState();

// getting Clients under a particular user.
const getClients = () => {
  const listUsers = httpsCallable(functions, 'listUsers')
    if(authClaims.agent){
      listUsers().then(({data}) => {
          const myUsers = data.filter(user => user.role.Customer === true).filter(client => client.meta.added_by_uid === authentication.currentUser.uid)
          myUsers.length === 0 ? setClients(null) : setClients(myUsers)
      }).catch()
    } else if(authClaims.supervisor){
      listUsers().then(({data}) => {
          const myAgents = data.filter(user => user.role.agent === true).filter(agent => agent.meta.added_by_uid === authentication.currentUser.uid).map(agentuid => agentuid.uid)

          const usersUnderSupervisor = [ ...myAgents, authentication.currentUser.uid ]

          const myUsers = data.filter(user => user.role.Customer === true).filter(client => usersUnderSupervisor.includes(client.meta.added_by_uid))
          myUsers.length === 0 ? setClients(null) : setClients(myUsers)
      }).catch()
    } else if(authClaims.admin) {
      listUsers().then(({data}) => {
          const myAgents = data.filter(user => user.role.agent === true).filter(agent => agent.meta.added_by_uid === authentication.currentUser.uid).map(agentuid => agentuid.uid)
          
          const mySupervisors = data.filter(user => user.role.supervisor === true).filter(supervisor => supervisor.meta.added_by_uid === authentication.currentUser.uid).map(supervisoruid => supervisoruid.uid)

          const agentsUnderMySupervisors = data.filter(user => user.role.agent === true).filter(agent => mySupervisors.includes(agent.meta.added_by_uid)).map(agentuid => agentuid.uid)

          const usersUnderAdmin = [ ...myAgents, ...mySupervisors, ...agentsUnderMySupervisors, authentication.currentUser.uid ]

          const myUsers = data.filter(user => user.role.Customer === true).filter(client => usersUnderAdmin.includes(client.meta.added_by_uid))
          myUsers.length === 0 ? setClients(null) : setClients(myUsers)
      }).catch()
    }
}

  // Confirm Box
  const [ openToggle, handleShowToggle, handleCloseToggle ] = useDialog()
  const [ showContext, handleShowContext, handleCloseContext ] = useDialog()
  window.onclick = ({target}) => {
    if(openToggle) {
      if (!target.matches('.wack') && !target.matches('#myb')) {handleCloseToggle()}
      
    }
    if (!target.matches('.sharebtn')) {
      handleCloseContext()
    }
  }

  // deleting a user
  const handleDelete = async () => {
    const deleteUser = httpsCallable(functions, 'deleteUser')
    deleteUser({uid:singleDoc.uid})
      .then(() => toast.success(`Successfully deleted ${singleDoc.name}`, {position: "top-center"}))
      .then(async () => {
        await addDoc(logCollectionRef, {
          timeCreated: `${new Date().toISOString().slice(0, 10)} ${ new Date().getHours()}:${ new Date().getMinutes()}:${ new Date().getSeconds()}`,
          type: 'user deletion',
          status: 'successful',
          message: `Successfully deleted client - ${singleDoc.name.toUpperCase()} by ${authentication.currentUser.displayName}`
        })
      })
      .catch( async () => {
        toast.error(`Failed to deleted ${singleDoc.name}`, {position: "top-center"});
        await addDoc(logCollectionRef, {
          timeCreated: `${new Date().toISOString().slice(0, 10)} ${ new Date().getHours()}:${ new Date().getMinutes()}:${ new Date().getSeconds()}`,
          type: 'sticker deletion',
          status: 'failed',
          message: `Failed to delete client - ${singleDoc.name.toUpperCase()} by ${authentication.currentUser.displayName}`
        })
    })

    getClients()
  };

  // search for client
  const [searchText, setSearchText] = useState('')
  const handleSearch = ({ target: {value} }) => setSearchText(value);
  const searchByName = (data) => data.filter(row => row.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)


  const [clickedIndex, setClickedIndex] = useState(null)

  // pagination
  const [ currentPage, setCurrentPage ] = useState(1)
  const [clientsPerPage] = useState(10)
  const indexOfLastClient = currentPage * clientsPerPage
  const indexOfFirstClient = indexOfLastClient - clientsPerPage
  const currentClients = !clients || searchByName(clients).slice(indexOfFirstClient, indexOfLastClient)
  const totalPagesNum = !clients || Math.ceil(clients.length / clientsPerPage)

    return (
        <div className='components'>
            <Header title="Clients" subtitle="MANAGING CLIENTS" />
            <ToastContainer />
   
            <div id="add_client_group" className="add_client_group">
                <div></div>
                {!authClaims.admin && !authClaims.superadmin &&
                  <Link to={authClaims.supervisor && "/supervisor/add-clients" || authClaims.agent && "/agent/add-clients"} className="classic">
                      <button className='btn btn-primary cta m-2'>Add Client</button>
                  </Link>
                }
            </div>

            <div className={openToggle ? 'myModal is-active': 'myModal'}>
              <div className="modal__content wack">
                <h1 className='wack'>Confirm</h1>
                <p className='wack'>Are you sure you want to delete <b>{singleDoc && singleDoc.name}</b></p>
                <div className="buttonContainer wack" >
                  <button id="yesButton" onClick={() => {
                    handleCloseToggle()
                    handleDelete()
                    }} className='wack'>Yes</button>
                  <button id="noButton" onClick={() => {handleCloseToggle()}} className='wack'>No</button>
                </div>
              </div>
            </div>

            <Modal show={show} onHide={handleClose}>
              <ClientModal singleDoc={singleDoc} handleClose={handleClose} />
            </Modal>

            {clients !== null && clients.length > 0
            ?
              <div className="componentsData shadow-sm table-card mb-3">
                <div id="search">
                  <SearchBar placeholder={"Search Client by name"} value={searchText} handleSearch={handleSearch}/>
                  <div style={{display: "flex", justifyContent: "flex-end"}}>
                  </div>
                </div>


                {currentClients.length > 0
                ?
                  <>
                    <Table hover striped responsive className='mt-5' id='myTable'>
                      <thead>
                          <tr><th>#</th><th>Name</th><th>Email</th><th>Gender</th><th>Phone No.</th><th>Address</th>{!authClaims.agent && <th>Added by</th>}{!authClaims.admin && <th>Action</th>}</tr>
                      </thead>
                      <tbody>
                        {currentClients.map((client, index) => (
                            <tr key={client.uid}>
                            <td>{index + 1}</td>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.meta.gender === '' ? 'Corporate Entity' : client.meta.gender}</td>
                            <td>{client.meta.phone}</td>
                            <td>{client.meta.address}</td>
                            {!authClaims.agent && <td>{client.meta.added_by_name}</td>}

                            {!authClaims.admin &&
                            <td className="started">
                              <button className="sharebtn" onClick={() => {
                                setClickedIndex(index);
                                setSingleDoc(client)
                                showContext ? handleCloseContext() : handleShowContext() }}>&#8942;</button>

                              <ul  id="mySharedown" className={(showContext && index === clickedIndex) ? 'mydropdown-menu show': 'mydropdown-menu'} onClick={(event) => event.stopPropagation()}>
                                          <li onClick={() => {handleShowToggle();handleCloseContext()}}>
                                                <div className="actionDiv">
                                                  <i><MdDelete/></i> Delete
                                                </div>
                                          </li>
                                          <li onClick={() => {handleCloseContext();handleShow();}}>
                                                <div className="actionDiv">
                                                  <i><MdEdit/></i> Edit
                                                </div>
                                          </li>
                              </ul>
                            </td>
                            }
                        </tr>
                        ))}
                          
                      </tbody>

                      <tfoot>
                        <tr id="pag-btns" style={{border: "1px solid white", borderTop: "1px solid #000"}}>
                          <td colSpan={7}>
                            <Pagination 
                            pages={totalPagesNum}
                            setCurrentPage={setCurrentPage}
                            currentClients={currentClients}
                            sortedEmployees={clients}
                            entries={'Clients'} />
                          </td>
                        </tr>
                      </tfoot>

                      <tfoot>
                          <tr><th>#</th><th>Name</th><th>Email</th><th>Gender</th><th>Phone No.</th><th>Address</th>{!authClaims.agent && <th>Added by</th>}{!authClaims.admin && <th>Action</th>}</tr>
                      </tfoot>
                  </Table>
            
                  </>
                :
                <div className="no-table-data">
                  <i><ImFilesEmpty /></i>
                  <h4>No match</h4>
                  <p>There is not current match for client's name</p>
                </div>
                }
                </div>
          :
            clients === null
            ?
              <div className="no-table-data">
                <i><ImFilesEmpty /></i>
                <h4>No data yet</h4>
                <p>You have not added any client Yet</p>
              </div>
            :
              <Loader />
          }
          <div id="chat-container" style={{width:"100%", position:"fixed", bottom:"0px", display:"flex", justifyContent:"flex-end"}} className="chat-container">
            <Chat />
          </div> 
        </div>
    )
}

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MdDownload } from 'react-icons/md'
import Pagination from '../helpers/Pagination';
import SearchBar from '../components/searchBar/SearchBar'
import Header from '../components/header/Header';
import { functions, authentication } from '../helpers/firebase';
import { httpsCallable } from 'firebase/functions';
import { Table, Modal, Form } from 'react-bootstrap'
import useAuth from '../contexts/Auth';
import { MdEdit, MdDelete } from 'react-icons/md'
import { AiFillCloseCircle } from 'react-icons/ai'
import Loader from '../components/Loader';
import ClientModal from '../components/ClientModal';
import { useForm } from '../hooks/useForm';
import useDialog from '../hooks/useDialog'
import { ImFilesEmpty } from 'react-icons/im'

function Agents() {

  useEffect(() => {document.title = 'Britam - Agents';getAgents()}, [])
  
  const { authClaims } = useAuth()
  
  // get agents
  const [agents, setAgents] = useState([]);
  const getAgents = () => {
    const listUsers = httpsCallable(functions, 'listUsers')
    if(authClaims.supervisor){
      listUsers().then(({data}) => {
          const myAgents = data.filter(user => user.role.agent === true).filter(agent => agent.meta.added_by_uid === authentication.currentUser.uid)
          myAgents.length === 0 ? setAgents(null) : setAgents(myAgents)
      }).catch()
    } else if(authClaims.admin){
      listUsers().then(({data}) => {
        const mySupervisors = data.filter(user => user.role.supervisor === true).filter(supervisor => supervisor.meta.added_by_uid === authentication.currentUser.uid).map(supervisoruid => supervisoruid.uid)

        const agentsUnderAdmin = [ ...mySupervisors, authentication.currentUser.uid ]

        const myAgents = data.filter(user => user.role.agent === true).filter(agent => agentsUnderAdmin.includes(agent.meta.added_by_uid))

        myAgents.length === 0 ? setAgents(null) : setAgents(myAgents)
    }).catch()
    }
  }

  const [fields, handleFieldChange] = useForm({
    user_role: 'agent',
    email: '',
    name: '',
    dob: '',
    gender: '',
    phone: '',
    address: '',
    licenseNo: '',
    NIN: '',
    photo: '',
})

const [ open, handleOpen, handleClose ] = useDialog()

  // search for agent
  const [searchText, setSearchText] = useState('')
  const handleSearch = ({ target: {value} }) => setSearchText(value);
  const searchByName = (data) => data.filter(row => row.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)

  // Pagination
  const [ currentPage, setCurrentPage ] = useState(1)
  const [clientsPerPage] = useState(10)
  const indexOfLastAgent = currentPage * clientsPerPage
  const indexOfFirstClient = indexOfLastAgent - clientsPerPage
  const currentAgents = !agents || searchByName(agents).slice(indexOfFirstClient, indexOfLastAgent)
  const totalPagesNum = !agents || Math.ceil(agents.length / clientsPerPage)

  // delete a single agent
  const handleDelete = async (id) => {
    const deleteUser = httpsCallable(functions, 'deleteUser')
    deleteUser({uid:id}).then().catch(err => {
      console.log(err)
    })
    getAgents()
  };

  const handleAllCheck = () => {
    if(document.getElementById("firstAgentCheckbox").checked === true){
      Object.values(document.getElementsByClassName("agentCheckbox")).map(checkbox => checkbox.checked = false)
      setDeleteArray([])
    } else{
      Object.values(document.getElementsByClassName("agentCheckbox")).map(checkbox => checkbox.checked = true)
      setDeleteArray(agents.map(agent => agent.uid))
    }
    
    
  }

  // delete multiple agents
  const [ bulkDelete, setBulkDelete ] = useState(null)
  const [ deleteArray, setDeleteArray ] = useState([])
  const [ deleteAllArray, setDeleteAllArray ] = useState([])
  const handleBulkDelete = async () => {
    if(bulkDelete){
      deleteArray.map(agentuid => handleDelete(agentuid))
    }
  }

  

  // get a single doc
  const [singleDoc, setSingleDoc] = useState(fields);
  const getSingleAgent = async (id) => setSingleDoc(agents.filter(agent => agent.uid == id)[0])
    
  // actions context
  const [showContext, setShowContext] = useState(false)
  window.onclick = function(event) {
      if (!event.target.matches('.sharebtn')) {
          setShowContext(false)
      }
  }

  const [clickedIndex, setClickedIndex] = useState(null)

  console.log(agents)

    return (
        <div className='components'>
            <Header title="Agents" subtitle="MANAGING AGENTS" />
   
            <div id="add_client_group">
                <div></div>
                {authClaims.supervisor && 
                  <Link to="/supervisor/add-user">
                      <button className="btn btn-primary cta">Add Agent</button>
                  </Link>
                }
                {authClaims.admin && 
                  <Link to="/admin/add-user">
                      <button className="btn btn-primary cta">Add Agent</button>
                  </Link>
                }
            </div>

            <Modal show={open} onHide={handleClose}>
              <ClientModal singleDoc={singleDoc} fields={fields} handleFieldChange={handleFieldChange} handleClose={handleClose} />
            </Modal>

            {agents !== null && agents.length > 0
            ?
              <>
                <div className="shadow-sm table-card componentsData">   
                <div id="search">
                <SearchBar placeholder={"Search for agent"} value={searchText} handleSearch={handleSearch}/>
                    <div></div>
                    <button className='btn btn-primary cta mb-3'>Export <MdDownload /></button>
                </div>

                <Form.Group className="m-3 categories" width="180px">
                      <Form.Label htmlFor='category'>Filter by Category</Form.Label>
                      <Form.Select aria-label="User role" id='category'>
                          <option value={""}>Select a category</option>
                          <option value="mtp">MTP</option>
                          <option value="comprehensive">Comprehensive</option>
                          <option value="windscreen">Windscreen</option>
                          <option value="newImports">New Imports</option>
                          <option value="transit">Transit</option>
                      </Form.Select>
                  </Form.Group>

                  {currentAgents.length > 0
                  ?
                    <>
                      <Table hover striped responsive>
                        <thead>
                            <tr><th><input type="checkbox" onChange={handleAllCheck}/></th><th>Name</th><th>Email</th><th>Category</th><th>Gender</th><th>Contact</th><th>Address</th>{authClaims.admin && <th>Added by</th>}<th>Action</th></tr>
                        </thead>
                        <tbody>
                          {currentAgents.map((agent, index) => (
                              <tr key={agent.uid}>
                              <td><input type="checkbox" id='firstAgentCheckbox' className='agentCheckbox' onChange={({target}) => target.checked ? setDeleteArray([ ...deleteArray, agent.uid]) : 
                              setDeleteArray(deleteArray.filter(element => element !== agent.uid))
                            }/></td>
                              <td>{agent.name}</td>
                              <td>{agent.email}</td>
                              <td>
                                {agent.role.mtp && <div>MTP</div>}
                                {agent.role.comprehensive && <div>Comprehensive</div>}
                                {agent.role.windscreen && <div>Windscreen</div>}
                                {agent.role.newImport && <div>New Import</div>}
                                {agent.role.transit && <div>Transit</div>}
                              </td>
                              <td>{agent.meta.gender}</td>
                              <td>{agent.meta.phone}</td>
                              <td>{agent.meta.address}</td>
                              {authClaims.admin && <td>{agent.meta.added_by_name}</td>}
                              <td className="started">
                                <button className="sharebtn" onClick={() => {setClickedIndex(index); setShowContext(!showContext)}}>&#8942;</button>

                                <ul  id="mySharedown" className={(showContext && index === clickedIndex) ? 'mydropdown-menu show': 'mydropdown-menu'} onClick={(event) => event.stopPropagation()}>
                                            <li onClick={() => {
                                                    setShowContext(false)
                                                    // setEditID(agent.uid);
                                                    getSingleAgent(agent.uid)
                                                    handleOpen(); 
                                                    console.log(agent.uid)
                                                  }}
                                                >
                                                  <div className="actionDiv">
                                                    <i><MdEdit/></i> Edit
                                                  </div>
                                            </li>
                                            <li onClick={() => {
                                                        setShowContext(false)
                                                        const confirmBox = window.confirm(
                                                          `Are you sure you want to ${agent.name}`
                                                        );
                                                        if (confirmBox === true) {
                                                          handleDelete(agent.uid)
                                                        }
                                                      }}
                                                >
                                                  <div className="actionDiv">
                                                    <i><MdDelete/></i> Delete
                                                  </div>
                                            </li>
                                            <li onClick={() => setShowContext(false)}
                                                >
                                                  <div className="actionDiv">
                                                    <i><AiFillCloseCircle/></i> Close
                                                  </div>
                                            </li>
                                </ul>
                              </td>
                          </tr>
                          ))}
                        </tbody>

                        <tfoot>
                          <tr style={{border: "1px solid white", borderTop: "1px solid #000"}}>
                            <td colSpan={3}>
                              <div style={{display: "flex"}}>
                                <Form.Select aria-label="User role" id='category' onChange={(event) => setBulkDelete(event.target.value)}>
                                    <option value="">Bulk Action</option>
                                    <option value="delete">Delete</option>
                                </Form.Select>
                                <button className='btn btn-primary cta mx-2' onClick={handleBulkDelete}>Apply</button>
                              </div>
                            </td>
                            <td colSpan={4}>
                              <Pagination 
                              pages={totalPagesNum}
                              setCurrentPage={setCurrentPage}
                              currentClients={currentAgents}
                              sortedEmployees={agents}
                              entries={'Agents'} />
                            </td>
                          </tr>
                        </tfoot>

                        <tfoot>
                            <tr><th><input type="checkbox" /></th><th>Name</th><th>Email</th><th>Category</th><th>Gender</th><th>Contact</th><th>Address</th>{authClaims.admin && <th>Added by</th>}<th>Action</th></tr>
                        </tfoot>
                    </Table>
                    </>
                  :
                  <div className="no-table-data">
                    <i><ImFilesEmpty /></i>
                    <h4>No match</h4>
                    <p>There is not current match for agent's name</p>
                  </div>
                  }

                  

                  

               
            </div>
              </>
            :
              agents === null
              ?
                <div className="no-table-data">
                  <i><ImFilesEmpty /></i>
                  <h4>No data yet</h4>
                  <p>You have not added any client Yet</p>
                </div>
              :
                <Loader />
            }

              
        </div>
    )
}

export default Agents

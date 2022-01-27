import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MdDownload } from 'react-icons/md'
import Pagination from '../../helpers/Pagination';
import SearchBar from '../../components/searchBar/SearchBar';
import Header from '../../components/header/Header';
import { functions, authentication } from '../../helpers/firebase';
import { httpsCallable } from 'firebase/functions';
import { Table, Modal, Form } from 'react-bootstrap'
import { useForm } from "../../hooks/useForm";
import ClientModal from '../../components/ClientModal';
import { MdEdit, MdDelete } from 'react-icons/md'
import { AiFillCloseCircle } from 'react-icons/ai'
import { ImFilesEmpty } from 'react-icons/im'
import Loader from '../../components/Loader';
import useAuth from '../../contexts/Auth';
import { CSVLink } from "react-csv";

function Supervisors() {

    useEffect(() => {document.title = 'Britam - Supervisors'; getSupervisors()}, [])

    const { authClaims } = useAuth()



    // get Supervisors
    const [supervisors, setSuperviors] = useState([]);
    const getSupervisors = () => {
      const listUsers = httpsCallable(functions, 'listUsers')
      if(authClaims.admin){
        listUsers().then(({data}) => {
          const mySupervisors = data.filter(user => user.role.supervisor === true).filter(supervisor => supervisor.meta.added_by_uid === authentication.currentUser.uid)
          mySupervisors.length === 0 ? setSuperviors(null) : setSuperviors(mySupervisors)
        }).catch()
      }
    }

    const [fields, handleFieldChange] = useForm({
      user_role: 'supervisor',
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
  
  const [singleDoc, setSingleDoc] = useState(fields);
  
  const getSingleSupervisor = async (id) => setSingleDoc(supervisors.filter(supervisor => supervisor.uid == id)[0])


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [editID, setEditID] = useState(null);

  const [ currentPage, setCurrentPage ] = useState(1)
  const [supervisorsPerPage] = useState(10)


  // search by name
  const [searchText, setSearchText] = useState('')
  const handleSearch = ({ target }) => setSearchText(target.value);
  const searchByName = (data) => data.filter(row => row.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)


  const indexOfLastSupervisor = currentPage * supervisorsPerPage
  const indexOfFirstSupervisor = indexOfLastSupervisor - supervisorsPerPage
  const currentSupervisors = !supervisors || searchByName(supervisors.slice(indexOfFirstSupervisor, indexOfLastSupervisor))
  const totalPagesNum = !supervisors || Math.ceil(supervisors.length / supervisorsPerPage)



  const handleDelete = async (id) => {
    const deleteUser = httpsCallable(functions, 'deleteUser')
    deleteUser({uid:id}).then().catch(err => {
      console.log(err)
    })
  };

  // Confirm Box
  const [ openToggle, setOpenToggle ] = useState(false)
  window.onclick = (event) => {
    if(openToggle === true) {
      if (!event.target.matches('.wack') && !event.target.matches('#myb')) { 
        setOpenToggle(false)
    }
    }
  }


  const handleAllCheck = () => {
    if(document.getElementById("firstAgentCheckbox").checked === true){
      Object.values(document.getElementsByClassName("agentCheckbox")).map(checkbox => checkbox.checked = false)
      setDeleteArray([])
    } else{
      Object.values(document.getElementsByClassName("agentCheckbox")).map(checkbox => checkbox.checked = true)
      setDeleteArray(supervisors.map(agent => agent.uid))
    }
  }

  // delete multiple agents
  const [ bulkDelete, setBulkDelete ] = useState(null)
  const [ deleteArray, setDeleteArray ] = useState([])
  const [ deleteAllArray, setDeleteAllArray ] = useState([])
  const handleBulkDelete = async () => {
    if(bulkDelete){
      deleteArray.map(agentuid => handleDelete(agentuid))
      getSupervisors()
    }
  }



    

  // actions context
  const [showContext, setShowContext] = useState(false)
  if(showContext === true){
    window.onclick = function(event) {
        if (!event.target.matches('.sharebtn')) {
            setShowContext(false)
        }
    }
  }
  const [clickedIndex, setClickedIndex] = useState(null)

    return (
        <div className='components'>
          <Header title="Supervisors" subtitle="MANAGING SUPERVISORS" />

            <div id="add_client_group">
                <div></div>
                <Link to="/admin/add-supervisor">
                    <button className="btn btn-primary cta">Add supervisor</button>
                </Link>               
            </div>

            <div className={openToggle ? 'myModal is-active': 'myModal'}>
              <div className="modal__content wack">
                <h1 className='wack'>Confirm</h1>
                <p className='wack'>Are you sure you want to delete</p>
                <div className="buttonContainer wack" >
                  <button id="yesButton" onClick={() => {
                    setOpenToggle(false)
                    handleDelete(editID)
                    }} className='wack'>Yes</button>
                  <button id="noButton" onClick={() => setOpenToggle(false)} className='wack'>No</button>
                </div>
              </div>
            </div>

            <Modal show={show} onHide={handleClose}>
              <ClientModal singleDoc={singleDoc} handleFieldChange={handleFieldChange} handleClose={handleClose} />
            </Modal>

            {supervisors !== null && supervisors.length > 0
            ?
              <>
                <div className="shadow-sm table-card componentsData">   
                <div id="search">
                      <SearchBar placeholder={"Search Supervisor by name"} value={searchText} handleSearch={handleSearch} />
                      <CSVLink
                        data={supervisors}
                        filename={"Britam-Supervisors.csv"}
                        className="btn btn-primary cta"
                        target="_blank"
                      >
                        Export <MdDownload />
                      </CSVLink>
                </div>

                {currentSupervisors.length > 0
                ?
                  <>
                    <Table hover striped responsive className='mt-5'>
                        <thead>
                            <tr><th><input type="checkbox" onChange={handleAllCheck}/></th><th>Name</th><th>Email</th><th>Gender</th><th>Contact</th><th>Address</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                          {currentSupervisors.map((supervisor, index) => (
                              <tr key={supervisor.uid}>
                              <td><input type="checkbox" id='firstAgentCheckbox' className='agentCheckbox' onChange={({target}) => target.checked ? setDeleteArray([ ...deleteArray, supervisor.uid]) : 
                              setDeleteArray(deleteArray.filter(element => element !== supervisor.uid))
                            }/></td>
                              <td>{supervisor.name}</td>
                              <td>{supervisor.email}</td>
                              <td>{supervisor.meta.gender}</td>
                              <td>{supervisor.meta.phone}</td>
                              <td>{supervisor.meta.address}</td>
                
                              <td className="started">
                                <button className="sharebtn" onClick={() => {setClickedIndex(index); setShowContext(!showContext); setEditID(supervisor.uid)}}>&#8942;</button>

                                <ul  id="mySharedown" className={(showContext && index === clickedIndex) ? 'mydropdown-menu show': 'mydropdown-menu'} onClick={(event) => event.stopPropagation()}>
                                            <li onClick={() => {
                                            setOpenToggle(true)
                                            setEditID(supervisor.uid);
                                            setShowContext(false)
                                          }}
                                                >
                                                  <div className="actionDiv">
                                                    <i><MdDelete/></i> Delete
                                                  </div>
                                            </li>
                                            <li onClick={() => {
                                                    getSingleSupervisor(supervisor.uid)
                                                    setShowContext(false)
                                                    setEditID(supervisor.uid);
                                                    handleShow();
                                                  }}
                                                >
                                                  <div className="actionDiv">
                                                    <i><MdEdit/></i> Edit
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
                              currentClients={currentSupervisors}
                              sortedEmployees={supervisors}
                              entries={'Supervisor'} />
                            </td>
                          </tr>
                        </tfoot>


                        <tfoot>
                            <tr><th></th><th>Name</th><th>Email</th><th>Gender</th><th>Contact</th><th>Address</th><th>Action</th></tr>
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
              </>
            :
              supervisors === null
              ?
              <div className="no-table-data">
                <i><ImFilesEmpty /></i>
                <h4>No data yet</h4>
                <p>You have not created any Organisations Yet</p>
              </div>
              :
              <Loader />
 
            }

            
        </div>
    )
}

export default Supervisors

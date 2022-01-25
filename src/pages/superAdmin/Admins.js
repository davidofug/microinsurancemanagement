import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MdDownload } from 'react-icons/md'
import Pagination from '../../helpers/Pagination';
import SearchBar from '../../components/searchBar/SearchBar';
import Header from '../../components/header/Header';
import { functions } from '../../helpers/firebase';
import { httpsCallable } from 'firebase/functions';
import { Table, Form, Modal } from 'react-bootstrap'
import { MdDelete, MdEdit } from 'react-icons/md'
import Loader from '../../components/Loader';
import { ImFilesEmpty } from 'react-icons/im'
import useDialog from '../../hooks/useDialog'
import ClientModal from '../../components/ClientModal';
import { useForm } from "../../hooks/useForm";

function Admins() {

  useEffect(() => {document.title = 'Britam - Admins'; getAdmins()}, [])
  
  // get Admins
  const [admins, setAdmins] = useState([]);
  const getAdmins = () => {
    const listUsers = httpsCallable(functions, 'listUsers')
    listUsers().then(({data}) => {
        const myAdmins = data.filter(user => user.role.admin === true)
        myAdmins.length === 0 ? setAdmins(null) : setAdmins(myAdmins)
    }).catch()
  }

  // show model 
  const [ showModal, handleShow, handleClose ] = useDialog()

  const [fields, handleFieldChange] = useForm({
    user_role: 'admin',
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
  
  const getSingleSupervisor = async (id) => setSingleDoc(admins.filter(admin => admin.uid == id)[0])


    // Pagination
    const [ currentPage, setCurrentPage ] = useState(1)
    const [adminsPerPage] = useState(10)

    // search by name
  const [searchText, setSearchText] = useState('')
  const handleSearch = ({ target }) => setSearchText(target.value);
  const searchByName = (data) => data.filter(row => row.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)

    const indexOfLastAdmin = currentPage * adminsPerPage
    const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage
    const currentAdmins = !admins || searchByName(admins).slice(indexOfFirstAdmin, indexOfLastAdmin)
    const totalPagesNum = !admins || Math.ceil(admins.length / adminsPerPage)

    const handleDelete = (id) => {
      const deleteUser = httpsCallable(functions, 'deleteUser')
      deleteUser({uid:id}).then((result) => {
        console.log(result)
      }
      ).catch(err => {
        console.log(err)
      })
      getAdmins()
    };

    const handleAllCheck = () => {
      if(document.getElementById("firstAgentCheckbox").checked === true){
        Object.values(document.getElementsByClassName("agentCheckbox")).map(checkbox => checkbox.checked = false)
        setDeleteArray([])
      } else{
        Object.values(document.getElementsByClassName("agentCheckbox")).map(checkbox => checkbox.checked = true)
        setDeleteArray(admins.map(admin => admin.uid))
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

  // actions context
  const [show, setShow] = useState(false)
  window.onclick = function(event) {
      if (!event.target.matches('.sharebtn')) {
          setShow(false)
      }
  }
  const [clickedIndex, setClickedIndex] = useState(null)


    return (
        <div className='components'>
          <Header title="Admins" subtitle="MANAGING ADMINS" />

            <div id="add_client_group">
                <div></div>
                <Link to="/superadmin/add-user">
                    <button className="btn btn-primary cta">Add admin</button>
                </Link>
                
            </div>

            <Modal show={showModal} onHide={handleClose}>
              <ClientModal singleDoc={singleDoc} />
            </Modal>


            {admins !== null && admins.length > 0 ?
              <>
                <div className="shadow-sm table-card componentsData">   
                <div id="search">
                      <SearchBar placeholder={"Search for Admins"} value={searchText} handleSearch={handleSearch} />
                      <div></div>
                      <Form.Group className="m-3 categories" width="200px">
                        <button className='btn btn-primary cta mb-3'>Export <MdDownload /></button>
                      </Form.Group>
                </div>

                {currentAdmins.length > 0
                ?
                  <>
                    <Table hover striped responsive>
                        <thead>
                            <tr><th><input type="checkbox" onChange={handleAllCheck}/></th><th>Name</th><th>Email</th><th>Gender</th><th>Contact</th><th>Address</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                          {currentAdmins.map((admin, index) => (
                              <tr key={admin.uid}>
                              <td><input type="checkbox" id='firstAgentCheckbox' className='agentCheckbox' onChange={({target}) => target.checked ? setDeleteArray([ ...deleteArray, admin.uid]) : 
                              setDeleteArray(deleteArray.filter(element => element !== admin.uid))
                            }/></td>
                              <td>{admin.name}</td>
                              <td>{admin.email}</td>
                              <td>{admin.meta.gender}</td>
                              <td>{admin.meta.phone}</td>
                              <td>{admin.meta.address}</td>
                
                            <td className="started">
                            <button className="sharebtn" onClick={() => {setClickedIndex(index); setShow(!show)}}>&#8942;</button>

                            <ul  id="mySharedown" className={(show && index === clickedIndex) ? 'mydropdown-menu show': 'mydropdown-menu'} onClick={(event) => event.stopPropagation()}>
                              <li onClick={() => { 
                                      setShow(false)
                                      getSingleSupervisor(admin.uid)
                                      handleShow()
                                    }}
                                  >
                                    <div className="actionDiv">
                                      <i><MdEdit /></i> Edit
                                    </div>
                              </li>
                              <li onClick={() => { setShow(false)
                                      const confirmBox = window.confirm(
                                        `Are you sure you want to delete ${admin.name}`
                                      );
                                      if (confirmBox === true) {
                                        handleDelete(admin.uid);
                                      }
                                    }}
                                  >
                                    <div className="actionDiv">
                                      <i><MdDelete /></i> Delete
                                    </div>
                              </li>
                            </ul>
                            </td>
                          </tr>
                          ))}
                            
                        </tbody>
                        <tfoot>
                            <tr><th></th><th>Name</th><th>Email</th><th>Gender</th><th>Contact</th><th>Address</th><th>Action</th></tr>
                        </tfoot>
                    </Table>

                  <Pagination 
                    pages={totalPagesNum}
                    setCurrentPage={setCurrentPage}
                    currentClients={currentAdmins}
                    sortedEmployees={admins}
                    entries={'Admins'} />
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
              admins === null
              ?
                <div className="no-table-data">
                  <i><ImFilesEmpty /></i>
                  <h4>No data yet</h4>
                  <p>You have not created any Motor Third Party Stickers Yet</p>
                </div>
              :
                <Loader />
          }

            
        </div>
    )
}

export default Admins

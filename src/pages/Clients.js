import { CSVLink } from 'react-csv'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MdDownload } from 'react-icons/md'
import Header from '../components/header/Header';
import Pagination from '../helpers/Pagination';
import SearchBar from '../components/searchBar/SearchBar';
import { Table } from 'react-bootstrap';
import { functions, authentication } from '../helpers/firebase';
import { httpsCallable } from 'firebase/functions';
import useAuth from '../contexts/Auth';
import ClientModal from '../components/ClientModal'
import { Modal } from 'react-bootstrap'
import { useForm } from '../hooks/useForm';
import { MdEdit, MdDelete } from 'react-icons/md'
import { AiFillCloseCircle } from 'react-icons/ai'
import Loader from '../components/Loader'
import { ImFilesEmpty } from 'react-icons/im'

export default function Clients() {

  useEffect(() => {document.title = 'Britam - Clients';getClients()}, [])

  const { authClaims } = useAuth()
  const [clients, setClients] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [editID, setEditID] = useState(null);

  const [fields, handleFieldChange] = useForm({
    user_role: 'Customer',
    email: '',
    name: '',
    dob: '',
    gender: '',
    phone: '',
    address: '',
    licenseNo: '',
    NIN: '',
    photo: ''
})

const [singleDoc, setSingleDoc] = useState(fields);

const getSingleClient = async (id) => setSingleDoc(clients.filter(client => client.uid == id)[0])

// getting clients
const getClients = () => {
    if(authClaims.agent){
      const listUsers = httpsCallable(functions, 'listUsers')
      listUsers().then(({data}) => {
          const myUsers = data.filter(user => user.role.Customer === true).filter(client => client.meta.added_by_uid === authentication.currentUser.uid)
          myUsers.length === 0 ? setClients(null) : setClients(myUsers)
      }).catch((err) => {
          console.log(err)
      })
    } else{
      const listUsers = httpsCallable(functions, 'listUsers')
      listUsers().then(({data}) => {
          const myUsers = data.filter(user => user.role.Customer === true)
          myUsers.length === 0 ? setClients(null) : setClients(myUsers)
      }).catch((err) => {})
    }
}

  // Confirm Box
  const [ openToggle, setOpenToggle ] = useState(false)
  window.onclick = (event) => {
    if(openToggle === true) {
      if (!event.target.matches('.wack') && !event.target.matches('#myb')) { 
        setOpenToggle(false)
    }
    }
  }

  // deleting a user
  const [ deleteName, setDeleteName ] = useState("")
  const handleDelete = async (id) => {
    const deleteUser = httpsCallable(functions, 'deleteUser')
    deleteUser({uid:id}).then().catch()
  };

  // search for client
  const [searchText, setSearchText] = useState('')
  const handleSearch = ({ target: {value} }) => setSearchText(value);
  const searchByName = (data) => data.filter(row => row.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)


  // actions context
  const [showContext, setShowContext] = useState(false)
  if(showContext){
    window.onclick = function(event) {
        if (!event.target.matches('.sharebtn')) {
            setShowContext(false)
        }
    }
  }
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
   
            <div id="add_client_group">
                <div></div>
                {authClaims.supervisor && 
                  <Link to="/supervisor/add-user">
                      <button className='btn btn-primary cta'>Add Client</button>
                  </Link>
                }
                {authClaims.agent && 
                  <Link to="/agent/add-user">
                      <button className='btn btn-primary cta'>Add Client</button>
                  </Link>
                }
            </div>

            <div className={openToggle ? 'myModal is-active': 'myModal'}>
              <div className="modal__content wack">
                <h1 className='wack'>Confirm</h1>
                <p className='wack'>Are you sure you want to delete <b>{deleteName}</b></p>
                <div className="buttonContainer wack" >
                  <button id="yesButton" onClick={() => {
                    setOpenToggle(false)
                    handleDelete(editID)
                    getClients()
                    }} className='wack'>Yes</button>
                  <button id="noButton" onClick={() => {setOpenToggle(false); setDeleteName("")}} className='wack'>No</button>
                </div>
              </div>
            </div>

            <Modal show={show} onHide={handleClose}>
              <ClientModal singleDoc={singleDoc} handleFieldChange={handleFieldChange} />
            </Modal>

            {clients !== null && clients.length > 0
            ?
              <div className="componentsData shadow-sm table-card">
                <div id="search">
                  <SearchBar placeholder={"Search Client by name"} value={searchText} handleSearch={handleSearch}/>
                  <div></div>
                  <CSVLink data={clients} filename={"Britam-Clients.csv"} className="btn btn-primary cta">
                    Export <MdDownload />
                  </CSVLink>
                </div>


                {currentClients.length > 0
                ?
                  <>
                    <Table hover striped responsive className='mt-5'>
                      <thead>
                          <tr><th>#</th><th>Name</th><th>Email</th><th>Gender</th><th>Contact</th><th>Address</th><th>Action</th></tr>
                      </thead>
                      <tbody>
                        {currentClients.map((client, index) => (
                            <tr key={client.uid}>
                            <td>{index + 1}</td>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.meta.gender}</td>
                            <td>{client.meta.phone}</td>
                            <td>{client.meta.address}</td>
              <td className="started">
                <button className="sharebtn" onClick={() => {setClickedIndex(index); setShowContext(!showContext)}}>&#8942;</button>

                <ul  id="mySharedown" className={(showContext && index === clickedIndex) ? 'mydropdown-menu show': 'mydropdown-menu'} onClick={(event) => event.stopPropagation()}>
                            <li onClick={() => {
                                          setOpenToggle(true)
                                          setEditID(client.uid);
                                          setShowContext(false)
                                          setDeleteName(client.name)
                                        }}
                                >
                                  <div className="actionDiv">
                                    <i><MdDelete/></i> Delete
                                  </div>
                            </li>
                            <li onClick={() => {
                                    setShowContext(false)
                                    setEditID(client.uid);
                                    getSingleClient(client.uid)
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
                          <tr><th>#</th><th>Name</th><th>Email</th><th>Gender</th><th>Contact</th><th>Address</th><th>Action</th></tr>
                      </tfoot>
                  </Table>

                <Pagination 
                  pages={totalPagesNum}
                  setCurrentPage={setCurrentPage}
                  currentClients={currentClients}
                  sortedEmployees={clients}
                  entries={'Clients'} />
            
                  </>
                :
                <div className="no-table-data">
                  <i><ImFilesEmpty /></i>
                  <h4>No data yet</h4>
                  <p>You have not created any Motor Third Party Stickers Yet</p>
                </div>
                }
                </div>
          :
            clients === null
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

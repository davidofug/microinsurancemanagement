import { CSVLink } from 'react-csv'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MdDownload } from 'react-icons/md'
import Header from '../parts/header/Header';
import data from '../helpers/mock-data.json'
import Pagination from '../helpers/Pagination';
import SearchBar from '../parts/searchBar/SearchBar';
import { Table } from 'react-bootstrap';
import { FaEllipsisV } from "react-icons/fa";
import { functions, db } from '../helpers/firebase';
import { httpsCallable } from 'firebase/functions';
import useAuth from '../contexts/Auth';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore'
import ClientModal from '../parts/ClientModal'
import { Modal } from 'react-bootstrap'
import { useForm } from '../hooks/useForm';

export default function Clients() {

  useEffect(() => 
    {
      document.title = 'Britam - Clients'

      
      getClients()
      getUsersMeta()
  }, [])

  const { authClaims } = useAuth()
  const [clients, setClients] = useState([]);
  const [meta, setMeta] = useState([])
  const metaCollectionRef = collection(db, "usermeta");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [editID, setEditID] = useState(null);
  const [searchText, setSearchText] = useState('')

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
    photo: '',
})

const [singleDoc, setSingleDoc] = useState(fields);

const getSingleClient = async (id) => setSingleDoc(clients.filter(client => client.uid == id)[0])


  const getClients = () => {
      const listUsers = httpsCallable(functions, 'listUsers')
      listUsers().then((results) => {
          const resultsArray = results.data
          const myUsers = resultsArray.filter(user => user.role.Customer === true)
          setClients(myUsers)
      }).catch((err) => {
          console.log(err)
      })
  }

  const getUsersMeta = async () => {
    const data = await getDocs(metaCollectionRef);
    setMeta(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const [ currentPage, setCurrentPage ] = useState(1)
  const [clientsPerPage] = useState(10)

  const indexOfLastClient = currentPage * clientsPerPage
  const indexOfFirstClient = indexOfLastClient - clientsPerPage
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient)
  const totalPagesNum = Math.ceil(clients.length / clientsPerPage)


  const handleDelete = async (id) => {
    const deleteUser = httpsCallable(functions, 'deleteUser')
    deleteUser({uid:id}).then().catch(err => {
      console.log(err)
    })

    const userMetaDoc = doc(db, "usermeta", id);
    await deleteDoc(userMetaDoc);

    getClients()
    getUsersMeta()
  };

  const handleSearch = ({ target }) => setSearchText(target.value);
  const searchByName = (data) => data.filter(row => row.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)

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

            <Modal show={show} onHide={handleClose}>
              <ClientModal singleDoc={singleDoc} handleFieldChange={handleFieldChange} />
            </Modal>

            <div className="componentsData">
              <div className="shadow-sm table-card">
                  <div id="search">
                    <SearchBar placeholder={"Search Client by name"} value={searchText} handleSearch={handleSearch}/>
                    <div></div>
                    <CSVLink data={clients} filename={"Britam-Clients.csv"} className="btn btn-primary cta">
                      Export <MdDownload />
                    </CSVLink>
                  </div>


                  <Table hover striped responsive className='mt-5'>
                        <thead>
                            <tr><th>#</th><th>Name</th><th>Email</th><th>Gender</th><th>Contact</th><th>Address</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                          {searchByName(clients).map((client, index) => (
                              <tr key={client.uid}>
                              <td>{index + 1}</td>
                              <td>{client.name}</td>
                              <td>{client.email}</td>
                              {meta.filter(user => user.id == client.uid).map(user => (
                                <>
                                  <td>{user.gender}</td>
                                  <td>{user.phone}</td>
                                  <td>{user.address}</td>
                                </>
                              ))}
                <td className="started">
                  <FaEllipsisV
                    className={`actions please${index}`}
                    onClick={() => {
                      document
                        .querySelector(`.please${index}`)
                        .classList.add("hello");
                    }}
                  />
                  <ul id="actionsUl" className="actions-ul">
                  
                    <li>
                      <button
                        onClick={() => {
                          document
                            .querySelector(`.please${index}`)
                            .classList.remove("hello");
                          const confirmBox = window.confirm(
                            `Are you sure you want to ${client.name}`
                          );
                          if (confirmBox === true) {
                            handleDelete(client.uid)
                          }
                        }}
                      >
                        Delete
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setEditID(client.uid);
                          getSingleClient(client.uid)
                          handleShow();
                          document
                            .querySelector(`.please${index}`)
                            .classList.remove("hello");
                        }}
                      >
                        Edit
                      </button>
                    </li>
                    <hr style={{ color: "black" }}></hr>
                    <li>
                      <button
                        onClick={() => {
                          document
                            .querySelector(`.please${index}`)
                            .classList.remove("hello");
                        }}
                      >
                        close
                      </button>
                    </li>
                  </ul>
                </td>
                          </tr>
                          ))}
                          <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            
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
              </div>
            </div>
        </div>
    )
}

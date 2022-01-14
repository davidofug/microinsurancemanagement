import { CSVLink } from 'react-csv'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MdDownload } from 'react-icons/md'
import Header from '../../components/header/Header';
import data from '../../helpers/mock-data.json'
import Pagination from '../../helpers/Pagination';
import SearchBar from '../../components/searchBar/SearchBar';
import { Table, Modal } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import ClientModal from '../../components/ClientModal';
import { functions, db } from '../../helpers/firebase';
import { httpsCallable } from 'firebase/functions';
import { doc, deleteDoc } from 'firebase/firestore'

export default function Clients() {

  useEffect(() => {
    document.title = 'Britam - Clients'

    const listUsers = httpsCallable(functions, 'listUsers')
      listUsers().then((results) => {
          const resultsArray = results.data
          const myUsers = resultsArray.filter(user => user.role.Customer === true)
          setClients(myUsers)
          console.log(resultsArray.data)
      }).catch((err) => {
          console.log(err)
      })
  
  }, [])

  

  const [clients, setClients] = useState([]);
  const [editFormData, setEditFormData] = useState({ name: "", gender: "", email: "", contact: "", address: "" });
  const [editContactId, setEditContactId] = useState(null);
  const [q, setQ] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [ currentPage, setCurrentPage ] = useState(1)
  const [employeesPerPage] = useState(10)

  const indexOfLastEmployee = currentPage * employeesPerPage
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
  const currentClients = clients.slice(indexOfFirstEmployee, indexOfLastEmployee)
  const totalPagesNum = Math.ceil(data.length / employeesPerPage)

  const handleDelete = async (id) => {
    const clientMeta = doc(db, "user", id);
    await deleteDoc(clientMeta);
  };


//   const search = rows => rows.filter(row => columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

  const handleSearch = ({target}) => setQ(target.value)

    return (
        <div className='components'>
            <Header title="Clients" subtitle="MANAGING CLIENTS" />
   
            <div id="add_client_group">
                <div></div>
                <Link to="/agent/add-user">
                    <button className='btn btn-primary cta'>Add Client</button>
                </Link>
            </div>

            <Modal show={show} onHide={handleClose}>
                <ClientModal />
            </Modal>

            <div className="componentsData">
              <div className="table-card">
                  <div id="search">
                    <SearchBar placeholder={"Search for client"} value={q} handleSearch={handleSearch}/>
                    <div></div>
                    <CSVLink data={data} filename={"Britam-Clients.csv"} className="btn btn-primary cta">
                      Export <MdDownload />
                    </CSVLink>
                  </div>

                    <Table hover striped responsive>
                        <thead>
                            <tr><th>#</th><th>Name</th><th>Gender</th><th>Email</th><th>Contact</th><th>Address</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                        {clients.map((client, index) => (
                              <tr key={client.uid}>
                              <td>{index + 1}</td>
                              <td>{client.name}</td>
                              <td>{client.gender}</td>
                              <td>{client.email}</td>
                              <td>{client.contact}</td>
                              <td>{client.address}</td>
                <td className="started">
                  <FaEllipsisV
                    className={`actions please`}
                    onClick={() => {
                      document
                        .querySelector(`.please`)
                        .classList.add("hello");
                    }}
                  />
                  <ul id="actionsUl" className="actions-ul">
                  
                    <li>
                      <button
                        onClick={() => {
                          document
                            .querySelector(`.please`)
                            .classList.remove("hello");
                          const confirmBox = window.confirm(
                            `Are you sure you want to delete's claim`
                          );
                          if (confirmBox === true) {
                            handleDelete(client.uid);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          document
                            .querySelector(`.please`)
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
                            .querySelector(`.please`)
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
                        </tbody>
                        <tfoot>
                            <tr><th>#</th><th>Name</th><th>Gender</th><th>Email</th><th>Contact</th><th>Address</th><th>Action</th></tr>
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

import { CSVLink } from 'react-csv'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MdDownload } from 'react-icons/md'
import Header from '../parts/header/Header';
import data from '../helpers/mock-data.json'
import Pagination from '../helpers/Pagination';
import SearchBar from '../parts/searchBar/SearchBar';
import { EditableDatable } from '../helpers/DataTable';
import { Table } from 'react-bootstrap';
import { FaEllipsisV } from "react-icons/fa";
import { functions } from '../helpers/firebase';
import { httpsCallable } from 'firebase/functions';

export default function Clients() {

  useEffect(() => 
    {
      document.title = 'Britam - Clients'

      const listUsers = httpsCallable(functions, 'listUsers')
      listUsers().then((results) => {
          const resultsArray = results.data
          const myUsers = resultsArray.filter(user => user.role.Customer === true)
          setClients(myUsers)
      }).catch((err) => {
          console.log(err)
      })


  }, [])

  
  const [clients, setClients] = useState([]);
  const [editFormData, setEditFormData] = useState({ name: "", gender: "", email: "", contact: "", address: "" });
  const [editContactId, setEditContactId] = useState(null);
  const [q, setQ] = useState('');



  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const newFormData = { ...editFormData };
    newFormData[fieldName] = event.target.value;
    setEditFormData(newFormData);
  };


  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedContact = {
      id: editContactId,
      name: editFormData.name,
      gender: editFormData.gender,
      email: editFormData.email,
      contact: editFormData.contact,
      address: editFormData.address,
    };

    const newClients = [...clients];
    const index = clients.findIndex((client) => client.id === editContactId);
    newClients[index] = editedContact;
    setClients(newClients);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);
    const formValues = {
      name: contact.name,
      gender: contact.gender,
      email: contact.email,
      contact: contact.contact,
      address: contact.address,
    };
    setEditFormData(formValues);
  };

  const [ currentPage, setCurrentPage ] = useState(1)
  const [employeesPerPage] = useState(10)

  const indexOfLastEmployee = currentPage * employeesPerPage
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
  const currentClients = clients.slice(indexOfFirstEmployee, indexOfLastEmployee)
  const totalPagesNum = Math.ceil(data.length / employeesPerPage)

  const handleDeleteClick = (clientId) => {
    const newClients = [...clients];
    const index = clients.findIndex((client) => client.id === clientId);
    newClients.splice(index, 1);
    setClients(newClients);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };
    
  const columns = ["id", "name", "gender", "email", "contact", "address"]
  const columnHeading = ["#", "Name", "Gender", "Email", "Contact", "Address", "Action"]

  const search = rows => rows.filter(row => columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

  const handleSearch = ({target}) => setQ(target.value)

    return (
        <div className='components'>
            <Header title="Clients" subtitle="MANAGING CLIENTS" />
   
            <div id="add_client_group">
                <div></div>
                <Link to="/add-user">
                    <button className='btn btn-primary cta'>Add Client</button>
                </Link>
            </div>

            <div className="componentsData">
              <div className="shadow-sm table-card">
                  <div id="search">
                    <SearchBar placeholder={"Search for client"} value={q} handleSearch={handleSearch}/>
                    <div></div>
                    <CSVLink data={data} filename={"Britam-Clients.csv"} className="btn btn-primary cta">
                      Export <MdDownload />
                    </CSVLink>
                  </div>

                  {/* <form onSubmit={handleEditFormSubmit}>
                  <EditableDatable columns={columns} columnHeading={columnHeading} editContactId={editContactId}
                    currentClients={search(currentClients)} handleDeleteClick={handleDeleteClick}
                    handleEditClick={handleEditClick} editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick}
                  /> 
                  </form> */}

                  <Table hover striped responsive>
                        <thead>
                            <tr><th>#</th><th>Name</th><th>Gender</th><th>Email</th><th>Contact</th><th>Address</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                          {clients.map(client => (
                              <tr key={client.uid}>
                              <td>{1}</td>
                              <td>{client.name}</td>
                              <td>{client.email}</td>
                              <td>Email</td>
                              <td>Contact</td>
                              <td>Address</td>
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
                    sortedEmployees={data}
                    entries={'Clients'} />
              </div>
            </div>
        </div>
    )
}

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import data from '../helpers/mock-data.json'
import { EditableDatable } from '../helpers/DataTable';
import { MdDownload } from 'react-icons/md'
import { Form, Button } from 'react-bootstrap'
import Pagination from '../helpers/Pagination';
import { CSVLink } from 'react-csv'
import SearchBar from '../parts/searchBar/SearchBar';
import Header from '../parts/header/Header';


function Clients() {


  const [clients, setClients] = useState(data);
  //
  const [editFormData, setEditFormData] = useState({
    name: "",
    gender: "",
    email: "",
    contact: "",
    address: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

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

  //

    //
    const [ currentPage, setCurrentPage ] = useState(1)
    const [employeesPerPage] = useState(10)

    const indexOfLastEmployee = currentPage * employeesPerPage
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
    const currentClients = clients.slice(indexOfFirstEmployee, indexOfLastEmployee)
    const totalPagesNum = Math.ceil(data.length / employeesPerPage)

    //

    useEffect(() => {document.title = 'Britam - Clients'}, [])


    const [q, setQ] = useState('');

    const handleDeleteClick = (clientId) => {
      const newClients = [...clients];
      const index = clients.findIndex((client) => client.id === clientId);
      newClients.splice(index, 1);
      console.log(newClients)
      setClients(newClients);
    };

    const handleCancelClick = () => {
      setEditContactId(null);
    };
    
    const columns = ["id", "name", "gender", "email", "contact", "address"]
    const columnHeading = ["#", "Name", "Gender", "Email", "Contact", "Address", ""]

    const search = rows => rows.filter(row =>
      columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

      const handleSearch = ({target}) => setQ(target.value)

    return (
        <div className='components'>
            <Header title="Clients" subtitle="MANAGING CLIENTS" />
   
            <div id="add_client_group">
                <div></div>
                <Link to="/add-clients">
                    <Button className='btn btn-primary cta'>Add Client</Button>
                </Link>
            </div>

            <div className="componentsData">
            
              <div className="table-card">
                  <div id="search">
                  <SearchBar placeholder={"Search for client"} value={q} handleSearch={handleSearch}/>
                      <div></div>
                      <CSVLink
                                data={data}
                                filename={"Britam-Clients.csv"}
                                className="btn btn-primary cta"
                                target="_blank"
                              >
                                Export <MdDownload />
                            </CSVLink>
                  </div>
                  <form onSubmit={handleEditFormSubmit}>
                  <EditableDatable 
                    columns={columns}
                    columnHeading={columnHeading}
                    editContactId={editContactId}
                    currentClients={search(currentClients)}
                    handleDeleteClick={handleDeleteClick}
                    handleEditClick={handleEditClick}
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  /> 
                  </form>

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

export default Clients

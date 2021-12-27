import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import data from '../../helpers/mock-data.json'
import Datatable from '../../helpers/DataTable';
import { Form } from 'react-bootstrap'
import { MdDownload } from 'react-icons/md'
import Pagination from '../../helpers/Pagination';
import { EditableDatable } from '../../helpers/DataTable'
import SearchBar from '../../parts/searchBar/SearchBar';
import Header from '../../parts/header/Header';

function Supervisors() {

    useEffect(() => {document.title = 'Britam - Supervisors'}, [])

    const [supervisors, setSuperviors] = useState(data);
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
    
    const newSupervisors = [...supervisors];

    const index = supervisors.findIndex((supervisor) => supervisor.id === editContactId);

    newSupervisors[index] = editedContact;

    setSuperviors(newSupervisors);
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
    const currentSupervisors = supervisors.slice(indexOfFirstEmployee, indexOfLastEmployee)
    const totalPagesNum = Math.ceil(data.length / employeesPerPage)



    const handleDeleteClick = (supervisorId) => {
        const newSupervisors = [...supervisors];
        const index = supervisors.findIndex(supervisor => supervisor.id === supervisorId);
        newSupervisors.splice(index, 1);
        console.log(newSupervisors)
        setSuperviors(newSupervisors);
      };
  
      const handleCancelClick = () => {
        setEditContactId(null);
      };



    const [q, setQ] = useState('');

    const columnHeading = ["#", "License No.", "Name", "Gender", "Email", "NIN", "Contact", "Role", "Branch Name", "Actions"]
    const columns = ["id", "contact", "name", "gender", "email", "contact", "contact", "email", 'address']
    const search = rows => rows.filter(row =>
        columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

        const handleSearch = ({target}) => setQ(target.value)

    return (
        <div className='components'>
          <Header title="Supervisors" subtitle="MANAGING SUPERVISORS" />

            <div id="add_client_group">
                <div></div>
                <Link to="/add-Supervisors">
                    <button className="btn btn-primary cta">Add supervisor</button>
                </Link>
                
            </div>

            <div className="table-card componentsData">   
                <div id="search">
                            <SearchBar placeholder={"Search for Supervisor"} value={q} handleSearch={handleSearch}/>
                            <div></div>
                            <button className='btn btn-primary cta mb-3'>Export <MdDownload /></button>
                      </div>

                <form onSubmit={handleEditFormSubmit}>
                        <EditableDatable 
                            columns={columns}
                            columnHeading={columnHeading}
                            editContactId={editContactId}
                            currentClients={search(currentSupervisors)}
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
                    currentClients={currentSupervisors}
                    sortedEmployees={data}
                    entries={'Supervisor'} />

               
            </div>
        </div>
    )
}

export default Supervisors

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import data from '../helpers/mock-data.json'
import { EditableDatable } from '../helpers/DataTable';
import { MdDownload } from 'react-icons/md'
import Pagination from '../helpers/Pagination';
import SearchBar from '../parts/searchBar/SearchBar'
import Header from '../parts/header/Header';

function Agents() {

    useEffect(() => {document.title = 'Britam - Agents'}, [])

    const [agents, setAgents] = useState(data);
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
    
    const newAgents = [...agents];

    const index = agents.findIndex((agent) => agent.id === editContactId);

    newAgents[index] = editedContact;

    setAgents(newAgents);
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
    const currentAgents = agents.slice(indexOfFirstEmployee, indexOfLastEmployee)
    const totalPagesNum = Math.ceil(data.length / employeesPerPage)



    const handleDeleteClick = (agentId) => {
        const newAgents = [...agents];
        const index = agents.findIndex((agent) => agent.id === agentId);
        newAgents.splice(index, 1);
        console.log(newAgents)
        setAgents(newAgents);
      };
  
      const handleCancelClick = () => {
        setEditContactId(null);
      };

    const [q, setQ] = useState('');

    const columnHeading = ["#", "License No.", "National ID", "Name", "Gender", "Phone No.", "Email", "CreatedAt", "Action"]
    const columns = ["id", "contact", "contact", "name", "gender", "contact", "email", "createdAt"]
    const search = rows => rows.filter(row =>
        columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

        const handleSearch = ({target}) => setQ(target.value)

    return (
        <div className='components'>
            <Header title="Agents" subtitle="MANAGING AGENTS" />
   
            <div id="add_client_group">
                <div></div>
                <Link to="/add-user">
                    <button className="btn btn-primary cta">Add Agent</button>
                </Link>
            </div>

            <div className="shadow-sm table-card componentsData">   
                <div id="search">
                <SearchBar placeholder={"Search for agent"} value={q} handleSearch={handleSearch}/>
                    <div></div>
                    <button className='btn btn-primary cta mb-3'>Export <MdDownload /></button>
                </div>

                    <form onSubmit={handleEditFormSubmit}>
                        <EditableDatable 
                            columns={columns}
                            columnHeading={columnHeading}
                            editContactId={editContactId}
                            currentClients={search(currentAgents)}
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
                    currentClients={currentAgents}
                    sortedEmployees={data}
                    entries={'Agents'} />

               
            </div>
        </div>
    )
}

export default Agents

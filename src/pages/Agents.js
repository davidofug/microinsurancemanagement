import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import data from '../helpers/mock-data.json'
import { EditableDatable } from '../helpers/DataTable';
import { Form } from 'react-bootstrap'
import { MdDownload } from 'react-icons/md'
import Pagination from '../helpers/Pagination';

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

    const columnHeading = ["#", "License No.", "National ID", "Name", "Gender", "Phone No.", "Email", "CreatedAt", ""]
    const columns = ["id", "contact", "contact", "name", "gender", "contact", "email", "createdAt"]
    const search = rows => rows.filter(row =>
        columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

    return (
        <div className='components'>
            <header className='heading'>
                <h1 className='title'>Agents</h1>
                <p className="subtitle">MANAGING AGENTS</p>
            </header>
            <div id="add_client_group">
                <div></div>
                <Link to="/add-agents">
                    <button className="btn btn-primary cta">Add Agent</button>
                </Link>
            </div>

            <div className="table-card componentsData">   
                <div id="search">
                    <Form.Control type="text" className='mb-3' placeholder="Search for agent"
                        value={q} onChange={({target}) => setQ(target.value)} 
                    />
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

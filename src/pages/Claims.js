import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import data from '../helpers/mock-data.json'
import Datatable from '../helpers/DataTable';
import { Form } from 'react-bootstrap'
import Pagination from '../helpers/Pagination';
import { EditableDatable } from '../helpers/DataTable'
import SearchBar from '../parts/searchBar/SearchBar';

function Claims() {

    useEffect(() => {document.title = 'Britam - Claims'}, [])


    const [claims, setClaims] = useState(data);
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
    
    const newClaims = [...claims];

    const index = claims.findIndex(claim => claim.id === editContactId);

    newClaims[index] = editedContact;

    setClaims(newClaims);
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
    const currentClaims = claims.slice(indexOfFirstEmployee, indexOfLastEmployee)
    const totalPagesNum = Math.ceil(data.length / employeesPerPage)



    const handleDeleteClick = (claimId) => {
        const newClaims = [...claims];
        const index = claims.findIndex((claim) => claim.id === claimId);
        newClaims.splice(index, 1);
        setClaims(newClaims);
      };
  
      const handleCancelClick = () => {
        setEditContactId(null);
      };


    const [clients, setClients] = useState(data);
    const [q, setQ] = useState('');

    const columnHeading = ["Ref Number", "Claimant Details", "Date of Incident", "Number Plate", "Sticker Number", "Claim Estimate", "Status", "Action"]
    const columns = ["contact", "name", "createdAt", "contact", "contact", "amount", "status"]
    const search = rows => rows.filter(row =>
        columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

        const handleSearch = ({target}) => setQ(target.value)


    return (
        <div className='components'>
            <header className='heading'>
                <h1 className='title'>Claims</h1>
                <p className="subtitle">MANAGING CLAIMS</p>
            </header>
            <div id="add_client_group">
                <div></div>
                <Link to="/add-claim">
                    <button className="btn btn-primary cta">Add Claim</button>
                </Link>
                
            </div>

            <div className="table-card componentsData">   
                <div id="search">
                            <SearchBar placeholder={"Search for claim"} value={q} handleSearch={handleSearch}/>
                            <div></div>
                            <div></div>
                      </div>

                      <form onSubmit={handleEditFormSubmit}>
                        <EditableDatable 
                            columns={columns}
                            columnHeading={columnHeading}
                            editContactId={editContactId}
                            currentClients={search(currentClaims)}
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
                    currentClients={currentClaims}
                    sortedEmployees={data}
                    entries={'claims'} />

               
            </div>
        </div>
    )
}

export default Claims

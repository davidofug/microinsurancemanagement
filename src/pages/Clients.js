import generatedData from '../helpers/generatedClients';
import { Link } from 'react-router-dom'
import { useEffect, useState, Fragment } from 'react'
import data from '../helpers/mock-data.json'
import EditableRow from '../helpers/EditableRow';
import ReadOnlyRow from '../helpers/ReadOnlyRow';
import { MdDownload } from 'react-icons/md'

function Clients() {

    useEffect(() => {
        document.title = 'Britam - Clients'
    }, [])

    const [searchText, setSearchText] = useState('');

    const [contacts, setContacts] = useState(data);

    const [addFormData, setAddFormData] = useState({
        name: "",
        gender: "",
        email: "",
        contact: "",
        address: ""
      });

    const [editFormData, setEditFormData] = useState({
        name: "",
        gender: "",
        email: "",
        contact: "",
        address: ""
      });

      const [editContactId, setEditContactId] = useState(null);

      const handleAddFormChange = (event) => {
        event.preventDefault();
    
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
    
        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;
    
        setAddFormData(newFormData);
      };

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
          address: editFormData.address
        };
    
        const newContacts = [...contacts];
    
        const index = contacts.findIndex((contact) => contact.id === editContactId);
    
        newContacts[index] = editedContact;
    
        setContacts(newContacts);
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
          address: contact.address
        };
    
        setEditFormData(formValues);
      };
    
      const handleCancelClick = () => {
        setEditContactId(null);
      };

      const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts];
    
        const index = contacts.findIndex((contact) => contact.id === contactId);
    
        newContacts.splice(index, 1);
    
        setContacts(newContacts);
      };

    return (
        <div className='components'>
            <div className='heading'>
                <h1 className='title'>Clients</h1>
                <p className="subtitle">MANAGING CLIENTS</p>
            </div>
            <div id="add_client_group">
                <div></div>
                <Link to="/add-clients">
                    <button className="btn btn-primary cta">Add Client</button>
                </Link>
                
            </div>

                <div class="componentsData">
                  <div className="table-card">
                      <div id="search">
                          <input type="text" placeholder='Search for client...' id='searchInput' />
                          <button className='btn btn-primary cta'>Search</button>
                          <button className='btn btn-primary cta'>Export <MdDownload /></button>
                      </div>
                              <form action="" onSubmit={handleEditFormSubmit}>
                      <table class="table table-striped" style={{border: "1px solid black"}}>
                          <thead>
                              <tr><th>#</th><th>Name</th><th>Gender</th><th>Email</th><th>Contact</th><th>Address</th></tr>
                          </thead>
                          <tbody>
                          {contacts.map((contact) => (
                              <Fragment>
                                  {editContactId === contact.id ? (
                                  <EditableRow
                                      editFormData={editFormData}
                                      handleEditFormChange={handleEditFormChange}
                                      handleCancelClick={handleCancelClick}
                                  />
                                  ): (
                                      <ReadOnlyRow
                                        contacts={contacts.filter((contact) =>
                                          contact.name.toLowerCase().includes(searchText)
                                        )}
                                        contact={contact}
                                        handleEditClick={handleEditClick}
                                        handleDeleteClick={handleDeleteClick}
                                      />
                                    )}
                              </Fragment>
                          ))}
                          </tbody>
                          <tfoot>
                              <tr><th>#</th><th>Name</th><th>Gender</th><th>Email</th><th>Contact</th><th>Address</th></tr>
                          </tfoot>
                      </table>
                              </form>
                </div>
                </div>
        </div>
    )
}

export default Clients

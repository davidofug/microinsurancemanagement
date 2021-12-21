import generatedData from '../../helpers/generatedClients';
import { Link } from 'react-router-dom'
import { useEffect, useState, Fragment } from 'react'
import data from '../../helpers/mock-data.json'
import EditableRow from '../../helpers/EditableRow';
import ReadOnlyRow from '../../helpers/ReadOnlyRow';
import Search from '../../helpers/Search';
import { MdDownload } from 'react-icons/md'
import { MDBDataTable } from 'mdbreact'
import stickerData from '../../helpers/Sticker-fake-data';
import { organisationData } from '../../helpers/Sticker-fake-data'
import Datatable from '../../helpers/DataTable';
import { Form } from 'react-bootstrap'


//
require('es6-promise').polyfill();
require('isomorphic-fetch');

//



function Organisations() {


  //
  // const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [searchColumns, setSearchColumns] = useState([
    'name',
    'birth_year',
  ]);

  //

  const { client } = data
  console.log(client)

    useEffect(() => {
        document.title = 'Britam - Clients'
    }, [])

    const columns = data[0] && Object.keys(data[0]);
    //

    function search(rows) {
      return rows.filter((row) =>
        columns.some(
          (column) =>
            row[column]
              .toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1,
        ),
      );
    }

    
  

    //




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
                <h1 className='title'>Organisations</h1>
                <p className="subtitle">MANAGING ORGANISATIONS</p>
            </div>
            <div id="add_client_group">
                <div></div>
                <Link to="/admin-add-organisations">
                    <button className="btn btn-primary cta">Add Organisation</button>
                </Link>
                
            </div>

                <div class="componentsData">
                  <div className="table-card">

                  <div id="search">
                          <Form.Control type="text" placeholder="Search for organisation"
                            type='text'
                            value={q}
                            onChange={(e) => setQ(e.target.value)} 
                            style={{"margin-bottom": "10px"}}
                          />
                          <div></div>
                          <button className='btn btn-primary cta'>Export <MdDownload /></button>
                      </div>
                   <div>

      <div>
      

        {/* {columns &&
          columns.map((column) => (
            <label>
              <input
                type='checkbox'
                checked={searchColumns.includes(column)}
                onChange={(e) => {
                  const checked = searchColumns.includes(column);
                  setSearchColumns((prev) =>
                    checked
                      ? prev.filter((sc) => sc !== column)
                      : [...prev, column],
                  );
                }}
              />
              {column}
            </label>
          ))} */}
      </div>
      <div>
        <Datatable data={search(data)} />
      </div>
    </div>

    
                  <MDBDataTable
                            striped
                            bordered
                            responsive
                            hover
                            data={organisationData}
                        />

                      
                </div>
                </div>
        </div>
    )
}

export default Organisations

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MdDownload } from 'react-icons/md'
import Pagination from '../../helpers/Pagination';
import SearchBar from '../../parts/searchBar/SearchBar';
import Header from '../../parts/header/Header';
import { functions, db } from '../../helpers/firebase';
import { httpsCallable } from 'firebase/functions';
import { FaEllipsisV } from "react-icons/fa";
import { Table } from 'react-bootstrap'
import { getDocs, collection } from 'firebase/firestore'

function Supervisors() {

    useEffect(() => {
      document.title = 'Britam - Supervisors'

      const listUsers = httpsCallable(functions, 'listUsers')
      listUsers().then((results) => {
          const resultsArray = results.data
          const myUsers = resultsArray.filter(user => user.role.supervisor === true)
          setSuperviors(myUsers)
      }).catch((err) => {
          console.log(err)
      })
      getUsersMeta()

    }, [])

    const [meta, setMeta] = useState([])
    const metaCollectionRef = collection(db, "usermeta");
    const getUsersMeta = async () => {
      const data = await getDocs(metaCollectionRef);
      setMeta(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const [supervisors, setSuperviors] = useState([]);
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


  const [ currentPage, setCurrentPage ] = useState(1)
  const [supervisorsPerPage] = useState(10)

  const indexOfLastSupervisor = currentPage * supervisorsPerPage
  const indexOfFirstSupervisor = indexOfLastSupervisor - supervisorsPerPage
  const currentSupervisors = supervisors.slice(indexOfFirstSupervisor, indexOfLastSupervisor)
  const totalPagesNum = Math.ceil(supervisors.length / supervisorsPerPage)



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

    const columns = ["id", "contact", "name", "gender", "email", "contact", "contact", "email", 'address']
    const search = rows => rows.filter(row =>
        columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

        const handleSearch = ({target}) => setQ(target.value)

    return (
        <div className='components'>
          <Header title="Supervisors" subtitle="MANAGING SUPERVISORS" />

            <div id="add_client_group">
                <div></div>
                <Link to="/admin/add-user">
                    <button className="btn btn-primary cta">Add supervisor</button>
                </Link>
                
            </div>

            <div className="shadow-sm table-card componentsData">   
                <div id="search">
                            <SearchBar placeholder={"Search for Supervisor"} value={q} handleSearch={handleSearch}/>
                            <div></div>
                            <button className='btn btn-primary cta mb-3'>Export <MdDownload /></button>
                      </div>

                    <Table hover striped responsive className='mt-5'>
                        <thead>
                            <tr><th>#</th><th>Name</th><th>Email</th><th>Gender</th><th>Contact</th><th>Address</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                          {supervisors.map((supervisor, index) => (
                              <tr key={supervisor.uid}>
                              <td>{index+1}</td>
                              <td>{supervisor.name}</td>
                              <td>{supervisor.email}</td>
                              {meta.filter(user => user.id == supervisor.uid).map(user => (
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
                            
                        </tbody>
                        <tfoot>
                            <tr><th>#</th><th>Name</th><th>Email</th><th>Gender</th><th>Contact</th><th>Address</th><th>Action</th></tr>
                        </tfoot>
                    </Table>

                  <Pagination 
                    pages={totalPagesNum}
                    setCurrentPage={setCurrentPage}
                    currentClients={currentSupervisors}
                    sortedEmployees={supervisors}
                    entries={'Supervisor'} />

               
            </div>
        </div>
    )
}

export default Supervisors

import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import data from '../helpers/mock-data.json'
import Pagination from '../helpers/Pagination';
import ClaimTable from '../parts/ClaimTable';
import SearchBar from '../parts/searchBar/SearchBar';
import Header from '../parts/header/Header';
import { Table, Alert } from 'react-bootstrap'
import { db } from '../helpers/firebase'
import { collection, getDocs, addDoc, doc} from 'firebase/firestore'
import { FaEllipsisV } from 'react-icons/fa'
 
function Claims() {
  const [claims, setClaims] = useState([])
  const claimsCollectionRef = collection(db, "claims")

    useEffect(() => {
      document.title = 'Britam - Claims'


      const getClaims = async () => {
        const data = await getDocs(claimsCollectionRef)
        // console.log(data)
        // console.log(data.docs)
        setClaims(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }
      // setClaims(data)
      // getClaims()
      // console.log(data)
      getClaims()
    }, [])

    /* start from here */

    // function getData() {
    //   claimsCollectionRef.onSnapshot((querySnapshot) => {
    //     const items = []
    //     querySnapshot.forEach((doc) =>{
    //       items.push({...doc.data(), id: doc.id})
    //     })
    //     setClaims(items)
    //   })
    // }

    
    // const [claims, setClaims] = useState(data);
    
    
  //
  //   const [editFormData, setEditFormData] = useState({
  //       name: "",
  //       gender: "",
  //       email: "",
  //       contact: "",
  //       address: "",
  //   });

  // const [editContactId, setEditContactId] = useState(null);

  // const handleEditFormChange = (event) => {
  //   event.preventDefault();

  //   const fieldName = event.target.getAttribute("name");
  //   const fieldValue = event.target.value;

  //   const newFormData = { ...editFormData };
  //   newFormData[fieldName] = fieldValue;

  //   setEditFormData(newFormData);
  // };


  // const handleEditFormSubmit = (event) => {
  //   event.preventDefault();

  //   const editedContact = {
  //     id: editContactId,
  //     name: editFormData.name,
  //     gender: editFormData.gender,
  //     email: editFormData.email,
  //     contact: editFormData.contact,
  //     address: editFormData.address,
  //   };
    
  //   const newClaims = [...claims];

  //   const index = claims.findIndex(claim => claim.id === editContactId);

  //   newClaims[index] = editedContact;

  //   setClaims(newClaims);
  //   setEditContactId(null);
  // };

  // const handleEditClick = (event, contact) => {
  //   event.preventDefault();
  //   setEditContactId(contact.id);

  //   const formValues = {
  //     name: contact.name,
  //     gender: contact.gender,
  //     email: contact.email,
  //     contact: contact.contact,
  //     address: contact.address,
  //   };

  //   setEditFormData(formValues);
  // };

  //

    //
    const [ currentPage, setCurrentPage ] = useState(1)
    const [employeesPerPage] = useState(10)

    const indexOfLastEmployee = currentPage * employeesPerPage
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
    const currentClaims = claims.slice(indexOfFirstEmployee, indexOfLastEmployee)
    const totalPagesNum = Math.ceil(data.length / employeesPerPage)



    // const handleDeleteClick = (claimId) => {
    //     const newClaims = [...claims];
    //     const index = claims.findIndex((claim) => claim.id === claimId);
    //     newClaims.splice(index, 1);
    //     setClaims(newClaims);
    //   };
  
    //   const handleCancelClick = () => {
    //     setEditContactId(null);
    //   };


    // const [q, setQ] = useState('');

    
    // const columns = ["contact", "name", "createdAt", "contact", "contact", "amount", "status"]
    // const search = rows => rows.filter(row =>
    //     columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

    //     const handleSearch = ({target}) => setQ(target.value)

      // setClaims(search(claims))
    return (
        <div className='components'>
            <Header title="Claims" subtitle="MANAGING CLAIMS" />

            <div id="add_client_group">
                <div></div>
                <Link to="/add-claim">
                    <button className="btn btn-primary cta">Add Claim</button>
                </Link>
                
            </div>

            <div className="table-card componentsData">   
                      <div id="search">
                            {/* <SearchBar placeholder={"Search for claim"} value={q} handleSearch={handleSearch}/> */}
                            <div></div>
                            <div></div>
                      </div>

                      <Table hover striped responsive>
                        <thead>
                          <tr><th>Ref Number</th><th>Claimant Details</th><th>Date of Incident</th><th>Number Plate</th><th>Sticker Number</th><th>Claim Estimate</th><th>Status</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                          {claims.map((claim, index) => (
                            <tr key={index}>
                              <td>{claim.contact}</td>
                              <td>{claim.claimantName}</td>
                              <td>{claim.dateOfIncident}</td>
                              <td>{claim.numberPlate}</td>
                              <td>{claim.stickerNumber}</td>
                              <td>{claim.estimate}</td>
                              <td><Alert style={{"backgroundColor": "#1475cf", "color": "#fff", "padding": "5px", "textAlign": "center", "border": "none", "margin": "0"}}>{claim.status}</Alert></td>
                              <td className='started'>
                        <FaEllipsisV className={`actions please${index}`} onClick={() => {
                            document.querySelector(`.please${index}`).classList.add('hello')
                        }} />
                        <ul id="actionsUl" className='actions-ul'>
                            <li><button >View Notification</button></li>
                            <li><button >Claim Settlement</button></li>
                            <li><button >View Settlement</button></li>
                            <li><button >Cancel</button></li>
                            <li><button >Delete</button></li>
                            <li><button >Edit</button></li>
                            <hr style={{"color": "black"}}></hr>
                            <li><button onClick={() => {
                              document.querySelector(`.please${index}`).classList.remove('hello')
                            }}>close</button></li>
                        </ul>
                    </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr><th>Ref Number</th><th>Claimant Details</th><th>Date of Incident</th><th>Number Plate</th><th>Sticker Number</th><th>Status</th><th>Action</th></tr>
                        </tfoot>
                      </Table>

                  <Pagination 
                    pages={totalPagesNum}
                    setCurrentPage={setCurrentPage}
                    currentClients={claims}
                    sortedEmployees={data}
                    entries={'claims'} />

               
            </div>
        </div>
    )
}

export default Claims

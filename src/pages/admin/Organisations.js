import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Pagination from "../../helpers/Pagination";
import SearchBar from "../../components/searchBar/SearchBar";
import { Table } from "react-bootstrap";
import { db } from '../../helpers/firebase'
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import OrganisationModal from "../../components/OrganisationModel";
import { Modal } from 'react-bootstrap'
import { authentication } from "../../helpers/firebase";
import { MdEdit, MdDelete } from 'react-icons/md'
import { AiFillCloseCircle } from 'react-icons/ai'
import '../../components/modal/ConfirmBox.css'
import Loader from '../../components/Loader'
import { ImFilesEmpty } from 'react-icons/im'
import useDialog from "../../hooks/useDialog";

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Chat from '../../components/messenger/Chat'

export default function Organisations() {
  const [organisations, setOrganisations] = useState([]);
  const organisationsCollectionRef = collection(db, "organisations");

  // initialising the logs collection.
  const logCollectionRef = collection(db, "logs");

  useEffect(() => {
    document.title = "Britam - Organisations";
      getOrganisations()
  }, []);



  // TODO: working on the Organisation on delete Confirm box
  const [ openToggle, setOpenToggle ] = useState(false)
  window.onclick = (event) => {
    if(openToggle === true) {
      if (!event.target.matches('.wack') && !event.target.matches('#myb')) { 
        setOpenToggle(false)
    }
    }
  }
  



  const getOrganisations = async () => {
    const data = await getDocs(organisationsCollectionRef)
    const organisationArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    if(organisationArray.length === 0){
      setOrganisations(null)
    } else {
      setOrganisations(organisationArray)
    }
    
  }

  const [ show, handleShow, handleClose ] = useDialog();
  const [ searchText, setSearchText ] = useState('')

  const [currentPage, setCurrentPage] = useState(1);
  const [organisationsPerPage] = useState(10);

    const handleDelete = async (id) => {
      const organisationDoc = doc(db, "organisations", id);
      await deleteDoc(organisationDoc)
        .then(() => toast.success('Successfully deleted', {position: "top-center"}))
        .then(async () => {
          await addDoc(logCollectionRef, {
            timeCreated: `${new Date().toISOString().slice(0, 10)} ${ new Date().getHours()}:${ new Date().getMinutes()}:${ new Date().getSeconds()}`,
            type: 'organisation deletion',
            status: 'successful',
            message: `Successfully deleted organisation: ${singleDoc.name} by ${authentication.currentUser.displayName}`
          })
        })
        .catch(async () => {
          toast.error(`Failed to deleted organisation: ${singleDoc.name}`, {position: "top-center"});
          await addDoc(logCollectionRef, {
            timeCreated: `${new Date().toISOString().slice(0, 10)} ${ new Date().getHours()}:${ new Date().getMinutes()}:${ new Date().getSeconds()}`,
            type: 'organisation deletion',
            status: 'failed',
            message: `Failed to delete ${singleDoc.name}'s claim by ${authentication.currentUser.displayName}`
          })
        })
      
    };

    const [singleDoc, setSingleDoc] = useState({});

  const handleSearch = ({ target }) => setSearchText(target.value);
  const searchByName = (data) => !data || data.filter(row => row.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)

    // actions context
    const [showContext, setShowContext] = useState(false)
    if(showContext === true){
      window.onclick = function(event) {
          if (!event.target.matches('.sharebtn')) {
              setShowContext(false)
          }
      }
    }
    const [clickedIndex, setClickedIndex] = useState(null)

    //pagination
    const indexOfLastOrganisation = currentPage * organisationsPerPage;
    const indexOfFirstOrganisation = indexOfLastOrganisation - organisationsPerPage;
    const currentOrganisations = !organisations || searchByName(organisations)
    const totalPagesNum = !organisations || Math.ceil(organisations.length / organisationsPerPage);

    const paginatedShownOrganisations = !organisations || currentOrganisations.slice(indexOfFirstOrganisation, indexOfLastOrganisation)

    console.log(organisations)

  return (
    <div /* className="components" */>
      <Header title="Organisations" subtitle="VIEW COMPANY DETAILS" />
      <ToastContainer/>
      <div id="add_client_group">
        <div></div>
        <Link to="/admin/add-organisations">
          <button className="btn btn-primary cta">Add Organisation</button>
        </Link>
      </div>

      <div className={openToggle ? 'myModal is-active': 'myModal'}>
        <div className="modal__content wack">
          <h1 className='wack'>Confirm</h1>
          <p className='wack'>Are you sure you want to delete this <b>{singleDoc.name}</b></p>
          <div className="buttonContainer wack" >
            <button id="yesButton" onClick={() => {
              setOpenToggle(false)
              handleDelete(singleDoc.id)
              getOrganisations()
              }} className='wack'>Yes</button>
            <button id="noButton" onClick={() => setOpenToggle(false)} className='wack'>No</button>
          </div>
        </div>
      </div>



      <Modal show={show} onHide={handleClose}>
            <OrganisationModal singleDoc={singleDoc} handleClose={handleClose} getOrganisations={getOrganisations} />
      </Modal>

      {organisations === null  || organisations.length <= 0
      ?
        organisations === null
        ?
          <div className="no-table-data">
            <i><ImFilesEmpty /></i>
            <h4>No data yet</h4>
            <p>You have not created any Organisations Yet</p>
          </div>
        :
          <Loader />
      :
      <div className="componentsData">
      <div className="table-card">
        <div id="search">
          <SearchBar
            placeholder={"Search Organisation by name"}
            value={searchText}
            handleSearch={handleSearch}
          />
        </div>

        <Table
          bordered
          hover
          striped
          responsive
          className="mt-5"
        >
          <thead>
            <tr style={{borderTop: '1px solid transparent', borderLeft: '1px solid transparent', borderRight: '1px solid transparent'}}>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th colSpan={4} style={{border: "1px solid #000", textAlign: "center"}}>Contact Person</th></tr>
            <tr style={{borderTop: "1px solid #000"}}>
              <th className="text-center">Logo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No.</th>
              <th style={{borderLeft: "1px solid #000"}}>Name</th>
              <th>Role</th>
              <th>Phone No.</th>
              <th style={{borderRight: "1px solid #000"}}>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentOrganisations.map((organisation, index) => (
              <tr key={organisation.id}>
                <td className="text-center"><img src={organisation.logo} width={40} height={40} style={{borderRadius: "50%"}} /></td>
                <td>{organisation.name}</td>
                <td>{organisation.org_email}</td>
                <td>{organisation.tel}</td>
                <td style={{borderLeft: "1px solid #000"}}>{organisation.contactName}</td>
                <td>{organisation.role}</td>
                <td>{organisation.contactPhoneNumber}</td>
                <td style={{borderRight: "1px solid #000"}}>{organisation.contact_email}</td>
                
                <td className="started">
                    <button className="sharebtn" onClick={() => {setClickedIndex(index); setShowContext(!showContext); setSingleDoc(organisation)}}>&#8942;</button>

                    <ul  id="mySharedown" className={(showContext && index === clickedIndex) ? 'mydropdown-menu show': 'mydropdown-menu'} onClick={(event) => event.stopPropagation()}>
                      
                                  <li onClick={() => {
                                            setOpenToggle(true)
                                            setShowContext(false)
                                          }}
                                    >
                                      <div className="actionDiv">
                                        <i><MdDelete/></i> Delete
                                      </div>
                                </li>
                                <li onClick={() => {
                                        setShowContext(false)
                                        handleShow();
                                      }}
                                    >
                                      <div className="actionDiv">
                                        <i><MdEdit/></i> Edit
                                      </div>
                                </li>
                    </ul>
                  </td>

              </tr>
            ))}
          </tbody>

          <tfoot>
           <tr style={{border: "1px solid white", borderTop: "1px solid #000"}}>
             <td colSpan={7}>
             <Pagination
                pages={totalPagesNum}
                setCurrentPage={setCurrentPage}
                currentClients={paginatedShownOrganisations}
                sortedEmployees={organisations}
                entries={"Organisations"}
              />
             </td>
           </tr>
         </tfoot>  

          <tfoot>
            <tr>
              <th className="text-center">Logo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No.</th>
              <th style={{borderLeft: "1px solid #000"}}>Name</th>
              <th>Role</th>
              <th>Phone No.</th>
              <th style={{borderRight: "1px solid #000"}}>Email</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </Table>

        
      </div>
    </div>
        }
      <div style={{width:"100%", position:"fixed", bottom:"0px", display:"flex", justifyContent:"flex-end", paddingRight:"140px"}}>
        <Chat />
      </div> 
    </div>
  );
}

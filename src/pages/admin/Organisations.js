import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdDownload } from "react-icons/md";
import Header from "../../components/header/Header";
import Pagination from "../../helpers/Pagination";
import SearchBar from "../../components/searchBar/SearchBar";
import { Table } from "react-bootstrap";
import { db } from '../../helpers/firebase'
import { collection, getDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import OrganisationModal from "../../components/OrganisationModel";
import { Modal } from 'react-bootstrap'
import { useForm } from "../../hooks/useForm";
import { authentication } from "../../helpers/firebase";
import { MdEdit, MdDelete } from 'react-icons/md'
import { AiFillCloseCircle } from 'react-icons/ai'
import '../../components/modal/ConfirmBox.css'
import Loader from '../../components/Loader'
import { ImFilesEmpty } from 'react-icons/im'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Organisations() {
  const [organisations, setOrganisations] = useState([]);
  const organisationsCollectionRef = collection(db, "organisations");

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

  const [editID, setEditID] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [ searchText, setSearchText ] = useState('')

  const [fields, handleFieldChange] = useForm({
    uid: authentication.currentUser.uid,
    category: '',
    name: '',
    org_email: '',
    tel: '',
    address: '',
    logo: '',
    role: '',
    title: '',
    contactName: '',
    contactPhoneNumber: '',
    contact_email: '',
    password: ''

})

  const [currentPage, setCurrentPage] = useState(1);
  const [organisationsPerPage] = useState(10);

    const handleDelete = async (id) => {
      const organisationDoc = doc(db, "organisations", id);
      await deleteDoc(organisationDoc);
      toast.success('Successfully deleted', {position: "top-center"});
    };

    const [singleDoc, setSingleDoc] = useState(fields);

    const getSingleDoc = async (id) => {
      const docRef = doc(db, "organisations", id);
      const docSnap = await getDoc(docRef);
      setSingleDoc(docSnap.data());
    };

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
    const currentOrganisations = !organisations || searchByName(organisations).slice(
      indexOfFirstOrganisation,
      indexOfLastOrganisation
    );
    const totalPagesNum = !organisations || Math.ceil(organisations.length / organisationsPerPage);

  return (
    <div className="components">
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
          <p className='wack'>Are you sure you want to delete this user</p>
          <div className="buttonContainer wack" >
            <button id="yesButton" onClick={() => {
              setOpenToggle(false)
              handleDelete(editID)
              getOrganisations()
              }} className='wack'>Yes</button>
            <button id="noButton" onClick={() => setOpenToggle(false)} className='wack'>No</button>
          </div>
        </div>
      </div>



      <Modal show={show} onHide={() =>
        {
          handleClose()
          setSingleDoc(fields)
        }}>
        <OrganisationModal fields={fields} singleDoc={singleDoc} handleClose={handleClose} handleFieldChange={handleFieldChange} editID={editID} />
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
          <div></div>
          <CSVLink
            data={organisations}
            filename={"Britam-Organisations.csv"}
            className="btn btn-primary cta"
          >
            {" "}
            Export <MdDownload />
          </CSVLink>
        </div>

        <Table
          bordered
          hover
          striped
          responsive
          cellPadding={0}
          cellSpacing={0}
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
              <th>Logo</th>
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
                <td>{organisation.logo}</td>
                <td>{organisation.name}</td>
                <td>{organisation.org_email}</td>
                <td>{organisation.tel}</td>
                <td style={{borderLeft: "1px solid #000"}}>{organisation.contactName}</td>
                <td>{organisation.role}</td>
                <td>{organisation.contactPhoneNumber}</td>
                <td style={{borderRight: "1px solid #000"}}>{organisation.contact_email}</td>
                
                <td className="started">
                    <button className="sharebtn" onClick={() => {setClickedIndex(index); setShowContext(!showContext)}}>&#8942;</button>

                    <ul  id="mySharedown" className={(showContext && index === clickedIndex) ? 'mydropdown-menu show': 'mydropdown-menu'} onClick={(event) => event.stopPropagation()}>
                      
                                  <li onClick={() => {
                                            setOpenToggle(true)
                                            setEditID(organisation.id);
                                            setShowContext(false)
                                          }}
                                    >
                                      <div className="actionDiv">
                                        <i><MdDelete/></i> Delete
                                      </div>
                                </li>
                                <li onClick={() => {
                                        setShowContext(false)
                                        setEditID(organisation.uid);
                                        getSingleDoc(organisation.uid)
                                        handleShow();
                                      }}
                                    >
                                      <div className="actionDiv">
                                        <i><MdEdit/></i> Edit
                                      </div>
                                </li>
                                <li onClick={() => setShowContext(false)}
                                    >
                                      <div className="actionDiv">
                                        <i><AiFillCloseCircle/></i> Close
                                      </div>
                                </li>
                    </ul>
                  </td>

              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <th>Logo</th>
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

        <Pagination
          pages={totalPagesNum}
          setCurrentPage={setCurrentPage}
          currentClients={currentOrganisations}
          sortedEmployees={organisations}
          entries={"Organisations"}
        />
      </div>
    </div>
        }

      
    </div>
  );
}

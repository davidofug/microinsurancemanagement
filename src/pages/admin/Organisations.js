import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdDownload } from "react-icons/md";
import Header from "../../parts/header/Header";
import Pagination from "../../helpers/Pagination";
import SearchBar from "../../parts/searchBar/SearchBar";
import { Table } from "react-bootstrap";
import { db } from '../../helpers/firebase'
import { collection, getDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { FaEllipsisV } from "react-icons/fa";
import OrganisationModal from "../../parts/OrganisationModel";
import { Modal } from 'react-bootstrap'
import { useForm } from "../../hooks/useForm";
import { authentication } from "../../helpers/firebase";

export default function Organisations() {
  const [organisations, setOrganisations] = useState([]);
  const organisationsCollectionRef = collection(db, "organisations");

  useEffect(() => {
    document.title = "Britam - Organisations";
      getOrganisations()

  }, []);

  const getOrganisations = async () => {
    const data = await getDocs(organisationsCollectionRef)
    setOrganisations(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
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

  const indexOfLastOrganisation = currentPage * organisationsPerPage;
  const indexOfFirstOrganisation = indexOfLastOrganisation - organisationsPerPage;
  const currentOrganisations = organisations.slice(
    indexOfFirstOrganisation,
    indexOfLastOrganisation
  );
  const totalPagesNum = Math.ceil(organisations.length / organisationsPerPage);


    const handleDelete = async (id) => {
      const organisationDoc = doc(db, "organisations", id);
      console.log(organisationDoc)
      await deleteDoc(organisationDoc);
    };

    const [singleDoc, setSingleDoc] = useState(fields);

    const getSingleDoc = async (id) => {
      const docRef = doc(db, "organisations", id);
      const docSnap = await getDoc(docRef);
      setSingleDoc(docSnap.data());
    };

  const handleSearch = ({ target }) => setSearchText(target.value);
  const searchByName = (data) => data.filter(row => row.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)


  return (
    <div className="components">
      <Header title="Organisations" subtitle="VIEW COMPANY DETAILS" />

      <div id="add_client_group">
        <div></div>
        <Link to="/admin/add-organisations">
          <button className="btn btn-primary cta">Add Organisation</button>
        </Link>
      </div>

      <Modal show={show} onHide={() =>
        {
          handleClose()
          setSingleDoc(fields)
        }}>
        <OrganisationModal fields={fields} singleDoc={singleDoc} handleClose={handleClose} handleFieldChange={handleFieldChange} editID={editID} />
      </Modal>

      {organisations.length <= 0 
      ?
        <p>No organisations yet</p>
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
            {searchByName(organisations).map((organisation, index) => (
              <tr key={organisation.id}>
                <td>{organisation.logo}</td>
                <td>{organisation.name}</td>
                <td>{organisation.org_email}</td>
                <td>{organisation.tel}</td>
                <td style={{borderLeft: "1px solid #000"}}>{organisation.contactName}</td>
                <td>{organisation.role}</td>
                <td>{organisation.contactPhoneNumber}</td>
                <td style={{borderRight: "1px solid #000"}}>{organisation.contact_email}</td>
                <td style={{borderRight: "1px solid #000"}}className="started">
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
                              `Are you sure you want to delete ${organisation.name}`);
                            if (confirmBox === true) {
                              handleDelete(organisation.id);
                              getOrganisations()
                            }
                          }}
                        >
                          Delete
                        </button>
                      </li>
                      <li>
                        <button
                        onClick={() => {
                          setEditID(organisation.id)
                          getSingleDoc(organisation.id);
                          handleShow();
                          document
                            .querySelector(`.please${index}`)
                            .classList.remove("hello");
                        }}>
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

import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdDownload } from "react-icons/md";
import data from "../../helpers/mock-data.json";
import Header from "../../parts/header/Header";
import Datatable from "../../helpers/DataTable";
import Pagination from "../../helpers/Pagination";
import SearchBar from "../../parts/searchBar/SearchBar";
import { Table } from "react-bootstrap";
import { db } from '../../helpers/firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'

export default function Organisations() {
  const [organisations, setOrganisations] = useState([]);
  const organisationsCollectionRef = collection(db, "organisations");

  useEffect(() => {
    document.title = "Britam - Organisations";

    // const getOrganisations = async () => {
    //   organisationsCollectionRef.onSnapshot((querySnapshot) => {
    //     const items = [];
    //     querySnapshot.forEach((doc) => {
    //       items.push({ ...doc.data(), id: doc.id });
    //     });
    //     setOrganisations(items);
    //   });
    // };

    const getOrganisations = async () => {
        const data = await getDocs(organisationsCollectionRef)
        setOrganisations(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }

      getOrganisations()

  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentOrganisations = data.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalPagesNum = Math.ceil(data.length / employeesPerPage);

  const [q, setQ] = useState("");

  const columnHeading = [
    "Logo",
    "Name",
    "Email",
    "Phone No.",
    "Contact Name",
    "Role",
    "Contact's No.",
    "Contact Email",
  ];
  const columns = [
    "id",
    "name",
    "email",
    "contact",
    "agentName",
    "role",
    "contact",
    "email",
  ];
  const search = (rows) =>
    rows.filter((row) =>
      columns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );

  const handleSearch = ({ target }) => setQ(target.value);

  return (
    <div className="components">
      <Header title="Organisations" subtitle="MANAGE ORGANISATIONS" />

      <div id="add_client_group">
        <div></div>
        <Link to="/admin/add-organisations">
          <button className="btn btn-primary cta">Add Organisation</button>
        </Link>
      </div>

      <div className="componentsData">
        <div className="table-card">
          <div id="search">
            <SearchBar
              placeholder={"Search for organisation"}
              value={q}
              handleSearch={handleSearch}
            />
            <div></div>
            <CSVLink
              data={data}
              filename={"Britam-Organisations.csv"}
              className="btn btn-primary cta"
            >
              {" "}
              Export <MdDownload />
            </CSVLink>
          </div>
          {/* <Datatable data={search(currentOrganisations)} columnHeading={columnHeading} columns={columns}/> */}

          <Table
            bordered
            hover
            striped
            responsive
            cellPadding={0}
            cellSpacing={0}
          >
            <thead>
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone No.</th>
                <th>Contact Name</th>
                <th>Role</th>
                <th>Contact's No</th>
                <th>Contact Email</th>
              </tr>
            </thead>

            <tbody>
              {organisations.map((organisation) => (
                <tr key={organisation.id}>
                  <td>{organisation.logo}</td>
                  <td>{organisation.name}</td>
                  <td>{organisation.org_email}</td>
                  <td>{organisation.tel}</td>
                  <td>{organisation.ContactName}</td>
                  <td>{organisation.role}</td>
                  <td>{organisation.contactPhoneNumber}</td>
                  <td>{organisation.contact_email}</td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone No.</th>
                <th>Contact Name</th>
                <th>Role</th>
                <th>Contact's No</th>
                <th>Contact Email</th>
              </tr>
            </tfoot>
          </Table>

          <Pagination
            pages={totalPagesNum}
            setCurrentPage={setCurrentPage}
            currentClients={currentOrganisations}
            sortedEmployees={data}
            entries={"Organisations"}
          />
        </div>
      </div>
    </div>
  );
}

import { CSVLink } from 'react-csv'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MdDownload } from 'react-icons/md'
import Header from '../parts/header/Header';
import data from '../helpers/mock-data.json'
import Pagination from '../helpers/Pagination';
import SearchBar from '../parts/searchBar/SearchBar';
import { Table } from 'react-bootstrap';
import { FaEllipsisV } from "react-icons/fa";
import { functions, db } from '../helpers/firebase';
import { httpsCallable } from 'firebase/functions';
import useAuth from '../contexts/Auth';
import { getDocs, collection } from 'firebase/firestore'

export default function Clients() {

  useEffect(() => 
    {
      document.title = 'Britam - Clients'

      const listUsers = httpsCallable(functions, 'listUsers')
      listUsers().then((results) => {
          const resultsArray = results.data
          const myUsers = resultsArray.filter(user => user.role.Customer === true)
          setClients(myUsers)
      }).catch((err) => {
          console.log(err)
      })

      getUsersMeta()
  }, [])

  const { authClaims } = useAuth()
  const [clients, setClients] = useState([]);
  const [q, setQ] = useState('');
  const [meta, setMeta] = useState([])
  const metaCollectionRef = collection(db, "usermeta");

  const getUsersMeta = async () => {
    const data = await getDocs(metaCollectionRef);
    setMeta(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const [ currentPage, setCurrentPage ] = useState(1)
  const [clientsPerPage] = useState(10)

  const indexOfLastClient = currentPage * clientsPerPage
  const indexOfFirstClient = indexOfLastClient - clientsPerPage
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient)
  const totalPagesNum = Math.ceil(clients.length / clientsPerPage)


  const columns = ["id", "name", "gender", "email", "contact", "address"]

  const search = rows => rows.filter(row => columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

  const handleSearch = ({target}) => setQ(target.value)

    return (
        <div className='components'>
            <Header title="Clients" subtitle="MANAGING CLIENTS" />
   
            <div id="add_client_group">
                <div></div>
                {authClaims.supervisor && 
                  <Link to="/supervisor/add-user">
                      <button className='btn btn-primary cta'>Add Client</button>
                  </Link>
                }
                {authClaims.agent && 
                  <Link to="/agent/add-user">
                      <button className='btn btn-primary cta'>Add Client</button>
                  </Link>
                }
            </div>

            <div className="componentsData">
              <div className="shadow-sm table-card">
                  <div id="search">
                    <SearchBar placeholder={"Search for client"} value={q} handleSearch={handleSearch}/>
                    <div></div>
                    <CSVLink data={data} filename={"Britam-Clients.csv"} className="btn btn-primary cta">
                      Export <MdDownload />
                    </CSVLink>
                  </div>


                  <Table hover striped responsive className='mt-5'>
                        <thead>
                            <tr><th>#</th><th>Name</th><th>Email</th><th>Gender</th><th>Contact</th><th>Address</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                          {clients.map((client, index) => (
                              <tr key={client.uid}>
                              <td>{1}</td>
                              <td>{client.name}</td>
                              <td>{client.email}</td>
                              {meta.filter(user => user.id == client.uid).map(user => (
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
                    currentClients={currentClients}
                    sortedEmployees={clients}
                    entries={'Clients'} />
              </div>
            </div>
        </div>
    )
}

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import data from '../helpers/mock-data.json'
import { EditableDatable } from '../helpers/DataTable';
import { MdDownload } from 'react-icons/md'
import Pagination from '../helpers/Pagination';
import SearchBar from '../parts/searchBar/SearchBar'
import Header from '../parts/header/Header';
import { functions, db } from '../helpers/firebase';
import { httpsCallable } from 'firebase/functions';
import { Table } from 'react-bootstrap'
import { FaEllipsisV } from "react-icons/fa";
import { getDocs, collection } from 'firebase/firestore'

function Agents() {

    useEffect(() => {
      document.title = 'Britam - Agents'

      const listUsers = httpsCallable(functions, 'listUsers')
      listUsers().then((results) => {
          const resultsArray = results.data
          const myUsers = resultsArray.filter(user => user.role.agent === true)
          setAgents(myUsers)
      }).catch((err) => {
          console.log(err)
      })
      getUsersMeta()
    }, [])
    const [agents, setAgents] = useState([]);
    const [meta, setMeta] = useState([])

    const metaCollectionRef = collection(db, "usermeta");

  const [editContactId, setEditContactId] = useState(null);

  const getUsersMeta = async () => {
    const data = await getDocs(metaCollectionRef);
    setMeta(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };



  //

    //
    const [ currentPage, setCurrentPage ] = useState(1)
    const [employeesPerPage] = useState(10)

    const indexOfLastEmployee = currentPage * employeesPerPage
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
    const currentAgents = agents.slice(indexOfFirstEmployee, indexOfLastEmployee)
    const totalPagesNum = Math.ceil(agents.length / employeesPerPage)


    const handleDeleteClick = (agentId) => {
        const newAgents = [...agents];
        const index = agents.findIndex((agent) => agent.id === agentId);
        newAgents.splice(index, 1);
        console.log(newAgents)
        setAgents(newAgents);
      };
  
      const handleCancelClick = () => {
        setEditContactId(null);
      };

    const [q, setQ] = useState('');

    const columnHeading = ["#", "License No.", "National ID", "Name", "Gender", "Phone No.", "Email", "CreatedAt", "Action"]
    const columns = ["id", "contact", "contact", "name", "gender", "contact", "email", "createdAt"]
    const search = rows => rows.filter(row =>
        columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

        const handleSearch = ({target}) => setQ(target.value)

    return (
        <div className='components'>
            <Header title="Agents" subtitle="MANAGING AGENTS" />
   
            <div id="add_client_group">
                <div></div>
                <Link to="/add-user">
                    <button className="btn btn-primary cta">Add Agent</button>
                </Link>
            </div>

            <div className="shadow-sm table-card componentsData">   
                <div id="search">
                <SearchBar placeholder={"Search for agent"} value={q} handleSearch={handleSearch}/>
                    <div></div>
                    <button className='btn btn-primary cta mb-3'>Export <MdDownload /></button>
                </div>

                  <Table hover striped responsive>
                        <thead>
                            <tr><th>#</th><th>Name</th><th>Email</th><th>Gender</th><th>Contact</th><th>Address</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                          {agents.map((agent, index) => (
                              <tr key={agent.uid}>
                              <td>{index + 1}</td>
                              <td>{agent.name}</td>
                              <td>{agent.email}</td>
                              {meta.filter(user => user.id == agent.uid).map(user => (
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
                    currentClients={currentAgents}
                    sortedEmployees={agents}
                    entries={'Agents'} />

               
            </div>
        </div>
    )
}

export default Agents

import { Link } from 'react-router-dom'
import { useEffect, useState, Fragment } from 'react'
import data from '../helpers/mock-data.json'
import { EditableDatable } from '../helpers/DataTable';
import { MdDownload } from 'react-icons/md'
import Pagination from '../helpers/Pagination';
import SearchBar from '../components/searchBar/SearchBar'
import Header from '../components/header/Header';
import { functions, db } from '../helpers/firebase';
import { httpsCallable } from 'firebase/functions';
import { Table } from 'react-bootstrap'
import { FaEllipsisV } from "react-icons/fa";
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore'
import useAuth from '../contexts/Auth';
import { MdEdit, MdDelete } from 'react-icons/md'
import { AiFillCloseCircle } from 'react-icons/ai'
import Loader from '../components/Loader';

function Agents() {

    useEffect(() => {
      document.title = 'Britam - Agents'

      getAgents()
      getUsersMeta()
    }, [])
    const [agents, setAgents] = useState([]);
    const [meta, setMeta] = useState([])
    const metaCollectionRef = collection(db, "usermeta");

  const [editContactId, setEditContactId] = useState(null);
  const { authClaims } = useAuth()

  const getAgents = () => {
    const listUsers = httpsCallable(functions, 'listUsers')
      listUsers().then((results) => {
          const resultsArray = results.data
          const myUsers = resultsArray.filter(user => user.role.agent === true)
          setAgents(myUsers)
      }).catch((err) => {
          console.log(err)
      })
  }

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

    const handleDelete = async (id) => {
      const deleteUser = httpsCallable(functions, 'deleteUser')
      deleteUser({uid:id}).then().catch(err => {
        console.log(err)
      })
  
      const userMetaDoc = doc(db, "usermeta", id);
      await deleteDoc(userMetaDoc);

      getAgents()
      getUsersMeta()
    };

    const [q, setQ] = useState('');

    const columns = ["id", "contact", "contact", "name", "gender", "contact", "email", "createdAt"]
    const search = rows => rows.filter(row =>
        columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

        const handleSearch = ({target}) => setQ(target.value)

    
    // actions context
    const [showContext, setShowContext] = useState(false)
    window.onclick = function(event) {
        if (!event.target.matches('.sharebtn')) {
            setShowContext(false)
        }
    }

    const [clickedIndex, setClickedIndex] = useState(null)

    return (
        <div className='components'>
            <Header title="Agents" subtitle="MANAGING AGENTS" />
   
            <div id="add_client_group">
                <div></div>
                {authClaims.supervisor && 
                  <Link to="/supervisor/add-user">
                      <button className="btn btn-primary cta">Add Agent</button>
                  </Link>
                }
                {authClaims.admin && 
                  <Link to="/admin/add-user">
                      <button className="btn btn-primary cta">Add Agent</button>
                  </Link>
                }
            </div>

            {agents !== null && agents.length > 0
            ?
              <>
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
                                <Fragment key={user.id}>
                                  <td>{user.gender}</td>
                                  <td>{user.phone}</td>
                                  <td>{user.address}</td>
                                </Fragment>
                              ))}
                              
                              <td className="started">
                                <button className="sharebtn" onClick={() => {setClickedIndex(index); setShowContext(!showContext)}}>&#8942;</button>

                                <ul  id="mySharedown" className={(showContext && index === clickedIndex) ? 'mydropdown-menu show': 'mydropdown-menu'} onClick={(event) => event.stopPropagation()}>
                                            <li onClick={() => {
                                                        setShowContext(false)
                                                        const confirmBox = window.confirm(
                                                          `Are you sure you want to ${agent.name}`
                                                        );
                                                        if (confirmBox === true) {
                                                          handleDelete(agent.uid)
                                                        }
                                                      }}
                                                >
                                                  <div className="actionDiv">
                                                    <i><MdDelete/></i> Delete
                                                  </div>
                                            </li>
                                            <li onClick={() => {
                                                    setShowContext(false)
                                                    // setEditID(agent.uid);
                                                    // getSingleClient(agent.uid)
                                                    // handleShow(); 
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
              </>
            :
              <Loader />
            }

              
        </div>
    )
}

export default Agents

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MdDownload } from 'react-icons/md'
import Pagination from '../helpers/Pagination';
import SearchBar from '../components/searchBar/SearchBar'
import Header from '../components/header/Header';
import { functions, authentication } from '../helpers/firebase';
import { httpsCallable } from 'firebase/functions';
import { Table } from 'react-bootstrap'
import useAuth from '../contexts/Auth';
import { MdEdit, MdDelete } from 'react-icons/md'
import { AiFillCloseCircle } from 'react-icons/ai'
import Loader from '../components/Loader';

function Agents() {

  useEffect(() => {document.title = 'Britam - Agents';getAgents()}, [])
  
  const { authClaims } = useAuth()
  
  // get agents
  const [agents, setAgents] = useState([]);
  const getAgents = () => {
    const listUsers = httpsCallable(functions, 'listUsers')
    if(authClaims.supervisor){
      listUsers().then(({data}) => {
          const myAgents = data.filter(user => user.role.agent === true).filter(agent => agent.meta.added_by_uid === authentication.currentUser.uid)
          setAgents(myAgents)
      }).catch()
    } else{
      listUsers().then(({data}) => {
        const myAgents = data.filter(user => user.role.agent === true)
        setAgents(myAgents)
    }).catch()
    }
  }

  // search for agent
  const [searchText, setSearchText] = useState('')
  const handleSearch = ({ target: {value} }) => setSearchText(value);
  const searchByName = (data) => data.filter(row => row.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)



    // Pagination
    const [ currentPage, setCurrentPage ] = useState(1)
    const [clientsPerPage] = useState(10)
    const indexOfLastAgent = currentPage * clientsPerPage
    const indexOfFirstClient = indexOfLastAgent - clientsPerPage
    const currentAgents = !agents || searchByName(agents).slice(indexOfFirstClient, indexOfLastAgent)
    const totalPagesNum = !agents || Math.ceil(agents.length / clientsPerPage)

    // delete agent
    const handleDelete = async (id) => {
      const deleteUser = httpsCallable(functions, 'deleteUser')
      deleteUser({uid:id}).then().catch(err => {
        console.log(err)
      })
      getAgents()
    };

    
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
                <SearchBar placeholder={"Search for agent"} value={searchText} handleSearch={handleSearch}/>
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
                              <td>{agent.meta.gender}</td>
                              <td>{agent.meta.phone}</td>
                              <td>{agent.meta.address}</td>
                              
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

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MdDownload } from 'react-icons/md'
import Pagination from '../../helpers/Pagination';
import SearchBar from '../../components/searchBar/SearchBar';
import Header from '../../components/header/Header';
import { functions, db } from '../../helpers/firebase';
import { httpsCallable } from 'firebase/functions';
import { Table } from 'react-bootstrap'
import { MdDelete, MdEdit } from 'react-icons/md'

function Admins() {

  useEffect(() => {document.title = 'Britam - Admins'; getAdmins()}, [])
  
  // get Admins
  const [admins, setAdmins] = useState([]);
  const getAdmins = () => {
    const listUsers = httpsCallable(functions, 'listUsers')
    listUsers().then(({data}) => {
        setAdmins(data.filter(user => user.role.admin === true))
    }).catch()
  }


    // Pagination
    const [ currentPage, setCurrentPage ] = useState(1)
    const [adminsPerPage] = useState(10)

    const indexOfLastAdmin = currentPage * adminsPerPage
    const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage
    const currentAdmins = admins.slice(indexOfFirstAdmin, indexOfLastAdmin)
    const totalPagesNum = Math.ceil(admins.length / adminsPerPage)

    const handleDelete = (id) => {
      const deleteUser = httpsCallable(functions, 'deleteUser')
      deleteUser({uid:id}).then((result) => {
        console.log(result)
      }
      ).catch(err => {
        console.log(err)
      })
      getAdmins()
    };

  // actions context
  const [show, setShow] = useState(false)
  window.onclick = function(event) {
      if (!event.target.matches('.sharebtn')) {
          setShow(false)
      }
  }
  const [clickedIndex, setClickedIndex] = useState(null)

    return (
        <div className='components'>
          <Header title="Admins" subtitle="MANAGING ADMINS" />

            <div id="add_client_group">
                <div></div>
                <Link to="/superadmin/add-user">
                    <button className="btn btn-primary cta">Add admin</button>
                </Link>
                
            </div>

            <div className="shadow-sm table-card componentsData">   
                <div id="search">
                            <SearchBar placeholder={"Search for Admins"}/>
                            <div></div>
                            <button className='btn btn-primary cta mb-3'>Export <MdDownload /></button>
                      </div>

                <Table hover striped responsive>
                        <thead>
                            <tr><th>#</th><th>Name</th><th>Email</th><th>Gender</th><th>Contact</th><th>Address</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                          {admins.map((admin, index) => (
                              <tr key={admin.uid}>
                              <td>{index+1}</td>
                              <td>{admin.name}</td>
                              <td>{admin.email}</td>
                
                            <td className="started">
                            <button className="sharebtn" onClick={() => {setClickedIndex(index); setShow(!show)}}>&#8942;</button>

                            <ul  id="mySharedown" className={(show && index === clickedIndex) ? 'mydropdown-menu show': 'mydropdown-menu'} onClick={(event) => event.stopPropagation()}>
                              <li onClick={() => { setShow(false)
                                      
                                    }}
                                  >
                                    <div className="actionDiv">
                                      <i><MdEdit /></i> Edit
                                    </div>
                              </li>
                              <li onClick={() => { setShow(false)
                                      const confirmBox = window.confirm(
                                        `Are you sure you want to delete ${admin.name}`
                                      );
                                      if (confirmBox === true) {
                                        handleDelete(admin.uid);
                                      }
                                    }}
                                  >
                                    <div className="actionDiv">
                                      <i><MdDelete /></i> Delete
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
                    currentClients={currentAdmins}
                    sortedEmployees={admins}
                    entries={'Admins'} />

               
            </div>
        </div>
    )
}

export default Admins

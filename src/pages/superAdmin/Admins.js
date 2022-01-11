import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MdDownload } from 'react-icons/md'
import Pagination from '../../helpers/Pagination';
import SearchBar from '../../parts/searchBar/SearchBar';
import Header from '../../parts/header/Header';
import { functions, db } from '../../helpers/firebase';
import { httpsCallable } from 'firebase/functions';
import { FaEllipsisV } from "react-icons/fa";
import { Table } from 'react-bootstrap'
import useAuth from '../../contexts/Auth';
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore'

function Admins() {

    useEffect(() => {
      document.title = 'Britam - Admins'

      getAdmins()
      getUsersMeta()

    }, [])

    const [admins, setAdmins] = useState([]);
    const [meta, setMeta] = useState([])
    const metaCollectionRef = collection(db, "usermeta");
  

    const getAdmins = () => {
      const listUsers = httpsCallable(functions, 'listUsers')
      listUsers().then((results) => {
          const resultsArray = results.data
          const myUsers = resultsArray.filter(user => user.role.admin === true)
          setAdmins(myUsers)
      }).catch((err) => {
          console.log(err)
      })
  }

  const getUsersMeta = async () => {
    const data = await getDocs(metaCollectionRef);
    setMeta(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const [editContactId, setEditContactId] = useState(null);

    //
    const [ currentPage, setCurrentPage ] = useState(1)
    const [adminsPerPage] = useState(10)

    const indexOfLastAdmin = currentPage * adminsPerPage
    const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage
    const currentAdmins = admins.slice(indexOfFirstAdmin, indexOfLastAdmin)
    const totalPagesNum = Math.ceil(admins.length / adminsPerPage)

    const handleDelete = (id) => {
      const deleteUser = httpsCallable(functions, 'deleteUser')
      const userMetaDoc = doc(db, "usermeta", id);
      deleteUser({uid:id}).then((result) => {
        console.log(result)
        if(result.data !== null) {
          deleteDoc(userMetaDoc)
        }
      }
      ).catch(err => {
        console.log(err)
      })
      

      getAdmins()
      getUsersMeta()
    };


    const [q, setQ] = useState('');

    const columns = ["id", "contact", "name", "gender", "email", "contact", "contact", "email", 'address']
    const search = rows => rows.filter(row =>
        columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

        const handleSearch = ({target}) => setQ(target.value)

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
                            <SearchBar placeholder={"Search for Supervisor"} value={q} handleSearch={handleSearch}/>
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
                              {meta.filter(user => user.id == admin.uid).map(user => (
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
                            `Are you sure you want to ${admin.name}`
                          );
                          if (confirmBox === true) {
                            handleDelete(admin.uid)
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
                    currentClients={currentAdmins}
                    sortedEmployees={admins}
                    entries={'Admins'} />

               
            </div>
        </div>
    )
}

export default Admins

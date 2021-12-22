import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import data from '../helpers/mock-data.json'
import { EditableDatable } from '../helpers/DataTable';
import { MdDownload } from 'react-icons/md'
import { Form, Button } from 'react-bootstrap'
import Pagination from '../helpers/Pagination';


function Clients() {

    //
    const [ currentPage, setCurrentPage ] = useState(1)
    const [employeesPerPage] = useState(10)

    const indexOfLastEmployee = currentPage * employeesPerPage
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
    const currentClients = data.slice(indexOfFirstEmployee, indexOfLastEmployee)
    const totalPagesNum = Math.ceil(data.length / employeesPerPage)

    //

    useEffect(() => {document.title = 'Britam - Clients'}, [])


    const [clients, setClients] = useState(data);
    const [q, setQ] = useState('');
    const [edits, setEdits] = useState({name: "Charles", address: "Namuwongo", gender: "M", contact: "077123456", email: "charles@alliswell.com"})

    const handleDeleteClick = (clientId) => {
      const newClients = [...clients];
      const index = clients.findIndex((client) => client.id === clientId);
      newClients.splice(index, 1);
      setClients(newClients);
    };

    const handleEditClick = (clientId) => {
      const newClients = [...clients];
      const index = clients.findIndex(client => client.id === clientId)
      // newClients.splice(index + 1)
      newClients[index] = edits
      setClients(newClients)
    }
    
    const columns = ["name", "gender", "email", "contact", "address"]

    const search = rows => rows.filter(row =>
      columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

     

    return (
        <div className='components'>
            <header className='heading'>
                <h1 className='title'>Clients</h1>
                <p className="subtitle">MANAGING CLIENTS</p>
            </header>
            <div id="add_client_group">
                <div></div>
                <Link to="/add-clients">
                    <Button className='btn btn-primary cta'>Add Client</Button>
                </Link>
            </div>

            <div className="componentsData">
              <div className="table-card">
                  <div id="search">
                      <Form.Control type="text" className='mb-3' placeholder="Search for client"
                        value={q} onChange={({target}) => setQ(target.value)} 
                      />
                      <div></div>
                      <button className='btn btn-primary cta mb-3'>Export <MdDownload /></button>
                  </div>

                  <EditableDatable 
                    currentClients={search(currentClients)}
                    handleDeleteClick={handleDeleteClick}
                    handleEditClick={handleEditClick}
                  /> 

                <Pagination 
                  pages={totalPagesNum}
                  setCurrentPage={setCurrentPage}
                  currentClients={currentClients}
                  sortedEmployees={data}
                  entries={'Clients'} />
              </div>
            </div>
        </div>
    )
}

export default Clients

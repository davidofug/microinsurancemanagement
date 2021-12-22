import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import data from '../helpers/mock-data.json'
import { EditableDatable } from '../helpers/DataTable';
import { MdDownload } from 'react-icons/md'
import { Form } from 'react-bootstrap'

function Clients() {

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

    const search = rows => rows.filter((row) =>
        columns.some( column =>
            row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,), );
 

    return (
        <div className='components'>
            <header className='heading'>
                <h1 className='title'>Clients</h1>
                <p className="subtitle">MANAGING CLIENTS</p>
            </header>
            <div id="add_client_group">
                <div></div>
                <Link to="/add-clients">
                    <button className="btn btn-primary cta">Add Client</button>
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
                    data={search(clients)}
                    handleDeleteClick={handleDeleteClick}
                    handleEditClick={handleEditClick}
                  /> 
              </div>
            </div>
        </div>
    )
}

export default Clients

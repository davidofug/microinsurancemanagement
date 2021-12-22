import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import data from '../../helpers/mock-data.json'
import { MdDownload } from 'react-icons/md'
import Datatable from '../../helpers/DataTable';
import { Form } from 'react-bootstrap'


function Organisations() {

  useEffect(() => { document.title = 'Britam - Organisations'}, [])

  const [q, setQ] = useState('');

  const columnHeading = ["Logo", "Name", "Email", "Phone No.", "Contact Name", "Role", "Phone No.", "email"]
  const columns = ["id", "name", "email", "contact", "agentName", "agentName", "contact", "email"]
  const search = rows => rows.filter(row =>
    columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));


  return (
        <div className='components'>
            <header className='heading'>
                <h1 className='title'>Organisations</h1>
                <p className="subtitle">MANAGING ORGANISATIONS</p>
            </header>
            <div id="add_client_group">
                <div></div>
                <Link to="/admin-add-organisations">
                    <button className="btn btn-primary cta">Add</button>
                </Link>
              </div>

                <div class="componentsData">
                  <div className="table-card">
                    <div id="search">
                            <Form.Control type="text" className='mb-3' placeholder="Search for organisation"
                              value={q} onChange={({target}) => setQ(target.value)} 
                            />
                            <div></div>
                            <button className='btn btn-primary cta mb-3'>Export <MdDownload /></button>
                      </div>
                      <Datatable data={search(data)} columnHeading={columnHeading} columns={columns}/>
                    </div>
                </div>
        </div>
    )
}

export default Organisations

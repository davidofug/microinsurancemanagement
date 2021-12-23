import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import data from '../helpers/mock-data.json'
import Datatable from '../helpers/DataTable';
import { Form } from 'react-bootstrap'
import { MdDownload } from 'react-icons/md'

function Agents() {

    useEffect(() => {document.title = 'Britam - Agents'}, [])

    const [q, setQ] = useState('');

    const columnHeading = ["#", "License No.", "National ID", "Name", "Gender", "Phone No.", "Email", "CreatedAt"]
    const columns = ["id", "contact", "contact", "name", "gender", "contact", "email", "createdAt"]
    const search = rows => rows.filter(row =>
        columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

    return (
        <div className='components'>
            <header className='heading'>
                <h1 className='title'>Agents</h1>
                <p className="subtitle">MANAGING AGENTS</p>
            </header>
            <div id="add_client_group">
                <div></div>
                <Link to="/add-agent">
                    <button className="btn btn-primary cta">Add Agent</button>
                </Link>
                
            </div>

            <div className="table-card componentsData">   
                <div id="search">
                            <Form.Control type="text" className='mb-3' placeholder="Search for agent"
                              value={q} onChange={({target}) => setQ(target.value)} 
                            />
                            <div></div>
                            <button className='btn btn-primary cta mb-3'>Export <MdDownload /></button>
                      </div>

                <Datatable data={search(data)} columnHeading={columnHeading} columns={columns}/>

               
            </div>
        </div>
    )
}

export default Agents

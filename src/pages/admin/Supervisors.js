import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import data from '../../helpers/mock-data.json'
import Datatable from '../../helpers/DataTable';
import { Form } from 'react-bootstrap'
import { MdDownload } from 'react-icons/md'

function Supervisors() {

    useEffect(() => {document.title = 'Britam - Supervisors'}, [])

    const [q, setQ] = useState('');

    const columnHeading = ["#", "License No.", "Name", "Gender", "Email", "NIN", "Contact", "Role", "Branch Name"]
    const columns = ["id", "contact", "name", "gender", "email", "agentName", "contact", "email", 'address']
    const search = rows => rows.filter(row =>
        columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

    return (
        <div className='components'>
            <header className='heading'>
                <h1 className='title'>Supervisors</h1>
                <p className="subtitle">MANAGING SUPERVISORS</p>
            </header>
            <div id="add_client_group">
                <div></div>
                <Link to="/add-Supervisors">
                    <button className="btn btn-primary cta">Add supervisor</button>
                </Link>
                
            </div>

            <div className="table-card componentsData">   
                <div id="search">
                            <Form.Control type="text" className='mb-3' placeholder="Search for supervisor"
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

export default Supervisors

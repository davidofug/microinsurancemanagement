import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import data from '../helpers/mock-data.json'
import Datatable from '../helpers/DataTable';
import { Form } from 'react-bootstrap'

function Claims() {

    useEffect(() => {document.title = 'Britam - Claims'}, [])

    const [clients, setClients] = useState(data);
    const [q, setQ] = useState('');

    const columnHeading = ["Ref Number", "Claimant Details", "Date of Incident", "Number Plate", "Sticker Number", "Claim Estimate", "Status"]
    const columns = ["contact", "name", "createdAt", "contact", "contact", "amount", "status"]
    const search = rows => rows.filter(row =>
        columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));



    return (
        <div className='components'>
            <header className='heading'>
                <h1 className='title'>Claims</h1>
                <p className="subtitle">MANAGING CLAIMS</p>
            </header>
            <div id="add_client_group">
                <div></div>
                <Link to="/add-claim">
                    <button className="btn btn-primary cta">Add Claim</button>
                </Link>
                
            </div>

            <div className="table-card componentsData">   
                <div id="search">
                            <div></div>
                            <div></div>
                            <Form.Control type="text" className='mb-3' placeholder="Search for policy"
                              value={q} onChange={({target}) => setQ(target.value)} 
                            />
                      </div>

                <Datatable data={search(clients)} columnHeading={columnHeading} columns={columns}/>

               
            </div>
        </div>
    )
}

export default Claims

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import data from '../helpers/mock-data.json'
import Datatable from '../helpers/DataTable';
import { Form } from 'react-bootstrap'

function Agents() {

    useEffect(() => {document.title = 'Britam - Motor Third Party'}, [])

    const [q, setQ] = useState('');

    const columnHeading = ["Client", "Category", "Amount", "Payment Method", "Currency", "Agent", "Status", "CreatedAt"]
    const columns = ["name", "contact", "amount", "paymentMethod", "currency", "agentName", "status", "createdAt"]
    const search = rows => rows.filter(row =>
        columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

    return (
        <div className='components'>
            <header className='heading'>
                <h1 className='title'>Motor Third Party</h1>
                <p className="subtitle">MANAGING THIRD PARTY POLICIES</p>
            </header>
            <div id="add_client_group">
                <div></div>
                <Link to="/add-agent">
                    <button className="btn btn-primary cta">Add MTP</button>
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

                <Datatable data={search(data)} columnHeading={columnHeading} columns={columns}/>

               
            </div>
        </div>
    )
}

export default Agents

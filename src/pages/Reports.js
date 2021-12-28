import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import data from '../helpers/mock-data.json'
import Datatable from '../helpers/DataTable';
import { Form } from 'react-bootstrap'
import { MdDownload } from 'react-icons/md'
import { CSVLink } from "react-csv";

function Reports() {

    useEffect(() => {document.title = 'Britam - Reports'}, [])

    const [q, setQ] = useState('');

    const columnHeading = ["Policy Holder", "Reg No.", "Car Make", "Seating Capacity", "G.weight", "Sticker No.", "Category", "Cover Type", "Start Date", "End Date", "Validity", "Basic Premium", "Training Levy", "Sticker Fees", "VAT Charge", "Stamp Duty", "Gross Commission", "Issuing Branch", "Issuing Officer", "Currency"]
    const columns = ["name", "contact", "createdAt", "id", "amount", "amount", "status", "paymentMethod", "createdAt", "createdAt", "status", "amount", "amount", "amount", "amount", "amount", "name", "address", "name", "currency"]
    const search = rows => rows.filter(row =>
        columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

    return (
        <div className='components'>
            <header className='heading'>
                <h1 className='title'>Reports</h1>
                <p className="subtitle">MANAGING REPORTS</p>
            </header>
                <div id="add_client_group">
                    <div></div>
                    <Link to="/add-agent">
                        <button className="btn btn-primary cta">Add Reports</button>
                    </Link>
                </div>
                
                <div className="table-card componentsData " style={{"max-width": "80vw", "margin": "auto"}}>
                    <div id="search">
                                <Form.Control type="text" className='mb-3' placeholder="Search for report"
                                  value={q} onChange={({target}) => setQ(target.value)}
                                  />
                                  <div></div>
                                  <CSVLink
                                    data={data}
                                    filename={"Britam-Reports.csv"}
                                    className="btn btn-primary cta"
                                    target="_blank"
                                >
                                    Export <MdDownload />
                                </CSVLink>
                    
                          </div>
                    <Datatable data={search(data)} columnHeading={columnHeading} columns={columns}/>
                
                </div>
        </div>
    )
}

export default Reports

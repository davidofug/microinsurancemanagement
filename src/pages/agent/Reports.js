import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import data from '../../helpers/mock-data.json'
import Datatable from '../../helpers/DataTable';
import { MdDownload } from 'react-icons/md'
import { CSVLink } from "react-csv";
import SearchBar from '../../parts/searchBar/SearchBar';
import Header from '../../parts/header/Header';
import { Table } from 'react-bootstrap'

function Reports() {

    useEffect(() => {document.title = 'Britam - Reports'}, [])

    const [q, setQ] = useState('');

    const columnHeading = ["Policy Holder", "Reg No.", "Car Make", "Seating Capacity", "G.weight", "Sticker No.", "Category", "Cover Type", "Start Date", "End Date", "Validity", "Basic Premium", "Training Levy", "Sticker Fees", "VAT Charge", "Stamp Duty", "Gross Commission", "Total Premium", "Net Commission", "Currency"]
    const columns = ["name", "contact", "createdAt", "id", "amount", "amount", "status", "paymentMethod", "createdAt", "createdAt", "status", "amount", "amount", "amount", "amount", "amount", "name", "address", "name", "currency"]
    const search = rows => rows.filter(row =>
        columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

        const handleSearch = ({target}) => setQ(target.value)

    return (
        <div className='components'>
            <Header title="Reports" subtitle="AGENT ISSUED STICKER REPORTS" />

                
                <div className="componentsData " style={{"maxWidth": "80vw"}}>
                    <div className="table-card">
                        <div id="search">
                                    <SearchBar placeholder={"Search for organisation"} value={q} handleSearch={handleSearch}/>
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
                        {/* <Datatable data={search(data)} columnHeading={columnHeading} columns={columns}/> */}

                        <Table responsive hover striped bordered>
                            <thead>
                                <tr><th>Policy Holder</th><th>Reg No.</th><th>Car Make</th><th>Seating Capacity</th><th>G. Weight</th><th>Sticker No.</th><th>Category</th><th>Type of Cover</th><th>Start Date</th><th>End Date</th><th>Validity</th><th>Basic Premium</th><th>Training Levy</th><th>Sticker Fees</th><th>VAT charge</th><th>Stamp Duty</th><th>Gross Commission</th><th>Total Premuim</th><th>Net Commission</th><th>Currency</th></tr>
                            </thead>
                            <tbody>

                            </tbody>

                            <tfoot>
                                <tr><th>Policy Holder</th><th>Reg No.</th><th>Car Make</th><th>Seating Capacity</th><th>G. Weight</th><th>Sticker No.</th><th>Category</th><th>Type of Cover</th><th>Start Date</th><th>End Date</th><th>Validity</th><th>Basic Premium</th><th>Training Levy</th><th>Sticker Fees</th><th>VAT charge</th><th>Stamp Duty</th><th>Gross Commission</th><th>Total Premuim</th><th>Net Commission</th><th>Currency</th></tr>
                            </tfoot>
                        </Table>

                    </div>
                
                </div>
        </div>
    )
}

export default Reports

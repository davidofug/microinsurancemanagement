import { useEffect } from 'react'
import generatedData from '../helpers/generatedClients';
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

function Comprehensive() {

    useEffect(() => {
        document.title = 'Britam - Comprehensive'
    }, [])

    return (
        <div className='components'>
            <div className='heading'>
                <h1 className='title'>Comprehensive Policy</h1>
                <p className="subtitle">COMPREHENSIVE POLICIES</p>
            </div>
            <div id="add_client_group">
                <div></div>
                <Link to="admin-policies"><button className="btn btn-primary cta">Add</button></Link>
            </div>

            <div className="table-card">   
                <div id="search">
                <input type="text" placeholder='filter by Dates..' id='searchInput' />
                    <input type="text" placeholder='Search' id='searchInput' />
                </div>

                <Table striped responsive bordered hover style={{border: "1px solid black"}}>
                    <thead>
                        <tr><th>Client Name</th><th>Category</th><th>Amount</th><th>Payment Method</th><th>Currency</th><th>Agent</th><th>Status</th><th>CreatedAt</th><th></th></tr>
                    </thead>

                    <tbody>
                        
                            
                                {generatedData[0].map((generatedClient, index) => (
                                    <tr>
                                        <td>{generatedClient.refNumber}</td>
                                        <td>{generatedClient.email}</td>
                                        <td>{generatedClient.date}</td>
                                        <td>{generatedClient.plateNumber}</td>
                                        <td>{generatedClient.stickerNumber}</td>
                                        <td>{generatedClient.estimate}</td>
                                        <td>{generatedClient.status}</td>
                                        <td>13/09/2000</td>
                                        <td><div id="action"><div></div><div></div><div></div></div></td>
                                    </tr>
                                ))}
                    </tbody>

                    <tfoot>
                    <tr><th>Notification Ref No.</th><th>Claimant Details</th><th>Date of Incident</th><th>Number Plate</th><th>Sticker No.</th><th>Claim Estimate</th><th>Status</th>CreatedAt<th><th></th></th></tr>
                    </tfoot>
                </Table>
            </div>
        </div>
    )
}

export default Comprehensive

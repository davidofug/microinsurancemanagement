import generatedData from '../helpers/generatedClients';
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Mtp() {

    useEffect(() => {
        document.title = 'Britam - Motor Third Party'
    }, [])

    return (
        <div className='components'>
            <div>
                <h1 className='title'>MTP Policy</h1>
                <p className="subtitle">MANAGING MOTOR THIRD PARTY POLICIES</p>
            </div>
            <div id="add_client_group">
                <div></div>
                <Link to="/admin-policies"><button className="btn btn-primary cta">Add MTP</button></Link>
            </div>

            <div className="table-card">   
                <div id="search">
                    <div></div>
                    <input type="text" placeholder='Search for client...' id='searchInput' />
                </div>

                <table class="table table-striped" style={{border: "1px solid black"}}>
                    <thead>
                        <tr><th>Client</th><th>Category</th><th>Amount</th><th>Payment Method</th><th>Currency</th><th>Agent</th><th>Status</th><th>Created At</th></tr>
                    </thead>

                    <tbody>
                        
                            
                                {generatedData[1].map((generatedClient, index) => (
                                    <tr key={index}>
                                        <td>{generatedClient.name}</td>
                                        <td>{generatedClient.category}</td>
                                        <td>{generatedClient.amount}</td>
                                        <td>{generatedClient.paymentMethod}</td>
                                        <td>{generatedClient.currency}</td>
                                        <td>{generatedClient.agentName}</td>
                                        <td>{generatedClient.status}</td>
                                        <td>{generatedClient.createdAt}</td>
                                        <td><div id="action"><div></div><div></div><div></div></div></td>
                                    </tr>
                                ))}
                    </tbody>

                    <tfoot>
                    <tr><th>Client</th><th>Category</th><th>Amount</th><th>Payment Method</th><th>Currency</th><th>Agent</th><th>Status</th><th>Created At</th></tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Mtp

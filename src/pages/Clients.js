import generatedData from '../helpers/generatedClients';
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

function Clients() {

    useEffect(() => {
        document.title = 'Britam - Clients'
    }, [])

    return (
        <div className='components'>
            <div className='heading'>
                <h1 className='title'>Clients</h1>
                <p className="subtitle">MANAGING CLIENTS</p>
            </div>
            <div id="add_client_group">
                <div></div>
                <Link to="/add-clients">
                    <button className="btn btn-primary cta">Add Client</button>
                </Link>
                
            </div>

            <div className="table-card">   
                <div id="search">
                    <input type="text" placeholder='Search for client...' id='searchInput' />
                    <button className='btn btn-primary cta'>Search</button>
                    <button className='btn btn-primary cta'>Export </button>
                </div>

                <table class="table table-striped" style={{border: "1px solid black"}}>
                    <thead>
                        <tr><th>#</th><th>Name</th><th>Gender</th><th>Email</th><th>Contact</th><th>Address</th></tr>
                    </thead>

                    <tbody>
                        
                            
                                {generatedData[1].map((generatedClient, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{generatedClient.name}</td>
                                        <td>{generatedClient.gender}</td>
                                        <td>{generatedClient.email}</td>
                                        <td>{generatedClient.contact}</td>
                                        <td>{generatedClient.address}</td>
                                        <td className='working-here'>
                                                <ul id="action_context">
                                                    <li><button onClick={() => {
                                                        console.log(`user ${index} successfully edited`)
                                                    }}>edit</button></li>
                                                    <li><button onClick={() => {
                                                        console.log(`user ${index} successfully deleted`)
                                                    }}>Delete</button></li>
                                                </ul>
                                            <div id="action" onClick={() => {
                                            console.log(`clicked the three dots on ${index}`)
                                        }}><div></div><div></div><div></div></div></td>
                                    </tr>
                                ))}
                    </tbody>

                    <tfoot>
                        <tr><th>#</th><th>Name</th><th>Gender</th><th>Email</th><th>Contact</th><th>Address</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Clients

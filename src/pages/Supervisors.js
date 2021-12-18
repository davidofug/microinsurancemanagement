import generatedData from '../helpers/generatedClients';
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

function Supervisors() {

    useEffect(() => {
        document.title = 'Britam - Supervisors'
    }, [])

    return (
        <div className='components'>
            <div className='heading'>
                <h1 className='title'>Supervisors</h1>
                <p className="subtitle">MANAGING SUPERVISORS</p>
            </div>
            <div id="add_client_group">
                <div></div>
                <Link to="/add-Supervisors">
                    <button className="btn btn-primary cta">Add supervisor</button>
                </Link>
                
            </div>

            <div className="table-card">   
                <div id="search">
                    <input type="text" placeholder='Search for supervisor...' id='searchInput' />
                    <button className='btn btn-primary cta'>Search</button>
                    <button className='btn btn-primary cta'>Export </button>
                </div>

                <table class="table table-striped" style={{border: "1px solid black"}}>
                    <thead>
                        <tr><th>#</th><th>License No.</th><th>Name</th><th>Gender</th><th>Email</th><th>NIN</th><th>Contact</th><th>Role</th><th>Branch Name</th></tr>
                    </thead>

                    <tbody>
                        
                            
                                {generatedData[1].map((generatedClient, index) => (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>2093</td>
                                        <td>{generatedClient.name}</td>
                                        <td>{generatedClient.gender}</td>
                                        <td>{generatedClient.email}</td>
                                        <td>CM9999999999FE</td>
                                        <td>{generatedClient.contact}</td>
                                        <td>MTP</td>
                                        <td>Kampala</td>
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

export default Supervisors

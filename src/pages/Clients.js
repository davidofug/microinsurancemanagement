import FileDownloadIcon from '@mui/icons-material/FileDownload';
import generatedData from '../helpers/generatedClients';

function Clients() {
    return (
        <div className='components'>
            <div>
                <h1 className='title'>Clients</h1>
                <p className="subtitle">MANAGING CLIENTS</p>
            </div>
            <div id="add_client_group">
                <div></div>
                <button className="btn btn-primary cta">Add Client</button>
            </div>

            <div className="table-card">   
                <div id="search">
                    <input type="text" placeholder='Search for client...' id='searchInput' />
                    <button className='btn btn-primary cta'>Search</button>
                    <button className='btn btn-primary cta'>Export <FileDownloadIcon /></button>
                </div>

                <table class="table table-striped" style={{border: "1px solid black"}}>
                    <thead>
                        <tr><th>#</th><th>Name</th><th>Gender</th><th>Email</th><th>Contact</th><th>Address</th></tr>
                    </thead>

                    <tbody>
                        
                            
                                {generatedData[1].map((generatedClient, index) => (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{generatedClient.name}</td>
                                        <td>{generatedClient.gender}</td>
                                        <td>{generatedClient.email}</td>
                                        <td>{generatedClient.contact}</td>
                                        <td>{generatedClient.address}</td>
                                        <td><div id="action"><div></div><div></div><div></div></div></td>
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

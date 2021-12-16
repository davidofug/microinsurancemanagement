import FileDownloadIcon from '@mui/icons-material/FileDownload';

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
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                        <td>David Anyuru</td>
                        <td>M</td>
                        <td>davidderrick@gmail.com</td>
                        <td>077123456</td>
                        <td>Busenga</td>
                        <td><div id="action"><div></div><div></div><div></div></div></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>David Anyuru</td>
                        <td>M</td>
                        <td>davidderrick@gmail.com</td>
                        <td>077123456</td>
                        <td>Busenga</td>
                        <td><div id="action"><div></div><div></div><div></div></div></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>David Anyuru</td>
                        <td>M</td>
                        <td>davidderrick@gmail.com</td>
                        <td>077123456</td>
                        <td>Busenga</td>
                        <td><div id="action"><div></div><div></div><div></div></div></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>David Anyuru</td>
                        <td>M</td>
                        <td>davidderrick@gmail.com</td>
                        <td>077123456</td>
                        <td>Busenga</td>
                        <td><div id="action"><div></div><div></div><div></div></div></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>David Anyuru</td>
                        <td>M</td>
                        <td>davidderrick@gmail.com</td>
                        <td>077123456</td>
                        <td>Busenga</td>
                        <td><div id="action"><div></div><div></div><div></div></div></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>David Anyuru</td>
                        <td>M</td>
                        <td>davidderrick@gmail.com</td>
                        <td>077123456</td>
                        <td>Busenga</td>
                        <td><div id="action"><div></div><div></div><div></div></div></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>David Anyuru</td>
                        <td>M</td>
                        <td>davidderrick@gmail.com</td>
                        <td>077123456</td>
                        <td>Busenga</td>
                        <td><div id="action"><div></div><div></div><div></div></div></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>David Anyuru</td>
                        <td>M</td>
                        <td>davidderrick@gmail.com</td>
                        <td>077123456</td>
                        <td>Busenga</td>
                        <td><div id="action"><div></div><div></div><div></div></div></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>David Anyuru</td>
                        <td>M</td>
                        <td>davidderrick@gmail.com</td>
                        <td>077123456</td>
                        <td>Busenga</td>
                        <td><div id="action"><div></div><div></div><div></div></div></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>David Anyuru</td>
                        <td>M</td>
                        <td>davidderrick@gmail.com</td>
                        <td>077123456</td>
                        <td>Busenga</td>
                        <td><div id="action"><div></div><div></div><div></div></div></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>David Anyuru</td>
                        <td>M</td>
                        <td>davidderrick@gmail.com</td>
                        <td>077123456</td>
                        <td>Busenga</td>
                        <td><div id="action"><div></div><div></div><div></div></div></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>David Anyuru</td>
                        <td>M</td>
                        <td>davidderrick@gmail.com</td>
                        <td>077123456</td>
                        <td>Busenga</td>
                        <td><div id="action"><div></div><div></div><div></div></div></td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th></th>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Clients

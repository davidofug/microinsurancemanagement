import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Organisations() {

    useEffect(() => {
        document.title = 'Britam - Organisations'
    }, [])

    return (
        <div className='components'>
            <div className='heading'>
                <h1 className='title'>Organisations</h1>
                <p className="subtitle">Manage Organsations</p>
            </div>

            <div id="add_client_group">
                <div></div>
                <Link to="/add-clients">
                    <button className="btn btn-primary cta">Add Organisations</button>
                </Link>
                
            </div>

            <div class="componentsData">
                <div className="table-card">
                    <div id="search">
                        <input type="text" placeholder='Search for client...' id='searchInput' />
                        <button className='btn btn-primary'>Search</button>
                        <button className='btn btn-primary'>Export</button>
                    </div>
                    <div className="table-responsive">
                        <table class="table table-striped" style={{border: "1px solid black"}}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Address</th>
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
                            </tr>
                            <tr>
                                <td></td>
                                <td>David Anyuru</td>
                                <td>M</td>
                                <td>davidderrick@gmail.com</td>
                                <td>077123456</td>
                                <td>Busenga</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>David Anyuru</td>
                                <td>M</td>
                                <td>davidderrick@gmail.com</td>
                                <td>077123456</td>
                                <td>Busenga</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>David Anyuru</td>
                                <td>M</td>
                                <td>davidderrick@gmail.com</td>
                                <td>077123456</td>
                                <td>Busenga</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>David Anyuru</td>
                                <td>M</td>
                                <td>davidderrick@gmail.com</td>
                                <td>077123456</td>
                                <td>Busenga</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>David Anyuru</td>
                                <td>M</td>
                                <td>davidderrick@gmail.com</td>
                                <td>077123456</td>
                                <td>Busenga</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>David Anyuru</td>
                                <td>M</td>
                                <td>davidderrick@gmail.com</td>
                                <td>077123456</td>
                                <td>Busenga</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>David Anyuru</td>
                                <td>M</td>
                                <td>davidderrick@gmail.com</td>
                                <td>077123456</td>
                                <td>Busenga</td>
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
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Organisations
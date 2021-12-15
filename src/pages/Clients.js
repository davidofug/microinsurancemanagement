import React from 'react'
import Menu from '../parts/Menu'

function Clients() {
    return (
        <div className='components'>
            <div>
                <h1 className='title'>Clients</h1>
                <p>MANAGING CLIENTS</p>
            </div>
            <div style={{marginTop: "60px", backgroundColor: "#fff", padding: "20px", borderRadius: "10px"}}>   

                <input type="text" placeholder='Search for client...' id='searchInput' />

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
    )
}

export default Clients

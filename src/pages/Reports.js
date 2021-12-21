import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'

function Reports() {

    useEffect(() => {
        document.title = 'Britam - Reports'
    }, [])

    return (
        <div className='components'>
            <div className='heading'>
                <h1 className='title'>Reports</h1>
                <p className="subtitle">MANAGING REPORTS</p>
            </div>

            

            <div className="componentsData">
                <div className="table-card">
                    <Table striped bordered hover responsive style={{border: "1px solid black"}}>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Email</th>
                                <th>Email</th>
                                <th>Email</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>John</td>
                                <td>Doe</td>
                                <td>john@example.com</td>
                                <td>john@example.com</td>
                                <td>john@example.com</td>
                                <td>john@example.com</td>
                            </tr>
                            <tr>
                                <td>Mary</td>
                                <td>Moe</td>
                                <td>mary@example.com</td>
                                <td>mary@example.com</td>
                                <td>mary@example.com</td>
                                <td>mary@example.com</td>
                            </tr>
                            <tr>
                                <td>July</td>
                                <td>Dooley</td>
                                <td>july@example.com</td>
                                <td>july@example.com</td>
                                <td>july@example.com</td>
                                <td>july@example.com</td>
                            </tr>
                            <tr>
                                <td>July</td>
                                <td>Dooley</td>
                                <td>july@example.com</td>
                                <td>july@example.com</td>
                                <td>july@example.com</td>
                                <td>july@example.com</td>
                            </tr>
                            <tr>
                                <td>July</td>
                                <td>Dooley</td>
                                <td>july@example.com</td>
                                <td>july@example.com</td>
                                <td>july@example.com</td>
                                <td>july@example.com</td>
                            </tr>
                            <tr>
                                <td>July</td>
                                <td>Dooley</td>
                                <td>july@example.com</td>
                                <td>july@example.com</td>
                                <td>july@example.com</td>
                                <td>july@example.com</td>
                            </tr>
                            </tbody>
                            <tfoot>
                            <tr>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Email</th>
                                <th>Email</th>
                                <th>Email</th>
                                <th>Email</th>
                            </tr>
                            </tfoot>
                </Table>
                </div>
            </div>
        </div>
    )
}

export default Reports

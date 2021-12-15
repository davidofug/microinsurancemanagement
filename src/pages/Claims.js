import React from 'react'

function Claims() {
    return (
        <div className='components'>
            <h1 className='title'>Claims</h1>
            <p>Managing Claims</p>

            <div>
                <h2>Striped Rows</h2>
                <p>The .table-striped class adds zebra-stripes to a table:</p>            
                <table class="table table-striped" style={{border: "1px solid black"}}>
                    <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr>
                    <tr>
                        <td>Mary</td>
                        <td>Moe</td>
                        <td>mary@example.com</td>
                    </tr>
                    <tr>
                        <td>July</td>
                        <td>Dooley</td>
                        <td>july@example.com</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Claims

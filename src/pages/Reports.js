import React, { useEffect } from 'react'

function Reports() {

    useEffect(() => {
        document.title = 'Britam - Reports'
    }, [])

    return (
        <div className='components'>
            <div>
                <h1 className='title'>Reports</h1>
                <p className="subtitle">MANAGING REPORTS</p>
            </div>

            <div style={{"padding": "20px", "border":"1px solid red"}}>
                <h2>Striped Rows</h2>          
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

export default Reports

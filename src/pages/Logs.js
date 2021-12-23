import { useEffect } from 'react'

function Logs() {

    useEffect(() => document.title = 'Britam - Logs Trails', [])

    return (
        <div className='components'>
            <div className='heading'>
                <h1 className='title'>Logs</h1>
                <p className="subtitle">VIEW YOUR LOG TRAILS</p>
            </div>

            <div className="table-card componentsData"> 

                <table class="table table-striped" style={{border: "1px solid black"}}>
                    <thead>
                        <tr><th>Login</th><th>Logout</th><th>Duration</th></tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>07-12-2021 07:59:22</td>
                            <td>07-12-2021 07:59:22</td>
                            <td>2 hours</td>
                        </tr>
                        <tr>
                            <td>07-12-2021 07:59:22</td>
                            <td>07-12-2021 07:59:22</td>
                            <td>2 hours</td>
                        </tr>
                        <tr>
                            <td>07-12-2021 07:07:22</td>
                            <td>07-12-2021 07:59:22</td>
                            <td>2 hours</td>
                        </tr>
                        <tr>
                            <td>07-12-2021 07:59:22</td>
                            <td>07-12-2021 07:59:22</td>
                            <td>2 hours</td>
                        </tr>
                        <tr>
                            <td>07-12-2021 07:59:22</td>
                            <td>07-12-2021 07:59:22</td>
                            <td>2 hours</td>
                        </tr>
                                
                    </tbody>

                    <tfoot>
                    <tr><th>Login</th><th>Logout</th><th>Duration</th></tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Logs

import { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import Header from '../components/header/Header'

function Logs() {

    useEffect(() => {
        document.title = 'Britam - Logtrails'
    }, [])

    return (
        <div className='components'>
            <Header title="Logs" subtitle="USER LOG TRAILS" />

            <button className="btn btn-primary cta">Check in</button>


            <div className="shadow-sm table-card componentsData"> 

                <Table striped hover responsive>
                    <thead>
                        <tr><th>Check in</th><th>Check out</th><th>Duration</th></tr>
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
                    <tr><th>Check in</th><th>Check out</th><th>Duration</th></tr>
                    </tfoot>
                </Table>
            </div>
        </div>
    )
}

export default Logs

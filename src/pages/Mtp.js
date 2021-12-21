import generatedData from '../helpers/generatedClients';
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { MDBDataTable } from 'mdbreact'
import stickerData from '../helpers/Sticker-fake-data';

function Mtp() {

    useEffect(() => {
        document.title = 'Britam - Motor Third Party'
    }, [])

    return (
        <div className='components'>
            <div className='heading'>
                <h1 className='title'>MTP Policy</h1>
                <p className="subtitle">MANAGING MOTOR THIRD PARTY POLICIES</p>
            </div>
            <div id="add_client_group">
                <div></div>
                <Link to="/admin-policies"><button className="btn btn-primary cta">Add MTP</button></Link>
            </div>

            <div class="componentsData">
                <div className="table-card">
                    <MDBDataTable
                            striped
                            bordered
                            responsive
                            data={stickerData}
                        />
                </div>
            </div>
        </div>
    )
}

export default Mtp

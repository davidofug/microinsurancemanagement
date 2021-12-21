import { useEffect } from 'react'
import generatedData from '../helpers/generatedClients';
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { MDBDataTable } from 'mdbreact'
import stickerData from '../helpers/Sticker-fake-data';

function Comprehensive() {

    useEffect(() => {
        document.title = 'Britam - Comprehensive'
    }, [])


    return (
        <div className='components'>
            <div className='heading'>
                <h1 className='title'>Comprehensive Policy</h1>
                <p className="subtitle">COMPREHENSIVE POLICIES</p>
            </div>
            <div id="add_client_group">
                <div></div>
                <Link to="admin-policies"><button className="btn btn-primary cta">Add</button></Link>
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

export default Comprehensive

import {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import stickerData from '../helpers/Sticker-fake-data'

function Windscreen() {

    useEffect(() => {
        document.title = 'Britam - Windscreen'
    }, [])

    return (
        <div className='components'>
            <div className='heading'>
                <h1 className='title'>Windscreen Policy</h1>
                <p className="subtitle">MANAGING WINDSCREEN POLICIES</p>
            </div>
            <div id="add_client_group">
                <div></div>
                <Link to="admin-policies"><button className="btn btn-primary cta">Add POLICY</button></Link>
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

export default Windscreen

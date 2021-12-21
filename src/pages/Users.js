import {useEffect} from 'react'
import { MDBDataTable } from 'mdbreact'
import stickerData from '../helpers/Sticker-fake-data'
import { MdDownload } from 'react-icons/md'

function Users() {

    useEffect(() => {
        document.title = 'Britam - User Management'
    }, [])
    return (
        <div className='components'>
            <div className='heading'>
                <h1 className='title'>User Management</h1>
                <p className="subtitle">MANAGING USERS</p>
            </div>

            <div className="table-card componentsData">   
                <div id="search">
                    <div></div>
                    <div></div>
                    <button className='btn btn-primary'>Export <MdDownload /></button>
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
        </div>
        
    )
}

export default Users

import {useEffect, useState} from 'react'
import { MdDownload } from 'react-icons/md'
import { Form } from 'react-bootstrap'

function Users() {

    useEffect(() => document.title = 'Britam - User Management', [])

    const [q, setQ] = useState('');
  
     
  

    return (
        <div className='components'>
            <header className='heading'>
                <h1 className='title'>User Management</h1>
                <p className="subtitle">MANAGING USERS</p>
            </header>

            <div className="table-card componentsData">   
                <div id="search">
                    <div><Form.Control type="text" placeholder="Search for organisation"
                            value={q}
                            onChange={(e) => setQ(e.target.value)} 
                            className='mb-3'
                          /></div>
                    <div></div>
                    <button className='btn btn-primary'>Export <MdDownload /></button>
                </div>

                
            </div>
        </div>
        
    )
}

export default Users

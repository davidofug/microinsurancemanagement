import {useEffect, useState} from 'react'
import { MdDownload } from 'react-icons/md'
import { Form } from 'react-bootstrap'
import Header from '../parts/header/Header'

function Users() {

    useEffect(() => document.title = 'Britam - User Management', [])

    const [q, setQ] = useState('');
  
     
  

    return (
        <div className='components'>
            <Header title="User Management" subtitle="MANAGING USERS" />

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

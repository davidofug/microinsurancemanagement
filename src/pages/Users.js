import {useEffect, useState} from 'react'
import { MdDownload } from 'react-icons/md'
import { Form } from 'react-bootstrap'
import Header from '../components/header/Header'

import Chat from '../components/messenger/Chat'

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
            <div style={{width:"100%", position:"fixed", bottom:"0px", display:"flex", justifyContent:"flex-end", paddingRight:"140px"}}>
              <Chat />
            </div> 
        </div>    
    )
}

export default Users

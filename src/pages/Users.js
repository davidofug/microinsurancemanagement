import {useEffect, useState} from 'react'
import { MdDownload } from 'react-icons/md'
import Datatable from '../helpers/DataTable'
import data from '../helpers/mock-data.json'
import { Form } from 'react-bootstrap'

function Users() {

    useEffect(() => {
        document.title = 'Britam - User Management'
    }, [])

    const [q, setQ] = useState('');
    const [searchColumns, setSearchColumns] = useState([
      'name',
      'birth_year',
    ]);
  
    //
  
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
                    <div><Form.Control type="text" placeholder="Search for organisation"
                            type='text'
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

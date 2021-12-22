import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import data from '../../helpers/mock-data.json'
import { MdDownload } from 'react-icons/md'
import Datatable from '../../helpers/DataTable';
import { Form, Button } from 'react-bootstrap'
import Pagination from '../../helpers/Pagination';


function Organisations() {

  //
    const [ currentPage, setCurrentPage ] = useState(1)
    const [employeesPerPage] = useState(10)

    const indexOfLastEmployee = currentPage * employeesPerPage
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
    const currentOrganisations = data.slice(indexOfFirstEmployee, indexOfLastEmployee)
    const totalPagesNum = Math.ceil(data.length / employeesPerPage)

    //

  useEffect(() => { document.title = 'Britam - Organisations'}, [])

  const [q, setQ] = useState('');

  const columnHeading = ["Logo", "Name", "Email", "Phone No.", "Contact Name", "Role", "Phone No.", "email"]
  const columns = ["id", "name", "email", "contact", "agentName", "agentName", "contact", "email"]
  const search = rows => rows.filter(row =>
    columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));


  return (
        <div className='components'>
            <header className='heading'>
                <h1 className='title'>Organisations</h1>
                <p className="subtitle">MANAGING ORGANISATIONS</p>
            </header>
            <div id="add_client_group">
                <div></div>
                <Link to="/admin-add-organisations">
                    <Button className='btn btn-primary cta'>Add Organisation</Button>
                </Link>
              </div>

                <div class="componentsData">
                  <div className="table-card">
                    <div id="search">
                            <Form.Control type="text" className='mb-3' placeholder="Search for organisation"
                              value={q} onChange={({target}) => setQ(target.value)} 
                            />
                            <div></div>
                            <button className='btn btn-primary cta mb-3'>Export <MdDownload /></button>
                      </div>
                      <Datatable data={search(currentOrganisations)} columnHeading={columnHeading} columns={columns}/>

                      <Pagination 
                          pages={totalPagesNum}
                          setCurrentPage={setCurrentPage}
                          currentClients={currentOrganisations}
                          sortedEmployees={data}
                          entries={'Organisations'} />
                    </div>
                </div>
        </div>
    )
}

export default Organisations

import { ImFilesEmpty } from 'react-icons/im'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'

function UsersContainer({authClaims, users}) {
  return (
    <div id="first-container" className="shadow-sm bg-body rounded first-container" style={{padding: "5px", display: "flex"}}>
        <div id="short_stats">

            {users && users.length > 0 
                ? <>
                <h5 className="heading">
                    {authClaims.superadmin && <>Admins</>}
                    {authClaims.admin && <>Suupervisor</>}
                    {authClaims.supervisor && <>Agents</>}
                    {authClaims.agent && <>Clients</>}
                </h5>

                <table className='table table-responsive'>
                    <thead><tr><th>Name</th><th>Email Address</th></tr></thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.uid}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="heading">Total Number of users: {users.length} 
                    {authClaims.superadmin && <Link to={'/superadmin/admins'}>view all</Link>}
                    {authClaims.admin && <Link to={'/admin/supervisors'}>view all</Link>}
                    {authClaims.supervisor && <Link to={'/supervisor/agents'}>view all</Link>}
                    {authClaims.agent && <Link to={'/agent/clients'}>view all</Link>}
                </p>
                </>
                : 
                users === null
                ?
                <div className="no-table-data">
                    <i><ImFilesEmpty /></i>
                    <h4>No users</h4>
                    <p>You have not added any agent Yet</p>
                </div>
                :
                <Loader />
            }
        </div>
    </div>
  )
}

export default UsersContainer
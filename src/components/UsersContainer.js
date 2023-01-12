import { ImFilesEmpty } from "react-icons/im";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

function UsersContainer({ authClaims, users }) {
  return (
    <div
      //   id="first-container"
      className="tw-rounded tw-bg-white tw-outline tw-outline-1 tw-outline-gray-300 tw-h-80 tw-p-1 tw-w-full tw-flex tw-flex-col tw-justify-between px-3 py-2"
    >
      {users && users.length > 0 ? (
        <>
          <div>
            <h3 className="md:tw-text-lg ">
              {authClaims.superadmin && <>Admins</>}
              {authClaims.admin && <>Supervisor</>}
              {authClaims.supervisor && <>Agents</>}
              {authClaims.agent && <>Clients</>}
            </h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email Address</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.uid} className="tw-bg-white">
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="tw-w-full mb-2">
            {authClaims.superadmin && (
              <>
                Total Number of Admins: {users.length}
                <Link to={"/superadmin/admins"}> view all</Link>
              </>
            )}
            {authClaims.admin && (
              <>
                Total Number of Supervisors: {users.length}
                <Link to={"/admin/supervisors"}> view all</Link>
              </>
            )}
            {authClaims.supervisor && (
              <>
                Total Number of Agent: {users.length}
                <Link to={"/supervisor/agents"}> view all</Link>
              </>
            )}
            {authClaims.agent && (
              <>
                Total Number of Clients: {users.length}
                <Link to={"/agent/clients"}> view all</Link>
              </>
            )}
          </p>
        </>
      ) : users === null ? (
        <div className="tw-mt-5 tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full tw-py-5 tw-px-5">
          <ImFilesEmpty size={40} className="tw-mb-3" />
          <h4 className="tw-text-lg md:tw-text-xl">No users</h4>
          <p className="tw-text-gray-500">You have not added any agent Yet</p>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default UsersContainer;

import { Table} from 'react-bootstrap'

export default function Datatable({ data, columns, columnHeading }) {
  // const columns = data[0] && Object.keys(data[0]);
  // const columns = ["Logo", "name", "email", "contact", "address", "agentName", "createdAt", "contact", "email"]

  return (
    <Table bordered hover striped responsive style={{"border": "1px solid #000"}} cellPadding={0} cellSpacing={0}>
      <thead>
        <tr>
          {data[0] && columnHeading.map((heading) => <th>{heading}</th>)}
          {/* <th>Logo</th><th>Name</th><th>Email</th><th>Phone No.</th><th>Address</th><th>Contact Name</th><th>Role</th><th>Phone No.</th><th>Email</th> */}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column, index) => (
              <td key={index}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
      <tr>
          {data[0] && columns.map((heading) => <th>{heading}</th>)}
          {/* <th>Logo</th><th>Name</th><th>Email</th><th>Phone No.</th><th>Address</th><th>Contact Name</th><th>Role</th><th>Phone No.</th><th>Email</th> */}
        </tr>
      </tfoot>
    </Table>
  );
}


export function EditableDatable({ data, handleDeleteClick, handleEditClick }){
  const columns = ["name", "gender", "email", "contact", "address"]

  return (
    <Table bordered hover striped responsive style={{"border": "1px solid #000"}} cellPadding={0} cellSpacing={0}>
      <thead>
          <tr><th>#</th><th>Name</th><th>Gender</th><th>Email</th><th>Contact</th><th>Address</th><th></th></tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{index+1}</td>
            {columns.map((column, index) => (
              <td key={index}>{row[column]}</td>
            ))}
            <td className='working-here'>
              <ul id="action_context">
                  <li><button onClick={() => handleEditClick(row.id)}>edit</button></li>
                  <li><button onClick={() => {
                    handleDeleteClick(row.id)
                  }}>Delete</button></li>
              </ul>
              <div id="action">
                  <div></div><div></div><div></div></div>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
          <tr><th>#</th><th>Name</th><th>Gender</th><th>Email</th><th>Contact</th><th>Address</th><th></th></tr>
       </tfoot>
    </Table>
  )
}
import { Table} from 'react-bootstrap'
import { useForm } from '../hooks/useForm';

export default function Datatable({ data, columns, columnHeading }) {
  return (
    <Table bordered hover striped responsive style={{"border": "1px solid #000"}} cellPadding={0} cellSpacing={0}>
      <thead><tr>{data[0] && columnHeading.map(heading => <th>{heading}</th>)}</tr></thead>

      <tbody>
        {data.map((row, index) => (
          <tr key={index}>{columns.map((column, index) => (<td key={index}>{row[column]}</td>))}</tr>
        ))}
      </tbody>

      <tfoot><tr>{data[0] && columnHeading.map(heading => <th>{heading}</th>)}</tr></tfoot>
    </Table>
  );
}


export function EditableDatable({ handleDeleteClick, handleEditClick, currentClients }){

  const columns = ["id", "name", "gender", "email", "contact", "address"]

  return (
    <Table bordered hover striped responsive style={{"border": "1px solid #000"}} cellPadding={0} cellSpacing={0}>
      <thead>
          <tr><th>#</th><th>Name</th><th>Gender</th><th>Email</th><th>Contact</th><th>Address</th><th></th></tr>
      </thead>
      <tbody>
        {currentClients.map((row, index) => (
          <tr key={index}>
            {columns.map((column, index) => (<td key={index}>{row[column]}</td>))}
            <td className='working-here'>
              <ul id="action_context">
                  <li><button onClick={() => {}}>edit</button></li>
                  <li><button onClick={() => handleDeleteClick(row.id)}>Delete</button></li>
              </ul>
              <div id="action"><div></div><div></div><div></div></div>
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
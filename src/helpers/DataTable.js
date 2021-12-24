import { Table} from 'react-bootstrap'
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';
import { Fragment } from 'react';

export default function Datatable({ data, columns, columnHeading }) {
  return (
    <Table bordered hover striped responsive style={{"border": "1px solid #000"}} cellPadding={0} cellSpacing={0}>
      <thead><tr>{data[0] && columnHeading.map(heading => <th>{heading}</th>)}</tr></thead>

      <tbody>
        {data.map((row) => (
          <tr key={row.id}>{columns.map((column, index) => (<td key={index}>{row[column]}</td>))}</tr>
        ))}
      </tbody>

      <tfoot><tr>{data[0] && columnHeading.map(heading => <th>{heading}</th>)}</tr></tfoot>
    </Table>
  );
}


export function EditableDatable({ columns, columnHeading, editContactId, handleDeleteClick, handleEditClick, currentClients, editFormData, handleEditFormChange, handleCancelClick }){
  return (
    <Table bordered hover striped responsive style={{"border": "1px solid #000"}} cellPadding={0} cellSpacing={0}>
      <thead>
          <tr>{columnHeading.map(heading => (<th>{heading}</th>))}</tr>
      </thead>
      <tbody>
        {currentClients.map((row) => (
          <Fragment key={row.id}>
            {editContactId === row.id ? (
            <EditableRow
              row={row}
              editFormData={editFormData}
              handleEditFormChange={handleEditFormChange}
              handleCancelClick={handleCancelClick}
            />
            ) : (
              <ReadOnlyRow
                    columns={columns}
                    row={row}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
            )}
          </Fragment>
        ))}
      </tbody>
      <tfoot>
        <tr>{columnHeading.map(heading => (<th>{heading}</th>))}</tr>
       </tfoot>
    </Table>
  )
}

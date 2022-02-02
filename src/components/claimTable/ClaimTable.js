import { Table } from 'react-bootstrap'
import { Fragment, useState } from 'react'
import EditableRow from '../../helpers/EditableRow'
import { FaEllipsisV } from 'react-icons/fa'
import './claimTable.css'


export default function ClaimTable({ columns, editContactId, handleDeleteClick, handleEditClick, currentClients, editFormData, handleEditFormChange, handleCancelClick }){
    
    const [ clickedUl, setClickedUl ] = useState(false)


    return (
      <Table bordered hover striped responsive cellPadding={0} cellSpacing={0}>
        <thead>
            <tr><th>Ref Number</th><th>Claimant Details</th><th>Date of Incident</th><th>Number Plate</th><th>Sticker Number</th><th>Claim Estimate</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {currentClients.map((row, index) => (
            <Fragment key={row.id}>
              {editContactId === row.id ? (
              <EditableRow
                row={row}
                editFormData={editFormData}
                handleEditFormChange={handleEditFormChange}
                handleCancelClick={handleCancelClick}
              />
              ) : (
                <tr key={index}>
                    {columns.map((column, index) => (<td key={index}>{row[column]}</td>))}
                    <td className='started'>
                        <FaEllipsisV className={`actions please${index}`} onClick={() => {
                            document.querySelector(`.please${index}`).classList.add('hello')
                        }} />
                        <ul id="actionsUl" className='actions-ul'>
                            <li><button onClick={(event) => handleEditClick(event, row)}>View Notification</button></li>
                            <li><button onClick={(event) => handleEditClick(event, row)}>Claim Settlement</button></li>
                            <li><button onClick={(event) => handleEditClick(event, row)}>View Settlement</button></li>
                            <li><button onClick={() => {handleDeleteClick(row.id)}}>Cancel</button></li>
                            <li><button onClick={() => {handleDeleteClick(row.id)}}>Delete</button></li>
                            <hr style={{"color": "black"}}></hr>
                            <li><button>close</button></li>
                        </ul>
                    </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
        <tfoot>
          <tr><th>Ref Number</th><th>Claimant Details</th><th>Date of Incident</th><th>Number Plate</th><th>Sticker Number</th><th>Claim Estimate</th><th>Status</th><th>Actions</th></tr>
         </tfoot>
      </Table>
    )
  }

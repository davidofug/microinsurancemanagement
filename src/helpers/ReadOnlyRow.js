import React from "react";
import { FaEllipsisV } from 'react-icons/fa'

const ReadOnlyRow = ({columns, row, handleEditClick, handleDeleteClick }) => {
  return (
          <tr>
            {columns.map((column, index) => (<td key={index}>{row[column]}</td>))}
            <td className='working-here'>
              <ul id="action_context">
                  <li><button onClick={(event) => handleEditClick(event, row)}>Details</button></li>
                  <li><button onClick={(event) => handleEditClick(event, row)}>Renew</button></li>
                  <li><button onClick={(event) => handleEditClick(event, row)}>edit</button></li>
                  <li><button onClick={() => {handleDeleteClick(row.id)}}>Delete</button></li>
              </ul>
              <FaEllipsisV />
            </td>
          </tr>
  );
};

export default ReadOnlyRow;



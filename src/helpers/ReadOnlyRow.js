import React from "react";
import { FaEllipsisV } from 'react-icons/fa'

const ReadOnlyRow = ({ row, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{row.id}</td>
      <td>{row.name}</td>
      <td>{row.gender}</td>
      <td>{row.email}</td>
      <td>{row.contact}</td>
      <td>{row.address}</td>
      <td className='working-here'>
              <ul id="action_context">
                  <li><button onClick={event => handleEditClick(event, row)}>edit</button></li>
                  <li><button onClick={() => handleDeleteClick(row.id)}>Delete</button></li>
              </ul>
              <FaEllipsisV style={{"font-size": "1.1rem"}} />
            </td>
    </tr>
  );
};

export default ReadOnlyRow;

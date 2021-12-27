import React from "react";
import { FaEllipsisV } from 'react-icons/fa'

const ReadOnlyRow = ({columns, row, handleEditClick, handleDeleteClick }) => {
  return (
          <tr>
            {columns.map(column => (<td>{row[column]}</td>))}
            <td className='working-here'>
              <ul id="action_context">
                  <li><button onClick={(event) => handleEditClick(event, row)}>edit</button></li>
                  <li><button onClick={() => {
                    handleDeleteClick(row.id)
                  }}>Delete</button></li>
              </ul>
              <div id="action"><div></div><div></div><div></div></div>
            </td>
          </tr>
  );
};

export default ReadOnlyRow;



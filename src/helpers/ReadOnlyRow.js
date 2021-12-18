import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.id}</td>
      <td>{contact.name}</td>
      <td>{contact.gender}</td>
      <td>{contact.email}</td>
      <td>{contact.contact}</td>
      <td>{contact.address}</td>
      <td className='working-here'>
            <ul id="action_context">
                <li><button onClick={(event) => handleEditClick(event, contact)}>edit</button></li>
                <li><button onClick={() => handleDeleteClick(contact.id)}>Delete</button></li>
            </ul>
            <div id="action">
                <div></div><div></div><div></div></div>
       </td>
    </tr>
  );
};

export default ReadOnlyRow;

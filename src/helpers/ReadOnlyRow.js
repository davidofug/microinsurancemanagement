import React from "react";

const ReadOnlyRow = ({ row, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{row.id}</td>
      <td>{row.name}</td>
      <td>{row.gender}</td>
      <td>{row.email}</td>
      <td>{row.contact}</td>
      <td>{row.address}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, row)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(row.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;

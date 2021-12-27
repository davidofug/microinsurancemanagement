import React from "react";
import { MdCancel, MdCheckCircle } from 'react-icons/md'

const EditableRow = ({
  row,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>{row.id}</td>
      <td>
        <input
          style={{"width": "100px"}}
          type="text"
          required="required"
          placeholder="Enter an name..."
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          style={{"width": "50px"}}
          className="sm"
          type="text"
          required="required"
          placeholder="Enter a gender..."
          name="gender"
          value={editFormData.gender}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          style={{"width": "180px"}}
          type="email"
          required="required"
          placeholder="Enter an email..."
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          style={{"width": "100px"}}
          type="text"
          required="required"
          placeholder="Enter an contact..."
          name="contact"
          value={editFormData.contact}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          style={{"width": "100px"}}
          type="text"
          required="required"
          placeholder="Enter an address..."
          name="address"
          value={editFormData.address}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button className="action-buttons" type="submit">
          <MdCheckCircle style={{color: "#1475cf"}} />
        </button>
        <button className="action-buttons" type="button" onClick={handleCancelClick}>
          <MdCancel style={{color: "red"}}/>
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;

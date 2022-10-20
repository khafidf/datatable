import React from "react";
import './Editable.css'

const Editable = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="fullName"
          value={editFormData.fullName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a phone number..."
          name="phoneNumber"
          value={editFormData.phoneNumber}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button className='add' type="submit">Save</button>
        <button className='delete' type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default Editable;
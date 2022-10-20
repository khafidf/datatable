import React from "react";

const ReadOnly = ({ contact, handleEditClick, handleDeleteClick }) => {
    return (
        <tr>
            <td>{contact.fullName}</td>
            <td>{contact.phoneNumber}</td>
            <td>
                <button
                    className='edit'
                    type="button"
                    onClick={(e) => handleEditClick(e, contact)}
                >
                    Edit
                </button>
                <button className='delete' type="button" onClick={() => handleDeleteClick(contact.id)}>
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default ReadOnly;
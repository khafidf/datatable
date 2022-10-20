import React, { useState, Fragment, useEffect } from 'react';
import './Table.css';
import { contactDatas } from '../../data';
import ReadOnly from '../ReadOnly/ReadOnly';
import Editable from '../Editable/Editable';
import { nanoid } from 'nanoid';

const Table = () => {

    const [contacts, setContacts] = useState(contactDatas);

    const [addFormData, setAddFormData] = useState({
        fullName: '',
        phoneNumber: '',
    });

    const [editFormData, setEditFormData] = useState({
        fullName: '',
        phoneNumber: '',
    });

    const [editContactId, setEditContactId] = useState(null);

    const handleAddFormChange = (e) => {
        e.preventDefault();

        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleAddFormSubmit = (e) => {
        e.preventDefault();

        const newContact = {
            id: nanoid(),
            fullName: addFormData.fullName,
            phoneNumber: addFormData.phoneNumber,
        };

        const newContacts = [...contacts, newContact];
        setContacts(newContacts);
    };

    const handleEditFormChange = (e) => {
        e.preventDefault();

        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleEditClick = (e, datas) => {
        e.preventDefault();
        setEditContactId(datas.id);

        const formValues = {
            fullName: datas.fullName,
            phoneNumber: datas.phoneNumber,
        };

        setEditFormData(formValues);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedContact = {
            id: editContactId,
            fullName: editFormData.fullName,
            phoneNumber: editFormData.phoneNumber,
        };

        const newContacts = [...contacts];

        const index = contacts.findIndex((contact) => contact.id === editContactId);

        newContacts[index] = editedContact;

        setContacts(newContacts);
        setEditContactId(null);
    };

    const handleCancelClick = () => {
        setEditContactId(null);
    };

    const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts];

        const index = contacts.findIndex((contact) => contact.id === contactId);

        newContacts.splice(index, 1);

        setContacts(newContacts);
    };

    const firstName = [
        'Acton', 'Addison', 'Adney', 'Adolf', 'Aiken', 'Ainsley', 'Aldwin', 'Alvin', 'Alma', 'Alvina', 'Anastasia', 'Banks', 'Barrow', 'Beck', 'Berkeley'
    ];

    const lastName = [
        'Edith', 'Edrie ', 'Edwina', 'Ella', 'Hamlin', 'Harley', 'Kerr', 'Neilson', 'Parish', 'Stewart', 'Tillie', 'Van', 'Wilmer', 'Zaire'
    ];

    const getRandomNum = (i) => Math.floor(Math.random() * i);

    const getNumber = () => {
        const number = '0123456789';
        let generator = '';
        for (let i = 0; i < 8; i++) {
            generator += number[getRandomNum(10)]
        };
        return generator;
    }

    function timeOut(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    };

    useEffect(() => {
        const autoDeleteContact = () => {
            const newContacts = [...contacts];
            newContacts.pop();
            setContacts(newContacts);
        };
        setTimeout(() => {
            autoDeleteContact();
        }, 10000)

    });

    useEffect(() => {
        let isAdd = false;
        const autoAddContact = async () => {
            const fullName = `${firstName[getRandomNum(firstName.length)]} ${lastName[getRandomNum(lastName.length)]}`;

            const phoneNumber = `081${getNumber()}`;

            await timeOut(3000);

            if (!isAdd) {
                const newContact = {
                    id: nanoid(),
                    fullName: fullName,
                    phoneNumber: phoneNumber,
                };
                const newContacts = [...contacts, newContact];
                setContacts(newContacts);
            }
        };

        autoAddContact();

        return () => {
            isAdd = true;
        }
    }, [contacts]);

    return (
        <div className='app-container'>
            <form onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <Fragment>
                                {editContactId === contact.id ? (
                                    <Editable
                                        editFormData={editFormData}
                                        handleEditFormChange={handleEditFormChange}
                                        handleCancelClick={handleCancelClick}
                                    />
                                ) : (
                                    <ReadOnly
                                        contact={contact}
                                        handleEditClick={handleEditClick}
                                        handleDeleteClick={handleDeleteClick}
                                    />
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </form>

            <h1>Add a Contact</h1>
            <form onSubmit={handleAddFormSubmit}>
                <input
                    type="text"
                    name="fullName"
                    required="required"
                    placeholder="Enter a name..."
                    onChange={handleAddFormChange}
                />
                <input
                    type="text"
                    name="phoneNumber"
                    required="required"
                    placeholder="Enter a phone number..."
                    onChange={handleAddFormChange}
                />
                <button className='add' type="submit" >Add</button>
            </form>
        </div>
    )
}

export default Table
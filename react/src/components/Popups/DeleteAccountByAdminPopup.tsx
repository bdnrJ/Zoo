import React from 'react'

type props = {
    email: string,
    closePopup: () => void,
    handleDelete: () => void,
}

const DeleteAccountByAdminPopup = ({email, closePopup, handleDelete}: props) => {

    return (
        <div className="admindel">
            <h1>Deleting User Account</h1>
            <p> Are you sure you want to delete {email} account? </p>
            <div className="admindel-buttons">
                    <button onClick={closePopup} type="button" className="delete-cancel-button">Cancel</button>
                    <button onClick={handleDelete} className="delete-confirm-button">Delete</button>
            </div>
        </div>
    )
}

export default DeleteAccountByAdminPopup

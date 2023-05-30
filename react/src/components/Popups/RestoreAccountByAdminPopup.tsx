import React from 'react'

type props = {
    email: string,
    closePopup: () => void,
    handleRestore: () => void,
}


const RestoreAccountByAdminPopup = ({email, closePopup, handleRestore}: props) => {
    return (
        <div className="admindel">
        <h1>Restore User Account</h1>
        <p> Are you sure you want to restore {email} account? </p>
        <div className="admindel-buttons">
                <button onClick={closePopup} type="button" className="delete-cancel-button">Cancel</button>
                <button onClick={handleRestore} className="delete-confirm-button">Restore</button>
        </div>
    </div>
    )
    }

export default RestoreAccountByAdminPopup

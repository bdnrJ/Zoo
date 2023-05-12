import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

type props = {
    refreshUserData: () => void;
}

const DeleteAccountSuccessPopup = ({refreshUserData}: props) => {
    const navigate = useNavigate();
    const {setCurrentUser} = useContext(AuthContext);

    const handleClose = () => {
        navigate('/');
        setCurrentUser(null);
        refreshUserData();
        window.location.reload()
    }

    return (
        <div className="delete-account-success-popup">
            <div className="popup-content">
                <h2>Account Deleted</h2>
                <p>Your account has been successfully deleted. We're sorry to see you go.</p>
                <button className="close-button" onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};

export default DeleteAccountSuccessPopup;

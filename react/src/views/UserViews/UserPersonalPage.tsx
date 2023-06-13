import React, { useContext, useEffect, useState } from 'react'
import axiosClient from '../../axios-client';
import { displayTransaction } from '../AdminViews/Transactions';
import Transaction from '../../components/Transaction';
import PopupForm from '../../components/Popups/PopupForm';
import ChangePersonalDataPopup from '../../components/Popups/ChangePersonalDataPopup';
import ChangeEmailPopup from '../../components/Popups/ChangeEmailPopup';
import ChangePasswordPopup from '../../components/Popups/ChangePasswordPopup';
import DeleteAccountPopup from '../../components/Popups/DeleteAccountPopup';
import { LoadingContext } from '../../context/LoadingContext';

type user = {
    firstname: string,
    lastname: string,
    email: string
    created_at: string
    transactions: displayTransaction[]
}

const UserPersonalPage = () => {
    const [user, setUser] = useState<user>();
    const [refreshUserData, setRefreshData] = useState<boolean>();
    const [isChangePasswordOn, setIsChangePasswordOn] = useState<boolean>(false);
    const [isChangeEmailOn, setIsChangeEmailOn] = useState<boolean>(false);
    const [isChangePersonalDataOn, setIsChangePersonalDataOn] = useState<boolean>(false);
    const [isDeleteAccountOn, setIsDeleteAccountOn] = useState<boolean>(false);

    const fetchUser = async () => {
        try {
            const res = await axiosClient.get(`/users-unauth`, {withCredentials: true});
            setUser(res.data)
        }catch(err:any){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [refreshUserData])

    return (
        <div className="personal">
            <div className="personal-top">
                <h1>MY PROFILE</h1>
            </div>
            <div className="personal-rest">
                <div className="personal-rest-user">
                    <h2>Account data</h2>
                    <div className="rest-user-block">
                            <span>Name</span>
                        <div className="rest-user-block-wrapper">
                            <div className="rest-user-block-data">
                                {user?.firstname + " " + user?.lastname}
                            </div>
                            <div className="rest-user-block-button">
                                <button onClick={() => setIsChangePersonalDataOn(true)}>change</button>
                            </div>
                        </div>
                    </div>
                    <div className="rest-user-block">
                            <span>Email</span>
                        <div className="rest-user-block-wrapper">
                            <div className="rest-user-block-data">
                                {user?.email}
                            </div>
                            <div className="rest-user-block-button">
                                <button onClick={() => setIsChangeEmailOn(true)}>change</button>
                            </div>
                        </div>
                    </div>
                    <div className="rest-user-block">
                            <span>Password</span>
                        <div className="rest-user-block-wrapper">
                            <div className="rest-user-block-data">
                                ********
                            </div>
                            <div className="rest-user-block-button">
                                <button onClick={() => setIsChangePasswordOn(true)}>change</button>
                            </div>
                        </div>
                    </div>
                    <div className="rest-user-delete">
                        <button onClick={() => setIsDeleteAccountOn(true)} className='rest-user-delete-btn'>Delete account</button>
                    </div>
                </div>
                <div className="personal-rest-cookies">
                    <span>
                        Information about cookies
                        <br />
                        The ZOO website uses cookies - these are small text information that is saved and stored on your device.
                        Cookies are primarily used to optimize the use of the website and for statistical purposes.
                        <br />
                        We store cookies on your device to access information in order to:
                        remember selected settings, adapting the content of the website to your needs, properly display the page adapted to your device,
                        remembering the history of visited pages, creating anonymous statistics that help improve the website, ensure security.
                    </span>
                </div>
            </div>
            {isChangePersonalDataOn &&
                <PopupForm closePopup={() => setIsChangePersonalDataOn(false)}>
                    <ChangePersonalDataPopup closePopup={() => setIsChangePersonalDataOn(false)} refreshUserData={() => setRefreshData(!refreshUserData)}/>
                </PopupForm>
            }
            {isChangeEmailOn &&
                <PopupForm closePopup={() => setIsChangeEmailOn(false)}>
                    <ChangeEmailPopup closePopup={() => setIsChangeEmailOn(false)} refreshUserData={() => setRefreshData(!refreshUserData)}/>
                </PopupForm>
            }
            {isChangePasswordOn &&
                <PopupForm closePopup={() => setIsChangePasswordOn(false)}>
                    <ChangePasswordPopup closePopup={() => setIsChangePasswordOn(false)} refreshUserData={() => setRefreshData(!refreshUserData)}/>
                </PopupForm>
            }
            {isDeleteAccountOn &&
                <PopupForm closePopup={() => setIsDeleteAccountOn(false)}>
                    <DeleteAccountPopup closePopup={() => setIsDeleteAccountOn(false)} refreshUserData={() => setRefreshData(!refreshUserData)}/>
                </PopupForm>
            }
        </div>
    )
}

export default UserPersonalPage

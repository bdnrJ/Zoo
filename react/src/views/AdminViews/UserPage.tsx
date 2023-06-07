import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Transaction from '../../components/Transaction';
import { displayTransaction } from './Transactions';
import axiosClient from '../../axios-client';
import PopupForm from '../../components/Popups/PopupForm';
import DeleteAccountByAdminPopup from '../../components/Popups/DeleteAccountByAdminPopup';
import ChangeUserByAdminPopup from '../../components/Popups/ChangeUserByAdminPopup';
import { donation } from '../../context/TicketContext';
import UserDonation from '../../components/UserDonation';
import RestoreAccountByAdminPopup from '../../components/Popups/RestoreAccountByAdminPopup';
import { LoadingContext } from '../../context/LoadingContext';

export interface user {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    updated_at: string,
    created_at: string,
    transactions: displayTransaction[];
    deleted_at: any;
}

const UserPage = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<user | null>(null);
    const [donations, setDonations] = useState<donation[]>([]);
    const [transactions, setTransactions] = useState<displayTransaction[]>([]);
    const [isDeletePopupOn, setIsDeletePopupOn] = useState<boolean>(false);
    const [isRestorePopupOn, setIsRestorePopupOn] = useState<boolean>(false);
    const navigate = useNavigate();
    const {setLoading} = useContext(LoadingContext);


    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const response = await axiosClient.get(`/users/${id}`, {withCredentials: true});
                console.log(response);
                setUser(response.data.user);
                setTransactions(response.data.user.transactions);
                setDonations(response.data.user.donations)
            }catch(err){
                alert(err);
            }
        };

        fetchUserData();
    }, [id]);

    const handleUserDeletion = async () => {
        try {
            setLoading(true);
            await axiosClient.delete(`/users/destroy/${id}`, {withCredentials: true});
            alert('User deleted succsefully');
            setLoading(false);
            navigate('/admin/users');
        } catch (err) {
            setLoading(false);
            alert(err);
        }
    };

    const handleUserRestoration = async () => {
        try {
            setLoading(true);
            await axiosClient.post(`/users/restore/${id}`, {}, {    withCredentials: true});
            alert('User restored succsefully');
            setLoading(false);
            navigate('/admin/users');
        } catch (err) {
            setLoading(false);
            alert(err);
            console.log(err);
        }
    };

    if (!user) {
        return (
            <div className="userpage">
                <div>Loading user data...</div>
            </div>
        );
    }

    return (
        <div className='userpage'>
            {!user ? <div>Loading user data...</div> :<>
            <h2 className='userpage-header'>User Information</h2>
            <div className='user-info'>
                <p className='user-info-item'>ID: {user.id}</p>
                <p className='user-info-item'>First Name: {user.deleted_at ? '(DELETED) ' : ''}{user.firstname}</p>
                <p className='user-info-item'>Last Name: {user.lastname}</p>
                <p className='user-info-item'>Email: {user.email}</p>
                <p className='user-info-item'>Registration Date: {user.updated_at.split('T')[0]}</p>
                <p className='user-info-item'>Update Date: {user.created_at.split('T')[0]}</p>
                <p className='user-info-item'>Deleted at: {user.deleted_at ? user?.deleted_at.split('T')[0] : "None"}</p>
            </div>
            {user?.deleted_at
                ? <button onClick={() => setIsRestorePopupOn(true)} className='restore-button'>RESTORE ACCOUNT</button>
                : <button onClick={() => setIsDeletePopupOn(true)} className='delete-button'>DELETE ACCOUNT</button>
            }
            <h2 className='userpage-header'>User Donations</h2>
            <div className='transactions-list'>
                {donations.length !== 0 ? donations.map((donation) => (
                    <UserDonation donation={donation} key={donation.id} user={user}/>
                )) : <p>This user has no donations</p>}
            </div>
            <h2 className='userpage-header'>User Transactions</h2>
            <div className='transactions-list'>
                {transactions.length !== 0 ? transactions.map((transaction) => (
                    <Transaction transaction={transaction} />
                )) : <p>This user has no transactions</p>}
            </div>
            </>}
            {isDeletePopupOn &&
                <PopupForm closePopup={() => setIsDeletePopupOn(false)}>
                    <DeleteAccountByAdminPopup handleDelete={handleUserDeletion} email={user.email} closePopup={() => setIsDeletePopupOn(false)}/>
                </PopupForm>
            }
            {isRestorePopupOn &&
                <PopupForm closePopup={() => setIsRestorePopupOn(false)}>
                    <RestoreAccountByAdminPopup closePopup={() => setIsRestorePopupOn(false)}  email={user.email} handleRestore={handleUserRestoration} />
                </PopupForm>
            }
            {/* {isEditPopupOn &&
                <PopupForm closePopup={() => setIsEditPopupOn(false)}>
                    <ChangeUserByAdminPopup user={user} refreshUserData={() => {}} closePopup={() => setIsEditPopupOn(false)}/>
                </PopupForm>
            } */}
        </div>
    );


};

export default UserPage;

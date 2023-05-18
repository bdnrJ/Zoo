import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Transaction from '../../components/Transaction';
import { displayTransaction } from './Transactions';
import axiosClient from '../../axios-client';
import PopupForm from '../../components/Popups/PopupForm';
import DeleteAccountByAdminPopup from '../../components/Popups/DeleteAccountByAdminPopup';

interface user {
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
    const [transactions, setTransactions] = useState<displayTransaction[]>([]);
    const [isDeletePopupOn, setIsDeletePopupOn] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const response = await axiosClient.get(`/users/${id}`, {withCredentials: true});
                console.log(response);
                setUser(response.data.user);
                setTransactions(response.data.user.transactions);
            }catch(err){
                alert(err);
            }
        };

        fetchUserData();
    }, [id]);

    const handleUserDeletion = async () => {
        try {
            await axiosClient.delete(`/users/destroy/${id}`, {withCredentials: true});
            const response = await axiosClient.get(`/users/${id}`, {withCredentials: true});
            alert('User deleted succsefully');
            navigate('/admin/users');
        } catch (err) {
            alert(err);
        }
    };

    const handleUserRestoration = async () => {
        setUser(null)
        try {
            await axiosClient.post(`/users/${id}/restore`, {withCredentials: true});
            const response = await axiosClient.get(`/users/${id}`, {withCredentials: true});
            setUser(response.data.user);
            setIsDeletePopupOn(false);
        } catch (err) {
            alert(err);
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
            <button className='edit-button'>EDIT</button>
            {user?.deleted_at
                ? <button onClick={handleUserRestoration} className='restore-button'>RESTORE</button>
                : <button onClick={() => setIsDeletePopupOn(true)} className='delete-button'>DELETE</button>
            }
            <h2 className='userpage-header'>User Transactions</h2>
            <div className='transactions-list'>
                {transactions.map((transaction) => (
                        <Transaction transaction={transaction} />
                ))}
            </div>
            </>}
            {isDeletePopupOn &&
                <PopupForm closePopup={() => setIsDeletePopupOn(false)}>
                    <DeleteAccountByAdminPopup handleDelete={handleUserDeletion} email={user.email} closePopup={() => setIsDeletePopupOn(false)}/>
                </PopupForm>
            }
        </div>
    );


};

export default UserPage;

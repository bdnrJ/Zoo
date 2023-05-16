import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Transaction from '../../components/Transaction';
import { displayTransaction } from './Transactions';
import axiosClient from '../../axios-client';

interface user {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    transactions: displayTransaction[];
    deleted_at: any;
}

const UserPage = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<user | null>(null);
    const [transactions, setTransactions] = useState<displayTransaction[]>([]);

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

    if (!user) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className='userpage'>
            <h2 className='userpage-header'>User Information</h2>
            <div className='user-info'>
                <p className='user-info-item'>ID: {user.id}</p>
                <p className='user-info-item'>First Name: {user.deleted_at ? '(DELETED) ' : ''}{user.firstname}</p>
                <p className='user-info-item'>Last Name: {user.lastname}</p>
                <p className='user-info-item'>Email: {user.email}</p>
            </div>
            <button className='edit-button'>EDIT</button>
            <h2 className='userpage-header'>User Transactions</h2>
            <ul className='transactions-list'>
                {transactions.map((transaction) => (
                    <li key={transaction.id} className='transaction-item'>
                        <Transaction transaction={transaction} />
                    </li>
                ))}
            </ul>
        </div>
    );


};

export default UserPage;

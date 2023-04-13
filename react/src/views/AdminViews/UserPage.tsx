import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Transaction from '../../components/Transaction';
import { displayTransaction } from './Transactions';
import axiosClient from '../../axios-client';

interface user {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    transactions: displayTransaction
}

type transaction = {
    buy_date: string,
    exp_date: string,
    id: number,
    total_cost: number,
    type: string,
    user_id: number,
    user: {
        email: string
    }
}

const UserPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<user | null>(null);
    const [transactions, setTransactions] = useState<displayTransaction[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const response = await axiosClient.get(`/user/${id}`, {withCredentials: true});
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
            <h2>User Information</h2>
            <p>ID: {user.id}</p>
            <p>First Name: {user.firstname}</p>
            <p>Last Name: {user.lastname}</p>
            <p>Email: {user.email}</p>
            <h2>User Transactions</h2>
            <ul>
                {transactions.map((transaction) => (
                <li key={transaction.id}>
                    <Transaction transaction={transaction} />
                </li>
                ))}
            </ul>
        </div>
    );
};

export default UserPage;

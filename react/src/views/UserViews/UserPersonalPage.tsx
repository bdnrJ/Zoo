import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';
import { displayTransaction } from '../AdminViews/Transactions';
import Transaction from '../../components/Transaction';

type user = {
    firstname: string,
    lastname: string,
    email: string
    created_at: string
    transactions: displayTransaction[]
}

const UserPersonalPage = () => {

    const [user, setUser] = useState<user>();

    const fetchUser = async () => {
        try {
            const res = await axiosClient.get(`/users_unauth`, {withCredentials: true});
            setUser(res.data)
            console.log(res);

        }catch(err:any){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <div className="personal">
            Personal
            {/* TODO change pwd, change email after providing password into popups i guess */}
            <button>change password</button>
            <button>change email</button>
            <div className="personal-userinfo">
                {
                    <ul>
                        <li>{ user?.lastname }</li>
                        <li>{ user?.firstname }</li>
                        <li>{ user?.email }</li>
                    </ul>
                }
            </div>
            <div className="personal_transactions">
                <h1>My transactions</h1>
                <ul>
                {user?.transactions.map((transaction) => (
                <li key={transaction.id}>
                    <Transaction transaction={transaction} />
                </li>
                ))}
            </ul>
            </div>
        </div>
    )
}

export default UserPersonalPage

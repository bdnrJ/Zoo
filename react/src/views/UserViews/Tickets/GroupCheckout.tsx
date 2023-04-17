import React, { useContext } from 'react'
import { TicketContext } from '../../../context/TicketContext'
import axiosClient from '../../../axios-client';
import { useNavigate } from 'react-router-dom';

const GroupCheckout = () => {
    const {groupUserTransaction, resetAllGroup} = useContext(TicketContext);
    const navigate = useNavigate();

    const onBuy = async () => {
        const groupTransaction = {
            buy_date: groupUserTransaction.buy_date.toISOString().slice(0, 19).replace('T', ' '),
            exp_date: groupUserTransaction.exp_date.toISOString().slice(0, 19).replace('T', ' '),
            type: groupUserTransaction.type,
            items: groupUserTransaction.items,
            services: groupUserTransaction.services,
        }

        console.log(groupTransaction);

        try{
            const res = await axiosClient.post('/add_transactions',
            {
                ...groupTransaction
            },
            {withCredentials: true});

            resetAllGroup();
            alert("success")
            navigate('/')
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="groupcheckout">
            Group Checkout page
            <button onClick={() => console.log(groupUserTransaction)}>Show group ticket</button>
            <button onClick={onBuy} >Buy</button>
        </div>
    )
}

export default GroupCheckout

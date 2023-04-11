import React, { useContext } from 'react'
import { TicketContext } from '../../../context/TicketContext'
import TicketSum from '../../../components/TicketSum';
import axiosClient from '../../../axios-client';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const NormalCheckout = () => {
    const {normalUserTransaction, resetAllNormal} = useContext(TicketContext);
    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    if(normalUserTransaction.normal_tickets.reduce((acc, curr) => acc + curr.amount, 0) === 0 || !currentUser){
        navigate(-1);
    }

    const hanldeBuyTicket = async () => {
        try{
            const res = await axiosClient.post('/transactions', {
                ...normalUserTransaction,
                //fomarting js date into mysql DateTime
                buy_date: normalUserTransaction.buy_date.toISOString().slice(0, 19).replace('T', ' '),
                exp_date: normalUserTransaction.exp_date.toISOString().slice(0, 19).replace('T', ' ')
            }, {withCredentials: true})

            resetAllNormal();

            //TODO: popup and then navigate back or smth
            navigate('/');
        }catch(e){
            console.log(e);
        }
    }

    return (
        <div className="normal_checkout">
            <TicketSum date={normalUserTransaction.exp_date} addClass={'checkout'}/>

            <button onClick={hanldeBuyTicket} >Buy</button>
        </div>
    )
}

export default NormalCheckout

import React, { useContext } from 'react'
import { TicketContext } from '../../../context/TicketContext'
import TicketSum from '../../../components/TicketSum';
import axiosClient from '../../../axios-client';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const NormalCheckout = () => {
    const {userTransaction, resetAll} = useContext(TicketContext);
    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    if(userTransaction.normal_tickets.reduce((acc, curr) => acc + curr.amount, 0) === 0 || !currentUser){
        navigate(-1);
    }

    const hanldeBuyTicket = async () => {
        try{
            const res = await axiosClient.post('/transactions', {
                ...userTransaction,
                //fomarting js date into mysql DateTime
                buy_date: userTransaction.buy_date.toISOString().slice(0, 19).replace('T', ' '),
                exp_date: userTransaction.exp_date.toISOString().slice(0, 19).replace('T', ' ')
            }, {withCredentials: true})

            resetAll();

            //TODO: popup and then navigate back or smth
            navigate('/');
        }catch(e){
            console.log(e);
        }
    }

    return (
        <div className="normal_checkout">
            <TicketSum date={userTransaction.exp_date} addClass={'checkout'}/>

            <button onClick={hanldeBuyTicket} >Buy</button>
        </div>
    )
}

export default NormalCheckout

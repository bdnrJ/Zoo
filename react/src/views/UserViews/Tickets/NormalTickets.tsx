import { useContext, useState } from 'react';
import BackButton from '../../../components/BackButton'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TicketChooser from '../../../components/TicketChooser';
import TicketSum from '../../../components/TicketSum';
import { useNavigate } from 'react-router-dom';
import { TicketContext, transaction, normalTransactionTickets } from '../../../context/TicketContext';
import { AuthContext } from '../../../context/AuthContext';

export const NormalTickets = () => {
    //TODO exp_date needs to be in the transaction
    const {currentUser} = useContext(AuthContext);
    const {normalUserTickets, setNormalUserTickets, setNormalUserTransaction, normalUserTransaction} = useContext(TicketContext);
    const navigate = useNavigate();

    const handleAddition = (idx: number) => {
        const newTickets = normalUserTickets;
        const modifiedTicketIdx = normalUserTickets.findIndex((ticket) => ticket.id === idx);

        if(modifiedTicketIdx === -1){
            alert("cannot increase amount on a ticket that does not exist");
            return;
        }

        newTickets[modifiedTicketIdx].amount = Math.min(newTickets[modifiedTicketIdx].amount + 1, 10);
        setNormalUserTickets([...newTickets]);
    }

    const handleSubstitution = (idx: number) => {
        const newTickets = normalUserTickets;
        const modifiedTicketIdx = normalUserTickets.findIndex((ticket) => ticket.id === idx);

        if(modifiedTicketIdx === -1){
            alert("cannot decrease amount on a ticket that does not exist");
            return;
        }

        newTickets[modifiedTicketIdx].amount = Math.max(newTickets[modifiedTicketIdx].amount - 1, 0);
        setNormalUserTickets([...newTickets]);
    }

    const handleContiuneToCheckout = () => {
        //extract only api usefull data from userTickets to transactionTickets
        const normalTicketTransaction: normalTransactionTickets[] = normalUserTickets.map((ticket) => (
            {
                ticket_type_id: ticket.id,
                amount: ticket.amount
            }
            )).filter((transactionTicket) => transactionTicket.amount !== 0);

        if(normalTicketTransaction.length === 0){
            alert("To contiune you must at least have one ticket!");
        }


        const transaction: transaction ={
            buy_date: new Date(),
            exp_date: normalUserTransaction.exp_date,
            total_cost: 0,
            type: 'normal',
            items: normalTicketTransaction,
        }

        setNormalUserTransaction(transaction);
        navigate('/tickets/normal/checkout')
    }

    const setNormalTransactionDate = (date: Date) => {
        setNormalUserTransaction({...normalUserTransaction, exp_date: date})
    }


    //Date formating
    const dayOfWeek = normalUserTransaction.exp_date.toLocaleString('en-US', { weekday: 'long' });
    const month = normalUserTransaction.exp_date.toLocaleString('en-US', { month: 'long' });
    const dayOfMonth = normalUserTransaction.exp_date.toLocaleString('en-US', { day: 'numeric' });
    const year = normalUserTransaction.exp_date.getFullYear();
    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;
    return (
        <div className="normal">
            <div className="normal-title">
                <h1>Normal Tickets</h1>
            </div>
            <div className="normal-wrapper">
                <div className="backbtn">
                    <BackButton direction='/tickets' />
                </div>
                <div className="normal-buying">
                    <div className="normal-select">

                        <div className="normal-select-title">
                            <h3>You have chosen normal tickets. <br/>
                            Please complete your ticket details below.</h3>
                        </div>

                        <div className="normal-select-date">
                            <div className="normal-select-label">
                                <h4>Select date of visit</h4>
                            </div>
                            <DatePicker
                                minDate={new Date()}
                                selected={normalUserTransaction.exp_date}
                                onChange={(date: Date) => setNormalTransactionDate(date)}
                                value={formattedDate}
                                className='react-datepicker-pointer'
                            />
                        </div>

                        <div className="normal-select-tickets-wrapper">
                            <div className="normal-select-label">
                                <h4>Select Tickets</h4>
                            </div>
                            <div className="normal-select-tickets">
                                {normalUserTickets.map((ticket) => (
                                    <TicketChooser
                                        key={ticket.name}
                                        idx={ticket.id}
                                        amount={ticket.amount}
                                        title={ticket.name}
                                        ageInfo={ticket.age_info}
                                        price={ticket.price}
                                        handleAdd={handleAddition}
                                        handleSub={handleSubstitution}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="normal_tickets-cart">
                        <TicketSum date={normalUserTransaction.exp_date} ticketType='normal'/>
                    </div>
                </div>
            </div>
            {!currentUser
                ?   <label htmlFor="login_redirect" className='__orange-button-label --nt'>
                        <button name="login_redirect" onClick={() => navigate('/login')}>Log in to continue</button>
                    </label>
                :
                    <label htmlFor="normalCheckout" className='__orange-button-label --nt'>
                        <button
                            name='normalCheckout'
                            //disabled when no tickets are selected
                            //checked by calculating cost if(0) not selected
                            disabled={normalUserTickets.reduce((acc, curr) => acc + (curr.price * curr.amount), 0) === 0}
                            onClick={handleContiuneToCheckout}
                            >
                                Contiune
                        </button>
                    </label>
                }
        </div>
    )
}

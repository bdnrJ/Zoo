import React from 'react';
import { normalTicket } from '../views/AdminViews/TransactionPage';

type props = {
    ticket: normalTicket
}

const Ticket = ({ ticket }: props) => {
    const ticketInfo =
        ticket.ticket_type !== undefined ? (
        <>
            <div>Ticket Type: {ticket.ticket_type.name}</div>
            <div>Age Info: {ticket.ticket_type.age_info}</div>
            <div>Price: {ticket.ticket_type.price}</div>
            <div>Amount: {ticket.amount}</div>
        </>
        ) : (
        <>

        </>
        );

    return (
        <div className="tickettemp">
        <div>ID: {ticket.id}</div>
            {ticketInfo}
        </div>
    );
};

export default Ticket;

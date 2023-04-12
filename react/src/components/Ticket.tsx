import React from 'react';
import { groupTicket, normalTicket } from '../views/TransactionPage';

type props = {
    ticket: normalTicket | groupTicket
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
            <div>People: {ticket.people}</div>
            <div>Educational Materials: {ticket.educational_materials ? 'Yes' : 'No'}</div>
            <div>Guided Tour: {ticket.guided_tour ? 'Yes' : 'No'}</div>
            <div>Food Included: {ticket.food_included ? 'Yes' : 'No'}</div>
        </>
        );

    return (
        <div className="ticketxdd">
        <div>ID: {ticket.id}</div>
        {ticketInfo}
        </div>
    );
};

export default Ticket;

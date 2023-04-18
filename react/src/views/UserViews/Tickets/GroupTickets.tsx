import React, {useContext, useState} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import {TicketContext} from '../../../context/TicketContext';

export const GroupTickets = () => {
    //TODO amount needs to be either inside groupUserTicket or somwhere in the context, coz it's shit right now
    const {availableGroupTicket, userServices, setUserServices, groupUserTransaction, setGroupUserTransaction} = useContext(TicketContext);
    console.log(groupUserTransaction);
    const navigate = useNavigate();

    const handleContiuneToGroupCheckout = () => {
        const chosenServices = userServices.filter((service) => service.is_choosen === true).map((service) => ({
            service_type_id: service.id
        }))

        const finalUserGroupTransaction = {
            ...groupUserTransaction,
            services: chosenServices,
        }

        setGroupUserTransaction(finalUserGroupTransaction);

        navigate('/tickets/group/checkout');
    }

    const setGroupTransactionDate = (date: Date) => {
        setGroupUserTransaction({...groupUserTransaction, exp_date: date})
    }

    const setGroupTransactionTicketAmount = (people: number) => {
        setGroupUserTransaction({...groupUserTransaction, items: [{
            ticket_type_id: groupUserTransaction.items[0].ticket_type_id,
            amount: people
        }]})
    }

    //Date formating
    const dayOfWeek = groupUserTransaction.exp_date.toLocaleString('en-US', { weekday: 'long' });
    const month = groupUserTransaction.exp_date.toLocaleString('en-US', { month: 'long' });
    const dayOfMonth = groupUserTransaction.exp_date.toLocaleString('en-US', { day: 'numeric' });
    const year = groupUserTransaction.exp_date.getFullYear();
    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;

    if(availableGroupTicket.id === -1) return (
        <div className="group_tickets">
            <h1>No group tickets currently available</h1>
        </div>
    )

    const handleCheckboxChange = (index: number) => {
        const updatedServices = [...userServices];
        updatedServices[index].is_choosen = !updatedServices[index].is_choosen;
        setUserServices(updatedServices);
    };

    return (
        <div className="group_tickets">
            <form>
                <h2>Select Date</h2>
                <DatePicker
                    minDate={new Date()}
                    selected={groupUserTransaction.exp_date}
                    onChange={(date: Date) => setGroupTransactionDate(date)}
                    value={formattedDate}
                />
                People: {groupUserTransaction.items[0].amount}
                <br></br>
                <div className="group_tickets-people">
                    <div className="group_tickets-people-slider">
                    <input
                        type="range"
                        min="15"
                        max="50"
                        value={groupUserTransaction.items[0].amount}
                        onChange={(event) => setGroupTransactionTicketAmount(event.target.valueAsNumber)}
                    />
                    </div>
                    <div className="group_tickets-people-ticket">
                        <div className="people-ticket-counter">
                            {groupUserTransaction.items[0].amount}
                        </div>
                        <div className="people-ticket-info">
                            {availableGroupTicket.name + " $"+ availableGroupTicket.price}
                        </div>
                        <div className="people-ticket-controls">
                            <button>+</button>
                            <button>-</button>
                        </div>
                    </div>
                </div>
                <div className="group_tickets-services">
                    <h4>Services</h4>
                    {userServices.map((userService, idx) => (
                        <div className="group_tickets-services-service" key={userService.id}>
                            <div>
                                {userService.name}:
                                <input
                                    type="checkbox"
                                    checked={userService.is_choosen}
                                    onChange={() => handleCheckboxChange(idx)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </form>
                <button onClick={(e) => handleContiuneToGroupCheckout()} >Contiune</button>
        </div>
    )
}

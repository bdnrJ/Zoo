import React, { useContext, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { TicketContext } from '../../../context/TicketContext';
import TicketChooser from '../../../components/TicketChooser';
import TicketSum from '../../../components/TicketSum';
import BackButton from '../../../components/BackButton';
import { AuthContext } from '../../../context/AuthContext';
import Tooltip from '../../../components/Tooltip';
import { AiOutlineInfoCircle } from 'react-icons/ai';

export const GroupTickets = () => {
    //TODO amount needs to be either inside groupUserTicket or somwhere in the context, coz it's shit right now
    const { availableGroupTicket, userServices, setUserServices, groupUserTransaction, setGroupUserTransaction } = useContext(TicketContext);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!groupUserTransaction.items[0]) navigate('/tickets');

    if(availableGroupTicket === null) {
        return <div className="errorNotAvailable">
                    There are no group tickets currently available :(
                </div>
    }


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
        setGroupUserTransaction({ ...groupUserTransaction, exp_date: date })
    }

    const setGroupTransactionTicketAmount = (people: number) => {
        setGroupUserTransaction({
            ...groupUserTransaction, items: [{
                ticket_type_id: groupUserTransaction.items[0].ticket_type_id,
                amount: people
            }]
        })
    }

    const handleAdd = () => {
        setGroupUserTransaction({
            ...groupUserTransaction, items: [{
                ticket_type_id: groupUserTransaction.items[0].ticket_type_id,
                amount: groupUserTransaction.items[0].amount === 50 ? 50 : groupUserTransaction.items[0].amount + 1
            }]
        })
    }

    const hanldeSub = () => {
        setGroupUserTransaction({
            ...groupUserTransaction, items: [{
                ticket_type_id: groupUserTransaction.items[0].ticket_type_id,
                amount: groupUserTransaction.items[0].amount === 15 ? 15 : groupUserTransaction.items[0].amount - 1
            }]
        })
    }

    //Date formating
    const dayOfWeek = groupUserTransaction.exp_date.toLocaleString('en-US', { weekday: 'long' });
    const month = groupUserTransaction.exp_date.toLocaleString('en-US', { month: 'long' });
    const dayOfMonth = groupUserTransaction.exp_date.toLocaleString('en-US', { day: 'numeric' });
    const year = groupUserTransaction.exp_date.getFullYear();
    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;

    const handleCheckboxChange = (index: number) => {
        const updatedServices = [...userServices];
        updatedServices[index].is_choosen = !updatedServices[index].is_choosen;
        setUserServices(updatedServices);
    };

    return (
        <div className="group">
            <div className="group-title">
                <h1>Group Tickets</h1>
            </div>
            <div className="group-wrapper">
                <div className="backbtn">
                    <BackButton direction='/tickets' />
                </div>
                <div className="group-wrapper-buying">
                    <div className="group-select">
                        <div className="group-select-title">
                            <h3>
                                You have chosen group tickets. <br />
                                Please complete your ticket details below.
                            </h3>
                        </div>
                        <div className="group-select-date">
                            <div className="group-select-label">
                                <h4>Select date of visit</h4>
                            </div>
                            <DatePicker
                                minDate={new Date()}
                                selected={groupUserTransaction.exp_date}
                                onChange={(date: Date) => setGroupTransactionDate(date)}
                                value={formattedDate}
                                className='react-datepicker-pointer'
                            />
                        </div>
                        <div className="group-select-tickets">
                            <div className="group-select-tickets-wrapper">
                                <div className="group-select-label">
                                    <h4>Select Group Tickets</h4>
                                </div>
                                {groupUserTransaction.items[0] != undefined ? <TicketChooser
                                    key={availableGroupTicket.name}
                                    idx={availableGroupTicket.id}
                                    amount={groupUserTransaction.items[0].amount}
                                    title={availableGroupTicket.name}
                                    ageInfo={availableGroupTicket.age_info}
                                    price={availableGroupTicket.price}
                                    handleAdd={handleAdd}
                                    handleSub={hanldeSub}
                                /> : <p>Sorry, there are no group tickets available for now :(</p>}
                            </div>
                            <div className="group-select-services">
                                <div className="group-select-label">
                                    <h4>Select Services</h4>
                                </div>
                                {userServices.length > 0 ? userServices.map((userService, idx) => (
                                    <div className="group_tickets-services-service" key={userService.id}>
                                        <input
                                            type="checkbox"
                                            checked={userService.is_choosen}
                                            onChange={() => handleCheckboxChange(idx)}
                                        />
                                        <span className="service-name">{userService.name}</span>
                                        <span className="service-price">(${userService.price_per_customer} per customer)</span>
                                        <span className="service-info-icon">
                                            <Tooltip content={userService.description}>
                                                <AiOutlineInfoCircle className="service-info-icon"/>
                                            </Tooltip>
                                        </span>
                                    </div>
                                )) : <p>Sorry, there are no services available for now</p>}
                            </div>
                        </div>
                    </div>
                    <div className="group_tickets-cart">
                        <TicketSum date={groupUserTransaction.exp_date} ticketType='group' />
                    </div>
                </div>
            </div>
            <div className="group-buttons">
                {!currentUser
                    ? <label htmlFor="login_redirect" className='__orange-button-label --nt'>
                        <button name="login_redirect" onClick={() => navigate('/login')}>Log in to continue</button>
                    </label>
                    :
                    <label htmlFor="normalCheckout" className='__orange-button-label --nt'>
                        <button
                            name='normalCheckout'
                            //disabled when no tickets are selected
                            //checked by calculating cost if(0) not selected
                            onClick={handleContiuneToGroupCheckout}
                        >
                            Contiune
                        </button>
                    </label>
                }
            </div>
        </div>
    );
};

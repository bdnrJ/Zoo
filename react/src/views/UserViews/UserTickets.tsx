import React from 'react';
import BoughtTicketSum from '../../components/BoughtTicketSum';

const UserTransactions = () => {
    return (
        <div className="user-tickets">
            <div className="user-tickets-top">
                <h1>YOUR TICKETS</h1>
            </div>

            <div className="user-tickets-rest">
                <p className="rest-description">On the day of your visit, display your e-ticket at the ticket office before entering the zoo.</p>

                <div className="user-tickets-rest-ticketsums">
                    <h2>UPCOMING ZOO VISITS</h2>
                    <hr />
                    <div className="tickets-rest-ticketsums-blocks">
                        <BoughtTicketSum />
                        <BoughtTicketSum />
                        <BoughtTicketSum />
                        <BoughtTicketSum />
                    </div>
                </div>

                <div className="user-tickets-rest-ticketsums">
                    <h2>PREVIOUS TICKETS</h2>
                    <hr />
                    <div className="tickets-rest-ticketsums-blocks">
                        <BoughtTicketSum />

                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserTransactions;

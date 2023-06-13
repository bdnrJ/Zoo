import React, {useState, useEffect, useContext} from 'react';
import BoughtTicketSum from '../../components/BoughtTicketSum';
import axiosClient from '../../axios-client';
import { LoadingContext } from '../../context/LoadingContext';

type serviceType = {
    name: string,
    price_per_customer: number,
}

type service = {
    service_type: serviceType
}

type ticketType = {
    name: string,
    price: number
}

export type ticket = {
    amount: number,
    ticket_type: ticketType
}

type transaction = {
    exp_date: string,
    services: service[],
    tickets: ticket[],
    total_cost: number,
    type: string,
}


const UserTransactions = () => {
    const [currentTransactions, setCurrentTransactions] = useState<transaction[]>([]);
    const [previousTransactions, setPreviousTransactions] = useState<transaction[]>([]);
    const {setLoading} = useContext(LoadingContext);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axiosClient.get('/transactions-user', { withCredentials: true });

                const now = new Date();
                now.setHours(0, 0, 0, 0); // set to start of day
                const tomorrow = new Date(now);
                tomorrow.setHours(23, 59, 59, 999); // set to end of day

                const upcomingTickets = res.data.filter((transaction: transaction) => new Date(transaction.exp_date) >= now);
                const pastTickets = res.data.filter((transaction: transaction) => new Date(transaction.exp_date) < now);

                setCurrentTransactions(upcomingTickets);
                setPreviousTransactions(pastTickets);
                setLoading(true);
            } catch (err) {
                setLoading(false);
                console.error(err);
            }
        };

        fetchData();
    }, []);


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
                        {currentTransactions.length === 0 ? <p>There are no current transactions</p> :
                            currentTransactions.map((transaction: transaction) => (
                                <BoughtTicketSum
                                    exp_date={transaction.exp_date}
                                    tickets={transaction.tickets}
                                    total_cost={transaction.total_cost}
                                    type={transaction.type}
                                    services={transaction.services}
                                    isPrevious={false}
                                />
                            ))
                        }
                    </div>
                </div>

                <div className="user-tickets-rest-ticketsums">
                    <h2>PREVIOUS TICKETS</h2>
                    <hr />
                    <div className="tickets-rest-ticketsums-blocks">
                        {previousTransactions.length === 0 ? <p>There are no previous transactions</p> :
                            previousTransactions.map((transaction: transaction) => (
                                <BoughtTicketSum
                                    exp_date={transaction.exp_date}
                                    tickets={transaction.tickets}
                                    total_cost={transaction.total_cost}
                                    type={transaction.type}
                                    services={transaction.services}
                                    isPrevious={true}
                                />
                            ))
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserTransactions;

import { useState, useEffect } from 'react';
import Ticket from '../../components/Ticket';
import axiosClient from '../../axios-client';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';

type user = {
    id: number,
    firstname: string,
    lastname: string,
    email: string
}

type displayTransaction = {
    id: number,
    buy_date: string,
    exp_date: string,
    user_id: string,
    total_cost: number,
    type: string,
}

export type normalTicket = {
    id: number,
    amount: number,
    ticket_type_id: number,
    transaction_id: number,
    ticket_type: normalTicketType
}

type normalTicketType = {
    id: number,
    name: string,
    price: number,
    age_info: string,
}

type serviceType = {
    id: number,
    is_active: boolean,
    name: string,
    price_per_customer: number,
    type: string
}

type service = {
    id: number,
    service_type: serviceType,
    service_type_id: number,
    transaction_id: number,
}


const TransactionPage = () => {
    const [transaction, setTransaction] = useState<displayTransaction>();
    const [tickets, setTickets] = useState<normalTicket[]>([]);
    const [user, setUser] = useState<user>();
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState<service[]>([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchTransaction = async () => {
            setLoading(true);
            const response = await axiosClient.get(`/transactions/${id}`, {withCredentials: true});
            setTransaction(response.data.transaction);
            setTickets(response.data.tickets);
            setUser(response.data.transaction.user);
            setServices(response.data.services);
            setLoading(false);
        };

    fetchTransaction();
    }, [id]);

    if (loading) {
        return <div>Loading transaction...</div>;
    }

    const userDivs = (
        <div>
            <ul>
                <li>User ID: {user?.id}</li>
                <li>User Email: {user?.email}</li>
                <li>User Firstname: {user?.firstname}</li>
                <li>User Lastname: {user?.lastname}</li>
            </ul>
            <br />
        </div>
    );

    const transactionDivs = (
        <div>
            <ul>
                <li>Transaction ID: {transaction?.id}</li>
                <li>Buy Date: {transaction?.buy_date}</li>
                <li>Exp Date: {transaction?.exp_date}</li>
                <li>Total Cost: {transaction?.total_cost.toFixed(2)}</li>
                <li>Type: {transaction?.type}</li>
                <br />
        </ul>
        </div>
    );

    const ticketDivs = tickets.map((ticket: normalTicket) => (
        <li key={ticket.id}>
            <Ticket ticket={ticket} />
            <span>Total Cost: ${(ticket.amount * ticket.ticket_type.price).toFixed(2)}</span>
        </li>
    ));

    return (
        <div className="transaction-page" style={{marginTop: "100px"}}>
            <BackButton direction=''/>
            <div className="user-info">
                USER:
                {userDivs}
            </div>

            <div className="transaction-info">
                TRANSACTION:
                {transactionDivs}
            </div>

            <div className="ticketss">
                TICKET:
                <ul>{ticketDivs}</ul>
            </div>

            { services.length !== 0 &&
            <div className="services">
                SERVICES
                <ol>
                    {services.map((service) => (
                        <li>
                            <span style={{display: "block"}}>Service name: {service.service_type.name}</span>
                            <span style={{display: "block"}}>Price per customer: ${service.service_type.price_per_customer}</span>
                            <span>Total cost: ${(service.service_type.price_per_customer * tickets[0].amount).toFixed(2)}</span>
                        </li>
                    ))}
                </ol>
            </div>
            }

            {/* <button onClick={() => console.log(transaction)}>show transaction</button>
            <button onClick={() => console.log(tickets)}>show tickets</button>
            <button onClick={() => console.log(user)}>show user</button> */}

        </div>
    );
    };

export default TransactionPage;

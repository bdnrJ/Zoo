import { useState, useEffect } from 'react';
import Ticket from '../../components/Ticket';
import axiosClient from '../../axios-client';
import { useParams } from 'react-router-dom';

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

export type groupTicket = {
    educational_materials: boolean
    food_included: boolean
    guided_tour: boolean
    id: number
    people: number
    transaction_id: number
    ticket_type: undefined
}

const TransactionPage = () => {
    const [transaction, setTransaction] = useState<displayTransaction>();
    const [tickets, setTickets] = useState<normalTicket[]>([]);
    const [user, setUser] = useState<user>();
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        const fetchTransaction = async () => {
            setLoading(true);
            const response = await axiosClient.get(`/transaction/${id}`, {withCredentials: true});
            console.log(response.data);
            setTransaction(response.data.transaction);
            setTickets(response.data.tickets);
            setUser(response.data.transaction.user);
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
                <li>Total Cost: {transaction?.total_cost}</li>
                <li>Type: {transaction?.type}</li>
                <br />
        </ul>
        </div>
    );

    const ticketDivs = tickets.map((ticket: normalTicket) => (
        <li key={ticket.id}>
        <Ticket ticket={ticket} />
        </li>
    ));

    return (
        <div className="transaction-page" style={{marginTop: "100px"}}>

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

            <button onClick={() => console.log(transaction)}>show transaction</button>
            <button onClick={() => console.log(tickets)}>show tickets</button>
            <button onClick={() => console.log(user)}>show user</button>

        </div>
    );
    };

export default TransactionPage;

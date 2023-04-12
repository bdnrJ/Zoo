import { useState, useEffect } from 'react';
import Ticket from '../components/Ticket';
import axiosClient from '../axios-client';
import { useParams } from 'react-router-dom';

const TransactionPage = () => {
    const [transaction, setTransaction] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        const fetchTransaction = async () => {
            setLoading(true);
            const response = await axiosClient.get(`/transaction/${id}`, {withCredentials: true});
            setTransaction(response.data.transaction);
            setTickets(response.data.tickets);
            setLoading(false);
        };

    fetchTransaction();
    }, [id]);

    if (loading) {
        return <div>Loading transaction...</div>;
    }

    const userDivs = (
        <div>
            USER
            <ul>
                <li>User ID: {transaction.user.id}</li>
                <li>User Email: {transaction.user.email}</li>
                <li>User Firstname: {transaction.user.firstname}</li>
                <li>User Lastname: {transaction.user.lastname}</li>
            </ul>
            <br />
        </div>
    );

    const transactionDivs = (
        <div>
            TRANSACITON
            <ul>
                <li>Transaction ID: {transaction.id}</li>
                <li>Buy Date: {transaction.buy_date}</li>
                <li>Exp Date: {transaction.exp_date}</li>
                <li>Total Cost: {transaction.total_cost}</li>
                <li>Type: {transaction.type}</li>
                <br />
        </ul>
        </div>
    );

    const ticketDivs = tickets.map((ticket) => (
        <li key={ticket.id}>
        <Ticket ticket={ticket} />
        </li>
    ));

    return (
        <div className="transaction-page" style={{marginTop: "100px"}}>

            <div className="user-info">
                {userDivs}
            </div>

            <div className="transaction-info">
                {transactionDivs}
            </div>

            <div className="ticketss">
                <ul>{ticketDivs}</ul>
            </div>
        </div>
    );
    };

export default TransactionPage;

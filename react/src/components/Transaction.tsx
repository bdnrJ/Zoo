import React from 'react';
import { Link } from 'react-router-dom';

const Transaction = ({ transaction }) => {
    return (
        <Link to={`/admin/transactionPage/${transaction.id}`} style={{ textDecoration: 'none' }}>
            <div className="transaction">
                <div>ID: {transaction.id}</div>
                <div>Buy Date: {transaction.buy_date}</div>
                <div>Exp Date: {transaction.exp_date}</div>
                <div>User Email: {transaction.user.email}</div>
                <div>Total Cost: {transaction.total_cost}</div>
                <div>Type: {transaction.type}</div>
            </div>
        </Link>
    );
};

export default Transaction;

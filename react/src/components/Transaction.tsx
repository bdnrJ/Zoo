import React from 'react';

const Transaction = ({ transaction }) => {
    return (
        <div className="transaction">
            <div>ID: {transaction.id}</div>
            <div>Buy Date: {transaction.buy_date}</div>
            <div>Exp Date: {transaction.exp_date}</div>
            <div>User Email: {transaction.user.email}</div>
            <div>Total Cost: {transaction.total_cost}</div>
            <div>Type: {transaction.type}</div>
        </div>
    );
};

export default Transaction;

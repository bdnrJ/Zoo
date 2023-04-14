import React from 'react';
import { Link } from 'react-router-dom';
import { displayTransaction } from '../views/AdminViews/Transactions';

type props = {
    transaction: displayTransaction
}

const Transaction = ({ transaction }: props) => {
    return (
        <Link to={`/admin/transaction_page/${transaction.id}`} style={{ textDecoration: 'none' }}>
            <div className="transaction">
                <div>ID: {transaction.id}</div>
                <div>Buy Date: {transaction.buy_date.substring(0, transaction.buy_date.length - 8)}</div>
                <div>Exp Date: {transaction.exp_date.substring(0, transaction.buy_date.length - 8)}</div>
                {transaction.user &&<div>User Email: {transaction.user.email}</div>}
                <div>Total Cost: {transaction.total_cost}</div>
                <div>Type: {transaction.type}</div>
            </div>
        </Link>
    );
};

export default Transaction;

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
                <div className="transaction-left">
                    <div className='__font-black'> <span className='__font-grey'>#</span> {transaction.id}</div>
                    <div className='column'><span className='__font-grey'>Buy Date:</span>{transaction.buy_date.substring(0, transaction.buy_date.length - 8)}</div>
                    <div className='column'><span className='__font-grey'>Exp Date:</span> {transaction.exp_date.substring(0, transaction.buy_date.length - 8)}</div>
                </div>
                <div className="transaction-right">
                    {transaction.user && <div className='column' ><span className='__font-grey' >User:</span>{transaction.user.email}</div>}
                    <div className='column'><span className='__font-grey'>Total Cost:</span> ${transaction.total_cost}</div>
                    <div className='column'><span className='__font-grey'>Type:</span> {transaction.type}</div>
                </div>
            </div>
        </Link>
    );
};

export default Transaction;

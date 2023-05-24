import React from 'react';
import { Link } from 'react-router-dom';
import { user } from '../views/AdminViews/UserPage';

type Donation = {
    id: number;
    donor_name: string;
    donor_email: string;
    user_id: number;
    amount: number;
    donated_at: string;
    user?: {
        firstname: string;
        lastname: string;
        email: string;
    }
}

type Props = {
    donation: Donation,
    user?: user
}

const UserDonation = ({ donation, user }: Props) => {
    return (
        <div className="donation">
            <div className="donation-left">
                <div className='__font-black'> <span className='__font-grey'>#</span> {donation.id}</div>
                <div className='column'><span className='__font-grey'>Donor Name:</span>{user ? user.firstname + ' ' + user.lastname : donation.donor_name}</div>
                <div className='column'><span className='__font-grey'>Donated At:</span>{donation.donated_at.substring(0, donation.donated_at.length - 8)}</div>
            </div>
            <div className="donation-right">
                <div className='column'><span className='__font-grey'>Donor Email:</span> {user ? user.email : donation.donor_email}</div>
                <div className='column'><span className='__font-grey'>Amount:</span> ${donation.amount}</div>
            </div>
        </div>
    );
};

export default UserDonation;

// MyDonation.tsx
import React from 'react';
import { Donation } from '../views/MyDonations';

type MyDonationProps = {
  donation: Donation;
}

const MyDonation: React.FC<MyDonationProps> = ({ donation }) => {
  return (
    <div className="donation-item">
      <div className="donation-item-id">Donation ID: {donation.id}</div>
      <div className="donation-item-date">Donated At: {new Date(donation.donated_at).toLocaleDateString()}</div>
      <div className="donation-item-amount">Amount: ${donation.amount}</div>
    </div>
  )
}

export default MyDonation;

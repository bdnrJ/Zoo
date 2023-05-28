import React, { useContext, useEffect, useState } from 'react'
import axiosClient from '../axios-client';
import MyDonation from '../components/MyDonation';
import { TicketContext } from '../context/TicketContext';

export type Donation = {
    id: number;
    donated_at: string;
    amount: string;
    user_id: number;
}

const MyDonations = () => {
    const [donations, setDonations] = useState<Donation[]>([]);
    const { discount } = useContext(TicketContext);

    const fetchDonations = async () => {
        try {
            const res = await axiosClient.get('/donations/user', { withCredentials: true });

            console.log(res);

            setDonations(res.data);
        } catch (err: any) {
            console.log(err);
        }
    }

    const getTotalDonation = () => {
        return donations.reduce((total, donation) => total + parseFloat(donation.amount), 0);
    }

    useEffect(() => {
        fetchDonations();
    }, [])

    return (
        <div className="mydonations">
            <div className="mydonations-top">
                <h1>YOUR DONATIONS</h1>
            </div>
            <div className="mydonations-bottom">
                <div className="mydonations-bottom-total">
                    <h2>Total Donated: ${getTotalDonation().toFixed(2)}</h2>
                    {discount > 0 && <h2>You have a discount of {discount}% when making future transactions</h2>}
                </div>
                <div className="mydonations-bottom-list">
                    <h2>Your donations</h2>
                    <div className="mydonations-bottom-list-wrapper">
                        {
                            donations.map((donation) => (
                                <MyDonation key={donation.id} donation={donation} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyDonations

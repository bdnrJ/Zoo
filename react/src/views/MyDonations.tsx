import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client';

const MyDonations = () => {
    const [donations, setDonations] = useState<any>([]);

    const fetchDonations = async () => {
        try{
            const res = await axiosClient.get('/donations/user', {withCredentials: true});

            console.log(res);

            setDonations(res.data);
        }catch(err: any){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchDonations();
    }, [])

    return (
        <div className="mydonations">
            <div className="mydonations-top">
                <h1>YOUR DONATIONS</h1>
            </div>
            <div className="mydonations-list">
                {
                    donations?.map((donation: any) => (
                        <div className="donation">
                            {donation.id}
                            {donation.donated_at}
                            {donation.user_id}
                            {donation.amount}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MyDonations

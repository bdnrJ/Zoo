import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';
import { displayTransaction } from '../AdminViews/Transactions';
import Transaction from '../../components/Transaction';

type user = {
    firstname: string,
    lastname: string,
    email: string
    created_at: string
    transactions: displayTransaction[]
}

const UserPersonalPage = () => {

    const [user, setUser] = useState<user>();

    const fetchUser = async () => {
        try {
            const res = await axiosClient.get(`/users_unauth`, {withCredentials: true});
            setUser(res.data)
            console.log(res);

        }catch(err:any){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <div className="personal">
            <div className="personal-top">
                <h1>MY PROFILE</h1>
            </div>
            <div className="personal-rest">
                <div className="personal-rest-user">
                    <h2>Account data</h2>
                    <div className="rest-user-block">
                            <span>Name</span>
                        <div className="rest-user-block-wrapper">
                            <div className="rest-user-block-data">
                                {user?.firstname + " " + user?.lastname}
                            </div>
                            <div className="rest-user-block-button">
                                <button>change</button>
                            </div>
                        </div>
                    </div>
                    <div className="rest-user-block">
                            <span>Email</span>
                        <div className="rest-user-block-wrapper">
                            <div className="rest-user-block-data">
                                {user?.email}
                            </div>
                            <div className="rest-user-block-button">
                                <button>change</button>
                            </div>
                        </div>
                    </div>
                    <div className="rest-user-block">
                            <span>Password</span>
                        <div className="rest-user-block-wrapper">
                            <div className="rest-user-block-data">
                                ********
                            </div>
                            <div className="rest-user-block-button">
                                <button>change</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="personal-rest-cookies">
                    <span>
                        Information about cookies
                        <br />
                        The ZOO website uses cookies - these are small text information that is saved and stored on your device.
                        Cookies are primarily used to optimize the use of the website and for statistical purposes.
                        <br />
                        We store cookies on your device to access information in order to:
                        remember selected settings, adapting the content of the website to your needs, properly display the page adapted to your device,
                        remembering the history of visited pages, creating anonymous statistics that help improve the website, ensure security.
                    </span>
                </div>
            </div>
        </div>
        // <div className="personal">
        //     Personal
        //     {/* TODO change pwd, change email after providing password into popups i guess */}
        //     <button>change password</button>
        //     <button>change email</button>
        //     <div className="personal-userinfo">
        //         {
        //             <ul>
        //                 <li>{ user?.lastname }</li>
        //                 <li>{ user?.firstname }</li>
        //                 <li>{ user?.email }</li>
        //             </ul>
        //         }
        //     </div>
        //     <div className="personal_transactions">
        //         <h1>My transactions</h1>
        //         <ul>
        //         {user?.transactions.map((transaction) => (
        //         <li key={transaction.id}>
        //             <Transaction transaction={transaction} />
        //         </li>
        //         ))}
        //     </ul>
        //     </div>
        // </div>
    )
}

export default UserPersonalPage

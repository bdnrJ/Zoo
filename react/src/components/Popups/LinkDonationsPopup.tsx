import React, { useContext, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axiosClient from '../../axios-client'
import SuccessPopupTemplate from './SuccessPopupTemplate'
import { LoadingContext } from '../../context/LoadingContext'

type props = {
    user: any
}

const LinkDonationsPopup = ({user}: props) => {
    const navigate = useNavigate();
    const [isSuccessPopupOn, setIsSuccessPopupOn] = useState<boolean>(false);
    const [isErrorPopupOn, setIsErrorPopupOn] = useState<boolean>(false);
    const {setLoading} = useContext(LoadingContext);


    const handleLinkDonations = async () => {
        try{
            setLoading(true);
            const resposne = await axiosClient.post('/link-donations', {
                user_id: user.id,
                email: user.email,
            });
            setIsSuccessPopupOn(true);
            setLoading(false);
        }catch(err: any){
            setLoading(false);
            setIsErrorPopupOn(true);
        }
    }

  return (
    <div className="link_donations">
        <h1 className='link_donations-title'>Welcome!</h1>
        <p>We noticed that the email you used for registration was also used previously for anonymous donations to our foundation. If these donations were made by you and you would like them to be linked to your newly created account, please confirm. <br /> This will provide you with an overview and control of your past and future donations.  <br /> However, if you did not make these donations or wish to keep them separate from this account, please choose 'No'. Thank you for your ongoing support!</p>
        <div className="link_donations-buttons">
            <button className='link_donations-buttons-cancel' onClick={() => navigate('/')}>No</button>
            <button className='link_donations-buttons-confirm' onClick={() => handleLinkDonations()} >Confirm</button>
        </div>
        {isSuccessPopupOn &&
            <SuccessPopupTemplate text='Donations have been linked to your account successfully!' closePopup={() => navigate('/')}/>
        }
        {isErrorPopupOn &&
            <SuccessPopupTemplate text='Sorry there was an issue while trying to link your donations, please contact us via email' closePopup={() => navigate('/')}/>
        }
    </div>
  )
}

export default LinkDonationsPopup

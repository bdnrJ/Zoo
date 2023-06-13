import React, { useContext, useState } from 'react'
import { TicketContext } from '../../../context/TicketContext'
import axiosClient from '../../../axios-client'
import { useNavigate } from 'react-router-dom'
import TicketSum from '../../../components/TicketSum'
import BackButton from '../../../components/BackButton'

import applepay from '../../../assets/payment/applepay.png'
import gpay from '../../../assets/payment/gpay.png'
import maestro from '../../../assets/payment/maestro.png'
import mastercard from '../../../assets/payment/mastercard.png'
import paypal from '../../../assets/payment/paypal.png'
import paysafe from '../../../assets/payment/paysafe.png'
import visa from '../../../assets/payment/visa.png'
import PopupForm from '../../../components/Popups/PopupForm'
import BuyingSuccessPopup from '../../../components/Popups/BuyingSuccessPopup'
import { LoadingContext } from '../../../context/LoadingContext'

const GroupCheckout = () => {
    const {groupUserTransaction, resetAllGroup} = useContext(TicketContext);
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const handleImageClick = (index: number) => {
        setActiveIndex(index);
    };
    const [checkbox1, setCheckbox1] = useState<boolean>(false);
    const [checkbox2, setCheckbox2] = useState<boolean>(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
    const {setLoading} = useContext(LoadingContext);


    const isBuyButtonDisabled = activeIndex === -1 || !checkbox1 || !checkbox2;
    const navigate = useNavigate();
    const images = [paypal, applepay, gpay, paysafe, mastercard, maestro, visa];

    const onBuy = async () => {
        const groupTransaction = {
            buy_date: groupUserTransaction.buy_date.toISOString().slice(0, 19).replace('T', ' '),
            exp_date: groupUserTransaction.exp_date.toISOString().slice(0, 19).replace('T', ' '),
            type: groupUserTransaction.type,
            items: groupUserTransaction.items,
            services: groupUserTransaction.services,
        }

        try{
            setLoading(true);
            const res = await axiosClient.post('/transactions',
            {
                ...groupTransaction
            },
            {withCredentials: true});
            setLoading(false);
            setShowSuccessPopup(true);
        }catch(err){
            setLoading(false);
        }
    }

    const closePopup = () => {
        setShowSuccessPopup(false);
        navigate('/');
        resetAllGroup();
    }

    return (
        <div className="checkout">
            <div className="checkout-title">
                GROUP TICKET CHECKOUT
            </div>
            <div className="checkout-wrapper">
                <div className="backbtn">
                        <BackButton direction='/tickets/group' />
                </div>
                <div className="checkout-buying">
                    <div className="checkout-buying-left">

                        <div className="checkout-buying-left-title">
                            You have choosen normal tickets<br />
                            Please choose your payment method
                        </div>

                        <div className="checkout-buying-left-payment">
                            <div className="buying-left-payment-options">
                            {images.map((image, idx) => (
                                <div
                                    key={idx}
                                    className={`left-payment-options-payment${idx === activeIndex ? ' --active' : ''}`}
                                    onClick={() => handleImageClick(idx)}
                                    >
                                    <img src={image} alt="payment method" />
                                </div>
                            ))}
                            </div>
                            <div className="buying-left-payment-desc">
                                After selecting the payment method and proceeding, you will be redirected to the operator's website
                            </div>
                        </div>

                        <div className="checkout-buying-left-info">
                            The recipients of your personal data may be entities cooperating with internet payment operators in the payment process.
                            Depending on the payment method you choose, these may be: banks, payment institutions, loan institutions, payment card organizations,
                            payment schemes), and entities supporting the activities of operators, i.e. IT infrastructure providers, providers of payment
                            risk analysis tools, as well as entities authorized to their receipt under applicable law, including the competent judicial authorities.
                             Your data may be made available to merchants to inform them about the status of the payment. You have the right to access data, as well
                             as to rectify them, limit their processing, object to their processing, not to be subject to automated decision-making, including profiling,
                             and to transfer and delete data. Providing data is voluntary, however, it is necessary to process the payment, and failure to provide data may
                             result in the payment being rejected. More information about the rules of processing your personal data by operators can be found in the Privacy Policy.
                        </div>
                        <div className="checkout-buying-left-checkboxes">
                            <span>
                                <input type="checkbox" checked={checkbox1} onChange={() => setCheckbox1(!checkbox1)}  />
                                *I accept the terms.
                                I want to receive a VAT invoice. I have read and accept the regulations of the facility.
                                I consent to the processing of my personal data for purposes related to participation in events or facilities for which tickets are sold,
                                 as well as for marketing and statistical purposes.
                            </span>
                            <span>
                                <input type="checkbox" checked={checkbox2} onChange={() => setCheckbox2(!checkbox2)}  />
                                *I agree to share my personal data with partners in order to receive commercial information from them, by
                                e-mail to the e-mail address provided in the form.
                                The administrator of your personal data in connection with the correspondence is the operator. You have the
                                right to access your data and the right to request their rectification, objection, deletion or limitation of
                                their processing, as well as the right to lodge a complaint to the President of the Office for Personal Data Protection
                            </span>
                            <span>
                                <input type="checkbox" />
                                I consent to the sending of commercial information to the e-mail address indicated in the form for purposes related
                                to participation in events or facilities for which tickets are sold, competitions or promotional and marketing campaigns organized by it.
                            </span>
                            <div className="checkout-buying-left-required">
                                *  Required
                            </div>
                        </div>
                    </div>
                    <div className="checkout-buying-right">
                        <TicketSum date={groupUserTransaction.exp_date} addClass={'group'} ticketType='group'/>
                    </div>
                </div>
            </div>
            <label htmlFor="buying" className={`__orange-button-label --nt ${isBuyButtonDisabled && "--disabled"}`}>
                <button name="buying" onClick={onBuy} disabled={isBuyButtonDisabled} >Buy</button>
            </label>
            {isBuyButtonDisabled &&
                <span>To contiune you must choose payment method, and confirm * required fields</span> }
            {showSuccessPopup && (
                <PopupForm closePopup={closePopup} >
                    <BuyingSuccessPopup closePopup={closePopup} ticketType='group' exp_date={groupUserTransaction.exp_date} />
                </PopupForm>
            )}
        </div>
    )
}

export default GroupCheckout

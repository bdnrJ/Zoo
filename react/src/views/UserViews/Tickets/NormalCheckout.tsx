import { useContext, useState } from 'react'
import { TicketContext } from '../../../context/TicketContext'
import TicketSum from '../../../components/TicketSum'
import axiosClient from '../../../axios-client'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import BackButton from '../../../components/BackButton'

import applepay from '../../../assets/payment/applepay.png'
import gpay from '../../../assets/payment/gpay.png'
import maestro from '../../../assets/payment/maestro.png'
import mastercard from '../../../assets/payment/mastercard.png'
import paypal from '../../../assets/payment/paypal.png'
import paysafe from '../../../assets/payment/paysafe.png'
import visa from '../../../assets/payment/visa.png'

const NormalCheckout = () => {
    const {normalUserTransaction, resetAllNormal} = useContext(TicketContext);
    const {currentUser} = useContext(AuthContext);
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const handleImageClick = (index: number) => {
        setActiveIndex(index);
    };
    const navigate = useNavigate();
    const images = [paypal, applepay, gpay, paysafe, mastercard, maestro, visa];

    if(normalUserTransaction.items.reduce((acc, curr) => acc + curr.amount, 0) === 0 || !currentUser){
        navigate(-1);
    }

    const hanldeBuyTicket = async () => {
        try{
            const res = await axiosClient.post('/transactions', {
                ...normalUserTransaction,
                //fomarting js date into mysql DateTime
                buy_date: normalUserTransaction.buy_date.toISOString().slice(0, 19).replace('T', ' '),
                exp_date: normalUserTransaction.exp_date.toISOString().slice(0, 19).replace('T', ' ')
            }, {withCredentials: true})

            resetAllNormal();

            //TODO: popup and then navigate back or smth
            navigate('/');
        }catch(e){
            console.log(e);
        }
    }

    return (
        <div className="checkout">
            <div className="checkout-title">
                NORMAL TICKETS CHECKOUT
            </div>
            <div className="checkout-wrapper">
                <div className="backbtn">
                        <BackButton direction='/tickets/normal' />
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
                            The recipients of your personal data may be entities cooperating with internet payment operators in the payment process. Depending on the payment method you choose, these may be: banks, payment institutions, loan institutions, payment card organizations, payment schemes), and entities supporting the activities of operators, i.e. IT infrastructure providers, providers of payment risk analysis tools, as well as entities authorized to their receipt under applicable law, including the competent judicial authorities. Your data may be made available to merchants to inform them about the status of the payment. You have the right to access data, as well as to rectify them, limit their processing, object to their processing, not to be subject to automated decision-making, including profiling, and to transfer and delete data. Providing data is voluntary, however, it is necessary to process the payment, and failure to provide data may result in the payment being rejected. More information about the rules of processing your personal data by operators can be found in the Privacy Policy.
                        </div>
                        <div className="checkout-buying-left-checkboxes">
                            <span>
                                <input type="checkbox" />
                                *I accept the terms.
                                I want to receive a VAT invoice. I have read and accept the regulations of the facility.
                                I consent to the processing of my personal data for purposes related to participation in events or facilities for which tickets are sold, as well as for marketing and statistical purposes.
                            </span>
                            <span>
                                <input type="checkbox" />
                                *I agree to share my personal data with partners in order to receive commercial information from them, by e-mail to the e-mail address provided in the form.
                                The administrator of your personal data in connection with the correspondence is the operator. You have the right to access your data and the right to request their rectification, objection, deletion or limitation of their processing, as well as the right to lodge a complaint to the President of the Office for Personal Data Protection
                            </span>
                            <span>
                                <input type="checkbox" />
                                I consent to the sending of commercial information to the e-mail address indicated in the form for purposes related to participation in events or facilities for which tickets are sold, competitions or promotional and marketing campaigns organized by it.
                            </span>
                            <div className="checkout-buying-left-required">
                                *  Required
                            </div>
                        </div>
                    </div>
                    <div className="checkout-buying-right">
                        <TicketSum date={normalUserTransaction.exp_date} addClass={'checkout'} ticketType='normal'/>
                    </div>
                </div>
            </div>
            <label htmlFor="buying" className='__orange-button-label --nt'>
                <button name="buying" onClick={hanldeBuyTicket} >Buy</button>
            </label>
        </div>
    )
}

export default NormalCheckout

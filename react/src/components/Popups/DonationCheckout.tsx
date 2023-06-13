import React, { useContext, useState } from "react";

import applepay from "../../assets/payment/applepay.png";
import gpay from "../../assets/payment/gpay.png";
import maestro from "../../assets/payment/maestro.png";
import mastercard from "../../assets/payment/mastercard.png";
import paypal from "../../assets/payment/paypal.png";
import paysafe from "../../assets/payment/paysafe.png";
import visa from "../../assets/payment/visa.png";
import { TicketContext } from "../../context/TicketContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axiosClient from "../../axios-client";
import SuccessPopupTemplate from "./SuccessPopupTemplate";
import { LoadingContext } from "../../context/LoadingContext";

const DonationCheckout = () => {
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const [termsChecked, setTermsChecked] = useState<boolean>(false);
    const [policyChecked, setPolicyChecked] = useState<boolean>(false);
    const [isSuccessPopupOn, setIsSuccessPopupOn] = useState<boolean>(false);
    const [isFailurePopupOn, setIsFailurePopupOn] = useState<boolean>(false);
    const {currentUser} = useContext(AuthContext);
    const { donationAmount, donorName, donorEmail, setDonationAmount, setDonorEmail, setDonorName } = useContext(TicketContext);
    const images = [paypal, applepay, gpay, paysafe, mastercard, maestro, visa];
    const navigate = useNavigate();
    const {setLoading} = useContext(LoadingContext);

    if (donationAmount < 5 || Number.isNaN(donationAmount)) {
        navigate("/");
    }

    const handleImageClick = (index: number) => {
        setActiveIndex(index);
    };

    const handleResetDonationInfo = () => {
        setDonationAmount(NaN);
        setDonorName("");
        setDonorEmail("");
    }

    const handleClose = () => {
        handleResetDonationInfo();
        setIsSuccessPopupOn(false);
        navigate('/');
    }

    const handleBuyTicket = async (e: any) => {
        e.preventDefault();

        try{
            setLoading(true);
            if(currentUser){
                const res = await axiosClient.post('/donations/auth', {
                    'amount': donationAmount
                }, {withCredentials: true})

                setIsSuccessPopupOn(true);
            }else{
                const res = await axiosClient.post('/donations/anon', {
                    'amount': donationAmount,
                    'donor_name': donorName,
                    'donor_email': donorEmail
                })
                setIsSuccessPopupOn(true);
            }
            setLoading(false);
        }catch(err: any){
            setLoading(false);
            setIsFailurePopupOn(true);
        }
    };

    const isBuyButtonDisabled =
        activeIndex === -1 || !termsChecked || !policyChecked;


        return (
        <div className="donation_checkout">
            <h1>Donation Checkout</h1>
            <div className="donation_summary">
                <p>You're about to donate ${donationAmount}</p>
                <p> Thank you for your generosity!</p>
                <div className="donation_summary-donor">
                {currentUser ?
                (<span>
                    <p>Donor name will be registered as: {currentUser.firstname + " " + currentUser.lastname}</p>
                    <p>Email: {currentUser.email}</p>
                </span>)
                :<span>
                    <p>Donor name will be registered as: {donorName}</p>
                    <p>Email: {donorEmail}</p>
                </span>
                }

                </div>
            </div>
            <div className="payment_methods">
                <h2>Select a payment method</h2>
                <div className="payment_methods-wrapper">
                    {images.map((image, idx) => (
                        <div
                            key={idx}
                            className={`left-payment-options-payment${
                                idx === activeIndex ? " --active" : ""
                            }`}
                            onClick={() => handleImageClick(idx)}
                        >
                            <img src={image} alt="payment method" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="agreements">
                <label htmlFor="terms">
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={termsChecked}
                        onChange={() => setTermsChecked(!termsChecked)}
                    />
                    <p>
                        *I agree to share my personal data with partners in
                        order to receive commercial information from them, by
                        e-mail to the e-mail address provided in the form. The
                        administrator of your personal data in connection with
                        the correspondence is the operator. You have the right
                        to access your data and the right to request their
                        rectification, objection, deletion or limitation of
                        their processing, as well as the right to lodge a
                        complaint to the President of the Office for Personal
                        Data Protection
                    </p>
                </label>
                <label htmlFor="policy">
                    <input
                        type="checkbox"
                        id="policy"
                        name="policy"
                        checked={policyChecked}
                        onChange={() => setPolicyChecked(!policyChecked)}
                    />
                    <p>
                        *I accept the terms. I want to receive a VAT invoice. I
                        have read and accept the regulations of the facility. I
                        consent to the processing of my personal data for
                        purposes related to participation in events or
                        facilities for which tickets are sold, as well as for
                        marketing and statistical purposes.
                    </p>
                </label>
            </div>
            <div className="buttons">
                <label
                    htmlFor="donate"
                    className={`__orange-button-label --nt ${
                        isBuyButtonDisabled && "--disabled"
                    }`}
                >
                    <button
                        name="donate"
                        onClick={(e) => handleBuyTicket(e)}
                        disabled={isBuyButtonDisabled}
                    >
                        Buy
                    </button>
                </label>
            </div>
            {isSuccessPopupOn &&
                <SuccessPopupTemplate closePopup={handleClose} text="Thank you for supporting our foundation!" />
            }
            {isFailurePopupOn &&
                <SuccessPopupTemplate closePopup={handleClose} text="Something went wrong, please try again later" />
            }
        </div>
    );
};

export default DonationCheckout;

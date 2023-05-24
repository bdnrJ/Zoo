import React, { useState, ChangeEvent, MouseEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TicketContext } from '../context/TicketContext';

const Donation = () => {
    const {donationAmount, setDonationAmount} = useContext(TicketContext);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const amount = event.target.valueAsNumber;
        setDonationAmount(amount);
    }

    const handleButtonAmount = (event: MouseEvent<HTMLButtonElement>, amount: number) => {
        event.preventDefault();
        setDonationAmount(amount);
        setError('');
    }

    const handleDonation = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (donationAmount >= 5) {
            navigate('/donation_checkout');
        } else {
            setError('Wrong donation amount!');
        }
    }

    return (
        <div className="donation">
            <div className="donation-top_text">
                <span>
                    Your generous donation helps protect nature around the world, cares for
                    countless animals and plants, and gives hope to the most amazing fauna and flora,
                    that depend on us
                </span>
            </div>
            <form className='donation-form'>
                <div className="donation-form-amount">
                    <div className="donation-form-amount-title">
                        Choose your donation amount below.
                    </div>
                    <div className="donation-form-amount-buttons">
                        <button onClick={(e) => handleButtonAmount(e, 5)}>5</button>
                        <button onClick={(e) => handleButtonAmount(e, 50)}>50</button>
                        <button onClick={(e) => handleButtonAmount(e, 100)}>100</button>
                        <button onClick={(e) => handleButtonAmount(e, 250)}>250</button>
                        <button onClick={(e) => handleButtonAmount(e, 500)}>500</button>
                        <button onClick={(e) => { e.preventDefault(); setDonationAmount(NaN); }}>Other</button>
                        <input type="number" value={!Number.isNaN(donationAmount) ? donationAmount : NaN} onChange={handleAmountChange} />
                    </div>
                    <hr />
                </div>
                        <p>Minimum value: $5</p>
                <label htmlFor="donationbtn" className='donation-button-label'>
                    <button name='donationbtn' onClick={handleDonation} >
                        DONATE
                    </button>
                </label>
                {error && <p className="donation-error">{error}</p>}
            </form>
            <hr />
        </div>
    );
}

export default Donation;

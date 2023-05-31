import React from 'react'
import PopupForm from './PopupForm'
import { BsTypeH1 } from 'react-icons/Bs'
import TicketSum from '../TicketSum'

type props = {
    ticketType: "normal" | "group",
    exp_date: Date,
    closePopup: () => void
}

const BuyingSuccessPopup = ({ticketType, exp_date, closePopup} : props) => {
    return (
        <div className='success_popup' >
            <div className="success_popup-text">
                { ticketType === "normal"
                    ? <h1>You have bought normal tickets</h1>
                    : <h1>You have bought group ticket</h1>
                }
                <h3>You can find your ticket on your profile in the “My tickets” tab</h3>
            </div>

            <div className="success_popup-ticketsum">
                <TicketSum date={exp_date} ticketType={ticketType} />
            </div>
            <label htmlFor="ok" className={`__orange-button-label`}>
                <button name='ok' onClick={closePopup}>OK</button>
            </label>
        </div>
    )
}

export default BuyingSuccessPopup

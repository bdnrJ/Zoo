import React, {useState} from 'react'
import PopupFormWithButton from './Popups/PopupFormWithButton'
import TicketTypeEditPopup from './Popups/TicketTypeEditPopup'
import IsActive from './IsActive'

type props = {
    ticketType: any,
}

const TicketType = ({ticketType} : props) => {

    return (
        <div className="ticket_type"  key={ticketType.id}>
            <div className="ticket_type-block">
                <div className="ticket_type-block-left">
                    <span> <span className='__font-black'>#</span>{ticketType.id}</span>
                    <span className='__font-grey'>{ticketType.name}</span>
                    <span className='__font-grey'>{ticketType.age_info}</span>
                    <span className='__font-fadedOrange'>${ticketType.price}</span>
                    <span className='__font-grey'>{ticketType.type}</span>
                </div>
                    <IsActive is_active={ticketType.is_active}/>
                <div className="ticket_type-block-right">
                    <span>created: {ticketType.created_at?.toString().split('T')[0]}</span>
                    <span>updated: {ticketType.updated_at?.toString().split('T')[0]}</span>
                    <PopupFormWithButton buttonText="EDIT" buttonClass='ticket_type-block-right-button'>
                        <TicketTypeEditPopup ticketType={ticketType}/>
                    </PopupFormWithButton>
                </div>
            </div>
        </div>
    )
    }

export default TicketType

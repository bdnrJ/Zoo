import React, { useContext, useState } from 'react'
import { TicketContext } from '../../context/TicketContext'
import Overlay from '../../components/Overlay';
import PopupFormWithButton from '../../components/Popups/PopupFormWithButton';
import TicketTypeEditPopup from '../../components/Popups/TicketTypeEditPopup';

type Props = {}

const TicketTypes = (props: Props) => {
    const {allNormalTicketTypes} = useContext(TicketContext);
    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);


  return (
    <div className="ticket_types">
        <ul>
            {allNormalTicketTypes.map((ticketType) => (
                <li key={ticketType.id}>
                    <div className="ticket_type">
                        <span>ID: {ticketType.id}</span>
                        <span>NAME: {ticketType.name}</span>
                        <span>AGE INFO: {ticketType.age_info}</span>
                        <span>PRICE: {ticketType.price}</span>
                        <span>TYPE: {ticketType.type}</span>
                        <span>IS ACTIVE: {ticketType.is_active}</span>
                        <span>CREATION DATE: {ticketType.created_at?.toString()}</span>
                        <span>UPDATE DATE: {ticketType.updated_at?.toString()}</span>
                        <PopupFormWithButton buttonText="EDIT">
                            <TicketTypeEditPopup ticketType={ticketType}/>
                        </PopupFormWithButton>
                    </div>
                </li>
            ))}
        </ul>
            {/* <PopupFormWithButton buttonText="Create Ticket type">
                <h2>Create ticket</h2>
                <p>bla bla</p>
            </PopupFormWithButton> */}
    </div>
  )
}

export default TicketTypes

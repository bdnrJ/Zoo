import React, { useContext, useState } from 'react'
import { TicketContext } from '../../context/TicketContext'
import TicketType from '../../components/TicketType';
import PopupForm from '../../components/Popups/PopupForm';
import AddTicketTypePopup from '../../components/Popups/AddTicketTypePopup';

type Props = {}

const TicketTypes = (props: Props) => {
    const {allNormalTicketTypes} = useContext(TicketContext);
    const [isAddPopupOn, setIsAddPopupOn] = useState<boolean>(false);

return (
    <div className="ticket_types">

            <div className="ticket_types-list">
                {allNormalTicketTypes.map((ticketType) => (
                    <TicketType ticketType={ticketType} />
                ))}
            </div>

            <label htmlFor="addBtn" className="__orange-button-label wide">
                <button onClick={() => setIsAddPopupOn(true)}> ADD TICKET TYPE </button>
            </label>

            {isAddPopupOn &&
                <PopupForm closePopup={() => setIsAddPopupOn(false)}>
                    <AddTicketTypePopup closePopup={() => setIsAddPopupOn(false)}/>
                </PopupForm>
            }

    </div>
)
}

export default TicketTypes

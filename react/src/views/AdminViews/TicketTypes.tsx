import React, { useContext, useState } from 'react'
import { TicketContext } from '../../context/TicketContext'
import Overlay from '../../components/Overlay';
import PopupFormWithButton from '../../components/Popups/PopupFormWithButton';
import TicketTypeEditPopup from '../../components/Popups/TicketTypeEditPopup';
import TicketType from '../../components/TicketType';

type Props = {}

const TicketTypes = (props: Props) => {
    const {allNormalTicketTypes} = useContext(TicketContext);

return (
    <div className="ticket_types">

            <div className="ticket_types-list">
                {allNormalTicketTypes.map((ticketType) => (
                    <TicketType ticketType={ticketType} />
                ))}
            </div>

    </div>
)
}

export default TicketTypes

import React, {useContext, useState} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import {TicketContext} from '../../../context/TicketContext';

export const GroupTickets = () => {
    const {availableGroupTicket} = useContext(TicketContext);

    const [ticketExpDate, setTicketExpDate] = useState(new Date());
    const [sliderValue, setSliderValue] = useState(15);
    const [isWithEducationalMaterials, setIsWithEducationalMaterials] = useState<boolean>(false);
    const [isWithGuidedTour, setIsWithGuidedTour] = useState<boolean>(false);
    const [isFoodIncluded, setIsFoodIncluded] = useState<boolean>(false);
    const navigate = useNavigate();

    const userGroupTransaction = {
        buy_date: new Date(),
        exp_date: "2023-04-15",
        total_cost: 200,
        type: "group",
    }


    const handleContiuneToGroupCheckout = () => {
        const calculatedCost = 200;

        const userGroupTransaction = {
            buy_date: new Date(),
            exp_date: ticketExpDate,
            total_cost: calculatedCost,
            type: "group",
        }

        navigate('/tickets/group/checkout');
    }

    //Date formating
    const dayOfWeek = ticketExpDate.toLocaleString('en-US', { weekday: 'long' });
    const month = ticketExpDate.toLocaleString('en-US', { month: 'long' });
    const dayOfMonth = ticketExpDate.toLocaleString('en-US', { day: 'numeric' });
    const year = ticketExpDate.getFullYear();
    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;

    if(availableGroupTicket.id === -1) return (
        <div className="group_tickets">
            <h1>No group tickets currently available</h1>
        </div>
    )

    return (
        <div className="group_tickets">
            <form>
                <h2>Select Date</h2>
                <DatePicker
                    minDate={new Date()}
                    selected={ticketExpDate}
                    onChange={(date: Date) => setTicketExpDate(date)}
                    value={formattedDate}
                />
                People: {sliderValue}
                <br></br>
                <div className="group_tickets-people">
                    <div className="group_tickets-people-slider">
                    <input
                        type="range"
                        min="15"
                        max="50"
                        value={sliderValue}
                        onChange={(event) => setSliderValue(event.target.valueAsNumber)}
                    />
                    </div>
                    <div className="group_tickets-people-ticket">
                        <div className="people-ticket-counter">
                            {sliderValue}
                        </div>
                        <div className="people-ticket-info">
                            {availableGroupTicket.name + " $"+ availableGroupTicket.price}
                        </div>
                        <div className="people-ticket-controls">
                            <button>+</button>
                            <button>-</button>
                        </div>
                    </div>
                </div>

                <button onClick={handleContiuneToGroupCheckout} >Contiune</button>
            </form>
        </div>
    )
}

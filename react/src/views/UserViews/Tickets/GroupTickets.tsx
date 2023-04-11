import React, {useState} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

export const GroupTickets = () => {
    const navigate = useNavigate();

    const userGroupTransaction = {
        buy_date: new Date(),
        exp_date: "2023-04-15",
        total_cost: 200,
        type: "group",
        group_ticket: {
            transaction_id: 1,
            people: 30,
            educational_materials: true,
            guided_tour: false,
            food_included: true
        }
    }


    const [ticketExpDate, setTicketExpDate] = useState(new Date());
    const [sliderValue, setSliderValue] = useState(50);
    const [isWithEducationalMaterials, setIsWithEducationalMaterials] = useState<boolean>(false);
    const [isWithGuidedTour, setIsWithGuidedTour] = useState<boolean>(false);
    const [isFoodIncluded, setIsFoodIncluded] = useState<boolean>(false);

    const handleContiuneToGroupCheckout = () => {
        const calculatedCost = 200;

        const userGroupTransaction = {
            buy_date: new Date(),
            exp_date: ticketExpDate,
            total_cost: calculatedCost,
            type: "group",
            group_ticket: {
                people: sliderValue,
                educational_materials: isWithEducationalMaterials,
                guided_tour: isWithGuidedTour,
                food_included: isFoodIncluded
            }
        }

        navigate('/tickets/group/checkout');
    }

    //Date formating
    const dayOfWeek = ticketExpDate.toLocaleString('en-US', { weekday: 'long' });
    const month = ticketExpDate.toLocaleString('en-US', { month: 'long' });
    const dayOfMonth = ticketExpDate.toLocaleString('en-US', { day: 'numeric' });
    const year = ticketExpDate.getFullYear();
    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;
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
                <input
                    type="range"
                    min="10"
                    max="50"
                    value={sliderValue}
                    onChange={(event) => setSliderValue(event.target.valueAsNumber)}
                />
                <div>
                    <span>Include educational materials? </span>
                    <input
                        type="checkbox"
                        checked={isWithEducationalMaterials}
                        onChange={(event) => setIsWithEducationalMaterials(event.target.checked)}
                    />
                </div>
                <div>
                    <span>Include a guide person? </span>
                    <input
                        type="checkbox"
                        checked={isWithGuidedTour}
                        onChange={(event) => setIsWithGuidedTour(event.target.checked)}
                    />
                </div>
                <div>
                    <span>Include food? </span>
                    <input
                        type="checkbox"
                        checked={isFoodIncluded}
                        onChange={(event) => setIsFoodIncluded(event.target.checked)}
                    />
                </div>
                <button onClick={handleContiuneToGroupCheckout} >Contiune</button>
            </form>
        </div>
    )
}

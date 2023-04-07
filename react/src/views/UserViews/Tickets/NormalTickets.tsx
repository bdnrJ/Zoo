import { useContext, useState } from 'react';
import BackButton from '../../../components/BackButton'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TicketChooser from '../../../components/TicketChooser';
import TicketSum from '../../../components/TicketSum';
import { useNavigate } from 'react-router-dom';
import { TicketContext } from '../../../context/TicketContext';

interface userTicket {
    ticket_type_id: number
    amount: number
}

interface transaction {
    buy_date: Date,
    exp_date: Date,
    total_cost: number,
    type: string,
    normal_tickets: userTicket[]
}

export const NormalTickets = () => {
    const {userTickets, setUserTickets} = useContext(TicketContext);
    const [startDate, setStartDate] = useState(new Date());


    const navigate = useNavigate();

    const transaction: transaction ={
        buy_date: new Date(),
        exp_date: startDate,
        total_cost: 0,
        type: 'normal',
        normal_tickets: []
    }


    const handleAddition = (idx: number) => {
        const newTickets = userTickets;
        const modifiedTicketIdx = userTickets.findIndex((ticket) => ticket.id === idx);

        if(modifiedTicketIdx === -1){
            alert("cannot increase amount on a ticket that does not exist");
            return;
        }

        newTickets[modifiedTicketIdx].amount = Math.min(newTickets[modifiedTicketIdx].amount + 1, 10);
        setUserTickets([...newTickets]);
    }

    const handleSubstitution = (idx: number) => {
        const newTickets = userTickets;
        const modifiedTicketIdx = userTickets.findIndex((ticket) => ticket.id === idx);

        if(modifiedTicketIdx === -1){
            alert("cannot decrease amount on a ticket that does not exist");
            return;
        }

        newTickets[modifiedTicketIdx].amount = Math.max(newTickets[modifiedTicketIdx].amount - 1, 0);
        setUserTickets([...newTickets]);
    }

    //Date formating
    const dayOfWeek = startDate.toLocaleString('en-US', { weekday: 'long' });
    const month = startDate.toLocaleString('en-US', { month: 'long' });
    const dayOfMonth = startDate.toLocaleString('en-US', { day: 'numeric' });
    const year = startDate.getFullYear();

    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;
    return (
        <div className="normal">
            <div className="normal-title">
                <h1>Normal Tickets</h1>
                <button onClick={() => console.log(userTickets)} >log userTickets</button>
            </div>
            <div className="normal-wrapper">
                <div className="backbtn">
                    <BackButton direction='/tickets' />
                </div>
                <div className="normal-buying">
                    <div className="normal-select">

                        <div className="normal-select-title">
                            <h3>You have chosen normal tickets. <br/>
                            Please complete your ticket details below.</h3>
                        </div>

                        <div className="normal-select-date">
                            <div className="normal-select-label">
                                <h4>Select Date</h4>
                            </div>
                            <DatePicker
                                minDate={new Date()}
                                selected={startDate}
                                onChange={(date: Date) => setStartDate(date)}
                                value={formattedDate}
                            />
                        </div>

                        <div className="normal-select-tickets-wrapper">
                            <div className="normal-select-label">
                                <h4>Select Tickets</h4>
                            </div>
                            <div className="normal-select-tickets">
                                {userTickets.map((ticket) => (
                                    <TicketChooser
                                        key={ticket.name}
                                        idx={ticket.id}
                                        amount={ticket.amount}
                                        title={ticket.name}
                                        ageInfo={ticket.age_info}
                                        price={ticket.price}
                                        handleAdd={handleAddition}
                                        handleSub={handleSubstitution}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="normal_tickets-cart">
                        <TicketSum date={startDate}/>
                    </div>
                </div>
            </div>
            <button onClick={() => navigate('/tickets/normal/checkout')} >Contiune</button>
        </div>
    )
}

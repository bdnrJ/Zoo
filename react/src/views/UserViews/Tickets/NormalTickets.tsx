import { useState } from 'react';
import BackButton from '../../../components/BackButton'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {MdKeyboardArrowDown} from 'react-icons/md'
import TicketChooser from '../../../components/TicketChooser';

type ticket = {
    idx: number,
    amount: number,
    title: string,
    ageInfo: string,
    price: string,
}

export const NormalTickets = () => {

    const sampleData: ticket[] = [
        {
            idx: 1,
            amount: 1,
            title: "Adult",
            ageInfo: " - Ages 18+",
            price: "$25"
        },
        {
            idx: 2,
            amount: 0,
            title: "Child",
            ageInfo: " - Ages 3-18",
            price: "$16"
        },
        {
            idx: 3,
            amount: 0,
            title: "Reduced",
            ageInfo: "",
            price: "$20"
        },
    ]

    const [tickets, setTickets] = useState<ticket[]>(sampleData);

    const handleAddition = (id: number) => {
        const newTickets = tickets;
        const modifiedTicketIdx = tickets.findIndex((ticket) => ticket.idx === id);

        if(modifiedTicketIdx === -1){
            alert("cannot increase amount on a ticket that does not exist");
            return;
        }

        newTickets[modifiedTicketIdx].amount++;

        setTickets([...newTickets]);
    }

    const handleSubstitution = (id: number) => {
        const newTickets = tickets;
        const modifiedTicketIdx = tickets.findIndex((ticket) => ticket.idx === id);

        if(modifiedTicketIdx === -1){
            alert("cannot decrease amount on a ticket that does not exist");
            return;
        }

        newTickets[modifiedTicketIdx].amount = Math.max(newTickets[modifiedTicketIdx].amount - 1, 0);

        setTickets([...newTickets]);
    }

    const [startDate, setStartDate] = useState(new Date());

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
            </div>
            <div className="normal-wrapper">
                <div className="backbtn">
                    <BackButton direction='/tickets' />
                </div>
                <div className="normal-buying">
                    <div className="normal-select">

                        <div className="normal-select-title">
                            <h3>You have chosen General Admission. <br/>
                            Please complete your ticket details below.</h3>
                        </div>

                        <div className="normal-select-date">
                            <div className="normal-select-label">
                                <h4>Select Date</h4>
                            </div>
                            <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} value={formattedDate} />
                        </div>

                        <div className="normal-select-tickets-wrapper">
                            <div className="normal-select-label">
                                <h4>Select Tickets</h4>
                            </div>
                            <div className="normal-select-tickets">
                                {tickets.map((ticket) => (
                                    <TicketChooser
                                        idx={ticket.idx}
                                        key={ticket.title}
                                        amount={ticket.amount}
                                        title={ticket.title}
                                        ageInfo={ticket.ageInfo}
                                        price={ticket.price}
                                        handleAdd={handleAddition}
                                        handleSub={handleSubstitution}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="normal_tickets-cart">
                        <ol>
                            {
                                tickets.map((ticket) => (
                                    <li key={ticket.title}>{ticket.amount + " " + ticket.title}</li>
                                ))
                            }
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import axiosClient from "../axios-client";

type props = {
    children: ReactNode
}

type ticket = {
    age_info: string,
    created_at: Date | null,
    id: number,
    is_active: number,
    name: string,
    price: number,
    updated_at: Date | null,
}

type userTicket = {
    age_info: string,
    id: number,
    is_active: number,
    name: string,
    price: number,
    amount: number,
}

interface TicketContext{
    availableTickets: ticket[],
    userTickets: userTicket[],
    setUserTickets: Dispatch<SetStateAction<userTicket[]>>,
}

export const TicketContext = createContext<TicketContext>({
    availableTickets: [],
    userTickets: [],
    setUserTickets: () => {}
});

export const TicketProvider = ({children}: props) => {
    const [allTicketTypes, setAllTicketTypes] = useState<ticket[]>([]);
    const [availableTickets, setAvailableTickets] = useState<ticket[]>([]);
    const [userTickets, setUserTickets] = useState<userTicket[]>([]);

    useEffect(() => {
        const getAllTickets = async () => {
            const res = await axiosClient.get('/ticket_types');
            setAllTicketTypes(res.data);
            const avaliableTicketsTemp: ticket[] = res.data.filter((ticket: ticket) => ticket.is_active === 1 );
            setAvailableTickets(avaliableTicketsTemp);
            const userTicketsTemp: userTicket[] = avaliableTicketsTemp.map((ticket: ticket) => ({
                ...ticket,
                amount: 0
            }));
            setUserTickets(userTicketsTemp);
        }

        getAllTickets();
    }, []);


    return (
        <TicketContext.Provider value={{availableTickets, userTickets, setUserTickets}}>
            {children}
        </TicketContext.Provider>
    )
}

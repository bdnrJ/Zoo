import { createContext, ReactNode, useEffect, useState } from "react";
import axiosClient from "../axios-client";

type props = {
    children: ReactNode
}

interface TicketContext{
    availableTickets: any[],
}

export const TicketContext = createContext<TicketContext>({
    availableTickets: []
});

export const TicketProvider = ({children}: props) => {
    const [allTicketTypes, setAllTicketTypes] = useState();
    const [availableTickets, setAvailableTickets] = useState<any>([]);

    useEffect(() => {
        const getAllTickets = async () => {
            const res = axiosClient.get('/ticket_types');
            console.log(res);
        }

        getAllTickets();
    }, []);


    return (
        <TicketContext.Provider value={availableTickets}>
            {children}
        </TicketContext.Provider>
    )
}

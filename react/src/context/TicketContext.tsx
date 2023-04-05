import { createContext, ReactNode, useState } from "react";

type props = {
    children: ReactNode
}

export const TicketContext = createContext({});

export const TicketProvider = ({children}: props) => {
    const [allTicketTypes, setAllTicketTypes] = useState();
    const [availableTickets, setAvailableTickets] = useState();



}

import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import axiosClient from "../axios-client";

type props = {
    children: ReactNode
}

export type normalTicket = {
    age_info: string,
    created_at: Date | null,
    id: number,
    is_active: number,
    name: string,
    price: number,
    updated_at: Date | null,
    type: string
}

type normalUserTicket = {
    age_info: string,
    id: number,
    is_active: number,
    name: string,
    price: number,
    amount: number,
}

export type serviceType = {
    id: number,
    name: string,
    type?: string,
    price_per_customer: string,
    is_active: number,
}

export interface normalTransactionTickets {
    ticket_type_id: number
    amount: number
}

export type service = {
    service_type_id: number,
}

export type userService = {
    id: number,
    name: string,
    price_per_customer: string,
    is_choosen: boolean,
}

export interface transaction {
    buy_date: Date,
    exp_date: Date,
    total_cost: number,
    type: string,
    items: normalTransactionTickets[]
    services?: service[]
}

interface TicketContext{
    availableNormalTickets: normalTicket[],
    allNormalTicketTypes: normalTicket[],
    normalUserTickets: normalUserTicket[],
    normalUserTransaction: transaction,

    setNormalUserTickets: Dispatch<SetStateAction<normalUserTicket[]>>,
    setNormalUserTransaction: Dispatch<SetStateAction<transaction>>,
    resetAllNormal: () => void,
    getAllTickets: () => void,
    availableGroupTicket: normalTicket,
    allServiceTypes: serviceType[],
    availableServiceTypes: serviceType[],
    groupUserTransaction: transaction,
    setGroupUserTransaction: Dispatch<SetStateAction<transaction>>,
    userServices: userService[],
    setUserServices: Dispatch<SetStateAction<userService[]>>,
    resetAllGroup: () => void
}

const normalTransactionSample: transaction ={
    buy_date: new Date(),
    exp_date: new Date(),
    total_cost: 0,
    type: 'normal',
    items: []
}

const groupTransactionSample: transaction ={
    buy_date: new Date(),
    exp_date: new Date(),
    total_cost: 0,
    type: 'group',
    items: [],
    services: [],
}

const tempGroupTicket: normalTicket = {
    id: -1,
    age_info: "",
    name: "",
    created_at: null,
    updated_at: null,
    is_active: 0,
    type: "",
    price: 0,
}


export const TicketContext = createContext<TicketContext>({
    availableNormalTickets: [],
    allNormalTicketTypes: [],
    normalUserTickets: [],
    setNormalUserTickets: () => {},
    normalUserTransaction: normalTransactionSample,
    setNormalUserTransaction: () => {},
    resetAllNormal: () => {},
    getAllTickets: () => {},
    availableGroupTicket: tempGroupTicket,
    allServiceTypes: [],
    availableServiceTypes: [],
    groupUserTransaction: groupTransactionSample,
    setGroupUserTransaction: () => {},
    userServices: [],
    setUserServices: () => {},
    resetAllGroup: () => {}
});

export const TicketProvider = ({children}: props) => {
    const [allNormalTicketTypes, setAllNormalTicketTypes] = useState<normalTicket[]>([]);
    const [availableNormalTickets, setAvailableNormalTickets] = useState<normalTicket[]>([]);
    const [normalUserTickets, setNormalUserTickets] = useState<normalUserTicket[]>([]);
    const [normalUserTransaction, setNormalUserTransaction] = useState<transaction>(normalTransactionSample);

    const [availableGroupTicket, setAvailableGroupTicket] = useState<normalTicket>(tempGroupTicket);

    const [allServiceTypes, setAllServiceTypes] = useState<serviceType[]>([]);
    const [availableServiceTypes, setAvaliableServiceTypes] = useState<serviceType[]>([]);
    const [groupUserTransaction, setGroupUserTransaction] = useState<transaction>(groupTransactionSample);
    const [userServices, setUserServices] = useState<userService[]>([]);

    const getAllTickets = async () => {
        const ticketData = await axiosClient.get('/ticket_types');
        setAllNormalTicketTypes(ticketData.data);

        const avaliableTicketsTemp: normalTicket[] = ticketData.data.filter((ticket: normalTicket) => (ticket.is_active === 1 && ticket.type !== 'group'));
        setAvailableNormalTickets(avaliableTicketsTemp);

        const userTicketsTemp: normalUserTicket[] = avaliableTicketsTemp.map((ticket: normalTicket) => ({
            ...ticket,
            amount: 0
        }));
        setNormalUserTickets(userTicketsTemp);

        const availableGroupTicket: normalTicket = ticketData.data.find((ticket: normalTicket) => (ticket.is_active === 1 && ticket.type === 'group'));
        setAvailableGroupTicket(availableGroupTicket);

        //get services
        const servicesData = await axiosClient.get('/service_types');
        setAllServiceTypes(servicesData.data);

        const avaliableServiceTypesTemp = servicesData.data.filter((serviceType: serviceType) => serviceType.is_active === 1);
        setAvaliableServiceTypes(avaliableServiceTypesTemp);

        const userServicesTemp: userService[] = avaliableServiceTypesTemp.map((serviceType: serviceType) => ({
            ...serviceType,
            is_choosen: false
        }));
        setUserServices(userServicesTemp);

        setGroupUserTransaction({...groupUserTransaction, items: [{
            ticket_type_id: availableGroupTicket.id,
            amount: 15
        }]})
    }



    useEffect(() => {
        getAllTickets();
    }, []);

    const resetAllNormal = () => {
        //resets userTickets to default state
        setNormalUserTickets(availableNormalTickets.map((ticket: normalTicket) => ({
            ...ticket,
            amount: 0
        })))

        //resets userTransaction to default state
        setNormalUserTransaction(normalTransactionSample);
    }

    const resetAllGroup = () => {
        //resets userTickets to default state
        setUserServices(availableServiceTypes.map((serviceType: serviceType) => ({
            ...serviceType,
            is_choosen: false
        })));

        //resets userTransaction to default state
        setGroupUserTransaction({...groupTransactionSample, items: [{
            ticket_type_id: availableGroupTicket.id,
            amount: 15
        }]})
    }

    return (
        <TicketContext.Provider value={{
            availableNormalTickets,
            normalUserTickets,
            setNormalUserTickets,
            allNormalTicketTypes,
            normalUserTransaction,
            setNormalUserTransaction,
            resetAllNormal,
            getAllTickets,
            availableGroupTicket,
            allServiceTypes,
            availableServiceTypes,
            groupUserTransaction,
            setGroupUserTransaction,
            userServices,
            setUserServices,
            resetAllGroup,
            }}>
            {children}
        </TicketContext.Provider>
    )
}

import React, { useContext, useState } from 'react'
import { TicketContext } from '../../context/TicketContext'
import ServiceType from '../../components/ServiceType';
import PopupForm from '../../components/Popups/PopupForm';
import AddServiceType from '../../components/Popups/AddServiceTypePopup';

const Services = () => {
    const [isAddPopupOn, setIsAddPopupOn] = useState<boolean>(false);
    const {allServiceTypes} = useContext(TicketContext);

    return (
        <div className="services_page">
            <div className="services_page-list">
                {allServiceTypes.map((service) => (
                    <ServiceType service={service} key={service.id}/>
                ))}
            </div>

            <label htmlFor="addBtn" className="__orange-button-label wide">
                <button onClick={() => setIsAddPopupOn(true)}> ADD TICKET TYPE </button>
            </label>

            {isAddPopupOn &&
                <PopupForm closePopup={() => setIsAddPopupOn(false)}>
                    <AddServiceType closePopup={() => setIsAddPopupOn(false)}/>
                </PopupForm>
            }

        </div>
    )
}

export default Services

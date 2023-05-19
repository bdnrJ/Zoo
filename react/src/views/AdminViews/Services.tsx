import React, { useContext } from 'react'
import { TicketContext } from '../../context/TicketContext'
import ServiceType from '../../components/ServiceType';

const Services = () => {

    const {allServiceTypes} = useContext(TicketContext);

    return (
        <div className="services_page">
            <div className="services_page-list">
                {allServiceTypes.map((service) => (
                    <ServiceType service={service} key={service.id}/>
                ))}
            </div>
        </div>
    )
}

export default Services

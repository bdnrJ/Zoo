import React from 'react'
import { serviceType } from '../context/TicketContext'
import IsActive from './IsActive'

type props = {
    service: serviceType
}

const ServiceType = ({service}: props) => {

    console.log(service);

  return (
    <div className="service_type">
        <div className="serivce_type-left">
            <p>#{service.id}</p>
            <p>{service.name}</p>
        </div>
            <IsActive is_active={service.is_active} />
        <div className="serivce_type-right">
            <p>${service.price_per_customer}</p>
            <span>
                Created at
                <p>{service?.created_at?.split('T')[0]}</p>
            </span>
            <span>
                Updated at
                <p>{service?.updated_at?.split('T')[0]}</p>
            </span>
        </div>
    </div>
  )
}

export default ServiceType

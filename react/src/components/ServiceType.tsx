import React, { useState } from 'react'
import { serviceType } from '../context/TicketContext'
import IsActive from './IsActive'
import PopupForm from './Popups/PopupForm'
import EditServiceTypePopup from './Popups/EditServiceTypePopup'

type props = {
    service: serviceType
}

const ServiceType = ({service}: props) => {
    const [isEditPopupOn, setIsEditPopupOn] = useState<boolean>(false);

  return (
    <div className="service_type">
        <div className="service_type-block" onClick={() => setIsEditPopupOn(true)}>
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
        {isEditPopupOn &&
            <PopupForm closePopup={() => setIsEditPopupOn(false)}>
                <EditServiceTypePopup service={service} closePopup={() => setIsEditPopupOn(false)} />
            </PopupForm>
        }
    </div>
  )
}

export default ServiceType

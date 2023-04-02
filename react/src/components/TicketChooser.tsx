import React from 'react'

type props = {
    idx: number,
    amount: number,
    title: string,
    ageInfo: string,
    price: string,
    handleAdd: (id: number) => void
    handleSub: (id: number) => void
}

const TicketChooser = ({amount, title, ageInfo ,price, idx, handleAdd, handleSub}: props) => {
    return (
        <div className="ticket">
            <div className={`ticket-count ${amount >= 1 && "--active"}`}>
                <span>{amount}</span>
            </div>
            <div className="ticket-info">
                <div className="ticket-info-title">
                    <span className='title'>{title}</span>
                    <span className='ageInfo' >{ageInfo}</span>
                </div>
                <span>{price}</span>
            </div>
            <div className="ticket-operations">
                <button onClick={() => handleAdd(idx)}>+</button>
                <button onClick={() => handleSub(idx)}>-</button>
            </div>
        </div>
    )
}

export default TicketChooser

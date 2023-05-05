import React, { ReactNode } from 'react'

type props = {
    children: ReactNode,
    hideBurger: () => void
}

const BurgerPopup = ({children, hideBurger}: props) => {

    return (
        <div className="burger_popup" onClick={hideBurger}>
            {children}
        </div>
    )
}

export default BurgerPopup

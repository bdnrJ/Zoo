import React, { ReactNode, useRef, useEffect } from 'react'

type props = {
    children: ReactNode,
    hideBurger: () => void
}

const BurgerPopup = ({children, hideBurger}: props) => {
    const popupRef = useRef<any>(null);


    //handling popup visibility
    useEffect(() => {
        function handleClickOutside(event: Event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                hideBurger();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popupRef]);

    return (
        <div className="burger_popup" ref={popupRef} onClick={hideBurger}>
            {children}
        </div>
    )
}

export default BurgerPopup

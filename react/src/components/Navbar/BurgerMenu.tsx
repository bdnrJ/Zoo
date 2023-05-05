import React, { useState } from 'react';

type props = {
    isActive: boolean,
    showPopup: () => void
}

const BurgerMenu = ({showPopup, isActive}: props) => {

    return (
        <div className={`burger-menu-button ${isActive ? 'active' : ''}`} onClick={showPopup}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default BurgerMenu;

// ConfirmationPopup.tsx
import React, { ReactElement, useState } from 'react';
import Overlay from '../Overlay';

type Props = {
    buttonText: string;
    children: ReactElement<{ onClose: () => void }>;
    buttonClass?: string
};

const PopupFormWithButton = ({ buttonText, children, buttonClass }: Props) => {
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            <button className={buttonClass} onClick={openPopup}>{buttonText}</button>
            {showPopup && <Overlay onClose={closePopup}>{children}</Overlay>}
        </>
    );
};

export default PopupFormWithButton;

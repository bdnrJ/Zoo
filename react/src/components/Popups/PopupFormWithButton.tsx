// ConfirmationPopup.tsx
import React, { ReactElement, useState } from 'react';
import Overlay from '../Overlay';

type Props = {
    buttonText: string;
    children: ReactElement<{ onClose: () => void }>;
};

const PopupFormWithButton = ({ buttonText, children }: Props) => {
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            <button onClick={openPopup}>{buttonText}</button>
            {showPopup && <Overlay onClose={closePopup}>{children}</Overlay>}
        </>
    );
};

export default PopupFormWithButton;

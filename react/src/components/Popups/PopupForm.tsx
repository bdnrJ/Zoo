import React, { ReactElement, useState } from 'react';
import Overlay from '../Overlay';

type Props = {
    children: ReactElement<{ onClose: () => void }>,
    closePopup: () => void
};

const PopupForm = ({children, closePopup }: Props) => {
    return (
        <>
            <Overlay onClose={closePopup}>{children}</Overlay>
        </>
    );
};

export default PopupForm;

import React from 'react'
import PopupForm from './PopupForm'

type props = {
    closePopup: () => void;
    text: string,
    closeOriginPopup?: () => void
}

const SuccessPopupTemplate = ({closePopup, text, closeOriginPopup}: props) => {

    const closePopups = () => {
        closePopup();
        if(closeOriginPopup)
            closeOriginPopup();
    }

  return (
    <PopupForm closePopup={closePopups}>
        <div className="success_popup">
            <p>{text}</p>
            <button onClick={closePopups}>OK</button>
        </div>
    </PopupForm>
  )
}

export default SuccessPopupTemplate

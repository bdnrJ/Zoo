import React from 'react'
import {MdArrowBackIosNew} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

type props = {
    direction: string,
}

const BackButton = ({direction}: props) => {
    const navigate = useNavigate();

    return (
        <button className='backbutton' onClick={() => navigate(direction)} ><MdArrowBackIosNew /> Back</button>
    )
}

export default BackButton

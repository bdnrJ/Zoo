import React from 'react'
import {MdArrowBackIosNew} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

type props = {
    direction: string,
}

const BackButton = ({direction}: props) => {
    const navigate = useNavigate();

    return (
        <button className='backbutton' onClick={() => navigate(-1)} ><MdArrowBackIosNew /> Back</button>
    )
}

export default BackButton

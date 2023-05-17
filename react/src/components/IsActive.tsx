import React from 'react'

type props = {
    is_active: boolean
}

const IsActive = ({is_active}: props) => {
    return (
        <div className={`is_active ${is_active && '--active'}`}>
            <span></span>
            {is_active ? 'active' : 'inactive'}
        </div>
    )
}

export default IsActive

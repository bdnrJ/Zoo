import React from 'react'
import { User } from '../../types/types'

type props = {
    user: User
}

const LoggedUser = ({user}: props) => {
    return (
        <div className='loggeduser' >
            {user.firstname}
            <div className='navbar-user-popup'>
                <span>{user.firstname + "  " + user.lastname}</span>
                <span>{user.email}</span>
                <hr />
                <button>Settings</button>
                <button>Transactions</button>
                <button>cos tam</button>
                <button>Logout</button>
            </div>
        </div>
    )
}

export default LoggedUser

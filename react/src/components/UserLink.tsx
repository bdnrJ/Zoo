import React from 'react'
import { Link } from 'react-router-dom'

type props = {
    id: number,
    deleted_at: string,
    firstname: string,
    lastname: string,
    email: string,
    created_at: string,
}

const UserLink = ({id, deleted_at, firstname, lastname, email, created_at}: props) => {
    return (
        <div className="userlink">
            <Link to={`/admin/user_page/${id}`} style={{ textDecoration: 'none' }}>
                <div className="userlink-block">
                    <div className="userlink-left">
                        <span className='__font-black'><span className='__font-grey'>#</span>{id}</span>
                        <span className='__font-grey' >{deleted_at ? '(DELETED) ' : ''}{firstname + " " + lastname} </span>
                    </div>
                    <div className="userlink-right">
                        <span className='__font-grey' >{email}</span>
                        <span className='__font-black' >creation date: {created_at.split('T')[0]}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default UserLink

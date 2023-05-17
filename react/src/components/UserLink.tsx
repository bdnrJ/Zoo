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
                        <span className='black'><span className='grey'>#</span>{id}</span>
                        <span className='grey' >{deleted_at ? '(DELETED) ' : ''}{firstname + " " + lastname} </span>
                    </div>
                    <div className="userlink-right">
                        <span className='grey' >{email}</span>
                        <span className='black' >creation date: {created_at.split('T')[0]}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default UserLink

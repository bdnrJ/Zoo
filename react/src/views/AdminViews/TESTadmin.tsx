import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';
import { User } from '../../types/types';

type TESTUser = {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    role: string
    created_at: string,
    updated_at: string
}

const TESTadmin = () => {
    const [users, setUsers] = useState<TESTUser[]>();
    const [pageNumber, setPageNumber] = useState<number>();

    const getUsers = async (page: number = 1) => {
        try {
            console.log("x");
            const res = await axiosClient.get(`http://localhost:8000/api/allusers?page=${page}`, {withCredentials: true});
            console.log(res);
            console.log(res.data.paginationData.data);
            setUsers(res.data.paginationData.data);
            setPageNumber(res.data.paginationData.current_page);
        }catch(err:any){
            console.log(err.response.data.message);
            alert(err.response.data.message)
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    // getUsers();

    return (
        <div className='testadmin'>
            <ol>
            {
                users?.map((user) => (
                    <li key={user.email}>{user.id+" "+user.firstname +" "+ user.lastname+" " +user.email}</li>
                ))
            }
            </ol>
            <button onClick={() => console.log(users)} >x</button>
            <div className="paginationbtns">
                <button
                    onClick={() => getUsers(pageNumber ? pageNumber-1 : 1)}
                >{"<--"}</button>
                <button
                onClick={() => {getUsers(pageNumber ? pageNumber+1 : 1)}}
                >
                    {"-->"}
                </button>
            </div>
        </div>
    )
}

export default TESTadmin

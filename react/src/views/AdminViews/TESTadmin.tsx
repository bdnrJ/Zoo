import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';
import { useQuery, useQueryClient } from '@tanstack/react-query';

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
    const USERS_PER_PAGE = 5;
    const MINUTE = 60000;
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { status, data, error, isFetching, isPreviousData } = useQuery({
        queryKey: ['users', currentPage],
        queryFn: () => fetchUsers(currentPage),
        keepPreviousData: true,
        staleTime: 5*MINUTE,
    });

    const fetchUsers = async (page: number) => {
        try {
            const res = await axiosClient.get(`http://localhost:8000/api/allusers?page=${page}`, {withCredentials: true});
            const paginationData = await res.data.paginationData;
            console.log(paginationData);
            return paginationData.data;
        }catch(err:any){
            console.log(err.response.data.message);
            alert(err.response.data.message)
        }
    }

    React.useEffect(() => {
        if (!isPreviousData && !data) {
            console.log("rerun");
            queryClient.prefetchQuery({
                queryKey: [`users${currentPage+1}`, currentPage + 1],
                queryFn: () => fetchUsers(currentPage + 1),
            })
        }
    }, [data, isPreviousData, currentPage, queryClient])

    return (
        <div className='testadmin'>
            <ol>
            {
                data?.map((user: TESTUser) => (
                    <li key={user.email}>{user.id+" "+user.firstname +" "+ user.lastname+" " +user.email}</li>
                ))
            }
            </ol>
            <div className="div">
                <li>{status}</li>
                <li>{error}</li>
                <li>{isFetching}</li>
            </div>
            {/* <button onClick={() => console.log(data)} >show data</button> */}
            <div className="paginationbtns">
                <button
                    onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
                    disabled={currentPage === 1}
                >
                    {"<-"}
                </button>
                <button>{currentPage}</button>
                <button onClick={() => {
                    setCurrentPage((old) => (old + 1))
                    }}
                    disabled={isPreviousData || data?.length < USERS_PER_PAGE}
                    >
                        {"->"}
                </button>
            </div>
        </div>
    )
}

export default TESTadmin

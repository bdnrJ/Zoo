import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { number } from 'zod';

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
    const MINUTE = 60000;
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { status, data, error, isFetching, isPreviousData } = useQuery({
        queryKey: ['users', currentPage],
        queryFn: () => fetchUsers(currentPage),
        keepPreviousData: true,
        staleTime: 2*MINUTE,
    });

    const fetchUsers = async (page: number) => {
        try {
            const res = await axiosClient.get(`/allusers?page=${page}`, {withCredentials: true});
            const paginationData = await res.data.paginationData;
            return paginationData;
        }catch(err:any){
            console.log(err.response.data.message);
            alert(err.response.data.message)
        }
    }
    React.useEffect(() => {
        if (!isPreviousData && data?.next_page_url) {
            if(!queryClient.getQueryData(["users", 3]))
            queryClient.prefetchQuery({
                queryKey: [`users`, currentPage + 1],
                queryFn: () => fetchUsers(currentPage + 1),
            })
            else{
                console.log('not updated');
            }
        }
    }, [data, isPreviousData, currentPage, queryClient])

    return (
        <div className='testadmin'>
            <ol>
            {
                data?.data.map((user: TESTUser) => (
                    <li key={user.email}>{user.id+" "+user.firstname +" "+ user.lastname+" " +user.email}</li>
                ))
            }
            </ol>
            <div className="div">
                <button onClick={() => console.log(queryClient.getQueryData(["users", 1]))} >show</button>
                <li>{status}</li>
                <li>{error && "error"}</li>
                <li>{isFetching && "fetching"}</li>
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
                    disabled={isPreviousData || data?.next_page_url == null}
                    >
                        {"->"}
                </button>
            </div>
        </div>
    )
}

export default TESTadmin

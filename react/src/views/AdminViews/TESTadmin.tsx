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
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { status, data, error, isFetching, isPreviousData } = useQuery({
        queryKey: ['users', currentPage],
        queryFn: () => fetchUsers(currentPage),
        keepPreviousData: true,
        staleTime: 1000 * 60 * 2 // 2 minutes
    });

    const fetchUsers = async (page: number) => {
        try {
            const res = await axiosClient.get(`/all_users?page=${page}`, {withCredentials: true});
            const paginationData = await res.data.paginationData;
            console.log("fetching: "+page);

            return paginationData;
        }catch(err:any){
            console.log(err.response.data.message);
            alert(err.response.data.message)
        }
    }

    useEffect(() => {
        if (!isPreviousData && data?.next_page_url) {
            const nextpage = currentPage + 1;
            // if we go from page 4 -> 3 without this if statement
            // it would refetch page 4 again, even if
            // it was just fetched
            if(!queryClient.getQueryData(["users", nextpage]))
                queryClient.prefetchQuery({
                    queryKey: [`users`, nextpage],
                    queryFn: () => fetchUsers(nextpage),
                })
            else console.log('not fetching');

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

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

    // const getUsers = async (page: number = 1) => {
    //     try {
    //         console.log("x");
    //         const res = await axiosClient.get(`http://localhost:8000/api/allusers?page=${page}`, {withCredentials: true});
    //         console.log(res);
    //         const data = res.data;
    //         const paginationData = data.paginationData;
    //         setUsers(res.data.paginationData.data);
    //         setPageNumber(res.data.paginationData.current_page);
    //         return paginationData;
    //     }catch(err:any){
    //         console.log(err.response.data.message);
    //         alert(err.response.data.message)
    //     }
    // }

    const { status, data, error, isFetching, isPreviousData } = useQuery({
        queryKey: ['users', currentPage],
        queryFn: () => getUsers(currentPage),
        keepPreviousData: true,
        staleTime: 5000,
    });

    const getUsers = async (page: number = 1) => {
        try {
            console.log("x");
            const res = await axiosClient.get(`http://localhost:8000/api/allusers?page=${page}`, {withCredentials: true});
            const paginationData = await res.data.paginationData;
            return paginationData.data;
        }catch(err:any){
            console.log(err.response.data.message);
            alert(err.response.data.message)
        }
    }

    React.useEffect(() => {
        if (!isPreviousData) {
            console.log("im here");
            queryClient.prefetchQuery({
                queryKey: [`users${currentPage+1}`, currentPage + 1],
                queryFn: () => getUsers(currentPage + 1),
            })
        }
    }, [data, isPreviousData, currentPage, queryClient])

    // getUsers();

    return (
        <div className='testadmin'>
            <ol>
            {
                data?.map((user: TESTUser) => (
                    <li key={user.email}>{user.id+" "+user.firstname +" "+ user.lastname+" " +user.email}</li>
                ))
            }
            </ol>
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
                    disabled={isPreviousData || data.length < 5}
                    >
                        {"->"}
                </button>
            </div>
        </div>
    )
}

export default TESTadmin

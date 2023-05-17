import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import UserLink from '../../components/UserLink';

type user = {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    role: string
    created_at: string,
    updated_at: string,
    deleted_at: string,
}

const Users = () => {
    const navigate = useNavigate();
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
            const res = await axiosClient.get(`/users?page=${page}`, {withCredentials: true});
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
        <div className='users'>
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
            <div className="users-list">
                {
                    data?.data.map((user: user) => (
                        <UserLink
                            key={user.email}
                            id={user.id}
                            firstname={user.firstname}
                            lastname={user.lastname}
                            email={user.email}
                            deleted_at={user.deleted_at}
                            created_at={user.created_at}
                        />
                    ))
                }
            </div>
            <div className="div">
                {isFetching && "fetching"}
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

export default Users

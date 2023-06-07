import React, { useEffect, useState } from 'react';
import axiosClient from '../../axios-client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import UserLink from '../../components/UserLink';
import { useDebounce } from '../../hooks/useDebounce';

type user = {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    role: string,
    created_at: string,
    updated_at: string,
    deleted_at: string,
};

const Users = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);


    const { status, data, error, isFetching, isPreviousData } = useQuery({
        queryKey: ['users', currentPage, debouncedSearch],
        queryFn: () => fetchUsers(currentPage, debouncedSearch),
        keepPreviousData: true,
        staleTime: 1000 * 60 * 2, // 2 minutes
    });

    const fetchUsers = async (page: number, search: string) => {
        try {
            const res = await axiosClient.get(`/users?page=${page}&search=${search}`, { withCredentials: true });
            const paginationData = await res.data.paginationData;
            console.log("fetching: "+page);

            return paginationData;
        } catch(err: any) {
            console.log(err.response.data.message);
            alert(err.response.data.message)
        }
    }

    const resetData = () => {
        setCurrentPage(1);
    }

    useEffect(() => {
        if (!isPreviousData && data?.next_page_url) {
            const nextpage = currentPage + 1;

            if (!queryClient.getQueryData(['users', nextpage, debouncedSearch])) {
                queryClient.prefetchQuery({
                    queryKey: ['users', nextpage, debouncedSearch],
                    queryFn: () => fetchUsers(nextpage, debouncedSearch),
                });
            } else {
                console.log('not fetching');
            }
        }
    }, [data, isPreviousData, currentPage, debouncedSearch, queryClient]);

    let pages = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
        .filter(page => page > 0 && (!data || page <= data.last_page));

    return (
        <div className='users'>
            <div className='search-field'>
                Email:
                <input
                    type='text'
                    placeholder='Search by email'
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); resetData(); }}
                />
            </div>
            <div className="paginationbtns">
                <button
                    onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
                    disabled={currentPage === 1}
                >
                    {"Previous"}
                </button>

                <div className="paginationbtns-pages">
                    {pages.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            disabled={pageNumber === currentPage}
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setCurrentPage((old) => (!isPreviousData && data?.next_page_url) ? old + 1 : old)}
                    disabled={isPreviousData || data?.next_page_url == null}
                >
                    {"Next"}
                </button>
            </div>
            {isFetching && (
                <div>Fetching users...</div>
            )}
                <div className="users-list">
                    {data?.data.length > 0 ? (
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
                    ) : (
                        <div>No users found matching the search criteria.</div>
                    )}
                </div>

                <div className="paginationbtns">
                <button
                    onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
                    disabled={currentPage === 1}
                >
                    {"Previous"}
                </button>

                <div className="paginationbtns-pages">
                    {pages.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            disabled={pageNumber === currentPage}
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setCurrentPage((old) => (!isPreviousData && data?.next_page_url) ? old + 1 : old)}
                    disabled={isPreviousData || data?.next_page_url == null}
                >
                    {"Next"}
                </button>
            </div>
        </div>
    );
};

export default Users;

import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../../axios-client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import UserDonation from '../../components/UserDonation';
import { useDebounce } from '../../hooks/useDebounce';
import { LoadingContext } from '../../context/LoadingContext';

type Donation = {
    id: number;
    amount: string;
    created_at: string | null;
    donated_at: string;
    donor_email: string | null;
    donor_name: string | null;
    updated_at: string | null;
    user: {
        id: number;
        firstname: string;
        lastname: string;
        email: string;
        role: number;
        created_at: string;
        deleted_at: string | null;
        updated_at: string;
    };
};

const Donations = () => {
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, setSearch] = useState('');
    const {setLoading} = useContext(LoadingContext);


    const fetchDonations = async (page: number) => {
        try {
            const res = await axiosClient.get(`/donations?page=${page}`, { withCredentials: true });
            const paginationData = await res.data.paginationData;

            return paginationData;
        } catch (err: any) {
            alert(err.response.data.message)
        }
    }

    const { status, data, error, isFetching, isPreviousData } = useQuery({
        queryKey: ['donations', currentPage],
        queryFn: () => fetchDonations(currentPage),
        keepPreviousData: true,
        staleTime: 1000 * 60 * 2, // 2 minutes
    });

    useEffect(() => {
        if (!isPreviousData && data?.next_page_url) {
            queryClient.prefetchQuery(['donations', currentPage + 1], () => fetchDonations(currentPage + 1));
        }
    }, [data, isPreviousData, currentPage, queryClient]);

    let pages = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
        .filter(page => page > 0 && (!data || page <= data.last_page));

    return (
        <div className='donations'>
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
                <div>Fetching donations...</div>
            )}
            <>
                {data?.data.map((donation: any) => (
                    <UserDonation
                        key={donation.id}
                        donation={donation}
                        user={donation.user}
                    />
                ))}
            </>
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

export default Donations;

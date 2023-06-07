import React, { useState, useEffect, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Transaction from '../../components/Transaction';
import axiosClient from '../../axios-client';
import { useDebounce } from '../../hooks/useDebounce';
import { LoadingContext } from '../../context/LoadingContext';

type user = {
    email: string,
    firstname: string,
    lastname: string,
}

export type displayTransaction = {
    id: number,
    buy_date: string,
    exp_date: string,
    user_id: number,
    total_cost: number,
    type: string,
    user: user
}

const Transactions = () => {
    const [page, setPage] = useState<number>(1);
    const queryClient = useQueryClient();
    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebounce(search, 500);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const {setLoading} = useContext(LoadingContext);

    const fetchTransactions = async (page: number, search: string, startDate: string, endDate: string) => {
        try{
                const response = await axiosClient.get(`/transactions?page=${page}`, {
                    params: {
                        search: search,
                        start_date: startDate,
                        end_date: endDate
                    },
                    withCredentials: true
                });

                console.log("fetching: "+ page);

                return response.data;
        }catch(err: any){
            console.log(err);
        }
    };

    useEffect(() => {
        setPage(1); // Reset page number when search changes
    }, [debouncedSearch]);

    const { data , isError, isFetching, isSuccess, isPreviousData } = useQuery(
        ['transactions', page, debouncedSearch, startDate, endDate],
        () => fetchTransactions(page, debouncedSearch, startDate, endDate),
        {
            staleTime: 1000 * 60 * 5, // 5 minutes
            keepPreviousData: true,
        }
    );

    useEffect(() => {
        if (!isPreviousData && data?.next_page_url) {
            const nextPage = page + 1;
            if(!queryClient.getQueryData(['transactions', nextPage, debouncedSearch, startDate, endDate]))
                queryClient.prefetchQuery(['transactions', nextPage, debouncedSearch, startDate, endDate], () => fetchTransactions(nextPage, debouncedSearch, startDate, endDate));
            else console.log("not fetching");
        }
    }, [data, isPreviousData ,page, debouncedSearch, startDate, endDate, queryClient]);

    if (isError) {
        return <div className='transactions' >Error fetching transactions</div>;
    }

    let pages = [page - 2, page - 1, page, page + 1, page + 2].filter(page => page > 0 && (!data || page <= data.last_page));

    return (
        <div className="transactions">

            <div className='transactions-params'>
                Email:
                <input
                    type="text"
                    placeholder="Search by email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                Start Date:
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />

                End Date:
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            <div className="transactions-loading">
                {isFetching && <div>Loading transactions...</div>}
            </div>

            <div className='transactions-buttons'>
                <button
                    onClick={() => setPage((old) => Math.max(old - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>

                <div className="transactions-buttons-pages">
                    {pages.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => setPage(pageNumber)}
                            disabled={pageNumber === page}
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() =>
                        setPage((old) => (!data || !data.next_page_url ? old : old + 1))
                    }
                    disabled={!data || !data.next_page_url}
                >
                    Next
                </button>
            </div>

            <div className="transactions-list">
                {isSuccess && !data?.data.length ?
                <div>No users match your search</div>
                : data?.data.map((transaction: displayTransaction) => (
                    <Transaction transaction={transaction} key={transaction.id}  />
                ))}
            </div>

            <div className='transactions-buttons'>
                <button
                    onClick={() => setPage((old) => Math.max(old - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>

                <div className="transactions-buttons-pages">
                    {pages.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => setPage(pageNumber)}
                            disabled={pageNumber === page}
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() =>
                        setPage((old) => (!data || !data.next_page_url ? old : old + 1))
                    }
                    disabled={!data || !data.next_page_url}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Transactions;

import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Transaction from '../../components/Transaction';
import axiosClient from '../../axios-client';

const fetchTransactions = async ({ queryKey }) => {
    const [, page] = queryKey;
    const response = await axiosClient.get(`/admintransactions?page=${page}`);
    return response.data;
};

const Transactions = () => {
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient();
    const { data, isError, isFetching, isSuccess } = useQuery(
        ['transactions', page],
        fetchTransactions,
        {
            staleTime: 1000 * 60 * 5, // 5 minutes
            keepPreviousData: true,
        }
    );

    useEffect(() => {
        if (data?.next_page_url) {
            const nextPage = page + 1;
            queryClient.prefetchQuery(['transactions', nextPage], fetchTransactions);
        }
    }, [data, page, queryClient]);

    if (isError) {
        return <div>Error fetching transactions</div>;
    }

    if (isFetching && !isSuccess) {
        return <div>Loading transactions...</div>;
    }

    return (
        <div className="transactions">
            <ul>
                {data?.data.map((transaction) => (
                <li key={transaction.id}>
                    <Transaction transaction={transaction} />
                </li>
                ))}
            </ul>
        <div>
            <button
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1}
            >
                Previous
            </button>
            <span>Page {page}</span>
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

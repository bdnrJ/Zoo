import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Transaction from '../../components/Transaction';
import axiosClient from '../../axios-client';

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

    const fetchTransactions = async (page: number) => {
        try{
            const response = await axiosClient.get(`/transactions?page=${page}`, {withCredentials: true});
            console.log("fetching: "+ page);
            return response.data;
        }catch(err: any){
            console.log(err);
        }
    };


    const { data , isError, isFetching, isSuccess, isPreviousData } = useQuery(
        ['transactions', page],
        () => fetchTransactions(page),
        {
            staleTime: 1000 * 60 * 5, // 5 minutes
            keepPreviousData: true,
        }
    );

    useEffect(() => {
        if (!isPreviousData && data?.next_page_url) {
            const nextPage = page + 1;
            // if we go from page 4 -> 3 without this if statement
            // it would refetch page 4 again, even if
            // it was just fetched
            if(!queryClient.getQueryData(['transactions', nextPage]))
                queryClient.prefetchQuery(['transactions', nextPage], () => fetchTransactions(nextPage));
            else console.log("not fetching");
        }
    }, [data, isPreviousData ,page, queryClient]);

    if (isError) {
        return <div>Error fetching transactions</div>;
    }

    if (isFetching && !isSuccess) {
        return <div>Loading transactions...</div>;
    }

    return (
        <div className="transactions">
            <div className='transactions-buttons'>
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

            <div className="transactions-list">
                {data?.data.map((transaction: displayTransaction) => (
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

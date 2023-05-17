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
    const [search, setSearch] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [reload, setReload] = useState<number>(0);

    const fetchTransactions = async (page: number) => {
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

    const { data , isError, isFetching, isSuccess, isPreviousData } = useQuery(
        ['transactions', page],
        () => fetchTransactions(page),
        {
            staleTime: 1000 * 60 * 5, // 5 minutes
            keepPreviousData: true,
        }
    );

    const resetData = () => {
        queryClient.removeQueries({ queryKey: ['transactions']});
        setReload(prev => prev+1)
        setPage(1);
    };

    const handldeStartDataChange = () => {
        if(!endDate) return
        resetData();
    }

    const handleEndDataChange = () => {
        if(!startDate) return
        resetData();
    }

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
    }, [data, isPreviousData ,page, queryClient, reload]);

    if (isError) {
        return <div>Error fetching transactions</div>;
    }

    if (isFetching && !isSuccess) {
        return <div>Loading transactions...</div>;
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
                    onChange={(e) => {setSearch(e.target.value); resetData()}}
                />
                Start Date:

                <input
                    type="date"
                    value={startDate}
                    onChange={(e) =>{ setStartDate(e.target.value); handldeStartDataChange()}}
                />

                End Date:
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => {setEndDate(e.target.value); handleEndDataChange()}}
                />
            </div>

            <div className='transactions-buttons'>
                <button
                    onClick={() => setPage((old) => Math.max(old - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>

                {pages.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => setPage(pageNumber)}
                        disabled={pageNumber === page}
                    >
                        {pageNumber}
                    </button>
                ))}

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

                {pages.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => setPage(pageNumber)}
                        disabled={pageNumber === page}
                    >
                        {pageNumber}
                    </button>
                ))}

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

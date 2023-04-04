<?php

namespace App\Http\Controllers;

use App\Models\NormalTicket;
use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use Exception;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::all();

        return response()->json($transactions);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'buy_date' => 'required|date',
            'exp_date' => 'required|date',
            'user_id' => 'required|integer',
            'total_cost' => 'required|numeric',
            'type' => 'required|string|max:45',
        ]);

        $normalTicketsData = $request->input('normal_tickets');

        DB::beginTransaction();

    try {
        $transaction = Transaction::create($validatedData);
        foreach ($normalTicketsData as $normalTicketData) {
            $normalTicket = new NormalTicket($normalTicketData);
            $transaction->NormalTickets()->save($normalTicket);
        }
        DB::commit();
        return response()->json(['message' => 'Transaction created successfully.']);
    } catch (Exception $e) {
        DB::rollback();
        error_log($e);
        return response()->json(['message' => $e]);
    }

    }

    public function show(Transaction $transaction)
    {
        return response()->json($transaction);
    }

    public function update(Request $request, Transaction $transaction)
    {
        $validatedData = $request->validate([
            'buy_date' => 'required|date',
            'exp_date' => 'required|date',
            'user_id' => 'required|integer',
            'total_cost' => 'required|numeric',
            'type' => 'required|string|max:45',
        ]);

        $transaction->update($validatedData);

        return response()->json($transaction);
    }

    public function destroy(Transaction $transaction)
    {
        $transaction->delete();

        return response()->json(null, 204);
    }
}

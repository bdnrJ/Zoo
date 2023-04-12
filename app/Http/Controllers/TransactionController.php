<?php

namespace App\Http\Controllers;

use App\Models\GroupTicket;
use App\Models\NormalTicket;
use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::all();

        return response()->json($transactions);
    }

    public function store(Request $request)
{
    $user = Auth::user();

    $validatedData = $request->validate([
        'buy_date' => 'required|date',
        'exp_date' => 'required|date',
        'user_id' => 'integer',
        'total_cost' => 'required|numeric',
        'type' => 'required|string|max:45',
    ]);

    $validatedData['user_id'] = $user->id;

    DB::beginTransaction();

    try {
        $transaction = Transaction::create($validatedData);

        if ($request->has('normal_tickets')) {
            $normalTicketsData = $request->input('normal_tickets');
            foreach ($normalTicketsData as $normalTicketData) {
                $normalTicket = new NormalTicket($normalTicketData);
                $transaction->NormalTickets()->save($normalTicket);
            }
        } elseif ($request->has('group_ticket')) {
            $groupTicketData = $request->input('group_ticket');
            $groupTicket = new GroupTicket($groupTicketData);
            $transaction->GroupTickets()->save($groupTicket);
        }

        DB::commit();
        return response()->json(['message' => 'Transaction created successfully.'], 200);
    } catch (Exception $e) {
        DB::rollback();
        error_log($e);
        return response()->json(['message' => $e], 400);
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

    public function getTransactions(Request $request)
    {
        $transactions = Transaction::with('user')
            ->orderBy('id', 'desc')
            ->paginate(15);

        return response()->json($transactions);
    }

    public function getTransaction(Request $request, $id)
    {
        $transaction = Transaction::with('user')
            ->findOrFail($id);

        $tickets = [];
        if ($transaction->type === 'normal') {
            $tickets = $transaction->NormalTickets()
                ->with('ticket_type')
                ->get();
        } elseif ($transaction->type === 'group') {
            $tickets = $transaction->GroupTickets()->get();
        }

        return response()->json([
            'transaction' => $transaction,
            'tickets' => $tickets,
        ]);
    }
}

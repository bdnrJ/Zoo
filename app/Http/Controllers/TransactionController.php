<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\TicketType;
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
        'type' => 'required|string|max:45',
        'items' => 'required|array',
        'items.*.ticket_type_id' => 'required|integer|exists:ticket_types,id',
        'items.*.amount' => 'required|integer|min:1',
    ]);

    $validatedData['user_id'] = $user->id;

    // Calculate total cost
    $ticketTypes = TicketType::whereIn('id', array_column($validatedData['items'], 'ticket_type_id'))->get()->keyBy('id');
    $totalCost = 5; //service fee
    foreach ($validatedData['items'] as $itemData) {
        $ticketTypeId = $itemData['ticket_type_id'];
        if (isset($ticketTypes[$ticketTypeId])) {
            $totalCost += $itemData['amount'] * $ticketTypes[$ticketTypeId]->price;
        }
    }

    $validatedData['total_cost'] = $totalCost;

    DB::beginTransaction();

    try {
        $transaction = Transaction::create($validatedData);

        foreach ($validatedData['items'] as $itemData) {
            $item = new Item($itemData);
            $transaction->Items()->save($item);
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

    public function getTransactions()
    {
        //returns transaction with user, email, id, lastname and firstname
        //has to return id even if useless just because it throws error otherwise
        $transactions = Transaction::with(['user' => function ($query) {
            $query->select('email', 'firstname' , 'lastname', 'id');
        }])
            ->orderBy('id', 'desc')
            ->paginate(15);

        return response()->json($transactions);
    }

    public function getTransaction(Request $request, $id)
    {
        $transaction = Transaction::with(['user' => function ($query) {
            $query->select('email', 'firstname', 'lastname', 'id');
        }])
            ->findOrFail($id);

        $tickets = [];
        $tickets = $transaction->Items()
            ->with('ticket_type')
            ->get();


        $services = $transaction->services()->with('service_type')->get();

        return response()->json([
            'transaction' => $transaction,
            'tickets' => $tickets,
            'services' => $services,
        ]);
    }
}

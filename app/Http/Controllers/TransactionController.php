<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Service;
use App\Models\ServiceType;
use App\Models\TicketType;
use App\Models\User;
use App\Models\Transaction;
use Illuminate\Http\Request;
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
            'type' => 'required|string|in:normal,group',
            'items' => 'required|array',
            'items.*.ticket_type_id' => 'required|integer|exists:ticket_types,id',
            'items.*.amount' => 'required|integer|min:1',
            'services' => 'sometimes|array',
            'services.*.service_type_id' => 'required_with:services|integer|exists:service_types,id',
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

        // If transaction type is 'group', calculate total cost of services
        if ($validatedData['type'] === 'group') {
            // Assuming 'items' array has only one ticket for 'group' transactions
            $groupTicket = $validatedData['items'][0];

            // Fetch requested service types
            $requestedServiceTypeIds = isset($validatedData['services']) ? array_column($validatedData['services'], 'service_type_id') : [];
            $serviceTypes = ServiceType::whereIn('id', $requestedServiceTypeIds)->get()->keyBy('id');

            // Calculate the total cost of requested services for the group
            foreach ($serviceTypes as $serviceType) {
                $totalCost += $serviceType->price_per_customer * $groupTicket['amount'];
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

            if ($validatedData['type'] === 'group' && isset($validatedData['services'])) {
                foreach ($validatedData['services'] as $serviceData) {
                    $service = new Service($serviceData);
                    $transaction->Services()->save($service);
                }
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

        $transactions = Transaction::with(['user' => function ($query) {
            $query->withTrashed()->select('email', 'firstname', 'lastname', 'id');
        }]);

        // Add search filter if keyword is provided
        if ($request->input('search')) {
            $transactions = $transactions->whereHas('user', function ($query) use ($request) {
                $query->withTrashed()->where('email', 'like', '%' . $request->input('search') . '%');
            });
        }

        // Add date range filter if start and end dates are provided
        if ($request->input('start_date') && $request->input('end_date')) {
            $transactions = $transactions->whereBetween('buy_date', [$request->input('start_date'), $request->input('end_date')]);
        }

        $transactions = $transactions->orderBy('id', 'desc')->paginate(5);

        error_log($request->input('search'));

        return response()->json($transactions);
    }



    public function getTransaction(Request $request, $id)
    {
        $transaction = Transaction::with(['user' => function ($query) {
            $query->select('email', 'firstname', 'lastname', 'id');
        }])
            ->findOrFail($id);

        $tickets = $transaction->Items()
            ->with('ticket_type')
            ->get();

        $services = $transaction->services()->with('serviceType')->get();

        return response()->json([
            'transaction' => $transaction,
            'tickets' => $tickets,
            'services' => $services,
        ]);
    }

    public function getUserTransactions() {
        // Get current authenticated user
        $user = Auth::user();

        // Fetch user transactions
        $transactions = $user->transactions()->get();

        // For each transaction, get related tickets and services
        $transactions->map(function($transaction){
            $transaction->tickets = $transaction->Items()->with('ticket_type')->get();
            $transaction->services = $transaction->services()->with('serviceType')->get();
        });

        return response()->json($transactions);
    }

    public function ServiceTypes()
    {
        return $this->hasManyThrough(
            ServiceType::class,
            Service::class,
            'transaction_id', // Foreign key on Service table
            'id', // Foreign key on ServiceType table
            'id', // Local key on Transaction table
            'service_type_id' // Local key on Service table
        );
    }
}

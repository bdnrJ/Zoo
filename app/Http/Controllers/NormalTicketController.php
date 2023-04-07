<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NormalTicket;

class NormalTicketController extends Controller
{
    public function index()
    {
        $normalTickets = NormalTicket::all();

        return response()->json($normalTickets);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'ticket_type_id' => 'required|integer',
            'transaction_id' => 'required|integer',
            'amount' => 'required|integer|max:10'
        ]);

        $normalTicket = NormalTicket::create($validatedData);

        return response()->json($normalTicket, 201);
    }

    public function show(NormalTicket $normalTicket)
    {
        return response()->json($normalTicket);
    }

    public function update(Request $request, NormalTicket $normalTicket)
    {
        $validatedData = $request->validate([
            'ticket_type' => 'required|integer',
            'transaction_id' => 'required|integer',
        ]);

        $normalTicket->update($validatedData);

        return response()->json($normalTicket);
    }

    public function destroy(NormalTicket $normalTicket)
    {
        $normalTicket->delete();

        return response()->json(null, 204);
    }
}

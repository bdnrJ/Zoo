<?php

namespace App\Http\Controllers;

use App\Models\GroupTicket;
use Illuminate\Http\Request;

class GroupTicketController extends Controller
{
    public function index()
    {
        $groupTickets = GroupTicket::all();
        return response()->json($groupTickets);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'transaction_id' => 'required|integer',
            'people' => 'required|integer|max:45',
            'educational_materials' => 'required|boolean',
            'guided_tour' => 'required|boolean',
            'food_included' => 'required|boolean'
        ]);

        $groupTickets = GroupTicket::create($validatedData);
        return response()->json($groupTickets, 201);
    }

    public function show(GroupTicket $groupTicket)
    {
        return response()->json($groupTicket);
    }

    public function update(Request $request, GroupTicket $groupTicket)
    {
        $validatedData = $request->validate([
            'transaction_id' => 'required|integer',
            'people' => 'required|integer|max:45',
            'educational_materials' => 'required|boolean',
            'guided_tour' => 'required|boolean',
            'food_included' => 'required|boolean'
        ]);

        $groupTicket->update($validatedData);
        return response()->json($groupTicket);
    }

    public function destroy(GroupTicket $groupTicket)
    {
        $groupTicket->delete();
        return response()->json(null, 204);
    }
}

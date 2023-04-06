<?php

namespace App\Http\Controllers;

use App\Models\TicketType;
use Illuminate\Http\Request;


class TicketTypeController extends Controller
{
    public function index()
    {
        $ticketTypes = TicketType::all();
        return response()->json($ticketTypes);
    }

    public function show($id)
    {
        $ticketType = TicketType::find($id);
        if(!$ticketType) {
            return response()->json(['message' => 'Ticket type not found'], 404);
        }
        return response()->json($ticketType);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:45',
            'age_info' => 'required|max:100',
            'price' => 'required|numeric',
            'is_active' => 'required|boolean',
        ]);

        $ticketType = TicketType::create($request->all());

        return response()->json($ticketType, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|max:45',
            'age_info' => 'required|max:100',
            'price' => 'required|numeric',
            'is_active' => 'required|boolean',
        ]);

        $ticketType = TicketType::find($id);
        if(!$ticketType) {
            return response()->json(['message' => 'Ticket type not found'], 404);
        }

        $ticketType->update($request->all());

        return response()->json($ticketType, 200);
    }

    public function destroy($id)
    {
        $ticketType = TicketType::find($id);
        if(!$ticketType) {
            return response()->json(['message' => 'Ticket type not found'], 404);
        }

        $ticketType->delete();

        return response()->json(null, 204);
    }
}

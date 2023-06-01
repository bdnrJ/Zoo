<?php

namespace App\Http\Controllers;

use App\Models\TicketType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


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
        'price' => 'required|numeric'
    ]);

    $ticketTypeData = $request->all();
    $ticketTypeData['is_active'] = 0; // Set 'is_active' to 0 by default

    $ticketType = TicketType::create($ticketTypeData);

    return response()->json($ticketType, 201);
}


    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|max:45',
            'age_info' => 'required|max:100',
            'price' => 'required|numeric',
            'is_active' => 'required|boolean',
            'confirm_password' => 'required',
        ]);

        $ticketType = TicketType::find($id);
        if(!$ticketType) {
            return response()->json(['message' => 'Ticket type not found'], 404);
        }

        $user = auth()->user();
        if (!Hash::check($request->confirm_password, $user->password)) {
            return response()->json(['message' => 'Invalid password'], 403);
        }

        $ticketType->update($request->except('confirm_password'));

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

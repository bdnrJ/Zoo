<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::all();

        return response()->json($items);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'ticket_type_id' => 'required|integer',
            'transaction_id' => 'required|integer',
            'amount' => 'required|integer|max:10'
        ]);

        $items = Item::create($validatedData);

        return response()->json($items, 201);
    }

    public function show(Item $item)
    {
        return response()->json($item);
    }

    public function update(Request $request, Item $item)
    {
        $validatedData = $request->validate([
            'ticket_type' => 'required|integer',
            'transaction_id' => 'required|integer',
        ]);

        $item->update($validatedData);

        return response()->json($item);
    }

    public function destroy(Item $item)
    {
        $item->delete();

        return response()->json(null, 204);
    }
}

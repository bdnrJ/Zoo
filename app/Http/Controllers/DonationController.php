<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;

class DonationController extends Controller
{
    public function index() {
        return Donation::all();
    }

    public function show(Donation $donation) {
        return $donation;
    }

    public function store(Request $request) {
        $donation = Donation::create($request->all());

        return response()->json($donation, 201);
    }

    public function update(Request $request, Donation $donation) {
        $donation->update($request->all());

        return response()->json($donation, 200);
    }

    public function delete(Donation $donation) {
        $donation->delete();

        return response()->json(null, 204);
    }
}

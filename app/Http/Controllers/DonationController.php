<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DonationController extends Controller
{
    public function index(Request $request) {
        $donations = Donation::with('user')->paginate(5);

        return response([
            "message" => "success",
            "paginationData" => $donations
        ], 200);
    }

    public function show(Donation $donation) {
        return $donation;
    }

    public function store(Request $request) {
        $this->validate($request, [
            'donor_name' => 'required',
            'donor_email' => 'required|email',
            'amount' => 'required|numeric|min:0.01',
        ]);

        $donation = Donation::create([
            'donor_name' => $request->donor_name,
            'donor_email' => $request->donor_email,
            'amount' => $request->amount,
            'donated_at' => Carbon::now()
        ]);

        return response()->json($donation, 201);
    }

    public function storeAuth(Request $request) {
        $this->validate($request, [
            'amount' => 'required|numeric|min:0.01',
        ]);

        $donation = Donation::create([
            'user_id' => Auth::user()->id,
            'amount' => $request->amount,
            'donated_at' => Carbon::now()
        ]);

        return response()->json($donation, 201);
    }
}

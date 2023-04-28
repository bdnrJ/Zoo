<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getUsers(){
        $users = User::paginate(15);

        return response([
            "message" => "success",
            "paginationData" => $users
        ], 200);
    }

    public function userToUser()
    {
        $user = Auth::user();

        if ($user) {
            $userWithTransactions = $user->load('transactions');
            return response()->json($userWithTransactions);
        } else {
            return response()->json(['error' => 'User not authenticated'], 401);
        }
    }

    public function user($id)
    {
        $user = User::with('transactions')->findOrFail($id);
        return response()->json([
            'user' => $user,
        ]);
    }
}

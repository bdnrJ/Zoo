<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

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

    public function update(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|max:30',
            'lastname' => 'required|string|max:30',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $user->update([
            'firstname' => $request->input('firstname'),
            'lastname' => $request->input('lastname'),
        ]);

        return response()->json([
            'message' => 'User information updated successfully',
            'user' => $user,
        ], 200);
    }
}

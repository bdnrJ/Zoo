<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

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

    // UserController.php

    public function updateEmail(Request $request)
    {
        // Validate request data
        $request->validate([
            'newEmail' => 'required|email|unique:users,email',
            'confirmPassword' => 'required|min:8',
        ]);

        // Retrieve the authenticated user
        $user = auth()->user();

        // Check if the provided password matches the user's password
        if (!Hash::check($request->confirmPassword, $user->password)) {
            return response()->json([
                'message' => 'Password confirmation does not match',
            ], 422);
        }

        // Update the user's email
        $user->email = $request->newEmail;
        $user->save();

        return response()->json([
            'message' => 'Email updated successfully',
        ]);
    }

    public function updatePassword(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'currentPassword' => 'required',
            'newPassword' => 'required|min:8',
            'confirmNewPassword' => 'required|same:newPassword'
        ]);

        error_log('im here');

        if (!Hash::check($request->currentPassword, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 400);
        }

        $user->password = Hash::make($request->newPassword);
        $user->save();

        return response()->json(['message' => 'Password updated successfully']);
    }

}
